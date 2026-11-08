import Link from 'next/link'
import type { Base } from '@/lib/lab/types'

// Every activity shows its purpose, instructions and the learner's right to skip, as the course brief requires.
export default function Shell({ title, def, children }: { title: string; def: Base; children: React.ReactNode }) {
  return (
    <section aria-labelledby="lab-title" className="max-w-3xl">
      <h1 id="lab-title" className="font-serif text-3xl">{title}</h1>
      <p className="mt-2 text-ink-soft"><strong>Purpose:</strong> {def.purpose}</p>
      <p className="mt-1 text-ink-soft">{def.instruction}</p>
      <p className="mt-1 text-sm text-ink-soft">You may skip this activity. <Link href="/lab" className="text-ink-blue underline">Skip to the lab</Link></p>
      <div className="mt-6">{children}</div>
      <details className="mt-8 text-sm text-ink-soft"><summary className="cursor-pointer">Accessibility</summary><p className="mt-1">{def.accessibility_alternative}</p></details>
    </section>
  )
}
