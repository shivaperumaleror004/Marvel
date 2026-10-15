const fs = require('fs');
const path = require('path');

const seriesPath = path.join(__dirname, '..', 'src', 'data', 'series.ts');
const raw = fs.readFileSync(seriesPath, 'utf8');
const match = raw.match(/export const SERIES_DATA: Series\[\] = (\[[\s\S]*\]);/);
const seriesList = JSON.parse(match[1]);

const seriesMap = new Map();
seriesList.forEach(s => seriesMap.set(s.id, s));

// 1. VisionQuest - Confirmed Released Oct 13, 2026
if (seriesMap.has('vision-quest')) {
  const v = seriesMap.get('vision-quest');
  v.title = 'VisionQuest';
  v.tmdbId = 213375;
  v.year = 2026;
  v.releaseYear = '2026';
  v.isReleased = true;
  v.isUpcoming = false;
  v.releaseStatus = 'released';
  v.poster = 'https://image.tmdb.org/t/p/w780/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg';
  v.backdrop = 'https://image.tmdb.org/t/p/w1280/uoXXbN2PrOxH6UKyP7kYwmGpAAP.jpg';
  v.overview = "With a bounty on his head, Vision must confront his nature and resist Ultron's influence to survive.";
  v.cast = [
    { name: 'Paul Bettany', role: 'Vision / White Vision', avatar: 'https://image.tmdb.org/t/p/w185/oNrDowF5cRtK5lJJuCAh0KeFizy.jpg' },
    { name: 'James Spader', role: 'Ultron', avatar: 'https://image.tmdb.org/t/p/w185/3gurW3OgDOD4hcqDfgcqUnoNg34.jpg' },
    { name: 'Todd Stashwick', role: 'Paladin' }
  ];
  v.characters = ['white-vision', 'vision', 'ultron'];
  v.watchConfig = { tmdbId: 213375, type: 'tv', watchProvider: 'screenscape', language: 'eng' };
}

// 2. Ensure all released recent series have releaseStatus: 'released'
const releasedSeries = [
  'daredevil-born-again',
  'wonder-man',
  'your-friendly-neighborhood-spider-man',
  'x-men-97',
  'marvel-zombies',
  'eyes-of-wakanda',
  'ironheart'
];

releasedSeries.forEach(id => {
  if (seriesMap.has(id)) {
    const s = seriesMap.get(id);
    s.isReleased = true;
    s.isUpcoming = false;
    s.releaseStatus = 'released';
  }
});

// Daredevil Born Again - update with Season 2
if (seriesMap.has('daredevil-born-again')) {
  const dba = seriesMap.get('daredevil-born-again');
  dba.releaseYear = '2025 - 2026';
  dba.poster = 'https://image.tmdb.org/t/p/w780/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg';
  dba.backdrop = 'https://image.tmdb.org/t/p/w1280/qrTAc0ZtQ859Qu5O8cixJzNJpQs.jpg';
  if (!dba.seasons || dba.seasons.length < 2) {
    dba.seasons = [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Matt Murdock and Wilson Fisk try to leave their alter egos behind to help New York, only for their pasts to catch up to them.',
        poster: 'https://image.tmdb.org/t/p/w780/9lLuhV703HGCbnz6FxnqCwIwzAZ.jpg',
        episodeCount: 9,
        episodes: []
      },
      {
        seasonNumber: 2,
        title: 'Season 2',
        overview: 'The battle for New York City escalates as Mayor Fisk clashes with Daredevil and the underground vigilante resistance.',
        poster: 'https://image.tmdb.org/t/p/w780/timvsedxh5ce795tsv6EDTZmmXW.jpg',
        episodeCount: 8,
        episodes: []
      }
    ];
    dba.totalSeasons = 2;
    dba.totalEpisodes = 17;
  }
}

// 3. Add Zodiac series
if (!seriesMap.has('zodiac')) {
  seriesMap.set('zodiac', {
    id: 'zodiac',
    title: 'Zodiac',
    year: 2027,
    releaseYear: 'TBA',
    overview: 'A high-stakes spy thriller set in the Marvel Cinematic Universe (MCU) exploring covert black-ops and clandestine espionage syndicates.',
    poster: 'https://image.tmdb.org/t/p/w780/A0Q6ttr7FPG93Jmft45e8pwsPIn.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    rating: 7.8,
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Thriller', 'Crime'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Clandestine operatives investigate the mysterious conspiracy known only as Zodiac.',
        episodeCount: 6,
        episodes: []
      }
    ],
    creator: 'Marvel Studios',
    cast: [],
    characters: [],
    releaseOrder: 35,
    chronologicalOrder: 35,
    tmdbId: 337844,
    totalEpisodes: 6,
    totalSeasons: 1,
    studio: 'Marvel Studios',
    studioId: 'marvel-studios',
    franchise: 'MCU Series',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    isMcu: true,
    isUpcoming: true,
    isReleased: false,
    releaseStatus: 'upcoming',
    upcomingStatus: 'announced',
    watchConfig: {
      tmdbId: 337844,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    }
  });
}

const finalSeries = Array.from(seriesMap.values());
const outContent = `import { Series } from '../types';\n\nexport const SERIES_DATA: Series[] = ${JSON.stringify(finalSeries, null, 2)};\n`;
fs.writeFileSync(seriesPath, outContent, 'utf8');
console.log(`Successfully updated series.ts: Total Series = ${finalSeries.length}`);
