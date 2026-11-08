import { notFound } from 'next/navigation'
import LessonRunner from '@/components/LessonRunner'
import { createClient } from '@/lib/supabase/server'

export default async function LessonPage({ params }: { params: Promise<{ moduleNum: string; lessonSlug: string }> }) {
  const { lessonSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: lesson } = await supabase.from('lessons')
    .select('id,title,body,position,module_id,modules(num),quiz_questions(id,prompt,options,position)').eq('slug', lessonSlug).maybeSingle()
  if (!lesson) notFound()   // RLS also hides lessons the learner's role may not access

  const [{ data: prog }, { data: siblings }] = await Promise.all([
    supabase.from('user_progress').select('completed_at').eq('user_id', user!.id).eq('lesson_id', lesson.id).maybeSingle(),
    supabase.from('lessons').select('slug,position,modules(num)').eq('module_id', lesson.module_id).order('position'),
  ])
  const mod: any = lesson.modules
  const idx = siblings?.findIndex(s => s.position === lesson.position) ?? -1
  let nextHref: string | null = siblings && siblings[idx + 1] ? `/courses/${mod.num}/${siblings[idx + 1].slug}` : null
  if (!nextHref) {
    const { data: nm } = await supabase.from('modules').select('num,lessons(slug,position)').eq('num', mod.num + 1).maybeSingle()
    const first = nm?.lessons?.sort((a, b) => a.position - b.position)[0]
    if (nm && first) nextHref = `/courses/${nm.num}/${first.slug}`
  }
  const questions = [...(lesson.quiz_questions ?? [])].sort((a, b) => a.position - b.position)
  return <LessonRunner userId={user!.id} lessonId={lesson.id} title={lesson.title} body={lesson.body as any}
    questions={questions} alreadyComplete={!!prog?.completed_at} nextHref={nextHref} />
}
