import { ScenarioDef, ScenarioResult, SkillLevel } from './types';

export const LEVEL_LABEL: Record<SkillLevel, string> = {
  strong: 'Strong',
  developing: 'Developing',
  needs_attention: 'Needs attention',
} as const;

export function scoreScenario(def: ScenarioDef, choicePath: string[]): ScenarioResult {
  const scores: Record<string, number> = {};

  if (def.dimensions && Array.isArray(def.dimensions)) {
    for (const dim of def.dimensions) {
      scores[dim.id] = 0;
    }
  }

  let currentNodeId = def.startNode ?? def.start;
  let gatePassed = true;
  const reasons: string[] = [];

  for (const choiceId of choicePath) {
    const node = currentNodeId ? def.nodes?.[currentNodeId] : undefined;
    if (!node) break;

    const choices = node.choices || [];
    const choice = choices.find((c: any) => c.id === choiceId);
    if (!choice) break;

    if (choice.isFatal) {
      gatePassed = false;
      if (choice.fatalReason) {
        reasons.push(choice.fatalReason);
      }
    }

    if (choice.effects) {
      if (Array.isArray(choice.effects)) {
        for (const eff of choice.effects) {
          scores[eff.dimensionId] = (scores[eff.dimensionId] || 0) + eff.delta;
        }
      } else {
        for (const [dimensionId, delta] of Object.entries(choice.effects)) {
          scores[dimensionId] = (scores[dimensionId] || 0) + delta;
        }
      }
    }

    currentNodeId = choice.next;
  }

  const dimensionKeys = Object.keys(scores);
  const totalScore = dimensionKeys.reduce((acc, k) => acc + scores[k], 0);

  const maxPossible = Math.max(1, dimensionKeys.length * 5);
  const normalizedScore = Math.min(100, Math.max(0, Math.round((totalScore / maxPossible) * 100)));

  const passingScore = def.rubric?.passingScore ?? 70;
  const passed = gatePassed && normalizedScore >= passingScore;

  const skills: Record<string, SkillLevel> = {};
  for (const dimId of dimensionKeys) {
    const dimScore = scores[dimId];
    if (dimScore >= 4) {
      skills[dimId] = 'strong';
    } else if (dimScore >= 2) {
      skills[dimId] = 'developing';
    } else {
      skills[dimId] = 'needs_attention';
    }
  }

  return {
    score: normalizedScore,
    maxScore: 100,
    passed,
    gatePassed,
    skills,
    reasons,
  };
}