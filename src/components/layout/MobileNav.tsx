import React from 'react';
import { Home, Film, Tv, Compass, Users, Bookmark, Sparkles, Building2, Globe } from 'lucide-react';
import { useWatchlist } from '../../hooks/useWatchlist';

interface MobileNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onNavigate }) => {
  const { watchlist } = useWatchlist();

  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'timeline', label: 'Timeline', icon: Compass },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'series', label: 'Series', icon: Tv },
    { id: 'animation', label: 'Animation', icon: Sparkles },
    { id: 'studios', label: 'Studios', icon: Building2 },
    { id: 'universes', label: 'Multiverse', icon: Globe },
    { id: 'characters', label: 'Heroes', icon: Users },
    { id: 'mylist', label: 'My List', icon: Bookmark, badge: watchlist.length > 0 ? watchlist.length : undefined },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-2 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center overflow-x-auto scrollbar-none gap-1 px-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-xs shrink-0 transition-all ${
                isActive ? 'text-red-500 font-bold bg-white/5' : 'text-gray-400 font-medium hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-500 scale-110' : ''} transition-transform`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] tracking-tight whitespace-nowrap">{item.label}</span>
              {isActive && (
                <div className="h-0.5 w-4 rounded-full bg-red-600 shadow-[0_0_8px_#E62429]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
