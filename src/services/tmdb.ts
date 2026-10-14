import { MOVIES_DATA } from '../data/movies';
import { SERIES_DATA } from '../data/series';
import type { Movie, Series, CastMember, Season, Episode } from '../types';
import { isMarvelContent, MARVEL_MOVIE_TMDB_IDS } from '../utils/marvelWhitelist';

// TMDB Serverless API Proxy Configuration (Same-Origin Vercel Serverless Function)
export const TMDB_BASE_URL = '/api/tmdb';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Default Fallback Assets (Marvel Cinematic Studio aesthetic)
export const FALLBACK_POSTER = 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg';
export const FALLBACK_BACKDROP = 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg';
export const FALLBACK_STILL = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop';
export const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop';

// In-memory response cache and in-flight request deduplication
const memoryCache = new Map<string, { data: any; expiry: number }>();
const inFlightRequests = new Map<string, Promise<any>>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours cache

// LocalStorage cache key prefix
const STORAGE_PREFIX = 'zero_g_tmdb_cache_';

function getStoredCache<T>(key: string): T | null {
  // Check in-memory first
  const mem = memoryCache.get(key);
  if (mem && mem.expiry > Date.now()) {
    return mem.data as T;
  }

  // Check sessionStorage / localStorage
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.expiry > Date.now()) {
        memoryCache.set(key, parsed);
        return parsed.data as T;
      } else {
        sessionStorage.removeItem(STORAGE_PREFIX + key);
      }
    }
  } catch {
    // SessionStorage may fail in incognito or restricted mode, safely fallback
  }

  return null;
}

function setStoredCache(key: string, data: any): void {
  const item = { data, expiry: Date.now() + CACHE_TTL_MS };
  memoryCache.set(key, item);
  try {
    sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(item));
  } catch {
    // Silently ignore storage quota errors
  }
}

/**
 * Image URL formatters adhering to TMDB sizes
 */
