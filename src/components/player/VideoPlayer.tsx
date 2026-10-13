import React from 'react';
import { WatchPlayer } from './WatchPlayer';
import type { Movie, Series, Episode } from '../../types';

export { WatchPlayer };

interface VideoPlayerProps {
  id: string;
  mediaId: string;
  mediaType: 'movie' | 'series';
  seriesId?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  title: string;
  subtitle?: string;
  poster: string;
  source?: string;
  movie?: Movie;
  series?: Series;
  episode?: Episode;
  onNavigateSettings?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  return (
    <WatchPlayer
      mediaType={props.mediaType}
      mediaId={props.mediaId || props.id}
      movie={props.movie}
      series={props.series}
      episode={props.episode}
      seasonNumber={props.seasonNumber}
      episodeNumber={props.episodeNumber}
      onNavigateSettings={props.onNavigateSettings}
    />
  );
};
