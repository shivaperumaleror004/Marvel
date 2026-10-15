const fs = require('fs');
const path = require('path');

const fileRaw = fs.readFileSync(path.join(__dirname, '..', 'src', 'utils', 'marvelWhitelist.ts'), 'utf8');

const bogusYears = new Set([
  1927, 1944, 1977, 1978, 1979, 1980, 1981, 1986, 1989, 1990, 1994, 1996, 1998, 2000,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2080
]);

const verifiedMovieIds = [
  // MCU Infinity Saga & Multiverse Saga
  1726, 1724, 10138, 2, 10195, 1771, 24428, 68721, 3, 76338, 100402, 118340, 99861, 102899,
  271110, 284052, 283995, 315635, 284053, 284054, 299536, 363088, 299537, 299534, 429617,
  497698, 566525, 524434, 634649, 453395, 616037, 505642, 640146, 447365, 533535, 609681,
  822119, 986056, 617126, 1003596, 1003598, 969681, 897087, 776510,
  // Required Upcoming Title - Ghost Rider (2028)
  1738010,
  // Other requested upcoming / announced / in-development
  1386618, // Black Panther 3
  // Specials and Shorts
  894205, // Werewolf by Night
  774752, // Guardians Holiday Special
  76122,  // The Consultant
  76535,  // A Funny Thing Happened on the Way to Thor's Hammer
  119569, // Item 47
  211387, // Agent Carter
  253980, // All Hail the King
  413279, // Team Thor
  441829, // Team Thor: Part 2
  505945, // Team Darryl
  558144, // Deadpool: No Good Deed
  1439930,// The Punisher: One Last Kill
  // Raimi & Webb Spider-Man
  557, 558, 559, 1930, 102382,
  // Sony Spider-Man Universe & Spider-Verse
  335983, 580489, 912649, 526896, 634492, 539972, 324857, 569094,
  // Fox X-Men, Wolverine & Deadpool
  36657, 36658, 36668, 2080, 49538, 76170, 127585, 246655, 263115, 320288, 340102, 293660, 383498, 26623,
  // Fox Fantastic Four & Daredevil
  9738, 1979, 166424, 22059, 9480, 9947,
  // Blade Trilogy & Ghost Rider (Legacy)
  36647, 36586, 36648, 1250, 71676,
  // Punisher Legacy
  8867, 7220, 13056,
  // Hulk Legacy & Older Adaptations
  1927, 26881, 26883, 19593, 10658, 18882, 13995, 106355, 197467, 197481, 225914, 225925, 225938, 438561,
  // Animated Feature Films
  14609, 14611, 13647, 14830, 14613, 394355, 30675, 63686, 230896, 257346, 284274, 422153, 538153, 574474, 588226, 627103
];

const verifiedSeriesIds = [
  // MCU Disney+
  84958,  // Loki
  85271,  // WandaVision
  88396,  // Falcon & Winter Soldier
  91363,  // What If...?
  88329,  // Hawkeye
  92749,  // Moon Knight
  92782,  // Ms. Marvel
  92783,  // She-Hulk
  114472, // Secret Invasion
  138501, // Agatha All Along
  138502, // X-Men '97
  138503, // Your Friendly Neighborhood Spider-Man
  138505, // Marvel Zombies
  202555, // Daredevil: Born Again
  213375, // VisionQuest
  198178, // Wonder Man
  241388, // Eyes of Wakanda
  114471, // Ironheart
  984511, // Nova
  337844, // Zodiac
  // Defenders Saga (Netflix)
  61889,  // Daredevil
  38472,  // Jessica Jones
  62126,  // Luke Cage
  62127,  // Iron Fist
  62285,  // The Defenders
  67178,  // The Punisher
  // ABC, Freeform, Hulu & Legacy TV
  1403,   // Agents of S.H.I.E.L.D.
  61550,  // Agent Carter
  68788,  // Inhumans
  67466,  // Runaways
  66190,  // Cloak & Dagger
  67195,  // Legion
  69693,  // The Gifted
  87739,  // Helstrom
  111803, // M.O.D.O.K.
  111804, // Hit-Monkey
  // Classic Marvel Animation
  1839, 2145, 2300, 3760, 3761, 3762, 668, 1618, 4425, 3854, 6549, 23512, 7330, 33623, 60804, 64196, 88987, 111312, 133903
];

