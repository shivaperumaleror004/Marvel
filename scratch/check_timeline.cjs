const fs = require('fs');
const path = require('path');

const timelinePath = path.join(__dirname, '..', 'src', 'data', 'timeline.ts');
const raw = fs.readFileSync(timelinePath, 'utf8');

const targets = [
  'ghost-rider-2028',
  'the-punisher-one-last-kill',
  'vision-quest',
  'daredevil-born-again',
  'team-thor',
  'team-thor-part-2',
  'team-darryl',
  'deadpool-no-good-deed',
  'werewolf-by-night',
  'gotg-holiday-special',
  'blade-mcu',
  'shang-chi-2',
  'x-men-mcu',
  'black-panther-3',
  'doctor-strange-3',
  'zodiac'
];

targets.forEach(t => {
  console.log(`Timeline contains "${t}":`, raw.includes(`'${t}'`) || raw.includes(`"${t}"`));
});
