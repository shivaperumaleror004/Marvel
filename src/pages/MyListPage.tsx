import React, { useState } from 'react';
import { Bookmark, Film, Tv, Play, Trash2, Clock, RotateCcw, X, History, CheckCircle2 } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';
import { useWatchProgress } from '../hooks/useWatchProgress';
import { useMedia } from '../context/MediaContext';
import { Movie, Series, WatchProgress } from '../types';
import { MovieCard } from '../components/ui/MovieCard';
import { SeriesCard } from '../components/ui/SeriesCard';
import { ContinueWatchingRow } from '../components/home/ContinueWatchingRow';
import { PageTransition } from '../components/ui/PageTransition';
import { isMarvelContent } from '../utils/marvelWhitelist';
import { FALLBACK_POSTER } from '../services/tmdb';
import { formatExactTime } from '../utils/timeFormat';

interface MyListPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
  onResumeProgress: (progress: WatchProgress) => void;
  onExploreCatalogue: () => void;
}

type TabOption = 'all' | 'history' | 'movies' | 'series';

export const MyListPage: React.FC<MyListPageProps> = ({
  onSelectMovie,
  onWatchMovie,
  onSelectSeries,
  onWatchSeries,
  onResumeProgress,
  onExploreCatalogue
}) => {
  const { movies, series } = useMedia();
  const { watchlist, clearWatchlist } = useWatchlist();
  const { continueWatching, watchHistory, removeFromHistory, clearHistory } = useWatchProgress();

  const [activeTab, setActiveTab] = useState<TabOption>('all');

  const savedMovies = movies.filter(m => isMarvelContent(m) && watchlist.includes(m.id));
  const savedSeries = series.filter(s => isMarvelContent(s) && watchlist.includes(s.id));

  const isEmpty = savedMovies.length === 0 && savedSeries.length === 0 && watchHistory.length === 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffHours < 48) return 'Yesterday';
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Bookmark className="w-4 h-4" />
              <span>PERSONAL MARVEL VAULT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              My Watchlist & History
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Your actual viewing history, in-progress titles, and saved library.
            </p>
          </div>

          {!isEmpty && (
            <div className="flex flex-wrap items-center gap-2">
              {watchHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-gray-400 hover:text-red-400 hover:border-red-900 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>CLEAR HISTORY</span>
                </button>
              )}
              {(savedMovies.length > 0 || savedSeries.length > 0) && (
                <button
                  onClick={clearWatchlist}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-gray-400 hover:text-red-400 hover:border-red-900 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>CLEAR SAVED</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        {!isEmpty && (
          <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                activeTab === 'all'
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                  : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>All ({watchHistory.length + savedMovies.length + savedSeries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                activeTab === 'history'
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                  : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Watch History ({watchHistory.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('movies')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                activeTab === 'movies'
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                  : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Saved Movies ({savedMovies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('series')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                activeTab === 'series'
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                  : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Saved Series ({savedSeries.length})</span>
            </button>
          </div>
        )}

        {isEmpty ? (
          /* Empty State */
          <div className="py-20 text-center space-y-4 rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-8">
            <div className="inline-flex p-5 rounded-full bg-red-950/60 border border-red-600/40 text-red-500 shadow-[0_0_30px_rgba(230,36,41,0.3)]">
              <Bookmark className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase">Your watch history is empty</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              When you watch Marvel movies or series, they will automatically appear here with your watch progress so you can pick up right where you left off.
            </p>
            <div className="pt-4">
              <button
                onClick={onExploreCatalogue}
                className="flex items-center gap-2 mx-auto rounded-xl bg-red-600 px-6 py-3 text-xs font-bold text-white uppercase tracking-wider shadow-lg hover:bg-red-500 transition-all active:scale-95"
              >
                <span>EXPLORE MARVEL ARCHIVE</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Continue Watching shelf (shown on 'all' tab) */}
            {activeTab === 'all' && <ContinueWatchingRow onResume={onResumeProgress} />}

            {/* Watching History Section */}
            {(activeTab === 'all' || activeTab === 'history') && watchHistory.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-red-500" />
                    <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
                      Watch History ({watchHistory.length})
                    </h2>
                  </div>
                  {activeTab === 'all' && (
                    <button
                      onClick={() => setActiveTab('history')}
                      className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                    >
                      View All History →
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {watchHistory.map(item => (
                    <div
                      key={item.id}
                      onClick={() => onResumeProgress(item)}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:shadow-[0_10px_25px_rgba(230,36,41,0.25)]"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                        <img
                          src={item.backdrop || item.poster || FALLBACK_POSTER}
                          alt={item.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* Hover Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <div className="p-3 rounded-full bg-red-600 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Remove from history button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(item.id);
                          }}
                          title="Remove from history"
                          className="absolute top-2 left-2 p-1 rounded-full bg-black/70 hover:bg-red-600 text-gray-400 hover:text-white transition-colors z-20 opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        {/* Badge: Watched Status */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[10px] font-mono font-bold z-10 flex items-center gap-1">
                          {item.percentage >= 90 ? (
                            <span className="text-emerald-400 flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" /> COMPLETED
                            </span>
                          ) : (
                            <span className="text-red-400">{item.percentage}% WATCHED</span>
                          )}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h3 className="font-bold text-white text-sm truncate group-hover:text-red-400 transition-colors">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-xs font-mono text-red-400/90 truncate mt-0.5">{item.subtitle}</p>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1 pt-1">
                          <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-600 rounded-full shadow-[0_0_8px_#E62429] transition-all"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                            <span>{formatExactTime(item.currentTime)} / {formatExactTime(item.duration)}</span>
                            <span>{formatDate(item.lastWatched)}</span>
                          </div>
                        </div>

                        {/* Action link */}
                        <div className="pt-1 flex items-center justify-between text-xs font-bold text-red-500 group-hover:text-white transition-colors">
                          <span className="flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" />
                            {item.percentage >= 90 ? 'Watch Again' : `Resume (${item.percentage}%)`}
                          </span>
                          <span>▶</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Movies Section */}
            {(activeTab === 'all' || activeTab === 'movies') && savedMovies.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
                    My Saved Movies ({savedMovies.length})
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                  {savedMovies.map(movie => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelect={onSelectMovie}
                      onWatch={onWatchMovie}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* My Series Section */}
            {(activeTab === 'all' || activeTab === 'series') && savedSeries.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
                    My Saved Series ({savedSeries.length})
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                  {savedSeries.map(series => (
                    <SeriesCard
                      key={series.id}
                      series={series}
                      onSelect={onSelectSeries}
                      onWatch={onWatchSeries}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
};
