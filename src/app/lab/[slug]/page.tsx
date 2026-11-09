import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Shell from '@/components/lab/Shell';
import ScenarioPlayer from '@/components/lab/ScenarioPlayer';
import ClaimLab from '@/components/lab/ClaimLab';
import Classify from '@/components/lab/Classify';
import ExplainOptions from '@/components/lab/ExplainOptions';
import { getLabActivities } from '@/lib/content-fallback';
import type { Activity } from '@/lib/lab/types';

export default async function LabActivity({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let activity: Activity | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('lab_activities').select('slug,type,title,definition').eq('slug', slug).maybeSingle();
    if (data) activity = data as unknown as Activity;
  } catch (e) {
    // Supabase unavailable
  }

  // Fallback to local files
  if (!activity) {
    const all = getLabActivities();
    const match = all.find((item) => item.slug === slug);
    if (match) {
      activity = match as unknown as Activity;
    }
  }

  if (!activity) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Shell title={activity.title} def={activity.definition}>
        {activity.type === 'scenario' && <ScenarioPlayer slug={activity.slug} def={activity.definition} />}
        {activity.type === 'claim_lab' && <ClaimLab def={activity.definition} />}
        {activity.type === 'classify' && <Classify def={activity.definition} />}
        {activity.type === 'explain_options' && <ExplainOptions def={activity.definition} />}
      </Shell>
    </div>
  );
}
