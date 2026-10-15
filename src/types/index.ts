export type Phase =
  | 'Phase 1'
  | 'Phase 2'
  | 'Phase 3'
  | 'Phase 4'
  | 'Phase 5'
  | 'Phase 6'
  | 'Defenders'
  | 'Marvel Television'
  | 'Legacy'
  | 'Upcoming';

export type Saga =
  | 'Infinity Saga'
  | 'Multiverse Saga'
  | 'The Defenders Saga'
  | 'Marvel Television'
  | 'Multiverse'
  | 'Upcoming';

export type Continuity =
  | 'Sacred Timeline'
  | 'Multiverse'
  | 'Alternate Timeline'
  | 'Adjacent Canon';

export type TimelineMediaType = 'movie' | 'series' | 'one-shot' | 'special';

export type MediaSubtype =
  | 'feature-film'
  | 'one-shot'
  | 'short-film'
  | 'special-presentation'
  | 'television-special';

export type CharacterRole = 'hero' | 'villain' | 'antihero' | 'supporting';

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

export type StudioId =
  | 'marvel-studios'
  | 'sony-pictures'
  | '20th-century-fox'
  | 'new-line-cinema'
  | 'universal-pictures'
  | 'lionsgate'
  | 'marvel-animation'
  | 'marvel-television'
  | 'standalone-marvel';

export type UniverseId =
  | 'earth-616'        // Main MCU / Sacred Timeline
  | 'earth-96283'      // Raimi Spider-Man Trilogy
  | 'earth-120703'     // Webb The Amazing Spider-Man
  | 'earth-688'        // Sony's Spider-Man Universe (Venom, Morbius, Kraven)
  | 'earth-10005'      // Fox Original X-Men Timeline
  | 'earth-trn414'     // Fox Revised X-Men / Deadpool Timeline
  | 'earth-121698'     // Fox Fantastic Four (2005/2007)
  | 'earth-trn562'     // Fox Fant4stic (2015)
  | 'earth-26320'      // New Line Blade Trilogy
  | 'earth-trn012'     // Ghost Rider Universe
  | 'earth-sv'         // Spider-Verse Multiverse
  | 'earth-92131'      // X-Men '97 & 90s Animated Universe
  | 'earth-8096'       // Avengers: EMH / Wolverine & X-Men
  | 'earth-12041'      // Ultimate Spider-Man / Avengers Assemble
  | 'earth-26496'      // The Spectacular Spider-Man
  | 'earth-828038'     // Retro-60s Alternate Universe (Fantastic Four: First Steps)
  | 'standalone-marvel'// Standalone Marvel Universe
  | 'marvel-legacy-tv' // Agents of S.H.I.E.L.D., Inhumans, Runaways, Cloak & Dagger, Legion, The Gifted
  | 'multiverse'
  | (string & {});

export interface StudioInfo {
  id: StudioId;
  name: string;
  shortName: string;
  description: string;
  foundedYear: number;
  featuredFranchises: string[];
  bannerUrl?: string;
}

export interface UniverseInfo {
  id: UniverseId;
  designation: string;
  name: string;
  description: string;
  primaryStudio: string;
  keyHeroes: string[];
  bannerUrl?: string;
}

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
  phase?: Phase;
  saga?: Saga;
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
  type?: 'movie' | 'one-shot' | 'special';
  studio?: string;
  studioId?: StudioId;
  distributor?: string;
  franchise?: string;
  universe?: string;
  universeId?: UniverseId;
  universeDesignation?: string;
  movieType?: 'live-action' | 'animation' | 'short' | 'special' | 'tv-movie';
  mediaSubtype?: MediaSubtype;
  mcuRelationship?: 'canon-mcu' | 'multiverse-crossover' | 'non-mcu' | 'legacy' | 'sony-collaboration';
  isAnimation?: boolean;
  isMcu?: boolean;
  isLegacy?: boolean;
  isCollaboration?: boolean;
  isUpcoming?: boolean;
  isReleased?: boolean;
  releaseStatus?: 'released' | 'upcoming';
  upcomingStatus?: 'confirmed' | 'announced' | 'unconfirmed';
  mcuChronologyOrder?: number;
  universeChronologyOrder?: number;
  verificationStatus?: 'verified' | 'unverified';
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
  poster?: string;
  episodes: Episode[];
  episodeCount?: number;
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
  totalEpisodes?: number;
  totalSeasons?: number;
  watchSource?: string;
  watchConfig?: WatchConfig;
  tagline?: string;
  studio?: string;
  studioId?: StudioId;
  distributor?: string;
  franchise?: string;
  universe?: string;
  universeId?: UniverseId;
  universeDesignation?: string;
  isAnimation?: boolean;
  isMcu?: boolean;
  isLegacy?: boolean;
  releaseStatus?: 'released' | 'upcoming';
  upcomingStatus?: 'confirmed' | 'announced' | 'unconfirmed';
  mediaSubtype?: string;
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
  role?: CharacterRole;
  universe?: string;
  universeId?: UniverseId;
  franchise?: string;
  shorts?: string[];
  status?: string;
};

export type TimelineNode = {
  id: string;
  title: string;
  type: TimelineMediaType;
  phase: Phase;
  saga: Saga;
  continuity: Continuity;
  year: number;
  releaseDate: string;
  releaseOrder: number;
  chronologicalOrder: number;
  tmdbId?: number;
  poster: string;
  backdrop: string;
  overview: string;
  tagline?: string;
  rating?: number;
  seasonNumber?: number;
  timelineNotes?: string;
  characters?: string[];
  cast?: CastMember[];
  screenScapeAvailable: boolean;
  isUpcoming?: boolean;
  studio?: string;
  studioId?: StudioId;
  distributor?: string;
  franchise?: string;
  universe?: string;
  universeId?: UniverseId;
  universeDesignation?: string;
  movieType?: 'live-action' | 'animation' | 'short' | 'special' | 'tv-movie';
  mediaSubtype?: MediaSubtype;
  mcuRelationship?: 'canon-mcu' | 'multiverse-crossover' | 'non-mcu' | 'legacy' | 'sony-collaboration';
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
