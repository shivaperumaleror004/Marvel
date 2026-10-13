import { useState, useEffect } from 'react';
import type { WatchProgress } from '../types';
import { isMarvelContent } from '../utils/marvelWhitelist';

const STORAGE_KEY = 'marvel_watch_hub_progress';

const DEFAULT_MOCK_PROGRESS: WatchProgress[] = [
  {
    id: 'iron-man',
    mediaId: 'iron-man',
    mediaType: 'movie',
    title: 'Iron Man',
    currentTime: 5890,
    duration: 7560,
    percentage: 78,
    lastWatched: new Date(Date.now() - 3600000 * 4).toISOString(),
    poster: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'loki_s1_e1',
    mediaId: 'loki',
    mediaType: 'series',
    seriesId: 'loki',
    seasonNumber: 1,
    episodeNumber: 1,
    title: 'Loki',
    subtitle: 'S1:E1 • Glorious Purpose',
    currentTime: 1240,
    duration: 3060,
    percentage: 40,
    lastWatched: new Date(Date.now() - 3600000 * 24).toISOString(),
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop'
  }
];

export function useWatchProgress() {
  const [progressList, setProgressList] = useState<Record<string, WatchProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      const initialMap: Record<string, WatchProgress> = {};
      DEFAULT_MOCK_PROGRESS.forEach(item => {
        initialMap[item.id] = item;
      });
      return initialMap;
    } catch {
      const initialMap: Record<string, WatchProgress> = {};
      DEFAULT_MOCK_PROGRESS.forEach(item => {
        initialMap[item.id] = item;
      });
      return initialMap;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressList));
    } catch (e) {
      console.error('Failed to save watch progress to localStorage', e);
    }
  }, [progressList]);

  const updateProgress = (item: Omit<WatchProgress, 'lastWatched' | 'percentage'>) => {
    const percentage = item.duration > 0 ? Math.min(100, Math.round((item.currentTime / item.duration) * 100)) : 0;
    const updatedItem: WatchProgress = {
      ...item,
      percentage,
      lastWatched: new Date().toISOString()
    };

    setProgressList(prev => ({
      ...prev,
      [item.id]: updatedItem
    }));
  };

  const getProgress = (id: string): WatchProgress | undefined => {
    return progressList[id];
  };

  const clearHistory = () => {
    setProgressList({});
  };

  const sortedContinueWatching = Object.values(progressList)
    .filter(item => isMarvelContent(item) && item.percentage < 95 && item.percentage > 0)
    .sort((a, b) => new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime());

  return {
    progressList,
    updateProgress,
    getProgress,
    clearHistory,
    continueWatching: sortedContinueWatching
  };
}
