import React, { useState, useMemo } from 'react';
import {
  Film,
  ArrowUpDown,
  Loader2,
  Search,
  Clapperboard,
  Sparkles,
  Calendar,
  Building2,
  Globe,
  LayoutGrid,
  ListOrdered,
  Play,
  Info,
  Clock,
  Shield,
  Star,
  Video
} from 'lucide-react';
import { Movie, StudioId, UniverseId } from '../types';
import { MovieCard } from '../components/ui/MovieCard';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { PageTransition } from '../components/ui/PageTransition';
import { isMarvelContent } from '../utils/marvelWhitelist';
import { useMedia } from '../context/MediaContext';
import { GridSkeleton } from '../components/ui/SkeletonLoader';
import { FALLBACK_POSTER } from '../services/tmdb';

interface MoviesPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
}

type MovieCategory =
  | 'all'
  | 'mcu'
  | 'other'
  | 'animation'
  | 'oneshots'
  | 'hulk'
  | 'sony'
  | 'x-men'
  | 'fantastic-four'
  | 'blade-ghost-rider'
  | 'upcoming';

type SortOption = 'release' | 'chronological' | 'alphabetical' | 'rating';
type ViewMode = 'grid' | 'timeline';

const STUDIOS = [
  { id: 'all', label: 'All Studios' },
  { id: 'marvel-studios', label: 'Marvel Studios' },
  { id: 'sony-pictures', label: 'Sony Pictures' },
  { id: '20th-century-fox', label: '20th Century Fox' },
  { id: 'new-line-cinema', label: 'New Line Cinema' },
  { id: 'universal-pictures', label: 'Universal Pictures' },
  { id: 'lionsgate', label: 'Lionsgate' },
  { id: 'marvel-animation', label: 'Marvel Animation' }
];

const ERAS = [
  { id: 'all', label: 'All Eras' },
  { id: 'classic', label: '1986–1999 (Early Cinema)' },
  { id: '2000s', label: '2000–2007 (Renaissance)' },
  { id: '2010s', label: '2008–2019 (Golden Age)' },
  { id: '2020s', label: '2020–Present (Multiverse)' }
];

