import React from 'react';
import { Phase } from '../../types';

interface PhaseBadgeProps {
  phase?: Phase;
  className?: string;
}

const PHASE_COLORS: Partial<Record<Phase, string>> = {
  'Phase 1': 'bg-red-950/80 text-red-400 border-red-800/60 shadow-[0_0_10px_rgba(230,36,41,0.2)]',
  'Phase 2': 'bg-amber-950/80 text-amber-400 border-amber-800/60 shadow-[0_0_10px_rgba(245,184,0,0.2)]',
  'Phase 3': 'bg-blue-950/80 text-blue-400 border-blue-800/60 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  'Phase 4': 'bg-purple-950/80 text-purple-400 border-purple-800/60 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
  'Phase 5': 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
  'Phase 6': 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60 shadow-[0_0_10px_rgba(6,182,212,0.25)]',
  'Defenders': 'bg-rose-950/80 text-rose-400 border-rose-800/60 shadow-[0_0_10px_rgba(244,63,94,0.2)]',
  'Marvel Television': 'bg-indigo-950/80 text-indigo-400 border-indigo-800/60 shadow-[0_0_10px_rgba(99,102,241,0.2)]',
  'Legacy': 'bg-stone-900 text-stone-300 border-stone-700',
  'Upcoming': 'bg-orange-950/80 text-orange-400 border-orange-800/60 shadow-[0_0_10px_rgba(249,115,22,0.2)]',
};

export const PhaseBadge: React.FC<PhaseBadgeProps> = ({ phase, className = '' }) => {
  if (!phase) return null;
  const colorClass = PHASE_COLORS[phase] || 'bg-gray-800 text-gray-300 border-gray-700';
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase font-semibold border backdrop-blur-md ${colorClass} ${className}`}
    >
      {phase}
    </span>
  );
};
