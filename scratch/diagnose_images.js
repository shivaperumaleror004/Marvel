const fs = require('fs');
const path = require('path');

const files = ['characters.ts', 'movies.ts', 'series.ts', 'timeline.ts', 'multiverse.ts'];

for (const file of files) {
  const filePath = path.join(__dirname, '..', 'src', 'data', file);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  const urls = content.match(/https?:\/\/[^\s'"`,)]+/g) || [];
  const counts = {};
  for (const u of urls) {
    counts[u] = (counts[u] || 0) + 1;
  }
  console.log(`\n=== FILE: ${file} (Total URLs: ${urls.length}, Unique: ${Object.keys(counts).length}) ===`);
  const dupes = Object.entries(counts).filter(([u, c]) => c > 1).sort((a,b) => b[1] - a[1]);
  for (const [u, c] of dupes.slice(0, 15)) {
    console.log(`  Count ${c}: ${u}`);
  }
}
