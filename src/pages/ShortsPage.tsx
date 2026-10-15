import React, { useState, useMemo } from 'react';
import {
  Film,
  Sparkles,
  Search,
  Clapperboard,
  Tv,
  Clock,
  Shield,
  Star,
  Play,
  Info
} from 'lucide-react';
import { Movie, Series } from '../types';
import { MovieCard } from '../components/ui/MovieCard';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import { isMarvelContent } from '../utils/marvelWhitelist';
import { GridSkeleton } from '../components/ui/SkeletonLoader';

interface ShortsPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectSeries?: (series: Series) => void;
  onWatchSeries?: (series: Series) => void;
}

type ShortCategory =
  | 'all'
  | 'one-shot'
  | 'special-presentation'
  | 'short-film'
  | 'television-special';

type SortOption = 'release' | 'rating' | 'alphabetical' | 'duration';

const CATEGORIES: { id: ShortCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Shorts & Specials', icon: Clapperboard },
  { id: 'one-shot', label: 'Marvel One-Shots', icon: Sparkles },
  { id: 'special-presentation', label: 'Special Presentations', icon: Film },
  { id: 'short-film', label: 'Short Films', icon: Film },
  { id: 'television-special', label: 'Television Specials', icon: Tv }
];

export const ShortsPage: React.FC<ShortsPageProps> = ({
  onSelectMovie,
  onWatchMovie
}) => {
  const { movies, isLoading } = useMedia();
  const [activeCategory, setActiveCategory] = useState<ShortCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('release');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect all shorts, specials, and one-shots
  const allShorts = useMemo(() => {
    return movies.filter(m => {
      if (!isMarvelContent(m)) return false;
      return (
        m.movieType === 'short' ||
        m.movieType === 'special' ||
        m.movieType === 'tv-movie' ||
        m.mediaSubtype === 'one-shot' ||
        m.mediaSubtype === 'special-presentation' ||
        m.mediaSubtype === 'short-film' ||
        m.mediaSubtype === 'television-special' ||
        m.id.startsWith('one-shot-') ||
        m.id === 'werewolf-by-night' ||
        m.id === 'gotg-holiday-special' ||
        m.id.includes('hulk-returns') ||
        m.id.includes('trial-of-the-incredible-hulk') ||
        m.id.includes('death-of-the-incredible-hulk')
      );
    });
  }, [movies]);

  const filteredShorts = useMemo(() => {
    let result = [...allShorts];

    // Category filter
    if (activeCategory === 'one-shot') {
      result = result.filter(
        m => m.mediaSubtype === 'one-shot' || m.id.startsWith('one-shot-') || m.franchise === 'Marvel One-Shots'
      );
    } else if (activeCategory === 'special-presentation') {
      result = result.filter(
        m =>
          m.mediaSubtype === 'special-presentation' ||
          m.id === 'werewolf-by-night' ||
          m.id === 'gotg-holiday-special'
      );
    } else if (activeCategory === 'short-film') {
      result = result.filter(
        m =>
          m.mediaSubtype === 'short-film' ||
          m.id.startsWith('team-') ||
          m.id.includes('no-good-deed') ||
          m.id.includes('one-last-kill')
      );
    } else if (activeCategory === 'television-special') {
      result = result.filter(
        m =>
          m.mediaSubtype === 'television-special' ||
          m.movieType === 'tv-movie' ||
          m.id.includes('hulk-returns') ||
          m.id.includes('trial-of-the-incredible-hulk') ||
          m.id.includes('death-of-the-incredible-hulk')
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        m =>
          m.title.toLowerCase().includes(q) ||
          m.overview.toLowerCase().includes(q) ||
          m.characters?.some(c => c.toLowerCase().includes(q)) ||
          m.cast?.some(c => c.name.toLowerCase().includes(q)) ||
          m.director?.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'release') return a.releaseOrder - b.releaseOrder;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'duration') return (a.runtime || 0) - (b.runtime || 0);
      return 0;
    });

    return result;
  }, [allShorts, activeCategory, searchQuery, sortBy]);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: allShorts.length,
      oneShot: allShorts.filter(
        m => m.mediaSubtype === 'one-shot' || m.id.startsWith('one-shot-') || m.franchise === 'Marvel One-Shots'
      ).length,
      special: allShorts.filter(
        m => m.mediaSubtype === 'special-presentation' || m.id === 'werewolf-by-night' || m.id === 'gotg-holiday-special'
      ).length,
      shortFilm: allShorts.filter(
        m => m.mediaSubtype === 'short-film' || m.id.startsWith('team-') || m.id.includes('no-good-deed') || m.id.includes('one-last-kill')
      ).length,
      tvSpecial: allShorts.filter(
        m => m.mediaSubtype === 'television-special' || m.movieType === 'tv-movie' || m.id.includes('hulk-returns') || m.id.includes('trial-of-the-incredible-hulk') || m.id.includes('death-of-the-incredible-hulk')
      ).length
    };
  }, [allShorts]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>CANONICAL COMPACTS & SPECIALS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Shorts & Special Presentations
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Official Marvel Studios One-Shots, Special Presentations, mockumentary shorts, and television events that expand the Marvel Cinematic Universe and wider multiverse lore.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shorts & specials..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all' ? counts.all :
                cat.id === 'one-shot' ? counts.oneShot :
                cat.id === 'special-presentation' ? counts.special :
                cat.id === 'short-film' ? counts.shortFilm :
                counts.tvSpecial;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                    isActive
                      ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.35)]'
                      : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/40 text-white' : 'bg-white/10 text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 self-end sm:self-auto">
            <span>SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-900 border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-mono focus:border-red-600 focus:outline-none"
            >
              <option value="release">Release Order</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Runtime (Shortest)</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <GridSkeleton count={8} />
        ) : filteredShorts.length === 0 ? (
          <div className="py-24 text-center text-gray-500 font-mono text-sm bg-slate-900/30 rounded-2xl border border-white/5 space-y-3">
            <Clapperboard className="w-10 h-10 mx-auto text-gray-600" />
            <p>No shorts or special presentations found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs text-red-400 hover:text-red-300 underline font-mono"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredShorts.map(short => (
              <MovieCard
                key={short.id}
                movie={short}
                onSelect={onSelectMovie}
                onWatch={onWatchMovie}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ShortsPage;
