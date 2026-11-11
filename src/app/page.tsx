import Link from 'next/link';
import type { Metadata } from 'next';
import WaitlistForm from '@/components/WaitlistForm';
import InnerExperienceArt from '@/components/InnerExperienceArt';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Humanity Studies: The Wound Concealed | Trauma Literacy. Transforming Humanity.',
  description: 'A forthcoming interdisciplinary course exploring invisible psychological wounds, trauma literacy and the responsibility to understand human behavior with evidence, context and care. Explore the free guide.',
  openGraph: {
    title: 'Humanity Studies: The Wound Concealed',
    description: 'Trauma Literacy. Transforming Humanity. Explore the free Human Literacy Starter Guide and join the course invitation list.',
    type: 'website',
  },
};

const modules = [
  { number: '01', title: 'What are we actually talking about?', desc: 'Trauma, everyday stress, adversity and the difference between an event and its outcome.' },
  { number: '02', title: 'Survival in the brain and body', desc: 'Stress physiology, threat processing and the adaptive nervous system.' },
  { number: '03', title: 'Memory, dissociation and meaning', desc: 'How memory works—and why it is not a perfect recording.' },
  { number: '04', title: 'Trauma across a lifetime', desc: 'Development, attachment, relationships and context across age.' },
  { number: '05', title: 'Diagnosis without reduction', desc: 'PTSD, complex trauma, differential explanations and clinical limits.' },
  { number: '06', title: 'Coping, adaptation and responsibility', desc: 'The purpose and possible consequences of survival strategies.' },
  { number: '07', title: 'Recovery and the evidence', desc: 'Treatment research, clinical models and claims that exceed the evidence.' },
  { number: '08', title: 'From trauma literacy to human literacy', desc: 'Agency, boundaries, multiple perspectives and humane accountability.' },
];

const principles = [
  {
    index: '01',
    label: 'OBSERVE',
    title: 'Separate what happened from what we assume.',
    description: 'Behavior is observable. Its origin is not always visible—and similar responses can have different explanations.',
  },
  {
    index: '02',
    label: 'EXAMINE',
    title: 'Bring the missing context into view.',
    description: 'Biology, experience, development, relationships, culture and environment shape the human picture.',
  },
  {
    index: '03',
    label: 'DISCERN',
    title: 'Let evidence set the limits of certainty.',
    description: 'Differentiate established knowledge from hypotheses, interpretations, metaphors and unsupported claims.',
  },
  {
    index: '04',
    label: 'RESPOND',
    title: 'Hold compassion and accountability together.',
    description: 'Understanding human complexity does not erase safety, boundaries or responsibility for harm.',
  },
];

