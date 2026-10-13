// Whitelist of TMDB IDs and local IDs for Marvel MCU titles
export const MARVEL_MOVIE_TMDB_IDS = new Set<number>([
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
  617127, // The Fantastic Four: First Steps
  1003596 // Avengers: Doomsday
]);

export const MARVEL_SERIES_TMDB_IDS = new Set<number>([
  88396,  // Loki
  85271,  // WandaVision
  92782,  // The Falcon and the Winter Soldier / She-Hulk
  91363,  // What If...?
  88329,  // Hawkeye
  92749,  // Moon Knight
  92783,  // Ms. Marvel
  114472, // Secret Invasion
  125928, // Echo
  138502, // Agatha All Along
  202720  // Daredevil: Born Again
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
}): boolean {
  if (!item) return false;

  // 1. Check local dataset ID
  if (item.id && (MARVEL_LOCAL_IDS.has(item.id) || item.id.startsWith('iron-man') || item.id.startsWith('loki') || item.id.startsWith('avengers'))) {
    return true;
  }

  // 2. Check TMDB ID
  if (item.tmdbId) {
    if (MARVEL_MOVIE_TMDB_IDS.has(item.tmdbId) || MARVEL_SERIES_TMDB_IDS.has(item.tmdbId)) {
      return true;
    }
  }

  // 3. Check Studio metadata
  if (item.director === 'Marvel Studios' || item.creator === 'Marvel Studios') {
    return true;
  }

  // 4. Fallback: Title text matching against known Marvel keywords
  const titleText = (item.title || item.name || '').toLowerCase();
  if (!titleText) return false;

  return MARVEL_KEYWORD_WHITELIST.some(kw => titleText.includes(kw));
}
