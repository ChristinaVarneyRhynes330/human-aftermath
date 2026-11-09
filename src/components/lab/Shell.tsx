import Link from 'next/link';
import type { Base } from '@/lib/lab/types';

export default function Shell({ title, def, children }: { title: string; def: Base; children: React.ReactNode }) {
  return (
    <section aria-labelledby="lab-title" className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h1 id="lab-title" className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        <Link href="/lab" className="text-xs font-mono text-[#EDAE9D] hover:underline">
          ← Back to Lab
        </Link>
      </div>
      <div className="p-4 rounded-xl glass-surface space-y-2 text-xs sm:text-sm">
        <p className="text-stone-300"><strong className="text-[#EDAE9D] font-mono uppercase text-xs">Purpose:</strong> {def.purpose}</p>
        <p className="text-stone-400"><strong className="text-[#BBD4C5] font-mono uppercase text-xs">Instructions:</strong> {def.instruction}</p>
        <p className="text-xs text-stone-500 pt-1">
          You may skip this activity at any time. <Link href="/lab" className="text-[#EDAE9D] underline">Skip to Lab Index</Link>
        </p>
      </div>
      <div className="mt-6">{children}</div>
      {def.accessibility_alternative && (
        <details className="mt-8 text-xs text-stone-400 p-3 rounded-lg border border-white/5 bg-[#10161E]/50">
          <summary className="cursor-pointer font-semibold text-stone-300">Accessibility Alternative</summary>
          <p className="mt-2 text-stone-400 leading-relaxed">{def.accessibility_alternative}</p>
        </details>
      )}
    </section>
  );
}
