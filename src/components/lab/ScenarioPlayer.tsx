'use client'
import { useState, useTransition } from 'react'
import type { Choice, ScenarioDef } from '@/lib/lab/types'
import { scoreScenario, LEVEL_LABEL } from '@/lib/lab/scoring'
import { recordLabAttempt } from '@/app/lab/actions'

export default function ScenarioPlayer({ slug, def }: { slug: string; def: ScenarioDef }) {
  const [path, setPath] = useState<string[]>([])
  const [node, setNode] = useState<string | undefined>(def.start)
  const [last, setLast] = useState<Choice | null>(null)
  const [saved, setSaved] = useState(''); const [pending, start] = useTransition()
  const current = node ? def.nodes[node] : null
  const finished = !node && !last?.next
  const result = finished ? scoreScenario(def, path) : null

  function pick(c: Choice) { setLast(c); setPath(p => [...p, c.id]) }
  function advance() { setNode(last?.end ? undefined : last?.next); setLast(null) }
  function save() { start(async () => { const r = await recordLabAttempt(slug, path); setSaved(r.ok ? 'Attempt saved.' : r.error) }) }

  return (
    <div>
      {def.status && <p role="note" className="mb-4 rounded-lg border border-peach bg-blush/40 p-3 text-sm"><strong>Draft content.</strong> {def.status}</p>}
      <p className="rounded-lg bg-mint/40 p-4">{def.setting}</p>

      {current && !last && (
        <div className="mt-6">
          <p className="text-lg">{current.narrative}</p>
          <h2 className="mt-4 font-serif text-xl">{current.prompt}</h2>
          <ul className="mt-3 space-y-3">
            {current.choices.map(c => (
              <li key={c.id}><button onClick={() => pick(c)} className="w-full rounded-lg border border-slate bg-white p-4 text-left hover:border-ink-blue">{c.text}</button></li>))}
          </ul>
        </div>)}

      {last && (
        <div role="status" className="mt-6 rounded-xl border border-slate/40 bg-white p-5">
          <p className="text-sm text-ink-soft">You chose</p>
          <p className="mt-1">{last.text}</p>
          <p className="mt-4">{last.feedback}</p>
          <button onClick={advance} className="mt-4 rounded-lg bg-ink-blue px-5 py-2 font-medium text-white">{last.end ? 'See your results' : 'Continue'}</button>
        </div>)}

      {result && (
        <div className="mt-6">
          <h2 className="font-serif text-2xl">{result.passed ? 'You met the standard for this scenario' : 'Not yet at the standard for this scenario'}</h2>
          {result.criticalChoices.length > 0 && <p role="alert" className="mt-2">At least one choice left a child exposed to risk or undermined the safety plan. That alone means a retry, whatever else went well.</p>}
          <table className="mt-4 w-full border-collapse text-left">
            <caption className="sr-only">Results by skill</caption>
            <thead><tr><th className="border-b p-2">Skill</th><th className="border-b p-2">Level</th></tr></thead>
            <tbody>{result.dimensions.map(d => (
              <tr key={d.id}><td className="border-b p-2">{d.label}</td><td className="border-b p-2 font-medium">{LEVEL_LABEL[d.level]}</td></tr>))}</tbody>
          </table>
          {def.debrief && <p className="mt-4 max-w-prose">{def.debrief}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={save} disabled={pending || !!saved} className="rounded-lg bg-ink-blue px-5 py-2 text-white disabled:opacity-50">Save this attempt</button>
            <button onClick={() => { setPath([]); setNode(def.start); setLast(null); setSaved('') }} className="rounded-lg border border-ink-blue px-5 py-2 text-ink-blue">Try again</button>
            <span role="status" className="text-sm">{saved}</span>
          </div>
        </div>)}
    </div>
  )
}
