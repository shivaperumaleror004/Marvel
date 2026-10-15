const fs = require('fs');
const path = require('path');

const moviesRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), 'utf8');
const seriesRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'series.ts'), 'utf8');

const mMatch = moviesRaw.match(/export const MOVIES_DATA: Movie\[\] = (\[[\s\S]*\]);/);
const sMatch = seriesRaw.match(/export const SERIES_DATA: Series\[\] = (\[[\s\S]*\]);/);

const movies = JSON.parse(mMatch[1]);
const series = JSON.parse(sMatch[1]);

console.log('--- UPCOMING / UNRELEASED MOVIES ---');
movies.filter(m => m.isUpcoming || m.releaseStatus === 'upcoming').forEach(m => {
  console.log(`- [${m.id}] ${m.title} | Year: ${m.year} | Date: ${m.releaseDate} | Status: ${m.releaseStatus}/${m.upcomingStatus} | TMDB: ${m.tmdbId} | Poster: ${m.poster?.substring(0, 50)}...`);
});

console.log('\n--- UPCOMING / UNRELEASED SERIES ---');
series.filter(s => s.releaseStatus === 'upcoming').forEach(s => {
  console.log(`- [${s.id}] ${s.title} | Year: ${s.year} | RelYear: ${s.releaseYear} | Status: ${s.releaseStatus}/${s.upcomingStatus} | TMDB: ${s.tmdbId} | Poster: ${s.poster?.substring(0, 50)}...`);
});