export const MoviesPage: React.FC<MoviesPageProps> = ({ onSelectMovie, onWatchMovie }) => {
  const { movies, isLoading, error } = useMedia();

  const [activeCategory, setActiveCategory] = useState<MovieCategory>('all');
  const [selectedStudio, setSelectedStudio] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('release');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary filter function
  const filteredMovies = useMemo(() => {
    let result = movies.filter(isMarvelContent);

    // 1. Category Filter
    if (activeCategory === 'mcu') {
      result = result.filter(m => m.isMcu && m.movieType !== 'short' && !m.id.startsWith('one-shot-'));
    } else if (activeCategory === 'other') {
      result = result.filter(m => !m.isMcu && !m.isAnimation && m.movieType !== 'short' && !m.id.startsWith('one-shot-'));
    } else if (activeCategory === 'animation') {
      result = result.filter(m => m.isAnimation || m.movieType === 'animation' || m.studioId === 'marvel-animation');
    } else if (activeCategory === 'oneshots') {
      result = result.filter(m => m.movieType === 'short' || m.movieType === 'tv-movie' || m.movieType === 'special' || m.id.startsWith('one-shot-') || m.id.includes('hulk-returns') || m.id.includes('trial-of-the-incredible-hulk') || m.id.includes('death-of-the-incredible-hulk') || m.id === 'werewolf-by-night' || m.id === 'gotg-holiday-special');
    } else if (activeCategory === 'hulk') {
      result = result.filter(m => m.franchise?.includes('Hulk') || m.id.includes('hulk'));
    } else if (activeCategory === 'sony') {
      result = result.filter(
        m =>
          m.studioId === 'sony-pictures' ||
          m.franchise?.includes('Spider-Man') ||
          m.franchise?.includes('Venom') ||
          m.franchise?.includes('Spider-Verse')
      );
    } else if (activeCategory === 'x-men') {
      result = result.filter(
        m =>
          m.franchise?.includes('X-Men') ||
          m.franchise?.includes('Wolverine') ||
          m.franchise?.includes('Deadpool') ||
          m.id === 'generation-x-1996'
      );
    } else if (activeCategory === 'fantastic-four') {
      result = result.filter(m => m.franchise?.includes('Fantastic Four'));
    } else if (activeCategory === 'blade-ghost-rider') {
      result = result.filter(
        m => m.franchise?.includes('Blade') || m.franchise?.includes('Ghost Rider')
      );
    } else if (activeCategory === 'upcoming') {
      result = result.filter(m => m.isUpcoming || m.releaseStatus === 'upcoming');
    }

    // 2. Studio Filter
    if (selectedStudio !== 'all') {
      result = result.filter(m => {
        if (selectedStudio === 'marvel-studios') return m.isMcu || m.studioId === 'marvel-studios';
        if (selectedStudio === 'sony-pictures') return m.studioId === 'sony-pictures' || m.distributor?.includes('Sony');
        if (selectedStudio === '20th-century-fox') return m.studioId === '20th-century-fox';
        if (selectedStudio === 'new-line-cinema') return m.studioId === 'new-line-cinema';
        if (selectedStudio === 'universal-pictures') return m.studioId === 'universal-pictures';
        if (selectedStudio === 'lionsgate') return m.studioId === 'lionsgate';
        if (selectedStudio === 'marvel-animation') return m.isAnimation;
        return true;
      });
    }

    // 3. Era Filter
    if (selectedEra !== 'all') {
      result = result.filter(m => {
        if (selectedEra === 'classic') return m.year < 2000;
        if (selectedEra === '2000s') return m.year >= 2000 && m.year <= 2007;
        if (selectedEra === '2010s') return m.year >= 2008 && m.year <= 2019;
        if (selectedEra === '2020s') return m.year >= 2020;
        return true;
      });
    }

    // 4. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        m =>
          m.title.toLowerCase().includes(q) ||
          m.franchise?.toLowerCase().includes(q) ||
          m.universe?.toLowerCase().includes(q) ||
          m.characters?.some(c => c.toLowerCase().includes(q)) ||
          m.cast?.some(c => c.name.toLowerCase().includes(q)) ||
          m.director?.toLowerCase().includes(q)
      );
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === 'release') return a.releaseOrder - b.releaseOrder;
      if (sortBy === 'chronological') {
        const orderA = a.chronologicalOrder ?? a.mcuChronologyOrder ?? 999;
        const orderB = b.chronologicalOrder ?? b.mcuChronologyOrder ?? 999;
        return orderA - orderB;
      }
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

    return result;
  }, [movies, activeCategory, selectedStudio, selectedEra, searchQuery, sortBy]);

  // Tab counts
  const counts = useMemo(() => {
    const valid = movies.filter(isMarvelContent);
    return {
      all: valid.length,
      mcu: valid.filter(m => m.isMcu && m.movieType !== 'short' && !m.id.startsWith('one-shot-')).length,
      other: valid.filter(m => !m.isMcu && !m.isAnimation && m.movieType !== 'short' && !m.id.startsWith('one-shot-')).length,
      animation: valid.filter(m => m.isAnimation || m.movieType === 'animation' || m.studioId === 'marvel-animation').length,
      oneshots: valid.filter(m => m.movieType === 'short' || m.movieType === 'tv-movie' || m.movieType === 'special' || m.id.startsWith('one-shot-') || m.id.includes('hulk-returns') || m.id.includes('trial-of-the-incredible-hulk') || m.id.includes('death-of-the-incredible-hulk') || m.id === 'werewolf-by-night' || m.id === 'gotg-holiday-special').length,
      hulk: valid.filter(m => m.franchise?.includes('Hulk') || m.id.includes('hulk')).length,
      sony: valid.filter(m => m.studioId === 'sony-pictures' || m.franchise?.includes('Spider-Man') || m.franchise?.includes('Venom') || m.franchise?.includes('Spider-Verse')).length,
      xmen: valid.filter(m => m.franchise?.includes('X-Men') || m.franchise?.includes('Wolverine') || m.franchise?.includes('Deadpool') || m.id === 'generation-x-1996').length,
      fantasticFour: valid.filter(m => m.franchise?.includes('Fantastic Four')).length,
      bladeGhost: valid.filter(m => m.franchise?.includes('Blade') || m.franchise?.includes('Ghost Rider')).length,
      upcoming: valid.filter(m => m.isUpcoming || m.releaseStatus === 'upcoming').length
    };
  }, [movies]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Film className="w-4 h-4 text-red-500" />
              <span>THE DEFINITIVE MARVEL MOVIE ARCHIVE</span>
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-3">
              Marvel Movies
              <span className="text-xs px-2.5 py-1 rounded-full bg-red-950/80 border border-red-700/60 font-mono text-red-400 font-bold">
                {filteredMovies.length} TITLES
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Complete catalog of feature-length films based on Marvel Comics characters across Marvel Studios, Sony Pictures, 20th Century Fox, New Line, Universal, and Lionsgate.
            </p>
          </div>

          {/* Controls: Search, View Mode, Sort */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, heroes, actors..."
                className="w-40 sm:w-56 rounded-xl border border-white/10 bg-slate-900/90 pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
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

            {/* View Mode Toggle (Grid vs Timeline) */}
            <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`p-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Chronological Timeline View"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-white focus:border-red-600 focus:outline-none cursor-pointer"
              >
                <option value="release">Release Order (1986–Present)</option>
                <option value="chronological">Story Chronology</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Optional Connection Warning Banner */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/40 border border-amber-600/30 text-amber-300 text-xs font-mono">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Category Pills (Section 8 Requirements) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/5 pb-4">
          {[
            { id: 'all', label: 'All Marvel Movies', count: counts.all, icon: Film },
            { id: 'mcu', label: 'MCU Movies', count: counts.mcu, icon: Clapperboard },
            { id: 'other', label: 'Other Marvel Movies', count: counts.other, icon: Calendar },
            { id: 'animation', label: 'Animated Marvel Movies', count: counts.animation, icon: Sparkles },
            { id: 'oneshots', label: 'TV Movies & Specials', count: counts.oneshots, icon: Video },
            { id: 'hulk', label: 'Hulk Films', count: counts.hulk, icon: Shield },
            { id: 'sony', label: 'Sony Marvel', count: counts.sony, icon: Sparkles },
            { id: 'x-men', label: 'X-Men & Mutants', count: counts.xmen, icon: Shield },
            { id: 'fantastic-four', label: 'Fantastic Four', count: counts.fantasticFour, icon: Globe },
            { id: 'blade-ghost-rider', label: 'Blade & Ghost Rider', count: counts.bladeGhost, icon: Sparkles },
            { id: 'upcoming', label: 'Upcoming', count: counts.upcoming, icon: Clock }
          ].map(tab => {
            const isActive = activeCategory === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as MovieCategory)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                    : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Studio and Era Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Studio Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold mr-1">
              Studio:
            </span>
            {STUDIOS.map(s => {
              const isActive = selectedStudio === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStudio(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-white/15 text-white border-white/40 shadow-sm'
                      : 'bg-slate-900/60 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Era Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none shrink-0">
            <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold mr-1">
              Era:
            </span>
            {ERAS.map(era => {
              const isActive = selectedEra === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(era.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-slate-900/60 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {era.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode 1: Poster Grid View */}
        {viewMode === 'grid' && (
          <>
            {filteredMovies.length === 0 && isLoading ? (
              <GridSkeleton count={10} />
            ) : filteredMovies.length === 0 ? (
              <div className="py-20 text-center text-gray-500 font-mono text-sm bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
                <Film className="w-8 h-8 mx-auto text-gray-600" />
                <p>No Marvel movies found matching the selected filters.</p>
                {(activeCategory !== 'all' || selectedStudio !== 'all' || selectedEra !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSelectedStudio('all');
                      setSelectedEra('all');
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
                {filteredMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={onSelectMovie}
                    onWatch={onWatchMovie}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* View Mode 2: Master Release Timeline View */}
        {viewMode === 'timeline' && (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-red-600/40 space-y-6">
            {filteredMovies.map((movie, index) => {
              const isPlayable = Boolean(movie.watchConfig?.tmdbId);
              return (
                <div
                  key={`timeline-movie-${movie.id}`}
                  onClick={() => onSelectMovie(movie)}
                  className="group relative cursor-pointer p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/80 hover:border-red-600/60 hover:bg-slate-900 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-lg"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-6 h-4 w-4 rounded-full border-2 border-red-500 bg-slate-950 shadow-[0_0_8px_#E62429]" />

                  {/* Poster */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={movie.poster || FALLBACK_POSTER}
                      alt={movie.title}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_POSTER;
                      }}
                      className="h-28 w-20 rounded-lg object-cover border border-white/10 group-hover:scale-105 transition-transform bg-slate-950 shadow-md"
                    />
                    {movie.rating && (
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] font-mono font-bold text-amber-400 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-red-500 font-bold">
                        #{movie.releaseOrder}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-gray-200 font-semibold">
                        {movie.studio || 'Marvel'}
                      </span>
                      {movie.universeDesignation && (
                        <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-mono text-cyan-300 font-bold">
                          {movie.universeDesignation}
                        </span>
                      )}
                      {movie.isMcu && movie.phase && <PhaseBadge phase={movie.phase} />}
                      <span className="text-xs font-mono text-gray-400">
                        {movie.releaseDate}
                      </span>
                      {movie.runtime && (
                        <span className="text-[10px] font-mono text-gray-500">
                          {movie.runtime} min
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate">
                      {movie.title}
                    </h3>

                    {movie.tagline && (
                      <p className="text-[11px] font-mono text-gray-400 line-clamp-1 italic">
                        &quot;{movie.tagline}&quot;
                      </p>
                    )}

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {movie.overview}
                    </p>

                    {movie.cast && movie.cast.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400 pt-1">
                        <span className="text-gray-500 font-mono">Cast:</span>
                        {movie.cast.slice(0, 3).map((c, i) => (
                          <span key={i} className="text-gray-300">
                            <span className="font-medium text-white">{c.name}</span>
                            <span className="text-gray-500 text-[10px] ml-1">({c.role})</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="self-stretch sm:self-center flex sm:flex-col items-center justify-end gap-2 pt-2 sm:pt-0">
                    {isPlayable && !movie.isUpcoming ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWatchMovie(movie);
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
                          onSelectMovie(movie);
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 rounded-xl bg-slate-800 border border-white/10 px-3.5 py-2 text-[11px] font-mono font-bold text-orange-400 uppercase tracking-wider hover:bg-slate-700 transition-all"
                      >
                        <span>UPCOMING</span>
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMovie(movie);
                      }}
                      className="flex items-center justify-center p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
                      title="Inspect Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
};
