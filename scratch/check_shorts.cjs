const fs = require('fs');
const path = require('path');

const moviesRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), 'utf8');
const mMatch = moviesRaw.match(/export const MOVIES_DATA: Movie\[\] = (\[[\s\S]*\]);/);
const movies = JSON.parse(mMatch[1]);

const queryTitles = [
  'All Hail the King',
  'The Consultant',
  'Item 47',
  'Funny Thing',
  'Agent Carter',
  'Team Thor',
  'Team Darryl',
  'No Good Deed',
  'Werewolf by Night',
  'Holiday Special',
  'One Last Kill'
];

queryTitles.forEach(t => {
  const matches = movies.filter(m => m.title.toLowerCase().includes(t.toLowerCase()));
  if (matches.length > 0) {
    matches.forEach(m => console.log(`Found: [${m.id}] "${m.title}" | mediaSubtype: ${m.mediaSubtype} | tmdbId: ${m.tmdbId} | poster: ${m.poster}`));
  } else {
    console.log(`NOT FOUND: ${t}`);
  }
});
