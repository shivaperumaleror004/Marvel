import React, { useState } from 'react';
import { Play, RotateCcw, Clock, X, Sliders, Check } from 'lucide-react';
import { useWatchProgress } from '../../hooks/useWatchProgress';
import { WatchProgress } from '../../types';
import { FALLBACK_POSTER } from '../../services/tmdb';
import { formatExactTime, formatHumanDuration, formatRemainingTime, parseTimeToSeconds } from '../../utils/timeFormat';

interface ContinueWatchingRowProps {
  onResume: (progress: WatchProgress) => void;
}

export const ContinueWatchingRow: React.FC<ContinueWatchingRowProps> = ({ onResume }) => {
  const { continueWatching, removeFromHistory, updateProgress } = useWatchProgress();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customTimeInput, setCustomTimeInput] = useState<string>('');

  if (continueWatching.length === 0) return null;

  const handleSaveCustomTime = (item: WatchProgress) => {
    const parsed = parseTimeToSeconds(customTimeInput);
    if (parsed !== null && parsed >= 0) {
      const clamped = Math.min(item.duration, parsed);
      updateProgress({
        id: item.id,
        mediaId: item.mediaId,
        mediaType: item.mediaType,
        seriesId: item.seriesId,
        seasonNumber: item.seasonNumber,
        episodeNumber: item.episodeNumber,
        title: item.title,
        subtitle: item.subtitle,
        currentTime: clamped,
        duration: item.duration,
        poster: item.poster,
        backdrop: item.backdrop
      });
    }
    setEditingId(null);
    setCustomTimeInput('');
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
            onClick={() => {
              if (editingId !== item.id) {
                onResume(item);
              }
            }}
            className="group relative flex-shrink-0 w-80 sm:w-96 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:shadow-[0_10px_25px_rgba(230,36,41,0.25)]"
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

              {/* Edit timestamp button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (editingId === item.id) {
                    setEditingId(null);
                  } else {
                    setEditingId(item.id);
                    setCustomTimeInput(formatExactTime(item.currentTime));
                  }
                }}
                title="Adjust exact watched time"
                className="absolute top-2.5 left-9 p-1 rounded-full bg-black/70 hover:bg-red-600 text-gray-400 hover:text-white transition-colors z-20 opacity-0 group-hover:opacity-100"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>

              {/* Progress Bar Badge with exact % and human-readable time */}
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/85 border border-white/20 text-[11px] font-mono font-bold z-10 flex items-center gap-1.5 shadow-md">
                <span className="text-red-400">{item.percentage}% WATCHED</span>
                <span className="text-gray-400 text-[10px]">({formatHumanDuration(item.currentTime)})</span>
              </div>
            </div>

            {/* Title & Exact Progress info */}
            <div className="p-4 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-sm truncate group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs font-mono text-red-400/90 truncate mt-0.5">{item.subtitle}</p>
                  )}
                </div>

                {/* Exact time: HH:MM:SS / HH:MM:SS */}
                <span className="text-[11px] font-mono text-gray-300 flex items-center gap-1 flex-shrink-0 bg-black/50 px-2 py-0.5 rounded border border-white/10">
                  <Clock className="w-3 h-3 text-red-500" />
                  <span>{formatExactTime(item.currentTime)}</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-gray-400">{formatExactTime(item.duration)}</span>
                </span>
              </div>

              {/* Inline Quick Time Editor Popover */}
              {editingId === item.id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-lg bg-black/90 border border-red-600/60 space-y-2 animate-fadeIn text-xs"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-300">
                    <span>SET EXACT TIMESTAMP:</span>
                    <span className="text-red-400 font-bold">{formatRemainingTime(item.currentTime, item.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customTimeInput}
                      onChange={(e) => setCustomTimeInput(e.target.value)}
                      placeholder="HH:MM:SS (e.g. 00:45:00)"
                      className="flex-1 bg-slate-900 border border-white/20 rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                    />
                    <button
                      onClick={() => handleSaveCustomTime(item)}
                      className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center gap-1 shadow"
                    >
                      <Check className="w-3 h-3" />
                      SAVE
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Percentage Bar */}
              <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full shadow-[0_0_8px_#E62429] transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* Bottom Resume Details Bar */}
              <div className="pt-1 flex items-center justify-between text-xs font-bold text-red-500 group-hover:text-white transition-colors">
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resume from {formatExactTime(item.currentTime)}</span>
                  <span className="text-gray-400 font-normal">({formatRemainingTime(item.currentTime, item.duration)})</span>
                </span>
                <span className="text-xs">▶</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
