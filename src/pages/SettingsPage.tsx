import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Trash2, Check, RefreshCw, Key, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useWatchProgress } from '../hooks/useWatchProgress';
import { useWatchlist } from '../hooks/useWatchlist';
import { MOVIES_DATA } from '../data/movies';
import { PageTransition } from '../components/ui/PageTransition';

export const SettingsPage: React.FC = () => {
  const { settings, updateSetting, setConfiguredSource, removeConfiguredSource, resetSettings } = useSettings();
  const { clearHistory } = useWatchProgress();
  const { clearWatchlist } = useWatchlist();

  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [confirmClearWatchlist, setConfirmClearWatchlist] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState(MOVIES_DATA[0].id);
  const [customUrlInput, setCustomUrlInput] = useState('');

  const handleAddCustomSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    setConfiguredSource(selectedMediaId, customUrlInput.trim());
    setCustomUrlInput('');
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            <SettingsIcon className="w-4 h-4" />
            <span>HUB CONFIGURATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
            Settings & Source Manager
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage viewing sources, themes, playback settings, and local storage data.
          </p>
        </div>

        {/* Section 1: Authorized Video Source Configuration */}
        <div className="rounded-2xl border border-red-900/40 bg-slate-900/80 p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-red-500 font-bold text-sm font-mono uppercase">
            <LinkIcon className="w-4 h-4" />
            <span>Private Viewing Sources Configurator</span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Connect custom authorized stream endpoints or self-hosted video embed URLs for specific MCU titles. Connected sources are stored safely in local browser storage.
          </p>

          <form onSubmit={handleAddCustomSource} className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Select Marvel Title</label>
                <select
                  value={selectedMediaId}
                  onChange={(e) => setSelectedMediaId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs font-bold text-white focus:border-red-600 focus:outline-none"
                >
                  {MOVIES_DATA.map(m => (
                    <option key={m.id} value={m.id}>{m.title} ({m.year})</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Authorized Stream/Embed URL</label>
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://your-authorized-stream-provider.com/embed/123"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs font-mono text-white placeholder-gray-600 focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-xs font-bold text-white uppercase tracking-wider shadow-md hover:bg-red-500 transition-all active:scale-95"
            >
              <span>CONNECT SOURCE ENDPOINT</span>
            </button>
          </form>

          {/* Configured Sources List */}
          {Object.keys(settings.configuredSources).length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-gray-400 uppercase">ACTIVE CUSTOM SOURCES</span>
              <div className="space-y-2">
                {Object.entries(settings.configuredSources).map(([id, url]) => (
                  <div key={id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/10 text-xs">
                    <div className="min-w-0 pr-4">
                      <span className="font-bold text-white uppercase font-mono block">{id}</span>
                      <span className="text-[11px] font-mono text-gray-400 truncate block">{url}</span>
                    </div>
                    <button
                      onClick={() => removeConfiguredSource(id)}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:text-white transition-colors"
                      title="Remove source"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Preferences */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
          <h2 className="text-lg font-bold text-white uppercase">App Preferences</h2>

          <div className="space-y-4 divide-y divide-white/5">
            {/* Theme */}
            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="text-sm font-bold text-white">Interface Theme</h4>
                <p className="text-xs text-gray-400">Choose your visual environment theme.</p>
              </div>

              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value as any)}
                className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-mono text-white"
              >
                <option value="dark">Cinematic Dark</option>
                <option value="cinema">Deep Cinema</option>
                <option value="hud">Stark HUD</option>
              </select>
            </div>

            {/* Timeline Default Order */}
            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="text-sm font-bold text-white">Default Timeline Order</h4>
                <p className="text-xs text-gray-400">Primary ordering mode for MCU timelines.</p>
              </div>

              <select
                value={settings.defaultTimelineOrder}
                onChange={(e) => updateSetting('defaultTimelineOrder', e.target.value as any)}
                className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-mono text-white"
              >
                <option value="release">Release Order</option>
                <option value="chronological">Chronological Order</option>
              </select>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="text-sm font-bold text-white">Reduced Motion</h4>
                <p className="text-xs text-gray-400">Minimize animations and UI transitions.</p>
              </div>

              <button
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.reducedMotion ? 'bg-red-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Data Management & Reset */}
        <div className="rounded-2xl border border-red-950/60 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-lg font-bold text-white uppercase text-red-500 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone & Local Data</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Clear Watch History */}
            <div className="p-4 rounded-xl border border-white/10 bg-slate-950 space-y-3">
              <h4 className="text-sm font-bold text-white">Clear Watch Progress</h4>
              <p className="text-xs text-gray-400">Resets all resume timestamps and percentage bars.</p>

              {confirmClearHistory ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      clearHistory();
                      setConfirmClearHistory(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white"
                  >
                    Confirm Clear
                  </button>
                  <button
                    onClick={() => setConfirmClearHistory(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClearHistory(true)}
                  className="px-3 py-1.5 rounded-lg border border-red-900/60 text-xs font-mono text-red-400 hover:bg-red-950/60"
                >
                  Clear Watch History
                </button>
              )}
            </div>

            {/* Clear My List */}
            <div className="p-4 rounded-xl border border-white/10 bg-slate-950 space-y-3">
              <h4 className="text-sm font-bold text-white">Clear Personal Watchlist</h4>
              <p className="text-xs text-gray-400">Removes all saved movies and series from My List.</p>

              {confirmClearWatchlist ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      clearWatchlist();
                      setConfirmClearWatchlist(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white"
                  >
                    Confirm Clear
                  </button>
                  <button
                    onClick={() => setConfirmClearWatchlist(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClearWatchlist(true)}
                  className="px-3 py-1.5 rounded-lg border border-red-900/60 text-xs font-mono text-red-400 hover:bg-red-950/60"
                >
                  Clear Watchlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
