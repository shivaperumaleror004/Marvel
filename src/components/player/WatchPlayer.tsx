import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Maximize,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Loader2,
  Tv,
  Film,
  ArrowLeft,
  Settings as SettingsIcon,
  Check,
  ListVideo
} from 'lucide-react';
import type { Movie, Series, Episode, WatchConfig, EpisodeWatchConfig } from '../../types';
import { MOVIES_DATA } from '../../data/movies';
import { SERIES_DATA } from '../../data/series';
import { buildMovieWatchUrl, buildEpisodeWatchUrl, resolveWatchUrl } from '../../services/watchSourceBuilder';
import { fetchCompleteSeasonEpisodes } from '../../services/tmdb';
import { useWatchProgress } from '../../hooks/useWatchProgress';
import { useSettings } from '../../hooks/useSettings';
import { isMarvelContent } from '../../utils/marvelWhitelist';

export interface WatchPlayerProps {
  mediaType: 'movie' | 'series';
  mediaId?: string;
  movie?: Movie;
  series?: Series;
  episode?: Episode;
  seasonNumber?: number;
  episodeNumber?: number;
  onBack?: () => void;
  onNavigateSettings?: () => void;
  onSelectEpisode?: (series: Series, episode: Episode) => void;
}

export const WatchPlayer: React.FC<WatchPlayerProps> = ({
  mediaType,
  mediaId,
  movie: initialMovie,
  series: initialSeries,
  episode: initialEpisode,
  seasonNumber: initialSeasonNum,
  episodeNumber: initialEpNum,
  onBack,
  onNavigateSettings,
  onSelectEpisode
}) => {
  const { settings } = useSettings();
  const { getProgress, updateProgress } = useWatchProgress();

  // Resolve media entity if only mediaId was provided
  const movie = initialMovie || (mediaType === 'movie' && mediaId ? MOVIES_DATA.find(m => m.id === mediaId) : undefined);
  const series = initialSeries || (mediaType === 'series' && mediaId ? SERIES_DATA.find(s => s.id === mediaId) : undefined);

  // Active season and episode state for TV Series
  const [activeSeasonNum, setActiveSeasonNum] = useState<number>(() => {
    if (initialEpisode) return initialEpisode.seasonNumber;
    if (initialSeasonNum) return initialSeasonNum;
    return series?.seasons[0]?.seasonNumber || 1;
  });

  const currentSeason = series?.seasons.find(s => s.seasonNumber === activeSeasonNum) || series?.seasons[0];

  // Dynamic episodes for active season (populated from local data and enriched via TMDB)
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>(() => {
    return currentSeason?.episodes || [];
  });

  useEffect(() => {
    if (series && activeSeasonNum) {
      const localSeason = series.seasons.find(s => s.seasonNumber === activeSeasonNum);
      if (localSeason && localSeason.episodes.length > 0) {
        setSeasonEpisodes(localSeason.episodes);
      }
      fetchCompleteSeasonEpisodes(series, activeSeasonNum).then(eps => {
        if (eps && eps.length > 0) {
          setSeasonEpisodes(eps);
        }
      });
    }
  }, [series, activeSeasonNum]);

  const [activeEpisode, setActiveEpisode] = useState<Episode | undefined>(() => {
    if (initialEpisode) return initialEpisode;
    if (initialEpNum && currentSeason) {
      return currentSeason.episodes.find(e => e.episodeNumber === initialEpNum);
    }
    return currentSeason?.episodes[0];
  });

  // Sync state if props change
  useEffect(() => {
    if (initialEpisode) {
      setActiveSeasonNum(initialEpisode.seasonNumber);
      setActiveEpisode(initialEpisode);
    }
  }, [initialEpisode]);

  useEffect(() => {
    if (series && activeSeasonNum) {
      const eps = seasonEpisodes.length > 0 ? seasonEpisodes : (currentSeason?.episodes || []);
      if (eps.length > 0 && (!activeEpisode || activeEpisode.seasonNumber !== activeSeasonNum)) {
        setActiveEpisode(eps[0]);
      }
    }
  }, [activeSeasonNum, series, seasonEpisodes, activeEpisode, currentSeason]);

  // Construct target item ID for watch progress persistence
  const targetId = mediaType === 'movie'
    ? (movie?.id || 'unknown_movie')
    : (series && activeEpisode ? `${series.id}_s${activeEpisode.seasonNumber}_e${activeEpisode.episodeNumber}` : 'unknown_series');

  // Watch progress from localStorage
  const savedProgress = getProgress(targetId);
  const initialTime = savedProgress ? savedProgress.currentTime : 0;

  // Player state
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isPlayerActive, setIsPlayerActive] = useState(true); // Active when watch page opened
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolve watch configuration and URL
  let resolvedWatchUrl = '';
  let tmdbId: number | undefined;

  if (mediaType === 'movie' && movie) {
    tmdbId = movie.watchConfig?.tmdbId || movie.tmdbId;
    const customOverride = settings.configuredSources[movie.id];
    resolvedWatchUrl = resolveWatchUrl({
      type: 'movie',
      tmdbId,
      watchConfig: movie.watchConfig,
      customSourceOverride: customOverride
    });
  } else if (mediaType === 'series' && series && activeEpisode) {
    tmdbId = activeEpisode.episodeWatchConfig?.tmdbId || series.watchConfig?.tmdbId || series.tmdbId;
    const epTargetId = `${series.id}_s${activeEpisode.seasonNumber}_e${activeEpisode.episodeNumber}`;
    const customOverride = settings.configuredSources[epTargetId] || settings.configuredSources[series.id];
    resolvedWatchUrl = resolveWatchUrl({
      type: 'tv',
      tmdbId,
      season: activeEpisode.seasonNumber,
      episode: activeEpisode.episodeNumber,
      watchConfig: series.watchConfig,
      episodeWatchConfig: activeEpisode.episodeWatchConfig,
      customSourceOverride: customOverride
    });
  }

  // Periodic watch progress simulator / recorder for embedded frame
  useEffect(() => {
    if (isPlayerActive && isIframeLoaded) {
      const duration = mediaType === 'movie' ? (movie?.runtime ? movie.runtime * 60 : 7200) : (activeEpisode?.runtime ? activeEpisode.runtime * 60 : 2700);
      const interval = setInterval(() => {
        const title = mediaType === 'movie' ? (movie?.title || 'Marvel Movie') : (series?.title || 'Marvel Series');
        const subtitle = mediaType === 'series' && activeEpisode
          ? `S${activeEpisode.seasonNumber}:E${activeEpisode.episodeNumber} • ${activeEpisode.title}`
          : undefined;
        const poster = mediaType === 'movie' ? (movie?.backdrop || movie?.poster || '') : (activeEpisode?.still || series?.backdrop || series?.poster || '');

        updateProgress({
          id: targetId,
          mediaId: mediaType === 'movie' ? (movie?.id || '') : (series?.id || ''),
          mediaType,
          seriesId: series?.id,
          seasonNumber: activeEpisode?.seasonNumber,
          episodeNumber: activeEpisode?.episodeNumber,
          title,
          subtitle,
          currentTime: Math.min(duration, (initialTime || 0) + 30),
          duration,
          poster
        });
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isPlayerActive, isIframeLoaded, targetId, mediaType, movie, series, activeEpisode, updateProgress, initialTime]);

  // Previous & Next Episode handlers
  const handlePrevEpisode = () => {
    if (!series || !currentSeason || !activeEpisode) return;
    const currIndex = currentSeason.episodes.findIndex(e => e.episodeNumber === activeEpisode.episodeNumber);
    if (currIndex > 0) {
      const prevEp = currentSeason.episodes[currIndex - 1];
      setActiveEpisode(prevEp);
      setIsIframeLoaded(false);
      if (onSelectEpisode) onSelectEpisode(series, prevEp);
    } else {
      // Find previous season
      const prevSeason = series.seasons.find(s => s.seasonNumber === activeSeasonNum - 1);
      if (prevSeason && prevSeason.episodes.length > 0) {
        const lastEpOfPrevSeason = prevSeason.episodes[prevSeason.episodes.length - 1];
        setActiveSeasonNum(prevSeason.seasonNumber);
        setActiveEpisode(lastEpOfPrevSeason);
        setIsIframeLoaded(false);
        if (onSelectEpisode) onSelectEpisode(series, lastEpOfPrevSeason);
      }
    }
  };

  const handleNextEpisode = () => {
    if (!series || !currentSeason || !activeEpisode) return;
    const currIndex = currentSeason.episodes.findIndex(e => e.episodeNumber === activeEpisode.episodeNumber);
    if (currIndex < currentSeason.episodes.length - 1) {
      const nextEp = currentSeason.episodes[currIndex + 1];
      setActiveEpisode(nextEp);
      setIsIframeLoaded(false);
      if (onSelectEpisode) onSelectEpisode(series, nextEp);
    } else {
      // Find next season
      const nextSeason = series.seasons.find(s => s.seasonNumber === activeSeasonNum + 1);
      if (nextSeason && nextSeason.episodes.length > 0) {
        const firstEpOfNextSeason = nextSeason.episodes[0];
        setActiveSeasonNum(nextSeason.seasonNumber);
        setActiveEpisode(firstEpOfNextSeason);
        setIsIframeLoaded(false);
        if (onSelectEpisode) onSelectEpisode(series, firstEpOfNextSeason);
      }
    }
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  // Format seconds to mm:ss / hh:mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const titleText = mediaType === 'movie' ? movie?.title : series?.title;
  const subtitleText = mediaType === 'series' && activeEpisode
    ? `Season ${activeEpisode.seasonNumber} • Episode ${activeEpisode.episodeNumber}: ${activeEpisode.title}`
    : movie?.tagline;

  const posterImg = mediaType === 'movie'
    ? (movie?.backdrop || movie?.poster)
    : (activeEpisode?.still || series?.backdrop || series?.poster);

  // Check if source is missing or invalid
  const isSourceUnavailable = !resolvedWatchUrl || (tmdbId && tmdbId <= 0);

  return (
    <div className="w-full space-y-4">
      {/* Top Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-red-600 border border-white/10 px-3.5 py-2 text-xs font-mono font-bold text-gray-200 hover:text-white transition-all active:scale-95 shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">BACK TO DETAILS</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase tracking-wider bg-red-600 text-white shadow-sm">
                {mediaType === 'movie' ? 'MCU MOVIE' : 'MARVEL SERIES'}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {movie?.year || series?.year}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white tracking-tight truncate max-w-md mt-0.5">
              {titleText}
            </h2>
          </div>
        </div>

        {/* Season & Episode Switcher Controls */}
        {mediaType === 'series' && series && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Season Selector Dropdown */}
            {series.seasons.length > 1 && (
              <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-xl px-3 py-1.5">
                <Tv className="w-3.5 h-3.5 text-red-500" />
                <select
                  value={activeSeasonNum}
                  onChange={(e) => {
                    const sNum = parseInt(e.target.value, 10);
                    setActiveSeasonNum(sNum);
                    setIsIframeLoaded(false);
                  }}
                  className="bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
                >
                  {series.seasons.map(s => (
                    <option key={s.seasonNumber} value={s.seasonNumber} className="bg-slate-900 text-white">
                      Season {s.seasonNumber}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Episode Selector Dropdown */}
            {currentSeason && currentSeason.episodes.length > 0 && (
              <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-xl px-3 py-1.5">
                <ListVideo className="w-3.5 h-3.5 text-red-500" />
                <select
                  value={activeEpisode?.episodeNumber || 1}
                  onChange={(e) => {
                    const epNum = parseInt(e.target.value, 10);
                    const ep = currentSeason.episodes.find(item => item.episodeNumber === epNum);
                    if (ep) {
                      setActiveEpisode(ep);
                      setIsIframeLoaded(false);
                      if (onSelectEpisode) onSelectEpisode(series, ep);
                    }
                  }}
                  className="bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer max-w-[180px] truncate"
                >
                  {currentSeason.episodes.map(e => (
                    <option key={e.id} value={e.episodeNumber} className="bg-slate-900 text-white truncate">
                      E{e.episodeNumber}: {e.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Prev/Next Episode Quick Nav Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevEpisode}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-600/80 text-gray-200 hover:text-white border border-white/10 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Previous Episode"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextEpisode}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-600/80 text-gray-200 hover:text-white border border-white/10 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Next Episode"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main 16:9 Aspect Ratio Video Player Container */}
      <div
        ref={containerRef}
        className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] group select-none"
      >
        {/* Source Unavailable Clean Fallback */}
        {isSourceUnavailable ? (
          <div className="absolute inset-0 z-30 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center space-y-5">
            {posterImg && (
              <img
                src={posterImg}
                alt={titleText || 'Poster'}
                className="absolute inset-0 w-full h-full object-cover opacity-15 blur-lg"
              />
            )}
            <div className="relative z-10 max-w-md space-y-4">
              <div className="inline-flex p-4 rounded-full bg-red-950/80 border border-red-600/50 text-red-500 shadow-[0_0_30px_rgba(230,36,41,0.4)]">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Viewing Source Unavailable
              </h3>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                The watch source configuration for <span className="text-white font-semibold">"{titleText}"</span> is not available or missing a valid TMDB identifier. No broken external URLs are displayed.
              </p>
              {onNavigateSettings && (
                <button
                  onClick={onNavigateSettings}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2.5 text-xs font-mono font-bold text-white shadow-lg transition-all active:scale-95"
                >
                  <SettingsIcon className="w-4 h-4" />
                  <span>CONFIGURE SOURCE IN SETTINGS</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Cinematic Loading Overlay */}
            {!isIframeLoaded && (
              <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
                {posterImg && (
                  <img
                    src={posterImg}
                    alt={titleText || 'Poster'}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 blur-sm"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-red-600/30 border-t-red-600 animate-spin" />
                    <Film className="w-6 h-6 text-red-500 absolute" />
                  </div>
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-red-950/90 border border-red-600/60 text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                      ScreenScape Stream Vault
                    </span>
                    <h3 className="text-lg font-black text-white drop-shadow-md">
                      Loading Cinematic Player...
                    </h3>
                    {subtitleText && (
                      <p className="text-xs font-mono text-gray-300 drop-shadow">{subtitleText}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Embedded ScreenScape Provider Iframe */}
            {isPlayerActive && (
              <iframe
                key={resolvedWatchUrl}
                src={resolvedWatchUrl}
                title={titleText || 'Marvel Player'}
                className={`h-full w-full border-0 transition-opacity duration-700 ${
                  isIframeLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setIsIframeLoaded(true)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
              />
            )}

            {/* Fullscreen Overlay Button */}
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-xl bg-black/70 hover:bg-red-600 border border-white/20 text-white backdrop-blur-md shadow-lg transition-all active:scale-95"
                title="Toggle Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Information & Resume Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-white">{titleText}</h3>
            {savedProgress && savedProgress.currentTime > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-600/50 text-[10px] font-mono font-bold text-emerald-400">
                <Check className="w-3 h-3" />
                <span>SAVED PROGRESS ({savedProgress.percentage}%)</span>
              </span>
            )}
          </div>
          {subtitleText && <p className="text-xs font-mono text-red-400 font-semibold">{subtitleText}</p>}
          <p className="text-xs font-sans text-gray-300 line-clamp-2">
            {mediaType === 'movie' ? movie?.overview : (activeEpisode?.overview || series?.overview)}
          </p>
        </div>

        {/* Action Controls: Watch Now & Resume Watching */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-center">
          {savedProgress && savedProgress.currentTime > 0 && (
            <button
              onClick={() => {
                setIsIframeLoaded(false);
                setIsPlayerActive(true);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-mono font-bold text-white shadow-lg transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESUME ({formatTime(savedProgress.currentTime)})</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsIframeLoaded(false);
              setIsPlayerActive(true);
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2.5 text-xs font-mono font-bold text-white shadow-lg transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>WATCH NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
