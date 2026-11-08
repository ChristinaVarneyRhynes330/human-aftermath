'use server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { scoreScenario } from '@/lib/lab/scoring'
import type { ScenarioDef } from '@/lib/lab/types'

/** Records an attempt. For scenarios the result is recomputed on the server from the choice path. */
export async function recordLabAttempt(slug: string, response: unknown) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false as const, error: 'Not signed in' }
  // Reading through the user's client applies RLS, so tier and publish rules are enforced.
  const { data: act } = await supabase.from('lab_activities').select('id,type,definition,version').eq('slug', slug).maybeSingle()
  if (!act) return { ok: false as const, error: 'Activity not found' }

  let result: unknown = { recorded: true }, passed: boolean | null = null
  if (act.type === 'scenario') {
    if (!Array.isArray(response) || !response.every(x => typeof x === 'string')) return { ok: false as const, error: 'Invalid response' }
    const r = scoreScenario(act.definition as ScenarioDef, response)
    if (!r.valid) return { ok: false as const, error: 'Incomplete or invalid path' }
    result = r; passed = r.passed
  }
  const { error } = await createServiceClient().from('lab_attempts').insert({
    user_id: user.id, activity_id: act.id, activity_version: act.version, response, result, passed })
  return error ? { ok: false as const, error: error.message } : { ok: true as const, result }
}
