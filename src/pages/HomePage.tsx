import React from 'react';
import { Hero } from '../components/home/Hero';
import { ContinueWatchingRow } from '../components/home/ContinueWatchingRow';
import { MovieCarousel } from '../components/home/MovieCarousel';
import { SeriesCarousel } from '../components/home/SeriesCarousel';
import { TimelinePreview } from '../components/home/TimelinePreview';
import { PageTransition } from '../components/ui/PageTransition';
import { Movie, Series, TimelineNode, WatchProgress } from '../types';
import { useMedia } from '../context/MediaContext';

interface HomePageProps {
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
  onWatchSeries: (series: Series) => void;
  onResumeProgress: (progress: WatchProgress) => void;
  onOpenTimelinePage: () => void;
  onSelectTimelineNode: (node: TimelineNode) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectMovie,
  onWatchMovie,
  onSelectSeries,
  onWatchSeries,
  onResumeProgress,
  onOpenTimelinePage,
  onSelectTimelineNode
}) => {
  const { movies, series } = useMedia();
  const featuredMovie = movies[0];

  return (
    <PageTransition>
      <div className="space-y-4">
        {/* Cinematic Hero with Real TMDB Backdrop */}
        {featuredMovie && (
          <Hero
            movie={featuredMovie}
            onWatch={onWatchMovie}
            onSelect={onSelectMovie}
          />
        )}

        {/* Continue Watching Section */}
        <ContinueWatchingRow onResume={onResumeProgress} />

        {/* Marvel Movies Carousel */}
        <MovieCarousel
          title="Marvel Cinematic Movies"
          movies={movies}
          onSelectMovie={onSelectMovie}
          onWatchMovie={onWatchMovie}
        />

        {/* Marvel Series Carousel */}
        <SeriesCarousel
          title="Marvel Original Series"
          series={series}
          onSelectSeries={onSelectSeries}
          onWatchSeries={onWatchSeries}
        />

        {/* MCU Timeline Interactive Navigator */}
        <TimelinePreview
          onOpenTimelinePage={onOpenTimelinePage}
          onSelectNode={onSelectTimelineNode}
        />
      </div>
    </PageTransition>
  );
};
