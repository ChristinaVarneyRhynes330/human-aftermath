'use client'
import { useState } from 'react'
import type { ExplainDef } from '@/lib/lab/types'

export default function ExplainOptions({ def }: { def: ExplainDef }) {
  const [sel, setSel] = useState<Set<string>>(new Set()); const [done, setDone] = useState(false)
  const toggle = (id: string) => setSel(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  return (
    <div>
      <p className="rounded-lg bg-mint/40 p-4 text-lg">{def.prompt}</p>
      <fieldset className="mt-4"><legend className="font-medium">Which explanations are plausible with only this information?</legend>
        {def.options.map(o => (
          <label key={o.id} className="mt-2 flex gap-2 rounded-lg border border-slate/40 bg-white p-3">
            <input type="checkbox" disabled={done} checked={sel.has(o.id)} onChange={() => toggle(o.id)} /><span>{o.text}</span></label>))}
      </fieldset>
      {!done ? <button disabled={sel.size === 0} onClick={() => setDone(true)} className="mt-4 rounded-lg bg-ink-blue px-5 py-2 text-white disabled:opacity-50">Show feedback</button> : (
        <div role="status" className="mt-5 space-y-2">
          {def.options.map(o => (
            <p key={o.id} className="rounded-lg border border-slate/40 bg-white p-3"><strong>{o.text}</strong><br />
              <span className="text-sm">{o.plausible ? (sel.has(o.id) ? 'Plausible, and you included it.' : 'Plausible, and worth adding.') : (sel.has(o.id) ? 'This is a conclusion, not an explanation the facts support.' : 'Good call leaving this out.')} {o.why}</span></p>))}
          {def.debrief && <p className="pt-2">{def.debrief}</p>}
        </div>)}
    </div>)
}
