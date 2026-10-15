const fs = require('fs');
const path = require('path');

const moviesPath = path.join(__dirname, '..', 'src', 'data', 'movies.ts');
const raw = fs.readFileSync(moviesPath, 'utf8');
const match = raw.match(/export const MOVIES_DATA: Movie\[\] = (\[[\s\S]*\]);/);
const movies = JSON.parse(match[1]);

const movieMap = new Map();
movies.forEach(m => movieMap.set(m.id, m));

// 1. Correct existing broken shorts & specials
if (movieMap.has('team-thor')) {
  const m = movieMap.get('team-thor');
  m.tmdbId = 413279;
  m.poster = 'https://image.tmdb.org/t/p/w780/hpHvGuMc46pppwpcW0Xk7eys3L4.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/rmsj3O1e1fFmIKIuFjkN572s7xQ.jpg';
  m.watchConfig = { tmdbId: 413279, type: 'movie', watchProvider: 'screenscape', language: 'eng' };
}
if (movieMap.has('team-thor-part-2')) {
  const m = movieMap.get('team-thor-part-2');
  m.tmdbId = 441829;
  m.poster = 'https://image.tmdb.org/t/p/w780/2jmP71A5Un0jDNqBesDPQSN8hjJ.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/cz8m8AS8MOD1x4RAjYgYMHf13xB.jpg';
  m.watchConfig = { tmdbId: 441829, type: 'movie', watchProvider: 'screenscape', language: 'eng' };
}
if (movieMap.has('team-darryl')) {
  const m = movieMap.get('team-darryl');
  m.tmdbId = 505945;
  m.poster = 'https://image.tmdb.org/t/p/w780/edroTAeTEM9ILyAnumA0ALxRSne.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/wL56346BF1eMElIGtqWLiILcfbU.jpg';
  m.watchConfig = { tmdbId: 505945, type: 'movie', watchProvider: 'screenscape', language: 'eng' };
}
if (movieMap.has('deadpool-no-good-deed')) {
  const m = movieMap.get('deadpool-no-good-deed');
  m.tmdbId = 558144;
  m.poster = 'https://image.tmdb.org/t/p/w780/dpHmdsLoKjuGnAhsYI4D65S7wTQ.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/sUELHitVw5U0tOJg0x34wY7eTuh.jpg';
  m.watchConfig = { tmdbId: 558144, type: 'movie', watchProvider: 'screenscape', language: 'eng' };
}
if (movieMap.has('the-punisher-one-last-kill')) {
  const m = movieMap.get('the-punisher-one-last-kill');
  m.tmdbId = 1439930;
  m.releaseDate = '2026-05-12';
  m.year = 2026;
  m.isReleased = true;
  m.isUpcoming = false;
  m.releaseStatus = 'released';
  m.mediaSubtype = 'special-presentation';
  m.poster = 'https://image.tmdb.org/t/p/w780/qQclTgLMDvGBuUBFGHRipxkEwWR.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/qO55CD8tgVL1T4WKn6zYFFiD6lL.jpg';
  m.overview = 'As Frank Castle searches for meaning beyond revenge, an unexpected force pulls him back into the fight.';
  m.watchConfig = { tmdbId: 1439930, type: 'movie', watchProvider: 'screenscape', language: 'eng' };
}

// 2. Correct upcoming movies metadata and posters
if (movieMap.has('blade-mcu')) {
  const m = movieMap.get('blade-mcu');
  m.upcomingStatus = 'announced';
  m.releaseDate = 'TBA';
  m.poster = 'https://image.tmdb.org/t/p/w780/oWT70TvbsmQaqyphCZpsnQR7R32.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/7NKfxJrQn053UJeLftlx4m4NTzo.jpg';
  m.overview = 'Marvel Studios feature film reboot of the iconic daywalking vampire hunter Eric Brooks, starring two-time Academy Award winner Mahershala Ali.';
}
if (movieMap.has('shang-chi-2')) {
  const m = movieMap.get('shang-chi-2');
  m.upcomingStatus = 'announced';
  m.releaseDate = 'TBA';
  m.poster = 'https://image.tmdb.org/t/p/w780/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/83H0C66AcvkwpG2738VCTHMY9uv.jpg';
  m.overview = 'The sequel to Shang-Chi and the Legend of the Ten Rings in development at Marvel Studios, directed by Destin Daniel Cretton.';
}
if (movieMap.has('x-men-mcu')) {
  const m = movieMap.get('x-men-mcu');
  m.upcomingStatus = 'announced';
  m.releaseDate = 'TBA';
  m.poster = 'https://image.tmdb.org/t/p/w780/2HKBc5UiFw8JrruHq8S1Y7TnlW0.jpg';
  m.backdrop = 'https://image.tmdb.org/t/p/w1280/jIyEmnBrZtl6SEWyBoMO2hZnzMa.jpg';
  m.overview = 'Marvel Studios officially announced live-action reboot integrating mutants and the X-Men directly into the Marvel Cinematic Universe.';
}

