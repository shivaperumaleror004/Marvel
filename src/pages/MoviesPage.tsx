import React, { useState, useMemo } from 'react';
import { Film, Filter, ArrowUpDown } from 'lucide-react';
import { MOVIES_DATA } from '../data/movies';
import { Movie, Phase } from '../types';
import { MovieCard } from '../components/ui/MovieCard';
import { PageTransition } from '../components/ui/PageTransition';
import { isMarvelContent } from '../utils/marvelWhitelist';

interface MoviesPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
}

const PHASES = ['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'];
type SortOption = 'release' | 'chronological' | 'alphabetical' | 'rating';

export const MoviesPage: React.FC<MoviesPageProps> = ({ onSelectMovie, onWatchMovie }) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('release');

  const filteredMovies = useMemo(() => {
    let result = MOVIES_DATA.filter(isMarvelContent);

    if (selectedPhase !== 'All') {
      result = result.filter(m => m.phase === selectedPhase);
    }

    result.sort((a, b) => {
      if (sortBy === 'release') return a.releaseOrder - b.releaseOrder;
      if (sortBy === 'chronological') return a.chronologicalOrder - b.chronologicalOrder;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [selectedPhase, sortBy]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Film className="w-4 h-4" />
              <span>THE CINEMATIC ARCHIVE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Marvel Movies
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Showing {filteredMovies.length} MCU blockbuster films across phases.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-red-500" />
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-white focus:border-red-600 focus:outline-none"
            >
              <option value="release">Release Order</option>
              <option value="chronological">Chronological Order</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Phase Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PHASES.map(phase => {
            const isActive = selectedPhase === phase;
            return (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
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

        {/* Poster Grid */}
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
      </div>
    </PageTransition>
  );
};
