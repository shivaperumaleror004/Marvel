// Comprehensive Whitelist of TMDB IDs for all verified Marvel-based feature movies
export const MARVEL_MOVIE_TMDB_IDS = new Set<number>([
  // MCU Marvel Studios Movies
  1726,   // Iron Man
  1724,   // The Incredible Hulk
  10138,  // Iron Man 2
  10195,  // Thor
  1771,   // Captain America: The First Avenger
  24428,  // The Avengers
  68721,  // Iron Man 3
  76338,  // Thor: The Dark World
  100402, // Captain America: The Winter Soldier
  118340, // Guardians of the Galaxy
  99861,  // Avengers: Age of Ultron
  102899, // Ant-Man
  271110, // Captain America: Civil War
  284052, // Doctor Strange
  283995, // Guardians of the Galaxy Vol. 2
  315635, // Spider-Man: Homecoming
  284053, // Thor: Ragnarok
  284054, // Black Panther
  299536, // Avengers: Infinity War
  363088, // Ant-Man and the Wasp
  299537, // Captain Marvel
  299534, // Avengers: Endgame
  429617, // Spider-Man: Far From Home
  497698, // Black Widow
  566525, // Shang-Chi and the Legend of the Ten Rings
  524434, // Eternals
  634649, // Spider-Man: No Way Home
  453395, // Doctor Strange in the Multiverse of Madness
  616037, // Thor: Love and Thunder
  505642, // Black Panther: Wakanda Forever
  640146, // Ant-Man and the Wasp: Quantumania
  447365, // Guardians of the Galaxy Vol. 3
  533535, // Deadpool & Wolverine
  609681, // The Marvels
  822119, // Captain America: Brave New World
  986056, // Thunderbolts*
  617126, // The Fantastic Four: First Steps
  1003596, // Avengers: Doomsday
  1003598, // Avengers: Secret Wars
  969681,  // Spider-Man: Brand New Day

  // Marvel Specials & One-Shots (categorized as Movie in TMDB)
  894205, // Werewolf by Night
  774752, // The Guardians of the Galaxy Holiday Special
  76122,  // Marvel One-Shot: The Consultant
  76535,  // Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer
  119569, // Marvel One-Shot: Item 47
  211387, // Marvel One-Shot: Agent Carter
  253980, // Marvel One-Shot: All Hail the King

  // Sony Pictures Marvel Movies (Raimi, Webb, SSU, Spider-Verse)
  557,    // Spider-Man (2002)
  558,    // Spider-Man 2 (2004)
  559,    // Spider-Man 3 (2007)
  1930,   // The Amazing Spider-Man (2012)
  102382, // The Amazing Spider-Man 2 (2014)
  1250,   // Ghost Rider (2007)
  71676,  // Ghost Rider: Spirit of Vengeance (2011)
  335983, // Venom (2018)
  324857, // Spider-Man: Into the Spider-Verse (2018)
  580489, // Venom: Let There Be Carnage (2021)
  526896, // Morbius (2022)
  569094, // Spider-Man: Across the Spider-Verse (2023)
  634492, // Madame Web (2024)
  912649, // Venom: The Last Dance (2024)
  539972, // Kraven the Hunter (2024)

  // 20th Century Fox Marvel Movies (X-Men, Wolverine, Deadpool, Fantastic Four, Daredevil)
  26623,  // Generation X (1996)
  27460,  // Nick Fury: Agent of S.H.I.E.L.D. (1998)
  36657,  // X-Men (2000)
  9480,   // Daredevil (2003)
  36658,  // X2: X-Men United (2003)
  9947,   // Elektra (2005)
  9738,   // Fantastic Four (2005)
  36668,  // X-Men: The Last Stand (2006)
  1979,   // Fantastic Four: Rise of the Silver Surfer (2007)
  2080,   // X-Men Origins: Wolverine (2009)
  49538,  // X-Men: First Class (2011)
  76170,  // The Wolverine (2013)
  127585, // X-Men: Days of Future Past (2014)
  166424, // Fantastic Four (2015)
  293660, // Deadpool (2016)
  246655, // X-Men: Apocalypse (2016)
  263115, // Logan (2017)
  383498, // Deadpool 2 (2018)
  320288, // Dark Phoenix (2019)
  340102, // The New Mutants (2020)

  // New Line Cinema (Blade Trilogy)
  36647,  // Blade (1998)
  36586,  // Blade II (2002)
  36648,  // Blade: Trinity (2004)

  // Universal Pictures
  10658,  // Howard the Duck (1986)
  1927,   // Hulk (2003)

  // Lionsgate & Independent Marvel Adaptations
  8867,   // The Punisher (1989)
  13995,  // Captain America (1990)
  22059,  // The Fantastic Four (1994)
  7220,   // The Punisher (2004)
  18882,  // Man-Thing (2005)
  13056,  // Punisher: War Zone (2008)

  // Marvel Animated Features & Disney Marvel
  14609,  // Ultimate Avengers: The Movie (2006)
  14611,  // Ultimate Avengers 2 (2006)
  13647,  // The Invincible Iron Man (2007)
  14830,  // Doctor Strange: The Sorcerer Supreme (2007)
  14613,  // Next Avengers: Heroes of Tomorrow (2008)
  394355, // Hulk Vs. (2009)
  30675,  // Planet Hulk (2010)
  63686,  // Thor: Tales of Asgard (2011)
  177572  // Big Hero 6 (2014)
]);

