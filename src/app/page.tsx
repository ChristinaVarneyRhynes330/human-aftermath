import Link from 'next/link';
import type { Metadata } from 'next';
import WaitlistForm from '@/components/WaitlistForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'The Human Aftermath™ | Understand More. Assume Less.',
  description: 'A new multidisciplinary learning experience about trauma, adaptation, connection and human understanding. Explore a free starter guide and join the early-access list.',
  openGraph: {
    title: 'The Human Aftermath™ — Understand More. Assume Less.',
    description: 'A more curious, evidence-aware way to understand human experience. Free introduction available now; foundational course in development.',
    type: 'website',
  },
};

const modules = [
  ['01', 'Understanding trauma', 'Stress, adversity, experience and response'],
  ['02', 'Brain, body & stress systems', 'Survival adaptations and neurobiology'],
  ['03', 'Memory & dissociation', 'How context shapes remembering'],
  ['04', 'Across the lifespan', 'Development, relationships and change'],
  ['05', 'Clinical language & complexity', 'Diagnosis, resilience and uncertainty'],
  ['06', 'Coping & adaptation', 'Function, accountability and safer choices'],
  ['07', 'Healing & evidence', 'Research, treatment and the evidence compass'],
  ['08', 'From trauma literacy to human literacy', 'Curiosity, agency, boundaries and humanity'],
];

const values = [
  { number: '01', title: 'Look beyond the label', body: 'An observation tells us what we noticed. It rarely tells us the whole reason why it happened.' },
  { number: '02', title: 'Understand without assuming', body: 'Biology, relationships, culture, development and environment are all part of the picture.' },
  { number: '03', title: 'Pair compassion with accountability', body: 'Understanding a person is not the same as excusing harm. Safety and dignity matter together.' },
];

