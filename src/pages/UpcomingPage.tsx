import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Sparkles,
  Film,
  Tv,
  Clock,
  Shield,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { Movie, Series } from '../types';
import { PageTransition } from '../components/ui/PageTransition';
import { useMedia } from '../context/MediaContext';
import { useWatchlist } from '../hooks/useWatchlist';
import { FALLBACK_POSTER } from '../services/tmdb';

interface UpcomingPageProps {
  onSelectMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
}

type UpcomingFilter = 'all' | 'movies' | 'series' | 'animation' | 'specials';

interface UpcomingItem {
  id: string;
  title: string;
  mediaType: 'movie' | 'series';
  year: number;
  releaseDate?: string;
  releaseWindow?: string;
  status: 'confirmed' | 'announced' | 'unconfirmed';
  phase?: string;
  saga?: string;
  studio?: string;
  overview: string;
  poster: string;
  backdrop?: string;
  directorOrCreator?: string;
  genres: string[];
  castNames?: string[];
  rawMovie?: Movie;
  rawSeries?: Series;
}

export const UpcomingPage: React.FC<UpcomingPageProps> = ({
  onSelectMovie,
  onSelectSeries
}) => {
  const { movies, series } = useMedia();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [activeFilter, setActiveFilter] = useState<UpcomingFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Unreleased upcoming items only
  const upcomingItems = useMemo<UpcomingItem[]>(() => {
    const list: UpcomingItem[] = [];

    // 1. Movies that are upcoming / unreleased
    movies
      .filter(m => m.isUpcoming || m.releaseStatus === 'upcoming')
      .forEach(m => {
        const isAnim = m.isAnimation || m.movieType === 'animation';
        const isSpecial = m.movieType === 'special' || m.mediaSubtype === 'special-presentation';

        list.push({
          id: m.id,
          title: m.title,
          mediaType: 'movie',
          year: m.year,
          releaseDate: m.releaseDate,
          releaseWindow: m.releaseDate ? new Date(m.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : `${m.year}`,
          status: m.upcomingStatus || (m.releaseDate && m.releaseDate !== 'TBA' ? 'confirmed' : 'announced'),
          phase: m.phase,
          saga: m.saga,
          studio: m.studio || 'Marvel Studios',
          overview: m.overview,
          poster: m.poster || FALLBACK_POSTER,
          backdrop: m.backdrop,
          directorOrCreator: m.director,
          genres: m.genres || [],
          castNames: m.cast?.slice(0, 3).map(c => c.name),
          rawMovie: m
        });
      });

    // 2. Series that are upcoming / unreleased
    series
      .filter(s => s.releaseStatus === 'upcoming')
      .forEach(s => {
        list.push({
          id: s.id,
          title: s.title,
          mediaType: 'series',
          year: s.year,
          releaseDate: s.releaseYear,
          releaseWindow: s.releaseYear || `${s.year}`,
          status: s.upcomingStatus || 'announced',
          phase: s.phase,
          saga: s.saga,
          studio: s.studio || 'Marvel Studios',
          overview: s.overview,
          poster: s.poster || FALLBACK_POSTER,
          backdrop: s.backdrop,
          directorOrCreator: s.creator,
          genres: s.genres || [],
          castNames: s.cast?.slice(0, 3).map(c => c.name),
          rawSeries: s
        });
      });

    // Sort by projected release year/date
    list.sort((a, b) => {
      if (a.releaseDate && b.releaseDate && a.releaseDate !== 'TBA' && b.releaseDate !== 'TBA') {
        return a.releaseDate.localeCompare(b.releaseDate);
      }
      return a.year - b.year;
    });

    return list;
  }, [movies, series]);

  const filteredItems = useMemo(() => {
    let result = upcomingItems;

    if (activeFilter === 'movies') {
      result = result.filter(i => i.mediaType === 'movie');
    } else if (activeFilter === 'series') {
      result = result.filter(i => i.mediaType === 'series');
    } else if (activeFilter === 'animation') {
      result = result.filter(i => i.genres.includes('Animation') || i.rawMovie?.isAnimation || i.rawSeries?.isAnimation);
    } else if (activeFilter === 'specials') {
      result = result.filter(i => i.rawMovie?.movieType === 'special' || i.rawMovie?.mediaSubtype === 'special-presentation');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        i =>
          i.title.toLowerCase().includes(q) ||
          i.overview.toLowerCase().includes(q) ||
          i.directorOrCreator?.toLowerCase().includes(q) ||
          i.castNames?.some(c => c.toLowerCase().includes(q))
      );
    }

    return result;
  }, [upcomingItems, activeFilter, searchQuery]);

  const handleSelect = (item: UpcomingItem) => {
    if (item.mediaType === 'movie' && item.rawMovie) {
      onSelectMovie(item.rawMovie);
    } else if (item.mediaType === 'series' && item.rawSeries) {
      onSelectSeries(item.rawSeries);
    }
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Calendar className="w-4 h-4" />
              <span>THE FUTURE OF MARVEL // MULTIVERSE ROADMAP</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Upcoming Marvel Slate
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Strictly unreleased, officially verified Marvel Studios and multiverse motion pictures, streaming series, and special events.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search upcoming titles..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
          {[
            { id: 'all' as UpcomingFilter, label: 'All Upcoming', icon: Calendar, count: upcomingItems.length },
            { id: 'movies' as UpcomingFilter, label: 'Feature Films', icon: Film, count: upcomingItems.filter(i => i.mediaType === 'movie').length },
            { id: 'series' as UpcomingFilter, label: 'Series', icon: Tv, count: upcomingItems.filter(i => i.mediaType === 'series').length },
            { id: 'animation' as UpcomingFilter, label: 'Animation', icon: Sparkles, count: upcomingItems.filter(i => i.genres.includes('Animation') || i.rawMovie?.isAnimation).length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.35)]'
                    : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/40 text-white' : 'bg-white/10 text-gray-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Upcoming Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-24 text-center text-gray-500 font-mono text-sm bg-slate-900/30 rounded-2xl border border-white/5 space-y-3">
            <Calendar className="w-10 h-10 mx-auto text-gray-600" />
            <p>No unreleased projects found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="text-xs text-red-400 hover:text-red-300 underline font-mono"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isSaved = isInWatchlist(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:shadow-[0_16px_40px_rgba(230,36,41,0.25)] cursor-pointer"
                >
                  {/* Backdrop banner header */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.backdrop || item.poster}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      {item.status === 'confirmed' ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-600/80 text-[10px] font-mono font-black text-emerald-400 uppercase tracking-wider backdrop-blur-md shadow">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          CONFIRMED DATE
                        </span>
                      ) : item.status === 'announced' ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-600/80 text-[10px] font-mono font-black text-amber-400 uppercase tracking-wider backdrop-blur-md shadow">
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                          IN DEVELOPMENT
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/90 border border-white/20 text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider backdrop-blur-md shadow">
                          <HelpCircle className="w-3 h-3 text-gray-400" />
                          UNCONFIRMED
                        </span>
                      )}

                      {item.phase && (
                        <span className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] font-mono text-gray-300">
                          {item.phase}
                        </span>
                      )}
                    </div>

                    {/* Watchlist Bookmark */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(item.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all z-10 ${
                        isSaved
                          ? 'bg-red-600 border-red-500 text-white'
                          : 'bg-black/60 border-white/20 text-gray-300 hover:text-white hover:border-red-500/50'
                      }`}
                      title={isSaved ? 'Remove from My List' : 'Save to My List'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-wider">
                        <span>{item.mediaType === 'movie' ? 'FEATURE FILM' : 'SERIES'}</span>
                        <span>•</span>
                        <span className="text-gray-300">{item.releaseWindow}</span>
                      </div>

                      <h3 className="text-xl font-black text-white uppercase tracking-tight mt-1 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-400 line-clamp-3 mt-2 leading-relaxed">
                        {item.overview}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <div className="text-gray-400 truncate max-w-[200px]">
                        {item.directorOrCreator ? `Direction: ${item.directorOrCreator}` : item.studio}
                      </div>

                      <div className="flex items-center gap-1 font-bold text-red-500 group-hover:translate-x-1 transition-transform">
                        <span>DETAILS</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default UpcomingPage;