export const MARVEL_SERIES_TMDB_IDS = new Set<number>([
  84958,  // Loki
  88396,  // The Falcon and the Winter Soldier
  85271,  // WandaVision
  91363,  // What If...?
  88329,  // Hawkeye
  92749,  // Moon Knight
  92782,  // Ms. Marvel
  92783,  // She-Hulk: Attorney at Law
  114472, // Secret Invasion
  122226, // Echo
  138501, // Agatha All Along
  202555, // Daredevil: Born Again
  232125, // I Am Groot
  241388, // Eyes of Wakanda
  114471, // Ironheart
  138503, // Your Friendly Neighborhood Spider-Man
  138505, // Marvel Zombies
  198178, // Wonder Man
  // Defenders Saga & Marvel Television
  61889,  // Daredevil
  38472,  // Jessica Jones
  62126,  // Luke Cage
  62127,  // Iron Fist
  62285,  // The Defenders
  67178,  // The Punisher
  61550   // Agent Carter (TV)
]);

export const MARVEL_LOCAL_IDS = new Set<string>([
  'iron-man',
  'the-incredible-hulk',
  'iron-man-2',
  'thor',
  'captain-america-first-avenger',
  'the-avengers',
  'captain-america-winter-soldier',
  'guardians-of-the-galaxy',
  'avengers-age-of-ultron',
  'captain-america-civil-war',
  'thor-ragnarok',
  'avengers-infinity-war',
  'avengers-endgame',
  'spider-man-no-way-home',
  'doctor-strange-multiverse-of-madness',
  'deadpool-and-wolverine',
  'captain-america-brave-new-world',
  'fantastic-four-first-steps',
  'spider-man-brand-new-day',
  'avengers-doomsday',
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
  'iron-man-character',
  'captain-america-character',
  'thor-character',
  'hulk-character',
  'black-widow-character',
  'hawkeye-character',
  'loki-character',
  'doctor-strange-character',
  'spider-man-character',
  'scarlet-witch-character',
  'vision-character',
  'thanos-character',
  'deadpool-character',
  'wolverine-character',
  'nick-fury-character',
  'mister-fantastic-character'
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
  'loki',
  'wandavision',
  'doctor strange',
  'guardians of the galaxy',
  'black panther',
  'ant-man',
  'deadpool',
  'wolverine',
  'fantastic four',
  'daredevil',
  'she-hulk',
  'ms. marvel',
  'moon knight',
  'secret invasion',
  'echo',
  'agatha'
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
  if (item.id && (MARVEL_LOCAL_IDS.has(item.id) || item.id.startsWith('iron-man') || item.id.startsWith('loki') || item.id.startsWith('avengers') || item.id.startsWith('spider-man') || item.id.startsWith('x-men'))) {
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
