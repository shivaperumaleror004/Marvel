import React, { useState } from 'react';
import { Shield, Zap, ChevronRight } from 'lucide-react';
import { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImg = 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800';

  return (
    <div
      onClick={() => onSelect(character)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-600/70 hover:shadow-[0_12px_32px_rgba(230,36,41,0.3)]"
    >
      {/* Halftone Overlay */}
      <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none z-10" />

      {/* Top Metallic Label */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono tracking-widest text-red-400 uppercase border border-red-900/50">
        <Shield className="w-3 h-3 text-red-500" />
        DOSSIER #{character.id.toUpperCase().substring(0, 8)}
      </div>

      {/* Portrait Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
        <img
          src={imgError ? fallbackImg : character.portrait}
          alt={character.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-red-500">
            {character.name}
          </div>

          <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight uppercase group-hover:text-red-400 transition-colors">
            {character.alias}
          </h3>

          <div className="mt-1 text-xs text-gray-400 font-medium">
            Portrayed by <span className="text-gray-200">{character.actor}</span>
          </div>

          {/* Powers Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {character.powers.slice(0, 2).map((power, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/70 border border-red-800/40 text-red-300"
              >
                <Zap className="w-2.5 h-2.5 text-red-400" />
                {power}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10 text-xs font-bold text-red-500 group-hover:text-white transition-colors">
            <span>VIEW DOSSIER</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
