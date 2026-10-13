const fs = require('fs');
const path = require('path');

const fileRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), 'utf-8');
const match = fileRaw.match(/export const MOVIES_DATA: Movie\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error("Failed to parse MOVIES_DATA");
  process.exit(1);
}
const movies = JSON.parse(match[1]);

console.log("=== MARVEL MOVIES DEFINITIVE AUDIT ===");
console.log(`Total Movies in Archive: ${movies.length}`);

// Fix Howard the Duck if needed
const howard = movies.find(m => m.id === 'howard-the-duck');
if (howard && howard.tmdbId !== 10658) {
  howard.tmdbId = 10658;
  howard.poster = "https://image.tmdb.org/t/p/w780/30tnH0hy6S5FjGCfCdnkBd3wqS2.jpg";
  howard.backdrop = "https://image.tmdb.org/t/p/w1280/3KQe8Vzma7ZAYE25mJjgIG4Gj5e.jpg";
  howard.watchConfig = { tmdbId: 10658, type: 'movie', watchProvider: 'screenscape', language: 'eng' };
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), `import type { Movie } from '../types';\n\nexport const MOVIES_DATA: Movie[] = ${JSON.stringify(movies, null, 2)};\n`, 'utf-8');
  console.log("Fixed Howard the Duck TMDB ID to 10658 and updated posters.");
}

// 1. By Studio
const byStudio = {};
movies.forEach(m => {
  const s = m.studio || 'Unknown';
  byStudio[s] = (byStudio[s] || 0) + 1;
});
console.log("\n--- MOVIES BY STUDIO ---");
console.table(byStudio);

// 2. By Franchise
const byFranchise = {};
movies.forEach(m => {
  const f = m.franchise || 'Standalone';
  byFranchise[f] = (byFranchise[f] || 0) + 1;
});
console.log("\n--- MOVIES BY FRANCHISE ---");
console.table(byFranchise);

// 3. By Universe
const byUniverse = {};
movies.forEach(m => {
  const u = m.universe || 'Unassigned';
  byUniverse[u] = (byUniverse[u] || 0) + 1;
});
console.log("\n--- MOVIES BY UNIVERSE ---");
console.table(byUniverse);

// 4. Check Release Order monotonicity
const released = movies.filter(m => m.isReleased !== false && !m.isUpcoming);
const sortedByDate = [...released].sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
console.log(`\nEarliest Released Marvel Film: ${sortedByDate[0].title} (${sortedByDate[0].releaseDate})`);
console.log(`Latest Released Marvel Film: ${sortedByDate[sortedByDate.length - 1].title} (${sortedByDate[sortedByDate.length - 1].releaseDate})`);

// 5. Check Upcoming
const upcoming = movies.filter(m => m.isUpcoming || m.releaseStatus === 'upcoming');
console.log(`\nUpcoming Marvel Films: ${upcoming.map(u => `${u.title} (${u.releaseDate})`).join(', ')}`);

// 6. Check for any missing TMDB IDs or poster paths
const missingTmdb = movies.filter(m => !m.tmdbId || !m.poster);
console.log(`\nMissing TMDB / Posters: ${missingTmdb.length}`);
if (missingTmdb.length > 0) {
  console.log(missingTmdb.map(m => m.title));
}
