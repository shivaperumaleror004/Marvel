import React, { useState } from 'react';
import { Compass, Play, Film, Tv, Info, ArrowUpDown, Shield } from 'lucide-react';
import { TIMELINE_NODES, getTimelineNodesByOrder } from '../data/timeline';
import { TimelineNode, Phase, Saga } from '../types';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { RatingBadge } from '../components/ui/RatingBadge';
import { PageTransition } from '../components/ui/PageTransition';

interface TimelinePageProps {
  onSelectNode: (node: TimelineNode) => void;
  onWatchNode: (node: TimelineNode) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onSelectNode, onWatchNode }) => {
  const [orderMode, setOrderMode] = useState<'release' | 'chronological'>('release');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('All');
  const [selectedNodeModal, setSelectedNodeModal] = useState<TimelineNode | null>(null);

  const nodes = getTimelineNodesByOrder(orderMode);
  const filteredNodes = selectedPhaseFilter === 'All' 
    ? nodes 
    : nodes.filter(n => n.phase === selectedPhaseFilter);

  const infinitySagaNodes = filteredNodes.filter(n => n.saga === 'Infinity Saga');
  const multiverseSagaNodes = filteredNodes.filter(n => n.saga === 'Multiverse Saga');

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>THE CHRONICLES OF MARVEL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              MCU Interactive Timeline
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Navigate all movies and series from Phase 1 to Phase 6 across cosmic sagas.
            </p>
          </div>

          {/* Viewing Mode Toggle (Release Order vs Chronological Order) */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setOrderMode('release')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                orderMode === 'release'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Release Order
            </button>
            <button
              onClick={() => setOrderMode('chronological')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                orderMode === 'chronological'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Chronological Order
            </button>
          </div>
        </div>

        {/* Phase Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'].map(phase => {
            const isActive = selectedPhaseFilter === phase;
            return (
              <button
                key={phase}
                onClick={() => setSelectedPhaseFilter(phase)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
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

        {/* Section 1: Infinity Saga */}
        {infinitySagaNodes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-amber-500 rounded-full shadow-[0_0_10px_#F5B800]" />
              <h2 className="text-2xl font-black text-amber-400 uppercase tracking-wider">
                The Infinity Saga (Phases 1 - 3)
              </h2>
            </div>

            <div className="relative pl-6 border-l-2 border-amber-500/30 space-y-6">
              {infinitySagaNodes.map((node, index) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeModal(node)}
                  className="group relative cursor-pointer p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/80 hover:border-amber-500/60 hover:bg-slate-900 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  {/* Glowing Node Marker */}
                  <div className="absolute -left-[31px] top-6 h-4 w-4 rounded-full border-2 border-amber-500 bg-slate-950 group-hover:bg-amber-500 transition-colors shadow-[0_0_10px_#F5B800]" />

                  {/* Poster Thumbnail */}
                  <img
                    src={node.poster}
                    alt={node.title}
                    className="h-24 w-16 rounded object-cover flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                  />

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <PhaseBadge phase={node.phase} />
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        #{orderMode === 'release' ? node.releaseOrder : node.chronologicalOrder}
                      </span>
                      <span className="text-xs font-mono text-gray-400">{node.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {node.title}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {node.overview}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWatchNode(node);
                    }}
                    className="self-stretch sm:self-center flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-slate-950 uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>WATCH</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Multiverse Saga */}
        {multiverseSagaNodes.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-red-600 rounded-full shadow-[0_0_10px_#E62429]" />
              <h2 className="text-2xl font-black text-red-500 uppercase tracking-wider">
                The Multiverse Saga (Phases 4 - 6)
              </h2>
            </div>

            <div className="relative pl-6 border-l-2 border-red-600/30 space-y-6">
              {multiverseSagaNodes.map((node, index) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeModal(node)}
                  className="group relative cursor-pointer p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/80 hover:border-red-600/60 hover:bg-slate-900 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  {/* Glowing Node Marker */}
                  <div className="absolute -left-[31px] top-6 h-4 w-4 rounded-full border-2 border-red-600 bg-slate-950 group-hover:bg-red-600 transition-colors shadow-[0_0_10px_#E62429]" />

                  {/* Poster Thumbnail */}
                  <img
                    src={node.poster}
                    alt={node.title}
                    className="h-24 w-16 rounded object-cover flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                  />

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <PhaseBadge phase={node.phase} />
                      <span className="text-[10px] font-mono text-red-400 font-bold">
                        #{orderMode === 'release' ? node.releaseOrder : node.chronologicalOrder}
                      </span>
                      <span className="text-xs font-mono text-gray-400">{node.year}</span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">({node.type})</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {node.title}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {node.overview}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWatchNode(node);
                    }}
                    className="self-stretch sm:self-center flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider hover:bg-red-500 transition-colors shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>WATCH</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Node Modal */}
        {selectedNodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-slate-900 p-6 space-y-4 shadow-2xl">
              <div className="flex items-start gap-4">
                <img src={selectedNodeModal.poster} alt={selectedNodeModal.title} className="h-32 w-24 rounded object-cover border border-white/10" />
                <div className="space-y-1 flex-1">
                  <PhaseBadge phase={selectedNodeModal.phase} />
                  <h3 className="text-xl font-bold text-white mt-1">{selectedNodeModal.title}</h3>
                  <p className="text-xs font-mono text-gray-400">Released: {selectedNodeModal.releaseDate}</p>
                  {selectedNodeModal.rating && <RatingBadge rating={selectedNodeModal.rating} />}
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">{selectedNodeModal.overview}</p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedNodeModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-gray-300 hover:text-white"
                >
                  CLOSE
                </button>
                <button
                  onClick={() => {
                    const target = selectedNodeModal;
                    setSelectedNodeModal(null);
                    onWatchNode(target);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-500 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>WATCH TITLE</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
