import { createServiceClient } from '@/lib/supabase/server'
import { signCredential } from '@/lib/credentials'

export const dynamic = 'force-dynamic'
export const metadata = { robots: { index: false } }

export default async function Verify({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const admin = createServiceClient()
  const { data: c } = await admin.from('credentials').select('*, courses(title)').eq('credential_code', decodeURIComponent(code).toUpperCase().trim()).maybeSingle()

  // Re-computes the HMAC so a row altered directly in the database fails verification.
  const authentic = !!c && signCredential({ code: c.credential_code, userId: c.user_id, courseId: c.course_id, learnerName: c.learner_name,
    totalMinutes: c.total_minutes, capstoneScore: c.capstone_score, issuedAt: new Date(c.issued_at).toISOString() }) === c.signature

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-3xl">Certificate verification</h1>
      {!c || !authentic ? <p role="alert" className="mt-4">No valid certificate matches that ID.</p> : (
        <dl className="mt-4 space-y-2 rounded-xl border border-slate/40 bg-white p-5">
          <div><dt className="text-sm text-ink-soft">Status</dt><dd className="font-medium">{c.revoked_at ? 'Revoked' : 'Valid'}</dd></div>
          <div><dt className="text-sm text-ink-soft">Learner</dt><dd>{c.learner_name}</dd></div>
          <div><dt className="text-sm text-ink-soft">Course</dt><dd>{(c.courses as any)?.title}</dd></div>
          <div><dt className="text-sm text-ink-soft">Issued</dt><dd>{new Date(c.issued_at).toLocaleDateString('en-US', { dateStyle: 'long' })}</dd></div>
          <div><dt className="text-sm text-ink-soft">Course length</dt><dd>{Math.round(c.total_minutes / 60 * 10) / 10} hours</dd></div>
        </dl>)}
    </div>)
}
