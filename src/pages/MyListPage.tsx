import React from 'react';
import { Bookmark, Film, Tv, Shield, Play, Trash2 } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';
import { useWatchProgress } from '../hooks/useWatchProgress';
import { useMedia } from '../context/MediaContext';
import { Movie, Series, WatchProgress } from '../types';
import { MovieCard } from '../components/ui/MovieCard';
import { SeriesCard } from '../components/ui/SeriesCard';
import { ContinueWatchingRow } from '../components/home/ContinueWatchingRow';
import { PageTransition } from '../components/ui/PageTransition';
import { isMarvelContent } from '../utils/marvelWhitelist';

interface MyListPageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
  onResumeProgress: (progress: WatchProgress) => void;
  onExploreCatalogue: () => void;
}

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
  const { continueWatching } = useWatchProgress();

  const savedMovies = movies.filter(m => isMarvelContent(m) && watchlist.includes(m.id));
  const savedSeries = series.filter(s => isMarvelContent(s) && watchlist.includes(s.id));

  const isEmpty = savedMovies.length === 0 && savedSeries.length === 0 && continueWatching.length === 0;

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Bookmark className="w-4 h-4" />
              <span>PERSONAL MARVEL VAULT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              My Watchlist
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Your saved MCU titles and active viewing progress.
            </p>
          </div>

          {!isEmpty && (
            <button
              onClick={clearWatchlist}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-gray-400 hover:text-red-400 hover:border-red-900 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR MY LIST</span>
            </button>
          )}
        </div>

        {isEmpty ? (
          /* Empty State */
          <div className="py-20 text-center space-y-4 rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-8">
            <div className="inline-flex p-5 rounded-full bg-red-950/60 border border-red-600/40 text-red-500 shadow-[0_0_30px_rgba(230,36,41,0.3)]">
              <Bookmark className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase">Your collection is empty</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              Add movies and series to build your personal Marvel library and pick up right where you left off.
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
            {/* Continue Watching Row */}
            <ContinueWatchingRow onResume={onResumeProgress} />

            {/* My Movies Section */}
            {savedMovies.length > 0 && (
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
            {savedSeries.length > 0 && (
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
