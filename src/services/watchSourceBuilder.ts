import type { WatchConfig, EpisodeWatchConfig } from '../types';

export const DEFAULT_SCREENSCAPE_HOST = 'https://nxsha.screenscape.me';
export const DEFAULT_LANGUAGE = 'eng';

/**
 * Builds a ScreenScape watch embed URL for a movie with optional resume time.
 * Output format: https://nxsha.screenscape.me/embed?tmdb={TMDB_ID}&type=movie&lan=eng&t={TIME}#t={TIME}
 */
export function buildMovieWatchUrl(
  tmdbId: number | string,
  options?: { hostDomain?: string; language?: string; time?: number }
): string {
  if (!tmdbId) return '';
  const host = options?.hostDomain || DEFAULT_SCREENSCAPE_HOST;
  const lang = options?.language || DEFAULT_LANGUAGE;
  const baseUrl = host.startsWith('http') ? host : `https://${host}`;
  const tParam = options?.time && options.time > 0 ? `&t=${Math.floor(options.time)}#t=${Math.floor(options.time)}` : '';
  return `${baseUrl}/embed?tmdb=${tmdbId}&type=movie&lan=${lang}${tParam}`;
}

/**
 * Builds a ScreenScape watch embed URL for a TV episode with optional resume time.
 * Output format: https://nxsha.screenscape.me/embed?tmdb={TMDB_ID}&type=tv&s={SEASON}&e={EPISODE}&lan=eng&t={TIME}#t={TIME}
 */
export function buildEpisodeWatchUrl(
  tmdbId: number | string,
  season: number,
  episode: number,
  options?: { hostDomain?: string; language?: string; time?: number }
): string {
  if (!tmdbId) return '';
  const host = options?.hostDomain || DEFAULT_SCREENSCAPE_HOST;
  const lang = options?.language || DEFAULT_LANGUAGE;
  const baseUrl = host.startsWith('http') ? host : `https://${host}`;
  const tParam = options?.time && options.time > 0 ? `&t=${Math.floor(options.time)}#t=${Math.floor(options.time)}` : '';
  return `${baseUrl}/embed?tmdb=${tmdbId}&type=tv&s=${season}&e=${episode}&lan=${lang}${tParam}`;
}

/**
 * Resolves the watch URL for any media entity (movie or series episode)
 * using ScreenScape format or configured provider.
 */
export function resolveWatchUrl(params: {
  type: 'movie' | 'tv';
  tmdbId?: number;
  season?: number;
  episode?: number;
  watchConfig?: WatchConfig;
  episodeWatchConfig?: EpisodeWatchConfig;
  customSourceOverride?: string;
  time?: number;
}): string {
  // 1. If explicit URL override is provided (e.g. from user settings), return it
  if (params.customSourceOverride) {
    if (params.time && params.time > 0 && !params.customSourceOverride.includes('#t=') && !params.customSourceOverride.includes('&t=')) {
      const sep = params.customSourceOverride.includes('?') ? '&' : '?';
      return `${params.customSourceOverride}${sep}t=${Math.floor(params.time)}#t=${Math.floor(params.time)}`;
    }
    return params.customSourceOverride;
  }

  const tmdbId = params.watchConfig?.tmdbId || params.episodeWatchConfig?.tmdbId || params.tmdbId;
  if (!tmdbId) return '';

  const provider = params.watchConfig?.watchProvider || params.episodeWatchConfig?.watchProvider || 'screenscape';
  const language = params.watchConfig?.language || params.episodeWatchConfig?.language || DEFAULT_LANGUAGE;
  const hostDomain = params.watchConfig?.hostDomain || DEFAULT_SCREENSCAPE_HOST;

  if (provider === 'screenscape' || provider === 'autoembed' || provider === 'default' || !provider) {
    if (params.type === 'movie') {
      return buildMovieWatchUrl(tmdbId, { hostDomain, language, time: params.time });
    } else {
      const s = params.season ?? params.episodeWatchConfig?.season ?? 1;
      const e = params.episode ?? params.episodeWatchConfig?.episode ?? 1;
      return buildEpisodeWatchUrl(tmdbId, s, e, { hostDomain, language, time: params.time });
    }
  }

  return '';
}
