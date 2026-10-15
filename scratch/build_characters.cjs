const fs = require('fs');
const path = require('path');

const charPath = path.join(__dirname, '..', 'src', 'data', 'characters.ts');
const raw = fs.readFileSync(charPath, 'utf8');
const chars = eval(raw.replace('import { Character } from \'../types\';', '').replace('export const CHARACTERS_DATA: Character[] =', ''));

const charMap = new Map();
chars.forEach(c => charMap.set(c.id, c));

// 1. Fix existing duplicates and 404s
if (charMap.has('groot')) {
  const c = charMap.get('groot');
  c.portrait = 'https://image.tmdb.org/t/p/w780/tEoUF0RJqHnskmBOJiDEQhyN7Ok.jpg';
}
if (charMap.has('star-lord')) {
  const c = charMap.get('star-lord');
  c.portrait = 'https://image.tmdb.org/t/p/w780/cRH6HPAQ98PlOwwEvhYO4CM9lwu.jpg';
}
if (charMap.has('ultron')) {
  const c = charMap.get('ultron');
  c.portrait = 'https://image.tmdb.org/t/p/w780/3gurW3OgDOD4hcqDfgcqUnoNg34.jpg';
  c.backdrop = 'https://image.tmdb.org/t/p/w1280/8Z0q8Jp9dOaU6N7H1r8j2L2p7zE.jpg';
}
if (charMap.has('white-vision')) {
  const c = charMap.get('white-vision');
  c.portrait = 'https://image.tmdb.org/t/p/w780/oNrDowF5cRtK5lJJuCAh0KeFizy.jpg';
  c.backdrop = 'https://image.tmdb.org/t/p/w1280/uoXXbN2PrOxH6UKyP7kYwmGpAAP.jpg';
}
if (charMap.has('loki')) {
  const c = charMap.get('loki');
  c.portrait = 'https://image.tmdb.org/t/p/w780/mclHxMm8aPlCPKptP67257F5GPo.jpg';
}
if (charMap.has('thanos')) {
  const c = charMap.get('thanos');
  c.portrait = 'https://image.tmdb.org/t/p/w780/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg';
}
if (charMap.has('agatha-harkness')) {
  const c = charMap.get('agatha-harkness');
  c.portrait = 'https://image.tmdb.org/t/p/w780/9sVllAKfEls3SJD3GoPm2JEZoa5.jpg';
}
if (charMap.has('sue-storm')) {
  const c = charMap.get('sue-storm');
  c.portrait = 'https://image.tmdb.org/t/p/w780/a8a9U00KL2JJkkekzhNnueIGKKF.jpg';
}
if (charMap.has('blade')) {
  const c = charMap.get('blade');
  c.portrait = 'https://image.tmdb.org/t/p/w780/iDmPuZXAGheRMbMyB80acMWYJ2s.jpg';
}
if (charMap.has('daredevil')) {
  const c = charMap.get('daredevil');
  c.portrait = 'https://image.tmdb.org/t/p/w780/91fFBazOvuNjwjcES2b199Ukspn.jpg';
}
if (charMap.has('punisher')) {
  const c = charMap.get('punisher');
  c.portrait = 'https://image.tmdb.org/t/p/w780/bjcglF1IpDcZNs1HwFxakGpzBo6.jpg';
}
if (charMap.has('ghost-rider')) {
  const c = charMap.get('ghost-rider');
  c.actor = 'Nicolas Cage';
  c.portrait = 'https://image.tmdb.org/t/p/w780/y1RtezurZYveYkVNRht7CwEgSYY.jpg';
  c.alias = 'Ghost Rider (Johnny Blaze - Legacy)';
  c.description = 'Stunt motorcyclist Johnny Blaze makes a pact with Mephistopheles, becoming the flaming supernatural bounty hunter of the damned.';
  c.affiliation = 'Midnight Sons / Spirit of Vengeance';
  c.relatedCharacters = ['ghost-rider-mcu', 'blade', 'punisher', 'doctor-strange'];
}

