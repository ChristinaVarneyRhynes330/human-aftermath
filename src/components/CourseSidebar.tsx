'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type SidebarModule = {
  num: number;
  title: string;
  lessons: Array<{ slug: string; title: string }>;
};

const labTools = [
  { name: 'Claim Lab', href: '/lab/claim-01' },
  { name: 'Workplace Sim', href: '/lab/sim-workplace-overwhelm' },
  { name: 'Public Distress', href: '/lab/sim-public-distress' },
  { name: 'Diagnostic Sort', href: '/lab/observe-interpret-diagnose' },
  { name: 'Alt Explanations', href: '/lab/what-else-could-explain' },
  { name: 'Removal Day Sim', href: '/lab/cw-removal-day' },
];

export default function CourseSidebar({ modules }: { modules: SidebarModule[] }) {
  const pathname = usePathname() || '';
  const matchMod = pathname.match(/^\/courses\/(\d+)/);
  const currentModNum = matchMod ? parseInt(matchMod[1], 10) : 1;

  const [openMods, setOpenMods] = useState<Record<number, boolean>>({
    [currentModNum]: true,
  });

  const toggleMod = (num: number) => {
    setOpenMods((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <aside className="w-80 shrink-0 border-r border-white/10 bg-[#10161E]/80 backdrop-blur-xl h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto flex-col justify-between hidden lg:flex">
      <div>
        {/* Curriculum Header */}
        <div className="p-4 border-b border-white/10 bg-[#16202A]/90 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#EDAE9D] font-extrabold block">
              Course Curriculum
            </span>
            <div className="text-xs font-semibold text-white">8 Modules • 65 Lessons • 19 Videos</div>
          </div>
        </div>

        {/* Full Standalone Masterclass Mode Launcher */}
        <div className="p-3 border-b border-white/10 bg-[#121C27]">
          <a
            href="/masterclass.html"
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#EDAE9D] to-[#E29B88] text-[#080C10] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition"
          >
            <span>✦</span>
            <span>Launch Full Interactive Suite</span>
          </a>
        </div>

        {/* Signature Interactive Labs Quick Bar */}
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

        {/* Expandable Module Accordions */}
        <div className="p-2.5 space-y-2">
          {modules.map((m) => {
            const isOpen = !!openMods[m.num];
            const isActiveMod = currentModNum === m.num;

            return (
              <div
                key={m.num}
                className={`rounded-xl border transition overflow-hidden ${
                  isActiveMod ? 'border-[#EDAE9D]/40 bg-[#141D27]' : 'border-white/5 bg-[#10161E]/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleMod(m.num)}
                  className="w-full flex items-center justify-between p-2.5 text-left hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="w-6 h-6 rounded-full bg-[#1B2B3A] flex items-center justify-center text-[10px] font-mono text-[#EDAE9D] shrink-0 font-bold border border-white/10">
                      {m.num}
                    </span>
                    <span className="truncate text-xs text-stone-200 font-semibold font-serif-editorial">
                      {m.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 shrink-0">
                    {isOpen ? '▾' : '▸'} {m.lessons.length}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/5 divide-y divide-white/5 bg-[#0A0F14]/80 text-[11px]">
                    {m.lessons.map((les, idx) => {
                      const href = `/courses/${m.num}/${les.slug}`;
                      const isCurrent = pathname === href;
                      return (
                        <Link
                          key={les.slug}
                          href={href}
                          className={`flex items-center justify-between p-2.5 pl-4 transition ${
                            isCurrent
                              ? 'bg-[#3E6892]/25 border-l-2 border-[#EDAE9D] text-[#EDAE9D] font-bold'
                              : 'text-stone-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate pr-2">
                            {idx + 1}. {les.title.replace(/^LESSON \d+:\s*/i, '')}
                          </span>
                        </Link>
                      );
                    })}

                    {/* End-of-Module Video Recap & Synthesis Link */}
                    <Link
                      href={`/courses/${m.num}/recap`}
                      className={`flex items-center justify-between p-2.5 pl-4 bg-[#16202A]/60 hover:bg-[#16202A] transition ${
                        pathname === `/courses/${m.num}/recap`
                          ? 'border-l-2 border-[#EDAE9D] text-[#EDAE9D] font-bold'
                          : 'text-[#EDAE9D]/90'
                      }`}
                    >
                      <span className="truncate pr-2 flex items-center gap-1.5">
                        <span>🎬</span>
                        <span>Module {m.num} Video Recap & Synthesis</span>
                      </span>
                      <span className="text-[9px] font-mono uppercase bg-[#EDAE9D]/20 text-[#EDAE9D] px-1.5 py-0.5 rounded">
                        Recap
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-white/10 text-center text-xs bg-[#0C1218]">
        <Link
          href="/dashboard"
          className="w-full py-2.5 px-3 rounded-xl bg-[#2C4A68] hover:bg-[#3E6892] text-white transition flex items-center justify-center gap-2 font-semibold shadow-sm"
        >
          <span>◎</span>
          <span>Full Curriculum Overview</span>
        </Link>
      </div>
    </aside>
  );
}
