import type { TimelineNode, Movie, Series, Phase, Saga, Continuity, TimelineMediaType } from '../types';

const MCU_TIMELINE_RAW: TimelineNode[] = [
  {
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
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
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
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": true
  },
  {
    "id": "eyes-of-wakanda",
    "title": "Eyes of Wakanda",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2025,
    "releaseDate": "2025-08-06",
    "releaseOrder": 1,
    "chronologicalOrder": 1,
    "tmdbId": 241388,
    "poster": "https://image.tmdb.org/t/p/w780/yuOfb1MgnaGPa4guzV0n1IFYVGN.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/yuOfb1MgnaGPa4guzV0n1IFYVGN.jpg",
    "overview": "Throughout Wakandan history, brave War Dogs and Hatut Zaraze warriors have been tasked with traveling the world to retrieve dangerous vibranium artifacts.",
    "tagline": "Across centuries, the secret keepers of Wakanda protect the realm.",
    "rating": 7.8,
    "seasonNumber": 1,
    "timelineNotes": "Chronologically earliest MCU storyline, depicting ancient Wakandan warriors across centuries recovering Vibranium artifacts throughout global history.",
    "characters": [
      "black-panther"
    ],
    "cast": [
      {
        "name": "Winston Duke",
        "role": "M'Baku (Voice)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "captain-america-first-avenger",
    "title": "Captain America: The First Avenger",
    "type": "movie",
    "phase": "Phase 1",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2011,
    "releaseDate": "2011-07-22",
    "releaseOrder": 2,
    "chronologicalOrder": 2,
    "tmdbId": 1771,
    "poster": "https://image.tmdb.org/t/p/w780/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
    "overview": "During World War II, frail Steve Rogers is transformed into the super-soldier Captain America to stop the villainous Red Skull and Hydra.",
    "tagline": "When patriots become heroes.",
    "rating": 7,
    "timelineNotes": "Set between 1942 and 1945. Bookended by Steve Rogers waking up in modern-day 2011 New York.",
    "characters": [
      "captain-america",
      "bucky-barnes",
      "peggy-carter",
      "red-skull",
      "nick-fury"
    ],
    "cast": [
      {
        "name": "Chris Evans",
        "role": "Steve Rogers / Captain America"
      },
      {
        "name": "Hayley Atwell",
        "role": "Peggy Carter"
      },
      {
        "name": "Sebastian Stan",
        "role": "Bucky Barnes"
      },
      {
        "name": "Hugo Weaving",
        "role": "Johann Schmidt / Red Skull"
      },
      {
        "name": "Tommy Lee Jones",
        "role": "Colonel Chester Phillips"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "one-shot-agent-carter",
    "title": "Marvel One-Shot: Agent Carter",
    "type": "one-shot",
    "phase": "Phase 2",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2013,
    "releaseDate": "2013-09-03",
    "releaseOrder": 3,
    "chronologicalOrder": 3,
    "tmdbId": 211387,
    "poster": "https://image.tmdb.org/t/p/w780/4vFKKWPvCVDJTOWiwReBfpAMScP.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/4vFKKWPvCVDJTOWiwReBfpAMScP.jpg",
    "overview": "In 1946, Peggy Carter works desk duty at the SSR until she embarks on a solo mission to retrieve the mysterious Zodiac serum.",
    "tagline": "A woman out of time, forging S.H.I.E.L.D.",
    "rating": 7.3,
    "timelineNotes": "Set in 1946. Demonstrates the founding roots of S.H.I.E.L.D. by Peggy Carter and Howard Stark.",
    "characters": [
      "peggy-carter",
      "howard-stark"
    ],
    "cast": [
      {
        "name": "Hayley Atwell",
        "role": "Peggy Carter"
      },
      {
        "name": "Dominic Cooper",
        "role": "Howard Stark"
      },
      {
        "name": "Bradley Whitford",
        "role": "John Flynn"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "captain-marvel",
    "title": "Captain Marvel",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2019,
    "releaseDate": "2019-03-08",
    "releaseOrder": 4,
    "chronologicalOrder": 4,
    "tmdbId": 299537,
    "poster": "https://image.tmdb.org/t/p/w780/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/w2PMyoyCc2ndmYLfaKH47Q9l83S.jpg",
    "overview": "In 1995, extraterrestrial Kree warrior Vers crash lands on Earth, discovering secrets of her past as USAF test pilot Carol Danvers.",
    "tagline": "Higher. Further. Faster.",
    "rating": 6.9,
    "timelineNotes": "Set entirely in 1995. Details Nick Fury losing his eye and the initial drafting of the \"Avengers Initiative\".",
    "characters": [
      "captain-marvel",
      "nick-fury",
      "talos",
      "korath",
      "ronan"
    ],
    "cast": [
      {
        "name": "Brie Larson",
        "role": "Carol Danvers / Captain Marvel"
      },
      {
        "name": "Samuel L. Jackson",
        "role": "Nick Fury"
      },
      {
        "name": "Ben Mendelsohn",
        "role": "Talos"
      },
      {
        "name": "Jude Law",
        "role": "Yon-Rogg"
      },
      {
        "name": "Lashana Lynch",
        "role": "Maria Rambeau"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "iron-man",
    "title": "Iron Man",
    "type": "movie",
    "phase": "Phase 1",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2008,
    "releaseDate": "2008-05-02",
    "releaseOrder": 5,
    "chronologicalOrder": 5,
    "tmdbId": 1726,
    "poster": "https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg",
    "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique armored suit to fight evil and becomes Iron Man.",
    "tagline": "Heroes aren't born. They're built.",
    "rating": 7.9,
    "timelineNotes": "Set in 2008. The birth of the MCU Sacred Timeline hero era.",
    "characters": [
      "iron-man",
      "pepper-potts",
      "war-machine",
      "obadiah-stane",
      "nick-fury"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Gwyneth Paltrow",
        "role": "Pepper Potts"
      },
      {
        "name": "Jeff Bridges",
        "role": "Obadiah Stane / Iron Monger"
      },
      {
        "name": "Terrence Howard",
        "role": "Lt. Col. James Rhodes"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "iron-man-2",
    "title": "Iron Man 2",
    "type": "movie",
    "phase": "Phase 1",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2010,
    "releaseDate": "2010-05-07",
    "releaseOrder": 6,
    "chronologicalOrder": 6,
    "tmdbId": 10138,
    "poster": "https://image.tmdb.org/t/p/w780/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg",
    "overview": "Tony Stark faces pressure from the government to share his technology while combating vengeful Russian physicist Ivan Vanko.",
    "tagline": "It's not the armor that makes the hero, but the man inside.",
    "rating": 7,
    "timelineNotes": "Set in Spring 2010. Part of the simultaneous \"Fury's Big Week\" canon overlap with Incredible Hulk and Thor.",
    "characters": [
      "iron-man",
      "black-widow",
      "war-machine",
      "nick-fury",
      "whiplash"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Scarlett Johansson",
        "role": "Natasha Romanoff / Black Widow"
      },
      {
        "name": "Don Cheadle",
        "role": "James Rhodes / War Machine"
      },
      {
        "name": "Mickey Rourke",
        "role": "Ivan Vanko / Whiplash"
      },
      {
        "name": "Sam Rockwell",
        "role": "Justin Hammer"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "the-incredible-hulk",
    "title": "The Incredible Hulk",
    "type": "movie",
    "phase": "Phase 1",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2008,
    "releaseDate": "2008-06-13",
    "releaseOrder": 7,
    "chronologicalOrder": 7,
    "tmdbId": 1724,
    "poster": "https://image.tmdb.org/t/p/w780/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/xfBnQ4mgf1jYZsscJGJjr6ce0Ar.jpg",
    "overview": "Scientist Bruce Banner seeks a cure for the beast within while pursued by General Ross and facing the monstrous Abomination.",
    "tagline": "You'll like him when he's angry.",
    "rating": 6.6,
    "timelineNotes": "Set in May 2010 during Fury's Big Week, culminating in Harlem battle and Tony Stark's bar consultation with Thunderbolt Ross.",
    "characters": [
      "hulk",
      "abomination",
      "thunderbolt-ross",
      "iron-man"
    ],
    "cast": [
      {
        "name": "Edward Norton",
        "role": "Bruce Banner / The Hulk"
      },
      {
        "name": "Liv Tyler",
        "role": "Betty Ross"
      },
      {
        "name": "Tim Roth",
        "role": "Emil Blonsky / Abomination"
      },
      {
        "name": "William Hurt",
        "role": "General Thaddeus Ross"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "thor",
    "title": "Thor",
    "type": "movie",
    "phase": "Phase 1",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2011,
    "releaseDate": "2011-05-06",
    "releaseOrder": 8,
    "chronologicalOrder": 8,
    "tmdbId": 10195,
    "poster": "https://image.tmdb.org/t/p/w780/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg",
    "overview": "Arrogant Asgardian warrior Thor is stripped of his divine powers and banished to Earth, where he must prove worthy to lift Mjolnir.",
    "tagline": "The courage to be more than a warrior.",
    "rating": 7,
    "timelineNotes": "Set during Fury's Big Week in May 2010. Introduces Asgard, Loki, the Bifrost, and Hawkeye cameo.",
    "characters": [
      "thor",
      "loki",
      "odin",
      "jane-foster",
      "hawkeye",
      "phil-coulson"
    ],
    "cast": [
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Tom Hiddleston",
        "role": "Loki"
      },
      {
        "name": "Natalie Portman",
        "role": "Jane Foster"
      },
      {
        "name": "Anthony Hopkins",
        "role": "Odin Borson"
      },
      {
        "name": "Jeremy Renner",
        "role": "Clint Barton / Hawkeye"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "the-avengers",
    "title": "The Avengers",
    "type": "movie",
    "phase": "Phase 1",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2012,
    "releaseDate": "2012-05-04",
    "releaseOrder": 9,
    "chronologicalOrder": 9,
    "tmdbId": 24428,
    "poster": "https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    "overview": "Nick Fury assembles Earth's mightiest heroes to battle Loki and his alien Chitauri army during the cataclysmic Battle of New York.",
    "tagline": "Some assembly required.",
    "rating": 8,
    "timelineNotes": "Set in May 2012. The monumental climax of Phase 1 and inception of the Avengers team.",
    "characters": [
      "iron-man",
      "captain-america",
      "thor",
      "hulk",
      "black-widow",
      "hawkeye",
      "loki",
      "nick-fury"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Chris Evans",
        "role": "Steve Rogers / Captain America"
      },
      {
        "name": "Mark Ruffalo",
        "role": "Bruce Banner / The Hulk"
      },
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Scarlett Johansson",
        "role": "Natasha Romanoff / Black Widow"
      },
      {
        "name": "Jeremy Renner",
        "role": "Clint Barton / Hawkeye"
      },
      {
        "name": "Tom Hiddleston",
        "role": "Loki"
      },
      {
        "name": "Samuel L. Jackson",
        "role": "Nick Fury"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "thor-the-dark-world",
    "title": "Thor: The Dark World",
    "type": "movie",
    "phase": "Phase 2",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2013,
    "releaseDate": "2013-11-08",
    "releaseOrder": 10,
    "chronologicalOrder": 10,
    "tmdbId": 76338,
    "poster": "https://image.tmdb.org/t/p/w780/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/3f3g0vG1r2Y4j.jpg",
    "overview": "Thor battles the ancient Dark Elf Malekith, who seeks to plunge the universe into eternal darkness using the Reality Stone (Aether).",
    "tagline": "Your world will fall.",
    "rating": 6.8,
    "timelineNotes": "Set in Autumn 2013 during the Convergence of the Nine Realms. Reveals the Reality Stone.",
    "characters": [
      "thor",
      "loki",
      "jane-foster",
      "odin",
      "malekith",
      "heimdall"
    ],
    "cast": [
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Natalie Portman",
        "role": "Jane Foster"
      },
      {
        "name": "Tom Hiddleston",
        "role": "Loki"
      },
      {
        "name": "Christopher Eccleston",
        "role": "Malekith"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "iron-man-3",
    "title": "Iron Man 3",
    "type": "movie",
    "phase": "Phase 2",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2013,
    "releaseDate": "2013-05-03",
    "releaseOrder": 11,
    "chronologicalOrder": 11,
    "tmdbId": 68721,
    "poster": "https://image.tmdb.org/t/p/w780/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/iVped1djsF0tvGkvnHbzsE3ZPTF.jpg",
    "overview": "Plagued by PTSD following the Battle of New York, Tony Stark faces terrorist mastermind the Mandarin and Aldrich Killian's Extremis.",
    "tagline": "Unleash the power behind the armor.",
    "rating": 7.2,
    "timelineNotes": "Set during Christmas 2013, dealing with Tony's psychological recovery after New York.",
    "characters": [
      "iron-man",
      "pepper-potts",
      "war-machine",
      "aldrich-killian",
      "trevor-slattery"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Gwyneth Paltrow",
        "role": "Pepper Potts"
      },
      {
        "name": "Guy Pearce",
        "role": "Aldrich Killian"
      },
      {
        "name": "Ben Kingsley",
        "role": "Trevor Slattery"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "captain-america-winter-soldier",
    "title": "Captain America: The Winter Soldier",
    "type": "movie",
    "phase": "Phase 2",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2014,
    "releaseDate": "2014-04-04",
    "releaseOrder": 12,
    "chronologicalOrder": 12,
    "tmdbId": 100402,
    "poster": "https://image.tmdb.org/t/p/w780/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/4W4d.jpg",
    "overview": "Steve Rogers and Natasha Romanoff uncover Hydra infiltration inside S.H.I.E.L.D. while pursued by a lethal ghost assassin from Steve's past.",
    "tagline": "In heroes we trust.",
    "rating": 7.8,
    "timelineNotes": "Set in Spring 2014. Causes the collapse of S.H.I.E.L.D. and re-introduces Bucky Barnes as the Winter Soldier.",
    "characters": [
      "captain-america",
      "black-widow",
      "falcon",
      "bucky-barnes",
      "nick-fury",
      "alexander-pierce"
    ],
    "cast": [
      {
        "name": "Chris Evans",
        "role": "Steve Rogers / Captain America"
      },
      {
        "name": "Scarlett Johansson",
        "role": "Natasha Romanoff / Black Widow"
      },
      {
        "name": "Sebastian Stan",
        "role": "Bucky Barnes / Winter Soldier"
      },
      {
        "name": "Anthony Mackie",
        "role": "Sam Wilson / Falcon"
      },
      {
        "name": "Robert Redford",
        "role": "Alexander Pierce"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "guardians-of-the-galaxy",
    "title": "Guardians of the Galaxy",
    "type": "movie",
    "phase": "Phase 2",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2014,
    "releaseDate": "2014-08-01",
    "releaseOrder": 13,
    "chronologicalOrder": 13,
    "tmdbId": 118340,
    "poster": "https://image.tmdb.org/t/p/w780/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/uLtV6DG.jpg",
    "overview": "Peter Quill forms an alliance with a team of extraterrestrial misfits to stop Ronan the Accuser from using the Power Stone to destroy Xandar.",
    "tagline": "All heroes have to start somewhere.",
    "rating": 8,
    "timelineNotes": "Set in 2014 across the Andromeda galaxy. Introduces the cosmic sector and the Power Stone.",
    "characters": [
      "star-lord",
      "gamora",
      "drax",
      "rocket-raccoon",
      "groot",
      "ronan",
      "thanos"
    ],
    "cast": [
      {
        "name": "Chris Pratt",
        "role": "Peter Quill / Star-Lord"
      },
      {
        "name": "Zoe Saldana",
        "role": "Gamora"
      },
      {
        "name": "Dave Bautista",
        "role": "Drax the Destroyer"
      },
      {
        "name": "Vin Diesel",
        "role": "Groot (Voice)"
      },
      {
        "name": "Bradley Cooper",
        "role": "Rocket (Voice)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "guardians-of-the-galaxy-vol-2",
    "title": "Guardians of the Galaxy Vol. 2",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2017,
    "releaseDate": "2017-05-05",
    "releaseOrder": 14,
    "chronologicalOrder": 14,
    "tmdbId": 283995,
    "poster": "https://image.tmdb.org/t/p/w780/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/aJn9XKi8q.jpg",
    "overview": "The Guardians travel across the cosmos as they help Peter Quill learn more about his mysterious celestial father, Ego the Living Planet.",
    "tagline": "Obviously.",
    "rating": 7.7,
    "timelineNotes": "Set in late 2014, roughly six months after Vol. 1. Precedes Phase 3 chronologically despite its 2017 release date.",
    "characters": [
      "star-lord",
      "gamora",
      "drax",
      "rocket-raccoon",
      "groot",
      "yondu",
      "nebula",
      "mantis",
      "ego"
    ],
    "cast": [
      {
        "name": "Chris Pratt",
        "role": "Peter Quill / Star-Lord"
      },
      {
        "name": "Zoe Saldana",
        "role": "Gamora"
      },
      {
        "name": "Kurt Russell",
        "role": "Ego"
      },
      {
        "name": "Michael Rooker",
        "role": "Yondu Udonta"
      },
      {
        "name": "Pom Klementieff",
        "role": "Mantis"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "i-am-groot",
    "title": "I Am Groot (Seasons 1 & 2)",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-08-10",
    "releaseOrder": 15,
    "chronologicalOrder": 15,
    "tmdbId": 232125,
    "poster": "https://image.tmdb.org/t/p/w780/3QfQYECgu6DX5UUWCBvv1Fl0BAJ.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/3QfQYECgu6DX5UUWCBvv1Fl0BAJ.jpg",
    "overview": "A collection of original shorts featuring Baby Groot growing up among the stars and getting into mischief aboard the Guardians' starships.",
    "tagline": "A hero of few words.",
    "rating": 7.2,
    "seasonNumber": 1,
    "timelineNotes": "MCU Chronological placement #15.",
    "characters": [],
    "cast": [
      {
        "name": "Vin Diesel",
        "role": "Baby Groot (Voice)"
      },
      {
        "name": "Bradley Cooper",
        "role": "Rocket (Voice)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "avengers-age-of-ultron",
    "title": "Avengers: Age of Ultron",
    "type": "movie",
    "phase": "Phase 2",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2015,
    "releaseDate": "2015-05-01",
    "releaseOrder": 16,
    "chronologicalOrder": 16,
    "tmdbId": 99861,
    "poster": "https://image.tmdb.org/t/p/w780/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/8uO0gUM8a.jpg",
    "overview": "When Tony Stark and Bruce Banner inadvertently create rogue AI Ultron, the Avengers must reunite to stop his apocalyptic plan in Sokovia.",
    "tagline": "A new age begins.",
    "rating": 7.6,
    "timelineNotes": "Set in Spring 2015. Introduces Wanda Maximoff, Vision, the Mind Stone, and the birth of the Sokovia Accords catalyst.",
    "characters": [
      "iron-man",
      "captain-america",
      "thor",
      "hulk",
      "black-widow",
      "hawkeye",
      "scarlet-witch",
      "vision",
      "ultron",
      "quicksilver"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Chris Evans",
        "role": "Steve Rogers / Captain America"
      },
      {
        "name": "Mark Ruffalo",
        "role": "Bruce Banner / The Hulk"
      },
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Elizabeth Olsen",
        "role": "Wanda Maximoff / Scarlet Witch"
      },
      {
        "name": "Paul Bettany",
        "role": "Vision"
      },
      {
        "name": "James Spader",
        "role": "Ultron (Voice)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "ant-man",
    "title": "Ant-Man",
    "type": "movie",
    "phase": "Phase 2",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2015,
    "releaseDate": "2015-07-17",
    "releaseOrder": 17,
    "chronologicalOrder": 17,
    "tmdbId": 102899,
    "poster": "https://image.tmdb.org/t/p/w780/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/7FW.jpg",
    "overview": "Cat burglar Scott Lang is recruited by Dr. Hank Pym to don the shrinking Ant-Man suit and pull off a heist against Darren Cross.",
    "tagline": "Heroes don't get any bigger.",
    "rating": 7.4,
    "timelineNotes": "Set in Summer 2015. The official conclusion to Phase 2; introduces the Quantum Realm and Pym Particles.",
    "characters": [
      "ant-man",
      "hank-pym",
      "hope-van-dyne",
      "yellowjacket",
      "falcon"
    ],
    "cast": [
      {
        "name": "Paul Rudd",
        "role": "Scott Lang / Ant-Man"
      },
      {
        "name": "Michael Douglas",
        "role": "Dr. Hank Pym"
      },
      {
        "name": "Evangeline Lilly",
        "role": "Hope van Dyne"
      },
      {
        "name": "Corey Stoll",
        "role": "Darren Cross / Yellowjacket"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "captain-america-civil-war",
    "title": "Captain America: Civil War",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2016,
    "releaseDate": "2016-05-06",
    "releaseOrder": 18,
    "chronologicalOrder": 18,
    "tmdbId": 271110,
    "poster": "https://image.tmdb.org/t/p/w780/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/kv7n5.jpg",
    "overview": "Political pressure over the Sokovia Accords causes a bitter ideological rift between Steve Rogers and Tony Stark, shattering the Avengers.",
    "tagline": "Divided we fall.",
    "rating": 8.1,
    "timelineNotes": "Set in June 2016. Fractures the Avengers and introduces Black Panther and Spider-Man to the MCU.",
    "characters": [
      "captain-america",
      "iron-man",
      "black-widow",
      "winter-soldier",
      "falcon",
      "war-machine",
      "hawkeye",
      "black-panther",
      "spider-man",
      "ant-man"
    ],
    "cast": [
      {
        "name": "Chris Evans",
        "role": "Steve Rogers / Captain America"
      },
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Scarlett Johansson",
        "role": "Natasha Romanoff / Black Widow"
      },
      {
        "name": "Sebastian Stan",
        "role": "Bucky Barnes / Winter Soldier"
      },
      {
        "name": "Chadwick Boseman",
        "role": "T'Challa / Black Panther"
      },
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "black-widow",
    "title": "Black Widow",
    "type": "movie",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-07-09",
    "releaseOrder": 19,
    "chronologicalOrder": 19,
    "tmdbId": 497698,
    "poster": "https://image.tmdb.org/t/p/w780/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/keI.jpg",
    "overview": "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her Red Room past arises.",
    "tagline": "She's done running from her past.",
    "rating": 7.3,
    "timelineNotes": "Set immediately following Captain America: Civil War in Summer 2016 before Natasha reunites with Steve Rogers on the run.",
    "characters": [
      "black-widow",
      "yelena-belova",
      "red-guardian",
      "melina-vostokoff",
      "taskmaster"
    ],
    "cast": [
      {
        "name": "Scarlett Johansson",
        "role": "Natasha Romanoff / Black Widow"
      },
      {
        "name": "Florence Pugh",
        "role": "Yelena Belova"
      },
      {
        "name": "David Harbour",
        "role": "Alexei Shostakov / Red Guardian"
      },
      {
        "name": "Rachel Weisz",
        "role": "Melina Vostokoff"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "black-panther",
    "title": "Black Panther",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2018,
    "releaseDate": "2018-02-16",
    "releaseOrder": 20,
    "chronologicalOrder": 20,
    "tmdbId": 284054,
    "poster": "https://image.tmdb.org/t/p/w780/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/6ELoo.jpg",
    "overview": "T'Challa returns home to isolated, technologically advanced Wakanda to claim his throne as king, but is challenged by Erik Killmonger.",
    "tagline": "Long live the king.",
    "rating": 8.1,
    "timelineNotes": "Set one week after King T'Chaka's death in Captain America: Civil War (Summer 2016).",
    "characters": [
      "black-panther",
      "killmonger",
      "nakia",
      "okoye",
      "shuri",
      "m-baku"
    ],
    "cast": [
      {
        "name": "Chadwick Boseman",
        "role": "T'Challa / Black Panther"
      },
      {
        "name": "Michael B. Jordan",
        "role": "Erik Killmonger"
      },
      {
        "name": "Lupita Nyong'o",
        "role": "Nakia"
      },
      {
        "name": "Danai Gurira",
        "role": "Okoye"
      },
      {
        "name": "Letitia Wright",
        "role": "Shuri"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "spider-man-homecoming",
    "title": "Spider-Man: Homecoming",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2017,
    "releaseDate": "2017-07-07",
    "releaseOrder": 21,
    "chronologicalOrder": 21,
    "tmdbId": 315635,
    "poster": "https://image.tmdb.org/t/p/w780/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/vc8VM.jpg",
    "overview": "Peter Parker balances high school life with his web-slinging alter-ego, guided by mentor Tony Stark as he confronts Adrian Toomes (Vulture).",
    "tagline": "Homework can wait. The city can't.",
    "rating": 7.7,
    "timelineNotes": "Set in Autumn 2016, approximately two months after the Germany airport battle in Civil War.",
    "characters": [
      "spider-man",
      "iron-man",
      "vulture",
      "ned-leeds",
      "happy-hogan"
    ],
    "cast": [
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      },
      {
        "name": "Michael Keaton",
        "role": "Adrian Toomes / Vulture"
      },
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Marisa Tomei",
        "role": "May Parker"
      },
      {
        "name": "Zendaya",
        "role": "Michelle Jones (MJ)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "doctor-strange",
    "title": "Doctor Strange",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2016,
    "releaseDate": "2016-11-04",
    "releaseOrder": 22,
    "chronologicalOrder": 22,
    "tmdbId": 284052,
    "poster": "https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/tFI85.jpg",
    "overview": "After a car crash shatters his hands, brilliant neurosurgeon Stephen Strange travels to Kamar-Taj to unlock the mystic arts and the Time Stone.",
    "tagline": "Open your mind. Change your reality.",
    "rating": 7.7,
    "timelineNotes": "Begins in early 2016 with Strange's car accident, progressing through extensive training in Kamar-Taj until early 2017.",
    "characters": [
      "doctor-strange",
      "ancient-one",
      "wong",
      "mordo",
      "kaecilius",
      "dormammu"
    ],
    "cast": [
      {
        "name": "Benedict Cumberbatch",
        "role": "Dr. Stephen Strange"
      },
      {
        "name": "Chiwetel Ejiofor",
        "role": "Karl Mordo"
      },
      {
        "name": "Rachel McAdams",
        "role": "Christine Palmer"
      },
      {
        "name": "Benedict Wong",
        "role": "Wong"
      },
      {
        "name": "Tilda Swinton",
        "role": "The Ancient One"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "thor-ragnarok",
    "title": "Thor: Ragnarok",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2017,
    "releaseDate": "2017-11-03",
    "releaseOrder": 23,
    "chronologicalOrder": 23,
    "tmdbId": 284053,
    "poster": "https://image.tmdb.org/t/p/w780/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/kaIfm5v07g.jpg",
    "overview": "Imprisoned on garbage planet Sakaar without his hammer, Thor must race against time to stop his murderous sister Hela from destroying Asgard.",
    "tagline": "No hammer. No problem.",
    "rating": 7.9,
    "timelineNotes": "Set in late 2017. Post-credits scene links directly into the opening seconds of Avengers: Infinity War.",
    "characters": [
      "thor",
      "loki",
      "hulk",
      "valkyrie",
      "hela",
      "odin",
      "heimdall",
      "grandmaster"
    ],
    "cast": [
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Tom Hiddleston",
        "role": "Loki"
      },
      {
        "name": "Cate Blanchett",
        "role": "Hela"
      },
      {
        "name": "Tessa Thompson",
        "role": "Valkyrie"
      },
      {
        "name": "Mark Ruffalo",
        "role": "Bruce Banner / The Hulk"
      },
      {
        "name": "Jeff Goldblum",
        "role": "Grandmaster"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "ant-man-and-the-wasp",
    "title": "Ant-Man and the Wasp",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2018,
    "releaseDate": "2018-07-06",
    "releaseOrder": 24,
    "chronologicalOrder": 24,
    "tmdbId": 363088,
    "poster": "https://image.tmdb.org/t/p/w780/cFQEO687n1K6umXbInzocxcnAQz.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/6xK.jpg",
    "overview": "As Scott Lang balances fatherhood and house arrest, Hope van Dyne and Hank Pym present an urgent mission into the Quantum Realm to rescue Janet.",
    "tagline": "Real heroes. Not actual size.",
    "rating": 7.2,
    "timelineNotes": "Takes place in Spring 2018 leading directly up to the Snap; the post-credits scene traps Scott in the Quantum Realm.",
    "characters": [
      "ant-man",
      "wasp",
      "hank-pym",
      "janet-van-dyne",
      "ghost"
    ],
    "cast": [
      {
        "name": "Paul Rudd",
        "role": "Scott Lang / Ant-Man"
      },
      {
        "name": "Evangeline Lilly",
        "role": "Hope van Dyne / Wasp"
      },
      {
        "name": "Michael Douglas",
        "role": "Dr. Hank Pym"
      },
      {
        "name": "Michelle Pfeiffer",
        "role": "Janet van Dyne"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "avengers-infinity-war",
    "title": "Avengers: Infinity War",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2018,
    "releaseDate": "2018-04-27",
    "releaseOrder": 25,
    "chronologicalOrder": 25,
    "tmdbId": 299536,
    "poster": "https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/bOGkgRGdwhJ.jpg",
    "overview": "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation wipes out half the universe.",
    "tagline": "An entire universe. Once and for all.",
    "rating": 8.4,
    "timelineNotes": "Set in Spring 2018 over two relentless days. Thanos collects all six Infinity Stones and executes The Snap (\"The Blip\").",
    "characters": [
      "thanos",
      "iron-man",
      "captain-america",
      "thor",
      "hulk",
      "black-widow",
      "doctor-strange",
      "spider-man",
      "black-panther",
      "scarlet-witch"
    ],
    "cast": [
      {
        "name": "Josh Brolin",
        "role": "Thanos"
      },
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Mark Ruffalo",
        "role": "Bruce Banner / The Hulk"
      },
      {
        "name": "Chris Evans",
        "role": "Steve Rogers / Captain America"
      },
      {
        "name": "Benedict Cumberbatch",
        "role": "Dr. Stephen Strange"
      },
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "avengers-endgame",
    "title": "Avengers: Endgame",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2019,
    "releaseDate": "2019-04-26",
    "releaseOrder": 26,
    "chronologicalOrder": 26,
    "tmdbId": 299534,
    "poster": "https://image.tmdb.org/t/p/w780/bR8ISy1O9XQxqiy0fQFw2BX72RQ.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXt.jpg",
    "overview": "Five years after the Blip decimated life across the cosmos, the surviving Avengers execute a perilous Time Heist across their history to restore the fallen.",
    "tagline": "Part of the journey is the end.",
    "rating": 8.4,
    "timelineNotes": "Begins in 2018 immediately following Infinity War, jumps 5 years to Autumn 2023. The grand finale of the 23-film Infinity Saga.",
    "characters": [
      "iron-man",
      "captain-america",
      "thor",
      "hulk",
      "black-widow",
      "hawkeye",
      "ant-man",
      "nebula",
      "thanos"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Tony Stark / Iron Man"
      },
      {
        "name": "Chris Evans",
        "role": "Steve Rogers / Captain America"
      },
      {
        "name": "Mark Ruffalo",
        "role": "Bruce Banner / Hulk"
      },
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Scarlett Johansson",
        "role": "Natasha Romanoff / Black Widow"
      },
      {
        "name": "Jeremy Renner",
        "role": "Clint Barton / Hawkeye"
      },
      {
        "name": "Paul Rudd",
        "role": "Scott Lang / Ant-Man"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "loki-s1",
    "title": "Loki (Season 1)",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-06-09",
    "releaseOrder": 27,
    "chronologicalOrder": 27,
    "tmdbId": 84958,
    "poster": "https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    "overview": "After escaping with the Tesseract during the 2012 Time Heist, Loki is arrested by the Time Variance Authority and confronts He Who Remains.",
    "tagline": "Loki's time has come.",
    "rating": 8.2,
    "seasonNumber": 1,
    "timelineNotes": "Set outside normal time and space at the TVA immediately following the 2012 time heist branch created in Endgame. Shatters the Sacred Timeline into the Multiverse.",
    "characters": [
      "loki",
      "mobius",
      "sylvie",
      "ravonna-renslayer",
      "he-who-remains"
    ],
    "cast": [
      {
        "name": "Tom Hiddleston",
        "role": "Loki"
      },
      {
        "name": "Owen Wilson",
        "role": "Mobius M. Mobius"
      },
      {
        "name": "Sophia Di Martino",
        "role": "Sylvie"
      },
      {
        "name": "Jonathan Majors",
        "role": "He Who Remains"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "what-if-s1",
    "title": "What If...? (Season 1)",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Multiverse",
    "year": 2021,
    "releaseDate": "2021-08-11",
    "releaseOrder": 28,
    "chronologicalOrder": 28,
    "tmdbId": 91363,
    "poster": "https://image.tmdb.org/t/p/w780/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
    "overview": "The Watcher guides viewers across alternate realities in the multiverse where key moments from the MCU occurred differently.",
    "tagline": "One question changes everything.",
    "rating": 7.9,
    "seasonNumber": 1,
    "timelineNotes": "Multiverse branch narratives resulting from the liberation of the Sacred Timeline at the end of Loki Season 1.",
    "characters": [
      "the-watcher",
      "captain-carter",
      "infinity-ultron",
      "doctor-strange-supreme"
    ],
    "cast": [
      {
        "name": "Jeffrey Wright",
        "role": "The Watcher (Voice)"
      },
      {
        "name": "Hayley Atwell",
        "role": "Peggy Carter / Captain Carter (Voice)"
      },
      {
        "name": "Chadwick Boseman",
        "role": "Star-Lord T'Challa (Voice)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "wandavision",
    "title": "WandaVision",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-01-15",
    "releaseOrder": 29,
    "chronologicalOrder": 29,
    "tmdbId": 85271,
    "poster": "https://image.tmdb.org/t/p/w780/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/glKDjt.jpg",
    "overview": "Living idealized suburban lives in Westview, Wanda Maximoff and Vision begin to suspect that their reality is not what it seems.",
    "tagline": "A visionary new age of television.",
    "rating": 8.2,
    "seasonNumber": 1,
    "timelineNotes": "Set exactly three weeks after the reversal of the Snap in Autumn 2023. Wanda creates the Hex and unlocks her full Scarlet Witch prophecy.",
    "characters": [
      "scarlet-witch",
      "vision",
      "agatha-harkness",
      "monica-rambeau",
      "jimmy-woo",
      "darcy-lewis"
    ],
    "cast": [
      {
        "name": "Elizabeth Olsen",
        "role": "Wanda Maximoff / Scarlet Witch"
      },
      {
        "name": "Paul Bettany",
        "role": "Vision"
      },
      {
        "name": "Kathryn Hahn",
        "role": "Agatha Harkness"
      },
      {
        "name": "Teyonah Parris",
        "role": "Monica Rambeau"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "the-falcon-and-the-winter-soldier",
    "title": "The Falcon and the Winter Soldier",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-03-19",
    "releaseOrder": 30,
    "chronologicalOrder": 30,
    "tmdbId": 88396,
    "poster": "https://image.tmdb.org/t/p/w780/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
    "overview": "Sam Wilson and Bucky Barnes team up on a global adventure that tests their abilities and their patience as Sam grapples with the mantle of Captain America.",
    "tagline": "Honor the legacy.",
    "rating": 7.7,
    "seasonNumber": 1,
    "timelineNotes": "Set in Spring 2024, approximately six months after the Blip reversal. Sam Wilson officially becomes the new Captain America.",
    "characters": [
      "falcon",
      "winter-soldier",
      "john-walker",
      "baron-zemo",
      "sharon-carter"
    ],
    "cast": [
      {
        "name": "Anthony Mackie",
        "role": "Sam Wilson / Captain America"
      },
      {
        "name": "Sebastian Stan",
        "role": "Bucky Barnes / Winter Soldier"
      },
      {
        "name": "Wyatt Russell",
        "role": "John Walker / U.S. Agent"
      },
      {
        "name": "Daniel Brühl",
        "role": "Baron Helmut Zemo"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "shang-chi",
    "title": "Shang-Chi and the Legend of the Ten Rings",
    "type": "movie",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-09-03",
    "releaseOrder": 31,
    "chronologicalOrder": 31,
    "tmdbId": 566525,
    "poster": "https://image.tmdb.org/t/p/w780/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/cin.jpg",
    "overview": "Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization led by his father.",
    "tagline": "You cannot outrun who you are.",
    "rating": 7.7,
    "timelineNotes": "Set in Spring 2024 around the Qingming Festival. Concludes with the Ten Rings beacon signalling into the cosmos.",
    "characters": [
      "shang-chi",
      "xu-wenwu",
      "katy",
      "xialing",
      "wong",
      "abomination"
    ],
    "cast": [
      {
        "name": "Simu Liu",
        "role": "Shang-Chi"
      },
      {
        "name": "Tony Leung",
        "role": "Xu Wenwu"
      },
      {
        "name": "Awkwafina",
        "role": "Katy Chen"
      },
      {
        "name": "Meng'er Zhang",
        "role": "Xu Xialing"
      },
      {
        "name": "Michelle Yeoh",
        "role": "Ying Nan"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "eternals",
    "title": "Eternals",
    "type": "movie",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-11-05",
    "releaseOrder": 32,
    "chronologicalOrder": 32,
    "tmdbId": 524434,
    "poster": "https://image.tmdb.org/t/p/w780/lFByFSLV5WDJEv3KabbdAF959F2.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/c6.jpg",
    "overview": "The Eternals, a race of immortal beings with superhuman powers who have secretly lived on Earth for thousands of years, reunite to stop the Emergence.",
    "tagline": "In the beginning...",
    "rating": 6.9,
    "timelineNotes": "Set in Autumn 2024. The energy burst from the Blip triggers the Emergence of the Celestial Tiamut from the Indian Ocean.",
    "characters": [
      "sersi",
      "ikaris",
      "thena",
      "ajak",
      "kingo",
      "phastos",
      "makkari",
      "druig",
      "arishem"
    ],
    "cast": [
      {
        "name": "Gemma Chan",
        "role": "Sersi"
      },
      {
        "name": "Richard Madden",
        "role": "Ikaris"
      },
      {
        "name": "Angelina Jolie",
        "role": "Thena"
      },
      {
        "name": "Salma Hayek",
        "role": "Ajak"
      },
      {
        "name": "Kumail Nanjiani",
        "role": "Kingo"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "spider-man-far-from-home",
    "title": "Spider-Man: Far From Home",
    "type": "movie",
    "phase": "Phase 3",
    "saga": "Infinity Saga",
    "continuity": "Sacred Timeline",
    "year": 2019,
    "releaseDate": "2019-07-02",
    "releaseOrder": 33,
    "chronologicalOrder": 33,
    "tmdbId": 429617,
    "poster": "https://image.tmdb.org/t/p/w780/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/5my.jpg",
    "overview": "Following the events of Avengers: Endgame, Peter Parker goes on a European school trip and must step up against Quentin Beck (Mysterio).",
    "tagline": "It takes a leap of faith to step up.",
    "rating": 7.5,
    "timelineNotes": "Set in Summer 2024 at the end of the school year. Concludes Phase 3; Mysterio frames Spider-Man and exposes Peter's identity.",
    "characters": [
      "spider-man",
      "mysterio",
      "nick-fury",
      "ned-leeds",
      "happy-hogan"
    ],
    "cast": [
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      },
      {
        "name": "Jake Gyllenhaal",
        "role": "Quentin Beck / Mysterio"
      },
      {
        "name": "Samuel L. Jackson",
        "role": "Nick Fury"
      },
      {
        "name": "Zendaya",
        "role": "Michelle Jones (MJ)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "spider-man-no-way-home",
    "title": "Spider-Man: No Way Home",
    "type": "movie",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-12-17",
    "releaseOrder": 34,
    "chronologicalOrder": 34,
    "tmdbId": 634649,
    "poster": "https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/iQ.jpg",
    "overview": "With his secret identity revealed, Peter asks Doctor Strange for help, but the spell tears open the multiverse, unleashing past villains and alternate Spider-Men.",
    "tagline": "The multiverse unleashed.",
    "rating": 8.2,
    "timelineNotes": "Picks up immediately following Far From Home and stretches until Winter 2024. Connects Toby Maguire and Andrew Garfield's universes to the MCU.",
    "characters": [
      "spider-man",
      "doctor-strange",
      "green-goblin",
      "doc-ock",
      "electro",
      "daredevil"
    ],
    "cast": [
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      },
      {
        "name": "Zendaya",
        "role": "MJ"
      },
      {
        "name": "Benedict Cumberbatch",
        "role": "Dr. Stephen Strange"
      },
      {
        "name": "Willem Dafoe",
        "role": "Norman Osborn / Green Goblin"
      },
      {
        "name": "Alfred Molina",
        "role": "Otto Octavius / Doctor Octopus"
      },
      {
        "name": "Tobey Maguire",
        "role": "Peter Parker / Spider-Man"
      },
      {
        "name": "Andrew Garfield",
        "role": "Peter Parker / Spider-Man"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "hawkeye",
    "title": "Hawkeye",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2021,
    "releaseDate": "2021-11-24",
    "releaseOrder": 35,
    "chronologicalOrder": 35,
    "tmdbId": 88329,
    "poster": "https://image.tmdb.org/t/p/w780/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/pq.jpg",
    "overview": "Former Avenger Clint Barton must work with 22-year-old archer Kate Bishop to unravel a criminal conspiracy in New York City just in time for Christmas.",
    "tagline": "This holiday season, the best gifts have strings attached.",
    "rating": 7.6,
    "seasonNumber": 1,
    "timelineNotes": "Set during Christmas 2024 in New York City; reintroduces Wilson Fisk (Kingpin) and Yelena Belova.",
    "characters": [
      "hawkeye",
      "kate-bishop",
      "yelena-belova",
      "kingpin",
      "maya-lopez"
    ],
    "cast": [
      {
        "name": "Jeremy Renner",
        "role": "Clint Barton / Hawkeye"
      },
      {
        "name": "Hailee Steinfeld",
        "role": "Kate Bishop"
      },
      {
        "name": "Florence Pugh",
        "role": "Yelena Belova"
      },
      {
        "name": "Vincent D'Onofrio",
        "role": "Wilson Fisk / Kingpin"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "moon-knight",
    "title": "Moon Knight",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-03-30",
    "releaseOrder": 36,
    "chronologicalOrder": 36,
    "tmdbId": 92749,
    "poster": "https://image.tmdb.org/t/p/w780/9K3lbMf8TKvL9xGEbzi7TggWCNQ.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/xG.jpg",
    "overview": "Steven Grant discovers he has dissociative identity disorder and shares a body with mercenary Marc Spector, avatar of Egyptian moon god Khonshu.",
    "tagline": "Embrace the chaos.",
    "rating": 7.9,
    "seasonNumber": 1,
    "timelineNotes": "Set in early Spring 2025 across London and Egypt; explores the Ennead and Egyptian pantheon.",
    "characters": [
      "moon-knight",
      "marc-spector",
      "steven-grant",
      "khonshu",
      "arthur-harrow"
    ],
    "cast": [
      {
        "name": "Oscar Isaac",
        "role": "Marc Spector / Steven Grant / Moon Knight"
      },
      {
        "name": "Ethan Hawke",
        "role": "Arthur Harrow"
      },
      {
        "name": "May Calamawy",
        "role": "Layla El-Faouly / Scarlet Scarab"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "doctor-strange-multiverse-of-madness",
    "title": "Doctor Strange in the Multiverse of Madness",
    "type": "movie",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-05-06",
    "releaseOrder": 37,
    "chronologicalOrder": 37,
    "tmdbId": 453395,
    "poster": "https://image.tmdb.org/t/p/w780/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/wc.jpg",
    "overview": "Doctor Strange teams up with mysterious teenager America Chavez to traverse mind-bending alternate realities and battle the Darkhold-corrupted Scarlet Witch.",
    "tagline": "Enter a new dimension of Strange.",
    "rating": 7.3,
    "timelineNotes": "Set in late 2024 / early 2025, several months after No Way Home. Directly follows Wanda's dark transformation from WandaVision.",
    "characters": [
      "doctor-strange",
      "scarlet-witch",
      "america-chavez",
      "wong",
      "professor-x",
      "mr-fantastic"
    ],
    "cast": [
      {
        "name": "Benedict Cumberbatch",
        "role": "Dr. Stephen Strange"
      },
      {
        "name": "Elizabeth Olsen",
        "role": "Wanda Maximoff / Scarlet Witch"
      },
      {
        "name": "Xochitl Gomez",
        "role": "America Chavez"
      },
      {
        "name": "Benedict Wong",
        "role": "Wong"
      },
      {
        "name": "Patrick Stewart",
        "role": "Professor Charles Xavier"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "ms-marvel",
    "title": "Ms. Marvel",
    "type": "series",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-06-08",
    "releaseOrder": 38,
    "chronologicalOrder": 38,
    "tmdbId": 92782,
    "poster": "https://image.tmdb.org/t/p/w780/3HWWh92kZbD7odwJX7nKmXNZsYo.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/cd.jpg",
    "overview": "Jersey City mega-fan Kamala Khan discovers an ancient family bangle that unlocks cosmic hard-light powers, setting her on a hero's journey.",
    "tagline": "Future is in her hands.",
    "rating": 7.2,
    "seasonNumber": 1,
    "timelineNotes": "Set in Autumn 2025. First MCU project to introduce a mutant genetic anomaly in Kamala Khan; leads directly into The Marvels.",
    "characters": [
      "ms-marvel",
      "kamala-khan",
      "bruno-carrelli",
      "captain-marvel"
    ],
    "cast": [
      {
        "name": "Iman Vellani",
        "role": "Kamala Khan / Ms. Marvel"
      },
      {
        "name": "Matt Lintz",
        "role": "Bruno Carrelli"
      },
      {
        "name": "Yasmeen Fletcher",
        "role": "Nakia Bahadir"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "thor-love-and-thunder",
    "title": "Thor: Love and Thunder",
    "type": "movie",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-07-08",
    "releaseOrder": 39,
    "chronologicalOrder": 39,
    "tmdbId": 616037,
    "poster": "https://image.tmdb.org/t/p/w780/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/jso.jpg",
    "overview": "Thor enlists Valkyrie, Korg, and his ex-girlfriend Jane Foster (wielding Mjolnir as the Mighty Thor) to stop Gorr the God Butcher from eliminating all gods.",
    "tagline": "The one is not the only.",
    "rating": 6.8,
    "timelineNotes": "Set in late 2025, approximately eight years after Thor and Jane's initial breakup.",
    "characters": [
      "thor",
      "mighty-thor",
      "valkyrie",
      "korg",
      "gorr",
      "zeus",
      "star-lord"
    ],
    "cast": [
      {
        "name": "Chris Hemsworth",
        "role": "Thor Odinson"
      },
      {
        "name": "Natalie Portman",
        "role": "Jane Foster / The Mighty Thor"
      },
      {
        "name": "Christian Bale",
        "role": "Gorr the God Butcher"
      },
      {
        "name": "Tessa Thompson",
        "role": "King Valkyrie"
      },
      {
        "name": "Russell Crowe",
        "role": "Zeus"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "werewolf-by-night",
    "title": "Werewolf by Night",
    "type": "special",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-10-07",
    "releaseOrder": 40,
    "chronologicalOrder": 40,
    "tmdbId": 894205,
    "poster": "https://image.tmdb.org/t/p/w780/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/jA7.jpg",
    "overview": "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows to compete for a powerful relic at Bloodstone Temple.",
    "tagline": "There is no escaping the night.",
    "rating": 7.7,
    "timelineNotes": "First Marvel Studios Special Presentation; introduces Jack Russell, Elsa Bloodstone, and Man-Thing into the MCU monster mythos.",
    "characters": [
      "werewolf-by-night",
      "elsa-bloodstone",
      "man-thing"
    ],
    "cast": [
      {
        "name": "Gael García Bernal",
        "role": "Jack Russell / Werewolf by Night"
      },
      {
        "name": "Laura Donnelly",
        "role": "Elsa Bloodstone"
      },
      {
        "name": "Harriet Sansom Harris",
        "role": "Verussa Bloodstone"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "gotg-holiday-special",
    "title": "The Guardians of the Galaxy Holiday Special",
    "type": "special",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-11-25",
    "releaseOrder": 41,
    "chronologicalOrder": 41,
    "tmdbId": 774752,
    "poster": "https://image.tmdb.org/t/p/w780/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg",
    "overview": "On a mission to make Christmas unforgettable for Peter Quill, the Guardians head to Earth in search of the ultimate present: Kevin Bacon.",
    "tagline": "It's holiday time in the galaxy.",
    "rating": 7.5,
    "timelineNotes": "Set at Christmas 2025 on Knowhere; reveals that Mantis is Peter Quill's biological half-sister.",
    "characters": [
      "mantis",
      "drax",
      "star-lord",
      "nebula",
      "cosmo"
    ],
    "cast": [
      {
        "name": "Pom Klementieff",
        "role": "Mantis"
      },
      {
        "name": "Dave Bautista",
        "role": "Drax"
      },
      {
        "name": "Chris Pratt",
        "role": "Peter Quill / Star-Lord"
      },
      {
        "name": "Kevin Bacon",
        "role": "Himself"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "black-panther-wakanda-forever",
    "title": "Black Panther: Wakanda Forever",
    "type": "movie",
    "phase": "Phase 4",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2022,
    "releaseDate": "2022-11-11",
    "releaseOrder": 42,
    "chronologicalOrder": 42,
    "tmdbId": 505642,
    "poster": "https://image.tmdb.org/t/p/w780/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/yY.jpg",
    "overview": "Queen Ramonda, Shuri, and Okoye fight to protect their grieving nation from intervening world powers and the underwater kingdom of Talokan led by Namor.",
    "tagline": "Forever.",
    "rating": 7.5,
    "timelineNotes": "Set in late 2025, one year after the passing of King T'Challa. Introduces Riri Williams (Ironheart) and Namor.",
    "characters": [
      "shuri",
      "namor",
      "queen-ramonda",
      "okoye",
      "ironheart",
      "m-baku"
    ],
    "cast": [
      {
        "name": "Letitia Wright",
        "role": "Shuri / Black Panther"
      },
      {
        "name": "Tenoch Huerta Mejía",
        "role": "Namor"
      },
      {
        "name": "Angela Bassett",
        "role": "Queen Ramonda"
      },
      {
        "name": "Dominique Thorne",
        "role": "Riri Williams / Ironheart"
      },
      {
        "name": "Danai Gurira",
        "role": "Okoye"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "ant-man-and-the-wasp-quantumania",
    "title": "Ant-Man and the Wasp: Quantumania",
    "type": "movie",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2023,
    "releaseDate": "2023-02-17",
    "releaseOrder": 43,
    "chronologicalOrder": 43,
    "tmdbId": 640146,
    "poster": "https://image.tmdb.org/t/p/w780/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/9t.jpg",
    "overview": "Scott Lang, Hope van Dyne, Hank Pym, and Cassie Lang are sucked into the Quantum Realm where they encounter the multiversal warlord Kang the Conqueror.",
    "tagline": "Witness the beginning of a new dynasty.",
    "rating": 6.6,
    "timelineNotes": "Set in early 2026. The official kick-off to Phase 5; reveals the Council of Kangs.",
    "characters": [
      "ant-man",
      "wasp",
      "kang-the-conqueror",
      "cassie-lang",
      "hank-pym",
      "janet-van-dyne",
      "modok"
    ],
    "cast": [
      {
        "name": "Paul Rudd",
        "role": "Scott Lang / Ant-Man"
      },
      {
        "name": "Evangeline Lilly",
        "role": "Hope van Dyne / Wasp"
      },
      {
        "name": "Jonathan Majors",
        "role": "Kang the Conqueror"
      },
      {
        "name": "Kathryn Newton",
        "role": "Cassie Lang"
      },
      {
        "name": "Michael Douglas",
        "role": "Dr. Hank Pym"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "guardians-of-the-galaxy-vol-3",
    "title": "Guardians of the Galaxy Vol. 3",
    "type": "movie",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2023,
    "releaseDate": "2023-05-05",
    "releaseOrder": 44,
    "chronologicalOrder": 44,
    "tmdbId": 447365,
    "poster": "https://image.tmdb.org/t/p/w780/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/5Y.jpg",
    "overview": "Still reeling from the loss of Gamora, Peter Quill rallies his team on a perilous mission to defend the universe and save Rocket from the High Evolutionary.",
    "tagline": "Once more with feeling.",
    "rating": 8.2,
    "timelineNotes": "Set in 2026. Culmination of the original Guardians roster; Peter returns to Earth to reunite with his grandfather.",
    "characters": [
      "star-lord",
      "rocket-raccoon",
      "gamora",
      "drax",
      "nebula",
      "mantis",
      "groot",
      "adam-warlock",
      "high-evolutionary"
    ],
    "cast": [
      {
        "name": "Chris Pratt",
        "role": "Peter Quill / Star-Lord"
      },
      {
        "name": "Bradley Cooper",
        "role": "Rocket (Voice)"
      },
      {
        "name": "Zoe Saldana",
        "role": "Gamora"
      },
      {
        "name": "Chukwudi Iwuji",
        "role": "The High Evolutionary"
      },
      {
        "name": "Will Poulter",
        "role": "Adam Warlock"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "secret-invasion",
    "title": "Secret Invasion",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2023,
    "releaseDate": "2023-06-21",
    "releaseOrder": 45,
    "chronologicalOrder": 45,
    "tmdbId": 114472,
    "poster": "https://image.tmdb.org/t/p/w780/3rINdUPSy9AklJg74jWHOyUXuZd.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/fA.jpg",
    "overview": "Nick Fury learns of a clandestine invasion of Earth by a faction of shapeshifting Skrulls led by Gravik, operating in the highest levels of global power.",
    "tagline": "Who do you trust?",
    "rating": 6.5,
    "seasonNumber": 1,
    "timelineNotes": "Set in Autumn 2026. Reveals Rhodey had been replaced by a Skrull imposter; leads directly into The Marvels.",
    "characters": [
      "nick-fury",
      "talos",
      "gravik",
      "g-iah",
      "sonya-falsworth",
      "war-machine"
    ],
    "cast": [
      {
        "name": "Samuel L. Jackson",
        "role": "Nick Fury"
      },
      {
        "name": "Ben Mendelsohn",
        "role": "Talos"
      },
      {
        "name": "Kingsley Ben-Adir",
        "role": "Gravik"
      },
      {
        "name": "Emilia Clarke",
        "role": "G'iah"
      },
      {
        "name": "Olivia Colman",
        "role": "Sonya Falsworth"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "the-marvels",
    "title": "The Marvels",
    "type": "movie",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2023,
    "releaseDate": "2023-11-10",
    "releaseOrder": 46,
    "chronologicalOrder": 46,
    "tmdbId": 609681,
    "poster": "https://image.tmdb.org/t/p/w780/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/fe.jpg",
    "overview": "Carol Danvers, Monica Rambeau, and Kamala Khan find their powers entangled, causing them to physically swap places whenever their abilities are used.",
    "tagline": "Higher. Further. Faster. Together.",
    "rating": 6.7,
    "timelineNotes": "Set in late 2026. Concludes with Monica Rambeau trapped in an alternate X-Men universe featuring Beast and Binary.",
    "characters": [
      "captain-marvel",
      "ms-marvel",
      "monica-rambeau",
      "nick-fury",
      "dar-benn",
      "beast"
    ],
    "cast": [
      {
        "name": "Brie Larson",
        "role": "Carol Danvers / Captain Marvel"
      },
      {
        "name": "Teyonah Parris",
        "role": "Captain Monica Rambeau"
      },
      {
        "name": "Iman Vellani",
        "role": "Kamala Khan / Ms. Marvel"
      },
      {
        "name": "Zawe Ashton",
        "role": "Dar-Benn"
      },
      {
        "name": "Samuel L. Jackson",
        "role": "Nick Fury"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "loki-s2",
    "title": "Loki (Season 2)",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2023,
    "releaseDate": "2023-10-05",
    "releaseOrder": 47,
    "chronologicalOrder": 47,
    "tmdbId": 84958,
    "poster": "https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
    "overview": "Loki battles time-slipping across the TVA's past, present, and future, eventually sacrificing his freedom to weave the multiversal timelines into the World Tree.",
    "tagline": "I know what kind of god I need to be.",
    "rating": 8.6,
    "seasonNumber": 2,
    "timelineNotes": "Transcends linear time. Loki becomes the God of Stories, personally holding the branching multiverse together at the center of Yggdrasil.",
    "characters": [
      "loki",
      "mobius",
      "sylvie",
      "o-b",
      "victor-timely",
      "he-who-remains"
    ],
    "cast": [
      {
        "name": "Tom Hiddleston",
        "role": "Loki / God of Stories"
      },
      {
        "name": "Sophia Di Martino",
        "role": "Sylvie"
      },
      {
        "name": "Ke Huy Quan",
        "role": "Ouroboros \"O.B.\""
      },
      {
        "name": "Owen Wilson",
        "role": "Mobius M. Mobius"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "what-if-s2",
    "title": "What If...? (Season 2)",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Multiverse",
    "year": 2023,
    "releaseDate": "2023-12-22",
    "releaseOrder": 48,
    "chronologicalOrder": 48,
    "tmdbId": 91363,
    "poster": "https://image.tmdb.org/t/p/w780/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
    "overview": "The Watcher continues his journey as our guide through the vast multiverse, introducing new heroes including Kahhori and unforeseen twists.",
    "tagline": "New realities emerge.",
    "rating": 7.7,
    "seasonNumber": 2,
    "timelineNotes": "Multiversal tales across branching realities, culminating in Captain Carter and Kahhori defeating Strange Supreme.",
    "characters": [
      "the-watcher",
      "captain-carter",
      "kahhori",
      "doctor-strange-supreme",
      "hela"
    ],
    "cast": [
      {
        "name": "Jeffrey Wright",
        "role": "The Watcher (Voice)"
      },
      {
        "name": "Hayley Atwell",
        "role": "Captain Carter (Voice)"
      },
      {
        "name": "Devery Jacobs",
        "role": "Kahhori (Voice)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "echo",
    "title": "Echo",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2024,
    "releaseDate": "2024-01-09",
    "releaseOrder": 49,
    "chronologicalOrder": 49,
    "tmdbId": 122226,
    "poster": "https://image.tmdb.org/t/p/w780/vFyJH630cF68LohVYjQW49074Sy.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/vFyJH630cF68LohVYjQW49074Sy.jpg",
    "overview": "Pursued by Wilson Fisk's empire, Maya Lopez returns to her hometown in Oklahoma to reconnect with her Native American Choctaw roots.",
    "tagline": "No good deed goes unpunished.",
    "rating": 7.2,
    "seasonNumber": 1,
    "timelineNotes": "Set five months after Hawkeye in Spring 2027; Wilson Fisk decides to run for Mayor of New York City.",
    "characters": [
      "maya-lopez",
      "kingpin",
      "daredevil"
    ],
    "cast": [
      {
        "name": "Alaqua Cox",
        "role": "Maya Lopez / Echo"
      },
      {
        "name": "Vincent D'Onofrio",
        "role": "Wilson Fisk / Kingpin"
      },
      {
        "name": "Charlie Cox",
        "role": "Matt Murdock / Daredevil"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "agatha-all-along",
    "title": "Agatha All Along",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2024,
    "releaseDate": "2024-09-18",
    "releaseOrder": 50,
    "chronologicalOrder": 50,
    "tmdbId": 138501,
    "poster": "https://image.tmdb.org/t/p/w780/mGsxKwXUjojitRv2E9qMTbxbBRd.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/mGsxKwXUjojitRv2E9qMTbxbBRd.jpg",
    "overview": "Freed from Wanda's spell by a mysterious teen (Billy Maximoff), powerless witch Agatha Harkness gathers a desperate coven to face the trials of the Witches' Road.",
    "tagline": "Cross the Road.",
    "rating": 8.1,
    "seasonNumber": 1,
    "timelineNotes": "Set three years after the Westview Hex in Autumn 2026. Introduces Billy Maximoff (Wiccan) in physical incarnation.",
    "characters": [
      "agatha-harkness",
      "billy-maximoff",
      "rio-vidal",
      "jennifer-kale",
      "alice-wu-gulliver",
      "lilia-calderu"
    ],
    "cast": [
      {
        "name": "Kathryn Hahn",
        "role": "Agatha Harkness"
      },
      {
        "name": "Joe Locke",
        "role": "Billy Maximoff / Teen"
      },
      {
        "name": "Aubrey Plaza",
        "role": "Rio Vidal / Death"
      },
      {
        "name": "Patti LuPone",
        "role": "Lilia Calderu"
      },
      {
        "name": "Sasheer Zamata",
        "role": "Jennifer Kale"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "what-if-s3",
    "title": "What If...? (Season 3)",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Multiverse",
    "year": 2024,
    "releaseDate": "2024-12-22",
    "releaseOrder": 51,
    "chronologicalOrder": 51,
    "tmdbId": 91363,
    "poster": "https://image.tmdb.org/t/p/w780/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
    "overview": "The final season of the groundbreaking animated anthology delivers thrilling climactic journeys through infinite unexpected realities.",
    "tagline": "The culmination of the Multiverse chronicle.",
    "rating": 7.8,
    "seasonNumber": 3,
    "timelineNotes": "Culmination of The Watcher's multiversal observation cycle; features Storm wielding Mjolnir and Shang-Chi Western reality.",
    "characters": [
      "the-watcher",
      "storm",
      "shang-chi",
      "white-vision"
    ],
    "cast": [
      {
        "name": "Jeffrey Wright",
        "role": "The Watcher (Voice)"
      },
      {
        "name": "Anthony Mackie",
        "role": "Sam Wilson (Voice)"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "daredevil-born-again-s1",
    "title": "Daredevil: Born Again (Season 1)",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2025,
    "releaseDate": "2025-03-04",
    "releaseOrder": 52,
    "chronologicalOrder": 52,
    "tmdbId": 202555,
    "poster": "https://image.tmdb.org/t/p/w780/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg",
    "overview": "Matt Murdock and Wilson Fisk attempt to put their darker alter egos behind them to serve the people of New York, but their pasts inevitably catch up to them.",
    "tagline": "The devil you know.",
    "rating": 8.4,
    "seasonNumber": 1,
    "timelineNotes": "Takes place during Wilson Fisk's mayoral crackdown on NYC vigilantes. Integrates the Netflix Defenders canon directly into current MCU continuity.",
    "characters": [
      "daredevil",
      "kingpin",
      "punisher",
      "bullseye",
      "foggy-nelson",
      "karen-page"
    ],
    "cast": [
      {
        "name": "Charlie Cox",
        "role": "Matt Murdock / Daredevil"
      },
      {
        "name": "Vincent D'Onofrio",
        "role": "Mayor Wilson Fisk / Kingpin"
      },
      {
        "name": "Jon Bernthal",
        "role": "Frank Castle / The Punisher"
      },
      {
        "name": "Deborah Ann Woll",
        "role": "Karen Page"
      },
      {
        "name": "Elden Henson",
        "role": "Foggy Nelson"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "captain-america-brave-new-world",
    "title": "Captain America: Brave New World",
    "type": "movie",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2025,
    "releaseDate": "2025-02-14",
    "releaseOrder": 53,
    "chronologicalOrder": 53,
    "tmdbId": 822119,
    "poster": "https://image.tmdb.org/t/p/w780/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
    "overview": "Sam Wilson finds himself in the middle of an international crisis following a meeting with newly elected US President Thaddeus Ross, uncovering a sinister global conspiracy.",
    "tagline": "A new world order.",
    "rating": 7.4,
    "timelineNotes": "Set in 2026-2027. Deals with Celestial Island Adamantium harvesting and President Ross becoming the Red Hulk.",
    "characters": [
      "captain-america",
      "falcon",
      "red-hulk",
      "the-leader",
      "isiah-bradley"
    ],
    "cast": [
      {
        "name": "Anthony Mackie",
        "role": "Sam Wilson / Captain America"
      },
      {
        "name": "Harrison Ford",
        "role": "President Thaddeus \"Thunderbolt\" Ross / Red Hulk"
      },
      {
        "name": "Danny Ramirez",
        "role": "Joaquin Torres / Falcon"
      },
      {
        "name": "Tim Blake Nelson",
        "role": "Samuel Sterns / The Leader"
      },
      {
        "name": "Giancarlo Esposito",
        "role": "Seth Voelker / Sidewinder"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": false
  },
  {
    "id": "thunderbolts",
    "title": "Thunderbolts*",
    "type": "movie",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2025,
    "releaseDate": "2025-05-02",
    "releaseOrder": 54,
    "chronologicalOrder": 54,
    "tmdbId": 986056,
    "poster": "https://image.tmdb.org/t/p/w780/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/tb.jpg",
    "overview": "An irreverent team-up featuring depressed assassin Yelena Belova alongside the MCU least anticipated band of misfits on a high-stakes black ops suicide mission.",
    "tagline": "Careful who you assemble.",
    "rating": 7.9,
    "timelineNotes": "Culmination of Phase 5. Assembles Bucky Barnes, Yelena Belova, Red Guardian, US Agent, Ghost, and Bob (Sentry).",
    "characters": [
      "yelena-belova",
      "bucky-barnes",
      "red-guardian",
      "u-s-agent",
      "ghost",
      "taskmaster",
      "val",
      "sentry"
    ],
    "cast": [
      {
        "name": "Florence Pugh",
        "role": "Yelena Belova"
      },
      {
        "name": "Sebastian Stan",
        "role": "Bucky Barnes"
      },
      {
        "name": "David Harbour",
        "role": "Alexei Shostakov / Red Guardian"
      },
      {
        "name": "Wyatt Russell",
        "role": "John Walker / U.S. Agent"
      },
      {
        "name": "Julia Louis-Dreyfus",
        "role": "Valentina Allegra de Fontaine"
      },
      {
        "name": "Lewis Pullman",
        "role": "Bob / Sentry"
      }
    ],
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": false
  },
  {
    "id": "daredevil-born-again-s2",
    "title": "Daredevil: Born Again (Season 2)",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2026,
    "releaseDate": "2026-03-10",
    "releaseOrder": 55,
    "chronologicalOrder": 55,
    "tmdbId": 202555,
    "poster": "https://image.tmdb.org/t/p/w780/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg",
    "overview": "The continuing battle for the soul of New York City between Mayor Wilson Fisk and the vigilantes defending the five boroughs.",
    "tagline": "The battle for New York.",
    "rating": 8.3,
    "seasonNumber": 2,
    "timelineNotes": "Continuation of the street-level war heading into the multiversal incursion events.",
    "characters": [
      "daredevil",
      "kingpin",
      "punisher"
    ],
    "cast": [
      {
        "name": "Charlie Cox",
        "role": "Matt Murdock / Daredevil"
      },
      {
        "name": "Vincent D'Onofrio",
        "role": "Wilson Fisk / Kingpin"
      }
    ],
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": true
  },
  {
    "id": "ironheart",
    "title": "Ironheart",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2025,
    "releaseDate": "2025-06-24",
    "releaseOrder": 56,
    "chronologicalOrder": 56,
    "tmdbId": 114471,
    "poster": "https://image.tmdb.org/t/p/w780/dOh6MJpdlQhYpLBhzhNQeYGKTZ5.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/ih.jpg",
    "overview": "Brilliant MIT inventor Riri Williams returns to Chicago where high-tech ingenuity clashes directly with dark occult magic wielded by Parker Robbins (The Hood).",
    "tagline": "Tech versus magic.",
    "rating": 7.3,
    "seasonNumber": 1,
    "timelineNotes": "Set post-Wakanda Forever in Chicago. Explores the tension between Stark-level robotics and dark supernatural power.",
    "characters": [
      "ironheart",
      "the-hood"
    ],
    "cast": [
      {
        "name": "Dominique Thorne",
        "role": "Riri Williams / Ironheart"
      },
      {
        "name": "Anthony Ramos",
        "role": "Parker Robbins / The Hood"
      },
      {
        "name": "Alden Ehrenreich",
        "role": "Joe McGillicuddy"
      }
    ],
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": false
  },
  {
    "id": "wonder-man",
    "title": "Wonder Man",
    "type": "series",
    "phase": "Phase 5",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2025,
    "releaseDate": "2025-12-10",
    "releaseOrder": 57,
    "chronologicalOrder": 57,
    "tmdbId": 198178,
    "poster": "https://image.tmdb.org/t/p/w780/6yy9nQlFt2l6UVWzrfhszFCaZ5C.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/wm.jpg",
    "overview": "Hollywood actor and stuntman Simon Williams navigates the bizarre world of superhero entertainment alongside legendary washed-up thespian Trevor Slattery.",
    "tagline": "Behind the red carpet.",
    "rating": 7.5,
    "seasonNumber": 1,
    "timelineNotes": "Set in modern Hollywood inside the Sacred Timeline. Features Yahya Abdul-Mateen II as Simon Williams and Ben Kingsley as Trevor Slattery.",
    "characters": [
      "simon-williams",
      "trevor-slattery",
      "grim-reaper"
    ],
    "cast": [
      {
        "name": "Yahya Abdul-Mateen II",
        "role": "Simon Williams / Wonder Man"
      },
      {
        "name": "Ben Kingsley",
        "role": "Trevor Slattery"
      },
      {
        "name": "Demetrius Grosse",
        "role": "Eric Williams / Grim Reaper"
      }
    ],
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": false
  },
  {
    "id": "fantastic-four-first-steps",
    "title": "The Fantastic Four: First Steps",
    "type": "movie",
    "phase": "Phase 6",
    "saga": "Multiverse Saga",
    "continuity": "Alternate Timeline",
    "year": 2025,
    "releaseDate": "2025-07-25",
    "releaseOrder": 58,
    "chronologicalOrder": 58,
    "tmdbId": 617126,
    "poster": "https://image.tmdb.org/t/p/w780/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/f4.jpg",
    "overview": "Set against a vibrant 1960s retro-futuristic alternate universe, Marvel's First Family must defend their world from planet-devourer Galactus and his herald Silver Surfer.",
    "tagline": "Marvel's First Family.",
    "rating": 8.2,
    "timelineNotes": "Set in a 1960s alternate retro-futuristic universe in the Multiverse. Leads Marvel's First Family towards collision with the Sacred Timeline.",
    "characters": [
      "mister-fantastic",
      "invisible-woman",
      "human-torch",
      "the-thing",
      "galactus",
      "silver-surfer"
    ],
    "cast": [
      {
        "name": "Pedro Pascal",
        "role": "Reed Richards / Mister Fantastic"
      },
      {
        "name": "Vanessa Kirby",
        "role": "Sue Storm / Invisible Woman"
      },
      {
        "name": "Joseph Quinn",
        "role": "Johnny Storm / Human Torch"
      },
      {
        "name": "Ebon Moss-Bachrach",
        "role": "Ben Grimm / The Thing"
      },
      {
        "name": "Ralph Ineson",
        "role": "Galactus"
      },
      {
        "name": "Julia Garner",
        "role": "Shalla-Bal / Silver Surfer"
      }
    ],
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": false
  },
  {
    "id": "spider-man-brand-new-day",
    "title": "Spider-Man: Brand New Day",
    "type": "movie",
    "phase": "Phase 6",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2026,
    "releaseDate": "2026-07-29",
    "releaseOrder": 59,
    "chronologicalOrder": 59,
    "tmdbId": 969681,
    "poster": "https://image.tmdb.org/t/p/w780/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/subj7knTn4DeS6KS7qI66EQKe9i.jpg",
    "overview": "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see.",
    "tagline": "A new chapter begins for the web-slinger.",
    "rating": 8.5,
    "timelineNotes": "MCU Chronological placement #59.",
    "characters": [
      "spider-man",
      "the-punisher",
      "hulk"
    ],
    "cast": [
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      },
      {
        "name": "Zendaya",
        "role": "Michelle 'MJ' Jones-Watson"
      },
      {
        "name": "Jacob Batalon",
        "role": "Ned Leeds"
      },
      {
        "name": "Jon Bernthal",
        "role": "Frank Castle / The Punisher"
      },
      {
        "name": "Mark Ruffalo",
        "role": "Bruce Banner / Hulk"
      }
    ],
    "autoEmbedAvailable": true,
    "screenScapeAvailable": true,
    "isUpcoming": true
  },
  {
    "id": "avengers-doomsday",
    "title": "Avengers: Doomsday",
    "type": "movie",
    "phase": "Phase 6",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2026,
    "releaseDate": "2026-05-01",
    "releaseOrder": 60,
    "chronologicalOrder": 60,
    "tmdbId": 1003596,
    "poster": "https://image.tmdb.org/t/p/w780/jzPwsojjFStf5lR5Nm07w2hH56G.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/doom.jpg",
    "overview": "Earth's mightiest heroes and allies across the multiverse must unite against the supreme multiversal threat of Doctor Victor von Doom.",
    "tagline": "All hope lies in Doom.",
    "rating": 8.8,
    "timelineNotes": "The monumental fifth Avengers epic directed by the Russo Brothers. Features Robert Downey Jr. returning as Victor von Doom.",
    "characters": [
      "doctor-doom",
      "mister-fantastic",
      "captain-america",
      "spider-man",
      "thor",
      "thunderbolts"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Victor von Doom / Doctor Doom"
      },
      {
        "name": "Pedro Pascal",
        "role": "Reed Richards / Mister Fantastic"
      },
      {
        "name": "Anthony Mackie",
        "role": "Sam Wilson / Captain America"
      },
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      },
      {
        "name": "Florence Pugh",
        "role": "Yelena Belova"
      }
    ],
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": true
  },
  {
    "id": "avengers-secret-wars",
    "title": "Avengers: Secret Wars",
    "type": "movie",
    "phase": "Phase 6",
    "saga": "Multiverse Saga",
    "continuity": "Sacred Timeline",
    "year": 2027,
    "releaseDate": "2027-05-07",
    "releaseOrder": 61,
    "chronologicalOrder": 61,
    "tmdbId": 1003598,
    "poster": "https://image.tmdb.org/t/p/w780/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w1280/sw.jpg",
    "overview": "The grand multiversal collision occurs as infinite realities crash in incursions, forging Battleworld and the ultimate battle for all existence.",
    "tagline": "The end of everything. The rebirth of all.",
    "rating": 9,
    "timelineNotes": "The definitive climax of The Multiverse Saga (Phases 4-6) bringing every Marvel reality into the Battleworld collision.",
    "characters": [
      "doctor-doom",
      "mister-fantastic",
      "spider-man",
      "wolverine",
      "thor",
      "loki"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "role": "Victor von Doom"
      },
      {
        "name": "Hugh Jackman",
        "role": "Logan / Wolverine"
      },
      {
        "name": "Tom Holland",
        "role": "Peter Parker / Spider-Man"
      },
      {
        "name": "Tom Hiddleston",
        "role": "Loki / God of Stories"
      }
    ],
    "autoEmbedAvailable": false,
    "screenScapeAvailable": false,
    "isUpcoming": true
  }
];

// Calculate canonical MCU release order based on releaseDate to ensure distinct release vs chronological ordering
const sortedMcuByRelease = [...MCU_TIMELINE_RAW].sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
const mcuReleaseOrderMap = new Map(sortedMcuByRelease.map((node, index) => [node.id, index + 1]));

export const MCU_TIMELINE_ENTRIES: TimelineNode[] = MCU_TIMELINE_RAW.map(node => ({
  ...node,
  releaseOrder: mcuReleaseOrderMap.get(node.id) ?? node.releaseOrder
}));

/**
 * Merges dynamic TMDB artwork and details (if fetched) into the curated master timeline nodes.
 * CRUCIAL RULE: Never replaces curated chronologicalOrder, releaseOrder, phase, or saga.
 */
export function createTimelineNodes(
  movies: Movie[] = [],
  series: Series[] = []
): TimelineNode[] {
  const movieMap = new Map<string, Movie>(movies.map(m => [m.id, m]));
  const seriesMap = new Map<string, Series>(series.map(s => [s.id, s]));

  return MCU_TIMELINE_ENTRIES.map(node => {
    // If we have live TMDB-enriched movie data for this item, sync poster/backdrop/overview if valid
    const movieMatch = movieMap.get(node.id);
    const seriesMatch = seriesMap.get(node.id);

    const liveItem = movieMatch || seriesMatch;
    if (!liveItem) return node;

    return {
      ...node,
      poster: liveItem.poster && !liveItem.poster.includes('unsplash') ? liveItem.poster : node.poster,
      backdrop: liveItem.backdrop && !liveItem.backdrop.includes('unsplash') ? liveItem.backdrop : node.backdrop,
      overview: liveItem.overview || node.overview,
      rating: liveItem.rating || node.rating,
      tagline: liveItem.tagline || node.tagline,
      cast: liveItem.cast && liveItem.cast.length > 0 ? liveItem.cast : node.cast
    };
  });
}

export const TIMELINE_NODES: TimelineNode[] = createTimelineNodes();

/**
 * Creates TimelineNode entries for all Marvel movies across all studios.
 * Generates:
 * 1. Master Release Order (strictly sorted by original release date from 1986 to present)
 * 2. In-universe chronological placement for respective universes
 */
export function createMarvelMoviesTimelineNodes(movies: Movie[]): TimelineNode[] {
  return movies.map(movie => {
    let continuity: Continuity = 'Sacred Timeline';
    if (movie.universeId === 'earth-616') {
      continuity = 'Sacred Timeline';
    } else if (movie.mcuRelationship === 'multiverse-crossover') {
      continuity = 'Multiverse';
    } else {
      continuity = 'Alternate Timeline';
    }

    return {
      id: movie.id,
      title: movie.title,
      type: (movie.type as TimelineMediaType) || 'movie',
      phase: movie.phase || 'Legacy',
      saga: movie.saga || 'Multiverse',
      continuity,
      year: movie.year,
      releaseDate: movie.releaseDate,
      releaseOrder: movie.releaseOrder,
      chronologicalOrder: movie.chronologicalOrder || movie.mcuChronologyOrder || movie.universeChronologyOrder || movie.releaseOrder,
      tmdbId: movie.tmdbId,
      poster: movie.poster,
      backdrop: movie.backdrop,
      overview: movie.overview,
      tagline: movie.tagline,
      rating: movie.rating,
      characters: movie.characters,
      cast: movie.cast,
      screenScapeAvailable: true,
      isUpcoming: movie.isUpcoming || movie.releaseStatus === 'upcoming',
      studio: movie.studio,
      studioId: movie.studioId,
      distributor: movie.distributor,
      franchise: movie.franchise,
      universe: movie.universe,
      universeId: movie.universeId,
      universeDesignation: movie.universeDesignation,
      movieType: movie.movieType || 'live-action',
      mcuRelationship: movie.mcuRelationship || 'non-mcu',
      timelineNotes: `${movie.franchise || 'Marvel'} feature film produced by ${movie.studio || 'Marvel'}. Released ${movie.releaseDate}.`
    };
  });
}

/**
 * Returns timeline nodes sorted strictly by curated releaseOrder or chronologicalOrder.
 * Never calculates order from TMDB popularity or response order.
 */
export function getTimelineNodesByOrder(
  order: 'release' | 'chronological',
  nodes: TimelineNode[] = MCU_TIMELINE_ENTRIES
): TimelineNode[] {
  return [...nodes].sort((a, b) => {
    return order === 'release'
      ? a.releaseOrder - b.releaseOrder
      : a.chronologicalOrder - b.chronologicalOrder;
  });
}
