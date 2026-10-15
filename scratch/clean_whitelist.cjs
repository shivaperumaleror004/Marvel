const fs = require('fs');
const path = require('path');

const whitelistPath = path.join(__dirname, '..', 'src', 'utils', 'marvelWhitelist.ts');
let content = fs.readFileSync(whitelistPath, 'utf8');

// The years that were accidentally inserted as TMDB IDs
const bogusYears = new Set([
  1927, 1944, 1977, 1978, 1979, 1980, 1981, 1986, 1989, 1990, 1994, 1996, 1998, 2000,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2080
]);

const verifiedIdsToAdd = [
  1738010, // Ghost Rider (2028, Ryan Gosling)
  1439930, // The Punisher: One Last Kill (2026)
  911916,  // Spider-Man: Beyond the Spider-Verse (2027)
  413279,  // Team Thor
  441829,  // Team Thor: Part 2
  505945,  // Team Darryl
  558144,  // Deadpool: No Good Deed
  1386618, // Black Panther 3
  106355,  // Captain America (1944)
  197467,  // Captain America (1979)
  197481,  // Captain America II (1979)
  225914,  // Spider-Man (1977)
  225925,  // Spider-Man Strikes Back (1978)
  225938,  // Spider-Man: The Dragon's Challenge (1980)
  438561,  // Japanese Spiderman (1978)
  335983,  // Venom (2018)
  580489,  // Venom: Let There Be Carnage (2021)
  912649,  // Venom: The Last Dance (2024)
  526896,  // Morbius (2022)
  634492,  // Madame Web (2024)
  539972,  // Kraven the Hunter (2024)
  213375,  // VisionQuest (2026)
  337844,  // Zodiac
  202555,  // Daredevil: Born Again
  198178,  // Wonder Man
  138503,  // Your Friendly Neighborhood Spider-Man
  138502,  // X-Men '97
  138505,  // Marvel Zombies
  241388,  // Eyes of Wakanda
  114471,  // Ironheart
  1003596, // Avengers: Doomsday
  1003598, // Avengers: Secret Wars
  969681,  // Spider-Man: Brand New Day
  894205,  // Werewolf by Night
  774752,  // GotG Holiday Special
  76122,   // The Consultant
  76535,   // A Funny Thing Happened on the Way to Thor's Hammer
  119569,  // Item 47
  211387,  // Agent Carter
  253980   // All Hail the King
];

// Extract current IDs
const currentIds = new Set();
const lines = content.split('\n');
lines.forEach(l => {
  const m = l.match(/^\s*(\d+),/);
  if (m) {
    const id = parseInt(m[1], 10);
    if (!bogusYears.has(id)) {
      currentIds.add(id);
    }
  }
});

verifiedIdsToAdd.forEach(id => currentIds.add(id));

const sortedIds = Array.from(currentIds).sort((a, b) => a - b);
console.log(`Cleaned MARVEL TMDB Whitelist: ${sortedIds.length} verified IDs.`);
