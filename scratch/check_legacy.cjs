const fs = require('fs');
const path = require('path');

const moviesRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), 'utf8');
const mMatch = moviesRaw.match(/export const MOVIES_DATA: Movie\[\] = (\[[\s\S]*\]);/);
const movies = JSON.parse(mMatch[1]);

console.log(`Total Movies: ${movies.length}`);
const nonMcu = movies.filter(m => !m.isMcu);
console.log(`Total Non-MCU / Legacy Movies: ${nonMcu.length}`);

const legacyCategories = [
  'daredevil',
  'elektra',
  'hulk',
  'blade',
  'punisher',
  'ghost rider',
  'fantastic four',
  'x-men',
  'wolverine',
  'spider-man',
  'spider-verse',
  'venom',
  'morbius',
  'madame web',
  'kraven',
  'captain america',
  'howard the duck',
  'man-thing'
];

legacyCategories.forEach(cat => {
  const matches = nonMcu.filter(m => m.title.toLowerCase().includes(cat) || m.franchise?.toLowerCase().includes(cat));
  console.log(`\n=== Category: "${cat}" (${matches.length} titles) ===`);
  matches.forEach(m => console.log(`  [${m.id}] ${m.title} (${m.year}) - Studio: ${m.studio} | TMDB: ${m.tmdbId}`));
});
