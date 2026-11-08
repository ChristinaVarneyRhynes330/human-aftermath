import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse('Unauthorized: Access token missing.', { status: 401 });
  }

  // Verify supervisor/administrator role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, organization_id')
    .eq('id', session.user.id)
    .single();

  if (!profile || (profile.role !== 'enterprise_admin' && profile.role !== 'super_admin')) {
    return new NextResponse('Forbidden: Insufficient privileges for compliance audit records.', { status: 403 });
  }

  // Retrieve compliance records for the organization
  const { data: auditRecords, error } = await supabase
    .from('supervisor_audit_view')
    .select('*')
    .eq('organization_id', profile.organization_id);

  if (error || !auditRecords) {
    return new NextResponse('Error querying organization audit data.', { status: 500 });
  }

  // Construct state-board-compliant CSV
  let csv = 'Learner ID,Employee Name,License Number,Role,Lessons 100% Completed,Child Welfare Passed,Capstone Passed,Credential Hash,CE Hours,Issued Timestamp\r\n';

  auditRecords.forEach((row) => {
    csv += `"${row.learner_id}",` +
           `"${row.full_name || 'Anonymous'}",` +
           `"${row.license_number || 'N/A'}",` +
           `"${row.user_role}",` +
           `"${row.lessons_completed ? 'YES' : 'NO'}",` +
           `"${row.child_welfare_scenario_passed ? 'YES' : 'NO'}",` +
           `"${row.capstone_passed ? 'COMPLIANT' : 'PENDING'}",` +
           `"${row.credential_hash || 'UNISSUED'}",` +
           `"${row.ce_hours || 0.00}",` +
           `"${row.certificate_issued_at || 'N/A'}"\r\n`;
  });

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="THA_Workforce_Compliance_Audit_${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store'
    }
  });
}