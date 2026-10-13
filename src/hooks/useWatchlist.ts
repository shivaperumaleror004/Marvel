import { useState, useEffect } from 'react';

const STORAGE_KEY = 'marvel_watch_hub_watchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['iron-man', 'loki', 'spider-man-no-way-home'];
    } catch {
      return ['iron-man', 'loki', 'spider-man-no-way-home'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, [watchlist]);

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isInWatchlist = (id: string) => watchlist.includes(id);

  const clearWatchlist = () => setWatchlist([]);

  return {
    watchlist,
    toggleWatchlist,
    isInWatchlist,
    clearWatchlist
  };
}
