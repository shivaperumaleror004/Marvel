import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Movie, Series } from '../types';
import { MOVIES_DATA } from '../data/movies';
import { SERIES_DATA } from '../data/series';
import { enrichMovieWithTmdb, enrichSeriesWithTmdb } from '../services/tmdb';

interface MediaContextType {
  movies: Movie[];
  series: Series[];
  isLoading: boolean;
  error: string | null;
  refreshMedia: () => Promise<void>;
  getMovieById: (id: string) => Movie | undefined;
  getSeriesById: (id: string) => Series | undefined;
  enrichMovieDetail: (movie: Movie) => Promise<Movie>;
  enrichSeriesDetail: (series: Series) => Promise<Series>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(MOVIES_DATA);
  const [series, setSeries] = useState<Series[]>(SERIES_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Soft background refresh for top hero items only, never blocking page render
  const refreshMedia = useCallback(async () => {
    try {
      const topMovies = await Promise.all(
        MOVIES_DATA.slice(0, 5).map(m => enrichMovieWithTmdb(m, false))
      );
      setMovies(prev => {
        const map = new Map(topMovies.map(m => [m.id, m]));
        return prev.map(m => map.get(m.id) || m);
      });
    } catch (err: any) {
      console.warn('Soft media refresh failed:', err);
    }
  }, []);

  // Background lazy enrichment of the primary hero movie on startup (0 blocking network requests)
  useEffect(() => {
    let active = true;
    const heroMovie = MOVIES_DATA[0];
    if (heroMovie?.tmdbId) {
      enrichMovieWithTmdb(heroMovie, false)
        .then(enriched => {
          if (active && enriched) {
            setMovies(prev => prev.map(m => m.id === enriched.id ? enriched : m));
          }
        })
        .catch(() => {
          // Gracefully retain curated local data on error / offline
        });
    }
    return () => {
      active = false;
    };
  }, []);

  const getMovieById = useCallback((id: string) => {
    return movies.find(m => m.id === id);
  }, [movies]);

  const getSeriesById = useCallback((id: string) => {
    return series.find(s => s.id === id);
  }, [series]);

  const enrichMovieDetail = useCallback(async (movie: Movie) => {
    const enriched = await enrichMovieWithTmdb(movie, true);
    setMovies(prev => prev.map(m => (m.id === enriched.id ? enriched : m)));
    return enriched;
  }, []);

  const enrichSeriesDetail = useCallback(async (seriesItem: Series) => {
    const enriched = await enrichSeriesWithTmdb(seriesItem, true);
    setSeries(prev => prev.map(s => (s.id === enriched.id ? enriched : s)));
    return enriched;
  }, []);

  return (
    <MediaContext.Provider
      value={{
        movies,
        series,
        isLoading,
        error,
        refreshMedia,
        getMovieById,
        getSeriesById,
        enrichMovieDetail,
        enrichSeriesDetail
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export function useMedia(): MediaContextType {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
