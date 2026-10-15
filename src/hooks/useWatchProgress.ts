import { useState, useEffect, useCallback, useMemo } from 'react';
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

  const updateProgress = useCallback((item: Omit<WatchProgress, 'lastWatched' | 'percentage'>) => {
    const rawPercent = item.duration > 0 ? (item.currentTime / item.duration) * 100 : 0;
    // If user has watched at least 5 seconds, guarantee at least 1% so it doesn't get dropped
    const percentage = item.currentTime >= 5
      ? Math.max(1, Math.min(100, Math.round(rawPercent)))
      : Math.min(100, Math.round(rawPercent));

    const updatedItem: WatchProgress = {
      ...item,
      percentage,
      lastWatched: new Date().toISOString()
    };

    setProgressList(prev => {
      const existing = prev[item.id];
      // Skip state update if the change is negligible (< 1 second) to prevent re-render cascades
      if (existing && Math.abs(existing.currentTime - item.currentTime) < 1 && existing.duration === item.duration) {
        return prev;
      }
      return {
        ...prev,
        [item.id]: updatedItem
      };
    });
  }, []);

  const getProgress = useCallback((id: string): WatchProgress | undefined => {
    return progressList[id];
  }, [progressList]);

  const removeFromHistory = useCallback((id: string) => {
    setProgressList(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setProgressList({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Full watch history sorted by most recent
  const watchHistory = useMemo(() => {
    return Object.values(progressList)
      .filter(item => item && item.title)
      .sort((a, b) => new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime());
  }, [progressList]);

  // In-progress items for Continue Watching shelf (< 95% and >= 5s watched)
  const sortedContinueWatching = useMemo(() => {
    return watchHistory.filter(item => {
      const isFinished = item.percentage >= 95 || (item.duration > 0 && item.currentTime >= item.duration * 0.95);
      const hasStarted = item.currentTime >= 5;
      return hasStarted && !isFinished;
    });
  }, [watchHistory]);

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

