'use client'
import { useState, useTransition } from 'react'
import { issueCredential } from '@/app/actions'

export default function Certificate() {
  const [name, setName] = useState(''); const [code, setCode] = useState<string | null>(null)
  const [err, setErr] = useState(''); const [pending, start] = useTransition()
  const go = () => start(async () => { const r = await issueCredential(name); if (r.ok) setCode(r.code); else setErr(r.error) })

  if (code) return (
    <div>
      <div className="mx-auto max-w-2xl rounded-2xl border-4 border-double border-peach bg-white p-8 text-center print:border-black">
        <p className="text-sm text-ink-soft">Certificate of Educational Completion</p>
        <h1 className="mt-2 font-serif text-4xl">{name}</h1>
        <p className="mt-3">has completed <strong>The Human Aftermath™</strong></p>
        <p className="mt-6 text-sm">Credential ID <strong>{code}</strong></p>
        <p className="text-sm text-ink-soft">Verify at {typeof location !== 'undefined' ? location.origin : ''}/verify/{code}</p>
        <p className="mt-6 text-xs text-ink-soft">Educational recognition only. This certificate does not confer clinical licensing or continuing-education credit unless separately accredited.</p>
      </div>
      <button onClick={() => window.print()} className="mx-auto mt-6 block rounded-lg bg-ink-blue px-5 py-2 text-white print:hidden">Print certificate</button>
    </div>)
  return (
    <div className="max-w-md">
      <h1 className="font-serif text-3xl">Your certificate</h1>
      <p className="mt-2 text-ink-soft">Available once every lesson is complete.</p>
      <label className="mt-4 block text-sm font-medium">Full name as it should appear
        <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate bg-white p-3" /></label>
      <button onClick={go} disabled={pending} className="mt-3 rounded-lg bg-ink-blue px-5 py-2 font-medium text-white disabled:opacity-50">Issue certificate</button>
      {err && <p role="alert" className="mt-3">{err}</p>}
    </div>)
}
