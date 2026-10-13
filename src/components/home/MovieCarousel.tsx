import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { Movie } from '../../types';
import { MovieCard } from '../ui/MovieCard';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  movies,
  onSelectMovie,
  onWatchMovie
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 bg-red-600 rounded-full shadow-[0_0_8px_#E62429]" />
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
            {title}
          </h2>
          <span className="text-xs font-mono text-gray-400">({movies.length})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-xl border border-white/10 bg-slate-900/80 text-gray-300 hover:text-white hover:border-red-600/50 transition-colors active:scale-95"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-xl border border-white/10 bg-slate-900/80 text-gray-300 hover:text-white hover:border-red-600/50 transition-colors active:scale-95"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scroll-smooth scrollbar-none"
      >
        {movies.map(movie => (
          <div key={movie.id} className="w-48 sm:w-56 flex-shrink-0">
            <MovieCard
              movie={movie}
              onSelect={onSelectMovie}
              onWatch={onWatchMovie}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
