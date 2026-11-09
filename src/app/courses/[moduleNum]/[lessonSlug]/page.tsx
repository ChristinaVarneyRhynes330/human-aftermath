import { notFound } from 'next/navigation';
import Link from 'next/link';
import LessonRunner from '@/components/LessonRunner';
import ModuleMediaCenter from '@/components/ModuleMediaCenter';
import { createClient } from '@/lib/supabase/server';
import { getCurriculum, getMediaRegistry } from '@/lib/content-fallback';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleNum: string; lessonSlug: string }>;
}) {
  const { moduleNum, lessonSlug } = await params;
  const num = parseInt(moduleNum, 10);

  const curriculum = getCurriculum();
  const mediaRegistry = getMediaRegistry();
  const mod = curriculum.find((m: any) => m.num === num);
  if (!mod) notFound();

  const modMedia = mediaRegistry[String(num)] || null;

  // Check if this is the End-of-Module Video Recap & Synthesis route (/courses/[moduleNum]/recap)
  if (lessonSlug === 'recap') {
    const nextMod = curriculum.find((m: any) => m.num === num + 1);
    const nextModHref = nextMod?.lessons?.[0]?.slug
      ? `/courses/${num + 1}/${nextMod.lessons[0].slug}`
      : '/certificate';
    const lastLessonSlug = mod.lessons?.[mod.lessons.length - 1]?.slug || `m${num}_l1`;

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        {/* Milestone Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#2C4A68] via-[#1B2B3A] to-[#10161E] text-white p-8 sm:p-10 border border-[#EDAE9D]/30 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-[#080C10]/80 border border-[#EDAE9D]/50 text-[#EDAE9D] text-xs font-extrabold uppercase font-mono">
              Milestone Checkpoint
            </span>
            <span className="text-xs font-mono font-bold text-[#BBD4C5]">
              Module {num} of 8 Complete ✓
            </span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Module {num} Synthesis & Video Recap: {mod.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl font-light">
            You have completed all {mod.lessons?.length || 0} lessons in Module {num}. Watch the official End-of-Module Recap video below and review the Full-Circle synthesis before advancing.
          </p>
        </div>

        {/* Official End-of-Module Video Recap Player (defaults to Recap tab) */}
        {modMedia && <ModuleMediaCenter moduleNum={num} media={modMedia} defaultMode="recap" />}

        {/* Full-Circle Moment */}
        <div className="p-6 sm:p-8 rounded-3xl glass-surface space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[#EDAE9D] text-lg">◎</span>
            <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white">
              Module {num} Full-Circle Moment
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            What becomes visible when we consider these lessons together? An event is never the complete story. Whether examining stress physiology, memory encoding, developmental timing, or coping armor, human responses are intelligent evolutionary survival adaptations shaped by context.
          </p>
        </div>

        {/* Misconception Challenge */}
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/40 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-rose-400">⚠</span>
            <h3 className="font-bold text-xs font-mono text-rose-300 uppercase tracking-wider">
              Module {num} Misconception Challenge
            </h3>
          </div>
          <div className="text-xs sm:text-sm text-stone-200 leading-relaxed space-y-2">
            <p>
              <strong className="text-rose-300">The Common Myth:</strong> &ldquo;If someone experienced an objectively terrible event, their ongoing emotional struggles prove that their brain is permanently broken.&rdquo;
            </p>
            <p>
              <strong className="text-emerald-300">The Scientific Correction:</strong> Exposure is probabilistic, not deterministic. Brain networks retain lifelong neuroplasticity, and human recovery is co-produced by relational safety, agency, economic resources, and environmental buffers.
            </p>
          </div>
        </div>

        {/* Advance CTA Bar */}
        <div className="p-6 rounded-2xl glass-surface flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-base text-white font-serif-editorial">
              Ready for the Next Chapter?
            </div>
            <div className="text-xs text-stone-400">
              {num < 8 ? `Advance to Module ${num + 1}: ${nextMod?.title}` : 'Claim your Verified Course Certificate'}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/courses/${num}/${lastLessonSlug}`}
              className="btn-luxury-glass px-4 py-3 rounded-xl text-xs font-semibold"
            >
              ← Back to Lesson {mod.lessons?.length}
            </Link>
            <Link
              href={nextModHref}
              className="btn-luxury-primary px-7 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <span>{num < 8 ? `Continue to Module ${num + 1} →` : 'Go to Certificate →'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard Lesson Lookup
  let lesson: any = null;
  let user: any = null;
  let prog: any = null;

  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    user = authUser;

    const { data } = await supabase
      .from('lessons')
      .select('id,title,body,position,module_id,modules(num),quiz_questions(id,prompt,options,position)')
      .eq('slug', lessonSlug)
      .maybeSingle();
    lesson = data;

    if (lesson && user) {
      const { data: p } = await supabase
        .from('user_progress')
        .select('completed_at')
        .eq('user_id', user.id)
        .eq('lesson_id', lesson.id)
        .maybeSingle();
      prog = p;
    }
  } catch (e) {
    // Fallback mode
  }

  const lessonList = mod.lessons || [];
  const currentIdx = lessonList.findIndex((l: any) => l.slug === lessonSlug);
  const fallbackLesson = currentIdx !== -1 ? lessonList[currentIdx] : null;

  if (!lesson && !fallbackLesson) {
    notFound();
  }

  const activeLesson = lesson || fallbackLesson;
  const title = activeLesson.title;
  const body = activeLesson.body || {
    objectives: activeLesson.objectives || '',
    hook: activeLesson.hook || '',
    script: activeLesson.script || '',
    evidence: activeLesson.evidence || '',
    terms: activeLesson.terms || '',
    example: activeLesson.example || '',
    misconception: activeLesson.misconception || '',
    reflection: activeLesson.reflection || '',
    takeaways: activeLesson.takeaways || '',
  };

  // Previous / Next navigation: last lesson of each module goes to `/courses/${num}/recap`!
  let prevHref: string | null = null;
  if (currentIdx > 0) {
    prevHref = `/courses/${num}/${lessonList[currentIdx - 1].slug}`;
  } else if (num > 1) {
    prevHref = `/courses/${num - 1}/recap`;
  }

  let nextHref: string | null = null;
  if (currentIdx !== -1 && currentIdx + 1 < lessonList.length) {
    nextHref = `/courses/${num}/${lessonList[currentIdx + 1].slug}`;
  } else {
    nextHref = `/courses/${num}/recap`;
  }

  const rawQuestions = activeLesson.quiz_questions || activeLesson.quiz || [];
  const questions = rawQuestions.map((q: any, i: number) => ({
    id: q.id || `q_${i}`,
    prompt: q.prompt,
    options: q.options || {},
    position: q.position ?? i,
  }));

  return (
    <LessonRunner
      userId={user?.id || 'demo-learner'}
      lessonId={activeLesson.id || lessonSlug}
      moduleNum={num}
      moduleTitle={mod.title}
      lessonIdx={currentIdx !== -1 ? currentIdx : 0}
      totalLessonsInMod={lessonList.length}
      title={title}
      minutes={activeLesson.minutes || 8}
      body={body as any}
      questions={questions}
      media={modMedia}
      alreadyComplete={!!prog?.completed_at}
      prevHref={prevHref}
      nextHref={nextHref}
    />
  );
}
