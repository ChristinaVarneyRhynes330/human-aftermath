'use client';

import { useState } from 'react';
import type { ScenarioDef } from '@/lib/lab/types';
import { scoreScenario } from '@/lib/lab/scoring';

export default function ScenarioPlayer({ def }: { slug: string; def: ScenarioDef }) {
  const [path, setPath] = useState<string[]>([]);
  const currentId = path.reduce((nodeId, choiceId) => {
    const choice = def.nodes?.[nodeId]?.choices.find(item => item.id === choiceId);
    return choice?.next ?? '';
  }, def.startNode ?? def.start ?? '');
  const current = currentId ? def.nodes?.[currentId] : undefined;
  const result = !current && path.length > 0 ? scoreScenario(def, path) : null;

  if (result) {
    return <div className="rounded-xl border border-slate/40 bg-white p-5" role="status">
      <h2 className="font-serif text-xl">{result.passed ? 'Standard met' : 'Review and practice needed'}</h2>
      <p className="mt-2">{result.score}% complete.</p>
      {result.reasons.map(reason => <p key={reason} className="mt-2 text-sm">{reason}</p>)}
      <button type="button" onClick={() => setPath([])} className="mt-4 underline">Try again</button>
    </div>;
  }

  if (!current) return <p>No scenario steps are available.</p>;
  return <div className="space-y-4">
    <p className="rounded-lg bg-white p-4">{current.prompt}</p>
    <div className="space-y-2">
      {current.choices.map(choice => <button key={choice.id} type="button" onClick={() => setPath([...path, choice.id])}
        className="block w-full rounded-lg border border-slate/40 bg-white p-3 text-left">{choice.text ?? choice.label}</button>)}
    </div>
  </div>;
}