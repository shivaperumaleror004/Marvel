import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { SearchOverlay } from './components/layout/SearchOverlay';

import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { SeriesPage } from './pages/SeriesPage';

// Dynamic imports for code splitting to optimize bundle size and initial load
const AnimationPage = React.lazy(() => import('./pages/AnimationPage').then(m => ({ default: m.AnimationPage })));
const StudiosPage = React.lazy(() => import('./pages/StudiosPage').then(m => ({ default: m.StudiosPage })));
const UniversesPage = React.lazy(() => import('./pages/UniversesPage').then(m => ({ default: m.UniversesPage })));
const MovieDetailPage = React.lazy(() => import('./pages/MovieDetailPage').then(m => ({ default: m.MovieDetailPage })));
const SeriesDetailPage = React.lazy(() => import('./pages/SeriesDetailPage').then(m => ({ default: m.SeriesDetailPage })));
const WatchPage = React.lazy(() => import('./pages/WatchPage').then(m => ({ default: m.WatchPage })));
const TimelinePage = React.lazy(() => import('./pages/TimelinePage').then(m => ({ default: m.TimelinePage })));
const CharactersPage = React.lazy(() => import('./pages/CharactersPage').then(m => ({ default: m.CharactersPage })));
const CharacterDetailPage = React.lazy(() => import('./pages/CharacterDetailPage').then(m => ({ default: m.CharacterDetailPage })));
const ShortsPage = React.lazy(() => import('./pages/ShortsPage').then(m => ({ default: m.ShortsPage })));
const UpcomingPage = React.lazy(() => import('./pages/UpcomingPage').then(m => ({ default: m.UpcomingPage })));
const MyListPage = React.lazy(() => import('./pages/MyListPage').then(m => ({ default: m.MyListPage })));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));

const PageLoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[55vh] text-center px-4">
    <div className="w-10 h-10 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4" />
    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Loading Module...</span>
  </div>
);

import { Movie, Series, Episode, Character, TimelineNode, WatchProgress } from './types';
import { MediaProvider, useMedia } from './context/MediaContext';
import { MOVIES_DATA } from './data/movies';
import { SERIES_DATA } from './data/series';

