import React, { useState } from 'react';
import { Play, Plus, Check, Star, Clock, Info } from 'lucide-react';
import { Movie } from '../../types';
import { PhaseBadge } from '../ui/PhaseBadge';
import { useWatchlist } from '../../hooks/useWatchlist';
import { FALLBACK_BACKDROP } from '../../services/tmdb';
import { createTitleSpecificBackdrop } from '../../utils/imageFallback';

interface HeroProps {
  movie: Movie;
  onWatch: (movie: Movie) => void;
  onSelect: (movie: Movie) => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onWatch, onSelect }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [imgLoaded, setImgLoaded] = useState(false);
  const isSaved = isInWatchlist(movie.id);

  return (
    <div className="relative min-h-[75vh] lg:min-h-[85vh] w-full overflow-hidden bg-slate-950 flex items-end pb-12 lg:pb-20">
      {/* Background Image with Dark Cinematic Gradient Overlay & Subtle Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdrop || createTitleSpecificBackdrop(movie.title)}
          alt={movie.title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = createTitleSpecificBackdrop(movie.title);
            setImgLoaded(true);
          }}
          className={`h-full w-full object-cover object-top transition-all duration-1000 transform scale-105 ${
            imgLoaded ? 'opacity-40 filter blur-none' : 'opacity-0 filter blur-lg'
          }`}
        />
        {/* Dark Vignette and Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
      </div>

      {/* Hero Content Aligned Left */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <PhaseBadge phase={movie.phase} />
            <span className="px-2 py-0.5 rounded bg-black/60 border border-white/20 text-xs font-mono text-gray-300">
              {movie.saga}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 border border-yellow-500/30 text-yellow-400 font-mono text-xs font-bold">
              <Star className="w-3 h-3 fill-current" />
              {movie.rating.toFixed(1)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase drop-shadow-2xl leading-none">
            {movie.title}
          </h1>

          {/* Tagline / Subtitle */}
          {movie.tagline && (
            <p className="text-base sm:text-xl font-semibold text-red-400 italic tracking-wide">
              "{movie.tagline}"
            </p>
          )}

          {/* Metadata Line */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-gray-300">
            <span>{movie.year}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
            <span>•</span>
            <div className="flex gap-1.5">
              {movie.genres.map(g => (
                <span key={g} className="text-gray-400">{g}</span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3 max-w-xl font-sans drop-shadow-md">
            {movie.overview}
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {movie.isUpcoming || movie.releaseStatus === 'upcoming' ? (
              <button
                onClick={() => onSelect(movie)}
                className="flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-6 py-3.5 text-sm font-black text-amber-300 uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all hover:bg-amber-500/30 hover:scale-105 active:scale-95"
              >
                <Clock className="w-5 h-5 text-amber-400" />
                <span>COMING SOON</span>
              </button>
            ) : (
              <button
                onClick={() => onWatch(movie)}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white uppercase tracking-wider shadow-[0_0_30px_rgba(230,36,41,0.5)] transition-all hover:bg-red-500 hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>WATCH NOW</span>
              </button>
            )}

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-bold transition-all active:scale-95 ${
                isSaved
                  ? 'bg-red-950/80 border-red-600 text-red-400 shadow-[0_0_15px_rgba(230,36,41,0.3)]'
                  : 'bg-black/60 border-white/20 text-gray-200 hover:border-white/50 hover:bg-white/10'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-5 h-5 text-red-400" />
                  <span>IN MY LIST</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>MY LIST</span>
                </>
              )}
            </button>

            <button
              onClick={() => onSelect(movie)}
              className="p-3.5 rounded-xl border border-white/10 bg-slate-900/80 text-gray-300 hover:text-white hover:border-white/30 transition-all active:scale-95"
              title="More Details"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
