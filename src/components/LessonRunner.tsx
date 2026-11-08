'use client'
import { useEffect, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { submitQuiz, completeLesson } from '@/app/actions'
import JournalBox from './JournalBox'

type Q = { id: string; prompt: string; options: Record<string, string> }
type Body = Record<'objectives' | 'hook' | 'script' | 'evidence' | 'terms' | 'example' | 'misconception' | 'reflection' | 'takeaways', string>
type Result = Awaited<ReturnType<typeof submitQuiz>>

const SECTIONS: [keyof Body, string][] = [
  ['objectives', 'What you will learn'], ['hook', 'To begin'], ['script', 'The lesson'], ['evidence', 'What the evidence says'],
  ['terms', 'Key terms'], ['example', 'Example'], ['misconception', 'Common misconception'], ['takeaways', 'Key takeaways'],
]

export default function LessonRunner(p: { userId: string; lessonId: string; title: string; body: Body; questions: Q[]; alreadyComplete: boolean; nextHref: string | null }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Result | null>(null)
  const [msg, setMsg] = useState(''); const [done, setDone] = useState(p.alreadyComplete)
  const [pending, start] = useTransition()
  const seconds = useRef(0)

  // Engaged time for CE logging: counts only while the tab is visible.
  useEffect(() => {
    const t = setInterval(() => { if (document.visibilityState === 'visible') seconds.current += 1 }, 1000)
    return () => clearInterval(t)
  }, [])

  const grade = () => start(async () => setResult(await submitQuiz(p.lessonId, answers)))
  const finish = () => start(async () => {
    const r = await completeLesson(p.lessonId, seconds.current)
    if (r.ok) setDone(true); else setMsg(r.error)
  })

  return (
    <article>
      <h1 className="font-serif text-3xl">{p.title}</h1>
      {SECTIONS.map(([k, label]) => p.body[k] ? (
        <section key={k} className="mt-8"><h2 className="font-serif text-xl text-ink-blue">{label}</h2>
          <div className="prose-lesson mt-2"><ReactMarkdown>{p.body[k]}</ReactMarkdown></div></section>) : null)}

      <section className="mt-8"><h2 className="font-serif text-xl text-ink-blue">Reflection</h2>
        <div className="prose-lesson mt-2"><ReactMarkdown>{p.body.reflection}</ReactMarkdown></div>
        <JournalBox userId={p.userId} lessonId={p.lessonId} /></section>

      <section className="mt-10 rounded-xl border border-slate/40 bg-white p-5">
        <h2 className="font-serif text-xl">Lesson check</h2>
        <p className="text-sm text-ink-soft">Score {70}% or higher to complete this lesson.</p>
        {p.questions.map(q => (
          <fieldset key={q.id} className="mt-4">
            <legend className="font-medium">{q.prompt}</legend>
            {Object.entries(q.options).map(([k, v]) => {
              const r = result?.results.find(x => x.questionId === q.id)
              return (
                <label key={k} className={`mt-2 flex gap-2 rounded-lg border p-3 ${r && k === r.correct ? 'border-ink-blue bg-mint/50' : r && k === r.chosen ? 'border-peach bg-blush/50' : 'border-slate/40'}`}>
                  <input type="radio" name={q.id} value={k} disabled={!!result} onChange={() => setAnswers(a => ({ ...a, [q.id]: k }))} />
                  <span><strong>{k}.</strong> {v}</span>
                </label>)
            })}
            {result && <p className="mt-2 text-sm">{result.results.find(x => x.questionId === q.id)?.explanation}</p>}
          </fieldset>))}
        {!result && <button disabled={pending || Object.keys(answers).length < p.questions.length} onClick={grade}
          className="mt-4 rounded-lg bg-ink-blue px-5 py-2 font-medium text-white disabled:opacity-50">Check answers</button>}
        {result && <p role="status" className="mt-4 font-medium">{result.passed ? `Passed with ${result.score}%.` : `You scored ${result.score}%. Review the lesson and try again.`}</p>}
        {result && !result.passed && <button onClick={() => { setResult(null); setAnswers({}) }} className="mt-2 text-sm text-ink-blue underline">Try again</button>}
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {!done && <button disabled={pending || !result?.passed} onClick={finish} className="rounded-lg bg-ink-blue px-5 py-2 font-medium text-white disabled:opacity-50">Mark lesson complete</button>}
        {done && p.nextHref && <Link href={p.nextHref} className="rounded-lg bg-ink-blue px-5 py-2 font-medium text-white">Next lesson</Link>}
        {done && !p.nextHref && <Link href="/certificate" className="rounded-lg bg-ink-blue px-5 py-2 font-medium text-white">Go to your certificate</Link>}
        {msg && <p role="alert" className="text-sm">{msg}</p>}
      </div>
    </article>
  )
}
