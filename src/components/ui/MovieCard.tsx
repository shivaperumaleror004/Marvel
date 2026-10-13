import React, { useState } from 'react';
import { Play, Plus, Check, Clock, Film } from 'lucide-react';
import { Movie } from '../../types';
import { PhaseBadge } from './PhaseBadge';
import { RatingBadge } from './RatingBadge';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useWatchProgress } from '../../hooks/useWatchProgress';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onWatch?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect, onWatch }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { getProgress } = useWatchProgress();
  const [imgError, setImgError] = useState(false);

  const isSaved = isInWatchlist(movie.id);
  const progress = getProgress(movie.id);

  const fallbackPoster = 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop';

  return (
    <div
      onClick={() => onSelect(movie)}
      className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-600/60 hover:shadow-[0_12px_30px_rgba(230,36,41,0.25)]"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={imgError ? fallbackPoster : movie.poster}
          alt={movie.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Phase & Rating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10">
          <PhaseBadge phase={movie.phase} />
          {movie.rating && <RatingBadge rating={movie.rating} />}
        </div>

        {/* Watch Progress Bar */}
        {progress && progress.percentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60 z-20">
            <div
              className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_8px_#E62429]"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        )}

        {/* Hover Dark Overlay & Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4 z-10">
          <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            <h3 className="font-bold text-white text-base leading-tight line-clamp-1 group-hover:text-red-400 transition-colors">
              {movie.title}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-xs font-mono text-gray-300">
              <span>{movie.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-500" />
                {movie.runtime}m
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onWatch) onWatch(movie);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:bg-red-500 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>WATCH</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(movie.id);
                }}
                className={`p-2 rounded-lg border transition-all active:scale-95 ${
                  isSaved
                    ? 'bg-red-950/80 border-red-600 text-red-400'
                    : 'bg-black/60 border-white/20 text-gray-300 hover:border-white/50'
                }`}
                title={isSaved ? 'Remove from My List' : 'Add to My List'}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
