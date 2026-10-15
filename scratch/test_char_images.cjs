const fs = require('fs');
const path = require('path');

const charRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'characters.ts'), 'utf8');
const chars = eval(charRaw.replace('import { Character } from \'../types\';', '').replace('export const CHARACTERS_DATA: Character[] =', ''));

async function testImages() {
  console.log("Testing characters images...");
  for (const c of chars) {
    try {
      const res = await fetch(c.portrait, { method: 'HEAD' });
      if (res.status !== 200) {
        console.log(`❌ [${c.id}] ${c.alias}: Portrait HTTP ${res.status} -> ${c.portrait}`);
      }
      if (c.backdrop) {
        const bRes = await fetch(c.backdrop, { method: 'HEAD' });
        if (bRes.status !== 200) {
          console.log(`❌ [${c.id}] ${c.alias}: Backdrop HTTP ${bRes.status} -> ${c.backdrop}`);
        }
      }
    } catch (e) {
      console.log(`❌ [${c.id}] ${c.alias}: Error ${e.message}`);
    }
  }
  console.log("Image check finished.");
}

testImages();