export default function PhaseOneHome() {
  return (
    <main className="w-full overflow-hidden bg-[#0C1719] text-[#F8F2EA]">
      <section className="relative overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_15%,rgba(187,212,197,0.14),transparent_39%),radial-gradient(ellipse_at_15%_85%,rgba(237,174,157,0.11),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-32 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#BBD4C5]">
              <span className="h-px w-9 bg-[#BBD4C5]" /> A new way of understanding
            </p>
            <h1 className="font-serif-editorial text-6xl sm:text-7xl lg:text-[6.5rem] leading-[0.94] tracking-tight font-light">
              Understand<br /><span className="italic text-[#EDAE9D]">more.</span><br />Assume <span className="italic text-[#BBD4C5]">less.</span>
            </h1>
            <p className="mt-9 max-w-xl text-base sm:text-lg leading-8 text-[#E1DED6]">
              Behind every behavior is a human story worth understanding. The Human Aftermath™ explores what happens after overwhelming experiences—and what it takes to meet human complexity with context, evidence and care.
            </p>
            <p className="mt-5 text-sm text-[#B5C5C0] max-w-xl leading-7">
              Our free introduction is available now. The full eight-module foundational course is in development.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-start gap-3">
              <a href="#join" className="btn-luxury-primary rounded-full px-7 py-3.5 text-sm inline-flex items-center justify-center gap-3">Get early access <span aria-hidden="true">↗</span></a>
              <Link href="/starter-kit" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm text-[#F8F2EA] hover:bg-white/10 transition">Explore the free starter guide</Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs text-[#A7B8B3]">
              <span className="h-2 w-2 rounded-full bg-[#BBD4C5]"/><span>Education, not diagnosis. Curiosity, not assumptions.</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[470px] min-h-[510px] sm:min-h-[560px] flex items-center justify-center" aria-label="Editorial cover artwork for The Human Aftermath">
            <div className="absolute inset-8 rounded-full border border-[#BBD4C5]/20 rotate-12" />
            <div className="absolute inset-16 rounded-full border border-[#EDAE9D]/15 -rotate-12" />
            <div className="absolute h-[340px] w-[300px] rounded-[50%] bg-[#617B8A]/45 blur-sm -rotate-[35deg]" />
            <div className="absolute h-[340px] w-[270px] rounded-[50%] bg-[#EDAE9D]/40 blur-[2px] rotate-[30deg]" />
            <div className="absolute h-[290px] w-[260px] rounded-[50%] bg-[#BBD4C5]/45 blur-sm rotate-[78deg]" />
            <div className="relative z-10 aspect-[4/5] w-[82%] rounded-[2px] border border-[#F9F0E5]/25 bg-[#193A39]/85 shadow-[25px_28px_65px_rgba(0,0,0,0.4)] flex flex-col justify-between p-9 sm:p-10">
              <div className="flex justify-between items-center border-b border-[#F9F0E5]/25 pb-5 text-[10px] tracking-[0.22em] uppercase">
                <span>The Human Aftermath™</span><span>Volume 01</span>
              </div>
              <div className="relative z-10 my-12">
                <div className="relative mx-auto h-52 w-52 mb-12">
                  <div className="absolute inset-4 rounded-[50%] bg-[#EDAE9D]/80 rotate-[-37deg] mix-blend-screen" />
                  <div className="absolute inset-3 rounded-[50%] bg-[#BBD4C5]/65 rotate-[44deg] mix-blend-screen" />
                  <div className="absolute inset-7 rounded-[50%] bg-[#617B8A]/70 rotate-[90deg] mix-blend-screen" />
                </div>
                <h2 className="font-serif-editorial text-5xl leading-[0.9] font-light">The Human<br /><span className="italic">Aftermath</span></h2>
                <p className="uppercase tracking-[0.17em] mt-5 text-[10px] text-[#C8D8D0]">A foundation for human literacy</p>
              </div>
              <div className="border-t border-[#F9F0E5]/25 pt-5 text-[11px] tracking-[0.14em] uppercase text-[#EACBD4]">Understand more · Assume less</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EFE7] text-[#182B2D] px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#58716E] font-bold">The philosophy</p>
              <h2 className="font-serif-editorial text-5xl sm:text-6xl mt-5 leading-[1.03]">No single lens tells the <span className="italic text-[#3E6892]">whole story.</span></h2>
            </div>
            <div className="text-lg text-[#344748] leading-9 pt-4">
              <p>We can acknowledge what happened without assuming how someone experienced it. We can recognize adaptation without treating people as permanently damaged. We can honor emotional reality while still asking careful questions about evidence.</p>
              <p className="mt-6 text-base">This learning experience brings neuroscience, psychology, relationships, social context and lived experience into conversation—without pretending they are interchangeable.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-16">
            {values.map(item => (
              <div key={item.number} className="border border-[#C5D1CA] bg-white/60 p-7 min-h-[240px]">
                <p className="text-xs text-[#647D79] font-semibold tracking-widest">{item.number}</p>
                <h3 className="font-serif-editorial text-3xl mt-6">{item.title}</h3>
                <p className="text-sm leading-7 mt-4 text-[#455454]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preview" className="px-6 py-20 sm:py-28 bg-[#111F22]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-between items-end mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#BBD4C5] font-bold">The forthcoming program</p>
              <h2 className="font-serif-editorial text-5xl sm:text-6xl mt-5 font-light">Eight chapters of <span className="italic text-[#EDAE9D]">understanding.</span></h2>
            </div>
            <span className="text-sm text-[#C8D8D0] border border-[#BBD4C5]/35 px-4 py-2 rounded-full">8 modules · 65 lessons planned</span>
          </div>
          <p className="text-stone-300 max-w-3xl leading-8 mb-10">The full course is being engineered and reviewed. This preview describes its learning architecture; enrollment and certification are not open in Phase 1.</p>
          <div className="grid md:grid-cols-2 gap-3">
            {modules.map(([num, title, subtitle]) => (
              <div key={num} className="group border border-white/10 bg-white/[0.035] px-6 py-5 flex gap-5 items-start hover:border-[#BBD4C5]/40 transition">
                <span className="font-serif-editorial italic text-3xl text-[#EDAE9D]">{num}</span>
                <div><h3 className="font-serif-editorial text-2xl text-[#F8F2EA]">{title}</h3><p className="mt-1 text-sm text-stone-400">{subtitle}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28 bg-[#E9E1D8] text-[#183034]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-5 bg-[#BBD4C5]/50 rotate-[-3deg]" aria-hidden="true"/>
            <div className="relative bg-[#183D38] text-[#F5F0E7] p-10 shadow-2xl aspect-[4/5] flex flex-col justify-between">
              <p className="uppercase tracking-[0.2em] text-[10px] border-b border-[#FFFFFF]/30 pb-5">The Human Aftermath™ / learning library</p>
              <div><span className="font-serif-editorial italic text-3xl text-[#EDAE9D]">The Learning Companion</span><div className="my-8 border border-[#BBD4C5]/40 rounded-full w-40 h-40 mx-auto relative"><div className="absolute rounded-full bg-[#EDAE9D]/50 w-28 h-28 top-5 left-3"/><div className="absolute rounded-full bg-[#BBD4C5]/50 w-28 h-28 top-5 right-3"/></div><h3 className="font-serif-editorial text-5xl leading-none">The Participant<br/>Workbook</h3></div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#D2DAD2]">The full workbook accompanies the course</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#567473]">Start before the course opens</p>
            <h2 className="font-serif-editorial text-5xl sm:text-6xl leading-[1.03] mt-5">A first step toward <span className="italic text-[#3E6892]">human literacy.</span></h2>
            <p className="text-base leading-8 mt-7 text-[#425757]">Explore a free, printable starter guide introducing the Event–Experience–Response framework, more careful ways to interpret behavior, and practical language for meeting complexity with curiosity.</p>
            <div className="mt-7 border-l-2 border-[#DA937D] pl-5 text-sm leading-7 text-[#4A5B5A]">No diagnosis. No personal trauma history required. No pressure to disclose or complete a reflection.</div>
            <Link href="/starter-kit" className="inline-flex mt-9 rounded-full bg-[#183D38] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[#29524B] transition">Open the free starter guide ↗</Link>
            <p className="text-sm text-[#637474] mt-5">The complete 69-page participant workbook is reserved for the finished learning experience.</p>
          </div>
        </div>
      </section>

      <section id="join" className="px-6 py-20 sm:py-28 bg-[#101B1E] scroll-mt-20">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.23em] text-[#BBD4C5] font-bold">Invitation · Phase 1</p>
            <h2 className="font-serif-editorial text-6xl sm:text-7xl leading-[0.98] mt-5">Be here for<br/><span className="italic text-[#EDAE9D]">what comes next.</span></h2>
            <p className="text-stone-300 leading-8 mt-7 max-w-xl">Join the early-access list for development milestones, free educational resources, and invitations to future learning opportunities. There is no paid enrollment today.</p>
            <div className="mt-9 grid sm:grid-cols-3 gap-4 text-sm">
              <div className="border-t border-[#BBD4C5]/35 pt-3"><span className="text-[#BBD4C5] block text-xs mb-2 uppercase tracking-wider">First</span>Free learning previews</div>
              <div className="border-t border-[#BBD4C5]/35 pt-3"><span className="text-[#BBD4C5] block text-xs mb-2 uppercase tracking-wider">Next</span>Private pilot invitations</div>
              <div className="border-t border-[#BBD4C5]/35 pt-3"><span className="text-[#BBD4C5] block text-xs mb-2 uppercase tracking-wider">Later</span>Full course enrollment</div>
            </div>
          </div>
          <div className="border border-white/15 bg-[#1A2D2D] p-7 sm:p-9 shadow-2xl rounded-[2px]">
            <p className="text-xs uppercase tracking-[0.18em] text-[#EDAE9D] font-bold">Early access</p>
            <h3 className="font-serif-editorial text-4xl mt-3 mb-5">Join the invitation list.</h3>
            <WaitlistForm enabled={process.env.WAITLIST_ENABLED === 'true' && !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !!process.env.TURNSTILE_SECRET_KEY && !!process.env.PUBLIC_CONTACT_EMAIL}/>
          </div>
        </div>
      </section>

      <footer className="bg-[#0A1114] border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-wrap justify-between gap-5 items-center text-xs text-stone-400">
          <div><span className="font-serif-editorial text-xl text-[#F8F2EA]">The Human Aftermath™</span><p className="mt-2">Understanding trauma, adaptation, connection & recovery across the human experience.</p></div>
          <div className="flex items-center gap-5"><Link href="/starter-kit" className="hover:text-white">Free starter guide</Link><Link href="/privacy" className="hover:text-white">Privacy</Link><a href="#join" className="hover:text-white">Early access</a></div>
        </div>
        <div className="mx-auto max-w-6xl mt-8 pt-5 border-t border-white/10 text-xs text-stone-500 leading-6">Educational content only. Not a substitute for mental-health treatment, diagnosis, crisis services, or professional clinical training.</div>
      </footer>
    </main>
  );
}
