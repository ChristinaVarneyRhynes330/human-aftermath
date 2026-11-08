export type LabType = 'scenario' | 'claim_lab' | 'classify' | 'explain_options'

// Fields the course brief requires for every interaction (purpose, instruction, accessibility alternative).
export type Base = { purpose: string; instruction: string; accessibility_alternative: string; debrief?: string }

export type Dimension = { id: string; label: string; threshold: number; gate?: boolean; description?: string }
export type Choice = {
  id: string; text: string; feedback: string
  effects: Record<string, number>; next?: string; end?: boolean; critical?: boolean
}
export type ScenarioDef = Base & {
  status?: string; setting: string; dimensions: Dimension[]; start: string
  nodes: Record<string, { narrative: string; prompt: string; choices: Choice[] }>
}
export type ClaimLabDef = Base & {
  claim: string; evidence_status: string; responsible_version: string
  choices: { id: string; text: string; correct: boolean; feedback: string }[]
}
export type ClassifyDef = Base & {
  categories: { id: string; label: string; hint: string }[]
  items: { id: string; text: string; answer: string; why: string }[]
}
export type ExplainDef = Base & {
  prompt: string; options: { id: string; text: string; plausible: boolean; why: string }[]
}

export type Activity =
  | { slug: string; type: 'scenario'; title: string; definition: ScenarioDef }
  | { slug: string; type: 'claim_lab'; title: string; definition: ClaimLabDef }
  | { slug: string; type: 'classify'; title: string; definition: ClassifyDef }
  | { slug: string; type: 'explain_options'; title: string; definition: ExplainDef }