export function getTmdbPosterUrl(path?: string | null, size: 'w185' | 'w342' | 'w500' | 'original' = 'w500'): string {
  if (!path) return FALLBACK_POSTER;
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getTmdbBackdropUrl(path?: string | null, size: 'w780' | 'w1280' | 'original' = 'w1280'): string {
  if (!path) return FALLBACK_BACKDROP;
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getTmdbStillUrl(path?: string | null, size: 'w300' | 'original' = 'w300'): string {
  if (!path) return FALLBACK_STILL;
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getTmdbProfileUrl(path?: string | null, size: 'w185' | 'w300' | 'original' = 'w185'): string {
  if (!path) return FALLBACK_AVATAR;
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

/**
 * Centralized HTTP client for TMDB through the same-origin /api/tmdb proxy
 * with deduplication, caching, and safe error handling.
 */
export async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  const queryParams = new URLSearchParams(params);
  queryParams.set('path', endpoint);

  const url = `${TMDB_BASE_URL}?${queryParams.toString()}`;
  const cacheKey = `${endpoint}_${queryParams.toString()}`;

  // Return cached result if available
  const cached = getStoredCache<T>(cacheKey);
  if (cached) return cached;

  // Deduplicate in-flight requests for the exact same endpoint
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (res.status === 401 || res.status === 403 || res.status === 502) {
        console.warn('TMDB API: Proxy upstream authentication failed. Verify server-side TMDB_API_KEY.');
        return null;
      }

      if (res.status === 404) {
        return null;
      }

      if (res.status === 429) {
        console.warn('TMDB API: Rate limit hit (HTTP 429). Using local dataset fallback.');
        return null;
      }

      if (res.status === 503) {
        console.warn('TMDB API: TMDB_API_KEY not configured on server. Falling back to curated local data.');
        return null;
      }

      if (!res.ok) {
        console.warn(`TMDB API HTTP Error ${res.status}`);
        return null;
      }

      const data = await res.json();
      setStoredCache(cacheKey, data);
      return data as T;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch';
      console.warn('TMDB API Network Error:', msg);
      return null;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
}

// ==========================================
// CORE TMDB API RETRIEVAL FUNCTIONS
// ==========================================

export interface TmdbMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  tagline: string;
  genres: Array<{ id: number; name: string }>;
  credits?: {
    cast: Array<{ id: number; name: string; character: string; profile_path: string | null }>;
    crew: Array<{ id: number; name: string; job: string; department: string }>;
  };
  videos?: {
    results: Array<{ key: string; site: string; type: string; name: string }>;
  };
}

export interface TmdbTvDetail {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  tagline: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Array<{ id: number; name: string }>;
  created_by: Array<{ id: number; name: string }>;
  seasons: Array<{
    id: number;
    season_number: number;
    name: string;
    overview: string;
    poster_path: string | null;
    episode_count: number;
    air_date: string;
  }>;
  credits?: {
    cast: Array<{ id: number; name: string; character: string; profile_path: string | null }>;
    crew: Array<{ id: number; name: string; job: string; department: string }>;
  };
  videos?: {
    results: Array<{ key: string; site: string; type: string; name: string }>;
  };
}

export interface TmdbSeasonDetail {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  poster_path: string | null;
  episodes: Array<{
    id: number;
    episode_number: number;
    name: string;
    overview: string;
    still_path: string | null;
    air_date: string;
    runtime: number;
    vote_average: number;
  }>;
}

/**
 * Retrieve movie details from TMDB with optional credits and trailers
 */
export async function getMovieDetails(tmdbId: number, includeCreditsAndVideos: boolean = true): Promise<TmdbMovieDetail | null> {
  const params: Record<string, string> = {};
  if (includeCreditsAndVideos) {
    params.append_to_response = 'credits,videos';
  }
  return tmdbFetch<TmdbMovieDetail>(`/movie/${tmdbId}`, params);
}

/**
 * Retrieve TV series details from TMDB with optional credits and trailers
 */
export async function getSeriesDetails(tmdbId: number, includeCreditsAndVideos: boolean = true): Promise<TmdbTvDetail | null> {
  const params: Record<string, string> = {};
  if (includeCreditsAndVideos) {
    params.append_to_response = 'credits,videos';
  }
  return tmdbFetch<TmdbTvDetail>(`/tv/${tmdbId}`, params);
}

/**
 * Retrieve detailed season episode data from TMDB
 */
export async function getSeasonDetails(tmdbId: number, seasonNumber: number): Promise<TmdbSeasonDetail | null> {
  return tmdbFetch<TmdbSeasonDetail>(`/tv/${tmdbId}/season/${seasonNumber}`);
}

/**
 * Retrieve individual episode details from TMDB
 */
export async function getEpisodeDetails(tmdbId: number, seasonNumber: number, episodeNumber: number): Promise<any | null> {
  return tmdbFetch(`/tv/${tmdbId}/season/${seasonNumber}/episode/${episodeNumber}`);
}

/**
 * Dynamically fetch complete season episodes from TMDB with caching
 */
export async function fetchCompleteSeasonEpisodes(
  series: Series,
  seasonNumber: number
): Promise<Episode[]> {
  if (!series.tmdbId) {
    const localSeason = series.seasons.find(s => s.seasonNumber === seasonNumber);
    return localSeason?.episodes || [];
  }

  const cacheKey = `tmdb_season_eps_${series.tmdbId}_s${seasonNumber}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {}

  try {
    const data = await getSeasonDetails(series.tmdbId, seasonNumber);
    if (!data || !data.episodes || data.episodes.length === 0) {
      const localSeason = series.seasons.find(s => s.seasonNumber === seasonNumber);
      return localSeason?.episodes || [];
    }

    const episodes: Episode[] = data.episodes.map(tmdbEp => ({
      id: `${series.id}_s${seasonNumber}_e${tmdbEp.episode_number}`,
      seasonNumber: seasonNumber,
      episodeNumber: tmdbEp.episode_number,
      title: tmdbEp.name || `Episode ${tmdbEp.episode_number}`,
      runtime: tmdbEp.runtime || 45,
      overview: tmdbEp.overview || 'No episode overview available.',
      still: tmdbEp.still_path ? getTmdbStillUrl(tmdbEp.still_path, 'w300') : series.backdrop,
      airDate: tmdbEp.air_date || '',
      episodeWatchConfig: {
        season: seasonNumber,
        episode: tmdbEp.episode_number,
        tmdbId: series.tmdbId,
        watchProvider: 'screenscape',
        language: 'eng'
      }
    }));

    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(episodes));
    } catch {}

    return episodes;
  } catch (err) {
    console.warn(`Failed to fetch season ${seasonNumber} for ${series.title}:`, err);
    const localSeason = series.seasons.find(s => s.seasonNumber === seasonNumber);
    return localSeason?.episodes || [];
  }
}

/**
 * Fetch popular movies from TMDB
 */
export async function fetchPopularMovies(): Promise<any[]> {
  const data = await tmdbFetch<{ results: any[] }>('/movie/popular');
  return data?.results || [];
}

/**
 * Fetch now playing movies from TMDB
 */
export async function fetchNowPlayingMovies(): Promise<any[]> {
  const data = await tmdbFetch<{ results: any[] }>('/movie/now_playing');
  return data?.results || [];
}

/**
 * Fetch upcoming movies from TMDB
 */
export async function fetchUpcomingMovies(): Promise<any[]> {
  const data = await tmdbFetch<{ results: any[] }>('/movie/upcoming');
  return data?.results || [];
}

/**
 * Fetch popular TV series from TMDB
 */
export async function fetchPopularSeries(): Promise<any[]> {
  const data = await tmdbFetch<{ results: any[] }>('/tv/popular');
  return data?.results || [];
}

/**
 * Fetch airing today TV series from TMDB
 */
export async function fetchAiringTodaySeries(): Promise<any[]> {
  const data = await tmdbFetch<{ results: any[] }>('/tv/airing_today');
  return data?.results || [];
}

/**
 * Fetch trending all media from TMDB for the week
 */
export async function fetchTrendingAll(timeWindow: 'day' | 'week' = 'week'): Promise<any[]> {
  const data = await tmdbFetch<{ results: any[] }>(`/trending/all/${timeWindow}`);
  return data?.results || [];
}

// ==========================================
// SEARCH INTEGRATION
// ==========================================

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const raw = await tmdbFetch<{ results: any[] }>('/search/movie', {
    query: encodeURIComponent(query.trim())
  });

  if (raw && raw.results && raw.results.length > 0) {
    const liveMatches: Movie[] = raw.results
      .filter((item: any) =>
        MARVEL_MOVIE_TMDB_IDS.has(item.id) ||
        MOVIES_DATA.some(m => m.tmdbId === item.id || m.title.toLowerCase() === (item.title || '').toLowerCase())
      )
      .map((item: any) => {
        // Inherit verified metadata from local curated records
        const local = MOVIES_DATA.find(m => m.tmdbId === item.id || m.title.toLowerCase() === item.title.toLowerCase());
        const year = item.release_date ? parseInt(item.release_date.substring(0, 4), 10) : (local?.year || 2024);

        return {
          id: local ? local.id : `tmdb_m_${item.id}`,
          title: local?.title || item.title,
          year,
          releaseDate: item.release_date || local?.releaseDate || `${year}-01-01`,
          runtime: local?.runtime || item.runtime || 120,
          overview: item.overview || local?.overview || '',
          poster: item.poster_path ? getTmdbPosterUrl(item.poster_path, 'w500') : (local?.poster || FALLBACK_POSTER),
          backdrop: item.backdrop_path ? getTmdbBackdropUrl(item.backdrop_path, 'w1280') : (local?.backdrop || FALLBACK_BACKDROP),
          rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : (local?.rating || 7.5),
          phase: local?.phase,
          saga: local?.saga,
          studio: local?.studio,
          studioId: local?.studioId,
          universe: local?.universe,
          universeId: local?.universeId,
          franchise: local?.franchise,
          movieType: local?.movieType || 'live-action',
          isMcu: local?.isMcu || false,
          isAnimation: local?.isAnimation || false,
          isLegacy: local?.isLegacy || false,
          genres: local?.genres || (item.genres?.map((g: any) => g.name) || ['Action', 'Sci-Fi']),
          director: local?.director || 'Marvel',
          cast: local?.cast || [],
          characters: local?.characters || [],
          releaseOrder: local?.releaseOrder || 99,
          chronologicalOrder: local?.chronologicalOrder || 99,
          tmdbId: item.id,
          tagline: local?.tagline,
          watchConfig: {
            tmdbId: item.id,
            type: 'movie',
            watchProvider: 'screenscape',
            language: 'eng'
          }
        };
      });

    if (liveMatches.length > 0) return liveMatches;
  }

  // Local fallback
  const q = query.toLowerCase();
  return MOVIES_DATA.filter(m =>
    isMarvelContent(m) &&
    (m.title.toLowerCase().includes(q) ||
     m.overview.toLowerCase().includes(q) ||
     m.cast.some(c => c.name.toLowerCase().includes(q)))
  );
}

export async function searchSeries(query: string): Promise<Series[]> {
  if (!query.trim()) return [];

  const raw = await tmdbFetch<{ results: any[] }>('/search/tv', {
    query: encodeURIComponent(query.trim())
  });

  if (raw && raw.results && raw.results.length > 0) {
    const liveMatches: Series[] = raw.results
      .filter((item: any) => isMarvelContent({ tmdbId: item.id, title: item.name }))
      .map((item: any) => {
        const local = SERIES_DATA.find(s => s.tmdbId === item.id || s.title.toLowerCase() === item.name.toLowerCase());
        const year = item.first_air_date ? parseInt(item.first_air_date.substring(0, 4), 10) : (local?.year || 2024);

        return {
          id: local ? local.id : `tmdb_s_${item.id}`,
          title: item.name,
          year,
          releaseYear: item.first_air_date ? item.first_air_date.substring(0, 4) : (local?.releaseYear || '2024'),
          overview: item.overview || local?.overview || '',
          poster: getTmdbPosterUrl(item.poster_path, 'w500'),
          backdrop: getTmdbBackdropUrl(item.backdrop_path, 'w1280'),
          rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : (local?.rating || 7.8),
          phase: local?.phase || 'Phase 5',
          saga: local?.saga || 'Multiverse Saga',
          genres: local?.genres || ['Action', 'Drama'],
          seasons: local?.seasons || [],
          creator: local?.creator || 'Marvel Studios',
          cast: local?.cast || [],
          characters: local?.characters || [],
          releaseOrder: local?.releaseOrder || 99,
          chronologicalOrder: local?.chronologicalOrder || 99,
          tmdbId: item.id,
          tagline: local?.tagline,
          watchConfig: {
            tmdbId: item.id,
            type: 'tv',
            watchProvider: 'screenscape',
            language: 'eng'
          }
        };
      });

    if (liveMatches.length > 0) return liveMatches;
  }

  // Local fallback
  const q = query.toLowerCase();
  return SERIES_DATA.filter(s =>
    isMarvelContent(s) &&
    (s.title.toLowerCase().includes(q) ||
     s.overview.toLowerCase().includes(q))
  );
}

/**
 * Multi-search returning both movies and TV series
 */
export async function searchMulti(query: string): Promise<{ movies: Movie[]; series: Series[] }> {
  if (!query.trim()) return { movies: [], series: [] };

  const [movies, series] = await Promise.all([
    searchMovies(query),
    searchSeries(query)
  ]);

  return { movies, series };
}

// ==========================================
// MEDIA ENRICHMENT ENGINE
// ==========================================

/**
 * Enriches a single Movie with real TMDB high-res posters, backdrops, ratings, and runtime.
 * When isDetail is true, additionally fetches credits (cast/crew) and trailers.
 */
export async function enrichMovieWithTmdb(movie: Movie, isDetail: boolean = false): Promise<Movie> {
  if (!movie.tmdbId) return movie;

  try {
    const tmdbData = await getMovieDetails(movie.tmdbId, isDetail);
    if (!tmdbData) return movie;

    // Catalogue Integrity Guard: Validate that the fetched movie from TMDB actually corresponds to this Marvel title.
    // Prevents non-Marvel movies from corrupting the catalogue (e.g. Battle: Los Angeles, Virgin Territory, Marine Boy, It Follows).
    const normCur = movie.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normTmdb = (tmdbData.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const isVerifiedMatch =
      MARVEL_MOVIE_TMDB_IDS.has(movie.tmdbId) ||
      normCur.includes(normTmdb) ||
      normTmdb.includes(normCur) ||
      (movie.franchise && normTmdb.includes(movie.franchise.toLowerCase().replace(/[^a-z0-9]/g, '')));

    if (!isVerifiedMatch) {
      console.warn(`[TMDB Guard] Rejected mismatch: "${tmdbData.title}" does not match Marvel movie "${movie.title}" (TMDB ID: ${movie.tmdbId})`);
      return movie;
    }

    // Extract official trailer from videos if available (in detail mode)
    let trailerUrl = movie.trailerUrl;
    if (isDetail && tmdbData.videos?.results) {
      const trailer = tmdbData.videos.results.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
      if (trailer) {
        trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      }
    }

    // Convert top cast members with portraits (in detail mode)
    const cast: CastMember[] = isDetail && tmdbData.credits?.cast && tmdbData.credits.cast.length > 0
      ? tmdbData.credits.cast.slice(0, 8).map(c => ({
          name: c.name,
          role: c.character,
          avatar: c.profile_path ? getTmdbProfileUrl(c.profile_path) : undefined
        }))
      : movie.cast;

    // Director from crew (in detail mode)
    let director = movie.director;
    if (isDetail && tmdbData.credits?.crew) {
      const dirMember = tmdbData.credits.crew.find(c => c.job === 'Director');
      if (dirMember) director = dirMember.name;
    }

    return {
      ...movie,
      title: tmdbData.title || movie.title,
      overview: tmdbData.overview || movie.overview,
      poster: tmdbData.poster_path ? getTmdbPosterUrl(tmdbData.poster_path, 'w500') : movie.poster,
      backdrop: tmdbData.backdrop_path ? getTmdbBackdropUrl(tmdbData.backdrop_path, 'w1280') : movie.backdrop,
      rating: tmdbData.vote_average ? Math.round(tmdbData.vote_average * 10) / 10 : movie.rating,
      runtime: tmdbData.runtime || movie.runtime,
      tagline: tmdbData.tagline || movie.tagline,
      genres: tmdbData.genres?.length ? tmdbData.genres.map(g => g.name) : movie.genres,
      director,
      cast,
      trailerUrl
    };
  } catch (e) {
    return movie;
  }
}

/**
 * Enriches a single Series with real TMDB high-res posters, backdrops, ratings, and seasons.
 * When isDetail is true, additionally fetches cast credits and season episodes.
 */
export async function enrichSeriesWithTmdb(series: Series, isDetail: boolean = false): Promise<Series> {
  if (!series.tmdbId) return series;

  try {
    const tmdbData = await getSeriesDetails(series.tmdbId, isDetail);
    if (!tmdbData) return series;

    // Convert top cast members with portraits (in detail mode)
    const cast: CastMember[] = isDetail && tmdbData.credits?.cast && tmdbData.credits.cast.length > 0
      ? tmdbData.credits.cast.slice(0, 8).map(c => ({
          name: c.name,
          role: c.character,
          avatar: c.profile_path ? getTmdbProfileUrl(c.profile_path) : undefined
        }))
      : series.cast;

    // Map seasons and update posters
    const updatedSeasons: Season[] = (series.seasons || []).map(localSeason => {
      const tmdbSeason = tmdbData.seasons?.find(s => s.season_number === localSeason.seasonNumber);
      return {
        ...localSeason,
        title: tmdbSeason?.name || localSeason.title,
        overview: tmdbSeason?.overview || localSeason.overview,
        poster: tmdbSeason?.poster_path ? getTmdbPosterUrl(tmdbSeason.poster_path, 'w500') : localSeason.poster
      };
    });

    return {
      ...series,
      title: tmdbData.name || series.title,
      overview: tmdbData.overview || series.overview,
      poster: tmdbData.poster_path ? getTmdbPosterUrl(tmdbData.poster_path, 'w500') : series.poster,
      backdrop: tmdbData.backdrop_path ? getTmdbBackdropUrl(tmdbData.backdrop_path, 'w1280') : series.backdrop,
      rating: tmdbData.vote_average ? Math.round(tmdbData.vote_average * 10) / 10 : series.rating,
      tagline: tmdbData.tagline || series.tagline,
      genres: tmdbData.genres?.length ? tmdbData.genres.map(g => g.name) : series.genres,
      cast,
      seasons: updatedSeasons
    };
  } catch (e) {
    return series;
  }
}

/**
 * Fetch and enrich season episode stills and descriptions
 */
export async function enrichSeasonEpisodes(tmdbId: number, seasonNumber: number, localEpisodes: Episode[]): Promise<Episode[]> {
  try {
    const data = await getSeasonDetails(tmdbId, seasonNumber);
    if (!data || !data.episodes) return localEpisodes;

    return localEpisodes.map(ep => {
      const tmdbEp = data.episodes.find(e => e.episode_number === ep.episodeNumber);
      if (!tmdbEp) return ep;

      return {
        ...ep,
        title: tmdbEp.name || ep.title,
        overview: tmdbEp.overview || ep.overview,
        still: tmdbEp.still_path ? getTmdbStillUrl(tmdbEp.still_path, 'w300') : ep.still,
        airDate: tmdbEp.air_date || ep.airDate,
        runtime: tmdbEp.runtime || ep.runtime
      };
    });
  } catch {
    return localEpisodes;
  }
}

/**
 * Batch enrich all movies in parallel with summary data (fast & efficient)
 */
export async function enrichAllMovies(movies: Movie[] = MOVIES_DATA): Promise<Movie[]> {
  const results: Movie[] = [];
  const chunkSize = 5;

  for (let i = 0; i < movies.length; i += chunkSize) {
    const chunk = movies.slice(i, i + chunkSize);
    const enrichedChunk = await Promise.all(chunk.map(m => enrichMovieWithTmdb(m, false)));
    results.push(...enrichedChunk);
  }

  return results;
}

/**
 * Batch enrich all series in parallel with summary data (fast & efficient)
 */
export async function enrichAllSeries(seriesList: Series[] = SERIES_DATA): Promise<Series[]> {
  const results: Series[] = [];
  const chunkSize = 5;

  for (let i = 0; i < seriesList.length; i += chunkSize) {
    const chunk = seriesList.slice(i, i + chunkSize);
    const enrichedChunk = await Promise.all(chunk.map(s => enrichSeriesWithTmdb(s, false)));
    results.push(...enrichedChunk);
  }

  return results;
}

/**
 * Get single Movie by ID, checking local and fetching TMDB details if needed
 */
export async function getMovie(id: string): Promise<Movie | undefined> {
  const local = MOVIES_DATA.find(m => m.id === id);
  if (local) {
    return enrichMovieWithTmdb(local);
  }

  if (id.startsWith('tmdb_m_')) {
    const tmdbId = parseInt(id.replace('tmdb_m_', ''), 10);
    const tmdbData = await getMovieDetails(tmdbId);
    if (tmdbData && isMarvelContent({ tmdbId: tmdbData.id, title: tmdbData.title })) {
      const year = tmdbData.release_date ? parseInt(tmdbData.release_date.substring(0, 4), 10) : 2024;
      return {
        id,
        title: tmdbData.title,
        year,
        releaseDate: tmdbData.release_date || `${year}-01-01`,
        runtime: tmdbData.runtime || 120,
        overview: tmdbData.overview,
        poster: getTmdbPosterUrl(tmdbData.poster_path, 'w500'),
        backdrop: getTmdbBackdropUrl(tmdbData.backdrop_path, 'w1280'),
        rating: tmdbData.vote_average ? Math.round(tmdbData.vote_average * 10) / 10 : 7.5,
        phase: 'Phase 5',
        saga: 'Multiverse Saga',
        genres: tmdbData.genres?.map(g => g.name) || ['Action', 'Sci-Fi'],
        director: 'Marvel Studios',
        cast: [],
        characters: [],
        releaseOrder: 99,
        chronologicalOrder: 99,
        tmdbId: tmdbData.id,
        watchConfig: {
          tmdbId: tmdbData.id,
          type: 'movie',
          watchProvider: 'screenscape',
          language: 'eng'
        }
      };
    }
  }

  return undefined;
}

/**
 * Get single Series by ID, checking local and fetching TMDB details if needed
 */
export async function getSeries(id: string): Promise<Series | undefined> {
  const local = SERIES_DATA.find(s => s.id === id);
  if (local) {
    return enrichSeriesWithTmdb(local);
  }

  if (id.startsWith('tmdb_s_')) {
    const tmdbId = parseInt(id.replace('tmdb_s_', ''), 10);
    const tmdbData = await getSeriesDetails(tmdbId);
    if (tmdbData && isMarvelContent({ tmdbId: tmdbData.id, title: tmdbData.name })) {
      const year = tmdbData.first_air_date ? parseInt(tmdbData.first_air_date.substring(0, 4), 10) : 2024;
      return {
        id,
        title: tmdbData.name,
        year,
        releaseYear: tmdbData.first_air_date ? tmdbData.first_air_date.substring(0, 4) : '2024',
        overview: tmdbData.overview,
        poster: getTmdbPosterUrl(tmdbData.poster_path, 'w500'),
        backdrop: getTmdbBackdropUrl(tmdbData.backdrop_path, 'w1280'),
        rating: tmdbData.vote_average ? Math.round(tmdbData.vote_average * 10) / 10 : 7.8,
        phase: 'Phase 5',
        saga: 'Multiverse Saga',
        genres: tmdbData.genres?.map(g => g.name) || ['Action', 'Drama'],
        seasons: [],
        creator: 'Marvel Studios',
        cast: [],
        characters: [],
        releaseOrder: 99,
        chronologicalOrder: 99,
        tmdbId: tmdbData.id,
        watchConfig: {
          tmdbId: tmdbData.id,
          type: 'tv',
          watchProvider: 'screenscape',
          language: 'eng'
        }
      };
    }
  }

  return undefined;
}

export async function getPopularMovies(): Promise<Movie[]> {
  return enrichAllMovies(MOVIES_DATA.slice(0, 10));
}

export async function getPopularSeries(): Promise<Series[]> {
  return enrichAllSeries(SERIES_DATA.slice(0, 10));
}
