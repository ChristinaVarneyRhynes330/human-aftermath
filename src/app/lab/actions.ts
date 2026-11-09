'use server';

import { createClient } from '@/lib/supabase/server';
import { scoreScenario } from '@/lib/lab/scoring';
import { ScenarioDef } from '@/lib/lab/types';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

interface RecordAttemptParams {
  slug: string;
  path?: string[];
  kind?: string;
  score?: number;
  maxScore?: number;
  passed?: boolean;
  meta?: Record<string, any>;
}

export async function recordLabAttempt(params: RecordAttemptParams) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  let finalScore = params.score ?? 0;
  let finalPassed = params.passed ?? false;
  let skills = {};
  let reasons: string[] = [];

  // If path is supplied, score server-side against canonical content JSON
  if (params.path && params.path.length > 0) {
    const contentPath = path.join(process.cwd(), 'content', 'lab', `${params.slug}.json`);
    if (existsSync(contentPath)) {
      try {
        const fileData = JSON.parse(readFileSync(contentPath, 'utf8'));
        const scenarioActivity = Array.isArray(fileData)
          ? fileData.find((x: any) => x.type === 'scenario')
          : fileData;

        if (scenarioActivity?.definition) {
          const evaluated = scoreScenario(scenarioActivity.definition as ScenarioDef, params.path);
          finalScore = evaluated.score;
          finalPassed = evaluated.passed;
          skills = evaluated.skills;
          reasons = evaluated.reasons;
        }
      } catch (e) {
        console.error('Error loading scenario definition on server:', e);
      }
    }
  }

  const { error } = await supabase
    .from('lab_attempts')
    .insert({
      user_id: user.id,
      scenario_slug: params.slug,
      score: finalScore,
      passed: finalPassed,
      skills,
      reasons,
      decision_path: params.path ?? [],
      created_at: new Date().toISOString(),
    });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, score: finalScore, passed: finalPassed };
}