'use client';

import React, { useState } from 'react';

export type ModuleMedia = {
  title: string;
  master_vimeo_id: string;
  master_duration: string;
  recap_vimeo_id?: string;
  recap_duration?: string;
  alt_recap_vimeo_id?: string;
  alt_recap_duration?: string;
  alt_vimeo_id?: string;
  alt_duration?: string;
  chapters?: Array<[string, number, string]>;
  summary?: string;
};

export default function ModuleMediaCenter({
  moduleNum,
  media,
  defaultMode = 'master',
}: {
  moduleNum: number;
  media: ModuleMedia;
  defaultMode?: 'master' | 'recap';
}) {
  const [activeVimeoId, setActiveVimeoId] = useState(
    defaultMode === 'recap' && media.recap_vimeo_id ? media.recap_vimeo_id : media.master_vimeo_id
  );
  const [activeTab, setActiveTab] = useState<string>(defaultMode);
  const [showTranscript, setShowTranscript] = useState(false);

  const switchVideo = (tab: string, vimeoId?: string) => {
    if (!vimeoId) return;
    setActiveTab(tab);
    setActiveVimeoId(vimeoId);
  };

  return (
    <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[#10161E] text-white shadow-2xl border border-white/10 space-y-4">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EDAE9D] animate-pulse" />
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#BBD4C5] font-mono">
            Module {moduleNum} Media Center
          </span>
          <span className="text-xs text-stone-300 font-medium">• {media.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex flex-wrap items-center bg-[#080C10] rounded-xl p-1 border border-white/10 gap-1">
            <button
              type="button"
              onClick={() => switchVideo('master', media.master_vimeo_id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                activeTab === 'master'
                  ? 'bg-[#3E6892] text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Masterclass ({media.master_duration})
            </button>

            {media.recap_vimeo_id && (
              <button
                type="button"
                onClick={() => switchVideo('recap', media.recap_vimeo_id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                  activeTab === 'recap'
                    ? 'bg-[#EDAE9D] text-[#080C10] shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {media.alt_recap_vimeo_id ? `Recap 6A (${media.recap_duration})` : `Module Recap (${media.recap_duration})`}
              </button>
            )}

            {media.alt_recap_vimeo_id && (
              <button
                type="button"
                onClick={() => switchVideo('recap_b', media.alt_recap_vimeo_id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                  activeTab === 'recap_b'
                    ? 'bg-[#EDAE9D] text-[#080C10] shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Recap 6B ({media.alt_recap_duration || '1:23'})
              </button>
            )}

            {media.alt_vimeo_id && (
              <button
                type="button"
                onClick={() => switchVideo('bonus', media.alt_vimeo_id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                  activeTab === 'bonus'
                    ? 'bg-[#3E6892] text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Bonus Cut ({media.alt_duration || '7:30'})
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="px-3 py-1.5 bg-[#16202A] hover:bg-[#1E2B38] border border-white/10 rounded-xl text-[#EDAE9D] font-semibold transition text-[11px]"
          >
            {showTranscript ? 'Hide Summary' : 'Summary & Chapters'}
          </button>
        </div>
      </div>

      {/* 16:9 Vimeo Cinema Player */}
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center shadow-2xl border border-white/10">
        <iframe
          key={activeVimeoId}
          src={`https://player.vimeo.com/video/${activeVimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`Module ${moduleNum} Video`}
        />
      </div>

      {/* Chapter Index Pills */}
      {media.chapters && media.chapters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
          <span className="text-stone-400 font-semibold mr-1 font-mono uppercase text-[10px]">Chapters:</span>
          {media.chapters.map((ch, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-[#16202A] border border-white/5 text-stone-300 flex items-center gap-1.5"
            >
              <span className="text-[#EDAE9D] font-mono font-bold">{ch[0]}</span>
              <span>{ch[2]}</span>
            </span>
          ))}
        </div>
      )}

      {/* Collapsible Transcript & Summary */}
      {showTranscript && (
        <div className="p-4 rounded-xl bg-[#080C10]/90 border border-white/10 text-xs space-y-3">
          <div className="flex items-center justify-between font-bold text-[#EDAE9D]">
            <span>Module Summary & Chapter Guide: {media.title}</span>
            <span className="text-[10px] text-stone-400 font-mono">
              {media.master_duration} • Multidisciplinary Overview
            </span>
          </div>
          {media.summary && <p className="text-stone-300 leading-relaxed">{media.summary}</p>}
          {media.chapters && (
            <div className="pt-2 border-t border-white/10 space-y-1.5 text-stone-300">
              {media.chapters.map((ch, idx) => (
                <p key={idx}>
                  <strong className="text-[#BBD4C5] font-mono">[{ch[0]}] {ch[2]}:</strong> Chapter topic. This is a summary, not a verbatim transcript.
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
