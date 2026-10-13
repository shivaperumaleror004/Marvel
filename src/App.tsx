import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { SearchOverlay } from './components/layout/SearchOverlay';

import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { SeriesPage } from './pages/SeriesPage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { SeriesDetailPage } from './pages/SeriesDetailPage';
import { WatchPage } from './pages/WatchPage';
import { TimelinePage } from './pages/TimelinePage';
import { CharactersPage } from './pages/CharactersPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { MyListPage } from './pages/MyListPage';
import { SettingsPage } from './pages/SettingsPage';

import { Movie, Series, Episode, Character, TimelineNode, WatchProgress } from './types';
import { MOVIES_DATA } from './data/movies';
import { SERIES_DATA } from './data/series';
import { CHARACTERS_DATA } from './data/characters';

export function App() {
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
    if (node.type === 'movie') {
      const movie = MOVIES_DATA.find(m => m.id === node.id);
      if (movie) handleSelectMovie(movie);
    } else {
      const series = SERIES_DATA.find(s => s.id === node.id);
      if (series) handleSelectSeries(series);
    }
  };

  const handleWatchTimelineNode = (node: TimelineNode) => {
    if (node.type === 'movie') {
      const movie = MOVIES_DATA.find(m => m.id === node.id);
      if (movie) handleWatchMovie(movie);
    } else {
      const series = SERIES_DATA.find(s => s.id === node.id);
      if (series) handleWatchSeries(series);
    }
  };

  const handleResumeProgress = (progress: WatchProgress) => {
    if (progress.mediaType === 'movie') {
      const movie = MOVIES_DATA.find(m => m.id === progress.mediaId);
      if (movie) handleWatchMovie(movie);
    } else if (progress.mediaType === 'series' && progress.seriesId) {
      const series = SERIES_DATA.find(s => s.id === progress.seriesId);
      if (series) {
        const episode = series.seasons
          .find(s => s.seasonNumber === progress.seasonNumber)
          ?.episodes.find(e => e.episodeNumber === progress.episodeNumber);
        if (episode) {
          handleWatchEpisode(series, episode);
        } else {
          handleSelectSeries(series);
        }
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
          />
        )}

        {activeTab === 'watch' && watchTarget && (
          <WatchPage
            mediaType={watchTarget.mediaType}
            movie={watchTarget.movie}
            series={watchTarget.series}
            episode={watchTarget.episode}
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

export default App;
