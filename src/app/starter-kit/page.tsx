import Link from 'next/link';
import type { Metadata } from 'next';
import PrintGuideButton from '@/components/PrintGuideButton';
import './print.css';

export const metadata: Metadata = {
  title: 'Free Starter Guide | Humanity Studies: The Wound Concealed',
  description: 'Free educational learning companion: observe without assuming, understand the event–experience–response framework, and practice trauma-informed curiosity.',
};

const prompts = [
  { label:'What was observed?', question:'Describe only visible or independently confirmable actions, words or events.' },
  { label:'What might be happening?', question:'List two or more plausible explanations without making a diagnosis.' },
  { label:'What do we not know?', question:'Separate missing information from what can actually be established.' },
  { label:'What could help?', question:'Consider safety, autonomy, practical support and respectful boundaries.' },
];

export default function StarterGuide() {
  return <main className="starter-guide w-full bg-[#F4F0E9] text-[#172126] px-5 py-12 sm:py-20">
    <div className="max-w-4xl mx-auto">
      <nav className="starter-nav mb-8 flex flex-wrap justify-between items-center gap-4 text-xs uppercase tracking-[0.13em] text-[#29433C]">
        <Link href="/" className="hover:underline">← Humanity Studies: The Wound Concealed</Link><PrintGuideButton/>
      </nav>

      <section className="guide-page guide-dark bg-[#29433C] text-white p-8 sm:p-14 min-h-[630px] flex flex-col justify-between shadow-xl border border-[#1F4C45]">
        <div className="flex justify-between border-b border-[#C9C1B5]/30 pb-5 text-[10px] tracking-[0.18em] uppercase">
          <span className="text-[#EAD7C9]">Free learning companion</span><span className="text-[#EAD7C9]">Volume 01</span>
        </div>
        <div className="max-w-lg">
          <div aria-hidden="true" className="relative w-28 h-28 mb-9">
            <div className="absolute inset-3 rounded-full bg-[#A86E5D]/70 rotate-[-25deg]"/><div className="absolute inset-2 rounded-full bg-[#C9C1B5]/60 rotate-[30deg]"/>
          </div>
          <p className="text-[#C9C1B5] text-xs font-bold tracking-[0.25em] uppercase mb-6">Humanity Studies: The Wound Concealed</p>
          <h1 className="font-serif-editorial text-6xl sm:text-7xl leading-[0.92] font-light">A first step<br />toward <span className="italic text-[#A86E5D]">human<br />literacy.</span></h1>
          <p className="mt-9 text-[#E5E9E1] text-lg max-w-md leading-8">Understand more. Assume less. A short companion to Humanity Studies: The Wound Concealed, for asking better questions about human behavior.</p>
        </div>
        <div className="border-t border-white/25 pt-5 text-sm text-[#D5E2D8]">A self-guided educational resource · No personal disclosure required</div>
      </section>

      <section className="guide-page my-8 bg-white p-8 sm:p-12 shadow-md space-y-7">
        <p className="text-xs uppercase tracking-[0.22em] text-[#7D9286] font-bold">01 / Start here</p>
        <h2 className="font-serif-editorial text-5xl leading-tight">Some wounds are not visible.</h2>
        <p className="leading-8 text-[#334D4F]">Some forms of psychological pain arise within lived experience and cannot be treated with bandages or other physical wound care. Yet invisible pain should never be presumed from behavior alone. Two people may experience similar events and respond differently. Development, safety, relationships and resources shape what follows; an event alone does not predict an individual's outcome.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            ['The event','What can be observed or established about what occurred?'],
            ['The experience','How might someone interpret or experience it in that moment?'],
            ['The response','What behavioral, emotional or physical adaptations might follow?'],
          ].map(([title,desc])=>(
            <div key={title} className="guide-dark bg-[#EBE7DE] p-5 border-t-4 border-[#7D9286]">
              <h3 className="font-serif-editorial text-2xl text-[#29433C]">{title}</h3><p className="text-sm mt-3 leading-7 text-[#3C5757]">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F8F1ED] p-6 border-l-4 border-[#A86E5D]">
          <h3 className="font-semibold">Fictional example</h3>
          <p className="text-sm leading-7 mt-2">Two coworkers receive difficult news about a project. One asks many questions; the other becomes quiet. The visible behavior is different. We cannot infer the exact reason for either person's response without more context.</p>
        </div>
        <p className="italic text-sm text-[#7D9286]">Key principle: observation is not explanation. Exposure is not destiny.</p>
      </section>

      <section className="guide-page my-8 bg-white p-8 sm:p-12 shadow-md space-y-7">
        <p className="text-xs uppercase tracking-[0.22em] text-[#7D9286] font-bold">02 / Practice the distinction</p>
        <h2 className="font-serif-editorial text-5xl">What do we actually know?</h2>
        <p className="leading-8">Consider a fictional meeting: a colleague looks away, answers briefly and becomes quiet. Is that enough to conclude they are angry, dishonest, traumatized or uninterested? No. Those are possible interpretations, not established facts.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {prompts.map(item=>(
            <div key={item.label} className="guide-dark border border-[#B9CDC4] bg-[#F4F0E9] p-5">
              <h3 className="font-serif-editorial text-2xl">{item.label}</h3><p className="text-sm text-[#566B6C] leading-6 mt-2">{item.question}</p>
              <div className="guide-write h-20 mt-7 border-b border-[#9DB3AC]" aria-label="Writing space"></div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#7D9286]">Optional: complete this exercise with the fictional example. You do not need to share your own experience.</p>
      </section>

      <section className="guide-page my-8 bg-white p-8 sm:p-12 shadow-md space-y-7">
        <p className="text-xs uppercase tracking-[0.22em] text-[#7D9286] font-bold">03 / The evidence compass</p>
        <h2 className="font-serif-editorial text-5xl">Curiosity without certainty.</h2>
        <p className="leading-8">Not all claims are supported in the same way. Before repeating a scientific-sounding statement, ask what kind of knowledge supports it.</p>
        <div className="space-y-3">
          {[
            ['Established knowledge','Grounded in a substantial body of research or authoritative guidance.'],
            ['Emerging research','Promising findings that still have important uncertainties or limitations.'],
            ['Clinical or conceptual model','A helpful map for understanding, not necessarily literal anatomy.'],
            ['Lived-experience description','A genuine account of subjective experience, not automatic proof of every factual interpretation.'],
            ['Metaphor','Language that communicates a feeling without claiming a literal biological mechanism.'],
          ].map(([title,desc],i)=>(
            <div key={title} className="flex gap-4 bg-[#F4F0E9] border border-[#D3DED8] p-4">
              <span className="font-serif-editorial text-2xl italic text-[#29433C]">0{i+1}</span><div><h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 mt-1 text-[#4C6665]">{desc}</p></div>
            </div>
          ))}
        </div>
        <div className="guide-dark bg-[#EBE7DE] p-5 border-l-4 border-[#7D9286]">
          <p className="font-semibold text-sm">Try the language shift</p>
          <p className="text-sm mt-2 leading-7">Instead of "Trauma permanently rewires every brain," try: "Stressful experiences can shape brain networks and responses; outcomes vary, and the nervous system remains capable of change."</p>
        </div>
      </section>

      <section className="guide-page my-8 bg-white p-8 sm:p-12 shadow-md space-y-7">
        <p className="text-xs uppercase tracking-[0.22em] text-[#7D9286] font-bold">04 / Compassion with boundaries</p>
        <h2 className="font-serif-editorial text-5xl">Support without investigating.</h2>
        <p className="leading-8">You can respond with care without demanding graphic details, diagnosing another person or taking responsibility for solving everything. Choice and clear boundaries protect everyone involved.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="guide-dark bg-[#EBE7DE] p-6">
            <h3 className="font-serif-editorial text-3xl mb-4">Try saying</h3>
            <ul className="space-y-3 text-sm leading-7 list-disc pl-5">
              <li>"Would you like me to listen or help you think through options?"</li>
              <li>"You don't need to share details you're not comfortable sharing."</li>
              <li>"Would a pause or a quieter space be helpful?"</li>
              <li>"I can help you find appropriate support if you want."</li>
            </ul>
          </div>
          <div className="guide-dark bg-[#EBE7DE] p-6">
            <h3 className="font-serif-editorial text-3xl mb-4">Avoid assuming</h3>
            <ul className="space-y-3 text-sm leading-7 list-disc pl-5">
              <li>"I know exactly what happened to you."</li>
              <li>"Tell me everything before I believe you."</li>
              <li>"You definitely have a particular diagnosis."</li>
              <li>"If I understand why, there can be no boundaries."</li>
            </ul>
          </div>
        </div>
        <p className="italic text-[#7D9286] leading-8">Understanding why someone behaves a certain way does not erase the effect of their actions. Compassion and accountability can coexist.</p>
      </section>

      <section className="guide-page my-8 bg-[#29433C] text-white p-8 sm:p-12 shadow-lg flex flex-col justify-between min-h-[580px]">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#C9C1B5] font-bold">05 / What comes next</p>
          <h2 className="font-serif-editorial text-5xl sm:text-6xl mt-8">Better questions.<br />More context.<br /><span className="italic text-[#A86E5D]">More humanity.</span></h2>
          <p className="leading-8 mt-8 max-w-2xl text-[#E1E9E1]">Humanity Studies: The Wound Concealed is developing an eight-module educational experience that goes deeper into neuroscience, memory, development, coping, recovery, evidence and human literacy—with a dedicated participant workbook, video learning and applied practice.</p>
          <p className="mt-6 leading-8 text-[#E1E9E1]">This free guide is a first invitation, not a diagnostic test or therapy exercise. You're welcome to stop here, return later, or choose a different pace.</p>
        </div>
        <div className="border-t border-white/25 pt-7">
          <p className="font-serif-editorial text-3xl">Understand more. Assume less.</p>
          <p className="mt-3 text-sm text-[#D8E3D8]">Join the early-access invitation list on the website when you're ready.</p>
          <p className="mt-6 text-xs text-[#BBCDC6]">Educational purposes only. Not therapy, a diagnosis, crisis support, or a substitute for professional care.</p>
        </div>
      </section>
      <div className="starter-footer mt-10 text-sm text-center text-[#526B6A]">© Humanity Studies: The Wound Concealed · <Link href="/" className="underline">Back to the course introduction</Link></div>
    </div>
  </main>;
}
