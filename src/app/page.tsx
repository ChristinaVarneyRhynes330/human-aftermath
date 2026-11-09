'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const modules = [
  { id: 1, title: 'Trauma: What Are We Actually Talking About?', slug: 'm1_l1', masterVimeo: '1244519972', recapVimeo: '1244519651', duration: '7:36', count: '6 Lessons' },
  { id: 2, title: 'Survival: The Brain, Body & Stress Systems', slug: 'm2_l1', masterVimeo: '1244519928', recapVimeo: '1244519650', duration: '8:27', count: '6 Lessons' },
  { id: 3, title: 'Memory, Dissociation & The Experience of "Still Being There"', slug: 'm3_l1', masterVimeo: '1244519918', recapVimeo: '1244519603', duration: '8:14', count: '7 Lessons' },
  { id: 4, title: 'Trauma Across a Lifetime', slug: 'm4_l1', masterVimeo: '1244519860', recapVimeo: '1244519618', duration: '8:02', count: '9 Lessons' },
  { id: 5, title: 'PTSD, Complex Trauma & Related Experiences', slug: 'm5_l1', masterVimeo: '1244519709', recapVimeo: '1244519617', duration: '7:50', count: '10 Lessons' },
  { id: 6, title: 'Coping, Addiction & Survival Strategies', slug: 'm6_l1', masterVimeo: '1244519839', recapVimeo: '1244519605', duration: '8:35', count: '10 Lessons' },
  { id: 7, title: 'Healing, Treatment & What the Evidence Actually Says', slug: 'm7_l1', masterVimeo: '1244519700', recapVimeo: '1244519604', duration: '8:45', count: '7 Lessons' },
  { id: 8, title: 'Trauma-Informed Humanity & Practical Mastery', slug: 'm8_l1', masterVimeo: '1244519697', recapVimeo: '1244527908', duration: '10:00', count: '10 Lessons' },
];

const labTools = [
  { name: 'Claim Lab', href: '/lab/claim-01' },
  { name: 'Workplace Sim', href: '/lab/sim-workplace-overwhelm' },
  { name: 'Public Distress', href: '/lab/sim-public-distress' },
  { name: 'Diagnostic Sort', href: '/lab/observe-interpret-diagnose' },
  { name: 'Alt Explanations', href: '/lab/what-else-could-explain' },
  { name: 'Removal Day Sim', href: '/lab/cw-removal-day' },
];

const LENS_DETAILS: Record<string, { q: string; o: string; l: string }> = {
  BODY: {
    q: 'What autonomic circuits and neuroendocrine cascades are mobilizing survival triage?',
    o: 'Observes sympathetic mobilization, heart rate variability, cortisol calibration, and defensive freezing.',
    l: 'Without psychology and environment, the body reduces human suffering to mechanical chemistry.',
  },
  MEMORY: {
    q: 'How did noradrenergic floods alter hippocampal time-stamping during encoding?',
    o: 'Observes unmoored sensory fragments, flashbacks, intrusive recall, and the absence of temporal timestamps.',
    l: 'Without meaning and relationships, memory science treats memory as a broken file rather than a survival adaptation.',
  },
  DEVELOPMENT: {
    q: 'At what developmental life stage did this adversity strike, and what hardware existed?',
    o: 'Observes infant co-regulation, childhood egocentrism and self-blame, adolescent remodeling, and earned security.',
    l: 'Without lifespan timing, we judge adult coping without understanding the childhood soil it grew from.',
  },
  RELATIONSHIPS: {
    q: 'Within what relational bond did harm occur, and where does relational attunement exist today?',
    o: 'Observes caregiver betrayal, attachment styles, co-regulation, and boundary dynamics.',
    l: 'Without social systems, relationships are examined as isolated private dyads ignoring systemic power.',
  },
  ENVIRONMENT: {
    q: 'What economic buffers, housing stability, physical safety, and resources exist around this person?',
    o: 'Observes poverty, community violence, legal protections, healthcare access, and physical shelter.',
    l: 'Without environment, psychology commits the error of pathologizing people for having normal reactions to unsafe conditions.',
  },
  CULTURE: {
    q: 'How does this community construct meaning, ritual, spiritual resonance, and collective witnessing?',
    o: 'Observes cultural idioms of distress, traditional healing frameworks, and historical trauma narratives.',
    l: 'Without culture, Western psychiatric categories are falsely exported as culture-free universal truth.',
  },
  MEANING: {
    q: 'What narrative meaning does the survivor assign to this experience?',
    o: 'Observes moral injury, existential crisis, shattered core assumptions, and post-traumatic integration.',
    l: 'Without meaning, symptom reduction leaves the human heart without purpose or peace.',
  },
  SYSTEMS: {
    q: 'How do institutional policies, power hierarchies, and disciplinary codes resist retraumatization?',
    o: 'Observes institutional betrayal, school disciplinary traps, workplace policies, and upstream prevention.',
    l: 'Without systems thinking, organizations lecture traumatized individuals on grit while perpetuating harm.',
  },
};

