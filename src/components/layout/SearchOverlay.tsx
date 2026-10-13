import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Film, Tv, Shield, ChevronRight, Loader2 } from 'lucide-react';
import { CHARACTERS_DATA } from '../../data/characters';
import { Movie, Series, Character } from '../../types';
import { PhaseBadge } from '../ui/PhaseBadge';
import { isMarvelContent } from '../../utils/marvelWhitelist';
import { searchMovies, searchSeries, FALLBACK_POSTER, FALLBACK_AVATAR } from '../../services/tmdb';
import { useMedia } from '../../context/MediaContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  onSelectSeries: (series: Series) => void;
  onSelectCharacter: (character: Character) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectMovie,
  onSelectSeries,
  onSelectCharacter
}) => {
  const { movies: cachedMovies, series: cachedSeries } = useMedia();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'movies' | 'series' | 'characters'>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [matchedMovies, setMatchedMovies] = useState<Movie[]>([]);
  const [matchedSeries, setMatchedSeries] = useState<Series[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard shortcut Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Instant local search + debounced TMDB API search
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setMatchedMovies([]);
      setMatchedSeries([]);
      setIsSearching(false);
      return;
    }

    // Immediate local match for instant UI responsiveness
    const localMovies = cachedMovies.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.franchise?.toLowerCase().includes(q) ||
      m.characters?.some(c => c.toLowerCase().includes(q)) ||
      m.cast?.some(c => c.name.toLowerCase().includes(q))
    );
    const localSeries = cachedSeries.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.franchise?.toLowerCase().includes(q) ||
      s.characters?.some(c => c.toLowerCase().includes(q)) ||
      s.cast?.some(c => c.name.toLowerCase().includes(q))
    );
    setMatchedMovies(localMovies);
    setMatchedSeries(localSeries);

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const [movieResults, seriesResults] = await Promise.all([
          searchMovies(q),
          searchSeries(q)
        ]);

        // Merge with locally cached enriched data for maximum poster fidelity
        const movieMap = new Map<string, Movie>();
        localMovies.forEach(m => movieMap.set(m.id, m));
        movieResults.forEach(m => {
          const cached = cachedMovies.find(cm => cm.id === m.id || cm.tmdbId === m.tmdbId);
          const finalMovie = cached ? { ...m, poster: cached.poster || m.poster, backdrop: cached.backdrop || m.backdrop } : m;
          if (!movieMap.has(finalMovie.id)) {
            movieMap.set(finalMovie.id, finalMovie);
          }
        });

        const seriesMap = new Map<string, Series>();
        localSeries.forEach(s => seriesMap.set(s.id, s));
        seriesResults.forEach(s => {
          const cached = cachedSeries.find(cs => cs.id === s.id || cs.tmdbId === s.tmdbId);
          const finalSeries = cached ? { ...s, poster: cached.poster || s.poster, backdrop: cached.backdrop || s.backdrop } : s;
          if (!seriesMap.has(finalSeries.id)) {
            seriesMap.set(finalSeries.id, finalSeries);
          }
        });

        setMatchedMovies(Array.from(movieMap.values()));
        setMatchedSeries(Array.from(seriesMap.values()));
      } catch (e) {
        console.warn('Search query failed:', e);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, cachedMovies, cachedSeries]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedCharacters = q
    ? CHARACTERS_DATA.filter(c =>
        isMarvelContent(c) &&
        (c.name.toLowerCase().includes(q) ||
         c.alias.toLowerCase().includes(q) ||
         c.actor.toLowerCase().includes(q) ||
         c.powers.some(p => p.toLowerCase().includes(q)))
      )
    : [];

  const totalResults = matchedMovies.length + matchedSeries.length + matchedCharacters.length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl transition-all duration-300">
      {/* Search Header */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 pt-6 md:pt-10 pb-4 border-b border-white/10">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-6 h-6 text-red-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Marvel movies, series, heroes, actors, phases (e.g. Iron, Loki, Spider-Man)..."
            className="w-full rounded-2xl border border-white/15 bg-slate-900/90 py-4 pl-14 pr-20 text-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 shadow-2xl font-medium"
          />
          <div className="absolute right-14 flex items-center gap-2">
            {isSearching && (
              <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
            )}
            {query && !isSearching && (
              <button
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-3 rounded-2xl border border-white/10 bg-slate-900 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Categories */}
        {q && (
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: `All Results (${totalResults})` },
              { id: 'movies', label: `Movies (${matchedMovies.length})` },
              { id: 'series', label: `Series (${matchedSeries.length})` },
              { id: 'characters', label: `Heroes (${matchedCharacters.length})` }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-900 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Container */}
      <div className="mx-auto w-full max-w-5xl flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-8">
        {!q ? (
          /* Initial Suggested Searches State */
          <div className="py-12 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-red-950/40 border border-red-900/30 text-red-500">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Search the MCU Vault</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Live TMDB search connected. Type any Marvel movie, series, hero, or MCU Phase to discover matching titles.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-2">
              {['Iron Man', 'Loki', 'Phase 3', 'Spider-Man', 'Deadpool', 'Multiverse'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-gray-300 hover:border-red-600/50 hover:text-white transition-colors"
                >
                  "{term}"
                </button>
              ))}
            </div>
          </div>
        ) : totalResults === 0 && !isSearching ? (
          /* Empty Search State */
          <div className="py-16 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-red-950/60 border border-red-600/40 text-red-500 shadow-[0_0_20px_rgba(230,36,41,0.3)]">
              <Shield className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase">No heroes found</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              No Marvel titles or heroes match "{query}". Check spelling or search by character or MCU phase.
            </p>
          </div>
        ) : (
          /* Active Results List */
          <div className="space-y-8">
            {/* Movies Section */}
            {(activeCategory === 'all' || activeCategory === 'movies') && matchedMovies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-3">
                  <Film className="w-4 h-4" />
                  <span>MOVIES ({matchedMovies.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {matchedMovies.map(movie => (
                    <div
                      key={movie.id}
                      onClick={() => {
                        onSelectMovie(movie);
                        onClose();
                      }}
                      className="group flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-slate-900/80 hover:border-red-600/60 hover:bg-slate-900 transition-all cursor-pointer"
                    >
                      <img
                        src={movie.poster || FALLBACK_POSTER}
                        alt={movie.title}
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                        className="h-16 w-12 rounded object-cover flex-shrink-0 bg-slate-950"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <PhaseBadge phase={movie.phase} />
                          <span className="text-[10px] font-mono text-gray-400">{movie.year}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm truncate group-hover:text-red-400 transition-colors mt-0.5">
                          {movie.title}
                        </h4>
                        <p className="text-xs text-gray-400 truncate">{movie.director}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Series Section */}
            {(activeCategory === 'all' || activeCategory === 'series') && matchedSeries.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-3">
                  <Tv className="w-4 h-4" />
                  <span>SERIES ({matchedSeries.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {matchedSeries.map(series => (
                    <div
                      key={series.id}
                      onClick={() => {
                        onSelectSeries(series);
                        onClose();
                      }}
                      className="group flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-slate-900/80 hover:border-red-600/60 hover:bg-slate-900 transition-all cursor-pointer"
                    >
                      <img
                        src={series.poster || FALLBACK_POSTER}
                        alt={series.title}
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                        className="h-16 w-12 rounded object-cover flex-shrink-0 bg-slate-950"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <PhaseBadge phase={series.phase} />
                          <span className="text-[10px] font-mono text-gray-400">{series.releaseYear}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm truncate group-hover:text-red-400 transition-colors mt-0.5">
                          {series.title}
                        </h4>
                        <p className="text-xs text-gray-400 truncate">
                          {series.seasons?.length ? `${series.seasons.length} Seasons` : 'Marvel Series'}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Characters Section */}
            {(activeCategory === 'all' || activeCategory === 'characters') && matchedCharacters.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-3">
                  <Shield className="w-4 h-4" />
                  <span>HERO DOSSIERS ({matchedCharacters.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {matchedCharacters.map(char => (
                    <div
                      key={char.id}
                      onClick={() => {
                        onSelectCharacter(char);
                        onClose();
                      }}
                      className="group flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-slate-900/80 hover:border-red-600/60 hover:bg-slate-900 transition-all cursor-pointer"
                    >
                      <img
                        src={char.portrait || FALLBACK_AVATAR}
                        alt={char.name}
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_AVATAR; }}
                        className="h-14 w-14 rounded-full object-cover flex-shrink-0 border border-red-600/40"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-white text-sm truncate uppercase group-hover:text-red-400 transition-colors">
                          {char.alias}
                        </h4>
                        <p className="text-xs text-gray-400 truncate">{char.name}</p>
                        <p className="text-[10px] font-mono text-red-400 truncate">{char.actor}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
