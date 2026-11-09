'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { submitQuiz, completeLesson } from '@/app/actions';
import JournalBox from './JournalBox';
import ModuleMediaCenter, { ModuleMedia } from './ModuleMediaCenter';

type Q = { id: string; prompt: string; options: Record<string, string> };
type Body = Record<
  'objectives' | 'hook' | 'script' | 'evidence' | 'terms' | 'example' | 'misconception' | 'reflection' | 'takeaways',
  string
>;
type Result = Awaited<ReturnType<typeof submitQuiz>>;

const LENS_PERSPECTIVES: Record<string, string> = {
  Neuroscience:
    'Examining through Neuroscience: What autonomic circuits, noradrenergic floods, and large-scale neural networks (Salience, Default Mode, Central Executive) are mobilizing survival triage?',
  Development:
    'Examining through Development: At what developmental window did this adversity strike, and what attachment or cognitive meaning-making hardware was active at that age?',
  Relationships:
    'Examining through Relationships: How does relational co-regulation, attunement, or institutional/caregiver betrayal shape whether this experience can be safely integrated?',
  Culture:
    'Examining through Culture: How do communal rituals, generational heritage, and cultural idioms of distress construct shared meaning around this event?',
  Systems:
    'Examining through Systems: What upstream economic buffers, housing conditions, workplace policies, and institutional power dynamics surround this human being?',
};

