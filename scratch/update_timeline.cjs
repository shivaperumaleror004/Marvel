const fs = require('fs');
const path = require('path');

const timelinePath = path.join(__dirname, '..', 'src', 'data', 'timeline.ts');
let content = fs.readFileSync(timelinePath, 'utf8');

const punisherNode = `  {
    "id": "the-punisher-one-last-kill",
    "title": "The Punisher: One Last Kill",
    "type": "special",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2026,
    "releaseDate": "2026-05-12",
    "releaseOrder": 55,
    "chronologicalOrder": 55,
    "tmdbId": 1439930,
    "poster": "https://image.tmdb.org/t/p/w780/qQclTgLMDvGBuUBFGHRipxkEwWR.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/qO55CD8tgVL1T4WKn6zYFFiD6lL.jpg",
    "overview": "As Frank Castle searches for meaning beyond revenge, an unexpected force pulls him back into the fight.",
    "tagline": "Revenge has a final price.",
    "rating": 8.1,
    "timelineNotes": "Special Presentation following Frank Castle's journey in the criminal underbelly.",
    "characters": ["punisher"],
    "cast": [
      {
        "name": "Jon Bernthal",
        "role": "Frank Castle / The Punisher"
      }
    ],
    "screenScapeAvailable": true,
    "isUpcoming": false
  },`;

const ghostRiderNode = `  {
    "id": "ghost-rider-2028",
    "title": "Ghost Rider",
    "type": "movie",
    "phase": "Phase 6",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2028,
    "releaseDate": "2028-07-28",
    "releaseOrder": 65,
    "chronologicalOrder": 65,
    "tmdbId": 1738010,
    "poster": "https://image.tmdb.org/t/p/w780/zgC1zo3lyujoEiIMnUrHltvPmZg.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/8ZuU1bCXvqcHdFIIiJAtkGRPw1j.jpg",
    "overview": "A feature film set in the Marvel Cinematic Universe (MCU) starring Ryan Gosling as stunt motorcyclist Johnny Blaze, who transforms into the supernatural Spirit of Vengeance.",
    "tagline": "The Spirit of Vengeance Rises in the MCU.",
    "rating": 8.5,
    "timelineNotes": "Marvel Studios supernatural production directed by Shawn Levy starring Ryan Gosling.",
    "characters": ["ghost-rider-mcu"],
    "cast": [
      {
        "name": "Ryan Gosling",
        "role": "Johnny Blaze / Ghost Rider"
      }
    ],
    "screenScapeAvailable": false,
    "isUpcoming": true
  },`;

if (!content.includes('"ghost-rider-2028"')) {
  content = content.replace('const MCU_TIMELINE_RAW: TimelineNode[] = [', `const MCU_TIMELINE_RAW: TimelineNode[] = [\n${punisherNode}\n${ghostRiderNode}`);
  fs.writeFileSync(timelinePath, content, 'utf8');
  console.log('Added Ghost Rider 2028 and Punisher One Last Kill to timeline.ts');
} else {
  console.log('Already present in timeline.ts');
}
