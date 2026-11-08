import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const LABELS: Record<string, string> = { scenario: 'Scenarios', claim_lab: 'Claim Labs', classify: 'Sorting activities', explain_options: 'What else could explain this?' }

export default async function LabIndex() {
  const { data } = await (await createClient()).from('lab_activities').select('slug,type,title').order('title')
  const groups = Object.entries(LABELS).map(([t, label]) => ({ label, items: (data ?? []).filter(a => a.type === t) })).filter(g => g.items.length)
  return (
    <div>
      <h1 className="font-serif text-3xl">Learning Lab</h1>
      <p className="mt-2 max-w-prose text-ink-soft">Practice activities that build judgment. Nothing here asks you to share personal experience, and you can stop at any time.</p>
      {groups.map(g => (
        <section key={g.label} className="mt-8"><h2 className="font-serif text-xl">{g.label}</h2>
          <ul className="mt-2 divide-y divide-slate/20 rounded-xl border border-slate/30 bg-white">
            {g.items.map(a => <li key={a.slug}><Link href={`/lab/${a.slug}`} className="block p-3 hover:underline">{a.title}</Link></li>)}
          </ul></section>))}
      {!groups.length && <p className="mt-6">No activities yet. Run <code>npm run seed</code>.</p>}
    </div>)
}
