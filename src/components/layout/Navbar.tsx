import { Search, Settings as SettingsIcon, Film, Tv, Compass, Users, Bookmark, Home, Sparkles, Building2, Globe, Clapperboard, Calendar } from 'lucide-react';
import { useWatchlist } from '../../hooks/useWatchlist';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, onOpenSearch }) => {
  const { watchlist } = useWatchlist();

  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'series', label: 'Series', icon: Tv },
    { id: 'shorts', label: 'Shorts & Specials', icon: Clapperboard },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
    { id: 'characters', label: 'Characters', icon: Users },
    { id: 'timeline', label: 'Timeline', icon: Compass },
    { id: 'animation', label: 'Animation', icon: Sparkles },
    { id: 'studios', label: 'Studios', icon: Building2 },
    { id: 'universes', label: 'Universes', icon: Globe },
    { id: 'mylist', label: 'My List', icon: Bookmark, badge: watchlist.length > 0 ? watchlist.length : undefined },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 h-16 md:h-20">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center justify-center bg-red-600 px-2.5 py-1 font-black text-white text-base md:text-xl tracking-tighter uppercase rounded shadow-[0_0_20px_rgba(230,36,41,0.5)] group-hover:bg-red-500 transition-all">
            <span className="relative z-10">MARVEL</span>
            <div className="absolute inset-0 halftone-overlay opacity-20" />
          </div>
          <span className="font-mono text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase group-hover:text-gray-200 transition-colors hidden sm:inline-block">
            ARCHIVE
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto scrollbar-none py-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white bg-red-950/60 border border-red-800/50 shadow-[0_0_15px_rgba(230,36,41,0.25)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full bg-red-600 text-[10px] font-mono font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 text-xs font-medium text-gray-300 hover:border-red-600/50 hover:text-white transition-all shadow-md active:scale-95"
            title="Search Marvel Archive (Cmd+K)"
          >
            <Search className="w-4 h-4 text-red-500" />
            <span className="hidden sm:inline font-mono">SEARCH</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-gray-400">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
              activeTab === 'settings'
                ? 'bg-red-950/80 border-red-600 text-red-400 shadow-[0_0_15px_rgba(230,36,41,0.3)]'
                : 'border-white/10 bg-slate-900/90 text-gray-400 hover:text-white hover:border-white/30'
            }`}
            title="Settings & Source Management"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
