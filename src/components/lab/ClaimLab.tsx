'use client'
import { useState } from 'react'
import type { ClaimLabDef } from '@/lib/lab/types'

export default function ClaimLab({ def }: { def: ClaimLabDef }) {
  const [picked, setPicked] = useState<string | null>(null)
  const choice = def.choices.find(c => c.id === picked)
  return (
    <div>
      <blockquote className="rounded-lg border-l-4 border-ink-blue bg-white p-4 text-xl font-serif">“{def.claim}”</blockquote>
      <p className="mt-2 text-sm text-ink-soft">Evidence status: <strong>{def.evidence_status}</strong></p>
      <fieldset className="mt-5"><legend className="font-medium">How would you respond to this claim?</legend>
        {def.choices.map(c => (
          <label key={c.id} className="mt-2 flex gap-2 rounded-lg border border-slate/40 bg-white p-3">
            <input type="radio" name="claim" disabled={!!picked} onChange={() => setPicked(c.id)} /><span>{c.text}</span></label>))}
      </fieldset>
      {choice && (
        <div role="status" className="mt-5 rounded-xl border border-slate/40 bg-white p-5">
          <p className="font-medium">{choice.correct ? 'Responsible reasoning.' : 'Consider this instead.'}</p>
          <p className="mt-1">{choice.feedback}</p>
          <p className="mt-3"><strong>A more precise way to say it:</strong> {def.responsible_version}</p>
        </div>)}
    </div>)
}
