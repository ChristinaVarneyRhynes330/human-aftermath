'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { deriveKey, encryptText, decryptText } from '@/lib/journal-crypto'

export default function JournalBox({ userId, lessonId }: { userId: string; lessonId: string }) {
  const supabase = createClient()
  const [pass, setPass] = useState(''); const [key, setKey] = useState<CryptoKey | null>(null)
  const [text, setText] = useState(''); const [rowId, setRowId] = useState<string | null>(null); const [status, setStatus] = useState('')

  async function unlock() {
    try {
      const k = await deriveKey(pass, userId)
      const { data } = await supabase.from('journal_entries').select('id,ciphertext,iv').eq('lesson_id', lessonId).eq('user_id', userId).maybeSingle()
      if (data) { setText(await decryptText(k, data.ciphertext, data.iv)); setRowId(data.id) }
      setKey(k); setStatus('')
    } catch { setStatus('That passphrase did not unlock your saved entry.') }
  }
  async function save() {
    if (!key) return
    const { ciphertext, iv } = await encryptText(key, text)
    const row = { user_id: userId, lesson_id: lessonId, ciphertext, iv, updated_at: new Date().toISOString() }
    const { error } = rowId ? await supabase.from('journal_entries').update(row).eq('id', rowId)
      : await supabase.from('journal_entries').insert(row).select('id').single().then(r => { if (r.data) setRowId(r.data.id); return r })
    setStatus(error ? 'Could not save. Try again.' : 'Saved and encrypted.')
  }
  useEffect(() => setStatus(''), [text])

  if (!key) return (
    <div className="mt-3 rounded-lg border border-slate/40 bg-white p-4">
      <label className="block text-sm font-medium">Journal passphrase
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="mt-1 w-full rounded border border-slate p-2" /></label>
      <p className="mt-1 text-sm text-ink-soft">Your journal is encrypted in your browser. We cannot read it, and we cannot recover this passphrase if you lose it.</p>
      <button onClick={unlock} disabled={pass.length < 8} className="mt-2 rounded bg-ink-blue px-4 py-2 text-white disabled:opacity-50">Unlock journal</button>
      {status && <p role="alert" className="mt-2 text-sm">{status}</p>}
    </div>)
  return (
    <div className="mt-3">
      <label className="block text-sm font-medium">Your private reflection
        <textarea value={text} onChange={e => setText(e.target.value)} rows={5} className="mt-1 w-full rounded-lg border border-slate bg-white p-3" /></label>
      <button onClick={save} className="mt-2 rounded bg-ink-blue px-4 py-2 text-white">Save reflection</button>
      <span role="status" className="ml-3 text-sm">{status}</span>
    </div>)
}
