import type { ScenarioDef, ScenarioResult, SkillKey, SkillLevel } from './types';

export const LEVEL_LABEL: Record<SkillLevel, string> = {
  strong: 'Strong',
  developing: 'Developing',
  needs_attention: 'Needs attention'
} as const;

export function scoreScenario(def: ScenarioDef, path: string[]): ScenarioResult {
  const selectedOptions: Array<{ id: string; text: string; feedback?: string; impacts?: Array<{ skill: SkillKey; level: SkillLevel }>; isFatalGate?: boolean }> = [];
  const fatalGates = new Set<string>(def.fatalGateOptions || []);
  const reasons: string[] = [];
  let gatePassed = true;

  // 1. Gather all selected choices across the path (ensuring def.steps is defined)
  const steps = def.steps || [];
  path.forEach((choiceId, stepIndex) => {
    const step = steps[stepIndex];
    if (!step) return;
    const option = step.options.find(opt => opt.id === choiceId);
    if (!option) return;

    selectedOptions.push(option);

    if (option.isFatalGate || fatalGates.has(option.id)) {
      gatePassed = false;
      if (option.feedback) {
        reasons.push(option.feedback);
      }
    }
  });

  // 2. Tally skill levels across options
  const skillPoints: Record<SkillKey, { strong: number; developing: number; needs_attention: number }> = {
    respect: { strong: 0, developing: 0, needs_attention: 0 },
    agency: { strong: 0, developing: 0, needs_attention: 0 },
    boundaries: { strong: 0, developing: 0, needs_attention: 0 },
    expectations: { strong: 0, developing: 0, needs_attention: 0 }
  };

  for (const opt of selectedOptions) {
    if (opt.impacts) {
      for (const impact of opt.impacts) {
        if (skillPoints[impact.skill]) {
          skillPoints[impact.skill][impact.level]++;
        }
      }
    }
    if (opt.feedback && !reasons.includes(opt.feedback)) {
      reasons.push(opt.feedback);
    }
  }

  // 3. Resolve aggregate level for each skill
  const skills: Record<SkillKey, SkillLevel> = {
    respect: 'developing',
    agency: 'developing',
    boundaries: 'developing',
    expectations: 'developing'
  };

  const skillKeys: SkillKey[] = ['respect', 'agency', 'boundaries', 'expectations'];

  for (const key of skillKeys) {
    const counts = skillPoints[key];
    if (counts.needs_attention > 0 && counts.strong === 0) {
      skills[key] = 'needs_attention';
    } else if (counts.strong >= counts.developing && counts.strong > 0) {
      skills[key] = 'strong';
    } else {
      skills[key] = 'developing';
    }
  }

  // 4. Overall pass determination: gates intact and no 'needs_attention' on critical boundaries
  const hasCriticalDeficit = skills.boundaries === 'needs_attention' || !gatePassed;
  const strongCount = Object.values(skills).filter(lvl => lvl === 'strong').length;
  const passed = gatePassed && !hasCriticalDeficit && strongCount >= 2;

  return {
    passed,
    gatePassed,
    skills,
    reasons
  };
}