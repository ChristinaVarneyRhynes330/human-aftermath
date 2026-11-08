'use client'
import { useState } from 'react'
import type { ClassifyDef } from '@/lib/lab/types'

export default function Classify({ def }: { def: ClassifyDef }) {
  const [sel, setSel] = useState<Record<string, string>>({}); const [checked, setChecked] = useState(false)
  const right = def.items.filter(i => sel[i.id] === i.answer).length
  return (
    <div>
      <dl className="grid gap-1 text-sm text-ink-soft sm:grid-cols-2">
        {def.categories.map(c => <div key={c.id}><dt className="inline font-medium text-ink">{c.label}: </dt><dd className="inline">{c.hint}</dd></div>)}
      </dl>
      <ul className="mt-5 space-y-4">
        {def.items.map(i => {
          const ok = sel[i.id] === i.answer
          return (
            <li key={i.id} className="rounded-lg border border-slate/40 bg-white p-4">
              <label className="block"><span className="block">{i.text}</span>
                <select disabled={checked} value={sel[i.id] ?? ''} onChange={e => setSel(s => ({ ...s, [i.id]: e.target.value }))} className="mt-2 rounded border border-slate bg-white p-2">
                  <option value="" disabled>Choose a category</option>
                  {def.categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select></label>
              {checked && <p className="mt-2 text-sm"><strong>{ok ? 'Matches.' : `Better fit: ${def.categories.find(c => c.id === i.answer)?.label}.`}</strong> {i.why}</p>}
            </li>)
        })}
      </ul>
      {!checked ? <button disabled={Object.keys(sel).length < def.items.length} onClick={() => setChecked(true)} className="mt-5 rounded-lg bg-ink-blue px-5 py-2 text-white disabled:opacity-50">Check my sorting</button>
        : <p role="status" className="mt-5">{right} of {def.items.length} matched. {def.debrief}</p>}
    </div>)
}
