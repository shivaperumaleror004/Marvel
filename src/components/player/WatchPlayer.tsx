import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  RotateCcw,
  Maximize,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Tv,
  Film,
  ArrowLeft,
  Settings as SettingsIcon,
  Check,
  ListVideo,
  Clock,
  Sliders,
  FastForward,
  Rewind
} from 'lucide-react';
import type { Movie, Series, Episode } from '../../types';
import { MOVIES_DATA } from '../../data/movies';
import { SERIES_DATA } from '../../data/series';
import { resolveWatchUrl } from '../../services/watchSourceBuilder';
import { fetchCompleteSeasonEpisodes } from '../../services/tmdb';
import { useWatchProgress } from '../../hooks/useWatchProgress';
import { useSettings } from '../../hooks/useSettings';
import { formatExactTime, formatHumanDuration, formatRemainingTime, parseTimeToSeconds } from '../../utils/timeFormat';

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

  // Active watch time state
  const [currentWatchedTime, setCurrentWatchedTime] = useState<number>(initialTime);
  const [initialSeekTime, setInitialSeekTime] = useState<number>(initialTime);
  const [customInputTime, setCustomInputTime] = useState<string>('');
  const [showTimeEditor, setShowTimeEditor] = useState<boolean>(false);

  // Sync when targetId changes
  useEffect(() => {
    const existing = getProgress(targetId);
    const time = existing ? existing.currentTime : 0;
    setCurrentWatchedTime(time);
    setInitialSeekTime(time);
  }, [targetId]);

  // Total duration in seconds
  const duration = mediaType === 'movie'
    ? (movie?.runtime ? movie.runtime * 60 : 7200)
    : (activeEpisode?.runtime ? activeEpisode.runtime * 60 : 2700);

  // Player state & refs
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isPlayerActive, setIsPlayerActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasReceivedEmbedTime = useRef<boolean>(false);
  const isPlaying = useRef<boolean>(true);

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
      customSourceOverride: customOverride,
      time: initialSeekTime > 0 ? initialSeekTime : undefined
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
      customSourceOverride: customOverride,
      time: initialSeekTime > 0 ? initialSeekTime : undefined
    });
  }

  // Save progress helper
  const saveProgress = useCallback((newTime: number) => {
    if (!targetId) return;
    const title = mediaType === 'movie' ? (movie?.title || 'Marvel Movie') : (series?.title || 'Marvel Series');
    const subtitle = mediaType === 'series' && activeEpisode
      ? `S${activeEpisode.seasonNumber}:E${activeEpisode.episodeNumber} • ${activeEpisode.title}`
      : undefined;
    const poster = mediaType === 'movie'
      ? (movie?.poster || movie?.backdrop || '')
      : (activeEpisode?.still || series?.poster || series?.backdrop || '');
    const backdrop = mediaType === 'movie'
      ? (movie?.backdrop || movie?.poster || '')
      : (series?.backdrop || activeEpisode?.still || series?.poster || '');

    updateProgress({
      id: targetId,
      mediaId: mediaType === 'movie' ? (movie?.id || '') : (series?.id || ''),
      mediaType,
      seriesId: series?.id,
      seasonNumber: activeEpisode?.seasonNumber,
      episodeNumber: activeEpisode?.episodeNumber,
      title,
      subtitle,
      currentTime: Math.min(duration, Math.max(0, newTime)),
      duration,
      poster,
      backdrop
    });
  }, [targetId, mediaType, movie, series, activeEpisode, duration, updateProgress]);

  // Send ScreenScape SET_PROGRESS command to embedded player
  const sendSetProgress = useCallback((seconds: number) => {
    if (!iframeRef.current?.contentWindow || !tmdbId || seconds < 0) return;
    try {
      const s = mediaType === 'series' && activeEpisode ? activeEpisode.seasonNumber : undefined;
      const e = mediaType === 'series' && activeEpisode ? activeEpisode.episodeNumber : undefined;
      const payload = {
        tmdbId,
        progressSeconds: Math.floor(seconds),
        season: s,
        episode: e
      };
      iframeRef.current.contentWindow.postMessage({
        type: 'SCREENSCAPE_SET_PROGRESS',
        requestId: `set-prog-${Date.now()}`,
        payload
      }, '*');
      iframeRef.current.contentWindow.postMessage({
        type: 'VIDPLUS_SET_PROGRESS',
        requestId: `vidplus-set-${Date.now()}`,
        payload
      }, '*');
    } catch {}
  }, [tmdbId, mediaType, activeEpisode]);

  // Send ScreenScape GET_PROGRESS query to embedded player
  const sendGetProgress = useCallback(() => {
    if (!iframeRef.current?.contentWindow || !tmdbId || !isIframeLoaded) return;
    try {
      const s = mediaType === 'series' && activeEpisode ? activeEpisode.seasonNumber : undefined;
      const e = mediaType === 'series' && activeEpisode ? activeEpisode.episodeNumber : undefined;
      const payload = {
        tmdbId,
        season: s,
        episode: e
      };
      iframeRef.current.contentWindow.postMessage({
        type: 'SCREENSCAPE_GET_PROGRESS',
        requestId: `get-prog-${Date.now()}`,
        payload
      }, '*');
      iframeRef.current.contentWindow.postMessage({
        type: 'VIDPLUS_GET_PROGRESS',
        requestId: `vidplus-get-${Date.now()}`,
        payload
      }, '*');
    } catch {}
  }, [tmdbId, isIframeLoaded, mediaType, activeEpisode]);

  // Listen to postMessage from embedded players (ScreenScape, VidPlus, Plyr, JWPlayer, etc.)
  useEffect(() => {
    const handlePlayerMessage = (event: MessageEvent) => {
      try {
        let payload = event.data;
        if (typeof payload === 'string') {
          try { payload = JSON.parse(payload); } catch {}
        }
        if (!payload || typeof payload !== 'object') return;

        // 1. ScreenScape & VidPlus official progress responses
        if (payload.type === 'SCREENSCAPE_PROGRESS_RESPONSE' || payload.type === 'VIDPLUS_PROGRESS_RESPONSE') {
          const sec = payload.progressSeconds;
          if (typeof sec === 'number' && Number.isFinite(sec) && sec > 0) {
            hasReceivedEmbedTime.current = true;
            const clamped = Math.min(duration, Math.floor(sec));
            setCurrentWatchedTime(clamped);
            saveProgress(clamped);
          }
          return;
        }

        // 2. Embed ready event -> push saved progress so the player resumes exactly where user left off
        if (payload.type === 'SCREENSCAPE_EMBED_READY' || payload.type === 'VIDPLUS_EMBED_READY') {
          if (currentWatchedTime > 0) {
            sendSetProgress(currentWatchedTime);
          }
          return;
        }

        // 3. Play / Pause status detection
        if (payload.event === 'pause' || payload.type === 'pause' || payload.status === 'paused') {
          isPlaying.current = false;
        } else if (payload.event === 'play' || payload.type === 'play' || payload.status === 'playing') {
          isPlaying.current = true;
        }

        // 4. Common HTML5 / JWPlayer / PlayerJS / Plyr / VidSrc message formats
        let streamTime: number | undefined;
        if (typeof payload.currentTime === 'number') streamTime = payload.currentTime;
        else if (typeof payload.time === 'number') streamTime = payload.time;
        else if (typeof payload.position === 'number') streamTime = payload.position;
        else if (typeof payload.data?.currentTime === 'number') streamTime = payload.data.currentTime;
        else if (typeof payload.data?.time === 'number') streamTime = payload.data.time;
        else if (typeof payload.data?.position === 'number') streamTime = payload.data.position;
        else if (payload.event === 'time' && typeof payload.data === 'number') streamTime = payload.data;
        else if (payload.event === 'timeupdate' && typeof payload.data === 'number') streamTime = payload.data;

        if (typeof streamTime === 'number' && Number.isFinite(streamTime) && streamTime >= 0) {
          hasReceivedEmbedTime.current = true;
          const clamped = Math.min(duration, Math.floor(streamTime));
          setCurrentWatchedTime(clamped);
          saveProgress(clamped);
        }
      } catch {}
    };

    window.addEventListener('message', handlePlayerMessage);
    return () => window.removeEventListener('message', handlePlayerMessage);
  }, [duration, currentWatchedTime, sendSetProgress, saveProgress]);

  // Periodic watch progress polling and synchronized accumulator
  useEffect(() => {
    if (!isPlayerActive || !isIframeLoaded) return;

    // Send immediate sync when player mounts / loads
    if (initialSeekTime > 0) {
      sendSetProgress(initialSeekTime);
    }
    sendGetProgress();

    const interval = setInterval(() => {
      // Query player for exact playback timestamp
      sendGetProgress();

      // If embed does not provide progress via postMessage and document is active, fallback increment
      if (!hasReceivedEmbedTime.current && isPlaying.current && !document.hidden) {
        setCurrentWatchedTime(prev => {
          const nextTime = Math.min(duration, prev + 3);
          saveProgress(nextTime);
          return nextTime;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlayerActive, isIframeLoaded, duration, initialSeekTime, sendGetProgress, sendSetProgress, saveProgress]);

  // Manual Seek / Time adjustment handler
  const handleSeek = (newTime: number) => {
    const clamped = Math.min(duration, Math.max(0, newTime));
    setCurrentWatchedTime(clamped);
    saveProgress(clamped);
    sendSetProgress(clamped);
  };

  // Manual Exact Timestamp Submit
  const handleApplyCustomTime = () => {
    const parsed = parseTimeToSeconds(customInputTime);
    if (parsed !== null && parsed >= 0) {
      handleSeek(parsed);
      setShowTimeEditor(false);
      setCustomInputTime('');
    }
  };

  const activeEpisodes = seasonEpisodes.length > 0 ? seasonEpisodes : (currentSeason?.episodes || []);

  // Previous & Next Episode handlers
  const handlePrevEpisode = () => {
    if (!series || !activeEpisode) return;
    const currIndex = activeEpisodes.findIndex(e => e.episodeNumber === activeEpisode.episodeNumber);
    if (currIndex > 0) {
      const prevEp = activeEpisodes[currIndex - 1];
      setActiveEpisode(prevEp);
      setIsIframeLoaded(false);
      if (onSelectEpisode) onSelectEpisode(series, prevEp);
    } else {
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
    if (!series || !activeEpisode) return;
    const currIndex = activeEpisodes.findIndex(e => e.episodeNumber === activeEpisode.episodeNumber);
    if (currIndex !== -1 && currIndex < activeEpisodes.length - 1) {
      const nextEp = activeEpisodes[currIndex + 1];
      setActiveEpisode(nextEp);
      setIsIframeLoaded(false);
      if (onSelectEpisode) onSelectEpisode(series, nextEp);
    } else {
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

  const titleText = mediaType === 'movie' ? movie?.title : series?.title;
  const subtitleText = mediaType === 'series' && activeEpisode
    ? `Season ${activeEpisode.seasonNumber} • Episode ${activeEpisode.episodeNumber}: ${activeEpisode.title}`
    : movie?.tagline;

  const posterImg = mediaType === 'movie'
    ? (movie?.backdrop || movie?.poster)
    : (activeEpisode?.still || series?.backdrop || series?.poster);

  const isSourceUnavailable = !resolvedWatchUrl || (tmdbId && tmdbId <= 0);
  const currentPercentage = duration > 0 ? Math.min(100, Math.round((currentWatchedTime / duration) * 100)) : 0;

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

            {activeEpisodes.length > 0 && (
              <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-xl px-3 py-1.5">
                <ListVideo className="w-3.5 h-3.5 text-red-500" />
                <select
                  value={activeEpisode?.episodeNumber || 1}
                  onChange={(e) => {
                    const epNum = parseInt(e.target.value, 10);
                    const ep = activeEpisodes.find(item => item.episodeNumber === epNum);
                    if (ep) {
                      setActiveEpisode(ep);
                      setIsIframeLoaded(false);
                      if (onSelectEpisode) onSelectEpisode(series, ep);
                    }
                  }}
                  className="bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer max-w-[180px] truncate"
                >
                  {activeEpisodes.map(e => (
                    <option key={e.id} value={e.episodeNumber} className="bg-slate-900 text-white truncate">
                      E{e.episodeNumber}: {e.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                    {initialSeekTime > 0 && (
                      <p className="text-xs font-mono text-emerald-400 drop-shadow">
                        Resuming from {formatExactTime(initialSeekTime)}
                      </p>
                    )}
                    {subtitleText && (
                      <p className="text-xs font-mono text-gray-300 drop-shadow">{subtitleText}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isPlayerActive && (
              <iframe
                ref={iframeRef}
                key={targetId}
                src={resolvedWatchUrl}
                title={titleText || 'Marvel Player'}
                className={`h-full w-full border-0 transition-opacity duration-700 ${
                  isIframeLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => {
                  setIsIframeLoaded(true);
                  if (initialSeekTime > 0) {
                    sendSetProgress(initialSeekTime);
                  }
                  sendGetProgress();
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation allow-downloads"
              />
            )}

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

      {/* Interactive Exact Watch Progress & Scrubber Controller */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 space-y-3 backdrop-blur-md shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-500" />
            <span className="text-xs font-mono font-bold text-gray-300">
              EXACT TIMECODE:
            </span>
            <span className="text-xs font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded border border-white/10">
              {formatExactTime(currentWatchedTime)}
            </span>
            <span className="text-gray-500 text-xs">/</span>
            <span className="text-xs font-mono text-gray-400">
              {formatExactTime(duration)}
            </span>
            <span className="text-[11px] font-mono text-red-400 font-bold ml-1">
              ({currentPercentage}% • {formatRemainingTime(currentWatchedTime, duration)})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick jump buttons */}
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => handleSeek(currentWatchedTime - 300)}
                title="Rewind 5 minutes"
                className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-0.5"
              >
                <Rewind className="w-3 h-3" />
                -5m
              </button>
              <button
                onClick={() => handleSeek(currentWatchedTime - 60)}
                title="Rewind 1 minute"
                className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                -1m
              </button>
              <button
                onClick={() => handleSeek(currentWatchedTime + 60)}
                title="Fast-forward 1 minute"
                className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                +1m
              </button>
              <button
                onClick={() => handleSeek(currentWatchedTime + 300)}
                title="Fast-forward 5 minutes"
                className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-0.5"
              >
                +5m
                <FastForward className="w-3 h-3" />
              </button>
            </div>

            {/* Direct Timestamp Input Toggle */}
            <button
              onClick={() => {
                setShowTimeEditor(!showTimeEditor);
                setCustomInputTime(formatExactTime(currentWatchedTime));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-600 border border-white/10 text-xs font-mono font-bold text-gray-200 hover:text-white transition-all shadow"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>SET TIME</span>
            </button>
          </div>
        </div>

        {/* Precise Scrubber Range Bar */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max={duration || 7200}
            step="1"
            value={currentWatchedTime}
            onChange={(e) => handleSeek(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
          />
          <div className="flex justify-between text-[10px] font-mono text-gray-500">
            <span>00:00:00</span>
            <div className="flex gap-4">
              <button onClick={() => handleSeek(duration * 0.25)} className="hover:text-red-400">25%</button>
              <button onClick={() => handleSeek(duration * 0.5)} className="hover:text-red-400">50%</button>
              <button onClick={() => handleSeek(duration * 0.75)} className="hover:text-red-400">75%</button>
            </div>
            <span>{formatExactTime(duration)}</span>
          </div>
        </div>

        {/* Custom Exact Timestamp Editor Drawer */}
        {showTimeEditor && (
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-gray-400">Type exact timestamp:</span>
            <input
              type="text"
              value={customInputTime}
              onChange={(e) => setCustomInputTime(e.target.value)}
              placeholder="e.g. 00:45:00 or 1h 20m"
              className="bg-black/60 border border-white/20 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-red-500 w-44"
            />
            <button
              onClick={handleApplyCustomTime}
              className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center gap-1 shadow"
            >
              <Check className="w-3 h-3" />
              APPLY & SYNC
            </button>
            <button
              onClick={() => setShowTimeEditor(false)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs"
            >
              CANCEL
            </button>
          </div>
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
                <span>SAVED ({formatExactTime(savedProgress.currentTime)})</span>
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
                handleSeek(savedProgress.currentTime);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-mono font-bold text-white shadow-lg transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESUME ({formatExactTime(savedProgress.currentTime)})</span>
            </button>
          )}

          <button
            onClick={() => {
              handleSeek(0);
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2.5 text-xs font-mono font-bold text-white shadow-lg transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START OVER</span>
          </button>
        </div>
      </div>
    </div>
  );
};
