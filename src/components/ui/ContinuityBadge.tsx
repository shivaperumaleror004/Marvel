import React from 'react';
import { Continuity } from '../../types';

interface ContinuityBadgeProps {
  continuity: Continuity;
  className?: string;
}

const CONTINUITY_STYLES: Record<Continuity, { label: string; style: string }> = {
  'Sacred Timeline': {
    label: 'Sacred Timeline',
    style: 'bg-amber-950/80 text-amber-300 border-amber-600/50 shadow-[0_0_8px_rgba(245,184,0,0.25)]'
  },
  'Multiverse': {
    label: 'Multiverse Branch',
    style: 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-600/50 shadow-[0_0_8px_rgba(217,70,239,0.25)]'
  },
  'Alternate Timeline': {
    label: 'Alternate Reality',
    style: 'bg-cyan-950/80 text-cyan-300 border-cyan-600/50 shadow-[0_0_8px_rgba(6,182,212,0.25)]'
  },
  'Adjacent Canon': {
    label: 'Adjacent Canon',
    style: 'bg-blue-950/80 text-blue-300 border-blue-600/50 shadow-[0_0_8px_rgba(59,130,246,0.25)]'
  }
};

export const ContinuityBadge: React.FC<ContinuityBadgeProps> = ({ continuity, className = '' }) => {
  const meta = CONTINUITY_STYLES[continuity] || {
    label: continuity,
    style: 'bg-gray-800 text-gray-300 border-gray-700'
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold border backdrop-blur-md ${meta.style} ${className}`}
    >
      {meta.label}
    </span>
  );
};
