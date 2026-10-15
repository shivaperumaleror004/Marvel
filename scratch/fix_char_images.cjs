const fs = require('fs');
const path = require('path');

const charPath = path.join(__dirname, '..', 'src', 'data', 'characters.ts');
const raw = fs.readFileSync(charPath, 'utf8');
const chars = eval(raw.replace('import { Character } from \'../types\';', '').replace('export const CHARACTERS_DATA: Character[] =', ''));

chars.forEach(c => {
  if (c.id === 'ultron') {
    c.backdrop = 'https://image.tmdb.org/t/p/w1280/kIBK5SKwgqIIuRKhhWrJn3XkbPq.jpg';
  }
  if (c.id === 'cassandra-nova' || c.id === 'x-23') {
    c.backdrop = 'https://image.tmdb.org/t/p/w1280/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg';
  }
  if (c.id === 'yelena-belova') {
    c.portrait = 'https://image.tmdb.org/t/p/w780/1QfiLnofJFlOJOLCWaxyDpIN03v.jpg';
    c.backdrop = 'https://image.tmdb.org/t/p/w1280/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg';
  }
});

const outContent = `import { Character } from '../types';\n\nexport const CHARACTERS_DATA: Character[] = ${JSON.stringify(chars, null, 2)};\n`;
fs.writeFileSync(charPath, outContent, 'utf8');
console.log('Fixed Ultron, Cassandra Nova, X-23, and Yelena Belova images.');
