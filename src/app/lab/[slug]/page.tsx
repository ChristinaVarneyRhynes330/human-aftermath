import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Shell from '@/components/lab/Shell'
import ScenarioPlayer from '@/components/lab/ScenarioPlayer'
import ClaimLab from '@/components/lab/ClaimLab'
import Classify from '@/components/lab/Classify'
import ExplainOptions from '@/components/lab/ExplainOptions'
import type { Activity } from '@/lib/lab/types'

export default async function LabActivity({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('lab_activities').select('slug,type,title,definition').eq('slug', slug).maybeSingle()
  if (!data) notFound()   // RLS hides drafts and professional-tier activities
  const a = data as unknown as Activity
  return (
    <Shell title={a.title} def={a.definition}>
      {a.type === 'scenario' && <ScenarioPlayer slug={a.slug} def={a.definition} />}
      {a.type === 'claim_lab' && <ClaimLab def={a.definition} />}
      {a.type === 'classify' && <Classify def={a.definition} />}
      {a.type === 'explain_options' && <ExplainOptions def={a.definition} />}
    </Shell>)
}
