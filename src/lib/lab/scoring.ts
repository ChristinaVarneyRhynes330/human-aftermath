import type { Choice, ScenarioDef } from './types'

export type DimensionResult = { id: string; label: string; total: number; level: 'strong' | 'developing' | 'needs_attention' }
export type ScenarioResult = { dimensions: DimensionResult[]; criticalChoices: string[]; passed: boolean; valid: boolean }

/** Walks the learner's recorded path through the scenario graph and recomputes everything from the definition.
 *  Never trusts client-supplied scores: the client only sends choice IDs. */
export function scoreScenario(def: ScenarioDef, path: string[]): ScenarioResult {
  const totals: Record<string, number> = Object.fromEntries(def.dimensions.map(d => [d.id, 0]))
  const critical: string[] = []
  let node: string | undefined = def.start, valid = true
  for (const choiceId of path) {
    const n: ScenarioDef['nodes'][string] | undefined = node ? def.nodes[node] : undefined
    const c: Choice | undefined = n?.choices.find((x: Choice) => x.id === choiceId)
    if (!c) { valid = false; break }
    for (const [dim, v] of Object.entries(c.effects) as [string, number][]) if (dim in totals) totals[dim] += v
    if (c.critical) critical.push(c.id)
    node = c.end ? undefined : c.next
  }
  if (node) valid = false   // path stopped before the scenario ended

  const dimensions: DimensionResult[] = def.dimensions.map(d => {
    const total = totals[d.id]
    const level = total >= d.threshold + 2 ? 'strong' : total >= d.threshold ? 'developing' : 'needs_attention'
    return { id: d.id, label: d.label, total, level }
  })
  const meets = def.dimensions.every(d => totals[d.id] >= d.threshold)
  return { dimensions, criticalChoices: critical, valid, passed: valid && meets && critical.length === 0 }
}

export const LEVEL_LABEL = { strong: 'Strong', developing: 'Developing', needs_attention: 'Needs attention' } as const
