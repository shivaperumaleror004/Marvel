import { useState, useEffect } from 'react';
import type { WatchProgress } from '../types';

const STORAGE_KEY = 'marvel_watch_hub_progress';

export function useWatchProgress() {
  const [progressList, setProgressList] = useState<Record<string, WatchProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const cleaned: Record<string, WatchProgress> = {};
        for (const [k, v] of Object.entries(parsed as Record<string, WatchProgress>)) {
          // Exclude any legacy mock items that used Unsplash images or mock IDs
          const isMock =
            v.poster?.includes('unsplash.com') ||
            v.backdrop?.includes('unsplash.com') ||
            (v.id === 'iron-man' && v.currentTime === 5890) ||
            (v.id === 'loki_s1_e1' && v.currentTime === 1240);
          if (!isMock && v.title) {
            cleaned[k] = v;
          }
        }
        return cleaned;
      }
      return {};
    } catch {
      return {};
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

  const removeFromHistory = (id: string) => {
    setProgressList(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const clearHistory = () => {
    setProgressList({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  // Full watch history sorted by most recent
  const watchHistory = Object.values(progressList)
    .filter(item => item && item.title)
    .sort((a, b) => new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime());

  // In-progress items for Continue Watching shelf (< 95% and > 0%)
  const sortedContinueWatching = watchHistory
    .filter(item => item.percentage < 95 && item.percentage > 0);

  return {
    progressList,
    updateProgress,
    getProgress,
    removeFromHistory,
    clearHistory,
    continueWatching: sortedContinueWatching,
    watchHistory
  };
}

