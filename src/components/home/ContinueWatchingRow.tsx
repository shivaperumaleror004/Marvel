import React from 'react';
import { Play, RotateCcw, Clock, X } from 'lucide-react';
import { useWatchProgress } from '../../hooks/useWatchProgress';
import { WatchProgress } from '../../types';
import { FALLBACK_POSTER } from '../../services/tmdb';

interface ContinueWatchingRowProps {
  onResume: (progress: WatchProgress) => void;
}

export const ContinueWatchingRow: React.FC<ContinueWatchingRowProps> = ({ onResume }) => {
  const { continueWatching, removeFromHistory } = useWatchProgress();

  if (continueWatching.length === 0) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="py-6">
      <div className="flex items-center gap-2 mb-4 px-4 sm:px-6 lg:px-8">
        <div className="h-4 w-1 bg-red-600 rounded-full shadow-[0_0_8px_#E62429]" />
        <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
          Continue Watching
        </h2>
        <span className="text-xs font-mono text-gray-400">({continueWatching.length})</span>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 carousel-mask scrollbar-none">
        {continueWatching.map(item => (
          <div
            key={item.id}
            onClick={() => onResume(item)}
            className="group relative flex-shrink-0 w-72 sm:w-80 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:shadow-[0_10px_25px_rgba(230,36,41,0.25)]"
          >
            {/* Backdrop / Poster Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={item.backdrop || item.poster || FALLBACK_POSTER}
                alt={item.title}
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Big Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="p-3.5 rounded-full bg-red-600 text-white shadow-[0_0_20px_rgba(230,36,41,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Dismiss / Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(item.id);
                }}
                title="Remove from history"
                className="absolute top-2.5 left-2.5 p-1 rounded-full bg-black/70 hover:bg-red-600 text-gray-400 hover:text-white transition-colors z-20 opacity-0 group-hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Progress Bar Badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[10px] font-mono text-red-400 font-bold z-10">
                {item.percentage}% WATCHED
              </div>
            </div>

            {/* Title & Progress info */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-white text-sm truncate group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3 text-red-500" />
                  {formatTime(item.currentTime)}
                </span>
              </div>

              {item.subtitle && (
                <p className="text-xs font-mono text-red-400/90 truncate">{item.subtitle}</p>
              )}

              {/* Percentage Bar */}
              <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full shadow-[0_0_8px_#E62429] transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-red-500 group-hover:text-white transition-colors">
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Resume from {formatTime(item.currentTime)}
                </span>
                <span>▶</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