export default function LessonRunner(p: {
  userId: string;
  lessonId: string;
  moduleNum: number;
  moduleTitle: string;
  lessonIdx: number;
  totalLessonsInMod: number;
  title: string;
  minutes?: number;
  body: Body;
  questions: Q[];
  media?: ModuleMedia | null;
  alreadyComplete: boolean;
  prevHref: string | null;
  nextHref: string | null;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(p.alreadyComplete);
  const [activeLens, setActiveLens] = useState<string>('Neuroscience');
  const [pending, start] = useTransition();
  const seconds = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      if (document.visibilityState === 'visible') seconds.current += 1;
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const grade = () => start(async () => setResult(await submitQuiz(p.lessonId, answers)));
  const finish = () =>
    start(async () => {
      const r = await completeLesson(p.lessonId, seconds.current);
      if (r.ok) setDone(true);
      else setMsg((r as any).error || '');
    });

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 pb-4 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2 font-medium">
          <Link href="/" className="hover:text-white transition">
            Course Home
          </Link>
          <span>/</span>
          <span className="text-stone-300">
            Module {p.moduleNum}: {p.moduleTitle}
          </span>
          <span>/</span>
          <span className="font-bold text-[#EDAE9D] font-mono">
            Lesson {p.lessonIdx + 1} of {p.totalLessonsInMod}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-stone-400">⏱ {p.minutes || 8} min</span>
          <button
            type="button"
            onClick={() => setDone(!done)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              done
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                : 'bg-[#16202A] text-stone-300 border border-white/10 hover:border-[#EDAE9D]'
            }`}
          >
            <span>{done ? '✓ Completed' : '○ Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Title & Learning Objectives */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E6892]/20 border border-[#3E6892]/40 text-[#EDAE9D] text-[11px] font-mono font-bold uppercase tracking-wider">
          Module {p.moduleNum} • Lesson {p.lessonIdx + 1}
        </div>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {p.title.replace(/^LESSON \d+:\s*/i, '')}
        </h1>

        {p.body.objectives && (
          <div className="p-4 rounded-2xl bg-[#16202A]/90 border border-white/10 text-xs sm:text-sm text-stone-200 flex items-start gap-3 shadow-md">
            <span className="text-[#EDAE9D] text-base shrink-0 mt-0.5">◎</span>
            <div>
              <strong className="text-[#EDAE9D] uppercase tracking-wider font-mono text-[11px] block mb-0.5">
                Learning Objectives
              </strong>
              <div className="leading-relaxed text-stone-300">{p.body.objectives}</div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Module Vimeo Masterclass & Recap Media Center */}
      {p.media && <ModuleMediaCenter moduleNum={p.moduleNum} media={p.media} defaultMode="master" />}

      {/* Opening Hook & Inquiry */}
      {p.body.hook && (
        <div className="p-6 rounded-2xl bg-[#141D27]/90 border-l-4 border-[#EDAE9D] space-y-2 shadow-lg">
          <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#EDAE9D]">
            Opening Hook & Inquiry
          </div>
          <p className="font-serif-editorial text-lg sm:text-xl italic text-white leading-relaxed">
            &ldquo;{p.body.hook}&rdquo;
          </p>
        </div>
      )}

      {/* Core Teaching Script */}
      {p.body.script && (
        <div className="p-6 sm:p-8 rounded-3xl glass-surface space-y-4 text-sm sm:text-base text-stone-200 leading-relaxed">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#BBD4C5] font-bold">
            Core Masterclass Lesson
          </div>
          <div className="prose prose-invert max-w-none space-y-4 leading-relaxed text-stone-200">
            <ReactMarkdown>{p.body.script}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Evidence Compass Callout */}
      {p.body.evidence && (
        <div className="p-5 sm:p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-xs sm:text-sm text-emerald-100 space-y-2 shadow-md">
          <div className="font-bold flex items-center justify-between text-emerald-300 uppercase tracking-wider text-xs font-mono">
            <span className="flex items-center gap-2">
              <span>🧭</span> Evidence Compass Classification
            </span>
          </div>
          <div className="leading-relaxed text-stone-200">
            <ReactMarkdown>{p.body.evidence}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Plain-Language Terminology */}
      {p.body.terms && (
        <div className="p-5 rounded-2xl border border-white/10 bg-[#10161E]/90 text-xs sm:text-sm space-y-1.5 shadow-md">
          <div className="font-bold uppercase tracking-wider text-[#EDAE9D] font-mono text-[10px]">
            Plain-Language Terminology
          </div>
          <div className="text-stone-300 leading-relaxed">
            <ReactMarkdown>{p.body.terms}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Non-Graphic Case Vignette */}
      {p.body.example && (
        <div className="p-5 sm:p-6 rounded-2xl border border-[#3E6892]/50 bg-[#111C28]/90 text-xs sm:text-sm space-y-2 shadow-md">
          <div className="font-bold uppercase tracking-wider text-[#BBD4C5] font-mono text-[10px] flex items-center gap-2">
            <span>📄</span> Non-Graphic Case Vignette
          </div>
          <div className="text-stone-200 leading-relaxed">
            <ReactMarkdown>{p.body.example}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Common Misconception Challenged */}
      {p.body.misconception && (
        <div className="p-5 sm:p-6 rounded-2xl border border-rose-500/40 bg-rose-950/20 text-xs sm:text-sm space-y-2 shadow-md">
          <div className="font-bold uppercase tracking-wider text-rose-300 font-mono text-[10px] flex items-center gap-2">
            <span>⚠</span> Common Misconception Challenged
          </div>
          <div className="text-rose-100 leading-relaxed">
            <ReactMarkdown>{p.body.misconception}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Key Takeaways */}
      {p.body.takeaways && (
        <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#16202A]/80 text-xs sm:text-sm space-y-2 shadow-md">
          <div className="font-bold uppercase tracking-wider text-[#EDAE9D] font-mono text-[10px]">
            Key Takeaways
          </div>
          <div className="text-stone-200 leading-relaxed">
            <ReactMarkdown>{p.body.takeaways}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Look Through Another Lens (Interactive Tabbed Explorer) */}
      <div className="p-6 rounded-2xl glass-surface space-y-4">
        <div>
          <span className="text-[10px] uppercase font-mono font-extrabold tracking-wider text-[#EDAE9D] block">
            Look Through Another Lens
          </span>
          <h4 className="text-sm font-serif-editorial text-stone-300">
            What changes when the disciplinary perspective shifts?
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(LENS_PERSPECTIVES).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveLens(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                activeLens === tab
                  ? 'bg-[#3E6892] text-white border-[#EDAE9D]/50 shadow-sm'
                  : 'bg-[#080C10]/60 text-stone-400 border-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 bg-[#080C10]/80 rounded-xl text-xs sm:text-sm text-stone-200 italic leading-relaxed border border-white/10">
          {LENS_PERSPECTIVES[activeLens]}
        </div>
      </div>

      {/* Formative Knowledge Check Quiz */}
      {p.questions.length > 0 && (
        <section className="rounded-2xl border border-white/10 glass-surface p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] font-bold block">
                Formative Knowledge Check
              </span>
              <h2 className="font-serif-editorial text-xl font-bold text-white">Lesson Check</h2>
            </div>
            <span className="text-xs text-stone-400 font-mono">Score 70%+ to pass</span>
          </div>

          <div className="space-y-6">
            {p.questions.map((q, qIdx) => {
              const r = result?.results.find((x: any) => x.questionId === q.id);
              return (
                <fieldset key={q.id} className="space-y-2.5">
                  <legend className="text-sm font-semibold text-white leading-snug">
                    {qIdx + 1}. {q.prompt}
                  </legend>
                  <div className="space-y-2 pt-1">
                    {Object.entries(q.options).map(([k, v]) => {
                      const isPicked = answers[q.id] === k;
                      let borderStyle = 'border-white/10 bg-[#080C10]/60 hover:border-[#EDAE9D]/50';
                      if (r) {
                        if (k === r.correct) {
                          borderStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-100';
                        } else if (k === r.chosen) {
                          borderStyle = 'border-rose-500 bg-rose-950/40 text-rose-100';
                        }
                      } else if (isPicked) {
                        borderStyle = 'border-[#EDAE9D] bg-[#3E6892]/30 text-white';
                      }

                      return (
                        <label
                          key={k}
                          className={`flex items-start gap-3 rounded-xl border p-3.5 text-xs sm:text-sm cursor-pointer transition ${borderStyle}`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={k}
                            checked={isPicked}
                            disabled={!!result}
                            onChange={() => setAnswers((a) => ({ ...a, [q.id]: k }))}
                            className="mt-0.5 accent-[#EDAE9D]"
                          />
                          <span>
                            <strong className="font-mono text-[#EDAE9D] mr-1.5">{k}.</strong> {v}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {r && (
                    <div className="p-3.5 rounded-xl bg-[#080C10]/90 border border-white/10 text-xs text-stone-300 leading-relaxed">
                      <strong className={r.right ? 'text-emerald-400' : 'text-rose-400'}>
                        {r.right ? '✓ Correct: ' : '✗ Rationale: '}
                      </strong>
                      {r.explanation}
                    </div>
                  )}
                </fieldset>
              );
            })}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            {!result && (
              <button
                type="button"
                disabled={pending || Object.keys(answers).length < p.questions.length}
                onClick={grade}
                className="btn-luxury-primary px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider disabled:opacity-40"
              >
                {pending ? 'Checking...' : 'Check Answers'}
              </button>
            )}
            {result && (
              <div className="flex flex-wrap items-center gap-4">
                <p role="status" className="text-sm font-bold text-[#EDAE9D]">
                  {result.passed
                    ? `✓ Passed with ${result.score}%`
                    : `Scored ${result.score}%. Review rationales and try again.`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setAnswers({});
                  }}
                  className="text-xs font-mono text-stone-300 underline hover:text-white"
                >
                  Reset Quiz
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Private Reflection Journal */}
      <section className="p-6 rounded-2xl glass-surface space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] font-bold">
            🔒 Private Reflection Journal
          </span>
          <span className="text-[10px] font-mono text-stone-400">Client-Side Encrypted</span>
        </div>
        {p.body.reflection && (
          <div className="text-xs sm:text-sm text-stone-300 italic">
            <ReactMarkdown>{p.body.reflection}</ReactMarkdown>
          </div>
        )}
        <JournalBox userId={p.userId} lessonId={p.lessonId} />
      </section>

      {/* Bottom Lesson Navigation Bar */}
      <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        {p.prevHref ? (
          <Link
            href={p.prevHref}
            className="btn-luxury-glass px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <span>← Previous Lesson</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="btn-luxury-glass px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <span>← Course Home</span>
          </Link>
        )}

        <div className="flex items-center gap-3">
          {!done && (
            <button
              type="button"
              onClick={finish}
              className="btn-luxury-steel px-5 py-3 rounded-xl text-xs font-bold"
            >
              Mark Lesson Complete
            </button>
          )}
          {p.nextHref && (
            <Link
              href={p.nextHref}
              className="btn-luxury-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <span>
                {p.nextHref.endsWith('/recap')
                  ? `Module ${p.moduleNum} Video Recap & Synthesis →`
                  : 'Next Lesson →'}
              </span>
            </Link>
          )}
        </div>
      </div>
      {msg && <p role="alert" className="text-xs text-rose-400">{msg}</p>}
    </article>
  );
}
