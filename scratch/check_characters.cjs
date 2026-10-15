const fs = require('fs');
const path = require('path');

const charRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'characters.ts'), 'utf8');
const chars = eval(charRaw.replace('import { Character } from \'../types\';', '').replace('export const CHARACTERS_DATA: Character[] =', ''));

console.log(`Total Characters: ${chars.length}`);
chars.forEach(c => {
  console.log(`[${c.id}] ${c.alias} (${c.name}) - Actor: ${c.actor} | Portrait: ${c.portrait}`);
});
