import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  // 1. Strict Authentication using getUser() (server-validated token)
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse('Unauthorized: Valid session required.', { status: 401 });
  }

  // 2. Strict Role & Organization Authorization Check
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, org_id')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || !profile.org_id) {
    return new NextResponse('Forbidden: No enterprise organization linked to your account.', { status: 403 });
  }

  const authorizedRoles = ['enterprise_admin', 'super_admin', 'supervisor'];
  if (!authorizedRoles.includes(profile.role)) {
    return new NextResponse('Forbidden: Insufficient privileges for workforce audit compliance records.', { status: 403 });
  }

  // 3. Query Roster Data through Reconciled Audit View
  const { data: auditRecords, error: queryError } = await supabase
    .from('supervisor_audit_view')
    .select('learner_id, full_name, license_number, user_role, lessons_completed, child_welfare_scenario_passed, capstone_passed, credential_code, ce_hours, certificate_issued_at')
    .eq('org_id', profile.org_id);

  if (queryError || !auditRecords) {
    return new NextResponse('Error generating organization compliance audit trail.', { status: 500 });
  }

  // 4. Sanitize CSV Fields (protect against CSV Formula Injection)
  const sanitizeCell = (val: string | number | null | undefined): string => {
    if (val === null || val === undefined) return '""';
    let str = String(val).replace(/"/g, '""');
    // Prefix formulas (=, +, -, @) to prevent execution in spreadsheet software
    if (/^[=+@-]/i.test(str)) {
      str = `'${str}`;
    }
    return `"${str}"`;
  };

  // 5. Construct Compliance CSV (strictly excluding reflective journals and confidential inputs)
  const headers = [
    'Learner ID',
    'Employee Name',
    'License Number',
    'Role',
    'Curriculum Completed',
    'Child Welfare Passed',
    'Capstone Status',
    'Credential Code',
    'CE Contact Hours',
    'Date Issued'
  ];

  const rows = auditRecords.map(r => [
    sanitizeCell(r.learner_id),
    sanitizeCell(r.full_name || 'Anonymous'),
    sanitizeCell(r.license_number),
    sanitizeCell(r.user_role),
    sanitizeCell(r.lessons_completed ? 'YES' : 'NO'),
    sanitizeCell(r.child_welfare_scenario_passed ? 'YES' : 'NO'),
    sanitizeCell(r.capstone_passed ? 'COMPLIANT' : 'PENDING'),
    sanitizeCell(r.credential_code || 'UNISSUED'),
    sanitizeCell(r.ce_hours || '0.00'),
    sanitizeCell(r.certificate_issued_at || 'N/A')
  ].join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="THA_Compliance_Audit_${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}