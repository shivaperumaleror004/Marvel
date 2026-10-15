import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Shield,
  Zap,
  Sparkles,
  Flame,
  Eye,
  Globe,
  Skull,
  UserCheck
} from 'lucide-react';
import { CHARACTERS_DATA } from '../data/characters';
import { Character, CharacterRole } from '../types';
import { CharacterCard } from '../components/ui/CharacterCard';
import { PageTransition } from '../components/ui/PageTransition';

interface CharactersPageProps {
  onSelectCharacter: (character: Character) => void;
}

type CharacterCategory =
  | 'all'
  | 'avengers'
  | 'xmen'
  | 'fantastic-four'
  | 'street'
  | 'cosmic'
  | 'mystic';

const CATEGORIES: { id: CharacterCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Dossiers', icon: Users },
  { id: 'avengers', label: 'Avengers', icon: Shield },
  { id: 'xmen', label: 'X-Men & Mutants', icon: Zap },
  { id: 'fantastic-four', label: 'Fantastic Four', icon: Globe },
  { id: 'street', label: 'Street Vigilantes', icon: Flame },
  { id: 'cosmic', label: 'Cosmic & Guardians', icon: Sparkles },
  { id: 'mystic', label: 'Mystic & Supernatural', icon: Eye }
];

export const CharactersPage: React.FC<CharactersPageProps> = ({ onSelectCharacter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory>('all');
  const [selectedRole, setSelectedRole] = useState<'all' | CharacterRole>('all');
  const [selectedUniverse, setSelectedUniverse] = useState<string>('all');

  const filteredCharacters = useMemo(() => {
    return CHARACTERS_DATA.filter(c => {
      // 1. Category / Team Filter
      if (selectedCategory === 'avengers') {
        const isAvenger =
          c.affiliation.toLowerCase().includes('avenger') ||
          ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'spider-man', 'sam-wilson', 'ant-man', 'captain-marvel', 'war-machine', 'vision', 'white-vision', 'winter-soldier'].includes(c.id);
        if (!isAvenger) return false;
      } else if (selectedCategory === 'xmen') {
        const isXmen =
          c.affiliation.toLowerCase().includes('x-men') ||
          c.affiliation.toLowerCase().includes('mutant') ||
          ['wolverine', 'deadpool', 'professor-x', 'magneto'].includes(c.id);
        if (!isXmen) return false;
      } else if (selectedCategory === 'fantastic-four') {
        const isFF =
          c.affiliation.toLowerCase().includes('fantastic') ||
          c.franchise?.toLowerCase().includes('fantastic') ||
          ['fantastic-four-reed', 'sue-storm', 'doctor-doom'].includes(c.id);
        if (!isFF) return false;
      } else if (selectedCategory === 'cosmic') {
        const isCosmic =
          ['thor', 'loki', 'star-lord', 'thanos', 'captain-marvel', 'rocket-raccoon', 'groot', 'gamora'].includes(c.id) ||
          c.affiliation.toLowerCase().includes('guardians') ||
          c.powers.some(p => p.toLowerCase().includes('cosmic') || p.toLowerCase().includes('space') || p.toLowerCase().includes('multiverse'));
        if (!isCosmic) return false;
      } else if (selectedCategory === 'street') {
        const isStreet =
          ['spider-man', 'spider-man-tobey', 'spider-man-andrew', 'miles-morales', 'daredevil', 'punisher', 'blade', 'ghost-rider', 'venom', 'hawkeye', 'sam-wilson'].includes(c.id) ||
          c.affiliation.toLowerCase().includes('vigilante') ||
          c.affiliation.toLowerCase().includes('defenders');
        if (!isStreet) return false;
      } else if (selectedCategory === 'mystic') {
        const isMystic =
          ['doctor-strange', 'scarlet-witch', 'moon-knight', 'loki', 'shang-chi', 'ghost-rider', 'blade', 'agatha-harkness'].includes(c.id) ||
          c.powers.some(p => p.toLowerCase().includes('magic') || p.toLowerCase().includes('mystic') || p.toLowerCase().includes('chaos'));
        if (!isMystic) return false;
      }

      // 2. Role Filter
      if (selectedRole !== 'all') {
        const inferredRole: CharacterRole =
          c.role ||
          (['thanos', 'ultron', 'doctor-doom', 'magneto'].includes(c.id) ? 'villain' :
           ['deadpool', 'punisher', 'agatha-harkness', 'venom', 'loki', 'blade'].includes(c.id) ? 'antihero' : 'hero');
        if (inferredRole !== selectedRole) return false;
      }

      // 3. Universe Filter
      if (selectedUniverse !== 'all') {
        if (selectedUniverse === 'mcu') {
          const isMcu = c.universeId === 'earth-616' || !c.universeId || c.id.startsWith('spider-man') === false || c.id === 'spider-man';
          if (!isMcu && ['spider-man-tobey', 'spider-man-andrew', 'miles-morales', 'wolverine', 'deadpool', 'professor-x', 'magneto', 'blade', 'ghost-rider', 'punisher'].includes(c.id)) return false;
        } else if (selectedUniverse === 'multiverse') {
          const isAlt = ['spider-man-tobey', 'spider-man-andrew', 'miles-morales', 'wolverine', 'deadpool', 'professor-x', 'magneto', 'blade', 'ghost-rider', 'punisher', 'sue-storm'].includes(c.id) || c.universeId !== 'earth-616';
          if (!isAlt) return false;
        }
      }

      // 4. Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          c.name.toLowerCase().includes(q) ||
          c.alias.toLowerCase().includes(q) ||
          c.actor.toLowerCase().includes(q) ||
          c.powers.some(p => p.toLowerCase().includes(q)) ||
          c.affiliation.toLowerCase().includes(q) ||
          c.franchise?.toLowerCase().includes(q) ||
          c.firstAppearance.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedRole, selectedUniverse]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>SUPERHERO & VILLAIN DOSSIERS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
              Marvel Character Vault
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Classified dossier archives with verified Marvel cinematic portraits, powers, origins, and linked appearances across films, streaming series, and specials.
            </p>
          </div>

          {/* Local Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-red-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search heroes, villains, actors, or powers..."
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

        {/* Team Tabs */}
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

        {/* Secondary Filter Bar: Role and Universe */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-3 rounded-xl border border-white/5">
          {/* Role Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold mr-1">
              Role:
            </span>
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'hero', label: 'Heroes' },
              { id: 'villain', label: 'Villains' },
              { id: 'antihero', label: 'Antiheroes' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                  selectedRole === r.id
                    ? 'bg-white/20 text-white border-white/40'
                    : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Universe Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold mr-1">
              Continuity:
            </span>
            {[
              { id: 'all', label: 'All Realities' },
              { id: 'mcu', label: 'Sacred Timeline (MCU)' },
              { id: 'multiverse', label: 'Multiverse / Legacy' }
            ].map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUniverse(u.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                  selectedUniverse === u.id
                    ? 'bg-red-950/80 text-red-300 border-red-700/60'
                    : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
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
                setSelectedRole('all');
                setSelectedUniverse('all');
              }}
              className="mt-2 text-xs text-red-400 hover:text-red-300 underline font-mono"
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

export default CharactersPage;