// 3. Add REQUIRED UPCOMING TITLE — GHOST RIDER (2028)
if (!movieMap.has('ghost-rider-2028')) {
  movieMap.set('ghost-rider-2028', {
    id: 'ghost-rider-2028',
    title: 'Ghost Rider',
    year: 2028,
    releaseDate: '2028-07-28',
    runtime: 125,
    overview: 'A feature film set in the Marvel Cinematic Universe (MCU) starring Ryan Gosling as stunt motorcyclist Johnny Blaze, who transforms into the supernatural Spirit of Vengeance to battle demonic forces threatening reality.',
    poster: 'https://image.tmdb.org/t/p/w780/zgC1zo3lyujoEiIMnUrHltvPmZg.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/8ZuU1bCXvqcHdFIIiJAtkGRPw1j.jpg',
    rating: 8.5,
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Fantasy', 'Horror'],
    director: 'Shawn Levy',
    cast: [
      { name: 'Ryan Gosling', role: 'Johnny Blaze / Ghost Rider' }
    ],
    characters: ['ghost-rider-mcu'],
    releaseOrder: 45,
    chronologicalOrder: 45,
    tmdbId: 1738010,
    watchConfig: {
      tmdbId: 1738010,
      type: 'movie',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    tagline: 'The Spirit of Vengeance Rises in the MCU.',
    studio: 'Marvel Studios',
    studioId: 'marvel-studios',
    franchise: 'Ghost Rider',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    mcuRelationship: 'canon-mcu',
    isMcu: true,
    isUpcoming: true,
    isReleased: false,
    releaseStatus: 'upcoming',
    upcomingStatus: 'confirmed',
    verificationStatus: 'verified'
  });
}

// 4. Add Black Panther 3 & Doctor Strange 3
if (!movieMap.has('black-panther-3')) {
  movieMap.set('black-panther-3', {
    id: 'black-panther-3',
    title: 'Black Panther 3',
    year: 2028,
    releaseDate: '2028-12-13',
    runtime: 135,
    overview: 'The third installment in Marvel Studios\' Black Panther saga in development with director Ryan Coogler, exploring the continued ascension of Wakanda and the legacy of the Panther mantle.',
    poster: 'https://image.tmdb.org/t/p/w780/zJc9fYZxgq4yzI0Oru2e1Cf3a3V.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/5b8t06v1cTd9H5IgWs6gj6987JM.jpg',
    rating: 8.0,
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'Ryan Coogler',
    cast: [
      { name: 'Letitia Wright', role: 'Shuri / Black Panther' }
    ],
    characters: ['shuri'],
    releaseOrder: 47,
    chronologicalOrder: 47,
    tmdbId: 1386618,
    studio: 'Marvel Studios',
    studioId: 'marvel-studios',
    franchise: 'Black Panther',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: true,
    isUpcoming: true,
    isReleased: false,
    releaseStatus: 'upcoming',
    upcomingStatus: 'announced'
  });
}

if (!movieMap.has('doctor-strange-3')) {
  movieMap.set('doctor-strange-3', {
    id: 'doctor-strange-3',
    title: 'Doctor Strange 3',
    year: 2028,
    releaseDate: 'TBA',
    runtime: 130,
    overview: 'In development at Marvel Studios; Benedict Cumberbatch returns as Master of the Mystic Arts Dr. Stephen Strange to confront the cosmic incursions threatening the multiverse following the events of Multiverse of Madness.',
    poster: 'https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/lv3TXqhpaIxkclIHbhN2MRMOemQ.jpg',
    rating: 8.0,
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Fantasy', 'Adventure'],
    director: 'Marvel Studios',
    cast: [
      { name: 'Benedict Cumberbatch', role: 'Dr. Stephen Strange / Doctor Strange' }
    ],
    characters: ['doctor-strange'],
    releaseOrder: 48,
    chronologicalOrder: 48,
    studio: 'Marvel Studios',
    studioId: 'marvel-studios',
    franchise: 'Doctor Strange',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: true,
    isUpcoming: true,
    isReleased: false,
    releaseStatus: 'upcoming',
    upcomingStatus: 'announced'
  });
}

// 5. Add Missing Sony Universe Marvel Adaptations
const sonyTitles = [
  {
    id: 'venom',
    title: 'Venom',
    year: 2018,
    releaseDate: '2018-09-28',
    runtime: 112,
    overview: 'Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of an alien symbiote that gives him a violent alter-ego: Venom.',
    poster: 'https://image.tmdb.org/t/p/w780/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg',
    rating: 6.8,
    genres: ['Action', 'Sci-Fi'],
    director: 'Ruben Fleischer',
    cast: [
      { name: 'Tom Hardy', role: 'Eddie Brock / Venom' },
      { name: 'Michelle Williams', role: 'Anne Weying' },
      { name: 'Riz Ahmed', role: 'Carlton Drake / Riot' }
    ],
    characters: ['venom'],
    releaseOrder: 80,
    chronologicalOrder: 80,
    tmdbId: 335983,
    studio: 'Sony Pictures / Columbia Pictures',
    studioId: 'sony-pictures',
    franchise: "Sony's Spider-Man Universe",
    universe: "Sony's Spider-Man Universe (Earth-688)",
    universeId: 'earth-688',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 335983, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'venom-let-there-be-carnage',
    title: 'Venom: Let There Be Carnage',
    year: 2021,
    releaseDate: '2021-09-30',
    runtime: 97,
    overview: 'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
    poster: 'https://image.tmdb.org/t/p/w780/pzKsRuKLFmYrW5Q0q8E8G78Tcgo.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/eENEf62tMXbhyVvdcXlnQz2wcuT.jpg',
    rating: 6.7,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    director: 'Andy Serkis',
    cast: [
      { name: 'Tom Hardy', role: 'Eddie Brock / Venom' },
      { name: 'Woody Harrelson', role: 'Cletus Kasady / Carnage' }
    ],
    characters: ['venom'],
    releaseOrder: 81,
    chronologicalOrder: 81,
    tmdbId: 580489,
    studio: 'Sony Pictures / Columbia Pictures',
    studioId: 'sony-pictures',
    franchise: "Sony's Spider-Man Universe",
    universe: "Sony's Spider-Man Universe (Earth-688)",
    universeId: 'earth-688',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 580489, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'venom-the-last-dance',
    title: 'Venom: The Last Dance',
    year: 2024,
    releaseDate: '2024-10-22',
    runtime: 109,
    overview: 'Eddie Brock and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie\'s last dance.',
    poster: 'https://image.tmdb.org/t/p/w780/vGXptEdgZIhPg3cGlc7e8sNPC2e.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg',
    rating: 6.8,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    director: 'Kelly Marcel',
    cast: [
      { name: 'Tom Hardy', role: 'Eddie Brock / Venom' },
      { name: 'Chiwetel Ejiofor', role: 'Rex Strickland' }
    ],
    characters: ['venom'],
    releaseOrder: 82,
    chronologicalOrder: 82,
    tmdbId: 912649,
    studio: 'Sony Pictures / Columbia Pictures',
    studioId: 'sony-pictures',
    franchise: "Sony's Spider-Man Universe",
    universe: "Sony's Spider-Man Universe (Earth-688)",
    universeId: 'earth-688',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 912649, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'morbius',
    title: 'Morbius',
    year: 2022,
    releaseDate: '2022-03-30',
    runtime: 104,
    overview: 'Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.',
    poster: 'https://image.tmdb.org/t/p/w780/Av8Z2jZhEm1FLkFzMThzz9hndJF.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/jzWT0zd8U77fqWg5WgUfYaMzSFz.jpg',
    rating: 6.0,
    genres: ['Action', 'Horror', 'Sci-Fi'],
    director: 'Daniel Espinosa',
    cast: [
      { name: 'Jared Leto', role: 'Dr. Michael Morbius' },
      { name: 'Matt Smith', role: 'Milo' }
    ],
    characters: [],
    releaseOrder: 83,
    chronologicalOrder: 83,
    tmdbId: 526896,
    studio: 'Sony Pictures / Columbia Pictures',
    studioId: 'sony-pictures',
    franchise: "Sony's Spider-Man Universe",
    universe: "Sony's Spider-Man Universe (Earth-688)",
    universeId: 'earth-688',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 526896, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'madame-web',
    title: 'Madame Web',
    year: 2024,
    releaseDate: '2024-02-14',
    runtime: 116,
    overview: 'Forced to confront revelations about her past, paramedic Cassandra Webb establishes a relationship with three young women destined for powerful futures... if they can all survive a deadly present.',
    poster: 'https://image.tmdb.org/t/p/w780/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg',
    rating: 5.4,
    genres: ['Action', 'Fantasy'],
    director: 'S.J. Clarkson',
    cast: [
      { name: 'Dakota Johnson', role: 'Cassandra Webb / Madame Web' },
      { name: 'Sydney Sweeney', role: 'Julia Cornwall' }
    ],
    characters: [],
    releaseOrder: 84,
    chronologicalOrder: 84,
    tmdbId: 634492,
    studio: 'Sony Pictures / Columbia Pictures',
    studioId: 'sony-pictures',
    franchise: "Sony's Spider-Man Universe",
    universe: "Sony's Spider-Man Universe (Earth-688)",
    universeId: 'earth-688',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 634492, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'kraven-the-hunter',
    title: 'Kraven the Hunter',
    year: 2024,
    releaseDate: '2024-12-11',
    runtime: 127,
    overview: 'Kraven\'s complex relationship with his ruthless father, Nikolai Kravinoff, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.',
    poster: 'https://image.tmdb.org/t/p/w780/1GvBhRxY6MELDfxFrete6BNhBB5.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/bGGjyPqtNc8hhGkPo8W8D8t90bW.jpg',
    rating: 6.5,
    genres: ['Action', 'Adventure', 'Thriller'],
    director: 'J.C. Chandor',
    cast: [
      { name: 'Aaron Taylor-Johnson', role: 'Sergei Kravinoff / Kraven the Hunter' },
      { name: 'Russell Crowe', role: 'Nikolai Kravinoff' }
    ],
    characters: [],
    releaseOrder: 85,
    chronologicalOrder: 85,
    tmdbId: 539972,
    studio: 'Sony Pictures / Columbia Pictures',
    studioId: 'sony-pictures',
    franchise: "Sony's Spider-Man Universe",
    universe: "Sony's Spider-Man Universe (Earth-688)",
    universeId: 'earth-688',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 539972, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  }
];

sonyTitles.forEach(t => {
  if (!movieMap.has(t.id)) movieMap.set(t.id, t);
});

// 6. Add Historical Marvel Serials and International Adaptations
const legacySerials = [
  {
    id: 'captain-america-1944',
    title: 'Captain America (1944 Serial)',
    year: 1944,
    releaseDate: '1944-02-05',
    runtime: 243,
    overview: 'The earliest live-action screen adaptation of a Marvel superhero. District Attorney Grant Gardner suits up as the masked champion Captain America to battle the mysterious Scarab and his deadly Thermal Ray.',
    poster: 'https://image.tmdb.org/t/p/w780/nBRcChS66NohR3x6KVYMp6Obutt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    rating: 6.2,
    genres: ['Action', 'Crime', 'Sci-Fi'],
    director: 'Elmer Clifton, John English',
    cast: [
      { name: 'Dick Purcell', role: 'Grant Gardner / Captain America' },
      { name: 'Lorna Gray', role: 'Gail Richards' },
      { name: 'Lionel Atwill', role: 'Dr. Cyrus Maldor / The Scarab' }
    ],
    characters: ['captain-america'],
    releaseOrder: 1,
    chronologicalOrder: 1,
    tmdbId: 106355,
    studio: 'Republic Pictures',
    studioId: 'standalone-marvel',
    franchise: 'Captain America (1944)',
    universe: 'Standalone Marvel Universe',
    universeId: 'standalone-marvel',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 106355, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'spider-man-1977',
    title: 'The Amazing Spider-Man (1977)',
    year: 1977,
    releaseDate: '1977-09-14',
    runtime: 92,
    overview: 'When an extortionist threatens to force ten people to commit suicide through telepathic mind control, Peter Parker is bitten by a radioactive spider and uses his newfound powers as Spider-Man to stop him.',
    poster: 'https://image.tmdb.org/t/p/w780/jNxRHZ2cxVkNRtxgHuCtv7GY4JP.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    rating: 6.1,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'E.W. Swackhamer',
    cast: [
      { name: 'Nicholas Hammond', role: 'Peter Parker / Spider-Man' },
      { name: 'David White', role: 'J. Jonah Jameson' }
    ],
    characters: ['spider-man'],
    releaseOrder: 2,
    chronologicalOrder: 2,
    tmdbId: 225914,
    studio: 'Columbia Pictures Television',
    studioId: 'sony-pictures',
    franchise: 'The Amazing Spider-Man (1977)',
    universe: 'Earth-730911',
    universeId: 'standalone-marvel',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 225914, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'spider-man-strikes-back-1978',
    title: 'Spider-Man Strikes Back (1978)',
    year: 1978,
    releaseDate: '1978-12-21',
    runtime: 93,
    overview: 'At the New York State University, three students inadvertently build an atomic bomb to prove nuclear weapons proliferation dangers. Industrialist White kidnaps them and threatens to detonate the bomb unless Spider-Man intervenes.',
    poster: 'https://image.tmdb.org/t/p/w780/mwRss4cA5m4fH6izoTwwPfF3ZOU.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    rating: 6.0,
    genres: ['Action', 'Adventure', 'Crime'],
    director: 'Ron Satlof',
    cast: [
      { name: 'Nicholas Hammond', role: 'Peter Parker / Spider-Man' },
      { name: 'Robert F. Simon', role: 'J. Jonah Jameson' }
    ],
    characters: ['spider-man'],
    releaseOrder: 3,
    chronologicalOrder: 3,
    tmdbId: 225925,
    studio: 'Columbia Pictures Television',
    studioId: 'sony-pictures',
    franchise: 'The Amazing Spider-Man (1977)',
    universe: 'Earth-730911',
    universeId: 'standalone-marvel',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 225925, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'spider-man-the-dragons-challenge-1980',
    title: 'Spider-Man: The Dragon\'s Challenge (1980)',
    year: 1980,
    releaseDate: '1980-12-05',
    runtime: 92,
    overview: 'Industrialist Min Lo Chan is falsely accused of selling defense secrets during WWII. Spider-Man journeys across Hong Kong to clear his name and battle ruthless triad syndicates.',
    poster: 'https://image.tmdb.org/t/p/w780/wBmtFmSikG5u08FdGLRsF0Py59V.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    rating: 5.9,
    genres: ['Action', 'Adventure', 'Crime'],
    director: 'Don McDougall',
    cast: [
      { name: 'Nicholas Hammond', role: 'Peter Parker / Spider-Man' }
    ],
    characters: ['spider-man'],
    releaseOrder: 4,
    chronologicalOrder: 4,
    tmdbId: 225938,
    studio: 'Columbia Pictures Television',
    studioId: 'sony-pictures',
    franchise: 'The Amazing Spider-Man (1977)',
    universe: 'Earth-730911',
    universeId: 'standalone-marvel',
    movieType: 'live-action',
    mediaSubtype: 'feature-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 225938, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  },
  {
    id: 'japanese-spider-man-1978',
    title: 'Japanese Spider-Man (Toei 1978)',
    year: 1978,
    releaseDate: '1978-07-22',
    runtime: 24,
    overview: 'Motorcycle racer Takuya Yamashiro is given spider-powers and the giant robotic combat mecha Leopardon by Garia, the last warrior of Planet Spider, to battle Professor Monster\'s Iron Cross Army.',
    poster: 'https://image.tmdb.org/t/p/w780/hi98SQoZgxBMHmWsbhxyh5tNQcB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    rating: 6.9,
    genres: ['Action', 'Sci-Fi'],
    director: 'Koichi Takemoto',
    cast: [
      { name: 'Shinji Todo', role: 'Takuya Yamashiro / Spider-Man' }
    ],
    characters: [],
    releaseOrder: 5,
    chronologicalOrder: 5,
    tmdbId: 438561,
    studio: 'Toei Company',
    studioId: 'standalone-marvel',
    franchise: 'Japanese Spider-Man',
    universe: 'Earth-51778',
    universeId: 'standalone-marvel',
    movieType: 'live-action',
    mediaSubtype: 'short-film',
    isMcu: false,
    isLegacy: true,
    isReleased: true,
    releaseStatus: 'released',
    watchConfig: { tmdbId: 438561, type: 'movie', watchProvider: 'screenscape', language: 'eng' }
  }
];

legacySerials.forEach(s => {
  if (!movieMap.has(s.id)) movieMap.set(s.id, s);
});

const finalMovies = Array.from(movieMap.values());
const outContent = `import type { Movie } from '../types';\n\nexport const MOVIES_DATA: Movie[] = ${JSON.stringify(finalMovies, null, 2)};\n`;
fs.writeFileSync(moviesPath, outContent, 'utf8');
console.log(`Successfully updated movies.ts: Total Movies = ${finalMovies.length}`);