export default function HomePage() {
  const [selectedLens, setSelectedLens] = useState<string>('BODY');

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
      {/* Left Curriculum Sidebar */}
      <aside className="w-80 shrink-0 border-r border-white/10 bg-[#10161E]/70 backdrop-blur-xl h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto flex-col justify-between hidden lg:flex">
        <div>
          {/* Curriculum Header */}
          <div className="p-4 border-b border-white/10 bg-[#16202A]/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#EDAE9D] font-extrabold block">
                Course Curriculum
              </span>
              <div className="text-xs font-semibold text-white">8 Modules • 65 Lessons • 19 Videos</div>
            </div>
          </div>

          {/* Interactive Labs Quick Bar */}
          <div className="p-3 border-b border-white/10 bg-[#0D131A]">
            <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#617B8A] mb-2">
              Signature Interactive Labs
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {labTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="px-2 py-1.5 rounded-lg bg-[#16202A] border border-white/5 hover:border-[#EDAE9D]/60 transition flex items-center gap-1.5 text-[#E2E8F0]"
                >
                  <span className="text-xs text-[#EDAE9D]">❖</span>
                  <span className="truncate font-medium">{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Module Hierarchy with Direct Video & Recap Access */}
          <div className="p-2.5 space-y-2">
            {modules.map((m) => (
              <div
                key={m.id}
                className="p-2.5 rounded-xl bg-[#141D27]/70 border border-white/5 hover:border-[#EDAE9D]/40 transition text-xs space-y-2"
              >
                <Link href={`/courses/${m.id}/${m.slug}`} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="w-6 h-6 rounded-full bg-[#1B2B3A] flex items-center justify-center text-[10px] font-mono text-[#EDAE9D] shrink-0 font-bold border border-white/10">
                      {m.id}
                    </span>
                    <span className="truncate text-stone-200 group-hover:text-white font-semibold">
                      {m.title}
                    </span>
                  </div>
                </Link>
                <div className="flex items-center justify-between pl-8 text-[10px] font-mono">
                  <Link href={`/courses/${m.id}/${m.slug}`} className="text-stone-400 hover:text-white">
                    📹 Video ({m.duration})
                  </Link>
                  <Link href={`/courses/${m.id}/recap`} className="text-[#EDAE9D] hover:underline font-bold">
                    🎬 End Recap →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 text-center text-xs bg-[#0C1218]">
          <a
            href="/masterclass.html"
            className="w-full py-2.5 px-3 rounded-xl bg-[#2C4A68] hover:bg-[#3E6892] text-white transition flex items-center justify-center gap-2 font-semibold shadow-sm"
          >
            <span>◎</span>
            <span>Open Complete Masterclass Suite</span>
          </a>
        </div>
      </aside>

      {/* Main Viewport Content */}
      <main className="flex-1 p-6 lg:p-10 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12 pb-16">
          {/* 1. Cinematic Hero Card */}
          <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#121C27] via-[#0D151E] to-[#080C10] border border-white/10 shadow-2xl">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3E6892]/25 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-[#EDAE9D]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#EDAE9D] animate-ping" />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-[#EDAE9D]">
                  Masterclass Course
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-[11px] text-stone-300 font-medium">8 Multidisciplinary Modules</span>
              </div>

              <div>
                <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] mb-3">
                  THE HUMAN <span className="font-normal italic text-[#EDAE9D]">AFTERMATH</span>
                  <span className="text-xs text-[#EDAE9D] align-top ml-1">TM</span>
                </h1>
                <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl">
                  A definitive, evidence-grounded masterclass exploring trauma, evolutionary survival adaptations, and restorative recovery across the human experience.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border-l-2 border-[#EDAE9D] backdrop-blur-md">
                <p className="font-serif-editorial italic text-base sm:text-lg text-[#FFD2C6]/90">
                  &ldquo;People are not problems to solve. They are human beings to understand.&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/courses/1/m1_l1"
                  className="btn-luxury-primary px-7 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5"
                >
                  <span>Begin Module 1: Foundations</span>
                  <span className="text-[#080C10] font-bold">→</span>
                </Link>
                <a
                  href="/masterclass.html"
                  className="btn-luxury-glass px-5 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>✦</span>
                  <span>Full Interactive Suite (Podcast + 15 Slides)</span>
                </a>
                <Link
                  href="/lab"
                  className="btn-luxury-steel px-5 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2"
                >
                  <span className="text-[#EDAE9D]">❖</span>
                  <span>Practice Lab</span>
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-stone-400 font-medium border-t border-white/10 font-mono text-[11px]">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <span className="text-[#EDAE9D]">📹</span> 19 Videos (8 Masterclasses + 9 Recaps + Trailer)
                </span>
                <span className="text-stone-600">•</span>
                <span className="flex items-center gap-1.5 text-stone-300">
                  <span className="text-[#BBD4C5]">🎙</span> 39-Min Audio Podcast
                </span>
                <span className="text-stone-600">•</span>
                <span className="flex items-center gap-1.5 text-stone-300">
                  <span className="text-[#EDAE9D]">📑</span> 15 Master Slides
                </span>
              </div>
            </div>
          </div>

          {/* 2. Official Course Master Trailer (1:47) */}
          <div className="p-6 sm:p-8 rounded-3xl glass-surface space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EDAE9D] animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-extrabold text-[#EDAE9D]">
                    Official Master Trailer
                  </span>
                  <span className="text-xs text-stone-400">• The Human Aftermath (1:47)</span>
                </div>
                <h2 className="font-serif-editorial text-xl sm:text-2xl font-light text-white mt-1">
                  &ldquo;What happens after something becomes too much to carry?&rdquo;
                </h2>
              </div>
              <span className="text-xs font-mono text-[#BBD4C5] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Vimeo HD 1080p
              </span>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative border border-white/10 shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/1244519666?badge=0&autopause=0&player_id=0&app_id=58479"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Official Master Trailer"
              />
            </div>
          </div>

          {/* 3. The 8 Modules Grid with Direct Masterclass Video & End-of-Module Recap Links */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] font-bold block">
                  Complete Video & Lesson Architecture
                </span>
                <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                  8 Multidisciplinary Modules (Each with Masterclass & End Recap)
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl glass-surface-interactive flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#3E6892]/30 text-[#EDAE9D] border border-[#EDAE9D]/30 font-bold">
                        MODULE {m.id}
                      </span>
                      <span className="text-stone-400">{m.count} • {m.duration} Video</span>
                    </div>
                    <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-white leading-snug">
                      {m.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                    <Link
                      href={`/courses/${m.id}/${m.slug}`}
                      className="btn-luxury-primary px-4 py-2 rounded-xl font-bold flex items-center gap-1.5"
                    >
                      <span>▶ Start Module & Video</span>
                    </Link>
                    <Link
                      href={`/courses/${m.id}/recap`}
                      className="btn-luxury-glass px-3.5 py-2 rounded-xl font-semibold text-[#EDAE9D] flex items-center gap-1.5"
                    >
                      <span>🎬 Module {m.id} Recap</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. The 8 Lenses of Human Adaptation Interactive Explorer */}
          <div className="p-6 sm:p-8 rounded-3xl glass-surface space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-[#EDAE9D]">
                Interactive Synthesis
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold text-white mt-1">
                The 8 Lenses of Human Adaptation
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Click any lens below to inspect the specific question that discipline brings to human survival:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.keys(LENS_DETAILS).map((lens) => (
                <button
                  key={lens}
                  type="button"
                  onClick={() => setSelectedLens(lens)}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold tracking-wider transition ${
                    selectedLens === lens
                      ? 'bg-[#3E6892] border-[#EDAE9D] text-white shadow-lg'
                      : 'bg-[#080C10]/60 border-white/10 text-stone-300 hover:border-[#EDAE9D]/50'
                  }`}
                >
                  {lens}
                </button>
              ))}
            </div>

            {LENS_DETAILS[selectedLens] && (
              <div className="p-5 rounded-2xl bg-[#080C10]/90 border border-[#EDAE9D]/30 space-y-2 text-xs sm:text-sm">
                <div className="font-serif-editorial font-bold text-base sm:text-lg text-[#EDAE9D]">
                  The {selectedLens} Lens: &ldquo;{LENS_DETAILS[selectedLens].q}&rdquo;
                </div>
                <p className="text-stone-300">
                  <strong className="text-[#BBD4C5]">What it observes:</strong> {LENS_DETAILS[selectedLens].o}
                </p>
                <p className="text-rose-200/90">
                  <strong className="text-[#EDAE9D]">Why it is incomplete alone:</strong> {LENS_DETAILS[selectedLens].l}
                </p>
              </div>
            )}
          </div>

          {/* 5. Documentary Visual Anchor Frame */}
          <div className="rounded-3xl border border-white/10 glass-surface overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#EDAE9D] uppercase block">
                  Documentary Visual Anchor
                </span>
                <span className="text-xs text-stone-400 font-light font-serif-editorial italic">
                  Quiet resilience: decoding the invisible burden of survival adaptations
                </span>
              </div>
            </div>

            <div className="aspect-video w-full bg-black relative">
              <iframe
                src="https://player.vimeo.com/video/1244527908?badge=0&autopause=0&player_id=0&app_id=58479"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Documentary Visual Anchor"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
