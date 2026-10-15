const fs = require('fs');

// We can compile or transpile ts files, or use ts-node / jiti / or parse them via typescript compiler API or regex / eval in clean context.
// Let's use typescript compiler API which is in node_modules!
const ts = require('typescript');

function loadTsModule(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', res.outputText);
  fn(m, m.exports, require);
  return m.exports;
}

const { MOVIES_DATA: movies } = loadTsModule('src/data/movies.ts');
const { SERIES_DATA: series } = loadTsModule('src/data/series.ts');
const { CHARACTERS_DATA: characters } = loadTsModule('src/data/characters.ts');
const { MCU_TIMELINE_ENTRIES: timelineEvents } = loadTsModule('src/data/timeline.ts');

console.log(`Loaded ${movies.length} movies, ${series.length} series, ${characters.length} characters, ${timelineEvents.length} timeline events.`);

let errors = [];
let warnings = [];

// 1. Check duplicate IDs
const movieIds = new Set();
movies.forEach(m => {
  if (movieIds.has(m.id)) errors.push(`Duplicate movie ID: ${m.id}`);
  movieIds.add(m.id);
});

const seriesIds = new Set();
series.forEach(s => {
  if (seriesIds.has(s.id)) errors.push(`Duplicate series ID: ${s.id}`);
  seriesIds.add(s.id);
});

const charIds = new Set();
characters.forEach(c => {
  if (charIds.has(c.id)) errors.push(`Duplicate character ID: ${c.id}`);
  charIds.add(c.id);
});

// 2. Check TMDB IDs
const movieTmdb = new Map();
movies.forEach(m => {
  if (m.tmdbId) {
    if (movieTmdb.has(m.tmdbId)) {
      warnings.push(`Shared movie TMDB ID ${m.tmdbId}: ${movieTmdb.get(m.tmdbId)} and ${m.id}`);
    }
    movieTmdb.set(m.tmdbId, m.id);
  }
});

// 3. Check Images
movies.forEach(m => {
  if (!m.poster) errors.push(`Movie ${m.id} missing poster`);
  if (!m.backdrop) warnings.push(`Movie ${m.id} missing backdrop`);
});
series.forEach(s => {
  if (!s.poster) errors.push(`Series ${s.id} missing poster`);
  if (!s.backdrop) warnings.push(`Series ${s.id} missing backdrop`);
});
characters.forEach(c => {
  if (!c.portrait) errors.push(`Character ${c.id} missing portrait`);
});

// 4. Character links
characters.forEach(c => {
  if (c.movies) {
    c.movies.forEach(mid => {
      if (!movieIds.has(mid)) {
        warnings.push(`Character ${c.id} references non-existent movie ID: ${mid}`);
      }
    });
  }
  if (c.series) {
    c.series.forEach(sid => {
      if (!seriesIds.has(sid)) {
        warnings.push(`Character ${c.id} references non-existent series ID: ${sid}`);
      }
    });
  }
});

// 5. Specific required titles check
const ghostRider2028 = movies.find(m => m.id === 'ghost-rider-2028');
if (!ghostRider2028) {
  errors.push('Missing upcoming Ghost Rider 2028 in movies');
} else {
  console.log('Found Ghost Rider 2028:', ghostRider2028.title, ghostRider2028.releaseDate, ghostRider2028.status);
}

const punisherOneLastKill = movies.find(m => m.id === 'the-punisher-one-last-kill');
if (!punisherOneLastKill) {
  errors.push('Missing The Punisher: One Last Kill in movies');
} else {
  console.log('Found The Punisher: One Last Kill:', punisherOneLastKill.title, punisherOneLastKill.releaseDate, punisherOneLastKill.status);
}

const visionQuest = series.find(s => s.id === 'vision-quest');
if (!visionQuest) {
  errors.push('Missing VisionQuest in series');
} else {
  console.log('Found VisionQuest:', visionQuest.title, visionQuest.releaseDate, visionQuest.status);
}

// 6. Check release dates against 2026-10-16 for status correctness
const REF_DATE = '2026-10-16';
movies.forEach(m => {
  if (m.releaseDate && m.releaseDate <= REF_DATE && m.status === 'upcoming') {
    warnings.push(`Movie ${m.id} has releaseDate ${m.releaseDate} <= ${REF_DATE} but status is 'upcoming'`);
  }
});
series.forEach(s => {
  if (s.releaseDate && s.releaseDate <= REF_DATE && s.status === 'upcoming') {
    warnings.push(`Series ${s.id} has releaseDate ${s.releaseDate} <= ${REF_DATE} but status is 'upcoming'`);
  }
});

console.log('\n--- AUDIT SUMMARY ---');
console.log(`Total Errors: ${errors.length}`);
errors.forEach(e => console.log('ERROR:', e));
console.log(`Total Warnings: ${warnings.length}`);
warnings.forEach(w => console.log('WARNING:', w));
