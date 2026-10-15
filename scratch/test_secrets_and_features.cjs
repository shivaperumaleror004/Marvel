const fs = require('fs');
const path = require('path');

// 1. Secret Exposure Check
const srcFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.ts') || full.endsWith('.tsx') || full.endsWith('.js') || full.endsWith('.html')) {
      srcFiles.push(full);
    }
  }
}
walk(path.join(__dirname, '..', 'src'));

let secretsFound = 0;
srcFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Check for raw 32-hex TMDB keys
  const match = content.match(/["'][a-f0-9]{32}["']/g);
  if (match) {
    console.error(`❌ Potential API key exposed in ${file}:`, match);
    secretsFound++;
  }
});

console.log(`🔒 Secret Exposure Scan: Scanned ${srcFiles.length} files. Raw secrets found: ${secretsFound}`);

// 2. LocalStorage Key Check
// Verify no rename or clear of critical storage keys in existing code
const storageFiles = srcFiles.filter(f => {
  const c = fs.readFileSync(f, 'utf8');
  return c.includes('localStorage');
});
console.log(`💾 LocalStorage usage files (${storageFiles.length}):`);
storageFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const matches = [...c.matchAll(/localStorage\.(getItem|setItem|removeItem)\(['"]([^'"]+)['"]/g)];
  matches.forEach(m => console.log(`   - ${path.basename(f)}: ${m[1]}('${m[2]}')`));
});

// 3. Verify Required Titles and Ghost Rider Specifications
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
const characters = loadTs(path.join(__dirname, '..', 'src', 'data', 'characters.ts')).CHARACTERS_DATA;

// Upcoming Ghost Rider
const gr2028 = movies.find(m => m.id === 'ghost-rider-2028');
console.log('\n🏍️ Ghost Rider (2028) Verification:');
if (gr2028) {
  console.log(`   Title: "${gr2028.title}"`);
  console.log(`   Studio: "${gr2028.studio}"`);
  console.log(`   Release Date: "${gr2028.releaseDate}" (Status: ${gr2028.status || gr2028.upcomingStatus})`);
  console.log(`   Lead Actor: ${gr2028.cast ? gr2028.cast.map(c => c.name).join(', ') : 'None'}`);
  console.log(`   Director: "${gr2028.director}"`);
  console.log(`   Poster: "${gr2028.poster}"`);
  console.log(`   TMDB ID: ${gr2028.tmdbId}`);
} else {
  console.error('   ❌ Missing Ghost Rider (2028) in movies!');
}

// Previous Ghost Rider Films Intact
const gr2007 = movies.find(m => m.id === 'ghost-rider-2007');
const gr2011 = movies.find(m => m.id === 'ghost-rider-spirit-of-vengeance');
console.log(`   Legacy GR 2007 intact: ${!!gr2007} (Released: ${gr2007?.releaseDate})`);
console.log(`   Legacy GR 2011 intact: ${!!gr2011} (Released: ${gr2011?.releaseDate})`);

// Character Ghost Rider MCU
const grChar = characters.find(c => c.id === 'ghost-rider-mcu');
console.log(`   Ghost Rider MCU character record intact: ${!!grChar} (Actor: "${grChar?.actor}", Movies: ${JSON.stringify(grChar?.movies)})`);

// The Punisher: One Last Kill
const punisherOneLastKill = movies.find(m => m.id === 'the-punisher-one-last-kill');
console.log('\n💀 The Punisher: One Last Kill Verification:');
if (punisherOneLastKill) {
  console.log(`   Title: "${punisherOneLastKill.title}"`);
  console.log(`   Release Date: "${punisherOneLastKill.releaseDate}" (isReleased: ${punisherOneLastKill.isReleased}, isUpcoming: ${punisherOneLastKill.isUpcoming})`);
  console.log(`   Media Subtype: "${punisherOneLastKill.mediaSubtype}"`);
}

// VisionQuest
const vq = series.find(s => s.id === 'vision-quest');
console.log('\n👁️ VisionQuest Verification:');
if (vq) {
  console.log(`   Title: "${vq.title}"`);
  console.log(`   Release Year: "${vq.releaseYear}" (isReleased: ${vq.isReleased}, isUpcoming: ${vq.isUpcoming})`);
  console.log(`   TMDB ID: ${vq.tmdbId}`);
}
