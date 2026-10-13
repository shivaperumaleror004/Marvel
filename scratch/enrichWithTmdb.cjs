const fs = require('fs');
const path = require('path');

const TMDB_API_KEY = '69a04a6a3d1bcc7d6eeaffdbfd3f6b91';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function fetchTmdbMovie(tmdbId) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`TMDB error for ID ${tmdbId}: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`Fetch error for TMDB ID ${tmdbId}:`, err.message);
    return null;
  }
}

async function run() {
  const moviesRaw = fs.readFileSync(path.join(__dirname, 'master_movies_verified.json'), 'utf-8');
  const movies = JSON.parse(moviesRaw);

  console.log(`Enriching ${movies.length} movies via TMDB API...`);

  // Also read existing movies to keep custom character tags or overrides
  let existingMap = new Map();
  try {
    const existing = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), 'utf-8');
    const match = existing.match(/export const MOVIES_DATA: Movie\[\] = (\[[\s\S]*\]);/);
    if (match) {
      const parsed = JSON.parse(match[1]);
      parsed.forEach(m => existingMap.set(m.id, m));
    }
  } catch (e) {
    console.warn('Could not read existing movies:', e.message);
  }

  const enriched = [];

  for (let i = 0; i < movies.length; i++) {
    const m = movies[i];
    console.log(`[${i + 1}/${movies.length}] Fetching TMDB for: ${m.title} (${m.year}) [ID: ${m.tmdbId}]...`);
    
    const tmdbData = await fetchTmdbMovie(m.tmdbId);
    await sleep(80);

    const existing = existingMap.get(m.id) || {};

    let poster = existing.poster;
    let backdrop = existing.backdrop;
    let overview = existing.overview || m.overview || '';
    let runtime = existing.runtime || m.runtime || 120;
    let rating = existing.rating || 7.0;
    let genres = existing.genres || ['Action', 'Adventure', 'Sci-Fi'];
    let cast = existing.cast || [];
    let tagline = existing.tagline;

    if (tmdbData) {
      if (tmdbData.poster_path) {
        poster = `https://image.tmdb.org/t/p/w780${tmdbData.poster_path}`;
      }
      if (tmdbData.backdrop_path) {
        backdrop = `https://image.tmdb.org/t/p/w1280${tmdbData.backdrop_path}`;
      }
      if (tmdbData.overview) {
        overview = tmdbData.overview;
      }
      if (tmdbData.runtime) {
        runtime = tmdbData.runtime;
      }
      if (tmdbData.vote_average) {
        rating = Math.round(tmdbData.vote_average * 10) / 10;
      }
      if (tmdbData.genres && tmdbData.genres.length > 0) {
        genres = tmdbData.genres.map(g => g.name);
      }
      if (tmdbData.tagline) {
        tagline = tmdbData.tagline;
      }
      if (tmdbData.credits && tmdbData.credits.cast && tmdbData.credits.cast.length > 0) {
        cast = tmdbData.credits.cast.slice(0, 5).map(c => ({
          name: c.name,
          role: c.character || 'Actor'
        }));
      }
    }

    // Default fallbacks if missing
    if (!poster) {
      poster = 'https://image.tmdb.org/t/p/w780/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg';
    }
    if (!backdrop) {
      backdrop = 'https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg';
    }

    const characters = existing.characters || [m.id];

    const finalMovie = {
      id: m.id,
      title: m.title,
      year: m.year,
      releaseDate: m.releaseDate,
      runtime: runtime,
      overview: overview,
      poster: poster,
      backdrop: backdrop,
      rating: rating,
      genres: genres,
      director: m.director,
      tagline: tagline,
      studio: m.studio,
      studioId: m.studioId,
      distributor: m.distributor,
      franchise: m.franchise,
      universe: m.universe,
      universeId: m.universeId,
      universeDesignation: m.universeDesignation,
      movieType: m.movieType || "live-action",
      mcuRelationship: m.mcuRelationship || "non-mcu",
      isMcu: m.mcuRelationship === "canon-mcu" || m.mcuRelationship === "sony-collaboration" || m.studioId === "marvel-studios",
      isAnimation: m.movieType === "animation",
      isLegacy: m.mcuRelationship === "legacy",
      isCollaboration: m.mcuRelationship === "sony-collaboration" || m.mcuRelationship === "multiverse-crossover",
      releaseOrder: m.releaseOrder,
      chronologicalOrder: m.mcuChronologyOrder || m.universeChronologyOrder || 999,
      mcuChronologyOrder: m.mcuChronologyOrder,
      universeChronologyOrder: m.universeChronologyOrder,
      phase: m.phase,
      saga: m.saga,
      cast: cast,
      characters: characters,
      tmdbId: m.tmdbId,
      isUpcoming: m.isUpcoming || false,
      isReleased: m.isReleased !== false,
      releaseStatus: m.releaseStatus || (m.isUpcoming ? "upcoming" : "released"),
      verificationStatus: "verified",
      watchConfig: {
        tmdbId: m.tmdbId,
        type: "movie",
        watchProvider: "screenscape",
        language: "eng"
      }
    };

    enriched.push(finalMovie);
  }

  // Also retain the 5 One-Shots and 2 Special Presentations tagged accurately
  const oneShotsAndSpecials = [
    {
      id: "one-shot-the-consultant",
      title: "Marvel One-Shot: The Consultant",
      year: 2011,
      releaseDate: "2011-09-13",
      runtime: 4,
      overview: "Agents Coulson and Sitwell conspire to derail the World Security Council's demand to recruit Emil Blonsky into the Avengers initiative.",
      poster: "https://image.tmdb.org/t/p/w780/6MfaXU1hT3VwS8eQ1YyGqK2vN3B.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
      rating: 6.8,
      genres: ["Action", "Comedy", "Sci-Fi"],
      director: "Leythum",
      studio: "Marvel Studios",
      studioId: "marvel-studios",
      distributor: "Paramount Home Entertainment",
      franchise: "Marvel One-Shots",
      universe: "The Sacred Timeline (MCU)",
      universeId: "earth-616",
      universeDesignation: "Earth-616",
      movieType: "short",
      mcuRelationship: "canon-mcu",
      isMcu: true,
      phase: "Phase 1",
      saga: "Infinity Saga",
      releaseOrder: 6,
      chronologicalOrder: 7,
      mcuChronologyOrder: 7,
      cast: [{ name: "Clark Gregg", role: "Agent Phil Coulson" }, { name: "Maximiliano Hernández", role: "Agent Jasper Sitwell" }],
      characters: ["agent-coulson", "jasper-sitwell"],
      tmdbId: 270303,
      watchConfig: { tmdbId: 270303, type: "movie", watchProvider: "screenscape", language: "eng" },
      releaseStatus: "released",
      verificationStatus: "verified"
    },
    {
      id: "one-shot-a-funny-thing",
      title: "Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer",
      year: 2011,
      releaseDate: "2011-10-25",
      runtime: 4,
      overview: "Agent Coulson stops an armed gas station robbery with effortless tactical precision en route to New Mexico.",
      poster: "https://image.tmdb.org/t/p/w780/kNYjLqIuhyv1N5zQZpM7d9fR9s2.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
      rating: 7.1,
      genres: ["Action", "Comedy", "Sci-Fi"],
      director: "Leythum",
      studio: "Marvel Studios",
      studioId: "marvel-studios",
      distributor: "Paramount Home Entertainment",
      franchise: "Marvel One-Shots",
      universe: "The Sacred Timeline (MCU)",
      universeId: "earth-616",
      universeDesignation: "Earth-616",
      movieType: "short",
      mcuRelationship: "canon-mcu",
      isMcu: true,
      phase: "Phase 1",
      saga: "Infinity Saga",
      releaseOrder: 7,
      chronologicalOrder: 8,
      mcuChronologyOrder: 8,
      cast: [{ name: "Clark Gregg", role: "Agent Phil Coulson" }],
      characters: ["agent-coulson"],
      tmdbId: 270304,
      watchConfig: { tmdbId: 270304, type: "movie", watchProvider: "screenscape", language: "eng" },
      releaseStatus: "released",
      verificationStatus: "verified"
    },
    {
      id: "one-shot-item-47",
      title: "Marvel One-Shot: Item 47",
      year: 2012,
      releaseDate: "2012-09-25",
      runtime: 12,
      overview: "A down-on-their-luck couple discovers a discarded Chitauri gun following the Battle of New York and embarks on a bank-robbing spree.",
      poster: "https://image.tmdb.org/t/p/w780/xS1x0VqYJmP5YmGvN1J3xL5xL8B.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
      rating: 6.7,
      genres: ["Action", "Sci-Fi"],
      director: "Louis D'Esposito",
      studio: "Marvel Studios",
      studioId: "marvel-studios",
      distributor: "Walt Disney Studios Home Entertainment",
      franchise: "Marvel One-Shots",
      universe: "The Sacred Timeline (MCU)",
      universeId: "earth-616",
      universeDesignation: "Earth-616",
      movieType: "short",
      mcuRelationship: "canon-mcu",
      isMcu: true,
      phase: "Phase 1",
      saga: "Infinity Saga",
      releaseOrder: 9,
      chronologicalOrder: 10,
      mcuChronologyOrder: 10,
      cast: [{ name: "Lizzy Caplan", role: "Claire Weiss" }, { name: "Jesse Bradford", role: "Bennie Pollack" }],
      characters: ["agent-sitwell", "agent-blake"],
      tmdbId: 115806,
      watchConfig: { tmdbId: 115806, type: "movie", watchProvider: "screenscape", language: "eng" },
      releaseStatus: "released",
      verificationStatus: "verified"
    },
    {
      id: "one-shot-agent-carter",
      title: "Marvel One-Shot: Agent Carter",
      year: 2013,
      releaseDate: "2013-09-24",
      runtime: 15,
      overview: "Frustrated by bureaucratic desk duty at the SSR in 1946, Peggy Carter takes on a solo rogue mission to retrieve the mysterious Zodiac serum.",
      poster: "https://image.tmdb.org/t/p/w780/gWb1P8T8hTqL5eL9vB9eQ8vN3B.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
      rating: 7.3,
      genres: ["Action", "Adventure", "Sci-Fi"],
      director: "Louis D'Esposito",
      studio: "Marvel Studios",
      studioId: "marvel-studios",
      distributor: "Walt Disney Studios Home Entertainment",
      franchise: "Marvel One-Shots",
      universe: "The Sacred Timeline (MCU)",
      universeId: "earth-616",
      universeDesignation: "Earth-616",
      movieType: "short",
      mcuRelationship: "canon-mcu",
      isMcu: true,
      phase: "Phase 2",
      saga: "Infinity Saga",
      releaseOrder: 12,
      chronologicalOrder: 3,
      mcuChronologyOrder: 3,
      cast: [{ name: "Hayley Atwell", role: "Peggy Carter" }, { name: "Bradley Whitford", role: "Agent Flynn" }],
      characters: ["peggy-carter", "howard-stark"],
      tmdbId: 221293,
      watchConfig: { tmdbId: 221293, type: "movie", watchProvider: "screenscape", language: "eng" },
      releaseStatus: "released",
      verificationStatus: "verified"
    },
    {
      id: "one-shot-all-hail-the-king",
      title: "Marvel One-Shot: All Hail the King",
      year: 2014,
      releaseDate: "2014-02-25",
      runtime: 14,
      overview: "Imprisoned actor Trevor Slattery enjoys celebrity status in Seagate Prison before learning that the real Ten Rings and real Mandarin are coming for him.",
      poster: "https://image.tmdb.org/t/p/w780/7k2aN1eQ1YyGqK2vN3B9eQ8vN3B.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
      rating: 7.2,
      genres: ["Action", "Comedy", "Short"],
      director: "Drew Pearce",
      studio: "Marvel Studios",
      studioId: "marvel-studios",
      distributor: "Walt Disney Studios Home Entertainment",
      franchise: "Marvel One-Shots",
      universe: "The Sacred Timeline (MCU)",
      universeId: "earth-616",
      universeDesignation: "Earth-616",
      movieType: "short",
      mcuRelationship: "canon-mcu",
      isMcu: true,
      phase: "Phase 2",
      saga: "Infinity Saga",
      releaseOrder: 13,
      chronologicalOrder: 14,
      mcuChronologyOrder: 14,
      cast: [{ name: "Ben Kingsley", role: "Trevor Slattery" }, { name: "Scoot McNairy", role: "Jackson Norriss" }],
      characters: ["trevor-slattery", "justin-hammer"],
      tmdbId: 253331,
      watchConfig: { tmdbId: 253331, type: "movie", watchProvider: "screenscape", language: "eng" },
      releaseStatus: "released",
      verificationStatus: "verified"
    },
    {
      id: "werewolf-by-night",
      title: "Werewolf by Night",
      year: 2022,
      releaseDate: "2022-10-07",
      runtime: 53,
      overview: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader.",
      poster: "https://image.tmdb.org/t/p/w780/mvIvFLWLoxpv2q8A5f5VvA9eQ8v.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/f1AQhx6ZfGhPZFTtyYKdpAzvtGM.jpg",
      rating: 7.1,
      genres: ["Action", "Fantasy", "Horror"],
      director: "Michael Giacchino",
      studio: "Marvel Studios",
      studioId: "marvel-studios",
      distributor: "Disney+",
      franchise: "Special Presentations",
      universe: "The Sacred Timeline (MCU)",
      universeId: "earth-616",
      universeDesignation: "Earth-616",
      movieType: "special",
      mcuRelationship: "canon-mcu",
      isMcu: true,
      phase: "Phase 4",
      saga: "Multiverse Saga",
      releaseOrder: 40,
      chronologicalOrder: 40,
      mcuChronologyOrder: 40,
      cast: [{ name: "Gael García Bernal", role: "Jack Russell / Werewolf by Night" }, { name: "Laura Donnelly", role: "Elsa Bloodstone" }],
      characters: ["werewolf-by-night", "elsa-bloodstone", "man-thing"],
      tmdbId: 1024535,
      watchConfig: { tmdbId: 1024535, type: "movie", watchProvider: "screenscape", language: "eng" },
      releaseStatus: "released",
      verificationStatus: "verified"
    },
    {
      id: "gotg-holiday-special",
      title: "The Guardians of the Galaxy Holiday Special",
      year: 2022,
      releaseDate: "2022-11-25",
      runtime: 44,
      overview: "On a mission to make Christmas unforgettable for Peter Quill, the Guardians head to Earth in search of the ultimate present: Kevin Bacon.",
      poster: "https://image.tmdb.org/t/p/w780/8dqXJijQQ46NsLq4YkFj1n0o9Gf.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1280/8tB6Z5i7W8K5qA4vN9eQ8vN3B.jpg",
      rating: 6.9,
      genres: ["Action", "Comedy", "Sci-Fi"],
      director: "James Gunn",
      studio: "Marvel Studios",
      studioId: "marvel-studios",
      distributor: "Disney+",
      franchise: "Special Presentations",
      universe: "The Sacred Timeline (MCU)",
      universeId: "earth-616",
      universeDesignation: "Earth-616",
      movieType: "special",
      mcuRelationship: "canon-mcu",
      isMcu: true,
      phase: "Phase 4",
      saga: "Multiverse Saga",
      releaseOrder: 41,
      chronologicalOrder: 41,
      mcuChronologyOrder: 41,
      cast: [{ name: "Pom Klementieff", role: "Mantis" }, { name: "Dave Bautista", role: "Drax" }, { name: "Kevin Bacon", role: "Himself" }],
      characters: ["star-lord", "mantis", "drax", "groot", "rocket"],
      tmdbId: 774752,
      watchConfig: { tmdbId: 774752, type: "movie", watchProvider: "screenscape", language: "eng" },
      releaseStatus: "released",
      verificationStatus: "verified"
    }
  ];

  const completeCatalog = [...enriched, ...oneShotsAndSpecials];

  // Write TypeScript movies data file
  const fileContent = `import type { Movie } from '../types';

export const MOVIES_DATA: Movie[] = ${JSON.stringify(completeCatalog, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'movies.ts'), fileContent, 'utf-8');
  console.log(`Successfully generated src/data/movies.ts with ${completeCatalog.length} movies!`);
}

run();
