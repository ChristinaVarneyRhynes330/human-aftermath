// Loads content/*.json into Supabase. Run once: npm run seed
// Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (never commit or expose the service key).
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
const db = createClient(url, key, { auth: { persistSession: false } })
const load = (f) => JSON.parse(readFileSync(new URL(`../content/${f}.json`, import.meta.url), 'utf8'))
const must = ({ error }, label) => { if (error) throw new Error(`${label}: ${error.message}`) }

const curriculum = load('curriculum')

const { data: course, error: ce } = await db.from('courses')
  .upsert({ slug: 'human-aftermath', title: 'The Human Aftermath', audience: 'public', published: true }, { onConflict: 'slug' })
  .select().single()
if (ce) throw ce

let lessonCount = 0, questionCount = 0
for (const m of curriculum) {
  const { data: mod, error } = await db.from('modules')
    .upsert({ course_id: course.id, num: m.num, title: m.title, intro: m.intro, audience: 'public' }, { onConflict: 'course_id,num' })
    .select().single()
  if (error) throw error
  for (const l of m.lessons) {
    const { quiz, slug, position, title, minutes, ...body } = l
    const { data: les, error: le } = await db.from('lessons')
      .upsert({ module_id: mod.id, slug, position, title, minutes, body }, { onConflict: 'slug' })
      .select().single()
    if (le) throw le
    lessonCount++
    await db.from('quiz_questions').delete().eq('lesson_id', les.id) // cascades to answer keys
    for (const [i, q] of quiz.entries()) {
      const { data: qq, error: qe } = await db.from('quiz_questions')
        .insert({ lesson_id: les.id, position: i + 1, prompt: q.prompt, options: q.options }).select().single()
      if (qe) throw qe
      must(await db.from('quiz_answer_keys').insert({ question_id: qq.id, correct: q.answer, explanation: q.explanation }), 'answer key')
      questionCount++
    }
  }
}

must(await db.from('field_guides').upsert(load('field_guides')), 'field_guides')
must(await db.from('glossary_terms').upsert(load('glossary').map(g => ({ term: g.term, category: g.category, definition: g.def }))), 'glossary')
must(await db.from('claim_labs').upsert(load('claim_labs').map(c => ({ id: c.id, claim: c.claim, myth: c.myth, right_view: c.right, overreach: c.overreach, evidence: c.evidence, rewrite: c.rewrite, tier: c.tier }))), 'claim_labs')

// Learning Lab activities. Anything whose definition carries a DRAFT status stays unpublished.
import { readdirSync } from 'node:fs'
let labCount = 0
for (const f of readdirSync(new URL('../content/lab/', import.meta.url))) {
  for (const a of load(`lab/${f.replace('.json', '')}`)) {
    const published = !String(a.definition.status ?? '').startsWith('DRAFT')
    must(await db.from('lab_activities').upsert({ slug: a.slug, type: a.type, title: a.title, audience: a.audience, published, definition: a.definition }, { onConflict: 'slug' }), `lab ${a.slug}`)
    labCount++
  }
}
console.log(`Seeded ${labCount} lab activities (drafts stay unpublished until you publish them in the dashboard).`)

const { data: stats } = await db.from('course_stats').select('*').eq('course_id', course.id).single()
console.log(`Seeded ${lessonCount} lessons, ${questionCount} questions. DB says: ${stats.lesson_count} lessons, ${stats.total_minutes} min.`)
