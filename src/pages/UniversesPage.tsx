import React, { useState, useMemo } from 'react';
import { Compass, ArrowUpDown, Loader2, Search, Film, Tv, Globe, Shield, Sparkles } from 'lucide-react';
import { Movie, Series, UniverseId } from '../types';
import { UNIVERSES_DATA } from '../data/multiverse';
import { MovieCard } from '../components/ui/MovieCard';
import { SeriesCard } from '../components/ui/SeriesCard';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import { GridSkeleton } from '../components/ui/SkeletonLoader';

interface UniversesPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
}

type SortOption = 'release' | 'alphabetical' | 'rating';

export const UniversesPage: React.FC<UniversesPageProps> = ({
  onSelectMovie,
  onWatchMovie,
  onSelectSeries,
  onWatchSeries,
}) => {
  const { movies, series: seriesList, isLoading } = useMedia();
  const [selectedUniverseId, setSelectedUniverseId] = useState<UniverseId>('earth-616');
  const [sortBy, setSortBy] = useState<SortOption>('release');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeUniverse = useMemo(() => {
    return UNIVERSES_DATA.find(u => u.id === selectedUniverseId) || UNIVERSES_DATA[0];
  }, [selectedUniverseId]);

  // Match movie to universe
  const isMovieInUniverse = (movie: Movie, universeId: UniverseId): boolean => {
    if (movie.universeId === universeId) return true;
    switch (universeId) {
      case 'earth-616':
        return Boolean(movie.isMcu === true || movie.phase?.startsWith('Phase'));
      case 'earth-96283':
        return movie.id === 'spider-man' || movie.id === 'spider-man-2' || movie.id === 'spider-man-3';
      case 'earth-120703':
        return movie.id === 'the-amazing-spider-man' || movie.id === 'the-amazing-spider-man-2';
      case 'earth-688':
        return ['venom', 'venom-let-there-be-carnage', 'venom-the-last-dance', 'morbius', 'madame-web', 'kraven-the-hunter'].includes(movie.id);
      case 'earth-10005':
        return ['x-men', 'x2-x-men-united', 'x-men-the-last-stand', 'x-men-origins-wolverine', 'the-wolverine', 'x-men-days-of-future-past'].includes(movie.id);
      case 'earth-trn414':
        return ['x-men-first-class', 'x-men-apocalypse', 'dark-phoenix', 'logan', 'deadpool', 'deadpool-2', 'the-new-mutants'].includes(movie.id);
      case 'earth-121698':
        return ['fantastic-four-2005', 'fantastic-four-rise-of-the-silver-surfer'].includes(movie.id);
      case 'earth-26320':
        return ['blade', 'blade-ii', 'blade-trinity'].includes(movie.id);
      case 'earth-sv':
        return movie.franchise === 'Spider-Verse' || movie.id.includes('spider-verse');
      case 'earth-92131':
        return false;
      case 'marvel-legacy-tv':
        return false;
      default:
        return false;
    }
  };

  // Match series to universe
  const isSeriesInUniverse = (series: Series, universeId: UniverseId): boolean => {
    if (series.universeId === universeId) return true;
    switch (universeId) {
      case 'earth-616':
        return series.phase?.startsWith('Phase') || series.phase === 'Defenders';
      case 'earth-92131':
        return series.id === 'x-men-97' || series.id === 'x-men-the-animated-series' || series.id === 'spider-man-the-animated-series';
      case 'marvel-legacy-tv':
        return series.isLegacy === true || series.phase === 'Marvel Television';
      default:
        return false;
    }
  };

  const universeMovies = useMemo(() => {
    return movies.filter(m => isMovieInUniverse(m, selectedUniverseId));
  }, [movies, selectedUniverseId]);

  const universeSeries = useMemo(() => {
    return seriesList.filter(s => isSeriesInUniverse(s, selectedUniverseId));
  }, [seriesList, selectedUniverseId]);

  const filteredItems = useMemo(() => {
    type MixedItem = { type: 'movie'; data: Movie } | { type: 'series'; data: Series };
    let items: MixedItem[] = [
      ...universeMovies.map(m => ({ type: 'movie' as const, data: m })),
      ...universeSeries.map(s => ({ type: 'series' as const, data: s }))
    ];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(i => {
        return (
          i.data.title.toLowerCase().includes(q) ||
          i.data.characters?.some(c => c.toLowerCase().includes(q))
        );
      });
    }

    items.sort((a, b) => {
      if (sortBy === 'release') return a.data.releaseOrder - b.data.releaseOrder;
      if (sortBy === 'alphabetical') return a.data.title.localeCompare(b.data.title);
      if (sortBy === 'rating') return (b.data.rating || 0) - (a.data.rating || 0);
      return 0;
    });

    return items;
  }, [universeMovies, universeSeries, searchQuery, sortBy]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>THE MARVEL MULTIVERSE MAP</span>
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Universes & Realities
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Navigate the infinite branches of the Marvel Multiverse. Distinct Earth designations, divergent timelines, and separate cinematic continuities documented with canonical precision.
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
                placeholder="Search reality titles..."
                className="w-44 sm:w-56 rounded-xl border border-white/10 bg-slate-900/90 pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
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
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                SORT:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                <option value="release">Release Order</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Universe Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {UNIVERSES_DATA.map(univ => {
            const isActive = selectedUniverseId === univ.id;
            return (
              <button
                key={univ.id}
                onClick={() => {
                  setSelectedUniverseId(univ.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{univ.designation}</span>
              </button>
            );
          })}
        </div>

        {/* Universe Lore Spotlight Card */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-600/70 text-xs font-mono font-black text-cyan-300 tracking-wider uppercase">
                  {activeUniverse.designation}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {activeUniverse.primaryStudio} • {universeMovies.length + universeSeries.length} Logged Entries
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {activeUniverse.name}
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                {activeUniverse.description}
              </p>

              {/* Key Heroes */}
              {activeUniverse.keyHeroes && activeUniverse.keyHeroes.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs font-mono text-cyan-400 mr-1 uppercase font-semibold">
                    Inhabitants & Heroes:
                  </span>
                  {activeUniverse.keyHeroes.map(hero => (
                    <span
                      key={hero}
                      className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/40 text-[11px] font-mono text-cyan-200"
                    >
                      {hero}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Metrics */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              <div className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-center min-w-[120px]">
                <div className="text-2xl font-black text-cyan-400 font-mono">{universeMovies.length}</div>
                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Movies</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-center min-w-[120px]">
                <div className="text-2xl font-black text-cyan-400 font-mono">{universeSeries.length}</div>
                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Series</div>
              </div>
            </div>
          </div>
        </div>

        {/* Titles Grid */}
        {filteredItems.length === 0 && isLoading ? (
          <GridSkeleton count={10} />
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-mono text-sm bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
            <Globe className="w-8 h-8 mx-auto text-gray-600" />
            <p>No titles currently indexed for reality {activeUniverse.designation}.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 underline"
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
                    key={`univ-movie-${item.data.id}`}
                    movie={item.data}
                    onSelect={onSelectMovie}
                    onWatch={onWatchMovie}
                  />
                );
              } else {
                return (
                  <SeriesCard
                    key={`univ-series-${item.data.id}`}
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
