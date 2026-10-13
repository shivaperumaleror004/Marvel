import React, { useState } from 'react';
import { Compass, ChevronRight, Play, Film, Tv } from 'lucide-react';
import { createTimelineNodes } from '../../data/timeline';
import { Phase, TimelineNode } from '../../types';
import { PhaseBadge } from '../ui/PhaseBadge';
import { useMedia } from '../../context/MediaContext';

interface TimelinePreviewProps {
  onOpenTimelinePage: () => void;
  onSelectNode: (node: TimelineNode) => void;
}

const PHASES: Phase[] = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'];

export const TimelinePreview: React.FC<TimelinePreviewProps> = ({ onOpenTimelinePage, onSelectNode }) => {
  const { movies, series } = useMedia();
  const [selectedPhase, setSelectedPhase] = useState<Phase>('Phase 1');

  const nodes = createTimelineNodes(movies, series);
  const phaseNodes = nodes.filter(n => n.phase === selectedPhase);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-950/80 to-transparent">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>THE CHRONICLES OF MARVEL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
              MCU Phase Navigator
            </h2>
          </div>

          <button
            onClick={onOpenTimelinePage}
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/80 border border-red-600/50 text-xs font-mono font-bold text-red-400 hover:bg-red-900 hover:text-white transition-all shadow-md active:scale-95"
          >
            <span>EXPLORE FULL INTERACTIVE TIMELINE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Phase Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PHASES.map(phase => {
            const isActive = selectedPhase === phase;
            return (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                    : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {phase}
              </button>
            );
          })}
        </div>

        {/* Phase Cards Grid Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {phaseNodes.map((node, index) => (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:shadow-[0_10px_25px_rgba(230,36,41,0.25)]"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={node.poster || 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop'}
                  alt={node.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop'; }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-2 left-2 z-10 flex items-center justify-center h-6 w-6 rounded-full bg-red-600/90 font-mono text-[10px] font-bold text-white shadow-md">
                  #{index + 1}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                  <span className="text-[10px] font-mono text-red-400 uppercase">
                    {node.type}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {node.title}
                  </h4>
                  <span className="text-[10px] font-mono text-gray-400">{node.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
