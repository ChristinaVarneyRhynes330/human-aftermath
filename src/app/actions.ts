'use server'
import { revalidatePath } from 'next/cache'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { newCredentialCode, signCredential } from '@/lib/credentials'

const PASS_MARK = 70

async function requireUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not signed in')
  return { supabase, user }
}

/** Grades on the server. Answer keys never reach the browser until after submission. */
export async function submitQuiz(lessonId: string, answers: Record<string, string>) {
  const { user } = await requireUser()
  const admin = createServiceClient()
  const { data: keys, error } = await admin
    .from('quiz_questions').select('id, quiz_answer_keys(correct, explanation)').eq('lesson_id', lessonId)
  if (error || !keys?.length) throw new Error('Quiz not found')

  const results = keys.map((q: any) => {
    const key = Array.isArray(q.quiz_answer_keys) ? q.quiz_answer_keys[0] : q.quiz_answer_keys
    return { questionId: q.id, chosen: answers[q.id] ?? null, correct: key.correct, explanation: key.explanation as string, right: answers[q.id] === key.correct }
  })
  const score = Math.round((results.filter(r => r.right).length / results.length) * 100)
  const passed = score >= PASS_MARK
  await admin.from('assessment_attempts').insert({ user_id: user.id, lesson_id: lessonId, kind: 'lesson_quiz', responses: answers, score, passed })
  return { score, passed, results }
}

/** A lesson only counts as complete if the learner has a passing quiz attempt for it. */
export async function completeLesson(lessonId: string, activeSeconds: number) {
  const { supabase, user } = await requireUser()
  const { data: pass } = await supabase.from('assessment_attempts')
    .select('id').eq('user_id', user.id).eq('lesson_id', lessonId).eq('passed', true).limit(1)
  if (!pass?.length) return { ok: false as const, error: 'Pass the lesson check first.' }
  const { error } = await supabase.from('user_progress').upsert({
    user_id: user.id, lesson_id: lessonId, completed_at: new Date().toISOString(),
    active_seconds: Math.min(Math.max(0, Math.round(activeSeconds)), 4 * 3600),
  })
  if (error) return { ok: false as const, error: error.message }
  revalidatePath('/dashboard')
  return { ok: true as const }
}

/** Issues the credential only when every lesson in the course is complete. Idempotent per learner. */
export async function issueCredential(learnerName: string) {
  const { supabase, user } = await requireUser()
  const name = learnerName.trim().slice(0, 120)
  if (name.length < 2) return { ok: false as const, error: 'Enter your full name as it should appear.' }

  const admin = createServiceClient()
  const { data: course } = await admin.from('courses').select('id').eq('slug', 'human-aftermath').single()
  if (!course) return { ok: false as const, error: 'Course not found.' }

  const existing = await admin.from('credentials').select('credential_code').eq('user_id', user.id).eq('course_id', course.id).maybeSingle()
  if (existing.data) return { ok: true as const, code: existing.data.credential_code }

  const { data: lessons } = await admin.from('lessons').select('id, minutes, modules!inner(course_id)').eq('modules.course_id', course.id)
  const { data: done } = await supabase.from('user_progress').select('lesson_id').eq('user_id', user.id).not('completed_at', 'is', null)
  const doneSet = new Set((done ?? []).map(d => d.lesson_id))
  const missing = (lessons ?? []).filter(l => !doneSet.has(l.id)).length
  if (!lessons?.length || missing > 0) return { ok: false as const, error: `${missing} lesson${missing === 1 ? '' : 's'} still to complete.` }

  const record = {
    code: newCredentialCode(), userId: user.id, courseId: course.id, learnerName: name,
    totalMinutes: lessons.reduce((s, l) => s + l.minutes, 0), capstoneScore: null, issuedAt: new Date().toISOString(),
  }
  const { error } = await admin.from('credentials').insert({
    credential_code: record.code, signature: signCredential(record), user_id: user.id, course_id: course.id,
    learner_name: name, total_minutes: record.totalMinutes, capstone_score: null, issued_at: record.issuedAt,
  })
  if (error) return { ok: false as const, error: error.message }
  return { ok: true as const, code: record.code }
}