const newContent = `// Comprehensive Whitelist of TMDB IDs for all verified Marvel feature films
export const MARVEL_MOVIE_TMDB_IDS = new Set<number>([
${verifiedMovieIds.sort((a,b)=>a-b).map(id => `  ${id},`).join('\n')}
]);

// Whitelist of TMDB IDs for Marvel television series, specials, and animation
export const MARVEL_SERIES_TMDB_IDS = new Set<number>([
${verifiedSeriesIds.sort((a,b)=>a-b).map(id => `  ${id},`).join('\n')}
]);

export const MARVEL_LOCAL_IDS = new Set<string>([
  'iron-man',
  'the-incredible-hulk',
  'iron-man-2',
  'thor',
  'captain-america-first-avenger',
  'the-avengers',
  'iron-man-3',
  'thor-the-dark-world',
  'captain-america-winter-soldier',
  'guardians-of-the-galaxy',
  'avengers-age-of-ultron',
  'ant-man',
  'captain-america-civil-war',
  'doctor-strange',
  'guardians-of-the-galaxy-vol-2',
  'spider-man-homecoming',
  'thor-ragnarok',
  'black-panther',
  'avengers-infinity-war',
  'ant-man-and-the-wasp',
  'captain-marvel',
  'avengers-endgame',
  'spider-man-far-from-home',
  'black-widow',
  'shang-chi-and-the-legend-of-the-ten-rings',
  'eternals',
  'spider-man-no-way-home',
  'doctor-strange-multiverse-of-madness',
  'thor-love-and-thunder',
  'black-panther-wakanda-forever',
  'ant-man-and-the-wasp-quantumania',
  'guardians-of-the-galaxy-vol-3',
  'the-marvels',
  'deadpool-and-wolverine',
  'captain-america-brave-new-world',
  'thunderbolts',
  'fantastic-four-first-steps',
  'spider-man-brand-new-day',
  'avengers-doomsday',
  'avengers-secret-wars',
  'blade-mcu',
  'armor-wars',
  'shang-chi-2',
  'x-men-mcu',
  'doctor-strange-3',
  'black-panther-3',
  'ghost-rider-2028',
  'ghost-rider',
  'ghost-rider-spirit-of-vengeance',
  'venom',
  'venom-let-there-be-carnage',
  'venom-the-last-dance',
  'morbius',
  'madame-web',
  'kraven-the-hunter',
  'loki',
  'wandavision',
  'the-falcon-and-the-winter-soldier',
  'what-if',
  'hawkeye',
  'moon-knight',
  'ms-marvel',
  'she-hulk',
  'secret-invasion',
  'echo',
  'agatha-all-along',
  'daredevil-born-again',
  'vision-quest',
  'ironheart',
  'eyes-of-wakanda',
  'marvel-zombies',
  'wonder-man',
  'nova-mcu',
  'zodiac',
  'the-punisher-one-last-kill',
  'team-thor',
  'team-thor-part-2',
  'team-darryl',
  'deadpool-no-good-deed',
  'werewolf-by-night',
  'gotg-holiday-special',
  'one-shot-the-consultant',
  'one-shot-a-funny-thing',
  'one-shot-item-47',
  'one-shot-agent-carter',
  'one-shot-all-hail-the-king'
]);

export const MARVEL_KEYWORD_WHITELIST = [
  'marvel',
  'avengers',
  'iron man',
  'captain america',
  'thor',
  'hulk',
  'black widow',
  'hawkeye',
  'spiderman',
  'spider-man',
  'spider-verse',
  'loki',
  'wandavision',
  'doctor strange',
  'guardians of the galaxy',
  'black panther',
  'ant-man',
  'deadpool',
  'wolverine',
  'x-men',
  'fantastic four',
  'daredevil',
  'punisher',
  'blade',
  'ghost rider',
  'venom',
  'morbius',
  'madame web',
  'kraven',
  'she-hulk',
  'ms. marvel',
  'moon knight',
  'secret invasion',
  'echo',
  'agatha',
  'ironheart',
  'wonder man',
  'visionquest',
  'zodiac',
  'thunderbolts',
  'shang-chi'
];

/**
 * Checks if a title or entity is explicitly part of the Marvel whitelist.
 */
export function isMarvelContent(item: {
  id?: string;
  tmdbId?: number;
  title?: string;
  name?: string;
  director?: string;
  creator?: string;
  studio?: string;
  studioId?: string;
  universeId?: string;
  isMcu?: boolean;
  isLegacy?: boolean;
  isAnimation?: boolean;
}): boolean {
  if (!item) return false;

  // 1. Direct dataset flags
  if (item.studioId || item.universeId || item.isMcu !== undefined || item.isLegacy !== undefined || item.isAnimation !== undefined) {
    return true;
  }

  // 2. Check local dataset ID
  if (item.id && (MARVEL_LOCAL_IDS.has(item.id) || item.id.startsWith('iron-man') || item.id.startsWith('loki') || item.id.startsWith('avengers') || item.id.startsWith('spider-man') || item.id.startsWith('x-men') || item.id.startsWith('ghost-rider'))) {
    return true;
  }

  // 3. Check TMDB ID
  if (item.tmdbId) {
    if (MARVEL_MOVIE_TMDB_IDS.has(item.tmdbId) || MARVEL_SERIES_TMDB_IDS.has(item.tmdbId)) {
      return true;
    }
  }

  // 4. Check Studio metadata
  if (item.director === 'Marvel Studios' || item.creator === 'Marvel Studios' || item.studio?.includes('Marvel')) {
    return true;
  }

  // 5. Fallback: Title text matching against known Marvel keywords
  const titleText = (item.title || item.name || '').toLowerCase();
  if (!titleText) return false;

  return MARVEL_KEYWORD_WHITELIST.some(kw => titleText.includes(kw));
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'utils', 'marvelWhitelist.ts'), newContent, 'utf8');
console.log('marvelWhitelist.ts updated successfully.');
