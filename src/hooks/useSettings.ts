import { useState, useEffect } from 'react';
import type { UserSettings } from '../types';

const STORAGE_KEY = 'marvel_watch_hub_settings';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  autoplay: false,
  reducedMotion: false,
  defaultTimelineOrder: 'release',
  configuredSources: {}
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const setConfiguredSource = (mediaId: string, url: string) => {
    setSettings(prev => ({
      ...prev,
      configuredSources: {
        ...prev.configuredSources,
        [mediaId]: url
      }
    }));
  };

  const removeConfiguredSource = (mediaId: string) => {
    setSettings(prev => {
      const nextSources = { ...prev.configuredSources };
      delete nextSources[mediaId];
      return {
        ...prev,
        configuredSources: nextSources
      };
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    updateSetting,
    setConfiguredSource,
    removeConfiguredSource,
    resetSettings
  };
}
