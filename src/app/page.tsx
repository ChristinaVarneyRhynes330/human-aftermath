import Link from 'next/link';

const modules = [
  { id: 1, title: 'Trauma: What Are We Actually Talking About?', count: '0/6' },
  { id: 2, title: 'Survival: The Brain, Body & Stress Systems', count: '0/6' },
  { id: 3, title: 'Memory, Dissociation & The Experience of "Still Being There"', count: '0/7' },
  { id: 4, title: 'Trauma Across a Lifetime', count: '0/9' },
  { id: 5, title: 'PTSD, Complex Trauma & Related Experiences', count: '0/10' },
  { id: 6, title: 'Coping, Addiction & Survival Strategies', count: '0/10' },
  { id: 7, title: 'Healing, Treatment & What the Evidence Actually Says', count: '0/8' },
  { id: 8, title: 'Human Literacy & Practical Mastery', count: '0/7' },
];

const labTools = [
  { name: 'Context Matrix', href: '/lab?tool=matrix' },
  { name: 'Claim Lab', href: '/lab?tool=claim' },
  { name: 'Stress & Brain', href: '/lab?tool=brain' },
  { name: 'Lifespan Timeline', href: '/lab?tool=timeline' },
  { name: 'Treatments', href: '/lab?tool=treatments' },
  { name: 'Conversation Sim', href: '/lab' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#617b8a]/30 selection:text-[#172126]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#080C10]/85 backdrop-blur-xl text-white border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Lockup */}
          <Link href="/" className="flex items-center space-x-3 shrink-0 cursor-pointer">
            <div className="w-9 h-9 rounded-full border border-[#edae9d] flex items-center justify-center bg-[#172126]/60 p-1 shadow-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#edae9d]" fill="none" stroke="currentColor" strokeWidth="4.5">
                <ellipse cx="50" cy="50" rx="38" ry="34" transform="rotate(-15 50 50)" strokeDasharray="190 25" />
                <ellipse cx="50" cy="50" rx="33" ry="39" transform="rotate(35 50 50)" strokeDasharray="180 30" />
                <ellipse cx="50" cy="50" rx="27" ry="25" strokeDasharray="140 20" />
              </svg>
            </div>
            <div>
              <div className="font-brand-title tracking-[0.14em] text-sm sm:text-base font-bold leading-tight flex items-center gap-1.5 text-white">
                THE HUMAN AFTERMATH<span className="text-[8px] font-sans px-1.5 py-0.5 rounded-full bg-[#EDAE9D]/20 text-[#EDAE9D] font-extrabold tracking-normal">TM</span>
              </div>
              <div className="text-[9.5px] tracking-[0.2em] text-[#EDAE9D]/90 uppercase font-bold font-mono">
                Understand More • Assume Less
              </div>
            </div>
          </Link>

          {/* Center Breadcrumb */}
          <div className="hidden md:flex items-center space-x-2 text-xs bg-[#111C28] px-4 py-1.5 rounded-full border border-[#617b8a]/60 shadow-inner max-w-md truncate">
            <span className="text-[#FFD2C6] font-bold shrink-0">Module 1</span>
            <span className="text-[#617b8a]">•</span>
            <span className="text-[#FAF6F7] truncate font-medium">Foundations</span>
            <span className="text-[#617b8a]">•</span>
            <span className="text-[11px] font-mono text-[#FFD2C6] font-extrabold">0%</span>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            <Link
              href="/lab"
              className="px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/15 transition border border-white/20 hover:border-white flex items-center gap-1.5 text-white shadow-sm"
            >
              <span>✦</span>
              <span className="hidden md:inline">Practice Lab</span>
            </Link>
            <Link
              href="/certificate"
              className="px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/15 transition border border-white/20 hover:border-white flex items-center gap-1.5 text-white shadow-sm"
            >
              <span>📜</span>
              <span className="hidden xl:inline">Certificate</span>
            </Link>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/15 transition border border-white/20 hover:border-white flex items-center gap-1.5 text-white shadow-sm">
              <span>🧭</span>
              <span className="hidden xl:inline">Evidence Key</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/15 transition border border-white/20 hover:border-white flex items-center gap-1.5 text-white shadow-sm">
              <span>📖</span>
              <span className="hidden xl:inline">Field Library</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/15 transition border border-white/20 hover:border-white flex items-center gap-1.5 text-white shadow-sm">
              <span>🗺</span>
              <span className="hidden xl:inline">My Map</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* Left Sidebar */}
        <aside className="w-80 shrink-0 border-r border-white/10 bg-[#10161E]/70 backdrop-blur-xl h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto flex flex-col justify-between hidden lg:flex">
          <div>
            {/* Sidebar Curriculum Header */}
            <div className="p-4 border-b border-white/10 bg-[#16202A]/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#EDAE9D] font-extrabold block">
                  Course Curriculum
                </span>
                <div className="text-xs font-semibold text-white">8 Modules • 61 Lessons</div>
              </div>
            </div>

            {/* Signature Interactive Labs Quick Bar */}
            <div className="p-3 border-b border-white/10 bg-[#0d131a]">
              <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#617B8A] mb-2">
                Signature Interactive Labs
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {labTools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="text-left px-2 py-1.5 rounded-lg bg-[#16202A] border border-white/5 hover:border-[#EDAE9D] transition flex items-center gap-1.5 text-[#E2E8F0]"
                  >
                    <span className="text-xs text-[#EDAE9D]">❖</span>
                    <span className="truncate font-medium">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Module Rows */}
            <div className="p-2.5 space-y-1.5">
              {modules.map((m) => (
                <Link
                  key={m.id}
                  href={`/module/${m.id}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#141d27]/70 border border-white/5 hover:border-[#EDAE9D]/40 transition text-xs group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="w-5 h-5 rounded-full bg-[#1b2b3a] flex items-center justify-center text-[10px] font-mono text-[#EDAE9D] shrink-0 font-bold border border-white/10">
                      {m.id}
                    </span>
                    <span className="truncate text-stone-300 group-hover:text-white font-medium">
                      {m.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 shrink-0">
                    {m.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-white/10 text-center text-xs bg-[#0c1218]">
            <button className="w-full py-2.5 px-3 rounded-xl bg-[#2C4A68] text-white hover:bg-[#3E6892] transition flex items-center justify-center gap-2 font-semibold shadow-sm">
              <span>◎</span>
              <span>Master Full-Circle Map</span>
            </button>
          </div>
        </aside>

        {/* Viewport Content */}
        <main className="flex-1 p-6 lg:p-10 min-w-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Masterclass Category Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16202A] px-4 py-1 text-xs text-stone-300">
              <span className="font-bold tracking-wider text-[#EDAE9D] uppercase text-[11px]">
                Masterclass Course
              </span>
              <span>•</span>
              <span className="text-stone-300 text-[11px]">8 Multidisciplinary Modules</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-3">
                THE HUMAN AFTERMATH<span className="text-xs align-super text-[#EDAE9D] ml-1">TM</span>
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl font-light leading-relaxed">
                A definitive, evidence-grounded masterclass exploring trauma, evolutionary survival adaptations, and restorative recovery across the human experience.
              </p>
            </div>

            {/* Blockquote */}
            <blockquote className="border-l-2 border-[#EDAE9D] pl-4 italic text-sm text-[#FFD2C6]/90 font-serif-editorial text-lg">
              &ldquo;People are not problems to solve. They are human beings to understand.&rdquo;
            </blockquote>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/module/1"
                className="btn-luxury-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Begin Module 1: Foundations</span>
                <span>→</span>
              </Link>
              <button className="btn-luxury-glass px-5 py-3 rounded-xl text-xs font-semibold">
                Curriculum Map
              </button>
              <Link
                href="/lab"
                className="btn-luxury-steel px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <span>✦</span>
                <span>Practice Lab</span>
              </Link>
            </div>

            {/* Asset Counter Bar */}
            <div className="flex flex-wrap items-center gap-4 border-t border-b border-white/10 py-3 text-xs text-stone-400 font-light">
              <span className="flex items-center gap-1.5 text-stone-300">
                <span>📹</span> 19 Videos (Vimeo HD)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <span>🎙</span> 39-Min Audio Podcast
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <span>📑</span> 15 Master Slides
              </span>
            </div>

            {/* Documentary Visual Anchor Frame */}
            <div className="rounded-2xl border border-white/10 glass-surface overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#EDAE9D] uppercase block">
                    Documentary Visual Anchor
                  </span>
                  <span className="text-xs text-stone-400 font-light">
                    Quiet resilience: decoding the invisible survival adaptations
                  </span>
                </div>
              </div>

              {/* Vimeo Video Container */}
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src="https://player.vimeo.com/video/1244527908?badge=0&autopause=0&player_id=0&app_id=58479"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Documentary Visual Anchor"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}