'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { issueCredential } from '@/app/actions';

export default function CertificatePage() {
  const [name, setName] = useState('');
  const [code, setCode] = useState<string | null>(null);
  const [err, setErr] = useState<string>('');
  const [pending, start] = useTransition();

  const go = () =>
    start(async () => {
      setErr('');
      const r = await issueCredential(name);
      if (r.ok && r.code) {
        setCode(r.code);
      } else {
        setErr(r.error ?? 'Failed to issue credential.');
      }
    });

  if (code) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 selection:bg-[#617b8a]/30">
        <div className="max-w-xl w-full p-8 rounded-2xl border border-white/10 glass-surface text-center space-y-6">
          <div className="w-16 h-16 rounded-full border border-[#EDAE9D] bg-[#EDAE9D]/10 mx-auto flex items-center justify-center text-2xl text-[#EDAE9D]">
            📜
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] block mb-1">
              Official Credential Issued
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-white">
              Certificate of Educational Completion
            </h1>
            <p className="text-xs text-stone-300 mt-2">
              Awarded to <span className="font-bold text-white">{name || 'Enrolled Learner'}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C10]/80 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
              Verification Code
            </span>
            <span className="text-lg font-mono font-bold tracking-widest text-[#EDAE9D]">
              {code}
            </span>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="btn-luxury-primary px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              Print / Save PDF
            </button>
            <Link
              href="/"
              className="btn-luxury-glass px-5 py-2.5 rounded-xl text-xs font-semibold"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 selection:bg-[#617b8a]/30">
      <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 glass-surface space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] block mb-1">
            Course Completion
          </span>
          <h1 className="text-2xl font-serif-editorial font-bold text-white">
            Issue Your Certificate
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Enter your name as you would like it to appear on your verified record.
          </p>
        </div>

        {err && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-200">
            {err}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-300 block">
            Full Legal / Professional Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Christina Varney"
            className="w-full px-4 py-2.5 rounded-xl bg-[#080C10]/80 border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#EDAE9D]"
          />
        </div>

        <button
          onClick={go}
          disabled={pending || !name.trim()}
          className="w-full btn-luxury-primary py-3 rounded-xl text-xs font-bold uppercase tracking-wider disabled:opacity-50"
        >
          {pending ? 'Generating Verified Code...' : 'Issue Certificate'}
        </button>
      </div>
    </div>
  );
}