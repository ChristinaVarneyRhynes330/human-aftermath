// Structural checks for lab scenarios. Run: npm run validate:lab
import { readFileSync } from 'node:fs'
import { scoreScenario } from '../src/lib/lab/scoring'
import type { ScenarioDef } from '../src/lib/lab/types'

const files = ['scenarios', 'sim_scenarios']
let bad = 0
const fail = (m: string) => { console.error('FAIL', m); bad++ }

for (const f of files) {
  const list = JSON.parse(readFileSync(new URL(`../content/lab/${f}.json`, import.meta.url), 'utf8'))
  for (const a of list.filter((x: any) => x.type === 'scenario')) {
    const d: ScenarioDef = a.definition, dimIds = new Set(d.dimensions.map(x => x.id))
    const paths: string[][] = []
    const walk = (node: string, path: string[]) => {
      const n = d.nodes[node]; if (!n) return fail(`${a.slug}: missing node ${node}`)
      for (const c of n.choices) {
        for (const k of Object.keys(c.effects)) if (!dimIds.has(k)) fail(`${a.slug}/${c.id}: unknown dimension ${k}`)
        if (!c.end && (!c.next || !d.nodes[c.next])) fail(`${a.slug}/${c.id}: bad next`)
        c.end ? paths.push([...path, c.id]) : c.next && walk(c.next, [...path, c.id])
      }
    }
    walk(d.start, [])
    const pass = paths.filter(p => scoreScenario(d, p).passed).length
    const rate = Math.round((pass / paths.length) * 100)
    const bestOk = paths.some(p => scoreScenario(d, p).passed)
    console.log(`${a.slug}: ${paths.length} paths, ${pass} pass (${rate}%)`)
    if (!bestOk) fail(`${a.slug}: no passing path`)
    if (rate > 25) fail(`${a.slug}: too easy to pass by guessing (${rate}%)`)
    for (const n of Object.values(d.nodes)) if (n.choices.length < 3) fail(`${a.slug}: node with <3 choices`)
  }
}
process.exit(bad ? 1 : 0)
