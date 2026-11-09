import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getLabActivities } from '@/lib/content-fallback';

const LABELS: Record<string, string> = {
  scenario: 'Interactive Scenarios',
  claim_lab: 'Claim Labs',
  classify: 'Sorting Activities',
  explain_options: 'What Else Could Explain This?',
};

export default async function LabIndex() {
  let activities: any[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('lab_activities').select('slug,type,title').order('title');
    if (data && data.length > 0) {
      activities = data;
    }
  } catch (e) {
    // Supabase unavailable
  }

  // Fallback to local files
  if (activities.length === 0) {
    activities = getLabActivities();
  }

  const groups = Object.entries(LABELS).map(([t, label]) => ({
    label,
    items: activities.filter((a) => a.type === t),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#EDAE9D] font-bold block mb-1">
          Interactive Judgment & Synthesis
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white">Learning Lab</h1>
        <p className="mt-2 text-sm text-stone-300 font-light max-w-2xl">
          Practice activities and simulation scenarios that build trauma-literacy judgment without requiring personal self-disclosure.
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((g) => (
          <section key={g.label} className="space-y-3">
            <h2 className="font-serif-editorial text-xl font-bold text-[#EDAE9D]">{g.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {g.items.map((a) => (
                <Link
                  key={a.slug}
                  href={`/lab/${a.slug}`}
                  className="p-4 rounded-xl border border-white/10 glass-surface-interactive flex items-start gap-3 group"
                >
                  <span className="text-[#EDAE9D] text-sm mt-0.5">❖</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#EDAE9D] transition leading-snug">
                      {a.title}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-400 uppercase mt-1 block">
                      Launch Activity →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
