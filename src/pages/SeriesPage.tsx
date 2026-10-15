import React, { useState, useMemo } from 'react';
import { Tv, ArrowUpDown, Loader2, Search, Shield, Sparkles, Film } from 'lucide-react';
import { Series } from '../types';
import { SeriesCard } from '../components/ui/SeriesCard';
import { PageTransition } from '../components/ui/PageTransition';
import { isMarvelContent } from '../utils/marvelWhitelist';
import { useMedia } from '../context/MediaContext';
import { GridSkeleton } from '../components/ui/SkeletonLoader';

interface SeriesPageProps {
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
}

const PHASES = ['All', 'Phase 4', 'Phase 5', 'Phase 6', 'Defenders', 'Marvel Television'];
type SortOption = 'release' | 'alphabetical' | 'rating';
type SeriesCategoryOption = 'all' | 'disney-plus' | 'defenders' | 'marvel-television' | 'animated';

const getSeriesCategory = (series: Series): 'disney-plus' | 'defenders' | 'marvel-television' | 'animated' => {
  const animatedIds = [
    'what-if',
    'i-am-groot',
    'eyes-of-wakanda',
    'your-friendly-neighborhood-spider-man',
    'marvel-zombies',
    'x-men-97',
    'x-men-the-animated-series',
    'spider-man-the-animated-series',
    'the-spectacular-spider-man',
    'x-men-evolution',
    'wolverine-and-the-x-men',
    'ultimate-spider-man'
  ];
  if (series.isAnimation || animatedIds.includes(series.id) || series.genres.includes('Animation')) return 'animated';
  if (series.phase === 'Defenders' || series.saga === 'The Defenders Saga') return 'defenders';
  if (
    series.isLegacy ||
    series.phase === 'Marvel Television' ||
    ['agents-of-shield', 'agent-carter', 'runaways', 'cloak-and-dagger', 'inhumans', 'legion', 'the-gifted'].includes(series.id)
  ) return 'marvel-television';
  return 'disney-plus';
};

export const SeriesPage: React.FC<SeriesPageProps> = ({ onSelectSeries, onWatchSeries }) => {
  const { series: seriesList, isLoading } = useMedia();
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<SeriesCategoryOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('release');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const releasedSeries = useMemo(() => seriesList.filter(isMarvelContent).filter(s => s.releaseStatus !== 'upcoming'), [seriesList]);

  const filteredSeries = useMemo(() => {
    let result = releasedSeries;

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(s => getSeriesCategory(s) === selectedCategory);
    }

    // Phase / Continuity filter
    if (selectedPhase !== 'All') {
      result = result.filter(s => s.phase === selectedPhase);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.characters?.some(c => c.toLowerCase().includes(q)) ||
          s.cast?.some(c => c.name.toLowerCase().includes(q)) ||
          s.creator?.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'release') return a.releaseOrder - b.releaseOrder;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [releasedSeries, selectedCategory, selectedPhase, searchQuery, sortBy]);

  // Tab counts
  const disneyPlusCount = useMemo(() => releasedSeries.filter(s => getSeriesCategory(s) === 'disney-plus').length, [releasedSeries]);
  const defendersCount = useMemo(() => releasedSeries.filter(s => getSeriesCategory(s) === 'defenders').length, [releasedSeries]);
  const tvCount = useMemo(() => releasedSeries.filter(s => getSeriesCategory(s) === 'marvel-television').length, [releasedSeries]);
  const animatedCount = useMemo(() => releasedSeries.filter(s => getSeriesCategory(s) === 'animated').length, [releasedSeries]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Tv className="w-4 h-4" />
              <span>THE TELEVISION ARCHIVE</span>
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Marvel Series
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Explore {filteredSeries.length} MCU television series across Disney+, The Defenders Saga & Marvel Television.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search series..."
                className="w-44 sm:w-56 rounded-xl border border-white/10 bg-slate-900/90 pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1 hidden sm:flex">
                <ArrowUpDown className="w-3.5 h-3.5 text-red-500" />
                SORT:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-white focus:border-red-600 focus:outline-none cursor-pointer"
              >
                <option value="release">Release Date</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters: All, Disney+ Originals, The Defenders Saga, Marvel Television, Animated */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>All Series ({seriesList.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('disney-plus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedCategory === 'disney-plus'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Disney+ Originals ({disneyPlusCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('defenders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedCategory === 'defenders'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>The Defenders Saga ({defendersCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('animated')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedCategory === 'animated'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Animated & Multiverse ({animatedCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('marvel-television')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedCategory === 'marvel-television'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Marvel Television ({tvCount})</span>
          </button>
        </div>

        {/* Phase / Continuity Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PHASES.map(phase => {
            const isActive = selectedPhase === phase;
            return (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all border ${
                  isActive
                    ? 'bg-white/15 text-white border-white/30 shadow-sm'
                    : 'bg-slate-900/60 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {phase}
              </button>
            );
          })}
        </div>

        {/* Series Poster Grid */}
        {filteredSeries.length === 0 && isLoading ? (
          <GridSkeleton count={8} />
        ) : filteredSeries.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-mono text-sm bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
            <Tv className="w-8 h-8 mx-auto text-gray-600" />
            <p>No series found matching the selected filters.</p>
            {(selectedPhase !== 'All' || selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedPhase('All');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
              >
                Reset all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {filteredSeries.map(series => (
              <SeriesCard
                key={series.id}
                series={series}
                onSelect={onSelectSeries}
                onWatch={onWatchSeries}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};
