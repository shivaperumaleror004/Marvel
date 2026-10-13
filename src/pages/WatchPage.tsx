import React from 'react';
import { Film, Tv, Plus, Check } from 'lucide-react';
import { WatchPlayer } from '../components/player/WatchPlayer';
import type { Movie, Series, Episode } from '../types';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { useWatchlist } from '../hooks/useWatchlist';
import { PageTransition } from '../components/ui/PageTransition';

interface WatchPageProps {
  mediaType: 'movie' | 'series';
  movie?: Movie;
  series?: Series;
  episode?: Episode;
  onBack: () => void;
  onNavigateSettings: () => void;
  onSelectEpisode?: (series: Series, episode: Episode) => void;
}

export const WatchPage: React.FC<WatchPageProps> = ({
  mediaType,
  movie,
  series,
  episode,
  onBack,
  onNavigateSettings,
  onSelectEpisode
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const isMovie = mediaType === 'movie' && movie;
  const isSeries = mediaType === 'series' && series;

  const mediaIdForWatchlist = isMovie ? movie.id : (series ? series.id : '');
  const isSaved = isInWatchlist(mediaIdForWatchlist);

  const title = isMovie ? movie.title : series?.title || 'Marvel Title';
  const overview = isMovie ? movie.overview : (episode?.overview || series?.overview || '');

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Reusable WatchPlayer Component */}
        <WatchPlayer
          mediaType={mediaType}
          movie={movie}
          series={series}
          episode={episode}
          onBack={onBack}
          onNavigateSettings={onNavigateSettings}
          onSelectEpisode={onSelectEpisode}
        />

        {/* Media Details Card Below Player */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold">
                {isMovie ? <Film className="w-4 h-4" /> : <Tv className="w-4 h-4" />}
                <span>{isMovie ? `MCU MOVIE • ${movie.year}` : `MARVEL SERIES • ${series?.releaseYear}`}</span>
                {isMovie && movie.phase && <PhaseBadge phase={movie.phase} />}
                {isSeries && series?.phase && <PhaseBadge phase={series.phase} />}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {title}
              </h1>
            </div>

            <button
              onClick={() => toggleWatchlist(mediaIdForWatchlist)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all active:scale-95 self-start sm:self-center ${
                isSaved
                  ? 'bg-red-950/80 border-red-600 text-red-400'
                  : 'bg-black/60 border-white/20 text-gray-200 hover:border-white/50'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isSaved ? 'IN MY LIST' : 'ADD TO MY LIST'}</span>
            </button>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-sans max-w-4xl pt-2">
            {overview}
          </p>
        </div>
      </div>
    </PageTransition>
  );
};
