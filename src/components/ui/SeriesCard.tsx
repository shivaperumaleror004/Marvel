import React, { useState } from 'react';
import { Play, Plus, Check, Tv } from 'lucide-react';
import { Series } from '../../types';
import { PhaseBadge } from './PhaseBadge';
import { RatingBadge } from './RatingBadge';
import { useWatchlist } from '../../hooks/useWatchlist';

interface SeriesCardProps {
  series: Series;
  onSelect: (series: Series) => void;
  onWatch?: (series: Series) => void;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ series, onSelect, onWatch }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [imgError, setImgError] = useState(false);

  const isSaved = isInWatchlist(series.id);

  React.useEffect(() => {
    setImgError(false);
  }, [series.poster]);

  const fallbackPoster = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop';
  const totalSeasons = series.seasons.length;

  return (
    <div
      onClick={() => onSelect(series)}
      className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-600/60 hover:shadow-[0_12px_30px_rgba(230,36,41,0.25)]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={imgError ? fallbackPoster : series.poster}
          alt={series.title}
          onError={() => setImgError(true)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10">
          <PhaseBadge phase={series.phase} />
          {series.rating && <RatingBadge rating={series.rating} />}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4 z-10">
          <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            <h3 className="font-bold text-white text-base leading-tight line-clamp-1 group-hover:text-red-400 transition-colors">
              {series.title}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-xs font-mono text-gray-300">
              <span>{series.releaseYear}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-red-400 font-semibold">
                <Tv className="w-3 h-3" />
                {totalSeasons} {totalSeasons === 1 ? 'Season' : 'Seasons'}
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {series.overview}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onWatch) onWatch(series);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:bg-red-500 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>EXPLORE</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(series.id);
                }}
                className={`p-2 rounded-lg border transition-all active:scale-95 ${
                  isSaved
                    ? 'bg-red-950/80 border-red-600 text-red-400'
                    : 'bg-black/60 border-white/20 text-gray-300 hover:border-white/50'
                }`}
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
