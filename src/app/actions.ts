'use server';

import { createClient, createServiceClient } from '@/lib/supabase/server';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

/**
 * Record a lesson completion for authenticated learners.
 */
export async function completeLesson(lessonId: string, activeSeconds: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: 'Unauthorized' };
  const { data: pass } = await supabase.from('assessment_attempts')
    .select('id').eq('user_id', user.id).eq('lesson_id', lessonId).eq('passed', true).limit(1);
  if (!pass?.length) return { ok: false as const, error: 'Pass the lesson check first.' };
  const { error } = await supabase.from('user_progress').upsert({
    user_id: user.id, lesson_id: lessonId, completed_at: new Date().toISOString(),
    active_seconds: Math.min(Math.max(0, Math.round(activeSeconds)), 4 * 3600),
  });
  if (error) return { ok: false as const, error: error.message };
  revalidatePath('/dashboard');
  return { ok: true as const };
}

/**
 * Server-verified quiz submission.
 */
export async function submitQuiz(lessonId: string, answers: Record<string, string>) {
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) throw new Error('Not signed in');
  const admin = createServiceClient();
  const { data: keys, error: keyError } = await admin.from('quiz_questions')
    .select('id, quiz_answer_keys(correct, explanation)').eq('lesson_id', lessonId);
  if (keyError || !keys?.length) throw new Error('Quiz not found');
  const results = keys.map((q: any) => {
    const key = Array.isArray(q.quiz_answer_keys) ? q.quiz_answer_keys[0] : q.quiz_answer_keys;
    return { questionId: q.id, chosen: answers[q.id] ?? null, correct: key.correct, explanation: key.explanation as string, right: answers[q.id] === key.correct };
  });
  const score = Math.round((results.filter(r => r.right).length / results.length) * 100);
  const passed = score >= 70;
  await admin.from('assessment_attempts').insert({ user_id: user.id, lesson_id: lessonId, kind: 'lesson_quiz', responses: answers, score, passed });
  return { score, passed, results };
}

/**
 * Issue verified certificate of educational completion.
 * Accepts optional learner name parameter to satisfy certificate page callers.
 */
export async function issueCredential(learnerName?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, success: false, error: 'Unauthorized', code: null };
  }

  const salt = process.env.CREDENTIAL_SALT || 'development-fallback-salt';
  const rawId = `${user.id}:completion:${salt}`;
  const credentialId = 'HA-' + crypto.createHash('sha256').update(rawId).digest('hex').substring(0, 12).toUpperCase();

  const { error } = await supabase
    .from('credentials')
    .upsert({
      id: credentialId,
      user_id: user.id,
      title: 'The Human Aftermath — Certificate of Educational Completion',
      ce_hours: 0.0,
      issued_at: new Date().toISOString(),
    }, { onConflict: 'id' });

  if (error) {
    return { ok: false, success: false, error: error.message, code: null };
  }

  return {
    ok: true,
    success: true,
    code: credentialId,
    credentialId,
    error: null,
  };
}