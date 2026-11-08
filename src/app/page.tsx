import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'

export const revalidate = 300

export default async function Home() {
  // Counts come from the database, never hard-coded (fixes the lesson-count mismatch).
  const { data: stats } = await createServiceClient().from('course_stats').select('lesson_count,total_minutes').limit(1).maybeSingle()
  const hours = stats ? Math.round(stats.total_minutes / 60) : null
  return (
    <section className="max-w-2xl">
      <h1 className="font-serif text-4xl leading-tight text-ink">What happens after the worst thing is over</h1>
      <p className="mt-4 text-lg text-ink-soft">
        A self-paced course on how trauma shapes the brain, the body, and relationships, and how to support someone without making it worse.
      </p>
      {stats && <p className="mt-4 text-ink-soft">{stats.lesson_count} lessons across 8 modules, about {hours} hours in total.</p>}
      <div className="mt-8 flex gap-3">
        <Link href="/login" className="rounded-lg bg-ink-blue px-5 py-3 font-medium text-white hover:bg-[#335779]">Start the course</Link>
        <Link href="/verify" className="rounded-lg border border-ink-blue px-5 py-3 font-medium text-ink-blue">Verify a certificate</Link>
      </div>
    </section>
  )
}
