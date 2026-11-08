// ... existing code ...
'use client';

import React, { useState } from 'react';
import type { ScenarioDef, ScenarioResult, ChoiceOption, SkillLevel } from '@/lib/lab/types';
import { scoreScenario, LEVEL_LABEL } from '@/lib/lab/scoring';
import { recordLabAttempt } from '@/app/lab/actions';

interface ScenarioPlayerProps {
  slug: string;
  def: ScenarioDef;
}

export function ScenarioPlayer({ slug, def }: ScenarioPlayerProps) {
  const [path, setPath] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStepIndex = path.length;
  const currentStep = def?.steps ? def.steps[currentStepIndex] : undefined;
  const isFinished = def?.steps ? currentStepIndex >= def.steps.length : false;

  const result: ScenarioResult | null = isFinished && def ? scoreScenario(def, path) : null;

  const handleSelect = (optionId: string) => {
    if (isFinished) return;
    setPath(prev => [...prev, optionId]);
  };

  const handleReset = () => {
    setPath([]);
    setSubmitted(false);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!result) return;
    try {
      setIsSubmitting(true);
      setError(null);
      await recordLabAttempt({
        slug,
        kind: 'scenario',
        score: result.gatePassed && result.passed ? 100 : 50,
        maxScore: 100,
        passed: result.gatePassed && result.passed,
        meta: {
          path,
          gatePassed: result.gatePassed,
          skills: result.skills,
          reasons: result.reasons
        }
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit attempt.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!def || !def.steps) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 max-w-2xl mx-auto">
        <p className="text-sm text-slate-400">Loading scenario definitions...</p>
      </div>
    );
  }

  if (isFinished && result) {
    const passed = result.gatePassed && result.passed;
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 max-w-2xl mx-auto space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
            Scenario Evaluation Complete
          </span>
          <h2 className="text-2xl font-bold mt-1">
            {passed ? 'Standard Met' : 'Review & Practice Needed'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {result.gatePassed
              ? 'Ethical and professional safety gates maintained.'
              : 'Safety or boundary violation triggered.'}
          </p>
        </div>

        {result.reasons && result.reasons.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Skill Observations
            </span>
            {result.reasons.map((r: string, i: number) => (
              <p key={i} className="text-xs text-amber-100">{r}</p>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">Competency Rubric</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(result.skills).map(([skill, lvl]) => {
              const typedLevel = lvl as SkillLevel;
              const displayLabel = LEVEL_LABEL[typedLevel] ?? typedLevel;
              return (
                <div key={skill} className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl text-center">
                  <span className="text-[11px] text-slate-400 capitalize block mb-1">{skill}</span>
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {displayLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-xs text-rose-200">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition"
          >
            Try Again
          </button>

          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Record to Profile'}
            </button>
          ) : (
            <span className="text-xs text-emerald-400 font-medium">Recorded</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400">Simulation Lab</span>
          <h2 className="text-xl font-bold">{def.title}</h2>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Step {currentStepIndex + 1} of {def.steps.length}
        </span>
      </div>

      {currentStep && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
            <p className="text-sm font-medium leading-relaxed">{currentStep.prompt}</p>
          </div>

          <div className="space-y-2.5">
            {currentStep.options.map((opt: ChoiceOption) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700 text-xs sm:text-sm text-slate-200 transition"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScenarioPlayer;