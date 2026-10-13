import React, { useState, useMemo } from 'react';
import { Building2, ArrowUpDown, Loader2, Search, Film, Tv, Sparkles, Layers, ShieldCheck, Calendar } from 'lucide-react';
import { Movie, Series, StudioId } from '../types';
import { STUDIOS_DATA } from '../data/multiverse';
import { MovieCard } from '../components/ui/MovieCard';
import { SeriesCard } from '../components/ui/SeriesCard';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import { GridSkeleton } from '../components/ui/SkeletonLoader';

interface StudiosPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
}

type MediaFilter = 'all' | 'movies' | 'series';
type SortOption = 'release' | 'alphabetical' | 'rating';

export const StudiosPage: React.FC<StudiosPageProps> = ({
  onSelectMovie,
  onWatchMovie,
  onSelectSeries,
  onWatchSeries,
}) => {
  const { movies, series: seriesList, isLoading } = useMedia();
  const [selectedStudioId, setSelectedStudioId] = useState<StudioId>('marvel-studios');
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('release');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeStudio = useMemo(() => {
    return STUDIOS_DATA.find(s => s.id === selectedStudioId) || STUDIOS_DATA[0];
  }, [selectedStudioId]);

  // Check if a movie matches the studio
  const isMovieFromStudio = (movie: Movie, studioId: StudioId): boolean => {
    if (movie.studioId === studioId) return true;
    const studioStr = (movie.studio || '').toLowerCase();
    const distStr = (movie.distributor || '').toLowerCase();

    switch (studioId) {
      case 'marvel-studios':
        return Boolean(movie.isMcu === true || movie.phase?.startsWith('Phase') || studioStr.includes('marvel studios'));
      case 'sony-pictures':
        return Boolean(
          movie.studioId === 'sony-pictures' ||
          studioStr.includes('sony') ||
          studioStr.includes('columbia') ||
          distStr.includes('sony') ||
          movie.franchise?.includes('Spider-Man') ||
          movie.franchise?.includes('Venom') ||
          movie.franchise?.includes('Spider-Verse')
        );
      case '20th-century-fox':
        return Boolean(
          movie.studioId === '20th-century-fox' ||
          studioStr.includes('fox') ||
          movie.franchise?.includes('X-Men') ||
          movie.franchise?.includes('Wolverine') ||
          movie.franchise?.includes('Deadpool') ||
          movie.franchise?.includes('Fantastic Four') ||
          movie.franchise?.includes('Daredevil')
        );
      case 'new-line-cinema':
        return Boolean(
          movie.studioId === 'new-line-cinema' ||
          studioStr.includes('new line') ||
          movie.franchise?.includes('Blade')
        );
      case 'universal-pictures':
        return (
          movie.studioId === 'universal-pictures' ||
          studioStr.includes('universal') ||
          movie.id === 'hulk-2003' ||
          movie.id === 'howard-the-duck'
        );
      case 'lionsgate':
        return (
          movie.studioId === 'lionsgate' ||
          studioStr.includes('lionsgate') ||
          movie.id.includes('punisher') ||
          movie.id === 'man-thing'
        );
      case 'marvel-animation':
        return Boolean(movie.isAnimation);
      case 'marvel-television':
        return false;
      default:
        return false;
    }
  };

  // Check if a series matches the studio
  const isSeriesFromStudio = (series: Series, studioId: StudioId): boolean => {
    if (series.studioId === studioId) return true;
    const studioStr = (series.studio || '').toLowerCase();

    switch (studioId) {
      case 'marvel-studios':
        return (
          series.phase?.startsWith('Phase') ||
          series.saga?.includes('Multiverse') ||
          studioStr.includes('marvel studios')
        );
      case 'marvel-television':
        return (
          series.isLegacy === true ||
          series.phase === 'Marvel Television' ||
          series.phase === 'Defenders' ||
          series.saga === 'The Defenders Saga' ||
          studioStr.includes('marvel television') ||
          ['agents-of-shield', 'agent-carter', 'daredevil', 'jessica-jones', 'luke-cage', 'iron-fist', 'the-defenders', 'the-punisher', 'runaways', 'cloak-and-dagger', 'inhumans'].includes(series.id)
        );
      case '20th-century-fox':
        return series.id === 'legion' || series.id === 'the-gifted';
      case 'marvel-animation':
        return series.isAnimation === true;
      default:
        return false;
    }
  };

  // Filtered titles for active studio
  const studioMovies = useMemo(() => {
    return movies.filter(m => isMovieFromStudio(m, selectedStudioId));
  }, [movies, selectedStudioId]);

  const studioSeries = useMemo(() => {
    return seriesList.filter(s => isSeriesFromStudio(s, selectedStudioId));
  }, [seriesList, selectedStudioId]);

  // Combined and sorted items
  const filteredItems = useMemo(() => {
    type MixedItem = { type: 'movie'; data: Movie } | { type: 'series'; data: Series };
    let items: MixedItem[] = [];

    if (mediaFilter === 'all' || mediaFilter === 'movies') {
      studioMovies.forEach(m => items.push({ type: 'movie', data: m }));
    }
    if (mediaFilter === 'all' || mediaFilter === 'series') {
      studioSeries.forEach(s => items.push({ type: 'series', data: s }));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(i => {
        const titleMatch = i.data.title.toLowerCase().includes(q);
        const charMatch = i.data.characters?.some(c => c.toLowerCase().includes(q));
        const franchiseMatch = i.data.franchise?.toLowerCase().includes(q);
        return titleMatch || charMatch || franchiseMatch;
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
  }, [studioMovies, studioSeries, mediaFilter, searchQuery, sortBy]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Building2 className="w-4 h-4 text-red-500" />
              <span>STUDIO & FRANCHISE ARCHIVE</span>
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Studio Explorer
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Marvel adaptations span multiple studios across 40 years of cinema. Explore official Marvel Studios productions alongside Sony, 20th Century Fox, New Line, and legacy partners.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search studio titles..."
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
                <option value="release">Release Order</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Studio Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {STUDIOS_DATA.map(studio => {
            const isActive = selectedStudioId === studio.id;
            return (
              <button
                key={studio.id}
                onClick={() => {
                  setSelectedStudioId(studio.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(230,36,41,0.4)]'
                    : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{studio.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Studio Spotlight Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-red-600/30 border border-red-500/50 text-xs font-mono font-black text-red-400 tracking-wider uppercase">
                  {activeStudio.foundedYear ? `EST. ${activeStudio.foundedYear}` : 'OFFICIAL ARCHIVE'}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {studioMovies.length} Feature Films • {studioSeries.length} Television Series
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {activeStudio.name}
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                {activeStudio.description}
              </p>

              {/* Featured Franchises */}
              {activeStudio.featuredFranchises && activeStudio.featuredFranchises.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs font-mono text-gray-400 mr-1 uppercase font-semibold">
                    Franchises:
                  </span>
                  {activeStudio.featuredFranchises.map(franchise => (
                    <span
                      key={franchise}
                      className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[11px] font-mono text-gray-200"
                    >
                      {franchise}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              <div className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-center min-w-[120px]">
                <div className="text-2xl font-black text-white font-mono">{studioMovies.length}</div>
                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Movies</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-center min-w-[120px]">
                <div className="text-2xl font-black text-white font-mono">{studioSeries.length}</div>
                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Series</div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
          <button
            onClick={() => setMediaFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              mediaFilter === 'all'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Titles ({studioMovies.length + studioSeries.length})</span>
          </button>

          <button
            onClick={() => setMediaFilter('movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              mediaFilter === 'movies'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Movies ({studioMovies.length})</span>
          </button>

          <button
            onClick={() => setMediaFilter('series')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
              mediaFilter === 'series'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Series ({studioSeries.length})</span>
          </button>
        </div>

        {/* Titles Grid */}
        {filteredItems.length === 0 && isLoading ? (
          <GridSkeleton count={10} />
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-mono text-sm bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
            <Building2 className="w-8 h-8 mx-auto text-gray-600" />
            <p>No titles found for {activeStudio.name} with current filters.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
              >
                Clear search query
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {filteredItems.map(item => {
              if (item.type === 'movie') {
                return (
                  <MovieCard
                    key={`studio-movie-${item.data.id}`}
                    movie={item.data}
                    onSelect={onSelectMovie}
                    onWatch={onWatchMovie}
                  />
                );
              } else {
                return (
                  <SeriesCard
                    key={`studio-series-${item.data.id}`}
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
