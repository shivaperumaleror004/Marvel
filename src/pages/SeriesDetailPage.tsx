import React, { useState } from 'react';
import { Play, Plus, Check, Star, Clock, ArrowLeft, Tv, User, RotateCcw } from 'lucide-react';
import { Series, Episode } from '../types';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { RatingBadge } from '../components/ui/RatingBadge';
import { useWatchlist } from '../hooks/useWatchlist';
import { useWatchProgress } from '../hooks/useWatchProgress';
import { PageTransition } from '../components/ui/PageTransition';

interface SeriesDetailPageProps {
  series: Series;
  onBack: () => void;
  onWatchEpisode: (series: Series, episode: Episode) => void;
}

export const SeriesDetailPage: React.FC<SeriesDetailPageProps> = ({
  series,
  onBack,
  onWatchEpisode
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { getProgress } = useWatchProgress();
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(
    series.seasons[0]?.seasonNumber || 1
  );

  const isSaved = isInWatchlist(series.id);
  const selectedSeason = series.seasons.find(s => s.seasonNumber === selectedSeasonNumber) || series.seasons[0];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950 pb-16">
        {/* Backdrop Header */}
        <div className="relative min-h-[50vh] lg:min-h-[60vh] w-full overflow-hidden">
          <img
            src={series.backdrop}
            alt={series.title}
            className="h-full w-full object-cover object-top opacity-35 filter blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full" />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-6 left-4 sm:left-8 z-20 flex items-center gap-2 rounded-xl bg-black/60 border border-white/20 px-4 py-2 text-xs font-mono font-bold text-gray-200 backdrop-blur-md hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ARCHIVE</span>
          </button>
        </div>

        {/* Content Section Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-40 sm:-mt-48 space-y-12">
          {/* Main Info Row: Poster Left, Details Right */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Poster Left */}
            <div className="w-64 sm:w-80 flex-shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden border border-white/20 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src={series.poster}
                alt={series.title}
                className="w-full object-cover aspect-[2/3]"
              />
            </div>

            {/* Information Right */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <PhaseBadge phase={series.phase} />
                <span className="px-2.5 py-0.5 rounded bg-black/70 border border-white/20 text-xs font-mono text-gray-300">
                  {series.saga}
                </span>
                <RatingBadge rating={series.rating} />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
                {series.title}
              </h1>

              {series.tagline && (
                <p className="text-base sm:text-lg font-semibold text-red-400 italic">
                  "{series.tagline}"
                </p>
              )}

              <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-gray-300">
                <span>{series.releaseYear}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-red-400 font-bold">
                  <Tv className="w-3.5 h-3.5" />
                  {series.seasons.length} {series.seasons.length === 1 ? 'Season' : 'Seasons'}
                </span>
                <span>•</span>
                <span className="text-gray-400">Creator: <strong className="text-white">{series.creator}</strong></span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {series.genres.map(genre => (
                  <span
                    key={genre}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans pt-2">
                {series.overview}
              </p>

              {/* Watch & List Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                {selectedSeason && selectedSeason.episodes.length > 0 && (
                  <button
                    onClick={() => onWatchEpisode(series, selectedSeason.episodes[0])}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white uppercase tracking-wider shadow-[0_0_30px_rgba(230,36,41,0.5)] transition-all hover:bg-red-500 hover:scale-105 active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>PLAY EPISODE 1</span>
                  </button>
                )}

                <button
                  onClick={() => toggleWatchlist(series.id)}
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
              </div>
            </div>
          </div>

          {/* Season Selector & Episode List */}
          <div className="space-y-6 pt-4">
            {/* Season Selector Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase">Episodes</h2>

              <div className="flex gap-2">
                {series.seasons.map(season => {
                  const isActive = season.seasonNumber === selectedSeasonNumber;
                  return (
                    <button
                      key={season.seasonNumber}
                      onClick={() => setSelectedSeasonNumber(season.seasonNumber)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                        isActive
                          ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                          : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      Season {season.seasonNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Episode List Cards */}
            {selectedSeason && selectedSeason.episodes ? (
              <div className="space-y-4">
                {selectedSeason.episodes.map(ep => {
                  const epId = `${series.id}_s${ep.seasonNumber}_e${ep.episodeNumber}`;
                  const progress = getProgress(epId);

                  return (
                    <div
                      key={ep.id}
                      onClick={() => onWatchEpisode(series, ep)}
                      className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/80 p-4 hover:border-red-600/60 hover:bg-slate-900 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                    >
                      {/* Episode Still / Thumbnail */}
                      <div className="relative aspect-video w-full sm:w-48 flex-shrink-0 overflow-hidden rounded-xl bg-slate-950">
                        <img
                          src={ep.still}
                          alt={ep.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="p-3 rounded-full bg-red-600 text-white shadow-lg">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Progress Bar overlay */}
                        {progress && progress.percentage > 0 && (
                          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/60">
                            <div
                              className="h-full bg-red-600 shadow-[0_0_8px_#E62429]"
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Info & Description */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold">
                          <span>S{ep.seasonNumber < 10 ? `0${ep.seasonNumber}` : ep.seasonNumber} E{ep.episodeNumber < 10 ? `0${ep.episodeNumber}` : ep.episodeNumber}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-3 h-3 text-red-500" />
                            {ep.runtime} min
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                          {ep.title}
                        </h3>

                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {ep.overview}
                        </p>

                        {progress && progress.percentage > 0 && (
                          <div className="pt-1 flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
                            <RotateCcw className="w-3 h-3" />
                            <span>Watched {progress.percentage}% (Resume at {formatTime(progress.currentTime)})</span>
                          </div>
                        )}
                      </div>

                      {/* Play Button Action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWatchEpisode(series, ep);
                        }}
                        className="self-stretch sm:self-center flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-transform hover:bg-red-500 active:scale-95 shadow-md"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>WATCH</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 font-mono text-sm">
                No episodes available for this season.
              </div>
            )}
          </div>

          {/* Cast Grid */}
          {series.cast.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">Cast & Creators</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {series.cast.map(c => (
                  <div key={c.name} className="p-3 rounded-xl border border-white/10 bg-slate-900/80 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-red-400 border border-white/10">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                      <p className="text-[11px] font-mono text-gray-400 truncate">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
