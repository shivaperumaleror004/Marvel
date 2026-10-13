import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowUpDown, Loader2, Search, Film, Tv, Play, Layers } from 'lucide-react';
import { Movie, Series } from '../types';
import { MovieCard } from '../components/ui/MovieCard';
import { SeriesCard } from '../components/ui/SeriesCard';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import { GridSkeleton } from '../components/ui/SkeletonLoader';

interface AnimationPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
}

type FormatOption = 'all' | 'movies' | 'series';
type SortOption = 'release' | 'alphabetical' | 'rating';

export const AnimationPage: React.FC<AnimationPageProps> = ({
  onSelectMovie,
  onWatchMovie,
  onSelectSeries,
  onWatchSeries,
}) => {
  const { movies, series: seriesList, isLoading } = useMedia();

  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('all');
  const [selectedFranchise, setSelectedFranchise] = useState<string>('All');
  const [selectedStudio, setSelectedStudio] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('release');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all animated movies and series
  const animatedMovies = useMemo(() => {
    return movies.filter(m => m.isAnimation || m.franchise === 'Spider-Verse' || m.genres.includes('Animation'));
  }, [movies]);

  const animatedSeries = useMemo(() => {
    const animatedSeriesIds = [
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
    return seriesList.filter(s => s.isAnimation || animatedSeriesIds.includes(s.id) || s.genres.includes('Animation'));
  }, [seriesList]);

  // Available franchises
  const franchises = useMemo(() => {
    const set = new Set<string>();
    [...animatedMovies, ...animatedSeries].forEach(item => {
      if (item.franchise) set.add(item.franchise);
    });
    return ['All', ...Array.from(set).sort()];
  }, [animatedMovies, animatedSeries]);

  // Filter items
  const filteredItems = useMemo(() => {
    type MixedItem = { type: 'movie'; data: Movie } | { type: 'series'; data: Series };
    let items: MixedItem[] = [];

    if (selectedFormat === 'all' || selectedFormat === 'movies') {
      animatedMovies.forEach(m => items.push({ type: 'movie', data: m }));
    }
    if (selectedFormat === 'all' || selectedFormat === 'series') {
      animatedSeries.forEach(s => items.push({ type: 'series', data: s }));
    }

    // Franchise filter
    if (selectedFranchise !== 'All') {
      items = items.filter(i => i.data.franchise === selectedFranchise);
    }

    // Studio filter
    if (selectedStudio !== 'All') {
      items = items.filter(i => {
        const studio = i.data.studio || (i.type === 'movie' ? (i.data as Movie).director : (i.data as Series).creator);
        return studio?.toLowerCase().includes(selectedStudio.toLowerCase());
      });
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(i => {
        const titleMatch = i.data.title.toLowerCase().includes(q);
        const charMatch = i.data.characters?.some(c => c.toLowerCase().includes(q));
        const castMatch = i.data.cast?.some(c => c.name.toLowerCase().includes(q));
        return titleMatch || charMatch || castMatch;
      });
    }

    // Sorting
    items.sort((a, b) => {
      if (sortBy === 'release') return a.data.releaseOrder - b.data.releaseOrder;
      if (sortBy === 'alphabetical') return a.data.title.localeCompare(b.data.title);
      if (sortBy === 'rating') return (b.data.rating || 0) - (a.data.rating || 0);
      return 0;
    });

    return items;
  }, [animatedMovies, animatedSeries, selectedFormat, selectedFranchise, selectedStudio, searchQuery, sortBy]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-fuchsia-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>THE ANIMATED MULTIVERSE</span>
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-3">
              Marvel Animation
              <span className="text-xs px-2.5 py-1 rounded-full bg-fuchsia-950/80 border border-fuchsia-700/60 font-mono text-fuchsia-300 font-bold">
                {animatedMovies.length + animatedSeries.length} TITLES
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              From the Oscar-winning Spider-Verse multiversal saga and X-Men &apos;97 to iconic 90s animated classics and Disney+ What If...?, explore every verified Marvel animated production.
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
                placeholder="Search animation..."
                className="w-44 sm:w-56 rounded-xl border border-white/10 bg-slate-900/90 pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-fuchsia-500 focus:outline-none transition-colors"
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
                <ArrowUpDown className="w-3.5 h-3.5 text-fuchsia-400" />
                SORT:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-white focus:border-fuchsia-500 focus:outline-none cursor-pointer"
              >
                <option value="release">Release Order</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Format Selector: All, Animated Series, Feature Films */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
          <button
            onClick={() => setSelectedFormat('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedFormat === 'all'
                ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(192,38,211,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Animation ({animatedMovies.length + animatedSeries.length})</span>
          </button>

          <button
            onClick={() => setSelectedFormat('series')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedFormat === 'series'
                ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(192,38,211,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Animated Series ({animatedSeries.length})</span>
          </button>

          <button
            onClick={() => setSelectedFormat('movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              selectedFormat === 'movies'
                ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(192,38,211,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Feature Films ({animatedMovies.length})</span>
          </button>
        </div>

        {/* Franchise Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
            FRANCHISE:
          </span>
          {franchises.map(franchise => {
            const isActive = selectedFranchise === franchise;
            return (
              <button
                key={franchise}
                onClick={() => setSelectedFranchise(franchise)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-white/15 text-white border-white/40 shadow-sm'
                    : 'bg-slate-900/60 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {franchise}
              </button>
            );
          })}
        </div>

        {/* Grid Display */}
        {filteredItems.length === 0 && isLoading ? (
          <GridSkeleton count={10} />
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-mono text-sm bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
            <Sparkles className="w-8 h-8 mx-auto text-gray-600" />
            <p>No animated titles found matching the selected filters.</p>
            {(selectedFranchise !== 'All' || selectedStudio !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedFranchise('All');
                  setSelectedStudio('All');
                  setSearchQuery('');
                }}
                className="mt-2 text-xs text-fuchsia-400 hover:text-fuchsia-300 underline"
              >
                Reset all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {filteredItems.map(item => {
              if (item.type === 'movie') {
                return (
                  <MovieCard
                    key={`anim-movie-${item.data.id}`}
                    movie={item.data}
                    onSelect={onSelectMovie}
                    onWatch={onWatchMovie}
                  />
                );
              } else {
                return (
                  <SeriesCard
                    key={`anim-series-${item.data.id}`}
                    series={item.data}
                    onSelect={onSelectSeries}
                    onWatch={onWatchSeries}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
};