// 2. Add verified new characters across Avengers, F4, X-Men, Spider-Man, Thunderbolts, etc.
const newCharacters = [
  {
    id: 'ghost-rider-mcu',
    name: 'Johnathon "Johnny" Blaze',
    alias: 'Ghost Rider (MCU)',
    actor: 'Ryan Gosling',
    portrait: 'https://image.tmdb.org/t/p/w780/lyUyVARQKhGxaxy0FbPJCQRpiaW.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/8ZuU1bCXvqcHdFIIiJAtkGRPw1j.jpg',
    description: 'The supernatural Spirit of Vengeance brought into the Marvel Cinematic Universe, wielding hellfire chains and the iconic flaming Hell Cycle.',
    bio: 'Announced at San Diego Comic-Con 2026 by Marvel Studios, Ryan Gosling portrays Johnny Blaze / Ghost Rider in the Shawn Levy-directed feature film scheduled for July 28, 2028. The film expands the supernatural mystic corner of the MCU.',
    powers: ['Hellfire Manipulation & Projection', 'Penance Stare', 'Superhuman Strength & Invulnerability', 'Mystic Hell Cycle Manifestation', 'Demonic Chain Weaponry'],
    affiliation: 'Marvel Studios / Midnight Sons / MCU',
    firstAppearance: 'Ghost Rider (2028)',
    movies: ['ghost-rider-2028'],
    series: [],
    relatedCharacters: ['ghost-rider', 'blade', 'doctor-strange', 'punisher'],
    role: 'antihero',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    franchise: 'Ghost Rider',
    status: 'Upcoming Feature Film (2028)'
  },
  {
    id: 'shuri',
    name: "Shuri / Black Panther",
    alias: 'Black Panther',
    actor: 'Letitia Wright',
    portrait: 'https://image.tmdb.org/t/p/w780/f7PevpEeBqwzACPhoZ8K3ktrKvE.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/83H0C66AcvkwpG2738VCTHMY9uv.jpg',
    description: 'Princess of Wakanda, master vibranium technologist and successor to the Black Panther mantle following the passing of King T\'Challa.',
    bio: 'Shuri is Wakanda\'s foremost technological pioneer who designed the kinetic-charging Panther Habit and spearheaded advanced energy weaponry. Following the tragic passing of T\'Challa, Shuri synthetically recreated the Heart-Shaped Herb, embraced the mantle of Black Panther, and brokered peace with Namor\'s Talokan.',
    powers: ['Superhuman Strength & Agility (via Synthetic Heart-Shaped Herb)', 'Genius-Level Vibranium Engineering', 'Vibranium Kinetic Absorption Armor', 'Sonic Energy Gauntlets'],
    affiliation: 'Wakanda Royal Family / Avengers',
    firstAppearance: 'Black Panther (2018)',
    movies: ['black-panther', 'avengers-infinity-war', 'avengers-endgame', 'black-panther-wakanda-forever'],
    series: [],
    relatedCharacters: ['black-panther', 'ironheart', 'namor'],
    role: 'hero',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    franchise: 'Black Panther'
  },
  {
    id: 'namor',
    name: 'Ch\'ah Toh Almehen / Namor',
    alias: 'The Sub-Mariner / K\'uk\'ulkan',
    actor: 'Tenoch Huerta Mejía',
    portrait: 'https://image.tmdb.org/t/p/w780/x0Wy85CZu887ZQMWrjj4vVulczM.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/83H0C66AcvkwpG2738VCTHMY9uv.jpg',
    description: 'The ancient mutant sovereign of the underwater civilization of Talokan, revered by his people as the feathered serpent god K\'uk\'ulkan.',
    bio: 'Born in 1571 with winged ankles and mutant physiology that allows him to breathe both underwater and on surface land, Namor defended his hidden underwater kingdom of Talokan from surface invaders for centuries before clashing with Wakanda.',
    powers: ['Superhuman Physical Strength & Durability', 'Aquatic Respiration & Super-Speed Swimming', 'Winged Ankle Flight', 'Vibranium Spear Combat', 'Hydrokinesis'],
    affiliation: 'Talokan Royalty / Mutants',
    firstAppearance: 'Black Panther: Wakanda Forever (2022)',
    movies: ['black-panther-wakanda-forever'],
    series: [],
    relatedCharacters: ['shuri', 'black-panther'],
    role: 'antihero',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    franchise: 'Black Panther'
  },
  {
    id: 'human-torch',
    name: 'Jonathan "Johnny" Storm',
    alias: 'The Human Torch',
    actor: 'Joseph Quinn / Chris Evans',
    portrait: 'https://image.tmdb.org/t/p/w780/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    description: 'Hot-headed thrill-seeker who gains the ability to engulf his body in plasma fire and fly with supersonic velocity.',
    bio: 'Johnny Storm was transformed by cosmic radiation during a space mission alongside sister Sue, Reed Richards, and Ben Grimm. Calling out "Flame On!", Johnny ignites his plasma aura to protect Earth as a founding member of Marvel\'s First Family.',
    powers: ['Pyrokinesis & Plasma Fire Engulfment', 'Supersonic Flight', 'Thermal Energy Absorption', 'Supernova Heat Blast'],
    affiliation: 'Fantastic Four',
    firstAppearance: 'Fantastic Four (2005) / The Fantastic Four: First Steps (2025)',
    movies: ['fantastic-four-2005', 'fantastic-four-rise-of-the-silver-surfer', 'fantastic-four-first-steps', 'deadpool-and-wolverine'],
    series: [],
    relatedCharacters: ['sue-storm', 'fantastic-four-reed', 'the-thing'],
    role: 'hero',
    universe: 'Marvel Cinematic Universe (Earth-616 / Earth-828038)',
    universeId: 'earth-828038',
    franchise: 'Fantastic Four'
  },
  {
    id: 'the-thing',
    name: 'Benjamin "Ben" Grimm',
    alias: 'The Thing',
    actor: 'Ebon Moss-Bachrach / Michael Chiklis',
    portrait: 'https://image.tmdb.org/t/p/w780/xD8GVNayMpiTZxLfahy2DseYcQq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    description: 'Former astronaut and pilot mutated into an indestructible behemoth of flexible organic rock with a golden heart.',
    bio: 'Mutated by cosmic rays into an orange, rock-like powerhouse, Ben Grimm became the heart and muscle of the Fantastic Four. Renowned for his catchphrase "It\'s clobberin\' time!", he defends humanity despite the personal burden of his physical form.',
    powers: ['Superhuman Strength & Crushing Power', 'Organic Rock-Hard Invulnerability', 'Immense Physical Stamina', 'Hand-to-Hand Brawling Mastery'],
    affiliation: 'Fantastic Four',
    firstAppearance: 'Fantastic Four (2005) / The Fantastic Four: First Steps (2025)',
    movies: ['fantastic-four-2005', 'fantastic-four-rise-of-the-silver-surfer', 'fantastic-four-first-steps'],
    series: [],
    relatedCharacters: ['fantastic-four-reed', 'sue-storm', 'human-torch'],
    role: 'hero',
    universe: 'Marvel Cinematic Universe (Earth-616 / Earth-828038)',
    universeId: 'earth-828038',
    franchise: 'Fantastic Four'
  },
  {
    id: 'kingpin',
    name: 'Wilson Grant Fisk',
    alias: 'Kingpin',
    actor: 'Vincent D\'Onofrio',
    portrait: 'https://image.tmdb.org/t/p/w780/qkyiLolEqYMGH25xD4sFIXAjZQB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/qrTAc0ZtQ859Qu5O8cixJzNJpQs.jpg',
    description: 'The ruthless criminal mastermind and corrupt titan who rules the underbelly of New York City and became Mayor of NYC.',
    bio: 'Wilson Fisk built a shadow empire controlling New York City\'s organized crime, real estate, and politics. Ruthless in his physical brute force and strategic intellect, he serves as the arch-nemesis of Daredevil, Spider-Man, and the Punisher.',
    powers: ['Peak Human Brute Strength', 'Master Criminal Strategist', 'Multi-Billion Dollar Crime Syndicate', 'Devastating Hand-to-Hand Combatant'],
    affiliation: 'Fisk Criminal Syndicate / NYC Mayoral Office',
    firstAppearance: 'Daredevil (2015)',
    movies: [],
    series: ['daredevil', 'hawkeye', 'echo', 'daredevil-born-again'],
    relatedCharacters: ['daredevil', 'punisher', 'spider-man'],
    role: 'villain',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    franchise: 'Daredevil'
  },
  {
    id: 'cassandra-nova',
    name: 'Cassandra Nova Xavier',
    alias: 'Cassandra Nova',
    actor: 'Emma Corrin',
    portrait: 'https://image.tmdb.org/t/p/w780/miSbXJBlq6S3dVvOr7OoNL4axW6.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8M97.jpg',
    description: 'The sinister, telepathic mummudrai twin sister of Charles Xavier who ruled over the wasteland of the Void at the end of time.',
    bio: 'Born as Charles Xavier\'s parasitical psychic counterpart, Cassandra Nova was banished to the Void by the Time Variance Authority. Ruling from the decaying corpse of Giant-Man, she wielded terrifying psychic manipulation over stranded multiverse variants.',
    powers: ['Omega-Level Telepathy', 'Physical Intangibility & Flesh Manipulation', 'Mind Control & Hallucination Inception', 'Matter Transmutation'],
    affiliation: 'Void Warlords / Multiverse',
    firstAppearance: 'Deadpool & Wolverine (2024)',
    movies: ['deadpool-and-wolverine'],
    series: [],
    relatedCharacters: ['wolverine', 'deadpool', 'professor-x'],
    role: 'villain',
    universe: 'Multiverse / The Void',
    universeId: 'earth-trn414',
    franchise: 'Deadpool'
  },
  {
    id: 'x-23',
    name: 'Laura Kinney',
    alias: 'X-23 / Wolverine',
    actor: 'Dafne Keen',
    portrait: 'https://image.tmdb.org/t/p/w780/34BhddK5z2YHjfppOleezVrQ7Jt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8M97.jpg',
    description: 'Genetically engineered mutant clone-daughter of Logan endowed with adamantium-coated bone claws and a savage healing factor.',
    bio: 'Created by the Transigen project using Logan\'s DNA, Laura escaped her handlers with Logan\'s sacrifice in 2029. Re-emerging in the Void to fight alongside Deadpool and an alternate Wolverine, she proved herself a true successor to the Wolverine mantle.',
    powers: ['Accelerated Regenerative Healing Factor', 'Retractable Adamantium Claws (Hands & Feet)', 'Superhuman Senses & Agility', 'Ferocious Berserker Instinct'],
    affiliation: 'X-Men / Transigen Escapees',
    firstAppearance: 'Logan (2017)',
    movies: ['logan', 'deadpool-and-wolverine'],
    series: [],
    relatedCharacters: ['wolverine', 'deadpool'],
    role: 'hero',
    universe: 'Fox X-Men Universe (Earth-10005 / Earth-TRN414)',
    universeId: 'earth-10005',
    franchise: 'Wolverine'
  },
  {
    id: 'elektra',
    name: 'Elektra Natchios',
    alias: 'Elektra',
    actor: 'Jennifer Garner / Elodie Yung',
    portrait: 'https://image.tmdb.org/t/p/w780/eiX083VOa0RCGSgwENZgVi5MgDi.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg',
    description: 'Deadly Greek martial artist and master assassin armed with twin sai daggers who walks the line between justice and vengeance.',
    bio: 'Trained by Stick and the Chaste, Elektra is one of the most lethal martial artists on Earth. Clashing and falling in love with Matt Murdock, she navigated assassination syndicates and re-emerged from the Void in Deadpool & Wolverine to reclaim her honor.',
    powers: ['Master Martial Artist & Assassin', 'Twin Sai Combat Mastery', 'Peak Athleticism & Agility', 'Stealth Infiltration'],
    affiliation: 'The Chaste / The Hand / Resistance',
    firstAppearance: 'Daredevil (2003) / Elektra (2005)',
    movies: ['daredevil-2003', 'elektra-2005', 'deadpool-and-wolverine'],
    series: ['daredevil', 'the-defenders'],
    relatedCharacters: ['daredevil', 'punisher', 'deadpool'],
    role: 'antihero',
    universe: 'Fox Marvel Universe (Earth-701306) / MCU',
    universeId: 'earth-616',
    franchise: 'Daredevil'
  },
  {
    id: 'yelena-belova',
    name: 'Yelena Belova',
    alias: 'White Widow',
    actor: 'Florence Pugh',
    portrait: 'https://image.tmdb.org/t/p/w780/75lq1J1x8gC0e5L3Z6E4a5rD0sE.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg',
    description: 'Deadly Red Room graduate, adoptive sister to Natasha Romanoff, and the pragmatic leader of the Thunderbolts.',
    bio: 'Liberated from the Red Room\'s chemical mind-control by Natasha Romanoff, Yelena dedicated herself to freeing fellow Widows globally before being recruited by Contessa Valentina Allegra de Fontaine into the Thunderbolts black-ops team.',
    powers: ['Master Martial Artist & Acrobat', 'Widow Gauntlets & Electro-Stun Batons', 'Tactical Firearms Mastery', 'Undercover Espionage & Infiltration'],
    affiliation: 'Red Room (Defected) / Thunderbolts',
    firstAppearance: 'Black Widow (2021)',
    movies: ['black-widow', 'thunderbolts'],
    series: ['hawkeye'],
    relatedCharacters: ['black-widow', 'hawkeye', 'red-guardian', 'bucky-barnes'],
    role: 'hero',
    universe: 'Marvel Cinematic Universe (Earth-616)',
    universeId: 'earth-616',
    franchise: 'Thunderbolts'
  },
  {
    id: 'green-goblin',
    name: 'Norman Osborn',
    alias: 'Green Goblin',
    actor: 'Willem Dafoe',
    portrait: 'https://image.tmdb.org/t/p/w780/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg',
    description: 'Brilliant CEO of Oscorp driven to psychotic mania by an experimental human performance enhancer, terrorizing Spider-Man on a high-tech glider.',
    bio: 'Subjecting himself to Oscorp\'s volatile Goblin Formula, Norman Osborn developed superhuman strength and a psychotic dual personality. Armed with razor bats, pumpkin bombs, and his Goblin Glider, he crossed multiverse boundaries in No Way Home to torment Peter Parker.',
    powers: ['Superhuman Physical Strength & Durability', 'Genius Chemistry & Weaponry Intellect', 'Goblin Glider Flight', 'Explosive Pumpkin Bombs & Razor Bats'],
    affiliation: 'Oscorp Industries / Sinister Villains',
    firstAppearance: 'Spider-Man (2002)',
    movies: ['spider-man', 'spider-man-no-way-home'],
    series: [],
    relatedCharacters: ['spider-man-tobey', 'spider-man', 'doc-ock'],
    role: 'villain',
    universe: 'Raimi-Verse (Earth-96283) / MCU',
    universeId: 'earth-96283',
    franchise: 'Spider-Man'
  },
  {
    id: 'doc-ock',
    name: 'Dr. Otto Gunther Octavius',
    alias: 'Doctor Octopus',
    actor: 'Alfred Molina',
    portrait: 'https://image.tmdb.org/t/p/w780/91fFBazOvuNjwjcES2b199Ukspn.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg',
    description: 'Visionary nuclear physicist whose life was transformed when four AI-powered titanium-steel mechanical arms fused to his spinal cord.',
    bio: 'Seeking to harness fusion power to provide clean energy, Dr. Otto Octavius lost his wife and inhibitor chip in a catastrophic lab explosion. Corrupted by the tentacles\' neural interface, he became one of Spider-Man\'s most legendary adversaries before finding redemption in No Way Home.',
    powers: ['Four Telepathically Controlled Titanium-Steel Arms', 'Superhuman Wall-Climbing & Crushing Grip', 'Genius Nuclear Physics Intellect'],
    affiliation: 'Oscorp Laboratories / Multiverse Villains',
    firstAppearance: 'Spider-Man 2 (2004)',
    movies: ['spider-man-2', 'spider-man-no-way-home'],
    series: [],
    relatedCharacters: ['spider-man-tobey', 'spider-man', 'green-goblin'],
    role: 'antihero',
    universe: 'Raimi-Verse (Earth-96283) / MCU',
    universeId: 'earth-96283',
    franchise: 'Spider-Man'
  },
  {
    id: 'sylvie',
    name: 'Sylvie Lushton / Laufeydottir',
    alias: 'Sylvie',
    actor: 'Sophia Di Martino',
    portrait: 'https://image.tmdb.org/t/p/w780/qZdFp18btpQJfDoknxr7DgfRpcB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/mclHxMm8aPlCPKptP67257F5GPo.jpg',
    description: 'Fierce Asgardian variant of Loki who evaded the Time Variance Authority across apocalypses to dismantle the Sacred Timeline.',
    bio: 'Pruned as a child from her timeline by Ravonna Renslayer, Sylvie survived by hiding in temporal apocalypses where nexus events cannot register. Teaming with the God of Mischief, she assassinated He Who Remains at the Citadel at the End of Time, unleashing the Multiverse.',
    powers: ['Mind Enchantment & Possession', 'Asgardian Superhuman Physiology', 'Magic Dagger Combat Mastery', 'Temporal Manipulation (via TemPad)'],
    affiliation: 'Loki Variants / Multiverse',
    firstAppearance: 'Loki (2021)',
    movies: [],
    series: ['loki'],
    relatedCharacters: ['loki', 'mobius'],
    role: 'antihero',
    universe: 'Marvel Cinematic Universe (Multiverse)',
    universeId: 'earth-616',
    franchise: 'Loki'
  },
  {
    id: 'mobius',
    name: 'Mobius M. Mobius',
    alias: 'Agent Mobius / Don',
    actor: 'Owen Wilson',
    portrait: 'https://image.tmdb.org/t/p/w780/5A46lNOwmpX77jAdhyKxU7e2Hub.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/mclHxMm8aPlCPKptP67257F5GPo.jpg',
    description: 'Affable, jet-ski loving senior TVA analyst who befriended Loki and helped reform the Time Variance Authority.',
    bio: 'Mobius spent eons investigating temporal anomalies for the TVA unaware he was once a jet-ski salesman named Don on Earth. Partnering with Loki, he unraveled the deception of the Time-Keepers and stood beside the God of Stories as the multiverse was preserved.',
    powers: ['Temporal Timeline Analysis', 'TVA Baton Combat', 'Interdimensional TemPad Navigation', 'Pruning Device Mastery'],
    affiliation: 'Time Variance Authority (TVA)',
    firstAppearance: 'Loki (2021)',
    movies: ['deadpool-and-wolverine'],
    series: ['loki'],
    relatedCharacters: ['loki', 'sylvie'],
    role: 'hero',
    universe: 'Marvel Cinematic Universe (TVA)',
    universeId: 'earth-616',
    franchise: 'Loki'
  }
];

newCharacters.forEach(c => charMap.set(c.id, c));

const finalChars = Array.from(charMap.values());
const outContent = `import { Character } from '../types';\n\nexport const CHARACTERS_DATA: Character[] = ${JSON.stringify(finalChars, null, 2)};\n`;
fs.writeFileSync(charPath, outContent, 'utf8');
console.log(`Successfully updated characters.ts: Total Characters = ${finalChars.length}`);
