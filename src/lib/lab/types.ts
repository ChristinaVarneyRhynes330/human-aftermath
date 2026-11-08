export type SkillKey = 'respect' | 'agency' | 'boundaries' | 'expectations';
export type SkillLevel = 'strong' | 'developing' | 'needs_attention';

export interface OptionSkillImpact {
  skill: SkillKey;
  level: SkillLevel;
}

export interface ChoiceOption {
  id: string;
  text: string;
  feedback?: string;
  impacts?: OptionSkillImpact[];
  isFatalGate?: boolean;
}

export interface ScenarioStep {
  id: string;
  prompt: string;
  options: ChoiceOption[];
}

export interface ScenarioDimension {
  id: string;
  label?: string;
  [key: string]: any;
}

export interface ScenarioNodeOption {
  id: string;
  text: string;
  next?: string;
  feedback?: string;
  scores?: Record<string, number>;
  [key: string]: any;
}

export interface ScenarioNode {
  prompt: string;
  options: ScenarioNodeOption[];
  isTerminal?: boolean;
  [key: string]: any;
}

export interface ScenarioDef {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  persona?: string;
  steps?: ScenarioStep[];
  fatalGateOptions?: string[];

  // Graph / node-based structure used by lab scripts and validation
  dimensions?: ScenarioDimension[];
  nodes?: Record<string, ScenarioNode>;
  startNode?: string;
  rubric?: Record<string, any>;
  [key: string]: any;
}

export interface ScenarioResult {
  passed: boolean;
  gatePassed: boolean;
  skills: Record<SkillKey, SkillLevel>;
  reasons: string[];
}