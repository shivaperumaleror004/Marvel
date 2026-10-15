const fs = require('fs');
const path = require('path');

const seriesRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'series.ts'), 'utf8');
const sMatch = seriesRaw.match(/export const SERIES_DATA: Series\[\] = (\[[\s\S]*\]);/);
const series = JSON.parse(sMatch[1]);

const targetSeriesIds = [
  'visionquest',
  'daredevil-born-again',
  'wonder-man',
  'your-friendly-neighborhood-spider-man',
  'x-men-97',
  'marvel-zombies',
  'eyes-of-wakanda',
  'ironheart'
];

targetSeriesIds.forEach(id => {
  const s = series.find(x => x.id === id || x.id.includes(id) || x.title.toLowerCase().includes(id.replace(/-/g, ' ')));
  if (s) {
    console.log(`Series found: [${s.id}] "${s.title}" | TMDB: ${s.tmdbId} | status: ${s.releaseStatus} | relYear: ${s.releaseYear} | seasons: ${s.seasons?.length} | poster: ${s.poster}`);
  } else {
    console.log(`Series NOT in series.ts: [${id}]`);
  }
});
