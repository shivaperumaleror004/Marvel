import React, { useState } from 'react';
import { Users, Search, Shield } from 'lucide-react';
import { CHARACTERS_DATA } from '../data/characters';
import { Character } from '../types';
import { CharacterCard } from '../components/ui/CharacterCard';
import { PageTransition } from '../components/ui/PageTransition';

interface CharactersPageProps {
  onSelectCharacter: (character: Character) => void;
}

export const CharactersPage: React.FC<CharactersPageProps> = ({ onSelectCharacter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharacters = CHARACTERS_DATA.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.alias.toLowerCase().includes(q) ||
      c.actor.toLowerCase().includes(q) ||
      c.powers.some(p => p.toLowerCase().includes(q))
    );
  });

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>SUPERHERO DOSSIERS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Marvel Character Vault
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Classified hero archives, powers, biographical data, and cinematic appearances.
            </p>
          </div>

          {/* Local Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search heroes or powers..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map(char => (
            <CharacterCard
              key={char.id}
              character={char}
              onSelect={onSelectCharacter}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
