'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const EVIDENCE_TIERS = [
  {
    title: 'Established Knowledge',
    color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200',
    desc: 'Substantial empirical consensus, replicated clinical trials, and major international health guidelines (WHO, APA, VA/DoD, ISTSS).',
  },
  {
    title: 'Strong Evidence with Ongoing Debate',
    color: 'border-sky-500/40 bg-sky-950/30 text-sky-200',
    desc: 'Well-supported biological or psychological findings where exact mechanisms, boundaries, or causal weights remain actively researched.',
  },
  {
    title: 'Emerging / Mixed Evidence',
    color: 'border-amber-500/40 bg-amber-950/30 text-amber-200',
    desc: 'Promising preliminary studies or adjunctive practices that lack large-scale randomized replication or show variable outcomes.',
  },
  {
    title: 'Clinical / Conceptual Model',
    color: 'border-purple-500/40 bg-purple-950/30 text-purple-200',
    desc: 'Practical heuristics (e.g., Window of Tolerance) that organize clinical judgment without claiming to be literal anatomical blueprints.',
  },
  {
    title: 'Metaphor (Not Literal Biology)',
    color: 'border-pink-500/40 bg-pink-950/30 text-pink-200',
    desc: 'Poetic or experiential shorthand (e.g., "trauma stored in the tissues") that captures lived sensation but should not be confused with cellular pathology.',
  },
  {
    title: 'Cultural / Spiritual Framework',
    color: 'border-indigo-500/40 bg-indigo-950/30 text-indigo-200',
    desc: 'Communal, ancestral, and meaning-making traditions that sustain human dignity outside Western biomedical categories.',
  },
  {
    title: 'Popular Claim Exceeding the Evidence',
    color: 'border-rose-500/40 bg-rose-950/30 text-rose-200',
    desc: 'Viral social media tropes or deterministic slogans that oversimplify neuroscience or pathologize ordinary human reactions.',
  },
];

export default function GlobalHeader() {
  const [openModal, setOpenModal] = useState<'evidence' | 'library' | null>(null);
  const pathname = usePathname();
  const publicLanding = pathname === '/' || pathname === '/starter-kit' || pathname === '/privacy';
  if (publicLanding) {
    return (
      <header className="phase1-header sticky top-0 z-40 border-b border-[#617B8A]/20 bg-[#FAF6F7]/95 backdrop-blur-xl text-[#172126]">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 min-h-20 py-2 flex items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-3 shrink min-w-0 group">
            <span aria-hidden="true" className="relative w-10 h-10 shrink-0 rounded-full border border-[#3E6892]/70 flex items-center justify-center">
              <span className="absolute inset-[6px] rounded-[45%_55%_53%_47%] border border-[#EDAE9D] rotate-12" />
              <span className="absolute inset-[11px] rounded-full border border-[#617B8A] -rotate-12" />
              <span className="h-[5px] w-[5px] rounded-full bg-[#EDAE9D]" />
            </span>
            <span className="min-w-0">
              <span className="block font-brand-title text-[11px] sm:text-sm tracking-[0.09em] text-[#253E56] font-bold leading-tight">HUMANITY STUDIES</span>
              <span className="block font-serif-editorial text-[15px] sm:text-lg leading-tight italic text-[#3E6892]">The Wound Concealed</span>
            </span>
          </Link>
          <nav aria-label="Public site navigation" className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide text-[#384F60]">
            <Link href="/#course" className="hover:text-[#3E6892] transition">Explore the course</Link>
            <Link href="/starter-kit" className="hover:text-[#3E6892] transition">Free starter guide</Link>
            <Link href="/#early-access" className="hover:text-[#3E6892] transition">Early access</Link>
          </nav>
          <Link href="/#early-access" className="rounded-full border border-[#3E6892]/65 px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-semibold text-[#253E56] hover:bg-[#253E56] hover:text-white transition shrink-0">Early access <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#080C10]/90 backdrop-blur-xl text-white border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Lockup */}
          <Link href="/" className="flex items-center space-x-3 shrink-0 cursor-pointer group">
            <div className="w-9 h-9 shrink-0 rounded-full border border-[#EDAE9D] flex items-center justify-center bg-[#172126]/60 p-1 shadow-sm transition-transform group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#EDAE9D] block" fill="none" stroke="currentColor" strokeWidth="4.5">
                <ellipse cx="50" cy="50" rx="38" ry="34" transform="rotate(-15 50 50)" strokeDasharray="190 25" />
                <ellipse cx="50" cy="50" rx="33" ry="39" transform="rotate(35 50 50)" strokeDasharray="180 30" />
                <ellipse cx="50" cy="50" rx="27" ry="25" strokeDasharray="140 20" />
              </svg>
            </div>
            <div>
              <div className="font-brand-title tracking-[0.14em] text-sm sm:text-base font-bold leading-tight flex items-center gap-1.5 text-white">
                THE HUMAN AFTERMATH
                <span className="text-[8px] font-sans px-1.5 py-0.5 rounded-full bg-[#EDAE9D]/20 text-[#EDAE9D] font-extrabold tracking-normal">
                  TM
                </span>
              </div>
              <div className="text-[9.5px] tracking-[0.2em] text-[#EDAE9D]/90 uppercase font-bold font-mono">
                Understand More • Assume Less
              </div>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold">
            <Link
              href="/courses/1/m1_l1"
              className="px-3 py-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 transition"
            >
              Modules & Videos
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 transition"
            >
              Curriculum Map
            </Link>
            <Link
              href="/lab"
              className="px-3 py-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 transition"
            >
              Practice Lab
            </Link>
            <Link
              href="/certificate"
              className="px-3 py-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 transition"
            >
              Certificate
            </Link>
          </nav>

          {/* Right Quick Action Utilities */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => setOpenModal('evidence')}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#16202A] hover:bg-[#1E2B38] transition border border-white/10 flex items-center gap-1.5 text-[#BBD4C5] shadow-sm"
            >
              <span>🧭</span>
              <span className="hidden xl:inline">Evidence Key</span>
            </button>
            <a
              href="/masterclass.html"
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EDAE9D] to-[#E29B88] text-[#080C10] hover:brightness-105 transition flex items-center gap-1.5 shadow-sm"
              title="Open the complete all-in-one interactive suite with audio podcast, 15 slides, and all 19 Vimeo videos"
            >
              <span>✦</span>
              <span className="hidden sm:inline">Full Suite</span>
            </a>
          </div>
        </div>
      </header>

      {/* MODAL: Evidence Compass Key */}
      {openModal === 'evidence' && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#10161E] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] font-bold block">
                  Epistemic Rigor
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  The Evidence Compass (7 Knowledge Classifications)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              {EVIDENCE_TIERS.map((t) => (
                <div key={t.title} className={`p-3.5 rounded-2xl border ${t.color}`}>
                  <div className="font-bold">{t.title}</div>
                  <p className="text-xs mt-1 opacity-90 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
