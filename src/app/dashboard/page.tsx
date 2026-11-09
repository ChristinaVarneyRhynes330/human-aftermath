import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getCurriculum, getMediaRegistry } from '@/lib/content-fallback';

export default async function Dashboard() {
  let modules: any[] | null = null;
  let doneSet = new Set<string>();
  const mediaRegistry = getMediaRegistry();

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const [{ data: m }, { data: done }] = await Promise.all([
        supabase.from('modules').select('num,title,intro,lessons(id,slug,position,title,minutes)').order('num').order('position', { referencedTable: 'lessons' }),
        supabase.from('user_progress').select('lesson_id').eq('user_id', user.id).not('completed_at', 'is', null),
      ]);
      if (m && m.length > 0) {
        modules = m;
        doneSet = new Set((done ?? []).map((d: any) => d.lesson_id));
      }
    }
  } catch (e) {
    // Fallback mode
  }

  if (!modules || modules.length === 0) {
    modules = getCurriculum().map((m: any) => ({
      num: m.num,
      title: m.title,
      intro: m.intro,
      lessons: (m.lessons || []).map((l: any, idx: number) => ({
        id: l.slug || `m${m.num}_l${idx + 1}`,
        slug: l.slug,
        position: l.position ?? idx + 1,
        title: l.title,
        minutes: l.minutes || 8,
      })),
    }));
  }

  const total = (modules ?? []).reduce((s, m) => s + (m.lessons?.length || 0), 0);
  const pct = total ? Math.round((doneSet.size / total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-16">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] font-bold block mb-1">
          Masterclass Journey
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white">
          Your Course Curriculum & Video Directory
        </h1>
        <p className="mt-2 text-sm text-stone-300 font-light max-w-2xl">
          8 multidisciplinary modules, 65 lessons, 8 Masterclass lectures, and 9 End-of-Module Video Recaps.
        </p>
      </div>

      {/* Progress Bar Card */}
      <div
        className="p-6 rounded-2xl glass-surface space-y-3"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-300">
            {doneSet.size} of {total} lessons complete
          </span>
          <span className="text-[#EDAE9D] font-bold text-sm">{pct}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-[#16202A] border border-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3E6892] via-[#EDAE9D] to-[#BBD4C5] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Module List */}
      <div className="space-y-6">
        {(modules ?? []).map((m) => {
          const media = mediaRegistry[String(m.num)];
          return (
            <section
              key={m.num}
              aria-labelledby={`m${m.num}`}
              className="rounded-2xl border border-white/10 glass-surface p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#1B2B3A] border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-[#EDAE9D]">
                    {m.num}
                  </span>
                  <div>
                    <h2 id={`m${m.num}`} className="font-serif-editorial text-xl font-bold text-white">
                      Module {m.num}: {m.title}
                    </h2>
                    {media && (
                      <div className="text-[11px] font-mono text-[#BBD4C5] mt-0.5">
                        📹 Masterclass Video ({media.master_duration}) • 🎬 Recap ({media.recap_duration})
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {m.lessons?.length || 0} Lessons
                </span>
              </div>

              <ul className="divide-y divide-white/5 text-xs sm:text-sm">
                {m.lessons?.map((l: any, idx: number) => (
                  <li key={l.id || l.slug}>
                    <Link
                      href={`/courses/${m.num}/${l.slug}`}
                      className="flex items-center justify-between gap-3 py-3 hover:text-[#EDAE9D] transition group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-stone-500 group-hover:text-[#EDAE9D] transition font-mono text-xs">
                          {idx + 1}.
                        </span>
                        <span className="truncate text-stone-200 group-hover:text-white font-medium">
                          {l.title.replace(/^LESSON \d+:\s*/i, '')}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-stone-400">
                        {doneSet.has(l.id) ? '✓ Done' : `${l.minutes} min`}
                      </span>
                    </Link>
                  </li>
                ))}

                {/* End-of-Module Video Recap Row */}
                <li>
                  <Link
                    href={`/courses/${m.num}/recap`}
                    className="flex items-center justify-between gap-3 py-3.5 px-3 mt-1 rounded-xl bg-[#16202A]/80 hover:bg-[#1E2B38] border border-[#EDAE9D]/20 transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#EDAE9D]">🎬</span>
                      <span className="font-bold text-[#EDAE9D] group-hover:underline">
                        Module {m.num} End-of-Module Video Recap & Synthesis
                      </span>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-[#BBD4C5]">
                      {media?.recap_duration || '1:15'} Video →
                    </span>
                  </Link>
                </li>
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
