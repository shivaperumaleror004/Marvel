const fs = require('fs');
const path = require('path');

const ts = require('typescript');

function loadTs(fp) {
  const code = fs.readFileSync(fp, 'utf8');
  const res = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const m = { exports: {} };
  new Function('module', 'exports', 'require', res.outputText)(m, m.exports, require);
  return m.exports;
}

const movies = loadTs(path.join(__dirname, '..', 'src', 'data', 'movies.ts')).MOVIES_DATA;
const series = loadTs(path.join(__dirname, '..', 'src', 'data', 'series.ts')).SERIES_DATA;

async function checkMedia() {
  console.log(`Checking ${movies.length} movies...`);
  const brokenMovies = [];
  for (const m of movies) {
    if (!m.poster) {
      console.log(`⚠️ Movie without poster: [${m.id}] ${m.title}`);
      brokenMovies.push({ id: m.id, title: m.title, reason: 'missing poster' });
      continue;
    }
    try {
      const res = await fetch(m.poster, { method: 'HEAD' });
      if (res.status !== 200) {
        console.log(`❌ Movie poster HTTP ${res.status}: [${m.id}] ${m.title} -> ${m.poster}`);
        brokenMovies.push({ id: m.id, title: m.title, url: m.poster, status: res.status });
      }
    } catch (e) {
      console.log(`❌ Movie poster error: [${m.id}] ${m.title} -> ${e.message}`);
      brokenMovies.push({ id: m.id, title: m.title, error: e.message });
    }
  }

  console.log(`Checking ${series.length} series...`);
  const brokenSeries = [];
  for (const s of series) {
    if (!s.poster) {
      console.log(`⚠️ Series without poster: [${s.id}] ${s.title}`);
      brokenSeries.push({ id: s.id, title: s.title, reason: 'missing poster' });
      continue;
    }
    try {
      const res = await fetch(s.poster, { method: 'HEAD' });
      if (res.status !== 200) {
        console.log(`❌ Series poster HTTP ${res.status}: [${s.id}] ${s.title} -> ${s.poster}`);
        brokenSeries.push({ id: s.id, title: s.title, url: s.poster, status: res.status });
      }
    } catch (e) {
      console.log(`❌ Series poster error: [${s.id}] ${s.title} -> ${e.message}`);
      brokenSeries.push({ id: s.id, title: s.title, error: e.message });
    }
  }

  console.log(`\nSummary: ${brokenMovies.length} broken movie posters, ${brokenSeries.length} broken series posters.`);
}

checkMedia();
