// ... existing code ...
'use client';

import React, { useState } from 'react';
import { submitScenarioAttempt, type ScenarioResult, type SkillLevel } from '@/app/lab/actions';
import { Award, AlertOctagon, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface StepOption {
  id: string;
  text: string;
  feedback?: string;
}

interface ScenarioStep {
  stepIndex: number;
  prompt: string;
  context?: string;
  options: StepOption[];
}

interface ScenarioPlayerProps {
  scenarioSlug: string;
  title: string;
  description: string;
  steps: ScenarioStep[];
}

export function ScenarioPlayer({ scenarioSlug, title, description, steps }: ScenarioPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<{ stepIndex: number; selectedOptionId: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex];
  const isFinalStep = currentStepIndex === steps.length - 1;

  const handleSelectOption = (optionId: string) => {
    const updated = selectedChoices.filter(c => c.stepIndex !== currentStepIndex);
    updated.push({ stepIndex: currentStepIndex, selectedOptionId: optionId });
    setSelectedChoices(updated);
  };

  const handleNext = async () => {
    if (!isFinalStep) {
      setCurrentStepIndex(prev => prev + 1);
      return;
    }

    // Submit complete path to server-side action
    try {
      setIsSubmitting(true);
      setError(null);
      const outcome = await submitScenarioAttempt(scenarioSlug, selectedChoices);
      setResult(outcome);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit attempt. Please verify session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedChoices([]);
    setCurrentStepIndex(0);
    setResult(null);
    setError(null);
  };

  const currentSelection = selectedChoices.find(c => c.stepIndex === currentStepIndex)?.selectedOptionId;

  const badgeColor = (level: SkillLevel) => {
    switch (level) {
      case 'advanced': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'proficient': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'developing': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'novice': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  if (result) {
    return (
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 max-w-3xl mx-auto border border-white/10">
        <div className="flex items-center gap-3">
          {result.passed ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
          ) : (
            <AlertOctagon className="w-8 h-8 text-rose-400 shrink-0" />
          )}
          <div>
            <h2 className="text-xl font-bold font-serif text-white">
              {result.passed ? 'Scenario Completed: Competency Standard Met' : 'Scenario Review: Boundaries or Skills Unmet'}
            </h2>
            <p className="text-xs text-gray-400">
              {result.gatePassed
                ? 'All mandatory ethical, legal, and team-care safety gates preserved.'
                : 'Safety or confidentiality boundaries were breached during traversal.'}
            </p>
          </div>
        </div>

        {/* Feedback List */}
        {result.feedback.length > 0 && (
          <div className="bg-rose-950/30 border border-rose-500/40 p-4 rounded-xl space-y-2">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">Boundary Alerts</span>
            {result.feedback.map((msg, i) => (
              <p key={i} className="text-xs text-rose-200">{msg}</p>
            ))}
          </div>
        )}

        {/* Multi-Skill Rubric Levels */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-200">Rubric Competency Evaluation</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(result.skills).map(([skill, level]) => (
              <div key={skill} className="bg-brand-surface/60 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[11px] text-gray-400 capitalize block mb-1">{skill}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-mono font-semibold ${badgeColor(level)}`}>
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Credential Issuance Status */}
        {result.credentialId ? (
          <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-brand-gold shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Credential Issued: {result.credentialId}</span>
                <span className="text-[11px] text-gray-400">Curriculum prerequisites & capstone evaluation satisfied.</span>
              </div>
            </div>
            <Link
              href="/certificate"
              className="px-3.5 py-1.5 rounded-lg bg-brand-gold text-brand-ink font-bold text-xs hover:brightness-110 transition"
            >
              View Certificate
            </Link>
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">
            Certificate issuance requires passing all capstone scenarios and completing all 61 curriculum lessons.
          </p>
        )}

        <div className="pt-2 flex justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-gray-300 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retry Scenario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 max-w-3xl mx-auto border border-white/10">
      {/* Scenario Progress Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-brand-peach font-bold">Interactive Scenario Lab</span>
          <h2 className="text-lg font-bold font-serif text-white">{title}</h2>
        </div>
        <span className="text-xs font-mono text-gray-400">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      {description && <p className="text-xs text-gray-400 leading-relaxed">{description}</p>}

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200">
          {error}
        </div>
      )}

      {/* Step Prompt */}
      {currentStep && (
        <div className="space-y-4">
          <div className="bg-brand-surface/70 border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-200 font-medium">{currentStep.prompt}</p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentStep.options.map(opt => {
              const isSelected = currentSelection === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 ${
                    isSelected
                      ? 'border-brand-peach bg-brand-peach/15 text-white font-medium shadow-md'
                      : 'border-white/10 hover:border-white/20 bg-brand-surface/40 text-gray-300'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                      isSelected ? 'border-brand-peach' : 'border-gray-500'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-brand-peach" />}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentStepIndex(p => Math.max(0, p - 1))}
          disabled={currentStepIndex === 0}
          className="px-3.5 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!currentSelection || isSubmitting}
          className="px-5 py-2 rounded-xl bg-brand-peach hover:bg-orange-300 text-brand-ink font-bold text-xs disabled:opacity-40 disabled:hover:bg-brand-peach transition flex items-center gap-1.5"
        >
          {isSubmitting ? 'Evaluating Path...' : isFinalStep ? 'Submit Decision Path' : 'Next Step'}
          {!isSubmitting && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
// ... existing code ...