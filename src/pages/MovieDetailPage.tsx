
import React, { useEffect, useState } from 'react';
import { Play, Plus, Check, Clock, User, ArrowLeft, Shield } from 'lucide-react';
import { Movie, Character } from '../types';
import { PhaseBadge } from '../components/ui/PhaseBadge';
import { RatingBadge } from '../components/ui/RatingBadge';
import { useWatchlist } from '../hooks/useWatchlist';
import { PageTransition } from '../components/ui/PageTransition';
import { CHARACTERS_DATA } from '../data/characters';
import { MovieCard } from '../components/ui/MovieCard';
import { useMedia } from '../context/MediaContext';
import { FALLBACK_POSTER, FALLBACK_BACKDROP, FALLBACK_AVATAR } from '../services/tmdb';

interface MovieDetailPageProps {
  movie: Movie;
  onBack: () => void;
  onWatch: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
  onSelectCharacter?: (character: Character) => void;
}

export const MovieDetailPage: React.FC<MovieDetailPageProps> = ({
  movie: initialMovie,
  onBack,
  onWatch,
  onSelectMovie,
  onSelectCharacter
}) => {
  const { movies, enrichMovieDetail } = useMedia();
  const [movie, setMovie] = useState<Movie>(initialMovie);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(movie.id);

  // Sync state if props change and fetch deeper TMDB details (credits, trailer)
  useEffect(() => {
    setMovie(initialMovie);
    if (initialMovie.tmdbId) {
      enrichMovieDetail(initialMovie).then(enriched => {
        setMovie(enriched);
      });
    }
  }, [initialMovie, enrichMovieDetail]);

  // MCU Timeline connections (Prev, Current, Next) using enriched movies
  const prevMovie = movies.find(m => m.releaseOrder === movie.releaseOrder - 1);
  const nextMovie = movies.find(m => m.releaseOrder === movie.releaseOrder + 1);

  // Related characters
  const relatedChars = CHARACTERS_DATA.filter(c => movie.characters.includes(c.id));

  // Related movies in same phase
  const relatedMovies = movies.filter(m => m.phase === movie.phase && m.id !== movie.id).slice(0, 4);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950 pb-16">
        {/* Backdrop Container */}
        <div className="relative min-h-[50vh] lg:min-h-[60vh] w-full overflow-hidden">
          <img
            src={movie.backdrop || FALLBACK_BACKDROP}
            alt={movie.title}
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BACKDROP; }}
            className="h-full w-full object-cover object-top opacity-35 filter blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full" />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-6 left-4 sm:left-8 z-20 flex items-center gap-2 rounded-xl bg-black/60 border border-white/20 px-4 py-2 text-xs font-mono font-bold text-gray-200 backdrop-blur-md hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ARCHIVE</span>
          </button>
        </div>

        {/* Content Section Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-40 sm:-mt-48 space-y-12">
          {/* Main Info Row: Poster Left, Details Right */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Poster Left */}
            <div className="w-64 sm:w-80 flex-shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden border border-white/20 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src={movie.poster || FALLBACK_POSTER}
                alt={movie.title}
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                className="w-full object-cover aspect-[2/3]"
              />
            </div>

            {/* Information Right */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <PhaseBadge phase={movie.phase} />
                <span className="px-2.5 py-0.5 rounded bg-black/70 border border-white/20 text-xs font-mono text-gray-300">
                  {movie.saga}
                </span>
                <RatingBadge rating={movie.rating} />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-base sm:text-lg font-semibold text-red-400 italic">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-gray-300">
                <span>{movie.year}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m ({movie.runtime} mins)
                </span>
                <span>•</span>
                <span className="text-gray-400">Director: <strong className="text-white">{movie.director}</strong></span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans pt-2">
                {movie.overview}
              </p>

              {/* Watch & List Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onWatch(movie)}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white uppercase tracking-wider shadow-[0_0_30px_rgba(230,36,41,0.5)] transition-all hover:bg-red-500 hover:scale-105 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>WATCH NOW</span>
                </button>

                <button
                  onClick={() => toggleWatchlist(movie.id)}
                  className={`flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-bold transition-all active:scale-95 ${
                    isSaved
                      ? 'bg-red-950/80 border-red-600 text-red-400 shadow-[0_0_15px_rgba(230,36,41,0.3)]'
                      : 'bg-black/60 border-white/20 text-gray-200 hover:border-white/50 hover:bg-white/10'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-5 h-5 text-red-400" />
                      <span>IN MY LIST</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>MY LIST</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* "Where this fits in the MCU" Timeline Section */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>CHRONOLOGICAL POSITIONING</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase">
              Where this fits in the MCU Timeline
            </h2>

            {/* Timeline Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Previous Movie Node */}
              {prevMovie ? (
                <div
                  onClick={() => onSelectMovie(prevMovie)}
                  className="group cursor-pointer p-4 rounded-xl border border-white/10 bg-slate-950/80 hover:border-red-600/50 transition-all flex items-center gap-3"
                >
                  <img
                    src={prevMovie.poster || FALLBACK_POSTER}
                    alt={prevMovie.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                    className="h-14 w-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">PREVIOUS FILM</span>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-red-400">{prevMovie.title}</h4>
                    <span className="text-[10px] font-mono text-gray-500">{prevMovie.year}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-white/10 bg-slate-950/40 text-center text-xs font-mono text-gray-500 flex items-center justify-center">
                  Genesis of MCU
                </div>
              )}

              {/* Current Movie Node */}
              <div className="p-4 rounded-xl border-2 border-red-600 bg-red-950/40 shadow-[0_0_20px_rgba(230,36,41,0.3)] flex items-center gap-3">
                <img
                  src={movie.poster || FALLBACK_POSTER}
                  alt={movie.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                  className="h-14 w-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase">YOU ARE HERE</span>
                  <h4 className="text-xs font-bold text-white truncate">{movie.title}</h4>
                  <span className="text-[10px] font-mono text-red-300">Order #{movie.releaseOrder}</span>
                </div>
              </div>

              {/* Next Movie Node */}
              {nextMovie ? (
                <div
                  onClick={() => onSelectMovie(nextMovie)}
                  className="group cursor-pointer p-4 rounded-xl border border-white/10 bg-slate-950/80 hover:border-red-600/50 transition-all flex items-center gap-3"
                >
                  <img
                    src={nextMovie.poster || FALLBACK_POSTER}
                    alt={nextMovie.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                    className="h-14 w-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">NEXT FILM</span>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-red-400">{nextMovie.title}</h4>
                    <span className="text-[10px] font-mono text-gray-500">{nextMovie.year}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-white/10 bg-slate-950/40 text-center text-xs font-mono text-gray-500 flex items-center justify-center">
                  Future Marvel Project
                </div>
              )}
            </div>
          </div>

          {/* Cast & Crew Grid with TMDB Profile Photos */}
          {movie.cast.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">Featured Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {movie.cast.map(c => (
                  <div key={c.name} className="p-3 rounded-xl border border-white/10 bg-slate-900/80 flex items-center gap-3">
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        alt={c.name}
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_AVATAR; }}
                        className="h-10 w-10 rounded-full object-cover border border-white/20 flex-shrink-0"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-red-400 border border-white/10 flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                      <p className="text-[11px] font-mono text-gray-400 truncate">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Heroes in this Movie */}
          {relatedChars.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">Featured Heroes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedChars.map(char => (
                  <div
                    key={char.id}
                    onClick={() => onSelectCharacter && onSelectCharacter(char)}
                    className="group cursor-pointer p-3 rounded-xl border border-white/10 bg-slate-900/80 hover:border-red-600/50 transition-all flex items-center gap-3"
                  >
                    <img
                      src={char.portrait || FALLBACK_AVATAR}
                      alt={char.name}
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_AVATAR; }}
                      className="h-12 w-12 rounded-full object-cover border border-red-600/40"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white uppercase truncate group-hover:text-red-400">{char.alias}</h4>
                      <p className="text-[10px] font-mono text-gray-400 truncate">{char.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Phase Movies */}
          {relatedMovies.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">More in {movie.phase}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedMovies.map(m => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    onSelect={onSelectMovie}
                    onWatch={onWatch}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
