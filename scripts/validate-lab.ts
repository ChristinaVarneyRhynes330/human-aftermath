import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { ScenarioDef } from '../src/lib/lab/types';
import { scoreScenario } from '../src/lib/lab/scoring';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.resolve(__dirname, '../content/lab');

function run() {
  const files = readdirSync(contentDir).filter((f) => f.endsWith('.json'));
  let totalScenarios = 0;
  let errors = 0;

  for (const f of files) {
    const filePath = path.join(contentDir, f);
    const content = JSON.parse(readFileSync(filePath, 'utf8'));
    const list = Array.isArray(content) ? content : [content];

    for (const a of list.filter((x: any) => x.type === 'scenario')) {
      totalScenarios++;
      const rawDef = a.definition || {};

      // 1. Resolve start node identifier across schema variants
      const startNodeId = rawDef.startNode || rawDef.start || rawDef.initialNode;

      // 2. Normalize nodes into a dictionary Record<string, any>
      let nodeMap: Record<string, any> = {};
      if (Array.isArray(rawDef.nodes)) {
        for (const n of rawDef.nodes) {
          if (n && n.id) {
            nodeMap[n.id] = n;
          }
        }
      } else if (rawDef.nodes && typeof rawDef.nodes === 'object') {
        nodeMap = rawDef.nodes;
      }

      if (!startNodeId || !nodeMap[startNodeId]) {
        console.error(`FAIL ${a.slug || f}: invalid start node "${startNodeId}"`);
        errors++;
        continue;
      }

      // Reconstructed canonical definition
      const d: ScenarioDef = {
        ...rawDef,
        startNode: startNodeId,
        nodes: nodeMap,
        dimensions: rawDef.dimensions || [],
        rubric: rawDef.rubric || { passingScore: 70 },
      };

      const paths: string[][] = [];

      const walk = (nodeId: string, currentPath: string[]) => {
        const n = nodeMap[nodeId];
        if (!n) {
          // If the node points to an end state or is missing
          paths.push(currentPath);
          return;
        }

        const choices = n.choices || n.options || [];
        if (!choices || choices.length === 0) {
          paths.push(currentPath);
          return;
        }

        for (const choice of choices) {
          const choiceId = choice.id;
          const nextId = choice.next || choice.nextNodeId;
          if (nextId) {
            walk(nextId, [...currentPath, choiceId]);
          } else {
            paths.push([...currentPath, choiceId]);
          }
        }
      };

      walk(startNodeId, []);

      let passCount = 0;
      for (const p of paths) {
        const result = scoreScenario(d, p);
        if (result.passed) {
          passCount++;
        }
      }

      const passRate = paths.length > 0 ? Math.round((passCount / paths.length) * 100) : 0;
      console.log(`${a.slug || f}: ${paths.length} paths, ${passCount} pass (${passRate}%)`);

      // Alert if pass rate allows mindless guessing (target: challenging threshold)
      if (paths.length > 0 && passRate === 100) {
        console.warn(`WARN ${a.slug || f}: scenario calibration allows 100% pass rate`);
      }
    }
  }

  if (errors > 0) {
    console.error(`\nValidation failed with ${errors} error(s).`);
    process.exit(1);
  } else {
    console.log(`\n✓ Lab scenarios verified successfully (${totalScenarios} scenario(s) tested).`);
  }
}

run();