import React, { useState, useMemo } from 'react';
import {
  Compass,
  Play,
  Film,
  Info,
  Calendar,
  Sparkles,
  Search,
  Clock,
  ChevronRight,
  Shield,
  Star,
  Users
} from 'lucide-react';
import {
  createTimelineNodes,
  createMarvelMoviesTimelineNodes,
  getTimelineNodesByOrder
} from '../data/timeline';
import { TimelineNode } from '../types';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { ContinuityBadge } from '../components/ui/ContinuityBadge';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import { FALLBACK_POSTER, FALLBACK_BACKDROP } from '../services/tmdb';

interface TimelinePageProps {
  onSelectNode: (node: TimelineNode) => void;
  onWatchNode: (node: TimelineNode) => void;
}

type TimelineScope =
  | 'master-movies'
  | 'mcu-sacred'
  | 'fox-xmen'
  | 'sony-spider'
  | 'blade';

export const TimelinePage: React.FC<TimelinePageProps> = ({ onSelectNode, onWatchNode }) => {
  const { movies, series } = useMedia();

  // Core interactive states
  const [timelineScope, setTimelineScope] = useState<TimelineScope>('master-movies');
  const [orderMode, setOrderMode] = useState<'release' | 'chronological'>('release');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNodeModal, setSelectedNodeModal] = useState<TimelineNode | null>(null);

  // Nodes generator based on scope
  const activeScopeNodes = useMemo(() => {
    if (timelineScope === 'master-movies') {
      // Feature-length movies only across all studios (1986 to present)
      const featureMovies = movies.filter(m => m.type !== 'one-shot' && m.type !== 'special');
      const nodes = createMarvelMoviesTimelineNodes(featureMovies);
      return nodes.sort((a, b) => {
        if (orderMode === 'release') return a.releaseOrder - b.releaseOrder;
        return a.chronologicalOrder - b.chronologicalOrder;
      });
    }

    if (timelineScope === 'mcu-sacred') {
      // Curated MCU sequence (1 to 59 + 60/61 upcoming)
      const dynamicMcu = createTimelineNodes(movies, series);
      return getTimelineNodesByOrder(orderMode, dynamicMcu);
    }

    if (timelineScope === 'fox-xmen') {
      const foxMovies = movies.filter(
        m => m.franchise?.includes('X-Men') || m.franchise?.includes('Wolverine') || m.franchise?.includes('Deadpool')
      );
      const nodes = createMarvelMoviesTimelineNodes(foxMovies);
      return nodes.sort((a, b) => {
        if (orderMode === 'release') return a.releaseOrder - b.releaseOrder;
        return a.chronologicalOrder - b.chronologicalOrder;
      });
    }

    if (timelineScope === 'sony-spider') {
      const sonyMovies = movies.filter(
        m =>
          m.studioId === 'sony-pictures' ||
          m.franchise?.includes('Spider-Man') ||
          m.franchise?.includes('Venom') ||
          m.franchise?.includes('Spider-Verse')
      );
      const nodes = createMarvelMoviesTimelineNodes(sonyMovies);
      return nodes.sort((a, b) => {
        if (orderMode === 'release') return a.releaseOrder - b.releaseOrder;
        return a.chronologicalOrder - b.chronologicalOrder;
      });
    }

    if (timelineScope === 'blade') {
      const bladeMovies = movies.filter(m => m.franchise?.includes('Blade'));
      const nodes = createMarvelMoviesTimelineNodes(bladeMovies);
      return nodes.sort((a, b) => {
        if (orderMode === 'release') return a.releaseOrder - b.releaseOrder;
        return a.chronologicalOrder - b.chronologicalOrder;
      });
    }

    return [];
  }, [timelineScope, orderMode, movies, series]);

  // Search & Filter pipeline
  const filteredNodes = useMemo(() => {
    return activeScopeNodes.filter(node => {
      // 1. Search Query
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

      // 2. Phase Filter (Applicable only to MCU or All)
      if (selectedPhaseFilter !== 'All') {
        if (node.phase !== selectedPhaseFilter) return false;
      }

      // 3. Media & Continuity Filter
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
  }, [activeScopeNodes, searchQuery, selectedPhaseFilter, selectedCategoryFilter]);

  // Sectional grouping for Master Movie Timeline (By Era)
  const eraPioneerNodes = useMemo(() => filteredNodes.filter(n => n.year < 2000 && !n.isUpcoming), [filteredNodes]);
  const eraRenaissanceNodes = useMemo(() => filteredNodes.filter(n => n.year >= 2000 && n.year <= 2007 && !n.isUpcoming), [filteredNodes]);
  const eraGoldenAgeNodes = useMemo(() => filteredNodes.filter(n => n.year >= 2008 && n.year <= 2019 && !n.isUpcoming), [filteredNodes]);
  const eraModernNodes = useMemo(() => filteredNodes.filter(n => n.year >= 2020 && !n.isUpcoming), [filteredNodes]);
  const upcomingNodes = useMemo(() => filteredNodes.filter(n => n.isUpcoming), [filteredNodes]);

  // Sectional grouping for MCU Curated Timeline
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
              <Compass className="w-4 h-4 animate-spin-slow text-red-500" />
              <span>THE DEFINITIVE MARVEL TIMELINE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {timelineScope === 'master-movies' && 'Master Marvel Movies Timeline'}
              {timelineScope === 'mcu-sacred' && 'MCU Interactive Timeline'}
              {timelineScope === 'fox-xmen' && 'Fox X-Men Universe Timeline'}
              {timelineScope === 'sony-spider' && 'Sony Spider-Man & SSU Timeline'}
              {timelineScope === 'blade' && 'Blade Vampire Trilogy Timeline'}
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              {timelineScope === 'master-movies' &&
                'Explore all 91+ verified Marvel feature films across all studios in master release order from 1986 to present day. Strictly feature-length movies based on Marvel properties.'}
              {timelineScope === 'mcu-sacred' &&
                'The curated Marvel Cinematic Universe Sacred Timeline and Multiverse incursions. Strictly preserves curated chronological order (1–59) and release order.'}
              {timelineScope === 'fox-xmen' &&
                'Chronological and release timeline for 20th Century Fox mutant cinema from 1962 (First Class) to 2029 (Logan).'}
              {timelineScope === 'sony-spider' &&
                'Sam Raimi Spider-Man, Marc Webb The Amazing Spider-Man, Sony’s Spider-Man Universe, and the Spider-Verse animated multiverse.'}
              {timelineScope === 'blade' &&
                'New Line Cinema’s R-rated vampire hunter trilogy starring Wesley Snipes as the Daywalker.'}
            </p>
          </div>

          {/* Viewing Mode Toggle (Release Order vs Chronological Order) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-white/10">
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
                <span>Release Order (Master)</span>
              </button>
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
                <span>In-Universe Chronology</span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Scope Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/5 pb-4">
          {[
            { id: 'master-movies', label: 'All Marvel Movies (Master Release)', icon: Film },
            { id: 'mcu-sacred', label: 'MCU Curated Timeline', icon: Compass },
            { id: 'fox-xmen', label: 'Fox X-Men Universe', icon: Shield },
            { id: 'sony-spider', label: 'Sony Spider-Man / SSU', icon: Sparkles },
            { id: 'blade', label: 'Blade Vampire Universe', icon: Sparkles }
          ].map(scope => {
            const isActive = timelineScope === scope.id;
            const Icon = scope.icon;
            return (
              <button
                key={scope.id}
                onClick={() => {
                  setTimelineScope(scope.id as TimelineScope);
                  if (scope.id === 'master-movies') setOrderMode('release');
                  if (scope.id === 'mcu-sacred') setOrderMode('chronological');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                    : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{scope.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search titles, actors, characters in this timeline..."
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

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono text-gray-300 shrink-0">
              <span className="text-red-400 font-bold">{filteredNodes.length}</span>
              <span>of</span>
              <span className="text-white font-bold">{activeScopeNodes.length} Entries</span>
            </div>
          </div>

          {/* Phase Filter Buttons (When in MCU mode) */}
          {timelineScope === 'mcu-sacred' && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                Filter by MCU Phase:
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
          )}

          {/* Media & Continuity Filter (When in MCU mode) */}
          {timelineScope === 'mcu-sacred' && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                Filter by Format & Continuity:
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'all', label: 'All Content' },
                  { id: 'movies', label: 'Feature Films Only' },
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
          )}
        </div>

        {/* Empty state */}
        {filteredNodes.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-12 text-center space-y-4">
            <Shield className="w-12 h-12 text-gray-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No titles match your filter</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Try resetting your search query or selecting a different timeline scope.
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

        {/* ============================================================ */}
        {/* RENDER MODE A: MASTER MARVEL MOVIES TIMELINE (Era Breakdown) */}
        {/* ============================================================ */}
        {timelineScope === 'master-movies' && (
          <div className="space-y-12">
            {/* ERA 1: PIONEER MARVEL CINEMA */}
            {eraPioneerNodes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366F1]" />
                    <h2 className="text-xl sm:text-2xl font-black text-indigo-400 uppercase tracking-wider">
                      Pioneer Marvel Cinema (1986–1999)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-indigo-400/80 font-bold">
                    {eraPioneerNodes.length} Movies
                  </span>
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-5">
                  {eraPioneerNodes.map(node => (
                    <TimelineCard
                      key={node.id}
                      node={node}
                      orderMode={orderMode}
                      onOpenModal={() => setSelectedNodeModal(node)}
                      onWatchNode={() => onWatchNode(node)}
                      accentColor="indigo"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ERA 2: MODERN SUPERHERO RENAISSANCE */}
            {eraRenaissanceNodes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-amber-500 rounded-full shadow-[0_0_10px_#F5B800]" />
                    <h2 className="text-xl sm:text-2xl font-black text-amber-400 uppercase tracking-wider">
                      The Modern Superhero Renaissance (2000–2007)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-amber-400/80 font-bold">
                    {eraRenaissanceNodes.length} Movies
                  </span>
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-5">
                  {eraRenaissanceNodes.map(node => (
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

            {/* ERA 3: THE GOLDEN AGE */}
            {eraGoldenAgeNodes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-rose-500 rounded-full shadow-[0_0_10px_#F43F5E]" />
                    <h2 className="text-xl sm:text-2xl font-black text-rose-400 uppercase tracking-wider">
                      The Golden Era of Marvel Cinema (2008–2019)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-rose-400/80 font-bold">
                    {eraGoldenAgeNodes.length} Movies
                  </span>
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-rose-500/30 space-y-5">
                  {eraGoldenAgeNodes.map(node => (
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

            {/* ERA 4: THE MULTIVERSE & MODERN ERA */}
            {eraModernNodes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-red-600 rounded-full shadow-[0_0_10px_#E62429]" />
                    <h2 className="text-xl sm:text-2xl font-black text-red-500 uppercase tracking-wider">
                      The Multiverse & Modern Era (2020–Present)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-red-400/80 font-bold">
                    {eraModernNodes.length} Movies
                  </span>
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-red-600/30 space-y-5">
                  {eraModernNodes.map(node => (
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

            {/* UPCOMING FEATURE FILMS */}
            {upcomingNodes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-orange-500 rounded-full shadow-[0_0_10px_#F97316]" />
                    <h2 className="text-xl sm:text-2xl font-black text-orange-400 uppercase tracking-wider">
                      Upcoming Theatrical Releases
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-orange-400/80 font-bold">
                    {upcomingNodes.length} Films
                  </span>
                </div>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-orange-500/30 space-y-5">
                  {upcomingNodes.map(node => (
                    <TimelineCard
                      key={node.id}
                      node={node}
                      orderMode={orderMode}
                      onOpenModal={() => setSelectedNodeModal(node)}
                      onWatchNode={() => onWatchNode(node)}
                      accentColor="orange"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* RENDER MODE B: MCU CURATED TIMELINE (Sacred Timeline & Sagas) */}
        {/* ============================================================ */}
        {timelineScope === 'mcu-sacred' && (
          <div className="space-y-12">
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
                  {infinitySagaNodes.map(node => (
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

            {defendersAndTvNodes.length > 0 && (
              <div className="space-y-6">
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
                  {defendersAndTvNodes.map(node => (
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

            {multiverseSagaNodes.length > 0 && (
              <div className="space-y-6">
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
                  {multiverseSagaNodes.map(node => (
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
          </div>
        )}

        {/* ============================================================ */}
        {/* RENDER MODE C: OTHER CONTINUITIES (X-Men, Spider-Man, Blade) */}
        {/* ============================================================ */}
        {['fox-xmen', 'sony-spider', 'blade'].includes(timelineScope) && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-cyan-500 rounded-full shadow-[0_0_10px_#06B6D4]" />
                <h2 className="text-xl sm:text-2xl font-black text-cyan-400 uppercase tracking-wider">
                  {timelineScope === 'fox-xmen' && 'Fox Mutant Continuity'}
                  {timelineScope === 'sony-spider' && 'Sony Marvel Cinematic Continuity'}
                  {timelineScope === 'blade' && 'Blade Vampire Saga Continuity'}
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-400/80 font-bold">
                {filteredNodes.length} Entries
              </span>
            </div>
            <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 space-y-5">
              {filteredNodes.map(node => (
                <TimelineCard
                  key={node.id}
                  node={node}
                  orderMode={orderMode}
                  onOpenModal={() => setSelectedNodeModal(node)}
                  onWatchNode={() => onWatchNode(node)}
                  accentColor="cyan"
                />
              ))}
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedNodeModal && (
          <TimelineDetailModal
            node={selectedNodeModal}
            orderMode={orderMode}
            onClose={() => setSelectedNodeModal(null)}
            onWatchNode={() => {
              const node = selectedNodeModal;
              setSelectedNodeModal(null);
              onWatchNode(node);
            }}
            onSelectFullMedia={() => {
              const node = selectedNodeModal;
              setSelectedNodeModal(null);
              onSelectNode(node);
            }}
          />
        )}
      </div>
    </PageTransition>
  );
};

// ======================================================================
// TimelineCard Component
// ======================================================================

interface TimelineCardProps {
  node: TimelineNode;
  orderMode: 'release' | 'chronological';
  onOpenModal: () => void;
  onWatchNode: () => void;
  accentColor: 'amber' | 'rose' | 'red' | 'indigo' | 'orange' | 'cyan';
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  node,
  orderMode,
  onOpenModal,
  onWatchNode,
  accentColor
}) => {
  const isPlayable = node.screenScapeAvailable && !node.isUpcoming;

  const dotBorderClass =
    accentColor === 'amber'
      ? 'border-amber-500 shadow-[0_0_8px_#F5B800]'
      : accentColor === 'rose'
      ? 'border-rose-500 shadow-[0_0_8px_#F43F5E]'
      : accentColor === 'indigo'
      ? 'border-indigo-500 shadow-[0_0_8px_#6366F1]'
      : accentColor === 'orange'
      ? 'border-orange-500 shadow-[0_0_8px_#F97316]'
      : accentColor === 'cyan'
      ? 'border-cyan-500 shadow-[0_0_8px_#06B6D4]'
      : 'border-red-500 shadow-[0_0_8px_#E62429]';

  const hoverBorderClass =
    accentColor === 'amber'
      ? 'hover:border-amber-500/60'
      : accentColor === 'rose'
      ? 'hover:border-rose-500/60'
      : accentColor === 'indigo'
      ? 'hover:border-indigo-500/60'
      : accentColor === 'orange'
      ? 'hover:border-orange-500/60'
      : accentColor === 'cyan'
      ? 'hover:border-cyan-500/60'
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
          {node.phase && <PhaseBadge phase={node.phase} />}
          <ContinuityBadge continuity={node.continuity} />
          <span className="text-[11px] font-mono text-red-400 font-bold">
            #{orderNumber}
          </span>
          {node.studio && (
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-gray-200 font-semibold">
              {node.studio}
            </span>
          )}
          {node.universeDesignation && (
            <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono text-cyan-300 font-bold">
              {node.universeDesignation}
            </span>
          )}
          <span className="text-xs font-mono text-gray-400 font-semibold">{node.year}</span>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
            [{node.type}]
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate">
          {node.title}
        </h3>

        {/* Timeline Note / Story Placement */}
        {node.timelineNotes && (
          <p className="text-[11px] font-mono text-gray-400 line-clamp-1 italic">
            {node.timelineNotes}
          </p>
        )}

        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {node.overview}
        </p>

        {/* Cast */}
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

// ======================================================================
// TimelineDetailModal Component
// ======================================================================

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
  const isPlayable = node.screenScapeAvailable && !node.isUpcoming;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-slate-900 shadow-2xl"
      >
        {/* Backdrop Banner */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-950">
          <img
            src={node.backdrop || FALLBACK_BACKDROP}
            alt={node.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_BACKDROP;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {node.phase && <PhaseBadge phase={node.phase} />}
                <ContinuityBadge continuity={node.continuity} />
                <span className="text-xs font-mono text-red-400 font-bold">
                  {orderMode === 'release' ? `Release #${node.releaseOrder}` : `Chronology #${node.chronologicalOrder}`}
                </span>
                {node.universeDesignation && (
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] font-mono text-cyan-300 font-bold">
                    {node.universeDesignation}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {node.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 border-b border-white/10 pb-3">
            <span>Release Date: <strong className="text-white">{node.releaseDate}</strong></span>
            {node.studio && <span>Studio: <strong className="text-white">{node.studio}</strong></span>}
            {node.distributor && <span>Distributor: <strong className="text-white">{node.distributor}</strong></span>}
            {node.franchise && <span>Franchise: <strong className="text-white">{node.franchise}</strong></span>}
            {node.rating && <span>Rating: <strong className="text-amber-400">★ {node.rating.toFixed(1)}/10</strong></span>}
          </div>

          {/* Timeline Notes */}
          {node.timelineNotes && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-xs font-mono text-red-200">
              <strong className="text-red-400 block mb-1">STORY CONTINUITY CONTEXT:</strong>
              {node.timelineNotes}
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase text-gray-400 font-bold mb-1">Synopsis</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{node.overview}</p>
          </div>

          {/* Cast */}
          {node.cast && node.cast.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase text-gray-400 font-bold mb-2">Principal Cast</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {node.cast.map((c, i) => (
                  <div key={i} className="p-2 rounded-lg bg-black/40 border border-white/5 text-xs">
                    <div className="font-semibold text-white truncate">{c.name}</div>
                    <div className="text-gray-400 text-[10px] truncate">{c.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            {isPlayable ? (
              <button
                onClick={onWatchNode}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 text-xs font-bold text-white uppercase hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(230,36,41,0.4)]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch ScreenScape Player</span>
              </button>
            ) : (
              <div className="flex-1 py-3 text-center rounded-xl bg-slate-800 text-xs font-mono text-gray-400">
                Playback will unlock upon theatrical release
              </div>
            )}
            <button
              onClick={onSelectFullMedia}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
            >
              <span>Full Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
