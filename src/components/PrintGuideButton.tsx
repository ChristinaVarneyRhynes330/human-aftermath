'use client';
export default function PrintGuideButton() {
  return <button type="button" onClick={() => window.print()} className="rounded-full bg-[#EDAE9D] px-5 py-2.5 text-sm font-semibold text-[#101B1E] hover:bg-[#F1BFAC] transition print:hidden">Print / Save guide as PDF ↗</button>;
}
