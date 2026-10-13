import React, { useState, useMemo } from 'react';
import {
  Compass,
  Play,
  Film,
  Tv,
  Info,
  Calendar,
  Sparkles,
  Search,
  CheckCircle,
  Clock,
  Layers,
  ChevronRight,
  Shield,
  Star,
  ExternalLink,
  Users
} from 'lucide-react';
import { createTimelineNodes, getTimelineNodesByOrder } from '../data/timeline';
import { TimelineNode, Phase, Saga, Continuity, TimelineMediaType } from '../types';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { ContinuityBadge } from '../components/ui/ContinuityBadge';
import { RatingBadge } from '../components/ui/RatingBadge';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import { FALLBACK_POSTER, FALLBACK_BACKDROP } from '../services/tmdb';

interface TimelinePageProps {
  onSelectNode: (node: TimelineNode) => void;
  onWatchNode: (node: TimelineNode) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onSelectNode, onWatchNode }) => {
  const { movies, series } = useMedia();

  // Core interactive states
  const [orderMode, setOrderMode] = useState<'release' | 'chronological'>('chronological');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNodeModal, setSelectedNodeModal] = useState<TimelineNode | null>(null);

  // Merge live TMDB enriched data with curated timeline master records
  const dynamicNodes = useMemo(() => createTimelineNodes(movies, series), [movies, series]);
  const orderedNodes = useMemo(() => getTimelineNodesByOrder(orderMode, dynamicNodes), [orderMode, dynamicNodes]);

  // Comprehensive multi-filter and search pipeline
  const filteredNodes = useMemo(() => {
    return orderedNodes.filter(node => {
      // 1. Search Query Filter (Title, overview, characters, cast actors)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = node.title.toLowerCase().includes(q);
        const matchesOverview = node.overview.toLowerCase().includes(q);
        const matchesCharacter = node.characters?.some(c => c.toLowerCase().includes(q));
        const matchesCast = node.cast?.some(c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q));
        const matchesNotes = node.timelineNotes?.toLowerCase().includes(q);

        if (!matchesTitle && !matchesOverview && !matchesCharacter && !matchesCast && !matchesNotes) {
          return false;
        }
      }

      // 2. Phase Filter
      if (selectedPhaseFilter !== 'All') {
        if (node.phase !== selectedPhaseFilter) return false;
      }

      // 3. Category / Media Type / Continuity Filter
      if (selectedCategoryFilter === 'movies') {
        if (node.type !== 'movie') return false;
      } else if (selectedCategoryFilter === 'series') {
        if (node.type !== 'series') return false;
      } else if (selectedCategoryFilter === 'one-shots') {
        if (node.type !== 'one-shot') return false;
      } else if (selectedCategoryFilter === 'specials') {
        if (node.type !== 'special') return false;
      } else if (selectedCategoryFilter === 'sacred') {
        if (node.continuity !== 'Sacred Timeline') return false;
      } else if (selectedCategoryFilter === 'multiverse') {
        if (node.continuity === 'Sacred Timeline') return false;
      } else if (selectedCategoryFilter === 'upcoming') {
        if (!node.isUpcoming) return false;
      }

      return true;
    });
  }, [orderedNodes, searchQuery, selectedPhaseFilter, selectedCategoryFilter]);

  // Categorize for sectional grouping
  const infinitySagaNodes = useMemo(() => filteredNodes.filter(n => n.saga === 'Infinity Saga'), [filteredNodes]);
  const multiverseSagaNodes = useMemo(() => filteredNodes.filter(n => n.saga === 'Multiverse Saga'), [filteredNodes]);
  const defendersAndTvNodes = useMemo(
    () => filteredNodes.filter(n => n.saga === 'The Defenders Saga' || n.saga === 'Marvel Television'),
    [filteredNodes]
  );

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header & Mode Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>MARVEL CINEMATIC CONTINUITY ARCHIVE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              MCU Interactive Timeline
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Explore the entire verified Marvel Cinematic Universe from ancient Wakanda through the Infinity Saga,
              The Defenders, and the Multiverse Incursions. Verified across canon continuity and release history.
            </p>
          </div>

          {/* Viewing Mode Toggle (Release Order vs Chronological Order) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-white/10">
              <button
                id="timeline-mode-chronological"
                onClick={() => setOrderMode('chronological')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  orderMode === 'chronological'
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(230,36,41,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Chronological Order</span>
              </button>
              <button
                id="timeline-mode-release"
                onClick={() => setOrderMode('release')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  orderMode === 'release'
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(230,36,41,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Release Order</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search titles, actors, characters (e.g. Iron Man, Robert Downey Jr., Daredevil)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Count Badge */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono text-gray-300">
              <span className="text-red-400 font-bold">{filteredNodes.length}</span>
              <span>of</span>
              <span className="text-white font-bold">{orderedNodes.length} Titles</span>
            </div>
          </div>

          {/* Phase Filter Buttons */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
              Filter by Release Era & Phase:
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6', 'Defenders', 'Marvel Television'].map(phase => {
                const isActive = selectedPhaseFilter === phase;
                return (
                  <button
                    key={phase}
                    onClick={() => setSelectedPhaseFilter(phase)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border whitespace-nowrap ${
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
          </div>

          {/* Category & Canon Continuity Filters */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
              Filter by Media & Continuity:
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'All Content' },
                { id: 'movies', label: 'Theatrical Films' },
                { id: 'series', label: 'TV & Streaming Series' },
                { id: 'one-shots', label: 'Marvel One-Shots' },
                { id: 'specials', label: 'Special Presentations' },
                { id: 'sacred', label: 'Sacred Timeline Only' },
                { id: 'multiverse', label: 'Multiverse & Alternates' },
                { id: 'upcoming', label: 'Upcoming Releases' }
              ].map(cat => {
                const isActive = selectedCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border whitespace-nowrap ${
                      isActive
                        ? 'bg-white/15 text-white border-white/40 shadow-sm'
                        : 'bg-slate-950/60 text-gray-400 border-white/5 hover:border-white/20 hover:text-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty state when no titles match search/filters */}
        {filteredNodes.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-12 text-center space-y-4">
            <Shield className="w-12 h-12 text-gray-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No titles match your filter</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Try resetting your search query or selecting a different phase or media category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPhaseFilter('All');
                setSelectedCategoryFilter('all');
              }}
              className="px-5 py-2 rounded-xl bg-red-600 text-xs font-bold text-white uppercase hover:bg-red-500 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* SECTION 1: THE INFINITY SAGA (Phases 1 - 3) */}
        {infinitySagaNodes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-amber-500 rounded-full shadow-[0_0_10px_#F5B800]" />
                <h2 className="text-xl sm:text-2xl font-black text-amber-400 uppercase tracking-wider">
                  The Infinity Saga (Phases 1 - 3)
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400/80 font-bold">
                {infinitySagaNodes.length} Titles
              </span>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-5">
              {infinitySagaNodes.map((node) => (
                <TimelineCard
                  key={node.id}
                  node={node}
                  orderMode={orderMode}
                  onOpenModal={() => setSelectedNodeModal(node)}
                  onWatchNode={() => onWatchNode(node)}
                  accentColor="amber"
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: THE DEFENDERS SAGA & MARVEL TELEVISION */}
        {defendersAndTvNodes.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-rose-500 rounded-full shadow-[0_0_10px_#F43F5E]" />
                <h2 className="text-xl sm:text-2xl font-black text-rose-400 uppercase tracking-wider">
                  The Defenders Saga & Marvel Television
                </h2>
              </div>
              <span className="text-xs font-mono text-rose-400/80 font-bold">
                {defendersAndTvNodes.length} Titles
              </span>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-rose-500/30 space-y-5">
              {defendersAndTvNodes.map((node) => (
                <TimelineCard
                  key={node.id}
                  node={node}
                  orderMode={orderMode}
                  onOpenModal={() => setSelectedNodeModal(node)}
                  onWatchNode={() => onWatchNode(node)}
                  accentColor="rose"
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: THE MULTIVERSE SAGA (Phases 4 - 6) */}
        {multiverseSagaNodes.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-red-600 rounded-full shadow-[0_0_10px_#E62429]" />
                <h2 className="text-xl sm:text-2xl font-black text-red-500 uppercase tracking-wider">
                  The Multiverse Saga (Phases 4 - 6)
                </h2>
              </div>
              <span className="text-xs font-mono text-red-400/80 font-bold">
                {multiverseSagaNodes.length} Titles
              </span>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-red-600/30 space-y-5">
              {multiverseSagaNodes.map((node) => (
                <TimelineCard
                  key={node.id}
                  node={node}
                  orderMode={orderMode}
                  onOpenModal={() => setSelectedNodeModal(node)}
                  onWatchNode={() => onWatchNode(node)}
                  accentColor="red"
                />
              ))}
            </div>
          </div>
        )}

        {/* Detailed Title Modal */}
        {selectedNodeModal && (
          <TimelineDetailModal
            node={selectedNodeModal}
            orderMode={orderMode}
            onClose={() => setSelectedNodeModal(null)}
            onWatchNode={() => {
              const target = selectedNodeModal;
              setSelectedNodeModal(null);
              onWatchNode(target);
            }}
            onSelectFullMedia={() => {
              const target = selectedNodeModal;
              setSelectedNodeModal(null);
              onSelectNode(target);
            }}
          />
        )}
      </div>
    </PageTransition>
  );
};

interface TimelineCardProps {
  node: TimelineNode;
  orderMode: 'release' | 'chronological';
  onOpenModal: () => void;
  onWatchNode: () => void;
  accentColor: 'amber' | 'rose' | 'red';
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  node,
  orderMode,
  onOpenModal,
  onWatchNode,
  accentColor
}) => {
  const isPlayable = node.screenScapeAvailable;

  const dotBorderClass =
    accentColor === 'amber'
      ? 'border-amber-500 group-hover:bg-amber-500 shadow-[0_0_8px_#F5B800]'
      : accentColor === 'rose'
      ? 'border-rose-500 group-hover:bg-rose-500 shadow-[0_0_8px_#F43F5E]'
      : 'border-red-600 group-hover:bg-red-600 shadow-[0_0_8px_#E62429]';

  const hoverBorderClass =
    accentColor === 'amber'
      ? 'hover:border-amber-500/60'
      : accentColor === 'rose'
      ? 'hover:border-rose-500/60'
      : 'hover:border-red-600/60';

  const orderNumber = orderMode === 'release' ? node.releaseOrder : node.chronologicalOrder;

  return (
    <div
      onClick={onOpenModal}
      className={`group relative cursor-pointer p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/80 ${hoverBorderClass} hover:bg-slate-900 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center`}
    >
      {/* Node Marker Dot on Timeline Axis */}
      <div
        className={`absolute -left-[31px] sm:-left-[39px] top-6 h-4 w-4 rounded-full border-2 bg-slate-950 transition-colors ${dotBorderClass}`}
      />

      {/* Poster Thumbnail */}
      <div className="relative flex-shrink-0">
        <img
          src={node.poster || FALLBACK_POSTER}
          alt={node.title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_POSTER;
          }}
          className="h-28 w-20 rounded-lg object-cover border border-white/10 group-hover:scale-105 transition-transform bg-slate-950 shadow-md"
        />
        {node.rating && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] font-mono font-bold text-amber-400 flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span>{node.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Details & Metadata */}
      <div className="flex-1 space-y-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <PhaseBadge phase={node.phase} />
          <ContinuityBadge continuity={node.continuity} />
          <span className="text-[11px] font-mono text-amber-400 font-bold">
            #{orderNumber}
          </span>
          <span className="text-xs font-mono text-gray-400 font-semibold">{node.year}</span>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
            [{node.type}]
          </span>
          {node.seasonNumber && (
            <span className="text-[10px] font-mono text-indigo-400 font-semibold">
              Season {node.seasonNumber}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate">
          {node.title}
        </h3>

        {/* Chronological In-Universe Story Context Note */}
        {node.timelineNotes && (
          <p className="text-[11px] font-mono text-gray-400 line-clamp-1 italic">
            {node.timelineNotes}
          </p>
        )}

        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {node.overview}
        </p>

        {/* Principal Characters and Portraying Actors */}
        {node.cast && node.cast.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400 pt-1">
            <span className="font-mono text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Cast:</span>
            </span>
            {node.cast.slice(0, 3).map((c, i) => (
              <span key={i} className="text-gray-300">
                <span className="font-medium text-white">{c.name}</span>
                <span className="text-gray-500 text-[10px] ml-1">({c.role})</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="self-stretch sm:self-center flex sm:flex-col items-center justify-end gap-2 pt-2 sm:pt-0">
        {isPlayable ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatchNode();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider hover:bg-red-500 transition-all shadow-md active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>WATCH</span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 rounded-xl bg-slate-800 border border-white/10 px-3.5 py-2 text-[11px] font-mono font-bold text-orange-400 uppercase tracking-wider hover:bg-slate-700 transition-all"
          >
            <span>UPCOMING</span>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="flex items-center justify-center p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
          title="Inspect Details"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface TimelineDetailModalProps {
  node: TimelineNode;
  orderMode: 'release' | 'chronological';
  onClose: () => void;
  onWatchNode: () => void;
  onSelectFullMedia: () => void;
}

const TimelineDetailModal: React.FC<TimelineDetailModalProps> = ({
  node,
  orderMode,
  onClose,
  onWatchNode,
  onSelectFullMedia
}) => {
  const isPlayable = node.screenScapeAvailable;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-slate-900 shadow-2xl space-y-6"
      >
        {/* Backdrop Banner Header */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden rounded-t-3xl bg-slate-950">
          <img
            src={node.backdrop || node.poster || FALLBACK_BACKDROP}
            alt={node.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_BACKDROP;
            }}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Quick Badges in Header */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <PhaseBadge phase={node.phase} />
            <ContinuityBadge continuity={node.continuity} />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 backdrop-blur border border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 space-y-5 -mt-16 sm:-mt-20 relative z-10">
          <div className="flex gap-4 items-end">
            <img
              src={node.poster || FALLBACK_POSTER}
              alt={node.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_POSTER;
              }}
              className="h-36 sm:h-44 w-24 sm:w-30 rounded-xl object-cover border-2 border-white/20 shadow-2xl bg-slate-950 flex-shrink-0"
            />
            <div className="space-y-1 min-w-0">
              <span className="text-xs font-mono font-bold text-red-400">
                Chronological #{node.chronologicalOrder} • Release #{node.releaseOrder}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {node.title}
              </h2>
              {node.tagline && (
                <p className="text-xs font-mono text-gray-400 italic">
                  "{node.tagline}"
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-400 font-mono">
                <span>Released: {node.releaseDate}</span>
                {node.rating && <RatingBadge rating={node.rating} />}
              </div>
            </div>
          </div>

          {/* Timeline In-Universe Continuity Analysis */}
          {node.timelineNotes && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs font-mono space-y-1">
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>CANON CONTINUITY PLACEMENT</span>
              </div>
              <p className="text-gray-300 leading-relaxed font-sans text-xs">
                {node.timelineNotes}
              </p>
            </div>
          )}

          {/* Overview */}
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              SYNOPSIS
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {node.overview}
            </p>
          </div>

          {/* Principal Characters & Portraying Actors */}
          {node.cast && node.cast.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>PRINCIPAL CAST & CHARACTERS</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {node.cast.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-white/5"
                  >
                    <div className="h-8 w-8 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center font-bold text-red-300 text-xs flex-shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="text-xs min-w-0">
                      <div className="text-white font-semibold truncate">{member.name}</div>
                      <div className="text-gray-400 text-[11px] truncate">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
            <button
              onClick={onSelectFullMedia}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>OPEN IN MEDIA HUB</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-gray-400 hover:text-white"
              >
                CLOSE
              </button>
              {isPlayable ? (
                <button
                  onClick={onWatchNode}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-500 shadow-lg transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>WATCH IN SCREENSCAPE</span>
                </button>
              ) : (
                <div className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-orange-950/80 border border-orange-700/60 text-orange-400 text-xs font-mono font-bold text-center">
                  CONFIRMED UPCOMING
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
