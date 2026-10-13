import React, { useState, useMemo } from 'react';
import { Users, Search, Shield, Zap, Sparkles, Flame, Eye } from 'lucide-react';
import { CHARACTERS_DATA } from '../data/characters';
import { Character } from '../types';
import { CharacterCard } from '../components/ui/CharacterCard';
import { PageTransition } from '../components/ui/PageTransition';

interface CharactersPageProps {
  onSelectCharacter: (character: Character) => void;
}

type CharacterCategory = 'all' | 'avengers' | 'cosmic' | 'street' | 'mystic';

const CATEGORIES: { id: CharacterCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Dossiers', icon: Users },
  { id: 'avengers', label: 'Avengers', icon: Shield },
  { id: 'cosmic', label: 'Cosmic & Multiverse', icon: Sparkles },
  { id: 'street', label: 'Street-Level Vigilantes', icon: Flame },
  { id: 'mystic', label: 'Mystic & Supernatural', icon: Eye }
];

export const CharactersPage: React.FC<CharactersPageProps> = ({ onSelectCharacter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory>('all');

  const filteredCharacters = useMemo(() => {
    return CHARACTERS_DATA.filter(c => {
      // Category filter
      if (selectedCategory === 'avengers') {
        const isAvenger = c.affiliation.toLowerCase().includes('avenger') || ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'spider-man', 'sam-wilson', 'ant-man', 'captain-marvel'].includes(c.id);
        if (!isAvenger) return false;
      } else if (selectedCategory === 'cosmic') {
        const isCosmic = ['thor', 'loki', 'star-lord', 'thanos', 'deadpool', 'wolverine', 'captain-marvel'].includes(c.id) || c.powers.some(p => p.toLowerCase().includes('cosmic') || p.toLowerCase().includes('space') || p.toLowerCase().includes('multiverse'));
        if (!isCosmic) return false;
      } else if (selectedCategory === 'street') {
        const isStreet = ['spider-man', 'daredevil', 'hawkeye', 'sam-wilson'].includes(c.id);
        if (!isStreet) return false;
      } else if (selectedCategory === 'mystic') {
        const isMystic = ['doctor-strange', 'scarlet-witch', 'moon-knight', 'loki', 'shang-chi'].includes(c.id) || c.powers.some(p => p.toLowerCase().includes('magic') || p.toLowerCase().includes('mystic'));
        if (!isMystic) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          c.name.toLowerCase().includes(q) ||
          c.alias.toLowerCase().includes(q) ||
          c.actor.toLowerCase().includes(q) ||
          c.powers.some(p => p.toLowerCase().includes(q)) ||
          c.affiliation.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

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
              Showing {filteredCharacters.length} classified hero archives with official Marvel cinematic portraits, powers & biographies.
            </p>
          </div>

          {/* Local Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search heroes, actors, or powers..."
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

        {/* Affiliation / Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(230,36,41,0.4)]'
                    : 'bg-slate-900/90 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Character Grid */}
        {filteredCharacters.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-mono text-sm bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
            <Users className="w-8 h-8 mx-auto text-gray-600" />
            <p>No character dossiers found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
            >
              Reset character search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCharacters.map(char => (
              <CharacterCard
                key={char.id}
                character={char}
                onSelect={onSelectCharacter}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};
