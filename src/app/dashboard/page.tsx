import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const [{ data: modules }, { data: done }] = await Promise.all([
    supabase.from('modules').select('num,title,intro,lessons(id,slug,position,title,minutes)').order('num').order('position', { referencedTable: 'lessons' }),
    supabase.from('user_progress').select('lesson_id').eq('user_id', user!.id).not('completed_at', 'is', null),
  ])
  const doneSet = new Set((done ?? []).map(d => d.lesson_id))
  const total = (modules ?? []).reduce((s, m) => s + m.lessons.length, 0)
  const pct = total ? Math.round((doneSet.size / total) * 100) : 0

  return (
    <div>
      <h1 className="font-serif text-3xl">Your course</h1>
      <div className="mt-4" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
        <div className="h-3 w-full rounded-full bg-mint/60"><div className="h-3 rounded-full bg-ink-blue" style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-sm text-ink-soft">{doneSet.size} of {total} lessons complete ({pct}%)</p>
      </div>
      <div className="mt-8 space-y-6">
        {modules?.map(m => (
          <section key={m.num} aria-labelledby={`m${m.num}`} className="rounded-xl border border-slate/30 bg-white p-5">
            <h2 id={`m${m.num}`} className="font-serif text-xl">Module {m.num}: {m.title}</h2>
            <ul className="mt-3 divide-y divide-slate/20">
              {m.lessons.map(l => (
                <li key={l.id}>
                  <Link href={`/courses/${m.num}/${l.slug}`} className="flex items-center justify-between gap-3 py-2 hover:underline">
                    <span>{l.title}</span>
                    <span className="shrink-0 text-sm text-ink-soft">{doneSet.has(l.id) ? 'Complete' : `${l.minutes} min`}</span>
                  </Link>
                </li>))}
            </ul>
          </section>))}
      </div>
    </div>
  )
}