export default function CourseIntroductionPage() {
  const listEnabled =
    process.env.WAITLIST_ENABLED === 'true' &&
    !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
    !!process.env.TURNSTILE_SECRET_KEY &&
    !!process.env.PUBLIC_CONTACT_EMAIL;

  return (
    <main className="w-full overflow-hidden bg-[#FAF6F7] text-[#172126]">
      <section className="relative overflow-hidden border-b border-[#617B8A]/15">
        <div className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 65% at 95% 20%, rgba(234,203,212,.42), transparent 65%), radial-gradient(ellipse 70% 55% at 0% 98%, rgba(187,212,197,.25), transparent 75%)' }} />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-[1fr_0.92fr] gap-10 lg:gap-14 items-center px-6 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:py-28">
          <div className="max-w-[655px]">
            <p className="flex items-center gap-3 text-[10px] sm:text-xs tracking-[0.22em] font-bold uppercase text-[#3E6892]">
              <span className="h-[1px] w-10 bg-[#3E6892]" />
              A signature trauma-literacy course
            </p>
            <h1 className="font-serif-editorial text-[4.6rem] sm:text-[6.4rem] lg:text-[6.8rem] leading-[0.87] tracking-[-0.04em] font-normal mt-9 text-[#172126]">
              Humanity<br /><span className="italic text-[#3E6892]">Studies</span>
            </h1>
            <p className="font-serif-editorial text-4xl sm:text-5xl lg:text-[3.9rem] leading-[1] mt-6 text-[#6A6479] italic">
              The Wound Concealed
            </p>
            <div className="mt-8 h-[1px] w-24 bg-[#EDAE9D]"/>
            <p className="font-serif-editorial mt-6 text-2xl sm:text-3xl text-[#172126] leading-snug">
              Trauma Literacy. <span className="italic text-[#3E6892]">Transforming Humanity.</span>
            </p>
            <p className="max-w-[555px] mt-6 text-[#4C5C66] text-base leading-[1.9]">
              Some wounds form within the human experience. They cannot be seen, stitched, or dressed like an injury to the skin. Their presence—and the complexity of the person living with them—cannot be understood through appearances alone.
            </p>
            <p className="max-w-[555px] mt-4 text-[#4C5C66] text-sm leading-[1.8]">
              An interdisciplinary exploration of trauma, adaptation, evidence, and the deeper responsibility of understanding human beings. The full course is being prepared; a free introduction is available now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-9 items-start">
              <Link href="/starter-kit" className="inline-flex justify-center items-center rounded-full bg-[#263F59] hover:bg-[#355777] px-7 py-3.5 text-sm font-semibold text-white transition shadow-md">
                Read the free starter guide <span aria-hidden="true" className="ml-3">↗</span>
              </Link>
              <a href="#early-access" className="inline-flex justify-center items-center rounded-full border border-[#617B8A]/40 text-[#253E56] hover:bg-[#EACBD4]/30 px-7 py-3.5 text-sm font-semibold transition">Join the early-access list</a>
            </div>
            <div className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.17em] font-semibold text-[#617B8A]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#EDAE9D]" />
              Understand more. Assume less.
            </div>
          </div>
          <div className="max-w-[550px] mx-auto w-full lg:-mr-2">
            <InnerExperienceArt />
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#617B8A]">The seen · The experienced · The unexplained</p>
          </div>
        </div>
      </section>

      <section className="bg-[#132236] text-[#F7F2F4] px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 items-start">
          <div>
            <p className="text-[#BBD4C5] text-[11px] uppercase font-semibold tracking-[0.23em]">The meaning behind the title</p>
            <h2 className="font-serif-editorial text-5xl sm:text-6xl leading-[1.02] mt-6 font-light">
              Not every wound <span className="italic text-[#EDAE9D]">exists on the surface.</span>
            </h2>
          </div>
          <div className="text-[#D3DDE2] leading-[1.95] text-base md:pt-10">
            <p>We know how to recognize a physical wound. We can often locate it, examine it and offer wound care. But some of the deepest forms of pain emerge internally—from experiences that shape a person's sense of safety, memory, relationships, or response to the world.</p>
            <p className="mt-6">The Wound Concealed refers to pain that cannot be cared for with a physical dressing because it formed within experience itself. That does not mean every person carries trauma, or every unfamiliar behavior is evidence of a hidden wound.</p>
            <p className="mt-6 text-[#F3C8C4] font-medium">It means we must not confuse what we can see with everything there is to understand.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F1E9EC] px-6 py-20 sm:py-28 text-[#172126]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#3E6892] text-[11px] uppercase font-bold tracking-[0.23em]">The learning method</p>
            <h2 className="font-serif-editorial text-5xl sm:text-6xl leading-[1.05] mt-5">
              From trauma literacy to <span className="italic text-[#3E6892]">human literacy.</span>
            </h2>
            <p className="text-[#4C5C66] leading-[1.9] mt-6 max-w-2xl">
              Learning the science is where we begin. What matters is how we use it: asking better questions, recognizing what we cannot know, and responding to people without reducing them to a diagnosis or a single visible action.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#C7BFC8] mt-12 border border-[#C7BFC8]">
            {principles.map(item => (
              <div key={item.index} className="bg-[#FAF6F7] min-h-72 p-7 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-serif-editorial text-4xl italic text-[#3E6892]">{item.index}</span>
                  <span className="text-[#617B8A] text-[10px] tracking-[0.18em] uppercase">{item.label}</span>
                </div>
                <h3 className="font-serif-editorial text-3xl leading-[1.1] mt-8">{item.title}</h3>
                <p className="text-[#586976] text-sm leading-[1.8] mt-5">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#576C7D]">Human literacy is not the ability to diagnose strangers. It is a commitment to context, evidence, humility, dignity and responsible action.</p>
        </div>
      </section>

      <section id="course" className="px-6 py-20 sm:py-28 bg-[#FAF6F7] scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_0.75fr] gap-8 items-end mb-12">
            <div>
              <p className="text-[#3E6892] text-[11px] tracking-[0.22em] font-bold uppercase">The course · In development</p>
              <h2 className="font-serif-editorial text-5xl sm:text-6xl leading-[1.06] mt-5 text-[#172126]">Eight modules.<br/><span className="italic text-[#3E6892]">One wider lens.</span></h2>
            </div>
            <div className="text-[#586976] text-sm leading-[1.9] lg:pb-2">
              The foundation combines neuroscience, psychology, development, relationships, culture, evidence and systems thinking. The eight-module curriculum currently contains 65 lessons; the platform is still being completed and tested.
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 border-t border-[#B8C5D0]">
            {modules.map(item => (
              <div className="flex gap-5 py-6 border-b border-[#B8C5D0] items-start" key={item.number}>
                <span className="font-serif-editorial text-3xl italic text-[#3E6892] shrink-0 w-11">{item.number}</span>
                <div>
                  <h3 className="font-serif-editorial text-2xl sm:text-[1.85rem] leading-tight text-[#253E56]">{item.title}</h3>
                  <p className="text-[#64727B] text-sm leading-[1.7] mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 border-l-[3px] border-[#EDAE9D] pl-5 text-sm text-[#536373] leading-[1.85] max-w-4xl">
            The course will pair lesson texts with narrated and video materials, visual frameworks, applied scenarios, knowledge checks and a participant workbook. These features are under integration and review; no completed course or certificate is being sold during this phase.
          </div>
        </div>
      </section>

      <section className="bg-[#21364B] px-6 py-20 sm:py-28 text-[#F8F5F4]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#EDAE9D] text-[11px] uppercase font-bold tracking-[0.23em]">The long-term vision</p>
          <h2 className="font-serif-editorial text-5xl sm:text-6xl leading-[1.03] mt-5 max-w-4xl">One foundational course.<br/><span className="italic text-[#BBD4C5]">A larger educational future.</span></h2>
          <div className="grid lg:grid-cols-2 gap-5 mt-12">
            <article className="border border-[#BBD4C5]/25 bg-white/[0.045] p-8 sm:p-10">
              <div className="text-[#EDAE9D] tracking-[0.19em] uppercase text-[10px] font-semibold">01 / The course</div>
              <h3 className="font-serif-editorial text-4xl mt-5">Humanity Studies:<br/><span className="italic">The Wound Concealed</span></h3>
              <p className="text-[#D6DFE1] text-sm leading-[1.9] mt-6">The first learning experience uses trauma literacy to develop critical reasoning, richer context and humane, accountable interpretation of behavior.</p>
            </article>
            <article className="border border-[#EDAE9D]/30 bg-white/[0.045] p-8 sm:p-10">
              <div className="text-[#EDAE9D] tracking-[0.19em] uppercase text-[10px] font-semibold">02 / The academy · Future vision</div>
              <h3 className="font-serif-editorial text-4xl mt-5">A home for the <span className="italic text-[#BBD4C5]">study of humanity.</span></h3>
              <p className="text-[#D6DFE1] text-sm leading-[1.9] mt-6">The envisioned academy—whose name has not yet been selected—could eventually offer learning pathways in perception, relationships, development, communication, human systems and institutional decision-making.</p>
            </article>
          </div>
          <p className="mt-7 text-[#CBD6D9] text-xs leading-[1.8]">The academy is a future concept, not an existing accredited institution. The foundational course is educational and does not confer clinical licensure or approved continuing-education credit.</p>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28 bg-[#EACBD4]/[0.50] text-[#172126]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.78fr_1.22fr] gap-12 lg:gap-20 items-center">
          <div className="relative max-w-[355px] mx-auto w-full" aria-label="A typographic preview of the free Human Literacy Starter Guide">
            <div className="absolute inset-0 translate-x-4 translate-y-4 border border-[#617B8A]/35 bg-[#BBD4C5]/60 -rotate-3" aria-hidden="true"/>
            <div className="relative min-h-[450px] p-9 bg-[#233A52] text-[#F7F2F4] border border-[#3E6892] shadow-[15px_25px_45px_rgba(23,33,38,.18)] flex flex-col justify-between">
              <span className="tracking-[0.18em] uppercase text-[10px] text-[#EACBD4]">Humanity Studies · Free companion</span>
              <div>
                <div className="w-28 h-28 rounded-full border border-[#EDAE9D] relative mx-auto my-7">
                  <div className="absolute inset-4 rounded-[47%_53%_54%_46%] border border-[#BBD4C5] rotate-12"/>
                  <div className="absolute inset-7 rounded-[54%_46%_48%_52%] border-2 border-[#EDAE9D] -rotate-12"/>
                  <div className="absolute inset-[43px] rounded-full bg-[#EDAE9D]"/>
                </div>
                <h3 className="font-serif-editorial text-5xl leading-[0.95]">A First Step<br/><span className="italic text-[#EDAE9D]">Toward Human Literacy</span></h3>
              </div>
              <span className="border-t border-white/20 pt-4 text-xs text-[#BBD4C5]">Understand More. Assume Less.</span>
            </div>
          </div>
          <div>
            <p className="text-[#3E6892] text-[11px] uppercase tracking-[0.2em] font-bold">Free · No account needed</p>
            <h2 className="font-serif-editorial text-5xl sm:text-6xl leading-[1.04] mt-5">Begin with a <span className="italic text-[#3E6892]">better question.</span></h2>
            <p className="text-[#4F5D66] leading-[1.9] mt-7">Before the complete course launches, explore a printable introduction to the Event–Experience–Response framework, the distinction between observation and assumption, and the practice of meeting human complexity with care.</p>
            <p className="mt-5 border-l-[3px] border-[#3E6892] pl-5 text-sm text-[#566671] leading-[1.8]">No diagnosis. No demand for personal disclosure. No assumption that every behavior reflects an unseen injury.</p>
            <Link href="/starter-kit" className="inline-flex mt-8 rounded-full bg-[#253E56] hover:bg-[#385B7D] text-white text-sm font-semibold px-7 py-3.5 transition">Open the free learning companion <span className="ml-3" aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section id="early-access" className="px-6 py-20 sm:py-28 bg-[#111F30] text-[#F7F2F4] scroll-mt-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.07fr_0.93fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[#BBD4C5] text-xs uppercase tracking-[0.22em] font-semibold">Phase 1 · An open invitation</p>
            <h2 className="font-serif-editorial text-6xl sm:text-7xl leading-[0.98] mt-6">The first chapter <span className="italic text-[#EDAE9D]">is just beginning.</span></h2>
            <p className="text-[#CCD8E1] leading-[1.9] mt-7 max-w-xl">Follow the course as it develops, discover new free learning resources, and hear when private pilot invitations or future enrollment opportunities become available.</p>
            <p className="mt-6 font-serif-editorial text-2xl italic text-[#BBD4C5]">Trauma Literacy. Transforming Humanity.</p>
            <div className="mt-8 border-t border-[#617B8A]/50 pt-5 flex gap-3 text-xs text-[#B4C2D0] leading-6">
              <span className="h-2 w-2 bg-[#EDAE9D] rounded-full mt-2 shrink-0"/><span>Enrollment is not open. The full platform, assessments and credential systems are being completed and reviewed.</span>
            </div>
          </div>
          <div className="border border-[#617B8A]/40 bg-[#20364B] p-7 sm:p-9 shadow-[0_25px_65px_rgba(0,0,0,.2)]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#EDAE9D] font-bold">Early-access invitation list</p>
            <h3 className="font-serif-editorial text-4xl mt-4 mb-6">Be part of what comes next.</h3>
            <WaitlistForm enabled={listEnabled}/>
          </div>
        </div>
      </section>

      <footer className="px-6 py-11 border-t border-[#617B8A]/20 bg-[#0D1826] text-[#B6C3CD]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <p className="font-serif-editorial text-2xl text-[#F8F5F4]">Humanity Studies: <span className="italic text-[#EDAE9D]">The Wound Concealed</span></p>
            <p className="text-xs uppercase tracking-[0.17em] text-[#BBD4C5] mt-3">Trauma Literacy. Transforming Humanity.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-xs">
            <Link href="/starter-kit" className="hover:text-white">Free starter guide</Link>
            <Link href="/privacy" className="hover:text-white">Privacy notice</Link>
            <a href="#early-access" className="hover:text-white">Early access</a>
          </nav>
        </div>
        <p className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-xs leading-7 text-[#A6B6C5]">An interdisciplinary educational project, not therapy, diagnosis, crisis intervention, clinical certification or accredited continuing education. The academy is a future vision.</p>
      </footer>
    </main>
  );
}
