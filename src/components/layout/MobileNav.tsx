import React from 'react';
import { Home, Film, Tv, Compass, Users, Bookmark } from 'lucide-react';
import { useWatchlist } from '../../hooks/useWatchlist';

interface MobileNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onNavigate }) => {
  const { watchlist } = useWatchlist();

  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'series', label: 'Series', icon: Tv },
    { id: 'timeline', label: 'Timeline', icon: Compass },
    { id: 'characters', label: 'Heroes', icon: Users },
    { id: 'mylist', label: 'My List', icon: Bookmark, badge: watchlist.length > 0 ? watchlist.length : undefined },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-2 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-1 py-1.5 px-3 rounded-lg text-xs transition-all ${
                isActive ? 'text-red-500 font-bold' : 'text-gray-400 font-medium hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-500 scale-110' : ''} transition-transform`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
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
