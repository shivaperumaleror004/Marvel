import { MOVIES_DATA } from '../data/movies';
import { SERIES_DATA } from '../data/series';
import type { Movie, Series, CastMember, Season, Episode } from '../types';
import { isMarvelContent } from '../utils/marvelWhitelist';

// TMDB Official API Configuration
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Default Fallback Assets (Dark cinematic aesthetic)
export const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop';
export const FALLBACK_BACKDROP = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600&auto=format&fit=crop';
export const FALLBACK_STILL = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop';
export const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop';

// Retrieve API Key securely from Vite Environment
const RAW_API_KEY = (import.meta.env.VITE_TMDB_API_KEY || '').trim();

// Determine if token is a v4 Bearer Token (JWT format starting with eyJ) or v3 API Key
const IS_BEARER_TOKEN = RAW_API_KEY.startsWith('eyJ');

/**
 * Strips sensitive API keys from strings for safe console logging
 */
function sanitizeLog(message: string): string {
  if (!RAW_API_KEY) return message;
  return message.replace(new RegExp(RAW_API_KEY, 'g'), '[REDACTED_API_KEY]');
}

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
 * Centralized HTTP client for TMDB with deduplication, caching, and safe error handling.
 */
export async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!RAW_API_KEY) {
    return null;
  }

  const queryParams = new URLSearchParams(params);
  if (!IS_BEARER_TOKEN) {
    queryParams.set('api_key', RAW_API_KEY);
  }

  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`;
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
      const headers: HeadersInit = {
        'Accept': 'application/json',
      };
      if (IS_BEARER_TOKEN) {
        headers['Authorization'] = `Bearer ${RAW_API_KEY}`;
      }

      const res = await fetch(url, { headers });

      if (res.status === 401 || res.status === 403) {
        console.warn('TMDB API: Authentication failed. Please verify your VITE_TMDB_API_KEY.');
        return null;
      }

      if (res.status === 404) {
        return null;
      }

      if (res.status === 429) {
        console.warn('TMDB API: Rate limit hit (HTTP 429). Using local dataset fallback.');
        return null;
      }

      if (!res.ok) {
        console.warn(`TMDB API HTTP Error ${res.status}`);
        return null;
      }

      const data = await res.json();
      setStoredCache(cacheKey, data);
      return data as T;
    } catch (err: any) {
      console.warn('TMDB API Network Error:', sanitizeLog(err?.message || 'Failed to fetch'));
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
      .filter((item: any) => isMarvelContent({ tmdbId: item.id, title: item.title }))
      .map((item: any) => {
        // Check if there is an existing local entry to inherit phase/saga/connections
        const local = MOVIES_DATA.find(m => m.tmdbId === item.id || m.title.toLowerCase() === item.title.toLowerCase());
        const year = item.release_date ? parseInt(item.release_date.substring(0, 4), 10) : (local?.year || 2024);

        return {
          id: local ? local.id : `tmdb_m_${item.id}`,
          title: item.title,
          year,
          releaseDate: item.release_date || local?.releaseDate || `${year}-01-01`,
          runtime: local?.runtime || 120,
          overview: item.overview || local?.overview || '',
          poster: getTmdbPosterUrl(item.poster_path, 'w500'),
          backdrop: getTmdbBackdropUrl(item.backdrop_path, 'w1280'),
          rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : (local?.rating || 7.5),
          phase: local?.phase || 'Phase 5',
          saga: local?.saga || 'Multiverse Saga',
          genres: local?.genres || ['Action', 'Sci-Fi'],
          director: local?.director || 'Marvel Studios',
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
