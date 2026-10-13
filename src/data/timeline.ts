import type { TimelineNode } from '../types';
import { MOVIES_DATA } from './movies';
import { SERIES_DATA } from './series';

export const TIMELINE_NODES: TimelineNode[] = [
  ...MOVIES_DATA.map(m => ({
    id: m.id,
    title: m.title,
    type: 'movie' as const,
    phase: m.phase,
    saga: m.saga,
    year: m.year,
    releaseDate: m.releaseDate,
    releaseOrder: m.releaseOrder,
    chronologicalOrder: m.chronologicalOrder,
    poster: m.poster,
    backdrop: m.backdrop,
    overview: m.overview,
    tagline: m.tagline,
    rating: m.rating
  })),
  ...SERIES_DATA.map(s => ({
    id: s.id,
    title: s.title,
    type: 'series' as const,
    phase: s.phase,
    saga: s.saga,
    year: s.year,
    releaseDate: `${s.year}-01-01`,
    releaseOrder: s.releaseOrder,
    chronologicalOrder: s.chronologicalOrder,
    poster: s.poster,
    backdrop: s.backdrop,
    overview: s.overview,
    tagline: s.tagline,
    rating: s.rating
  }))
];

export const getTimelineNodesByOrder = (order: 'release' | 'chronological') => {
  return [...TIMELINE_NODES].sort((a, b) => {
    return order === 'release' 
      ? a.releaseOrder - b.releaseOrder 
      : a.chronologicalOrder - b.chronologicalOrder;
  });
};
