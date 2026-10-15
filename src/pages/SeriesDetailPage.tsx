import React, { useState, useEffect } from 'react';
import {
  Play,
  Plus,
  Check,
  Clock,
  ArrowLeft,
  Tv,
  User,
  RotateCcw,
  Calendar,
  Sparkles,
  Loader2,
  Film
} from 'lucide-react';
import { Series, Episode, Character } from '../types';
import { CHARACTERS_DATA } from '../data/characters';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { RatingBadge } from '../components/ui/RatingBadge';
import { useWatchlist } from '../hooks/useWatchlist';
import { useWatchProgress } from '../hooks/useWatchProgress';
import { formatExactTime } from '../utils/timeFormat';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import {
  fetchCompleteSeasonEpisodes,
  FALLBACK_POSTER,
  FALLBACK_BACKDROP,
  FALLBACK_STILL,
  FALLBACK_AVATAR
} from '../services/tmdb';

interface SeriesDetailPageProps {
  series: Series;
  onBack: () => void;
  onWatchEpisode: (series: Series, episode: Episode) => void;
  onSelectCharacter?: (character: Character) => void;
}

export const SeriesDetailPage: React.FC<SeriesDetailPageProps> = ({
  series: initialSeries,
  onBack,
  onWatchEpisode,
  onSelectCharacter
}) => {
  const { enrichSeriesDetail } = useMedia();
  const [series, setSeries] = useState<Series>(initialSeries);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { getProgress } = useWatchProgress();

  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(
    initialSeries.seasons[0]?.seasonNumber || 1
  );
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState<boolean>(true);

  // Sync state if initialSeries changes & fetch deeper details from TMDB
  useEffect(() => {
    setSeries(initialSeries);
    if (initialSeries.tmdbId) {
      enrichSeriesDetail(initialSeries).then(enriched => {
        setSeries(enriched);
      });
    }
  }, [initialSeries, enrichSeriesDetail]);

  const isSaved = isInWatchlist(series.id);
  const selectedSeason = series.seasons.find(s => s.seasonNumber === selectedSeasonNumber) || series.seasons[0];

  // Dynamically load ALL episodes from TMDB whenever series or selected season changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingEpisodes(true);

    fetchCompleteSeasonEpisodes(series, selectedSeasonNumber).then(fetchedEpisodes => {
      if (!isCancelled) {
        setEpisodes(fetchedEpisodes);
        setIsLoadingEpisodes(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [series, selectedSeasonNumber]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950 pb-20">
        {/* Backdrop Header */}
        <div className="relative min-h-[50vh] lg:min-h-[60vh] w-full overflow-hidden">
          <img
            src={series.backdrop || FALLBACK_BACKDROP}
            alt={series.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_BACKDROP;
            }}
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
            <span>BACK TO SERIES ARCHIVE</span>
          </button>
        </div>

        {/* Content Section Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-40 sm:-mt-48 space-y-12">
          {/* Main Info Row: Poster Left, Details Right */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Poster Left */}
            <div className="w-64 sm:w-80 flex-shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden border border-white/20 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src={series.poster || FALLBACK_POSTER}
                alt={series.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_POSTER;
                }}
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

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-gray-300">
                <span>{series.releaseYear}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-red-400 font-bold">
                  <Tv className="w-3.5 h-3.5" />
                  <span>
                    {series.totalSeasons || series.seasons.length} {(series.totalSeasons || series.seasons.length) === 1 ? 'Season' : 'Seasons'}
                  </span>
                  {series.totalEpisodes && (
                    <span className="text-gray-400 font-normal">
                      ({series.totalEpisodes} Episodes)
                    </span>
                  )}
                </span>
                <span>•</span>
                <span className="text-gray-400">
                  Creator: <strong className="text-white">{series.creator}</strong>
                </span>
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
                {series.releaseStatus === 'upcoming' ? (
                  <div className="flex items-center gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-6 py-3.5 text-sm font-bold text-amber-300">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span>UPCOMING // IN DEVELOPMENT</span>
                  </div>
                ) : (
                  episodes.length > 0 && (
                    <button
                      onClick={() => onWatchEpisode(series, episodes[0])}
                      className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white uppercase tracking-wider shadow-[0_0_30px_rgba(230,36,41,0.5)] transition-all hover:bg-red-500 hover:scale-105 active:scale-95"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>PLAY {episodes[0].title ? `S${padZero(selectedSeasonNumber)}E01 • ${episodes[0].title}` : 'EPISODE 1'}</span>
                    </button>
                  )
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

          {/* Season Selector & Complete Episode List */}
          <div className="space-y-6 pt-6 border-t border-white/10">
            {/* Season Selector Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <span>Episodes</span>
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded-full">
                    {episodes.length} Available
                  </span>
                </h2>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  Retrieved dynamically from TMDB for {series.title}
                </p>
              </div>

              {/* Season Selection Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {series.seasons.map(season => {
                  const isActive = season.seasonNumber === selectedSeasonNumber;
                  return (
                    <button
                      key={season.seasonNumber}
                      onClick={() => setSelectedSeasonNumber(season.seasonNumber)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border whitespace-nowrap ${
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
            {isLoadingEpisodes ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-3 bg-slate-900/40 rounded-2xl border border-white/5">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                <span className="text-xs font-mono text-gray-400">Loading TMDB Season {selectedSeasonNumber} Episodes...</span>
              </div>
            ) : episodes.length > 0 ? (
              <div className="space-y-4">
                {episodes.map(ep => {
                  const epId = `${series.id}_s${ep.seasonNumber}_e${ep.episodeNumber}`;
                  const progress = getProgress(epId);
                  const epCode = `S${padZero(ep.seasonNumber)}E${padZero(ep.episodeNumber)}`;

                  return (
                    <div
                      key={ep.id}
                      onClick={() => onWatchEpisode(series, ep)}
                      className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/80 p-4 hover:border-red-600/60 hover:bg-slate-900 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                    >
                      {/* Episode Still / Thumbnail from TMDB */}
                      <div className="relative aspect-video w-full sm:w-52 flex-shrink-0 overflow-hidden rounded-xl bg-slate-950 border border-white/10 shadow-md">
                        <img
                          src={ep.still || FALLBACK_STILL}
                          alt={ep.title}
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_STILL;
                          }}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="p-3 rounded-full bg-red-600 text-white shadow-lg transform group-hover:scale-110 transition-transform">
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
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-700/60 text-red-400 font-bold">
                            {epCode}
                          </span>
                          {ep.airDate && (
                            <span className="text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-500" />
                              {ep.airDate}
                            </span>
                          )}
                          {ep.runtime ? (
                            <span className="text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-red-500" />
                              {ep.runtime} min
                            </span>
                          ) : null}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                          {ep.episodeNumber}. {ep.title}
                        </h3>

                        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                          {ep.overview}
                        </p>

                        {progress && progress.percentage > 0 && (
                          <div className="pt-1 flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
                            <RotateCcw className="w-3 h-3" />
                            <span>Watched {progress.percentage}% (Resume at {formatExactTime(progress.currentTime)})</span>
                          </div>
                        )}
                      </div>

                      {/* Watch Episode Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWatchEpisode(series, ep);
                        }}
                        className="self-stretch sm:self-center flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-all hover:bg-red-500 active:scale-95 shadow-md flex-shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>WATCH</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 font-mono text-sm bg-slate-900/40 rounded-2xl border border-white/5">
                No episodes found for Season {selectedSeasonNumber}.
              </div>
            )}
          </div>

          {/* Cast Grid with TMDB Profile Photos */}
          {series.cast.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">Cast & Creators</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {series.cast.map(c => (
                  <div key={c.name} className="p-3 rounded-xl border border-white/10 bg-slate-900/80 flex items-center gap-3">
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        alt={c.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
                        }}
                        className="h-10 w-10 rounded-full object-cover border border-white/20 flex-shrink-0"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-red-400 border border-white/10 flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                      <p className="text-[11px] font-mono text-gray-400 truncate">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Featured Characters in this Series */}
          {(() => {
            const relatedChars = CHARACTERS_DATA.filter(
              c => series.characters?.includes(c.id) || c.series?.includes(series.id)
            );
            if (relatedChars.length === 0) return null;

            return (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">
                  Featured Marvel Characters
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relatedChars.map(char => (
                    <div
                      key={char.id}
                      onClick={() => onSelectCharacter && onSelectCharacter(char)}
                      className="group cursor-pointer p-3 rounded-xl border border-white/10 bg-slate-900/80 hover:border-red-600/50 transition-all flex items-center gap-3"
                    >
                      <img
                        src={char.portrait || FALLBACK_AVATAR}
                        alt={char.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
                        }}
                        className="h-12 w-12 rounded-full object-cover border border-red-600/40"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white uppercase truncate group-hover:text-red-400">
                          {char.alias}
                        </h4>
                        <p className="text-[10px] font-mono text-gray-400 truncate">{char.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </PageTransition>
  );
};
