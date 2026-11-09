export type SkillLevel = 'strong' | 'developing' | 'needs_attention';

export interface Base {
  purpose: string;
  instruction: string;
  accessibility_alternative: string;
}

export interface ChoiceEffect {
  dimensionId: string;
  delta: number;
}

export interface Choice {
  id: string;
  label: string;
  text?: string;
  next: string;
  isFatal?: boolean;
  fatalReason?: string;
  effects?: ChoiceEffect[] | Record<string, number>;
}

export interface ScenarioNode {
  id: string;
  prompt: string;
  text?: string;
  choices: Choice[];
}

export interface DimensionDef {
  id: string;
  name: string;
  weight?: number;
}

export interface RubricLevelRule {
  minScore: number;
}

export interface RubricDimensionRule {
  dimensionId: string;
  levels: {
    strong: RubricLevelRule;
    developing: RubricLevelRule;
    needs_attention: RubricLevelRule;
  };
}

export interface RubricDef {
  passingScore: number;
  dimensions?: RubricDimensionRule[];
}

export interface ScenarioStep {
  id: string;
  prompt: string;
  options: ChoiceOption[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  feedback?: string;
  impacts?: OptionSkillImpact[];
  isFatalGate?: boolean;
}

export interface OptionSkillImpact {
  skill: string;
  level: SkillLevel;
}

export interface ScenarioDef extends Base {
  title?: string;
  startNode?: string;
  start?: string;
  nodes?: Record<string, ScenarioNode>;
  dimensions?: DimensionDef[];
  rubric?: RubricDef;
  steps?: ScenarioStep[];
}

export interface ScenarioResult {
  score: number;
  maxScore: number;
  passed: boolean;
  gatePassed: boolean;
  skills: Record<string, SkillLevel>;
  reasons: string[];
}

export interface ClaimChoice {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface ClaimLabDef extends Base {
  claim: string;
  evidence_status: string;
  choices: ClaimChoice[];
  responsible_version: string;
}

export interface ClassifyCategory {
  id: string;
  label: string;
  hint: string;
}

export interface ClassifyDef extends Base {
  categories: ClassifyCategory[];
  items: Array<{ id: string; text: string; answer: string; why: string }>;
  debrief?: string;
}

export interface ExplainOption {
  id: string;
  text: string;
  plausible: boolean;
  why: string;
}

export interface ExplainDef extends Base {
  prompt: string;
  options: ExplainOption[];
  debrief?: string;
}

interface LabActivityBase {
  slug: string;
  title: string;
}

export type LabActivity =
  | (LabActivityBase & { type: 'scenario'; definition: ScenarioDef })
  | (LabActivityBase & { type: 'claim_lab'; definition: ClaimLabDef })
  | (LabActivityBase & { type: 'classify'; definition: ClassifyDef })
  | (LabActivityBase & { type: 'explain_options'; definition: ExplainDef });

export type Activity = LabActivity;