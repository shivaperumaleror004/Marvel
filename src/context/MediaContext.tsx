import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Movie, Series } from '../types';
import { MOVIES_DATA } from '../data/movies';
import { SERIES_DATA } from '../data/series';
import { enrichAllMovies, enrichAllSeries, enrichMovieWithTmdb, enrichSeriesWithTmdb } from '../services/tmdb';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMedia = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch TMDB enriched movies and series in parallel
      const [enrichedMovies, enrichedSeries] = await Promise.all([
        enrichAllMovies(MOVIES_DATA),
        enrichAllSeries(SERIES_DATA)
      ]);

      setMovies(enrichedMovies);
      setSeries(enrichedSeries);
    } catch (err: any) {
      console.warn('Failed to load TMDB media enrichment:', err);
      setError('Could not connect to TMDB. Using local Marvel dataset.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

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
        refreshMedia: loadMedia,
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
