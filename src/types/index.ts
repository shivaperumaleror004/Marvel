export type Phase = 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4' | 'Phase 5' | 'Phase 6';

export type Saga = 'Infinity Saga' | 'Multiverse Saga';

export type WatchProviderType = 'screenscape' | 'custom' | string;

export interface WatchConfig {
  tmdbId: number;
  type: 'movie' | 'tv';
  watchProvider: WatchProviderType;
  language?: string;
  hostDomain?: string;
}

export interface EpisodeWatchConfig {
  season: number;
  episode: number;
  watchProvider?: WatchProviderType;
  tmdbId?: number;
  language?: string;
}

export type CastMember = {
  name: string;
  role: string;
  avatar?: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number;
  releaseDate: string;
  runtime: number; // minutes
  overview: string;
  poster: string;
  backdrop: string;
  rating: number; // e.g. 8.4
  phase: Phase;
  saga: Saga;
  genres: string[];
  director: string;
  cast: CastMember[];
  characters: string[]; // Character IDs or names
  releaseOrder: number;
  chronologicalOrder: number;
  tmdbId?: number;
  watchSource?: string; // Configurable authorized viewing source
  watchConfig?: WatchConfig;
  trailerUrl?: string;
  tagline?: string;
  mcuConnections?: {
    prevId?: string;
    prevTitle?: string;
    nextId?: string;
    nextTitle?: string;
    note?: string;
  };
};

export type Episode = {
  id: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  runtime: number; // minutes
  overview: string;
  still: string;
  airDate: string;
  watchSource?: string;
  episodeWatchConfig?: EpisodeWatchConfig;
};

export type Season = {
  seasonNumber: number;
  title: string;
  overview: string;
  poster: string;
  episodes: Episode[];
};

export type Series = {
  id: string;
  title: string;
  year: number;
  releaseYear: string;
  overview: string;
  poster: string;
  backdrop: string;
  rating: number;
  phase: Phase;
  saga: Saga;
  genres: string[];
  seasons: Season[];
  creator: string;
  cast: CastMember[];
  characters: string[];
  releaseOrder: number;
  chronologicalOrder: number;
  tmdbId?: number;
  watchSource?: string;
  watchConfig?: WatchConfig;
  tagline?: string;
};

export type Character = {
  id: string;
  name: string;
  alias: string;
  actor: string;
  portrait: string;
  backdrop: string;
  description: string;
  bio: string;
  powers: string[];
  affiliation: string;
  firstAppearance: string;
  movies: string[]; // movie IDs
  series: string[]; // series IDs
  relatedCharacters: string[]; // character IDs
};

export type TimelineNode = {
  id: string;
  title: string;
  type: 'movie' | 'series';
  phase: Phase;
  saga: Saga;
  year: number;
  releaseDate: string;
  releaseOrder: number;
  chronologicalOrder: number;
  poster: string;
  backdrop: string;
  overview: string;
  tagline?: string;
  rating?: number;
};

export type WatchProgress = {
  id: string; // unique ID e.g. 'movie_iron-man' or 'series_loki_s1_e1'
  mediaId: string;
  mediaType: 'movie' | 'series';
  seriesId?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  title: string;
  subtitle?: string; // e.g. "S1:E1 • Glorious Purpose"
  currentTime: number; // in seconds
  duration: number; // in seconds
  percentage: number;
  lastWatched: string; // ISO date string
  poster: string;
  backdrop?: string;
};

export type UserSettings = {
  theme: 'dark' | 'cinema' | 'hud';
  autoplay: boolean;
  reducedMotion: boolean;
  defaultTimelineOrder: 'release' | 'chronological';
  configuredSources: Record<string, string>; // mediaId -> custom stream URL / embed
};

export type SearchFilters = {
  query: string;
  phase: string;
  type: 'all' | 'movie' | 'series' | 'character';
  genre: string;
};
