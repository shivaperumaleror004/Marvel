import React from 'react';
import { ArrowLeft, Shield, Zap, Film, Tv, Users, Star } from 'lucide-react';
import { Character, Movie, Series } from '../types';
import { MOVIES_DATA } from '../data/movies';
import { SERIES_DATA } from '../data/series';
import { CHARACTERS_DATA } from '../data/characters';
import { PageTransition } from '../components/ui/PageTransition';
import { MovieCard } from '../components/ui/MovieCard';

import { FALLBACK_POSTER, FALLBACK_BACKDROP } from '../services/tmdb';

interface CharacterDetailPageProps {
  character: Character;
  onBack: () => void;
  onSelectMovie: (movie: Movie) => void;
  onWatchMovie: (movie: Movie) => void;
  onSelectCharacter: (character: Character) => void;
}

export const CharacterDetailPage: React.FC<CharacterDetailPageProps> = ({
  character,
  onBack,
  onSelectMovie,
  onWatchMovie,
  onSelectCharacter
}) => {
  const appearedMovies = MOVIES_DATA.filter(m => character.movies.includes(m.id));
  const appearedSeries = SERIES_DATA.filter(s => character.series.includes(s.id));
  const relatedChars = CHARACTERS_DATA.filter(c => character.relatedCharacters.includes(c.id));

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950 pb-16">
        {/* Backdrop Header */}
        <div className="relative min-h-[45vh] lg:min-h-[55vh] w-full overflow-hidden">
          <img
            src={character.backdrop || FALLBACK_BACKDROP}
            alt={character.alias}
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BACKDROP; }}
            className="h-full w-full object-cover object-top opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none" />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-6 left-4 sm:left-8 z-20 flex items-center gap-2 rounded-xl bg-black/60 border border-white/20 px-4 py-2 text-xs font-mono font-bold text-gray-200 backdrop-blur-md hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HEROES</span>
          </button>
        </div>

        {/* Content Section Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-40 space-y-12">
          {/* Main Dossier Grid */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Portrait Card */}
            <div className="w-64 sm:w-80 flex-shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden border-2 border-red-600 bg-slate-900 shadow-[0_20px_50px_rgba(230,36,41,0.3)]">
              <div className="relative aspect-[3/4] w-full">
                <img
                  src={character.portrait || FALLBACK_POSTER}
                  alt={character.alias}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_POSTER; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-600 px-2.5 py-1 text-[10px] font-mono font-bold text-white uppercase rounded shadow">
                  CLASSIFIED DOSSIER
                </div>
              </div>
            </div>

            {/* Information Right */}
            <div className="flex-1 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                  <Shield className="w-4 h-4" />
                  <span>IDENTITY: {character.name}</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none mt-1">
                  {character.alias}
                </h1>
                <p className="text-sm font-mono text-gray-400 mt-2">
                  Portrayed by <strong className="text-white">{character.actor}</strong>
                </p>
              </div>

              {/* Speech-Bubble Inspired Comic Box */}
              <div className="comic-tooltip p-4 space-y-2">
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold">
                  S.H.I.E.L.D. BIOGRAPHICAL SUMMARY
                </span>
                <p className="text-sm text-gray-200 leading-relaxed font-sans">
                  {character.bio}
                </p>
              </div>

              {/* Affiliation & First Appearance Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">AFFILIATION</span>
                  <p className="text-xs font-bold text-white">{character.affiliation}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">FIRST MCU APPEARANCE</span>
                  <p className="text-xs font-bold text-red-400">{character.firstAppearance}</p>
                </div>
              </div>

              {/* Powers & Abilities */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase">KEY POWERS & ABILITIES</span>
                <div className="flex flex-wrap gap-2">
                  {character.powers.map((power, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-red-950/80 border border-red-800/60 text-red-300 shadow-md"
                    >
                      <Zap className="w-3.5 h-3.5 text-red-400" />
                      {power}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cinematic Appearances (Movies) */}
          {appearedMovies.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">
                  Movie Appearances ({appearedMovies.length})
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {appearedMovies.map(m => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    onSelect={onSelectMovie}
                    onWatch={onWatchMovie}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Related Hero Dossiers */}
          {relatedChars.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">
                  Known Allies & Adversaries
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedChars.map(char => (
                  <div
                    key={char.id}
                    onClick={() => onSelectCharacter(char)}
                    className="group cursor-pointer p-3 rounded-xl border border-white/10 bg-slate-900/80 hover:border-red-600/50 transition-all flex items-center gap-3"
                  >
                    <img src={char.portrait} alt={char.name} className="h-12 w-12 rounded-full object-cover border border-red-600/40" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white uppercase truncate group-hover:text-red-400">{char.alias}</h4>
                      <p className="text-[10px] font-mono text-gray-400 truncate">{char.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
