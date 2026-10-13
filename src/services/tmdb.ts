import { MOVIES_DATA } from '../data/movies';
import { SERIES_DATA } from '../data/series';
import type { Movie, Series } from '../types';
import { isMarvelContent } from '../utils/marvelWhitelist';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w1280';

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  if (TMDB_API_KEY) {
    try {
      const res = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const mapped: Movie[] = data.results
            .filter((item: any) => isMarvelContent({ tmdbId: item.id, title: item.title }))
            .map((item: any) => ({
              id: `tmdb_m_${item.id}`,
              title: item.title,
              year: item.release_date ? parseInt(item.release_date.substring(0, 4)) : 2024,
              releaseDate: item.release_date || '2024-01-01',
              runtime: 120,
              overview: item.overview,
              poster: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800',
              backdrop: item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600',
              rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 7.5,
              phase: 'Phase 5',
              saga: 'Multiverse Saga',
              genres: ['Action', 'Sci-Fi'],
              director: 'Marvel Studios',
              cast: [],
              characters: [],
              releaseOrder: 99,
              chronologicalOrder: 99,
              tmdbId: item.id,
              watchConfig: {
                tmdbId: item.id,
                type: 'movie',
                watchProvider: 'screenscape',
                language: 'eng'
              }
            }));
          if (mapped.length > 0) return mapped;
        }
      }
    } catch (e) {
      console.warn('TMDB API request failed, falling back to local dataset.', e);
    }
  }

  // Local dataset fallback - filtered strictly for Marvel content
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

  if (TMDB_API_KEY) {
    try {
      const res = await fetch(`${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const mapped: Series[] = data.results
            .filter((item: any) => isMarvelContent({ tmdbId: item.id, title: item.name }))
            .map((item: any) => ({
              id: `tmdb_s_${item.id}`,
              title: item.name,
              year: item.first_air_date ? parseInt(item.first_air_date.substring(0, 4)) : 2024,
              releaseYear: item.first_air_date ? item.first_air_date.substring(0, 4) : '2024',
              overview: item.overview,
              poster: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800',
              backdrop: item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600',
              rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 7.8,
              phase: 'Phase 5',
              saga: 'Multiverse Saga',
              genres: ['Action', 'Drama'],
              seasons: [],
              creator: 'Marvel Studios',
              cast: [],
              characters: [],
              releaseOrder: 99,
              chronologicalOrder: 99,
              tmdbId: item.id,
              watchConfig: {
                tmdbId: item.id,
                type: 'tv',
                watchProvider: 'screenscape',
                language: 'eng'
              }
            }));
          if (mapped.length > 0) return mapped;
        }
      }
    } catch (e) {
      console.warn('TMDB API request failed, falling back to local dataset.', e);
    }
  }

  // Local dataset fallback - filtered strictly for Marvel content
  const q = query.toLowerCase();
  return SERIES_DATA.filter(s => 
    isMarvelContent(s) &&
    (s.title.toLowerCase().includes(q) || 
     s.overview.toLowerCase().includes(q))
  );
}

export async function getMovie(id: string): Promise<Movie | undefined> {
  const local = MOVIES_DATA.find(m => m.id === id && isMarvelContent(m));
  if (local) return local;

  if (TMDB_API_KEY && id.startsWith('tmdb_m_')) {
    const tmdbId = parseInt(id.replace('tmdb_m_', ''), 10);
    try {
      const res = await fetch(`${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`);
      if (res.ok) {
        const item = await res.json();
        if (isMarvelContent({ tmdbId: item.id, title: item.title })) {
          return {
            id,
            title: item.title,
            year: item.release_date ? parseInt(item.release_date.substring(0, 4)) : 2024,
            releaseDate: item.release_date || '2024-01-01',
            runtime: item.runtime || 120,
            overview: item.overview,
            poster: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800',
            backdrop: item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600',
            rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 7.5,
            phase: 'Phase 5',
            saga: 'Multiverse Saga',
            genres: item.genres ? item.genres.map((g: any) => g.name) : ['Action', 'Sci-Fi'],
            director: 'Marvel Studios',
            cast: [],
            characters: [],
            releaseOrder: 99,
            chronologicalOrder: 99,
            tmdbId: item.id,
            watchConfig: {
              tmdbId: item.id,
              type: 'movie',
              watchProvider: 'screenscape',
              language: 'eng'
            }
          };
        }
      }
    } catch (e) {
      console.warn('Failed to fetch TMDB movie', e);
    }
  }

  return undefined;
}

export async function getSeries(id: string): Promise<Series | undefined> {
  const local = SERIES_DATA.find(s => s.id === id && isMarvelContent(s));
  if (local) return local;

  return undefined;
}

export async function getPopularMovies(): Promise<Movie[]> {
  return MOVIES_DATA.filter(isMarvelContent).slice(0, 10);
}

export async function getPopularSeries(): Promise<Series[]> {
  return SERIES_DATA.filter(isMarvelContent).slice(0, 10);
}