function MarvelHubContent() {
  const { movies, series: seriesList } = useMedia();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Selected entities state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Watch state
  const [watchTarget, setWatchTarget] = useState<{
    mediaType: 'movie' | 'series';
    movie?: Movie;
    series?: Series;
    episode?: Episode;
  } | null>(null);

  // Navigation handlers
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setActiveTab('movie-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWatchMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setWatchTarget({
      mediaType: 'movie',
      movie
    });
    setActiveTab('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSeries = (series: Series) => {
    setSelectedSeries(series);
    setActiveTab('series-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWatchSeries = (series: Series) => {
    setSelectedSeries(series);
    const firstEp = series.seasons[0]?.episodes[0];
    if (firstEp) {
      setWatchTarget({
        mediaType: 'series',
        series,
        episode: firstEp
      });
      setActiveTab('watch');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('series-detail');
    }
  };

  const handleWatchEpisode = (series: Series, episode: Episode) => {
    setSelectedSeries(series);
    setWatchTarget({
      mediaType: 'series',
      series,
      episode
    });
    setActiveTab('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setActiveTab('character-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTimelineNode = (node: TimelineNode) => {
    if (node.type === 'movie' || node.type === 'one-shot' || node.type === 'special') {
      const movie = movies.find(m => m.id === node.id);
      if (movie) {
        handleSelectMovie(movie);
      } else {
        // Synthesize movie for detail page
        handleSelectMovie({
          id: node.id,
          title: node.title,
          year: node.year,
          releaseDate: node.releaseDate,
          runtime: 120,
          overview: node.overview,
          poster: node.poster,
          backdrop: node.backdrop,
          rating: node.rating || 7.5,
          phase: node.phase,
          saga: node.saga,
          genres: ['Action', 'Adventure', 'Sci-Fi'],
          director: 'Marvel Studios',
          cast: node.cast || [],
          characters: node.characters || [],
          releaseOrder: node.releaseOrder,
          chronologicalOrder: node.chronologicalOrder,
          tmdbId: node.tmdbId,
          watchConfig: {
            tmdbId: node.tmdbId || 0,
            type: 'movie',
            watchProvider: 'screenscape',
            language: 'eng'
          }
        });
      }
    } else {
      const series = seriesList.find(s => s.id === node.id);
      if (series) {
        handleSelectSeries(series);
      } else {
        handleSelectSeries({
          id: node.id,
          title: node.title,
          year: node.year,
          releaseYear: `${node.year}`,
          overview: node.overview,
          poster: node.poster,
          backdrop: node.backdrop,
          rating: node.rating || 7.5,
          phase: node.phase,
          saga: node.saga,
          genres: ['Action', 'Adventure', 'Sci-Fi'],
          creator: 'Marvel Studios',
          cast: node.cast || [],
          characters: node.characters || [],
          releaseOrder: node.releaseOrder,
          chronologicalOrder: node.chronologicalOrder,
          tmdbId: node.tmdbId,
          watchConfig: {
            tmdbId: node.tmdbId || 0,
            type: 'tv',
            watchProvider: 'screenscape',
            language: 'eng'
          },
          seasons: [
            {
              seasonNumber: node.seasonNumber || 1,
              title: `Season ${node.seasonNumber || 1}`,
              overview: node.overview,
              poster: node.poster,
              episodes: [
                {
                  id: `${node.id}_s${node.seasonNumber || 1}_e1`,
                  seasonNumber: node.seasonNumber || 1,
                  episodeNumber: 1,
                  title: 'Episode 1',
                  runtime: 50,
                  overview: node.overview,
                  still: node.backdrop,
                  airDate: node.releaseDate,
                  episodeWatchConfig: {
                    season: node.seasonNumber || 1,
                    episode: 1,
                    tmdbId: node.tmdbId
                  }
                }
              ]
            }
          ]
        });
      }
    }
  };

  const handleWatchTimelineNode = (node: TimelineNode) => {
    if (!node.screenScapeAvailable) return;
    if (node.type === 'movie' || node.type === 'one-shot' || node.type === 'special') {
      const movie = movies.find(m => m.id === node.id) || {
        id: node.id,
        title: node.title,
        year: node.year,
        releaseDate: node.releaseDate,
        runtime: 120,
        overview: node.overview,
        poster: node.poster,
        backdrop: node.backdrop,
        rating: node.rating || 7.5,
        phase: node.phase,
        saga: node.saga,
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        director: 'Marvel Studios',
        cast: node.cast || [],
        characters: node.characters || [],
        releaseOrder: node.releaseOrder,
        chronologicalOrder: node.chronologicalOrder,
        tmdbId: node.tmdbId,
        watchConfig: {
          tmdbId: node.tmdbId || 0,
          type: 'movie',
          watchProvider: 'screenscape',
          language: 'eng'
        }
      };
      handleWatchMovie(movie);
    } else {
      const series = seriesList.find(s => s.id === node.id) || {
        id: node.id,
        title: node.title,
        year: node.year,
        releaseYear: `${node.year}`,
        overview: node.overview,
        poster: node.poster,
        backdrop: node.backdrop,
        rating: node.rating || 7.5,
        phase: node.phase,
        saga: node.saga,
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        creator: 'Marvel Studios',
        cast: node.cast || [],
        characters: node.characters || [],
        releaseOrder: node.releaseOrder,
        chronologicalOrder: node.chronologicalOrder,
        tmdbId: node.tmdbId,
        watchConfig: {
          tmdbId: node.tmdbId || 0,
          type: 'tv',
          watchProvider: 'screenscape',
          language: 'eng'
        },
        seasons: [
          {
            seasonNumber: node.seasonNumber || 1,
            title: `Season ${node.seasonNumber || 1}`,
            overview: node.overview,
            poster: node.poster,
            episodes: [
              {
                id: `${node.id}_s${node.seasonNumber || 1}_e1`,
                seasonNumber: node.seasonNumber || 1,
                episodeNumber: 1,
                title: 'Episode 1',
                runtime: 50,
                overview: node.overview,
                still: node.backdrop,
                airDate: node.releaseDate,
                episodeWatchConfig: {
                  season: node.seasonNumber || 1,
                  episode: 1,
                  tmdbId: node.tmdbId
                }
              }
            ]
          }
        ]
      };
      handleWatchSeries(series);
    }
  };

  const handleResumeProgress = (progress: WatchProgress) => {
    if (progress.mediaType === 'movie') {
      const movie = movies.find(m => m.id === progress.mediaId)
        || MOVIES_DATA.find(m => m.id === progress.mediaId)
        || {
          id: progress.mediaId,
          title: progress.title,
          year: new Date().getFullYear(),
          releaseDate: '',
          runtime: Math.round(progress.duration / 60) || 120,
          overview: '',
          poster: progress.poster || '',
          backdrop: progress.backdrop || progress.poster || '',
          rating: 7.5,
          genres: ['Action', 'Sci-Fi'],
          director: 'Marvel Studios',
          cast: [],
          characters: [],
          releaseOrder: 999,
          chronologicalOrder: 999,
          tmdbId: parseInt(progress.mediaId, 10) || undefined,
          watchConfig: {
            tmdbId: parseInt(progress.mediaId, 10) || 0,
            type: 'movie',
            watchProvider: 'screenscape',
            language: 'eng'
          }
        };
      if (movie) handleWatchMovie(movie);
    } else if (progress.mediaType === 'series' && progress.seriesId) {
      const series = seriesList.find(s => s.id === progress.seriesId)
        || SERIES_DATA.find(s => s.id === progress.seriesId);
      if (series) {
        const seasonNum = progress.seasonNumber || 1;
        const epNum = progress.episodeNumber || 1;
        const episode = series.seasons
          .find(s => s.seasonNumber === seasonNum)
          ?.episodes.find(e => e.episodeNumber === epNum)
          || {
            id: `${series.id}_s${seasonNum}_e${epNum}`,
            seasonNumber: seasonNum,
            episodeNumber: epNum,
            title: progress.subtitle || `Episode ${epNum}`,
            runtime: Math.round(progress.duration / 60) || 45,
            overview: '',
            still: progress.poster || progress.backdrop || '',
            airDate: '',
            episodeWatchConfig: {
              season: seasonNum,
              episode: epNum,
              tmdbId: series.watchConfig?.tmdbId || series.tmdbId
            }
          };
        handleWatchEpisode(series, episode);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-gray-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Router */}
      <main className="flex-1 pb-16 md:pb-0">
        <React.Suspense fallback={<PageLoadingFallback />}>
        {activeTab === 'home' && (
          <HomePage
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
            onResumeProgress={handleResumeProgress}
            onOpenTimelinePage={() => handleNavigate('timeline')}
            onSelectTimelineNode={handleSelectTimelineNode}
          />
        )}

        {activeTab === 'movies' && (
          <MoviesPage
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
          />
        )}

        {activeTab === 'series' && (
          <SeriesPage
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
          />
        )}

        {activeTab === 'shorts' && (
          <ShortsPage
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
          />
        )}

        {activeTab === 'upcoming' && (
          <UpcomingPage
            onSelectMovie={handleSelectMovie}
            onSelectSeries={handleSelectSeries}
          />
        )}

        {activeTab === 'animation' && (
          <AnimationPage
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
          />
        )}

        {activeTab === 'studios' && (
          <StudiosPage
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
          />
        )}

        {activeTab === 'universes' && (
          <UniversesPage
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
          />
        )}

        {activeTab === 'movie-detail' && selectedMovie && (
          <MovieDetailPage
            movie={selectedMovie}
            onBack={() => handleNavigate('movies')}
            onWatch={handleWatchMovie}
            onSelectMovie={handleSelectMovie}
            onSelectCharacter={handleSelectCharacter}
          />
        )}

        {activeTab === 'series-detail' && selectedSeries && (
          <SeriesDetailPage
            series={selectedSeries}
            onBack={() => handleNavigate('series')}
            onWatchEpisode={handleWatchEpisode}
            onSelectCharacter={handleSelectCharacter}
          />
        )}

        {activeTab === 'watch' && watchTarget && (
          <WatchPage
            mediaType={watchTarget.mediaType}
            movie={watchTarget.movie}
            series={watchTarget.series}
            episode={watchTarget.episode}
            onSelectEpisode={(series, episode) => {
              setWatchTarget(prev => prev ? { ...prev, series, episode } : null);
            }}
            onBack={() => {
              if (watchTarget.mediaType === 'movie' && watchTarget.movie) {
                handleSelectMovie(watchTarget.movie);
              } else if (watchTarget.series) {
                handleSelectSeries(watchTarget.series);
              } else {
                handleNavigate('home');
              }
            }}
            onNavigateSettings={() => handleNavigate('settings')}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelinePage
            onSelectNode={handleSelectTimelineNode}
            onWatchNode={handleWatchTimelineNode}
          />
        )}

        {activeTab === 'characters' && (
          <CharactersPage
            onSelectCharacter={handleSelectCharacter}
          />
        )}

        {activeTab === 'character-detail' && selectedCharacter && (
          <CharacterDetailPage
            character={selectedCharacter}
            onBack={() => handleNavigate('characters')}
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
            onSelectCharacter={handleSelectCharacter}
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
          />
        )}

        {activeTab === 'mylist' && (
          <MyListPage
            onSelectMovie={handleSelectMovie}
            onWatchMovie={handleWatchMovie}
            onSelectSeries={handleSelectSeries}
            onWatchSeries={handleWatchSeries}
            onResumeProgress={handleResumeProgress}
            onExploreCatalogue={() => handleNavigate('movies')}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPage />
        )}
        </React.Suspense>
      </main>

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectMovie={handleSelectMovie}
        onSelectSeries={handleSelectSeries}
        onSelectCharacter={handleSelectCharacter}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <MediaProvider>
      <MarvelHubContent />
    </MediaProvider>
  );
}

export default App;
