import React, { useState, useMemo } from 'react';
import { Compass, ChevronRight, Clock, Calendar, Film } from 'lucide-react';
import { createTimelineNodes, getTimelineNodesByOrder } from '../../data/timeline';
import { Phase, TimelineNode } from '../../types';
import { PhaseBadge } from '../ui/PhaseBadge';
import { useMedia } from '../../context/MediaContext';
import { FALLBACK_POSTER } from '../../services/tmdb';

interface TimelinePreviewProps {
  onOpenTimelinePage: () => void;
  onSelectNode: (node: TimelineNode) => void;
}

const PHASES: Phase[] = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'];

export const TimelinePreview: React.FC<TimelinePreviewProps> = ({ onOpenTimelinePage, onSelectNode }) => {
  const { movies, series } = useMedia();
  const [selectedPhase, setSelectedPhase] = useState<Phase>('Phase 1');
  const [orderMode, setOrderMode] = useState<'release' | 'chronological'>('release');
  const [includeOneShots, setIncludeOneShots] = useState<boolean>(false);

  const dynamicNodes = useMemo(() => createTimelineNodes(movies, series), [movies, series]);
  const orderedNodes = useMemo(() => getTimelineNodesByOrder(orderMode, dynamicNodes), [orderMode, dynamicNodes]);

  const phaseNodes = useMemo(() => {
    return orderedNodes.filter(n => {
      if (n.phase !== selectedPhase) return false;
      if (!includeOneShots && (n.type === 'one-shot' || n.type === 'special')) {
        return false;
      }
      return true;
    });
  }, [orderedNodes, selectedPhase, includeOneShots]);

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
            <p className="text-xs text-gray-400 mt-1">
              Browse Marvel Studios releases grouped by their official theatrical and streaming Phase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Order Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/10 text-[11px] font-mono font-bold">
              <button
                onClick={() => setOrderMode('release')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  orderMode === 'release'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Release
              </button>
              <button
                onClick={() => setOrderMode('chronological')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  orderMode === 'chronological'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Chronological
              </button>
            </div>

            {/* Expand Full Timeline Button */}
            <button
              onClick={onOpenTimelinePage}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/80 border border-red-600/50 text-xs font-mono font-bold text-red-400 hover:bg-red-900 hover:text-white transition-all shadow-md active:scale-95"
            >
              <span>EXPLORE FULL TIMELINE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phase Selector Tabs & Filter Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PHASES.map(phase => {
              const isActive = selectedPhase === phase;
              return (
                <button
                  key={phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
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

          {/* Toggle One-Shots checkbox button */}
          <button
            onClick={() => setIncludeOneShots(!includeOneShots)}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono transition-all self-start sm:self-auto ${
              includeOneShots
                ? 'bg-red-950/60 border-red-600/60 text-red-300'
                : 'bg-slate-900/60 border-white/10 text-gray-400 hover:text-gray-200'
            }`}
          >
            {includeOneShots ? '✓ Including One-Shots & Specials' : '+ Include One-Shots & Specials'}
          </button>
        </div>

        {/* Phase Cards Grid Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {phaseNodes.map((node) => {
            const orderNumber = orderMode === 'release' ? node.releaseOrder : node.chronologicalOrder;

            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:shadow-[0_10px_25px_rgba(230,36,41,0.25)]"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={node.poster || FALLBACK_POSTER}
                    alt={node.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_POSTER;
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Order Badge */}
                  <div className="absolute top-2 left-2 z-10 flex items-center justify-center px-2 py-0.5 rounded-full bg-red-600/90 font-mono text-[10px] font-bold text-white shadow-md">
                    #{orderNumber}
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
