'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'in' | 'up'>('in'); const [msg, setMsg] = useState('')
  const supabase = createClient()
  const next = typeof window !== 'undefined' ? new URLSearchParams(location.search).get('next') || '/dashboard' : '/dashboard'

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setMsg('')
    const { error } = mode === 'in'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/dashboard` } })
    if (error) return setMsg(error.message)
    if (mode === 'up') return setMsg('Check your email to confirm your account.')
    location.href = next
  }
  const oauth = (provider: 'google' | 'azure') =>
    supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${location.origin}/dashboard`, scopes: provider === 'azure' ? 'email' : undefined } })

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-serif text-3xl">{mode === 'in' ? 'Sign in' : 'Create your account'}</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium">Email
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate bg-white p-3" autoComplete="email" /></label>
        <label className="block text-sm font-medium">Password
          <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate bg-white p-3" autoComplete={mode === 'in' ? 'current-password' : 'new-password'} /></label>
        <button className="w-full rounded-lg bg-ink-blue p-3 font-medium text-white">{mode === 'in' ? 'Sign in' : 'Create account'}</button>
        {msg && <p role="alert" className="text-sm text-ink">{msg}</p>}
      </form>
      <div className="mt-4 grid gap-2">
        <button onClick={() => oauth('google')} className="rounded-lg border border-slate bg-white p-3 text-sm">Continue with Google</button>
        <button onClick={() => oauth('azure')} className="rounded-lg border border-slate bg-white p-3 text-sm">Continue with Microsoft</button>
      </div>
      <button onClick={() => setMode(mode === 'in' ? 'up' : 'in')} className="mt-6 text-sm text-ink-blue underline underline-offset-4">
        {mode === 'in' ? 'New here? Create an account' : 'Already have an account? Sign in'}
      </button>
    </div>
  )
}
