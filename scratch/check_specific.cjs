const fs = require('fs');
const path = require('path');

const moviesRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), 'utf8');
const mMatch = moviesRaw.match(/export const MOVIES_DATA: Movie\[\] = (\[[\s\S]*\]);/);
const movies = JSON.parse(mMatch[1]);

const targetIds = [
  'team-thor',
  'team-thor-part-2',
  'team-darryl',
  'deadpool-no-good-deed',
  'the-punisher-one-last-kill',
  'blade-mcu',
  'shang-chi-2',
  'x-men-mcu',
  'visionquest',
  'daredevil-born-again',
  'wonder-man',
  'your-friendly-neighborhood-spider-man',
  'x-men-97',
  'marvel-zombies',
  'eyes-of-wakanda',
  'ironheart'
];

targetIds.forEach(id => {
  const m = movies.find(x => x.id === id);
  if (m) {
    console.log(`Movie found: [${m.id}] "${m.title}" | TMDB: ${m.tmdbId} | isUpcoming: ${m.isUpcoming} | releaseStatus: ${m.releaseStatus} | date: ${m.releaseDate} | poster: ${m.poster}`);
  } else {
    console.log(`Movie NOT in movies.ts: [${id}]`);
  }
});
