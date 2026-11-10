'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function WaitlistForm({ enabled = false }: { enabled?: boolean }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent || state === 'sending') return;
    setState('sending');
    setMessage('');
    const turnstileToken = String(new FormData(e.currentTarget).get('cf-turnstile-response') || '');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, website, turnstileToken, source: 'phase1-landing' }),
      });
      const data = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) throw new Error(data.message || 'Signup is temporarily unavailable. Please try again.');
      setState('success');
      setMessage(data.message || "You're on the early-access list.");
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Unable to sign up right now.');
    }
  }

  if (!enabled) {
    return <div className="rounded-2xl border border-[#BBD4C5]/35 bg-white/5 p-6" role="status">
      <p className="font-serif-editorial text-3xl text-[#F8F2EA]">The invitation list opens soon.</p>
      <p className="mt-3 text-sm text-[#CDD9D2] leading-7">We're preparing the signup service and privacy safeguards. The free learning guide is already available; no email is required to read it.</p>
      <Link href="/starter-kit" className="inline-flex mt-5 text-sm font-semibold text-[#EDAE9D] underline underline-offset-4">Read the free starter guide →</Link>
    </div>;
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-[#BBD4C5]/40 bg-[#BBD4C5]/10 p-6" role="status" aria-live="polite">
        <span className="text-[#BBD4C5] text-3xl" aria-hidden="true">✓</span>
        <h3 className="font-serif-editorial text-3xl text-white mt-2">Your interest is noted.</h3>
        <p className="text-stone-200 text-sm mt-2 leading-7">{message}</p>
        <p className="text-stone-400 text-xs mt-2">Your email has been received; email ownership has not yet been verified.</p>
        <Link href="/starter-kit" className="inline-flex mt-5 text-[#EDAE9D] underline underline-offset-4 font-semibold text-sm">Explore the free starter guide →</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" aria-label="Join the course early-access list">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="site-url">Leave this field empty</label>
        <input id="site-url" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div>
        <label htmlFor="early-email" className="block text-[11px] uppercase tracking-[0.16em] text-[#BBD4C5] font-semibold mb-2">Email address</label>
        <input id="early-email" type="email" autoComplete="email" required maxLength={254}
          value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
          className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder:text-stone-500 outline-none focus:border-[#EDAE9D] focus:ring-2 focus:ring-[#EDAE9D]/30" />
      </div>
      <label className="flex gap-3 text-xs text-stone-200 leading-6 cursor-pointer">
        <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)}
          className="mt-1 size-4 accent-[#EDAE9D] shrink-0" />
        <span>I agree to receive launch updates and free educational resources from The Human Aftermath™ by email. I can unsubscribe anytime. See the <Link className="underline text-[#EDAE9D]" href="/privacy">privacy notice</Link>.</span>
      </label>
      <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="dark" aria-label="Human verification"></div>
      <button type="submit" disabled={!consent || state === 'sending'} className="btn-luxury-primary w-full rounded-xl px-5 py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
        {state === 'sending' ? 'Joining…' : 'Join the early-access list →'}
      </button>
      {state === 'error' && <p role="alert" className="text-[#F5C2B4] text-sm">{message}</p>}
      <p className="text-xs leading-6 text-stone-400">No payment today. No pressure to share your personal history. The full learning platform is still in development.</p>
    </form>
  );
}
