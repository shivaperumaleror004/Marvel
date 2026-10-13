import type { TimelineNode, Movie, Series, Phase, Saga, Continuity, TimelineMediaType } from '../types';

export const MCU_TIMELINE_ENTRIES: TimelineNode[] = [
  // 1. Ancient History Prologue
  {
    id: 'eyes-of-wakanda',
    title: 'Eyes of Wakanda',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2025,
    releaseDate: '2025-08-06',
    releaseOrder: 80,
    chronologicalOrder: 1,
    tmdbId: 241388,
    poster: 'https://image.tmdb.org/t/p/w780/d5iIlFnI1e14m6fV9950m8m8y6h.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/d5iIlFnI1e14m6fV9950m8m8y6h.jpg',
    overview: 'Throughout Wakandan history, brave War Dogs and Hatut Zaraze warriors have been tasked with traveling the world to retrieve dangerous vibranium artifacts.',
    tagline: 'Across centuries, the secret keepers of Wakanda protect the realm.',
    rating: 7.8,
    seasonNumber: 1,
    timelineNotes: 'Chronologically earliest MCU storyline, depicting ancient Wakandan warriors across centuries recovering Vibranium artifacts throughout global history.',
    characters: ['black-panther'],
    cast: [{ name: 'Winston Duke', role: 'M\'Baku (Voice)' }],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 2. World War II (1942-1945)
  {
    id: 'captain-america-first-avenger',
    title: 'Captain America: The First Avenger',
    type: 'movie',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2011,
    releaseDate: '2011-07-22',
    releaseOrder: 5,
    chronologicalOrder: 2,
    tmdbId: 1771,
    poster: 'https://image.tmdb.org/t/p/w780/vSNxAJTlD0r02V9sPYpOjqD0YvH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/eQN31P4IEVs6NZY7Tn49v0GvI0I.jpg',
    overview: 'During World War II, frail Steve Rogers is transformed into the super-soldier Captain America to stop the villainous Red Skull and Hydra.',
    tagline: 'When patriots become heroes.',
    rating: 7.0,
    timelineNotes: 'Set between 1942 and 1945. Bookended by Steve Rogers waking up in modern-day 2011 New York.',
    characters: ['captain-america', 'bucky-barnes', 'peggy-carter', 'red-skull', 'nick-fury'],
    cast: [
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Hayley Atwell', role: 'Peggy Carter' },
      { name: 'Sebastian Stan', role: 'Bucky Barnes' },
      { name: 'Hugo Weaving', role: 'Johann Schmidt / Red Skull' },
      { name: 'Tommy Lee Jones', role: 'Colonel Chester Phillips' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 3. Post-WWII (1946)
  {
    id: 'one-shot-agent-carter',
    title: 'Marvel One-Shot: Agent Carter',
    type: 'one-shot',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2013,
    releaseDate: '2013-09-03',
    releaseOrder: 11,
    chronologicalOrder: 3,
    tmdbId: 211387,
    poster: 'https://image.tmdb.org/t/p/w780/a9r5aB3M6V1V3F9Jgq2M4f1K1q.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/a9r5aB3M6V1V3F9Jgq2M4f1K1q.jpg',
    overview: 'In 1946, Peggy Carter works desk duty at the SSR until she embarks on a solo mission to retrieve the mysterious Zodiac serum.',
    tagline: 'A woman out of time, forging S.H.I.E.L.D.',
    rating: 7.3,
    timelineNotes: 'Set in 1946. Demonstrates the founding roots of S.H.I.E.L.D. by Peggy Carter and Howard Stark.',
    characters: ['peggy-carter', 'howard-stark'],
    cast: [
      { name: 'Hayley Atwell', role: 'Peggy Carter' },
      { name: 'Dominic Cooper', role: 'Howard Stark' },
      { name: 'Bradley Whitford', role: 'John Flynn' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 4. Agent Carter Season 1 (1946)
  {
    id: 'agent-carter-s1',
    title: 'Agent Carter (Season 1)',
    type: 'series',
    phase: 'Marvel Television',
    saga: 'Marvel Television',
    continuity: 'Adjacent Canon',
    year: 2015,
    releaseDate: '2015-01-06',
    releaseOrder: 15,
    chronologicalOrder: 4,
    tmdbId: 61550,
    poster: 'https://image.tmdb.org/t/p/w780/bSjXvQ9m9c5j1iYy0t1k8o6L0s.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/bSjXvQ9m9c5j1iYy0t1k8o6L0s.jpg',
    overview: 'In 1946, Peggy Carter must balance routine office work for the SSR with secretly aiding Howard Stark, who has been framed for treason.',
    tagline: 'Sometimes the best man for the job is a woman.',
    rating: 7.6,
    seasonNumber: 1,
    timelineNotes: 'Takes place in 1946 following the loss of Steve Rogers; features Edwin Jarvis assisting Peggy in New York City.',
    characters: ['peggy-carter', 'edwin-jarvis', 'howard-stark'],
    cast: [
      { name: 'Hayley Atwell', role: 'Peggy Carter' },
      { name: 'James D\'Arcy', role: 'Edwin Jarvis' },
      { name: 'Enver Gjokaj', role: 'Daniel Sousa' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 5. Agent Carter Season 2 (1947)
  {
    id: 'agent-carter-s2',
    title: 'Agent Carter (Season 2)',
    type: 'series',
    phase: 'Marvel Television',
    saga: 'Marvel Television',
    continuity: 'Adjacent Canon',
    year: 2016,
    releaseDate: '2016-01-19',
    releaseOrder: 19,
    chronologicalOrder: 5,
    tmdbId: 61550,
    poster: 'https://image.tmdb.org/t/p/w780/bSjXvQ9m9c5j1iYy0t1k8o6L0s.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/bSjXvQ9m9c5j1iYy0t1k8o6L0s.jpg',
    overview: 'Peggy relocates from New York City to Los Angeles to confront the enigmatic Zero Matter threat amidst Hollywood glamorous intrigue.',
    tagline: 'Cool under fire in sunny California.',
    rating: 7.5,
    seasonNumber: 2,
    timelineNotes: 'Set in 1947 in Los Angeles; deals with Isodyne Energy and the Darkforce / Zero Matter.',
    characters: ['peggy-carter', 'edwin-jarvis'],
    cast: [
      { name: 'Hayley Atwell', role: 'Peggy Carter' },
      { name: 'James D\'Arcy', role: 'Edwin Jarvis' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 6. The 1990s (1995)
  {
    id: 'captain-marvel',
    title: 'Captain Marvel',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2019,
    releaseDate: '2019-03-08',
    releaseOrder: 27,
    chronologicalOrder: 6,
    tmdbId: 299537,
    poster: 'https://image.tmdb.org/t/p/w780/AtsgWhDnHTq68L0lLsUr8A8af5f.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/w2PMyoyCc2ndmYLfaKH47Q9l83S.jpg',
    overview: 'In 1995, extraterrestrial Kree warrior Vers crash lands on Earth, discovering secrets of her past as USAF test pilot Carol Danvers.',
    tagline: 'Higher. Further. Faster.',
    rating: 6.9,
    timelineNotes: 'Set entirely in 1995. Details Nick Fury losing his eye and the initial drafting of the "Avengers Initiative".',
    characters: ['captain-marvel', 'nick-fury', 'talos', 'korath', 'ronan'],
    cast: [
      { name: 'Brie Larson', role: 'Carol Danvers / Captain Marvel' },
      { name: 'Samuel L. Jackson', role: 'Nick Fury' },
      { name: 'Ben Mendelsohn', role: 'Talos' },
      { name: 'Jude Law', role: 'Yon-Rogg' },
      { name: 'Lashana Lynch', role: 'Maria Rambeau' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 7. 2008 (Genesis of Iron Man)
  {
    id: 'iron-man',
    title: 'Iron Man',
    type: 'movie',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2008,
    releaseDate: '2008-05-02',
    releaseOrder: 1,
    chronologicalOrder: 7,
    tmdbId: 1726,
    poster: 'https://image.tmdb.org/t/p/w780/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cyecB7godJ6kNHGON0DGLL9e9vP.jpg',
    overview: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique armored suit to fight evil and becomes Iron Man.',
    tagline: 'Heroes aren\'t born. They\'re built.',
    rating: 7.9,
    timelineNotes: 'Set in 2008. The birth of the MCU Sacred Timeline hero era.',
    characters: ['iron-man', 'pepper-potts', 'war-machine', 'obadiah-stane', 'nick-fury'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Gwyneth Paltrow', role: 'Pepper Potts' },
      { name: 'Jeff Bridges', role: 'Obadiah Stane / Iron Monger' },
      { name: 'Terrence Howard', role: 'Lt. Col. James Rhodes' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 8. 2010 - Iron Man 2
  {
    id: 'iron-man-2',
    title: 'Iron Man 2',
    type: 'movie',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2010,
    releaseDate: '2010-05-07',
    releaseOrder: 3,
    chronologicalOrder: 8,
    tmdbId: 10138,
    poster: 'https://image.tmdb.org/t/p/w780/6WBeq40ghManfsMwtaBm5m4EOPg.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/7vKiL49k32aQO762bH1y9x4m7O6.jpg',
    overview: 'Tony Stark faces pressure from the government to share his technology while combating vengeful Russian physicist Ivan Vanko.',
    tagline: 'It\'s not the armor that makes the hero, but the man inside.',
    rating: 7.0,
    timelineNotes: 'Set in Spring 2010. Part of the simultaneous "Fury\'s Big Week" canon overlap with Incredible Hulk and Thor.',
    characters: ['iron-man', 'black-widow', 'war-machine', 'nick-fury', 'whiplash'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow' },
      { name: 'Don Cheadle', role: 'James Rhodes / War Machine' },
      { name: 'Mickey Rourke', role: 'Ivan Vanko / Whiplash' },
      { name: 'Sam Rockwell', role: 'Justin Hammer' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 9. 2010 - The Incredible Hulk
  {
    id: 'the-incredible-hulk',
    title: 'The Incredible Hulk',
    type: 'movie',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2008,
    releaseDate: '2008-06-13',
    releaseOrder: 2,
    chronologicalOrder: 9,
    tmdbId: 1724,
    poster: 'https://image.tmdb.org/t/p/w780/2NAeBcmq6C30c8vNf6Yc2r4dK0i.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/xfBnQ4mgBf1n8K0j1L3n2.jpg',
    overview: 'Scientist Bruce Banner seeks a cure for the beast within while pursued by General Ross and facing the monstrous Abomination.',
    tagline: 'You\'ll like him when he\'s angry.',
    rating: 6.6,
    timelineNotes: 'Set in May 2010 during Fury\'s Big Week, culminating in Harlem battle and Tony Stark\'s bar consultation with Thunderbolt Ross.',
    characters: ['hulk', 'abomination', 'thunderbolt-ross', 'iron-man'],
    cast: [
      { name: 'Edward Norton', role: 'Bruce Banner / The Hulk' },
      { name: 'Liv Tyler', role: 'Betty Ross' },
      { name: 'Tim Roth', role: 'Emil Blonsky / Abomination' },
      { name: 'William Hurt', role: 'General Thaddeus Ross' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 10. The Consultant (One-Shot)
  {
    id: 'one-shot-the-consultant',
    title: 'Marvel One-Shot: The Consultant',
    type: 'one-shot',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2011,
    releaseDate: '2011-09-13',
    releaseOrder: 6,
    chronologicalOrder: 10,
    tmdbId: 76122,
    poster: 'https://image.tmdb.org/t/p/w780/p4zXgD5J1Y1l1q9c0r3e8b.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/p4zXgD5J1Y1l1q9c0r3e8b.jpg',
    overview: 'Agents Coulson and Sitwell conspire to sabotage the World Security Council\'s plan to recruit Emil Blonsky into the Avengers by sending Tony Stark.',
    tagline: 'Behind the scenes of the Avengers Initiative.',
    rating: 6.8,
    timelineNotes: 'Set directly after The Incredible Hulk and Iron Man 2; explains why Tony Stark approached General Ross in the diner.',
    characters: ['phil-coulson', 'jasper-sitwell', 'tony-stark'],
    cast: [
      { name: 'Clark Gregg', role: 'Agent Phil Coulson' },
      { name: 'Maximiliano Hernández', role: 'Agent Jasper Sitwell' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 11. A Funny Thing Happened on the Way to Thor's Hammer
  {
    id: 'one-shot-thors-hammer',
    title: 'Marvel One-Shot: A Funny Thing Happened on the Way to Thor\'s Hammer',
    type: 'one-shot',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2011,
    releaseDate: '2011-10-25',
    releaseOrder: 7,
    chronologicalOrder: 11,
    tmdbId: 76121,
    poster: 'https://image.tmdb.org/t/p/w780/wPq3b8k4r9e0m1l2n3.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/wPq3b8k4r9e0m1l2n3.jpg',
    overview: 'En route to New Mexico to investigate Mjolnir\'s crater, Agent Coulson stops a gas station robbery with lethal SHIELD training.',
    tagline: 'Never underestimate Agent Coulson.',
    rating: 7.1,
    timelineNotes: 'Set in May 2010; directly bridges Iron Man 2 and Thor during Agent Coulson\'s drive across the desert.',
    characters: ['phil-coulson'],
    cast: [{ name: 'Clark Gregg', role: 'Agent Phil Coulson' }],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 12. Thor (2010)
  {
    id: 'thor',
    title: 'Thor',
    type: 'movie',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2011,
    releaseDate: '2011-05-06',
    releaseOrder: 4,
    chronologicalOrder: 12,
    tmdbId: 10195,
    poster: 'https://image.tmdb.org/t/p/w780/prSfAi1xGrhLQNxVSUFh61xQ4Qx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/3SDoMt3uC1x1IqT6c.jpg',
    overview: 'Arrogant Asgardian warrior Thor is stripped of his divine powers and banished to Earth, where he must prove worthy to lift Mjolnir.',
    tagline: 'The courage to be more than a warrior.',
    rating: 7.0,
    timelineNotes: 'Set during Fury\'s Big Week in May 2010. Introduces Asgard, Loki, the Bifrost, and Hawkeye cameo.',
    characters: ['thor', 'loki', 'odin', 'jane-foster', 'hawkeye', 'phil-coulson'],
    cast: [
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Tom Hiddleston', role: 'Loki' },
      { name: 'Natalie Portman', role: 'Jane Foster' },
      { name: 'Anthony Hopkins', role: 'Odin Borson' },
      { name: 'Jeremy Renner', role: 'Clint Barton / Hawkeye' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 13. The Avengers (2012)
  {
    id: 'the-avengers',
    title: 'The Avengers',
    type: 'movie',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2012,
    releaseDate: '2012-05-04',
    releaseOrder: 8,
    chronologicalOrder: 13,
    tmdbId: 24428,
    poster: 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr242PD7xwmjaTn9.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
    overview: 'Nick Fury assembles Earth\'s mightiest heroes to battle Loki and his alien Chitauri army during the cataclysmic Battle of New York.',
    tagline: 'Some assembly required.',
    rating: 8.0,
    timelineNotes: 'Set in May 2012. The monumental climax of Phase 1 and inception of the Avengers team.',
    characters: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'loki', 'nick-fury'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / The Hulk' },
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow' },
      { name: 'Jeremy Renner', role: 'Clint Barton / Hawkeye' },
      { name: 'Tom Hiddleston', role: 'Loki' },
      { name: 'Samuel L. Jackson', role: 'Nick Fury' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 14. Item 47 (One-Shot)
  {
    id: 'one-shot-item-47',
    title: 'Marvel One-Shot: Item 47',
    type: 'one-shot',
    phase: 'Phase 1',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2012,
    releaseDate: '2012-09-25',
    releaseOrder: 9,
    chronologicalOrder: 14,
    tmdbId: 119569,
    poster: 'https://image.tmdb.org/t/p/w780/u6lVqR9M7c8F0b2.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/u6lVqR9M7c8F0b2.jpg',
    overview: 'A down-on-their-luck couple recovers a discarded Chitauri energy blaster from the Battle of New York and embarks on a bank-robbing spree.',
    tagline: 'Alien technology in human hands.',
    rating: 6.7,
    timelineNotes: 'Set in mid-2012 in the immediate aftermath of the Battle of New York.',
    characters: ['jasper-sitwell', 'felix-blake'],
    cast: [
      { name: 'Lizzy Caplan', role: 'Claire Weiss' },
      { name: 'Jesse Bradford', role: 'Bennie Pollock' },
      { name: 'Titus Welliver', role: 'Agent Felix Blake' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 15. Thor: The Dark World (2013)
  {
    id: 'thor-the-dark-world',
    title: 'Thor: The Dark World',
    type: 'movie',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2013,
    releaseDate: '2013-11-08',
    releaseOrder: 12,
    chronologicalOrder: 15,
    tmdbId: 76338,
    poster: 'https://image.tmdb.org/t/p/w780/wp6OxE4poJ4G7c0.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/3f3g0vG1r2Y4j.jpg',
    overview: 'Thor battles the ancient Dark Elf Malekith, who seeks to plunge the universe into eternal darkness using the Reality Stone (Aether).',
    tagline: 'Your world will fall.',
    rating: 6.8,
    timelineNotes: 'Set in Autumn 2013 during the Convergence of the Nine Realms. Reveals the Reality Stone.',
    characters: ['thor', 'loki', 'jane-foster', 'odin', 'malekith', 'heimdall'],
    cast: [
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Natalie Portman', role: 'Jane Foster' },
      { name: 'Tom Hiddleston', role: 'Loki' },
      { name: 'Christopher Eccleston', role: 'Malekith' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 16. Iron Man 3 (Holiday 2013)
  {
    id: 'iron-man-3',
    title: 'Iron Man 3',
    type: 'movie',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2013,
    releaseDate: '2013-05-03',
    releaseOrder: 10,
    chronologicalOrder: 16,
    tmdbId: 68721,
    poster: 'https://image.tmdb.org/t/p/w780/qhPtAc1TKbMPqNvcdXS46umwh98.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/fn4n6uOYcB6Uh895N1sN5c.jpg',
    overview: 'Plagued by PTSD following the Battle of New York, Tony Stark faces terrorist mastermind the Mandarin and Aldrich Killian\'s Extremis.',
    tagline: 'Unleash the power behind the armor.',
    rating: 7.2,
    timelineNotes: 'Set during Christmas 2013, dealing with Tony\'s psychological recovery after New York.',
    characters: ['iron-man', 'pepper-potts', 'war-machine', 'aldrich-killian', 'trevor-slattery'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Gwyneth Paltrow', role: 'Pepper Potts' },
      { name: 'Guy Pearce', role: 'Aldrich Killian' },
      { name: 'Ben Kingsley', role: 'Trevor Slattery' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 17. All Hail the King (One-Shot)
  {
    id: 'one-shot-all-hail-the-king',
    title: 'Marvel One-Shot: All Hail the King',
    type: 'one-shot',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2014,
    releaseDate: '2014-02-04',
    releaseOrder: 13,
    chronologicalOrder: 17,
    tmdbId: 253412,
    poster: 'https://image.tmdb.org/t/p/w780/h9Y0a2Z5c1.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/h9Y0a2Z5c1.jpg',
    overview: 'Imprisoned in Seagate Prison, fake Mandarin Trevor Slattery is interviewed by a documentary filmmaker who serves the real Ten Rings leader.',
    tagline: 'The true Mandarin is watching.',
    rating: 7.2,
    timelineNotes: 'Set in early 2014; foreshadows Xu Wenwu and the authentic Ten Rings organization revealed in Shang-Chi.',
    characters: ['trevor-slattery', 'justin-hammer'],
    cast: [
      { name: 'Ben Kingsley', role: 'Trevor Slattery' },
      { name: 'Scoot McNairy', role: 'Jackson Norriss' },
      { name: 'Sam Rockwell', role: 'Justin Hammer' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 18. Captain America: The Winter Soldier (2014)
  {
    id: 'captain-america-winter-soldier',
    title: 'Captain America: The Winter Soldier',
    type: 'movie',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2014,
    releaseDate: '2014-04-04',
    releaseOrder: 14,
    chronologicalOrder: 18,
    tmdbId: 100402,
    poster: 'https://image.tmdb.org/t/p/w780/tVFRpFw3xTed52eSueW05PCidYq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/4W4d.jpg',
    overview: 'Steve Rogers and Natasha Romanoff uncover Hydra infiltration inside S.H.I.E.L.D. while pursued by a lethal ghost assassin from Steve\'s past.',
    tagline: 'In heroes we trust.',
    rating: 7.8,
    timelineNotes: 'Set in Spring 2014. Causes the collapse of S.H.I.E.L.D. and re-introduces Bucky Barnes as the Winter Soldier.',
    characters: ['captain-america', 'black-widow', 'falcon', 'bucky-barnes', 'nick-fury', 'alexander-pierce'],
    cast: [
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow' },
      { name: 'Sebastian Stan', role: 'Bucky Barnes / Winter Soldier' },
      { name: 'Anthony Mackie', role: 'Sam Wilson / Falcon' },
      { name: 'Robert Redford', role: 'Alexander Pierce' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 19. Guardians of the Galaxy (2014)
  {
    id: 'guardians-of-the-galaxy',
    title: 'Guardians of the Galaxy',
    type: 'movie',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2014,
    releaseDate: '2014-08-01',
    releaseOrder: 16,
    chronologicalOrder: 19,
    tmdbId: 118340,
    poster: 'https://image.tmdb.org/t/p/w780/r7vmZjiyZw9rpJMQJdXOsL625L7.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/uLtV6DG.jpg',
    overview: 'Peter Quill forms an alliance with a team of extraterrestrial misfits to stop Ronan the Accuser from using the Power Stone to destroy Xandar.',
    tagline: 'All heroes have to start somewhere.',
    rating: 8.0,
    timelineNotes: 'Set in 2014 across the Andromeda galaxy. Introduces the cosmic sector and the Power Stone.',
    characters: ['star-lord', 'gamora', 'drax', 'rocket-raccoon', 'groot', 'ronan', 'thanos'],
    cast: [
      { name: 'Chris Pratt', role: 'Peter Quill / Star-Lord' },
      { name: 'Zoe Saldana', role: 'Gamora' },
      { name: 'Dave Bautista', role: 'Drax the Destroyer' },
      { name: 'Vin Diesel', role: 'Groot (Voice)' },
      { name: 'Bradley Cooper', role: 'Rocket (Voice)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 20. Guardians of the Galaxy Vol. 2 (Late 2014)
  {
    id: 'guardians-of-the-galaxy-vol-2',
    title: 'Guardians of the Galaxy Vol. 2',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2017,
    releaseDate: '2017-05-05',
    releaseOrder: 22,
    chronologicalOrder: 20,
    tmdbId: 283995,
    poster: 'https://image.tmdb.org/t/p/w780/y4MBh0EjBlMuOzv9QCZYZahHqqb.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/aJn9XKi8q.jpg',
    overview: 'The Guardians travel across the cosmos as they help Peter Quill learn more about his mysterious celestial father, Ego the Living Planet.',
    tagline: 'Obviously.',
    rating: 7.7,
    timelineNotes: 'Set in late 2014, roughly six months after Vol. 1. Precedes Phase 3 chronologically despite its 2017 release date.',
    characters: ['star-lord', 'gamora', 'drax', 'rocket-raccoon', 'groot', 'yondu', 'nebula', 'mantis', 'ego'],
    cast: [
      { name: 'Chris Pratt', role: 'Peter Quill / Star-Lord' },
      { name: 'Zoe Saldana', role: 'Gamora' },
      { name: 'Kurt Russell', role: 'Ego' },
      { name: 'Michael Rooker', role: 'Yondu Udonta' },
      { name: 'Pom Klementieff', role: 'Mantis' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 21. I Am Groot Season 1 (2014)
  {
    id: 'i-am-groot-s1',
    title: 'I Am Groot (Season 1)',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-08-10',
    releaseOrder: 49,
    chronologicalOrder: 21,
    tmdbId: 232125,
    poster: 'https://image.tmdb.org/t/p/w780/x5Xh0z3p12.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/x5Xh0z3p12.jpg',
    overview: 'A collection of five original shorts featuring Baby Groot growing up among the stars and getting into mischief.',
    tagline: 'A hero of few words.',
    rating: 7.3,
    seasonNumber: 1,
    timelineNotes: 'Takes place in late 2014 during Baby Groot\'s post-Vol. 1 toddler era.',
    characters: ['groot', 'rocket-raccoon'],
    cast: [
      { name: 'Vin Diesel', role: 'Baby Groot (Voice)' },
      { name: 'Bradley Cooper', role: 'Rocket (Voice)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 22. I Am Groot Season 2 (2014)
  {
    id: 'i-am-groot-s2',
    title: 'I Am Groot (Season 2)',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2023,
    releaseDate: '2023-09-06',
    releaseOrder: 61,
    chronologicalOrder: 22,
    tmdbId: 232125,
    poster: 'https://image.tmdb.org/t/p/w780/x5Xh0z3p12.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/x5Xh0z3p12.jpg',
    overview: 'Baby Groot explores the universe and beyond aboard the Guardians\' spaceships, meeting strange creatures and sniffing novel scents.',
    tagline: 'Tiny hero, giant mischief.',
    rating: 7.1,
    seasonNumber: 2,
    timelineNotes: 'Continues Baby Groot\'s adventures across 2014 before his teenage growth spurt.',
    characters: ['groot'],
    cast: [{ name: 'Vin Diesel', role: 'Baby Groot (Voice)' }],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 23. Daredevil Season 1 (Late 2014)
  {
    id: 'daredevil-s1',
    title: 'Daredevil (Season 1)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2015,
    releaseDate: '2015-04-10',
    releaseOrder: 17,
    chronologicalOrder: 23,
    tmdbId: 61889,
    poster: 'https://image.tmdb.org/t/p/w780/QWbPaDxiB6LW2v.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/QWbPaDxiB6LW2v.jpg',
    overview: 'Blind lawyer Matt Murdock fights for justice by day and takes to Hell\'s Kitchen streets by night as the masked vigilante Daredevil against Wilson Fisk.',
    tagline: 'Justice is blind.',
    rating: 8.6,
    seasonNumber: 1,
    timelineNotes: 'Set in Autumn 2014 in the criminal underworld of post-Battle of New York Hell\'s Kitchen. Officially confirmed canon to the MCU Sacred Timeline.',
    characters: ['daredevil', 'kingpin', 'foggy-nelson', 'karen-page'],
    cast: [
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' },
      { name: 'Vincent D\'Onofrio', role: 'Wilson Fisk / Kingpin' },
      { name: 'Deborah Ann Woll', role: 'Karen Page' },
      { name: 'Elden Henson', role: 'Foggy Nelson' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 24. Jessica Jones Season 1 (Early 2015)
  {
    id: 'jessica-jones-s1',
    title: 'Jessica Jones (Season 1)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2015,
    releaseDate: '2015-11-20',
    releaseOrder: 18,
    chronologicalOrder: 24,
    tmdbId: 38472,
    poster: 'https://image.tmdb.org/t/p/w780/c1tW3k4p5x.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/c1tW3k4p5x.jpg',
    overview: 'Haunted by trauma, private investigator Jessica Jones uses her super-strength to battle mind-controlling tormentor Kilgrave.',
    tagline: 'No cape. No tights. Just trouble.',
    rating: 8.2,
    seasonNumber: 1,
    timelineNotes: 'Set in early 2015. Introduces Luke Cage and Hell\'s Kitchen private investigator Jessica Jones.',
    characters: ['jessica-jones', 'luke-cage', 'kilgrave', 'trish-walker'],
    cast: [
      { name: 'Krysten Ritter', role: 'Jessica Jones' },
      { name: 'David Tennant', role: 'Kilgrave' },
      { name: 'Mike Colter', role: 'Luke Cage' },
      { name: 'Rachael Taylor', role: 'Trish Walker' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 25. Avengers: Age of Ultron (Spring 2015)
  {
    id: 'avengers-age-of-ultron',
    title: 'Avengers: Age of Ultron',
    type: 'movie',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2015,
    releaseDate: '2015-05-01',
    releaseOrder: 20,
    chronologicalOrder: 25,
    tmdbId: 99861,
    poster: 'https://image.tmdb.org/t/p/w780/4ssDVuGhLaqqBgQes.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/8uO0gUM8a.jpg',
    overview: 'When Tony Stark and Bruce Banner inadvertently create rogue AI Ultron, the Avengers must reunite to stop his apocalyptic plan in Sokovia.',
    tagline: 'A new age begins.',
    rating: 7.6,
    timelineNotes: 'Set in Spring 2015. Introduces Wanda Maximoff, Vision, the Mind Stone, and the birth of the Sokovia Accords catalyst.',
    characters: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'scarlet-witch', 'vision', 'ultron', 'quicksilver'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / The Hulk' },
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Elizabeth Olsen', role: 'Wanda Maximoff / Scarlet Witch' },
      { name: 'Paul Bettany', role: 'Vision' },
      { name: 'James Spader', role: 'Ultron (Voice)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 26. Ant-Man (Summer 2015)
  {
    id: 'ant-man',
    title: 'Ant-Man',
    type: 'movie',
    phase: 'Phase 2',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2015,
    releaseDate: '2015-07-17',
    releaseOrder: 21,
    chronologicalOrder: 26,
    tmdbId: 102899,
    poster: 'https://image.tmdb.org/t/p/w780/rQRnQikMG.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/7FW.jpg',
    overview: 'Cat burglar Scott Lang is recruited by Dr. Hank Pym to don the shrinking Ant-Man suit and pull off a heist against Darren Cross.',
    tagline: 'Heroes don\'t get any bigger.',
    rating: 7.4,
    timelineNotes: 'Set in Summer 2015. The official conclusion to Phase 2; introduces the Quantum Realm and Pym Particles.',
    characters: ['ant-man', 'hank-pym', 'hope-van-dyne', 'yellowjacket', 'falcon'],
    cast: [
      { name: 'Paul Rudd', role: 'Scott Lang / Ant-Man' },
      { name: 'Michael Douglas', role: 'Dr. Hank Pym' },
      { name: 'Evangeline Lilly', role: 'Hope van Dyne' },
      { name: 'Corey Stoll', role: 'Darren Cross / Yellowjacket' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 27. Daredevil Season 2 (Late 2015)
  {
    id: 'daredevil-s2',
    title: 'Daredevil (Season 2)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2016,
    releaseDate: '2016-03-18',
    releaseOrder: 23,
    chronologicalOrder: 27,
    tmdbId: 61889,
    poster: 'https://image.tmdb.org/t/p/w780/QWbPaDxiB6LW2v.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/QWbPaDxiB6LW2v.jpg',
    overview: 'Matt Murdock faces ruthless vigilante Frank Castle (The Punisher) while his ex-lover Elektra returns with a warning about The Hand.',
    tagline: 'An ancient war reaches New York.',
    rating: 8.5,
    seasonNumber: 2,
    timelineNotes: 'Set in Autumn-Winter 2015; introduces Frank Castle (The Punisher) and Elektra Natchios.',
    characters: ['daredevil', 'punisher', 'elektra', 'foggy-nelson', 'karen-page'],
    cast: [
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' },
      { name: 'Jon Bernthal', role: 'Frank Castle / The Punisher' },
      { name: 'Elodie Yung', role: 'Elektra Natchios' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 28. Luke Cage Season 1 (Late 2015)
  {
    id: 'luke-cage-s1',
    title: 'Luke Cage (Season 1)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2016,
    releaseDate: '2016-09-30',
    releaseOrder: 25,
    chronologicalOrder: 28,
    tmdbId: 67070,
    poster: 'https://image.tmdb.org/t/p/w780/9yH50b4.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/9yH50b4.jpg',
    overview: 'A bulletproof former convict fights to clear his name and defend Harlem from crime boss Cornell Cottonmouth Stokes and Diamondback.',
    tagline: 'Sweet sister, you can\'t break a bulletproof man.',
    rating: 7.7,
    seasonNumber: 1,
    timelineNotes: 'Set in late 2015; takes place in Harlem concurrently with Daredevil Season 2 events.',
    characters: ['luke-cage', 'cottonmouth', 'misty-knight', 'claire-temple'],
    cast: [
      { name: 'Mike Colter', role: 'Luke Cage' },
      { name: 'Mahershala Ali', role: 'Cornell "Cottonmouth" Stokes' },
      { name: 'Simone Missick', role: 'Misty Knight' },
      { name: 'Rosario Dawson', role: 'Claire Temple' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 29. Iron Fist Season 1 (Spring 2016)
  {
    id: 'iron-fist-s1',
    title: 'Iron Fist (Season 1)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2017,
    releaseDate: '2017-03-17',
    releaseOrder: 28,
    chronologicalOrder: 29,
    tmdbId: 62127,
    poster: 'https://image.tmdb.org/t/p/w780/c8Zq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/c8Zq.jpg',
    overview: 'After 15 years presumed dead, Danny Rand returns to NYC to reclaim his family company with the mystical power of the Iron Fist.',
    tagline: 'His fist is like unto a thing of iron.',
    rating: 6.9,
    seasonNumber: 1,
    timelineNotes: 'Set in early Spring 2016; directly sets the board for The Defenders crossover.',
    characters: ['iron-fist', 'colleen-wing', 'claire-temple'],
    cast: [
      { name: 'Finn Jones', role: 'Danny Rand / Iron Fist' },
      { name: 'Jessica Henwick', role: 'Colleen Wing' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 30. The Defenders (Mid 2016)
  {
    id: 'the-defenders',
    title: 'The Defenders',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2017,
    releaseDate: '2017-08-18',
    releaseOrder: 31,
    chronologicalOrder: 30,
    tmdbId: 62285,
    poster: 'https://image.tmdb.org/t/p/w780/jH0.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/jH0.jpg',
    overview: 'Daredevil, Jessica Jones, Luke Cage, and Iron Fist unite as an unconventional team to save New York City from the ancient cabal of The Hand.',
    tagline: 'Defend your street.',
    rating: 7.9,
    seasonNumber: 1,
    timelineNotes: 'Set in May 2016; concludes The Hand saga under Midland Circle and leads to Matt Murdock presumed dead.',
    characters: ['daredevil', 'jessica-jones', 'luke-cage', 'iron-fist', 'elektra', 'stick'],
    cast: [
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' },
      { name: 'Krysten Ritter', role: 'Jessica Jones' },
      { name: 'Mike Colter', role: 'Luke Cage' },
      { name: 'Finn Jones', role: 'Danny Rand / Iron Fist' },
      { name: 'Sigourney Weaver', role: 'Alexandra Reid' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 31. Captain America: Civil War (Spring 2016)
  {
    id: 'captain-america-civil-war',
    title: 'Captain America: Civil War',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2016,
    releaseDate: '2016-05-06',
    releaseOrder: 24,
    chronologicalOrder: 31,
    tmdbId: 271110,
    poster: 'https://image.tmdb.org/t/p/w780/rAGi1FiLWqu7xNCE49970GDne2C.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/kv7n5.jpg',
    overview: 'Political pressure over the Sokovia Accords causes a bitter ideological rift between Steve Rogers and Tony Stark, shattering the Avengers.',
    tagline: 'Divided we fall.',
    rating: 8.1,
    timelineNotes: 'Set in June 2016. Fractures the Avengers and introduces Black Panther and Spider-Man to the MCU.',
    characters: ['captain-america', 'iron-man', 'black-widow', 'winter-soldier', 'falcon', 'war-machine', 'hawkeye', 'black-panther', 'spider-man', 'ant-man'],
    cast: [
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow' },
      { name: 'Sebastian Stan', role: 'Bucky Barnes / Winter Soldier' },
      { name: 'Chadwick Boseman', role: 'T\'Challa / Black Panther' },
      { name: 'Tom Holland', role: 'Peter Parker / Spider-Man' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 32. Black Widow (Summer 2016)
  {
    id: 'black-widow',
    title: 'Black Widow',
    type: 'movie',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-07-09',
    releaseOrder: 39,
    chronologicalOrder: 32,
    tmdbId: 497698,
    poster: 'https://image.tmdb.org/t/p/w780/qAZ0whBHrSoFmJR8J2.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/keI.jpg',
    overview: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her Red Room past arises.',
    tagline: 'She\'s done running from her past.',
    rating: 7.3,
    timelineNotes: 'Set immediately following Captain America: Civil War in Summer 2016 before Natasha reunites with Steve Rogers on the run.',
    characters: ['black-widow', 'yelena-belova', 'red-guardian', 'melina-vostokoff', 'taskmaster'],
    cast: [
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow' },
      { name: 'Florence Pugh', role: 'Yelena Belova' },
      { name: 'David Harbour', role: 'Alexei Shostakov / Red Guardian' },
      { name: 'Rachel Weisz', role: 'Melina Vostokoff' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 33. Black Panther (Summer 2016)
  {
    id: 'black-panther',
    title: 'Black Panther',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2018,
    releaseDate: '2018-02-16',
    releaseOrder: 33,
    chronologicalOrder: 33,
    tmdbId: 284054,
    poster: 'https://image.tmdb.org/t/p/w780/uxzzxijgPIY7slzFv9G.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/6ELoo.jpg',
    overview: 'T\'Challa returns home to isolated, technologically advanced Wakanda to claim his throne as king, but is challenged by Erik Killmonger.',
    tagline: 'Long live the king.',
    rating: 8.1,
    timelineNotes: 'Set one week after King T\'Chaka\'s death in Captain America: Civil War (Summer 2016).',
    characters: ['black-panther', 'killmonger', 'nakia', 'okoye', 'shuri', 'm-baku'],
    cast: [
      { name: 'Chadwick Boseman', role: 'T\'Challa / Black Panther' },
      { name: 'Michael B. Jordan', role: 'Erik Killmonger' },
      { name: 'Lupita Nyong\'o', role: 'Nakia' },
      { name: 'Danai Gurira', role: 'Okoye' },
      { name: 'Letitia Wright', role: 'Shuri' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 34. Spider-Man: Homecoming (Fall 2016)
  {
    id: 'spider-man-homecoming',
    title: 'Spider-Man: Homecoming',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2017,
    releaseDate: '2017-07-07',
    releaseOrder: 30,
    chronologicalOrder: 34,
    tmdbId: 315635,
    poster: 'https://image.tmdb.org/t/p/w780/c24sv2weTHPsmDa7jY.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/vc8VM.jpg',
    overview: 'Peter Parker balances high school life with his web-slinging alter-ego, guided by mentor Tony Stark as he confronts Adrian Toomes (Vulture).',
    tagline: 'Homework can wait. The city can\'t.',
    rating: 7.7,
    timelineNotes: 'Set in Autumn 2016, approximately two months after the Germany airport battle in Civil War.',
    characters: ['spider-man', 'iron-man', 'vulture', 'ned-leeds', 'happy-hogan'],
    cast: [
      { name: 'Tom Holland', role: 'Peter Parker / Spider-Man' },
      { name: 'Michael Keaton', role: 'Adrian Toomes / Vulture' },
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Marisa Tomei', role: 'May Parker' },
      { name: 'Zendaya', role: 'Michelle Jones (MJ)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 35. The Punisher Season 1 (Late 2016)
  {
    id: 'the-punisher-s1',
    title: 'The Punisher (Season 1)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2017,
    releaseDate: '2017-11-17',
    releaseOrder: 32,
    chronologicalOrder: 35,
    tmdbId: 67178,
    poster: 'https://image.tmdb.org/t/p/w780/x.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/x.jpg',
    overview: 'After exacting revenge on those responsible for his family\'s murder, Frank Castle uncovers a far deeper military conspiracy.',
    tagline: 'Truth must be taken.',
    rating: 8.5,
    seasonNumber: 1,
    timelineNotes: 'Set in November 2016; follows Frank Castle\'s journey after the trial of the century in Daredevil S2.',
    characters: ['punisher', 'billy-russo', 'karen-page'],
    cast: [
      { name: 'Jon Bernthal', role: 'Frank Castle / The Punisher' },
      { name: 'Ben Barnes', role: 'Billy Russo' },
      { name: 'Amber Rose Revah', role: 'Dinah Madani' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 36. Doctor Strange (2016 - early 2017)
  {
    id: 'doctor-strange',
    title: 'Doctor Strange',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2016,
    releaseDate: '2016-11-04',
    releaseOrder: 26,
    chronologicalOrder: 36,
    tmdbId: 284052,
    poster: 'https://image.tmdb.org/t/p/w780/uGBVj3bEbCoZbDjjl9wEi.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/tFI85.jpg',
    overview: 'After a car crash shatters his hands, brilliant neurosurgeon Stephen Strange travels to Kamar-Taj to unlock the mystic arts and the Time Stone.',
    tagline: 'Open your mind. Change your reality.',
    rating: 7.7,
    timelineNotes: 'Begins in early 2016 with Strange\'s car accident, progressing through extensive training in Kamar-Taj until early 2017.',
    characters: ['doctor-strange', 'ancient-one', 'wong', 'mordo', 'kaecilius', 'dormammu'],
    cast: [
      { name: 'Benedict Cumberbatch', role: 'Dr. Stephen Strange' },
      { name: 'Chiwetel Ejiofor', role: 'Karl Mordo' },
      { name: 'Rachel McAdams', role: 'Christine Palmer' },
      { name: 'Benedict Wong', role: 'Wong' },
      { name: 'Tilda Swinton', role: 'The Ancient One' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 37. Jessica Jones Season 2 (Early 2017)
  {
    id: 'jessica-jones-s2',
    title: 'Jessica Jones (Season 2)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2018,
    releaseDate: '2018-03-08',
    releaseOrder: 34,
    chronologicalOrder: 37,
    tmdbId: 38472,
    poster: 'https://image.tmdb.org/t/p/w780/c1tW3k4p5x.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/c1tW3k4p5x.jpg',
    overview: 'Jessica Jones begins digging into the origins of IGH, the secret biotechnology company responsible for her superhuman abilities.',
    tagline: 'Family is complicated.',
    rating: 7.6,
    seasonNumber: 2,
    timelineNotes: 'Set in early 2017; follows the trauma of Midland Circle and Kilgrave\'s death.',
    characters: ['jessica-jones', 'trish-walker', 'jeri-hogarth'],
    cast: [
      { name: 'Krysten Ritter', role: 'Jessica Jones' },
      { name: 'Rachael Taylor', role: 'Trish Walker' },
      { name: 'Janet McTeer', role: 'Alisa Jones' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 38. Luke Cage Season 2 (Mid 2017)
  {
    id: 'luke-cage-s2',
    title: 'Luke Cage (Season 2)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2018,
    releaseDate: '2018-06-22',
    releaseOrder: 36,
    chronologicalOrder: 38,
    tmdbId: 67070,
    poster: 'https://image.tmdb.org/t/p/w780/9yH50b4.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/9yH50b4.jpg',
    overview: 'Having cleared his name, Luke becomes a Harlem celebrity before facing Bushmaster, a powerful Jamaican warrior empowered by nightshade.',
    tagline: 'Harlem\'s hero.',
    rating: 7.5,
    seasonNumber: 2,
    timelineNotes: 'Set in mid-2017; features Danny Rand (Iron Fist) guest appearance.',
    characters: ['luke-cage', 'bushmaster', 'mariah-dillard', 'misty-knight'],
    cast: [
      { name: 'Mike Colter', role: 'Luke Cage' },
      { name: 'Mustafa Shakir', role: 'John McIver / Bushmaster' },
      { name: 'Alfre Woodard', role: 'Mariah Dillard' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 39. Iron Fist Season 2 (Late 2017)
  {
    id: 'iron-fist-s2',
    title: 'Iron Fist (Season 2)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2018,
    releaseDate: '2018-09-07',
    releaseOrder: 37,
    chronologicalOrder: 39,
    tmdbId: 62127,
    poster: 'https://image.tmdb.org/t/p/w780/c8Zq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/c8Zq.jpg',
    overview: 'Danny Rand protects Chinatown from a brewing gang war while his former friend Davos steals the power of the Iron Fist.',
    tagline: 'The dragon awakes.',
    rating: 7.2,
    seasonNumber: 2,
    timelineNotes: 'Set in late 2017; Colleen Wing channels the fist of K\'un-Lun.',
    characters: ['iron-fist', 'colleen-wing', 'davos', 'misty-knight'],
    cast: [
      { name: 'Finn Jones', role: 'Danny Rand / Iron Fist' },
      { name: 'Jessica Henwick', role: 'Colleen Wing' },
      { name: 'Sacha Dhawan', role: 'Davos / Steel Serpent' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 40. Daredevil Season 3 (Late 2017)
  {
    id: 'daredevil-s3',
    title: 'Daredevil (Season 3)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2018,
    releaseDate: '2018-10-19',
    releaseOrder: 38,
    chronologicalOrder: 40,
    tmdbId: 61889,
    poster: 'https://image.tmdb.org/t/p/w780/QWbPaDxiB6LW2v.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/QWbPaDxiB6LW2v.jpg',
    overview: 'Broken and questioning his faith after Midland Circle, Matt Murdock resurfaces just as Wilson Fisk manipulates the FBI and unleashes Bullseye.',
    tagline: 'Let there be darkness.',
    rating: 8.8,
    seasonNumber: 3,
    timelineNotes: 'Set in late 2017; culminates the rivalry between Matt Murdock and Wilson Fisk prior to the Blip.',
    characters: ['daredevil', 'kingpin', 'bullseye', 'foggy-nelson', 'karen-page'],
    cast: [
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' },
      { name: 'Vincent D\'Onofrio', role: 'Wilson Fisk / Kingpin' },
      { name: 'Wilson Bethel', role: 'Dex / Bullseye' },
      { name: 'Deborah Ann Woll', role: 'Karen Page' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 41. The Punisher Season 2 (Early 2018)
  {
    id: 'the-punisher-s2',
    title: 'The Punisher (Season 2)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2019,
    releaseDate: '2019-01-18',
    releaseOrder: 40,
    chronologicalOrder: 41,
    tmdbId: 67178,
    poster: 'https://image.tmdb.org/t/p/w780/x.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/x.jpg',
    overview: 'Living quietly off the grid, Frank Castle is pulled back into violence to protect an endangered teenager from fundamentalist assassin John Pilgrim.',
    tagline: 'Back in the crosshairs.',
    rating: 8.1,
    seasonNumber: 2,
    timelineNotes: 'Set in early 2018 across Michigan and New York City.',
    characters: ['punisher', 'billy-russo', 'amy-blix'],
    cast: [
      { name: 'Jon Bernthal', role: 'Frank Castle / The Punisher' },
      { name: 'Ben Barnes', role: 'Billy Russo / Jigsaw' },
      { name: 'Giorgia Whigham', role: 'Amy Bendix' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 42. Jessica Jones Season 3 (Mid 2018)
  {
    id: 'jessica-jones-s3',
    title: 'Jessica Jones (Season 3)',
    type: 'series',
    phase: 'Defenders',
    saga: 'The Defenders Saga',
    continuity: 'Sacred Timeline',
    year: 2019,
    releaseDate: '2019-06-14',
    releaseOrder: 41,
    chronologicalOrder: 42,
    tmdbId: 38472,
    poster: 'https://image.tmdb.org/t/p/w780/c1tW3k4p5x.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/c1tW3k4p5x.jpg',
    overview: 'Jessica Jones crosses paths with brilliant psychopath Gregory Salinger while grappling with Trish Walker\'s descent into lethal vigilante justice.',
    tagline: 'Everything costs something.',
    rating: 7.7,
    seasonNumber: 3,
    timelineNotes: 'Set in mid-2018; finishes just prior to the Thanos snap in Wakanda.',
    characters: ['jessica-jones', 'trish-walker', 'gregory-salinger'],
    cast: [
      { name: 'Krysten Ritter', role: 'Jessica Jones' },
      { name: 'Rachael Taylor', role: 'Trish Walker / Hellcat' },
      { name: 'Jeremy Bobb', role: 'Gregory Salinger' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 43. Thor: Ragnarok (Late 2017)
  {
    id: 'thor-ragnarok',
    title: 'Thor: Ragnarok',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2017,
    releaseDate: '2017-11-03',
    releaseOrder: 29,
    chronologicalOrder: 43,
    tmdbId: 284053,
    poster: 'https://image.tmdb.org/t/p/w780/rzRwTcFvttcN1ZpX2xv4jpoY0Ky.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/kaIfm5v07g.jpg',
    overview: 'Imprisoned on garbage planet Sakaar without his hammer, Thor must race against time to stop his murderous sister Hela from destroying Asgard.',
    tagline: 'No hammer. No problem.',
    rating: 7.9,
    timelineNotes: 'Set in late 2017. Post-credits scene links directly into the opening seconds of Avengers: Infinity War.',
    characters: ['thor', 'loki', 'hulk', 'valkyrie', 'hela', 'odin', 'heimdall', 'grandmaster'],
    cast: [
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Tom Hiddleston', role: 'Loki' },
      { name: 'Cate Blanchett', role: 'Hela' },
      { name: 'Tessa Thompson', role: 'Valkyrie' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / The Hulk' },
      { name: 'Jeff Goldblum', role: 'Grandmaster' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 44. Ant-Man and the Wasp (Spring 2018)
  {
    id: 'ant-man-and-the-wasp',
    title: 'Ant-Man and the Wasp',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2018,
    releaseDate: '2018-07-06',
    releaseOrder: 35,
    chronologicalOrder: 44,
    tmdbId: 363088,
    poster: 'https://image.tmdb.org/t/p/w780/eivQmS3wqz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/6xK.jpg',
    overview: 'As Scott Lang balances fatherhood and house arrest, Hope van Dyne and Hank Pym present an urgent mission into the Quantum Realm to rescue Janet.',
    tagline: 'Real heroes. Not actual size.',
    rating: 7.2,
    timelineNotes: 'Takes place in Spring 2018 leading directly up to the Snap; the post-credits scene traps Scott in the Quantum Realm.',
    characters: ['ant-man', 'wasp', 'hank-pym', 'janet-van-dyne', 'ghost'],
    cast: [
      { name: 'Paul Rudd', role: 'Scott Lang / Ant-Man' },
      { name: 'Evangeline Lilly', role: 'Hope van Dyne / Wasp' },
      { name: 'Michael Douglas', role: 'Dr. Hank Pym' },
      { name: 'Michelle Pfeiffer', role: 'Janet van Dyne' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 45. Avengers: Infinity War (Spring 2018)
  {
    id: 'avengers-infinity-war',
    title: 'Avengers: Infinity War',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2018,
    releaseDate: '2018-04-27',
    releaseOrder: 34,
    chronologicalOrder: 45,
    tmdbId: 299536,
    poster: 'https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/bOGkgRGdwhJ.jpg',
    overview: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation wipes out half the universe.',
    tagline: 'An entire universe. Once and for all.',
    rating: 8.4,
    timelineNotes: 'Set in Spring 2018 over two relentless days. Thanos collects all six Infinity Stones and executes The Snap ("The Blip").',
    characters: ['thanos', 'iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'doctor-strange', 'spider-man', 'black-panther', 'scarlet-witch'],
    cast: [
      { name: 'Josh Brolin', role: 'Thanos' },
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / The Hulk' },
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Benedict Cumberbatch', role: 'Dr. Stephen Strange' },
      { name: 'Tom Holland', role: 'Peter Parker / Spider-Man' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 46. Avengers: Endgame (2018 - 2023)
  {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2019,
    releaseDate: '2019-04-26',
    releaseOrder: 42,
    chronologicalOrder: 46,
    tmdbId: 299534,
    poster: 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXt.jpg',
    overview: 'Five years after the Blip decimated life across the cosmos, the surviving Avengers execute a perilous Time Heist across their history to restore the fallen.',
    tagline: 'Part of the journey is the end.',
    rating: 8.4,
    timelineNotes: 'Begins in 2018 immediately following Infinity War, jumps 5 years to Autumn 2023. The grand finale of the 23-film Infinity Saga.',
    characters: ['iron-man', 'captain-america', 'thor', 'hulk', 'black-widow', 'hawkeye', 'ant-man', 'nebula', 'thanos'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / Hulk' },
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow' },
      { name: 'Jeremy Renner', role: 'Clint Barton / Hawkeye' },
      { name: 'Paul Rudd', role: 'Scott Lang / Ant-Man' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 47. Loki Season 1 (Outside Time / Post-2012 Heist Branch)
  {
    id: 'loki-s1',
    title: 'Loki (Season 1)',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-06-09',
    releaseOrder: 44,
    chronologicalOrder: 47,
    tmdbId: 84958,
    poster: 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc39gVqY9uoIxHpFoTz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/kEl2t3OhXc39gVqY9uoIxHpFoTz.jpg',
    overview: 'After escaping with the Tesseract during the 2012 Time Heist, Loki is arrested by the Time Variance Authority and confronts He Who Remains.',
    tagline: 'Loki\'s time has come.',
    rating: 8.2,
    seasonNumber: 1,
    timelineNotes: 'Set outside normal time and space at the TVA immediately following the 2012 time heist branch created in Endgame. Shatters the Sacred Timeline into the Multiverse.',
    characters: ['loki', 'mobius', 'sylvie', 'ravonna-renslayer', 'he-who-remains'],
    cast: [
      { name: 'Tom Hiddleston', role: 'Loki' },
      { name: 'Owen Wilson', role: 'Mobius M. Mobius' },
      { name: 'Sophia Di Martino', role: 'Sylvie' },
      { name: 'Jonathan Majors', role: 'He Who Remains' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 48. What If...? Season 1 (Multiverse)
  {
    id: 'what-if-s1',
    title: 'What If...? (Season 1)',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Multiverse',
    year: 2021,
    releaseDate: '2021-08-11',
    releaseOrder: 45,
    chronologicalOrder: 48,
    tmdbId: 91363,
    poster: 'https://image.tmdb.org/t/p/w780/lztOx5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/lztOx5H.jpg',
    overview: 'The Watcher guides viewers across alternate realities in the multiverse where key moments from the MCU occurred differently.',
    tagline: 'One question changes everything.',
    rating: 7.9,
    seasonNumber: 1,
    timelineNotes: 'Multiverse branch narratives resulting from the liberation of the Sacred Timeline at the end of Loki Season 1.',
    characters: ['the-watcher', 'captain-carter', 'infinity-ultron', 'doctor-strange-supreme'],
    cast: [
      { name: 'Jeffrey Wright', role: 'The Watcher (Voice)' },
      { name: 'Hayley Atwell', role: 'Peggy Carter / Captain Carter (Voice)' },
      { name: 'Chadwick Boseman', role: 'Star-Lord T\'Challa (Voice)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 49. WandaVision (Fall 2023 - 3 weeks post-Endgame)
  {
    id: 'wandavision',
    title: 'WandaVision',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-01-15',
    releaseOrder: 43,
    chronologicalOrder: 49,
    tmdbId: 85271,
    poster: 'https://image.tmdb.org/t/p/w780/glKDjt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/glKDjt.jpg',
    overview: 'Living idealized suburban lives in Westview, Wanda Maximoff and Vision begin to suspect that their reality is not what it seems.',
    tagline: 'A visionary new age of television.',
    rating: 8.2,
    seasonNumber: 1,
    timelineNotes: 'Set exactly three weeks after the reversal of the Snap in Autumn 2023. Wanda creates the Hex and unlocks her full Scarlet Witch prophecy.',
    characters: ['scarlet-witch', 'vision', 'agatha-harkness', 'monica-rambeau', 'jimmy-woo', 'darcy-lewis'],
    cast: [
      { name: 'Elizabeth Olsen', role: 'Wanda Maximoff / Scarlet Witch' },
      { name: 'Paul Bettany', role: 'Vision' },
      { name: 'Kathryn Hahn', role: 'Agatha Harkness' },
      { name: 'Teyonah Parris', role: 'Monica Rambeau' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 50. The Falcon and the Winter Soldier (Spring 2024 - 6 months post-Endgame)
  {
    id: 'the-falcon-and-the-winter-soldier',
    title: 'The Falcon and the Winter Soldier',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-03-19',
    releaseOrder: 44,
    chronologicalOrder: 50,
    tmdbId: 88396,
    poster: 'https://image.tmdb.org/t/p/w780/6kbAMLteiq8.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/6kbAMLteiq8.jpg',
    overview: 'Sam Wilson and Bucky Barnes team up on a global adventure that tests their abilities and their patience as Sam grapples with the mantle of Captain America.',
    tagline: 'Honor the legacy.',
    rating: 7.7,
    seasonNumber: 1,
    timelineNotes: 'Set in Spring 2024, approximately six months after the Blip reversal. Sam Wilson officially becomes the new Captain America.',
    characters: ['falcon', 'winter-soldier', 'john-walker', 'baron-zemo', 'sharon-carter'],
    cast: [
      { name: 'Anthony Mackie', role: 'Sam Wilson / Captain America' },
      { name: 'Sebastian Stan', role: 'Bucky Barnes / Winter Soldier' },
      { name: 'Wyatt Russell', role: 'John Walker / U.S. Agent' },
      { name: 'Daniel Brühl', role: 'Baron Helmut Zemo' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 51. Shang-Chi and the Legend of the Ten Rings (Spring 2024)
  {
    id: 'shang-chi',
    title: 'Shang-Chi and the Legend of the Ten Rings',
    type: 'movie',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-09-03',
    releaseOrder: 46,
    chronologicalOrder: 51,
    tmdbId: 566525,
    poster: 'https://image.tmdb.org/t/p/w780/1BIoJbKB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cin.jpg',
    overview: 'Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization led by his father.',
    tagline: 'You cannot outrun who you are.',
    rating: 7.7,
    timelineNotes: 'Set in Spring 2024 around the Qingming Festival. Concludes with the Ten Rings beacon signalling into the cosmos.',
    characters: ['shang-chi', 'xu-wenwu', 'katy', 'xialing', 'wong', 'abomination'],
    cast: [
      { name: 'Simu Liu', role: 'Shang-Chi' },
      { name: 'Tony Leung', role: 'Xu Wenwu' },
      { name: 'Awkwafina', role: 'Katy Chen' },
      { name: 'Meng\'er Zhang', role: 'Xu Xialing' },
      { name: 'Michelle Yeoh', role: 'Ying Nan' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 52. Spider-Man: Far From Home (Summer 2024 - 8 months post-Endgame)
  {
    id: 'spider-man-far-from-home',
    title: 'Spider-Man: Far From Home',
    type: 'movie',
    phase: 'Phase 3',
    saga: 'Infinity Saga',
    continuity: 'Sacred Timeline',
    year: 2019,
    releaseDate: '2019-07-02',
    releaseOrder: 43,
    chronologicalOrder: 52,
    tmdbId: 429617,
    poster: 'https://image.tmdb.org/t/p/w780/4q2Db.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/5my.jpg',
    overview: 'Following the events of Avengers: Endgame, Peter Parker goes on a European school trip and must step up against Quentin Beck (Mysterio).',
    tagline: 'It takes a leap of faith to step up.',
    rating: 7.5,
    timelineNotes: 'Set in Summer 2024 at the end of the school year. Concludes Phase 3; Mysterio frames Spider-Man and exposes Peter\'s identity.',
    characters: ['spider-man', 'mysterio', 'nick-fury', 'ned-leeds', 'happy-hogan'],
    cast: [
      { name: 'Tom Holland', role: 'Peter Parker / Spider-Man' },
      { name: 'Jake Gyllenhaal', role: 'Quentin Beck / Mysterio' },
      { name: 'Samuel L. Jackson', role: 'Nick Fury' },
      { name: 'Zendaya', role: 'Michelle Jones (MJ)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 53. Eternals (Autumn 2024)
  {
    id: 'eternals',
    title: 'Eternals',
    type: 'movie',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-11-05',
    releaseOrder: 47,
    chronologicalOrder: 53,
    tmdbId: 524434,
    poster: 'https://image.tmdb.org/t/p/w780/bcCBq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/c6.jpg',
    overview: 'The Eternals, a race of immortal beings with superhuman powers who have secretly lived on Earth for thousands of years, reunite to stop the Emergence.',
    tagline: 'In the beginning...',
    rating: 6.9,
    timelineNotes: 'Set in Autumn 2024. The energy burst from the Blip triggers the Emergence of the Celestial Tiamut from the Indian Ocean.',
    characters: ['sersi', 'ikaris', 'thena', 'ajak', 'kingo', 'phastos', 'makkari', 'druig', 'arishem'],
    cast: [
      { name: 'Gemma Chan', role: 'Sersi' },
      { name: 'Richard Madden', role: 'Ikaris' },
      { name: 'Angelina Jolie', role: 'Thena' },
      { name: 'Salma Hayek', role: 'Ajak' },
      { name: 'Kumail Nanjiani', role: 'Kingo' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 54. Spider-Man: No Way Home (Autumn-Winter 2024)
  {
    id: 'spider-man-no-way-home',
    title: 'Spider-Man: No Way Home',
    type: 'movie',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-12-17',
    releaseOrder: 48,
    chronologicalOrder: 54,
    tmdbId: 634649,
    poster: 'https://image.tmdb.org/t/p/w780/1g0dh.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/iQ.jpg',
    overview: 'With his secret identity revealed, Peter asks Doctor Strange for help, but the spell tears open the multiverse, unleashing past villains and alternate Spider-Men.',
    tagline: 'The multiverse unleashed.',
    rating: 8.2,
    timelineNotes: 'Picks up immediately following Far From Home and stretches until Winter 2024. Connects Toby Maguire and Andrew Garfield\'s universes to the MCU.',
    characters: ['spider-man', 'doctor-strange', 'green-goblin', 'doc-ock', 'electro', 'daredevil'],
    cast: [
      { name: 'Tom Holland', role: 'Peter Parker / Spider-Man' },
      { name: 'Zendaya', role: 'MJ' },
      { name: 'Benedict Cumberbatch', role: 'Dr. Stephen Strange' },
      { name: 'Willem Dafoe', role: 'Norman Osborn / Green Goblin' },
      { name: 'Alfred Molina', role: 'Otto Octavius / Doctor Octopus' },
      { name: 'Tobey Maguire', role: 'Peter Parker / Spider-Man' },
      { name: 'Andrew Garfield', role: 'Peter Parker / Spider-Man' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 55. Doctor Strange in the Multiverse of Madness (Late 2024 / Early 2025)
  {
    id: 'doctor-strange-multiverse-of-madness',
    title: 'Doctor Strange in the Multiverse of Madness',
    type: 'movie',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-05-06',
    releaseOrder: 51,
    chronologicalOrder: 55,
    tmdbId: 453395,
    poster: 'https://image.tmdb.org/t/p/w780/9Gtg.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/wc.jpg',
    overview: 'Doctor Strange teams up with mysterious teenager America Chavez to traverse mind-bending alternate realities and battle the Darkhold-corrupted Scarlet Witch.',
    tagline: 'Enter a new dimension of Strange.',
    rating: 7.3,
    timelineNotes: 'Set in late 2024 / early 2025, several months after No Way Home. Directly follows Wanda\'s dark transformation from WandaVision.',
    characters: ['doctor-strange', 'scarlet-witch', 'america-chavez', 'wong', 'professor-x', 'mr-fantastic'],
    cast: [
      { name: 'Benedict Cumberbatch', role: 'Dr. Stephen Strange' },
      { name: 'Elizabeth Olsen', role: 'Wanda Maximoff / Scarlet Witch' },
      { name: 'Xochitl Gomez', role: 'America Chavez' },
      { name: 'Benedict Wong', role: 'Wong' },
      { name: 'Patrick Stewart', role: 'Professor Charles Xavier' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 56. Hawkeye (Holiday 2024)
  {
    id: 'hawkeye',
    title: 'Hawkeye',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2021,
    releaseDate: '2021-11-24',
    releaseOrder: 49,
    chronologicalOrder: 56,
    tmdbId: 88329,
    poster: 'https://image.tmdb.org/t/p/w780/pq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/pq.jpg',
    overview: 'Former Avenger Clint Barton must work with 22-year-old archer Kate Bishop to unravel a criminal conspiracy in New York City just in time for Christmas.',
    tagline: 'This holiday season, the best gifts have strings attached.',
    rating: 7.6,
    seasonNumber: 1,
    timelineNotes: 'Set during Christmas 2024 in New York City; reintroduces Wilson Fisk (Kingpin) and Yelena Belova.',
    characters: ['hawkeye', 'kate-bishop', 'yelena-belova', 'kingpin', 'maya-lopez'],
    cast: [
      { name: 'Jeremy Renner', role: 'Clint Barton / Hawkeye' },
      { name: 'Hailee Steinfeld', role: 'Kate Bishop' },
      { name: 'Florence Pugh', role: 'Yelena Belova' },
      { name: 'Vincent D\'Onofrio', role: 'Wilson Fisk / Kingpin' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 57. Moon Knight (Early 2025)
  {
    id: 'moon-knight',
    title: 'Moon Knight',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-03-30',
    releaseOrder: 50,
    chronologicalOrder: 57,
    tmdbId: 92749,
    poster: 'https://image.tmdb.org/t/p/w780/xG.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/xG.jpg',
    overview: 'Steven Grant discovers he has dissociative identity disorder and shares a body with mercenary Marc Spector, avatar of Egyptian moon god Khonshu.',
    tagline: 'Embrace the chaos.',
    rating: 7.9,
    seasonNumber: 1,
    timelineNotes: 'Set in early Spring 2025 across London and Egypt; explores the Ennead and Egyptian pantheon.',
    characters: ['moon-knight', 'marc-spector', 'steven-grant', 'khonshu', 'arthur-harrow'],
    cast: [
      { name: 'Oscar Isaac', role: 'Marc Spector / Steven Grant / Moon Knight' },
      { name: 'Ethan Hawke', role: 'Arthur Harrow' },
      { name: 'May Calamawy', role: 'Layla El-Faouly / Scarlet Scarab' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 58. She-Hulk: Attorney at Law (Mid 2025)
  {
    id: 'she-hulk',
    title: 'She-Hulk: Attorney at Law',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-08-18',
    releaseOrder: 53,
    chronologicalOrder: 58,
    tmdbId: 92783,
    poster: 'https://image.tmdb.org/t/p/w780/hG.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/hG.jpg',
    overview: 'Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered Hulk.',
    tagline: 'Lawyer by day. Hulk by choice.',
    rating: 6.8,
    seasonNumber: 1,
    timelineNotes: 'Set across mid-2025. Features Matt Murdock visiting Los Angeles as Daredevil in his new yellow/red suit.',
    characters: ['she-hulk', 'hulk', 'abomination', 'wong', 'daredevil'],
    cast: [
      { name: 'Tatiana Maslany', role: 'Jennifer Walters / She-Hulk' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / Smart Hulk' },
      { name: 'Tim Roth', role: 'Emil Blonsky / Abomination' },
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 59. Ms. Marvel (Fall 2025)
  {
    id: 'ms-marvel',
    title: 'Ms. Marvel',
    type: 'series',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-06-08',
    releaseOrder: 52,
    chronologicalOrder: 59,
    tmdbId: 92782,
    poster: 'https://image.tmdb.org/t/p/w780/cd.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/cd.jpg',
    overview: 'Jersey City mega-fan Kamala Khan discovers an ancient family bangle that unlocks cosmic hard-light powers, setting her on a hero\'s journey.',
    tagline: 'Future is in her hands.',
    rating: 7.2,
    seasonNumber: 1,
    timelineNotes: 'Set in Autumn 2025. First MCU project to introduce a mutant genetic anomaly in Kamala Khan; leads directly into The Marvels.',
    characters: ['ms-marvel', 'kamala-khan', 'bruno-carrelli', 'captain-marvel'],
    cast: [
      { name: 'Iman Vellani', role: 'Kamala Khan / Ms. Marvel' },
      { name: 'Matt Lintz', role: 'Bruno Carrelli' },
      { name: 'Yasmeen Fletcher', role: 'Nakia Bahadir' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 60. Thor: Love and Thunder (Late 2025)
  {
    id: 'thor-love-and-thunder',
    title: 'Thor: Love and Thunder',
    type: 'movie',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-07-08',
    releaseOrder: 54,
    chronologicalOrder: 60,
    tmdbId: 616037,
    poster: 'https://image.tmdb.org/t/p/w780/pIkko.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/jso.jpg',
    overview: 'Thor enlists Valkyrie, Korg, and his ex-girlfriend Jane Foster (wielding Mjolnir as the Mighty Thor) to stop Gorr the God Butcher from eliminating all gods.',
    tagline: 'The one is not the only.',
    rating: 6.8,
    timelineNotes: 'Set in late 2025, approximately eight years after Thor and Jane\'s initial breakup.',
    characters: ['thor', 'mighty-thor', 'valkyrie', 'korg', 'gorr', 'zeus', 'star-lord'],
    cast: [
      { name: 'Chris Hemsworth', role: 'Thor Odinson' },
      { name: 'Natalie Portman', role: 'Jane Foster / The Mighty Thor' },
      { name: 'Christian Bale', role: 'Gorr the God Butcher' },
      { name: 'Tessa Thompson', role: 'King Valkyrie' },
      { name: 'Russell Crowe', role: 'Zeus' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 61. Werewolf by Night (Special - Autumn 2025)
  {
    id: 'werewolf-by-night',
    title: 'Werewolf by Night',
    type: 'special',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-10-07',
    releaseOrder: 55,
    chronologicalOrder: 61,
    tmdbId: 894205,
    poster: 'https://image.tmdb.org/t/p/w780/jA7.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/jA7.jpg',
    overview: 'On a dark and somber night, a secret cabal of monster hunters emerge from the shadows to compete for a powerful relic at Bloodstone Temple.',
    tagline: 'There is no escaping the night.',
    rating: 7.7,
    timelineNotes: 'First Marvel Studios Special Presentation; introduces Jack Russell, Elsa Bloodstone, and Man-Thing into the MCU monster mythos.',
    characters: ['werewolf-by-night', 'elsa-bloodstone', 'man-thing'],
    cast: [
      { name: 'Gael García Bernal', role: 'Jack Russell / Werewolf by Night' },
      { name: 'Laura Donnelly', role: 'Elsa Bloodstone' },
      { name: 'Harriet Sansom Harris', role: 'Verussa Bloodstone' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 62. Black Panther: Wakanda Forever (Late 2025)
  {
    id: 'black-panther-wakanda-forever',
    title: 'Black Panther: Wakanda Forever',
    type: 'movie',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-11-11',
    releaseOrder: 56,
    chronologicalOrder: 62,
    tmdbId: 505642,
    poster: 'https://image.tmdb.org/t/p/w780/sv1x.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/yY.jpg',
    overview: 'Queen Ramonda, Shuri, and Okoye fight to protect their grieving nation from intervening world powers and the underwater kingdom of Talokan led by Namor.',
    tagline: 'Forever.',
    rating: 7.5,
    timelineNotes: 'Set in late 2025, one year after the passing of King T\'Challa. Introduces Riri Williams (Ironheart) and Namor.',
    characters: ['shuri', 'namor', 'queen-ramonda', 'okoye', 'ironheart', 'm-baku'],
    cast: [
      { name: 'Letitia Wright', role: 'Shuri / Black Panther' },
      { name: 'Tenoch Huerta Mejía', role: 'Namor' },
      { name: 'Angela Bassett', role: 'Queen Ramonda' },
      { name: 'Dominique Thorne', role: 'Riri Williams / Ironheart' },
      { name: 'Danai Gurira', role: 'Okoye' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 63. The Guardians of the Galaxy Holiday Special (Holiday 2025)
  {
    id: 'gotg-holiday-special',
    title: 'The Guardians of the Galaxy Holiday Special',
    type: 'special',
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2022,
    releaseDate: '2022-11-25',
    releaseOrder: 57,
    chronologicalOrder: 63,
    tmdbId: 774752,
    poster: 'https://image.tmdb.org/t/p/w780/8dq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/8dq.jpg',
    overview: 'On a mission to make Christmas unforgettable for Peter Quill, the Guardians head to Earth in search of the ultimate present: Kevin Bacon.',
    tagline: 'It\'s holiday time in the galaxy.',
    rating: 7.5,
    timelineNotes: 'Set at Christmas 2025 on Knowhere; reveals that Mantis is Peter Quill\'s biological half-sister.',
    characters: ['mantis', 'drax', 'star-lord', 'nebula', 'cosmo'],
    cast: [
      { name: 'Pom Klementieff', role: 'Mantis' },
      { name: 'Dave Bautista', role: 'Drax' },
      { name: 'Chris Pratt', role: 'Peter Quill / Star-Lord' },
      { name: 'Kevin Bacon', role: 'Himself' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 64. Ant-Man and the Wasp: Quantumania (Early 2026)
  {
    id: 'ant-man-and-the-wasp-quantumania',
    title: 'Ant-Man and the Wasp: Quantumania',
    type: 'movie',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2023,
    releaseDate: '2023-02-17',
    releaseOrder: 58,
    chronologicalOrder: 64,
    tmdbId: 640146,
    poster: 'https://image.tmdb.org/t/p/w780/ngl2K.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/9t.jpg',
    overview: 'Scott Lang, Hope van Dyne, Hank Pym, and Cassie Lang are sucked into the Quantum Realm where they encounter the multiversal warlord Kang the Conqueror.',
    tagline: 'Witness the beginning of a new dynasty.',
    rating: 6.6,
    timelineNotes: 'Set in early 2026. The official kick-off to Phase 5; reveals the Council of Kangs.',
    characters: ['ant-man', 'wasp', 'kang-the-conqueror', 'cassie-lang', 'hank-pym', 'janet-van-dyne', 'modok'],
    cast: [
      { name: 'Paul Rudd', role: 'Scott Lang / Ant-Man' },
      { name: 'Evangeline Lilly', role: 'Hope van Dyne / Wasp' },
      { name: 'Jonathan Majors', role: 'Kang the Conqueror' },
      { name: 'Kathryn Newton', role: 'Cassie Lang' },
      { name: 'Michael Douglas', role: 'Dr. Hank Pym' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 65. Guardians of the Galaxy Vol. 3 (2026)
  {
    id: 'guardians-of-the-galaxy-vol-3',
    title: 'Guardians of the Galaxy Vol. 3',
    type: 'movie',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2023,
    releaseDate: '2023-05-05',
    releaseOrder: 59,
    chronologicalOrder: 65,
    tmdbId: 447365,
    poster: 'https://image.tmdb.org/t/p/w780/r2Jjk.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/5Y.jpg',
    overview: 'Still reeling from the loss of Gamora, Peter Quill rallies his team on a perilous mission to defend the universe and save Rocket from the High Evolutionary.',
    tagline: 'Once more with feeling.',
    rating: 8.2,
    timelineNotes: 'Set in 2026. Culmination of the original Guardians roster; Peter returns to Earth to reunite with his grandfather.',
    characters: ['star-lord', 'rocket-raccoon', 'gamora', 'drax', 'nebula', 'mantis', 'groot', 'adam-warlock', 'high-evolutionary'],
    cast: [
      { name: 'Chris Pratt', role: 'Peter Quill / Star-Lord' },
      { name: 'Bradley Cooper', role: 'Rocket (Voice)' },
      { name: 'Zoe Saldana', role: 'Gamora' },
      { name: 'Chukwudi Iwuji', role: 'The High Evolutionary' },
      { name: 'Will Poulter', role: 'Adam Warlock' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 66. Secret Invasion (Fall 2026)
  {
    id: 'secret-invasion',
    title: 'Secret Invasion',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2023,
    releaseDate: '2023-06-21',
    releaseOrder: 60,
    chronologicalOrder: 66,
    tmdbId: 114472,
    poster: 'https://image.tmdb.org/t/p/w780/fA.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/fA.jpg',
    overview: 'Nick Fury learns of a clandestine invasion of Earth by a faction of shapeshifting Skrulls led by Gravik, operating in the highest levels of global power.',
    tagline: 'Who do you trust?',
    rating: 6.5,
    seasonNumber: 1,
    timelineNotes: 'Set in Autumn 2026. Reveals Rhodey had been replaced by a Skrull imposter; leads directly into The Marvels.',
    characters: ['nick-fury', 'talos', 'gravik', 'g-iah', 'sonya-falsworth', 'war-machine'],
    cast: [
      { name: 'Samuel L. Jackson', role: 'Nick Fury' },
      { name: 'Ben Mendelsohn', role: 'Talos' },
      { name: 'Kingsley Ben-Adir', role: 'Gravik' },
      { name: 'Emilia Clarke', role: 'G\'iah' },
      { name: 'Olivia Colman', role: 'Sonya Falsworth' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 67. The Marvels (Late 2026)
  {
    id: 'the-marvels',
    title: 'The Marvels',
    type: 'movie',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2023,
    releaseDate: '2023-11-10',
    releaseOrder: 63,
    chronologicalOrder: 67,
    tmdbId: 609681,
    poster: 'https://image.tmdb.org/t/p/w780/Ag3P.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/fe.jpg',
    overview: 'Carol Danvers, Monica Rambeau, and Kamala Khan find their powers entangled, causing them to physically swap places whenever their abilities are used.',
    tagline: 'Higher. Further. Faster. Together.',
    rating: 6.7,
    timelineNotes: 'Set in late 2026. Concludes with Monica Rambeau trapped in an alternate X-Men universe featuring Beast and Binary.',
    characters: ['captain-marvel', 'ms-marvel', 'monica-rambeau', 'nick-fury', 'dar-benn', 'beast'],
    cast: [
      { name: 'Brie Larson', role: 'Carol Danvers / Captain Marvel' },
      { name: 'Teyonah Parris', role: 'Captain Monica Rambeau' },
      { name: 'Iman Vellani', role: 'Kamala Khan / Ms. Marvel' },
      { name: 'Zawe Ashton', role: 'Dar-Benn' },
      { name: 'Samuel L. Jackson', role: 'Nick Fury' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 68. Loki Season 2 (End of Time / Yggdrasil)
  {
    id: 'loki-s2',
    title: 'Loki (Season 2)',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2023,
    releaseDate: '2023-10-05',
    releaseOrder: 62,
    chronologicalOrder: 68,
    tmdbId: 84958,
    poster: 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc39gVqY9uoIxHpFoTz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/kEl2t3OhXc39gVqY9uoIxHpFoTz.jpg',
    overview: 'Loki battles time-slipping across the TVA\'s past, present, and future, eventually sacrificing his freedom to weave the multiversal timelines into the World Tree.',
    tagline: 'I know what kind of god I need to be.',
    rating: 8.6,
    seasonNumber: 2,
    timelineNotes: 'Transcends linear time. Loki becomes the God of Stories, personally holding the branching multiverse together at the center of Yggdrasil.',
    characters: ['loki', 'mobius', 'sylvie', 'o-b', 'victor-timely', 'he-who-remains'],
    cast: [
      { name: 'Tom Hiddleston', role: 'Loki / God of Stories' },
      { name: 'Sophia Di Martino', role: 'Sylvie' },
      { name: 'Ke Huy Quan', role: 'Ouroboros "O.B."' },
      { name: 'Owen Wilson', role: 'Mobius M. Mobius' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 69. What If...? Season 2 (Multiverse)
  {
    id: 'what-if-s2',
    title: 'What If...? (Season 2)',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Multiverse',
    year: 2023,
    releaseDate: '2023-12-22',
    releaseOrder: 64,
    chronologicalOrder: 69,
    tmdbId: 91363,
    poster: 'https://image.tmdb.org/t/p/w780/lztOx5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/lztOx5H.jpg',
    overview: 'The Watcher continues his journey as our guide through the vast multiverse, introducing new heroes including Kahhori and unforeseen twists.',
    tagline: 'New realities emerge.',
    rating: 7.7,
    seasonNumber: 2,
    timelineNotes: 'Multiversal tales across branching realities, culminating in Captain Carter and Kahhori defeating Strange Supreme.',
    characters: ['the-watcher', 'captain-carter', 'kahhori', 'doctor-strange-supreme', 'hela'],
    cast: [
      { name: 'Jeffrey Wright', role: 'The Watcher (Voice)' },
      { name: 'Hayley Atwell', role: 'Captain Carter (Voice)' },
      { name: 'Devery Jacobs', role: 'Kahhori (Voice)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 70. Echo (Spring 2027 / 5 months post-Hawkeye)
  {
    id: 'echo',
    title: 'Echo',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2024,
    releaseDate: '2024-01-09',
    releaseOrder: 65,
    chronologicalOrder: 70,
    tmdbId: 125928,
    poster: 'https://image.tmdb.org/t/p/w780/vI.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/vI.jpg',
    overview: 'Pursued by Wilson Fisk\'s empire, Maya Lopez returns to her hometown in Oklahoma to reconnect with her Native American Choctaw roots.',
    tagline: 'No good deed goes unpunished.',
    rating: 7.2,
    seasonNumber: 1,
    timelineNotes: 'Set five months after Hawkeye in Spring 2027; Wilson Fisk decides to run for Mayor of New York City.',
    characters: ['maya-lopez', 'kingpin', 'daredevil'],
    cast: [
      { name: 'Alaqua Cox', role: 'Maya Lopez / Echo' },
      { name: 'Vincent D\'Onofrio', role: 'Wilson Fisk / Kingpin' },
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 71. Deadpool & Wolverine (Void / Multiverse - 2024)
  {
    id: 'deadpool-and-wolverine',
    title: 'Deadpool & Wolverine',
    type: 'movie',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Multiverse',
    year: 2024,
    releaseDate: '2024-07-26',
    releaseOrder: 66,
    chronologicalOrder: 71,
    tmdbId: 533535,
    poster: 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8M97.jpg',
    overview: 'A listless Wade Wilson is pulled into the TVA by Mr. Paradox and teams up with a reluctant Wolverine variant to save his home timeline from destruction.',
    tagline: 'Come together.',
    rating: 8.3,
    timelineNotes: 'Set across Earth-10005, the TVA, and The Void at the end of time. Formally integrates 20th Century Fox Marvel history into MCU multiverse lore.',
    characters: ['deadpool', 'wolverine', 'cassandra-nova', 'mr-paradox', 'blade', 'elektra', 'gambit', 'x-23'],
    cast: [
      { name: 'Ryan Reynolds', role: 'Wade Wilson / Deadpool' },
      { name: 'Hugh Jackman', role: 'Logan / Wolverine' },
      { name: 'Emma Corrin', role: 'Cassandra Nova' },
      { name: 'Matthew Macfadyen', role: 'Mr. Paradox' },
      { name: 'Dafne Keen', role: 'Laura / X-23' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 72. Agatha All Along (Fall 2026 / 3 years post-WandaVision)
  {
    id: 'agatha-all-along',
    title: 'Agatha All Along',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2024,
    releaseDate: '2024-09-18',
    releaseOrder: 67,
    chronologicalOrder: 72,
    tmdbId: 138502,
    poster: 'https://image.tmdb.org/t/p/w780/p7.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/p7.jpg',
    overview: 'Freed from Wanda\'s spell by a mysterious teen (Billy Maximoff), powerless witch Agatha Harkness gathers a desperate coven to face the trials of the Witches\' Road.',
    tagline: 'Cross the Road.',
    rating: 8.1,
    seasonNumber: 1,
    timelineNotes: 'Set three years after the Westview Hex in Autumn 2026. Introduces Billy Maximoff (Wiccan) in physical incarnation.',
    characters: ['agatha-harkness', 'billy-maximoff', 'rio-vidal', 'jennifer-kale', 'alice-wu-gulliver', 'lilia-calderu'],
    cast: [
      { name: 'Kathryn Hahn', role: 'Agatha Harkness' },
      { name: 'Joe Locke', role: 'Billy Maximoff / Teen' },
      { name: 'Aubrey Plaza', role: 'Rio Vidal / Death' },
      { name: 'Patti LuPone', role: 'Lilia Calderu' },
      { name: 'Sasheer Zamata', role: 'Jennifer Kale' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 73. What If...? Season 3 (Late 2024)
  {
    id: 'what-if-s3',
    title: 'What If...? (Season 3)',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Multiverse',
    year: 2024,
    releaseDate: '2024-12-22',
    releaseOrder: 68,
    chronologicalOrder: 73,
    tmdbId: 91363,
    poster: 'https://image.tmdb.org/t/p/w780/lztOx5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/lztOx5H.jpg',
    overview: 'The final season of the groundbreaking animated anthology delivers thrilling climactic journeys through infinite unexpected realities.',
    tagline: 'The culmination of the Multiverse chronicle.',
    rating: 7.8,
    seasonNumber: 3,
    timelineNotes: 'Culmination of The Watcher\'s multiversal observation cycle; features Storm wielding Mjolnir and Shang-Chi Western reality.',
    characters: ['the-watcher', 'storm', 'shang-chi', 'white-vision'],
    cast: [
      { name: 'Jeffrey Wright', role: 'The Watcher (Voice)' },
      { name: 'Anthony Mackie', role: 'Sam Wilson (Voice)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 74. Your Friendly Neighborhood Spider-Man (Early 2025)
  {
    id: 'your-friendly-neighborhood-spider-man',
    title: 'Your Friendly Neighborhood Spider-Man',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Alternate Timeline',
    year: 2025,
    releaseDate: '2025-01-29',
    releaseOrder: 69,
    chronologicalOrder: 74,
    tmdbId: 138503,
    poster: 'https://image.tmdb.org/t/p/w780/spidey.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/spidey.jpg',
    overview: 'Follows Peter Parker on his way to becoming Spider-Man in an alternate timeline where Norman Osborn becomes his mentor instead of Tony Stark.',
    tagline: 'An origin with a twist.',
    rating: 7.6,
    seasonNumber: 1,
    timelineNotes: 'Alternate MCU branch timeline exploring what would have happened if Norman Osborn stepped in as Peter Parker\'s high school mentor.',
    characters: ['spider-man', 'norman-osborn', 'nico-minoru'],
    cast: [
      { name: 'Hudson Thames', role: 'Peter Parker / Spider-Man (Voice)' },
      { name: 'Colman Domingo', role: 'Norman Osborn (Voice)' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 75. Captain America: Brave New World (February 2025)
  {
    id: 'captain-america-brave-new-world',
    title: 'Captain America: Brave New World',
    type: 'movie',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2025,
    releaseDate: '2025-02-14',
    releaseOrder: 70,
    chronologicalOrder: 75,
    tmdbId: 822119,
    poster: 'https://image.tmdb.org/t/p/w780/pzId5.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/pzId5.jpg',
    overview: 'Sam Wilson finds himself in the middle of an international crisis following a meeting with newly elected US President Thaddeus Ross, uncovering a sinister global conspiracy.',
    tagline: 'A new world order.',
    rating: 7.4,
    timelineNotes: 'Set in 2026-2027. Deals with Celestial Island Adamantium harvesting and President Ross becoming the Red Hulk.',
    characters: ['captain-america', 'falcon', 'red-hulk', 'the-leader', 'isiah-bradley'],
    cast: [
      { name: 'Anthony Mackie', role: 'Sam Wilson / Captain America' },
      { name: 'Harrison Ford', role: 'President Thaddeus "Thunderbolt" Ross / Red Hulk' },
      { name: 'Danny Ramirez', role: 'Joaquin Torres / Falcon' },
      { name: 'Tim Blake Nelson', role: 'Samuel Sterns / The Leader' },
      { name: 'Giancarlo Esposito', role: 'Seth Voelker / Sidewinder' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 76. Daredevil: Born Again Season 1 (March 2025)
  {
    id: 'daredevil-born-again-s1',
    title: 'Daredevil: Born Again (Season 1)',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2025,
    releaseDate: '2025-03-04',
    releaseOrder: 71,
    chronologicalOrder: 76,
    tmdbId: 202720,
    poster: 'https://image.tmdb.org/t/p/w780/ddba.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/ddba.jpg',
    overview: 'Matt Murdock and Wilson Fisk attempt to put their darker alter egos behind them to serve the people of New York, but their pasts inevitably catch up to them.',
    tagline: 'The devil you know.',
    rating: 8.4,
    seasonNumber: 1,
    timelineNotes: 'Takes place during Wilson Fisk\'s mayoral crackdown on NYC vigilantes. Integrates the Netflix Defenders canon directly into current MCU continuity.',
    characters: ['daredevil', 'kingpin', 'punisher', 'bullseye', 'foggy-nelson', 'karen-page'],
    cast: [
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' },
      { name: 'Vincent D\'Onofrio', role: 'Mayor Wilson Fisk / Kingpin' },
      { name: 'Jon Bernthal', role: 'Frank Castle / The Punisher' },
      { name: 'Deborah Ann Woll', role: 'Karen Page' },
      { name: 'Elden Henson', role: 'Foggy Nelson' }
    ],
    screenScapeAvailable: true,
    isUpcoming: false
  },

  // 77. Thunderbolts* (May 2025)
  {
    id: 'thunderbolts',
    title: 'Thunderbolts*',
    type: 'movie',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2025,
    releaseDate: '2025-05-02',
    releaseOrder: 72,
    chronologicalOrder: 77,
    tmdbId: 986056,
    poster: 'https://image.tmdb.org/t/p/w780/tb.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/tb.jpg',
    overview: 'An irreverent team-up featuring depressed assassin Yelena Belova alongside the MCU least anticipated band of misfits on a high-stakes black ops suicide mission.',
    tagline: 'Careful who you assemble.',
    rating: 7.9,
    timelineNotes: 'Culmination of Phase 5. Assembles Bucky Barnes, Yelena Belova, Red Guardian, US Agent, Ghost, and Bob (Sentry).',
    characters: ['yelena-belova', 'bucky-barnes', 'red-guardian', 'u-s-agent', 'ghost', 'taskmaster', 'val', 'sentry'],
    cast: [
      { name: 'Florence Pugh', role: 'Yelena Belova' },
      { name: 'Sebastian Stan', role: 'Bucky Barnes' },
      { name: 'David Harbour', role: 'Alexei Shostakov / Red Guardian' },
      { name: 'Wyatt Russell', role: 'John Walker / U.S. Agent' },
      { name: 'Julia Louis-Dreyfus', role: 'Valentina Allegra de Fontaine' },
      { name: 'Lewis Pullman', role: 'Bob / Sentry' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  },

  // 78. Ironheart (June 2025)
  {
    id: 'ironheart',
    title: 'Ironheart',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2025,
    releaseDate: '2025-06-24',
    releaseOrder: 73,
    chronologicalOrder: 78,
    tmdbId: 114471,
    poster: 'https://image.tmdb.org/t/p/w780/ih.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/ih.jpg',
    overview: 'Brilliant MIT inventor Riri Williams returns to Chicago where high-tech ingenuity clashes directly with dark occult magic wielded by Parker Robbins (The Hood).',
    tagline: 'Tech versus magic.',
    rating: 7.3,
    seasonNumber: 1,
    timelineNotes: 'Set post-Wakanda Forever in Chicago. Explores the tension between Stark-level robotics and dark supernatural power.',
    characters: ['ironheart', 'the-hood'],
    cast: [
      { name: 'Dominique Thorne', role: 'Riri Williams / Ironheart' },
      { name: 'Anthony Ramos', role: 'Parker Robbins / The Hood' },
      { name: 'Alden Ehrenreich', role: 'Joe McGillicuddy' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  },

  // 79. The Fantastic Four: First Steps (July 2025)
  {
    id: 'fantastic-four-first-steps',
    title: 'The Fantastic Four: First Steps',
    type: 'movie',
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    continuity: 'Multiverse',
    year: 2025,
    releaseDate: '2025-07-25',
    releaseOrder: 74,
    chronologicalOrder: 79,
    tmdbId: 617127,
    poster: 'https://image.tmdb.org/t/p/w780/f4.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/f4.jpg',
    overview: 'Set against a vibrant 1960s retro-futuristic alternate universe, Marvel\'s First Family must defend their world from planet-devourer Galactus and his herald Silver Surfer.',
    tagline: 'Marvel\'s First Family.',
    rating: 8.2,
    timelineNotes: 'Set in a 1960s alternate retro-futuristic universe in the Multiverse. Leads Marvel\'s First Family towards collision with the Sacred Timeline.',
    characters: ['mister-fantastic', 'invisible-woman', 'human-torch', 'the-thing', 'galactus', 'silver-surfer'],
    cast: [
      { name: 'Pedro Pascal', role: 'Reed Richards / Mister Fantastic' },
      { name: 'Vanessa Kirby', role: 'Sue Storm / Invisible Woman' },
      { name: 'Joseph Quinn', role: 'Johnny Storm / Human Torch' },
      { name: 'Ebon Moss-Bachrach', role: 'Ben Grimm / The Thing' },
      { name: 'Ralph Ineson', role: 'Galactus' },
      { name: 'Julia Garner', role: 'Shalla-Bal / Silver Surfer' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  },

  // 80. Marvel Zombies (October 2025)
  {
    id: 'marvel-zombies',
    title: 'Marvel Zombies',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Alternate Timeline',
    year: 2025,
    releaseDate: '2025-10-03',
    releaseOrder: 75,
    chronologicalOrder: 80,
    tmdbId: 138505,
    poster: 'https://image.tmdb.org/t/p/w780/mz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/mz.jpg',
    overview: 'A new generation of uninfected heroes battles against an ever-spreading zombie plague consuming alternate MCU heroes and villains alike.',
    tagline: 'A dead universe rises.',
    rating: 7.7,
    seasonNumber: 1,
    timelineNotes: 'Direct spin-off and expansion of the post-apocalyptic timeline introduced in What If...? Season 1, Episode 5.',
    characters: ['kamala-khan', 'yelena-belova', 'shang-chi', 'kate-bishop', 'zombie-scarlet-witch'],
    cast: [
      { name: 'Iman Vellani', role: 'Kamala Khan (Voice)' },
      { name: 'Hailee Steinfeld', role: 'Kate Bishop (Voice)' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  },

  // 81. Wonder Man (December 2025)
  {
    id: 'wonder-man',
    title: 'Wonder Man',
    type: 'series',
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2025,
    releaseDate: '2025-12-01',
    releaseOrder: 76,
    chronologicalOrder: 81,
    tmdbId: 198178,
    poster: 'https://image.tmdb.org/t/p/w780/wm.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/wm.jpg',
    overview: 'Hollywood actor and stuntman Simon Williams navigates the bizarre world of superhero entertainment alongside legendary washed-up thespian Trevor Slattery.',
    tagline: 'Behind the red carpet.',
    rating: 7.5,
    seasonNumber: 1,
    timelineNotes: 'Set in modern Hollywood inside the Sacred Timeline. Features Yahya Abdul-Mateen II as Simon Williams and Ben Kingsley as Trevor Slattery.',
    characters: ['simon-williams', 'trevor-slattery', 'grim-reaper'],
    cast: [
      { name: 'Yahya Abdul-Mateen II', role: 'Simon Williams / Wonder Man' },
      { name: 'Ben Kingsley', role: 'Trevor Slattery' },
      { name: 'Demetrius Grosse', role: 'Eric Williams / Grim Reaper' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  },

  // 82. Daredevil: Born Again Season 2 (2026)
  {
    id: 'daredevil-born-again-s2',
    title: 'Daredevil: Born Again (Season 2)',
    type: 'series',
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    continuity: 'Sacred Timeline',
    year: 2026,
    releaseDate: '2026-03-01',
    releaseOrder: 77,
    chronologicalOrder: 82,
    tmdbId: 202720,
    poster: 'https://image.tmdb.org/t/p/w780/ddba2.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/ddba2.jpg',
    overview: 'The continuing battle for the soul of New York City between Mayor Wilson Fisk and the vigilantes defending the five boroughs.',
    tagline: 'The battle for New York.',
    rating: 8.3,
    seasonNumber: 2,
    timelineNotes: 'Continuation of the street-level war heading into the multiversal incursion events.',
    characters: ['daredevil', 'kingpin', 'punisher'],
    cast: [
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' },
      { name: 'Vincent D\'Onofrio', role: 'Wilson Fisk / Kingpin' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  },

  // 83. Avengers: Doomsday (May 2026)
  {
    id: 'avengers-doomsday',
    title: 'Avengers: Doomsday',
    type: 'movie',
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    continuity: 'Multiverse',
    year: 2026,
    releaseDate: '2026-05-01',
    releaseOrder: 78,
    chronologicalOrder: 83,
    tmdbId: 1003596,
    poster: 'https://image.tmdb.org/t/p/w780/doom.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/doom.jpg',
    overview: 'Earth\'s mightiest heroes and allies across the multiverse must unite against the supreme multiversal threat of Doctor Victor von Doom.',
    tagline: 'All hope lies in Doom.',
    rating: 8.8,
    timelineNotes: 'The monumental fifth Avengers epic directed by the Russo Brothers. Features Robert Downey Jr. returning as Victor von Doom.',
    characters: ['doctor-doom', 'mister-fantastic', 'captain-america', 'spider-man', 'thor', 'thunderbolts'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Victor von Doom / Doctor Doom' },
      { name: 'Pedro Pascal', role: 'Reed Richards / Mister Fantastic' },
      { name: 'Anthony Mackie', role: 'Sam Wilson / Captain America' },
      { name: 'Tom Holland', role: 'Peter Parker / Spider-Man' },
      { name: 'Florence Pugh', role: 'Yelena Belova' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  },

  // 84. Avengers: Secret Wars (May 2027)
  {
    id: 'avengers-secret-wars',
    title: 'Avengers: Secret Wars',
    type: 'movie',
    phase: 'Phase 6',
    saga: 'Multiverse Saga',
    continuity: 'Multiverse',
    year: 2027,
    releaseDate: '2027-05-07',
    releaseOrder: 79,
    chronologicalOrder: 84,
    tmdbId: 1003598,
    poster: 'https://image.tmdb.org/t/p/w780/sw.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/sw.jpg',
    overview: 'The grand multiversal collision occurs as infinite realities crash in incursions, forging Battleworld and the ultimate battle for all existence.',
    tagline: 'The end of everything. The rebirth of all.',
    rating: 9.0,
    timelineNotes: 'The definitive climax of The Multiverse Saga (Phases 4-6) bringing every Marvel reality into the Battleworld collision.',
    characters: ['doctor-doom', 'mister-fantastic', 'spider-man', 'wolverine', 'thor', 'loki'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Victor von Doom' },
      { name: 'Hugh Jackman', role: 'Logan / Wolverine' },
      { name: 'Tom Holland', role: 'Peter Parker / Spider-Man' },
      { name: 'Tom Hiddleston', role: 'Loki / God of Stories' }
    ],
    screenScapeAvailable: false,
    isUpcoming: true
  }
];

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
 * Returns timeline nodes sorted strictly by curated releaseOrder or chronologicalOrder.
 * Never calculates order from TMDB release dates.
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
