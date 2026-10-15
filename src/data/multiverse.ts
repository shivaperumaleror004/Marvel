import { StudioInfo, UniverseInfo } from '../types';

export const STUDIOS_DATA: StudioInfo[] = [
  {
    id: 'marvel-studios',
    name: 'Marvel Studios',
    shortName: 'Marvel Studios',
    description: 'The premier production house behind the Marvel Cinematic Universe (MCU), creating interconnected theatrical blockbusters and streaming series since 2008.',
    foundedYear: 1993,
    featuredFranchises: ['Avengers', 'Iron Man', 'Guardians of the Galaxy', 'Thor', 'Captain America', 'Spider-Man (Co-Prod)'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg'
  },
  {
    id: 'sony-pictures',
    name: 'Sony Pictures / Columbia Pictures',
    shortName: 'Sony Pictures',
    description: 'Home of the live-action Spider-Man cinematic franchises, Sony\'s Spider-Man Universe (SSU), and the Academy Award-winning animated Spider-Verse trilogy.',
    foundedYear: 1924,
    featuredFranchises: ['Spider-Man (Raimi)', 'The Amazing Spider-Man', 'Venom', 'Spider-Verse', 'Morbius', 'Kraven'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg'
  },
  {
    id: '20th-century-fox',
    name: '20th Century Fox / Studios',
    shortName: '20th Century Studios',
    description: 'Pioneered the modern superhero renaissance with the historic X-Men film series, Wolverine trilogies, Deadpool, and Fantastic Four productions.',
    foundedYear: 1935,
    featuredFranchises: ['X-Men', 'Wolverine', 'Deadpool', 'Fantastic Four (2005/2015)', 'Daredevil (2003)', 'The New Mutants'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8M97.jpg'
  },
  {
    id: 'new-line-cinema',
    name: 'New Line Cinema',
    shortName: 'New Line',
    description: 'Broke new ground in R-rated comic book cinema with the iconic Blade vampire hunter trilogy starring Wesley Snipes.',
    foundedYear: 1967,
    featuredFranchises: ['Blade', 'Blade II', 'Blade: Trinity'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/7NKfxJrQn053UJeLftlx4m4NTzo.jpg'
  },
  {
    id: 'universal-pictures',
    name: 'Universal Pictures',
    shortName: 'Universal',
    description: 'Co-produced and distributed Ang Lee\'s Hulk (2003) and George Lucas\' cult classic Howard the Duck (1986).',
    foundedYear: 1912,
    featuredFranchises: ['Hulk (2003)', 'Howard the Duck (1986)'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/xfBnQ4mgf1jYZsscJGJjr6ce0Ar.jpg'
  },
  {
    id: 'lionsgate',
    name: 'Lionsgate Films',
    shortName: 'Lionsgate',
    description: 'Brought gritty, hard-boiled Marvel adaptations to cinema including The Punisher (2004), Punisher: War Zone, and Man-Thing.',
    foundedYear: 1997,
    featuredFranchises: ['The Punisher (2004)', 'Punisher: War Zone', 'Man-Thing'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/1R6cvxhYSk9rTIvPvNkGflwf5Za.jpg'
  },
  {
    id: 'marvel-animation',
    name: 'Marvel Animation',
    shortName: 'Marvel Animation',
    description: 'Creators of legendary animated superhero sagas from the 1990s X-Men and Spider-Man series to X-Men \'97 and What If...?.',
    foundedYear: 2008,
    featuredFranchises: ['X-Men \'97', 'Spider-Man: The Animated Series', 'What If...?', 'The Spectacular Spider-Man', 'X-Men: Evolution'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/jIyEmnBrZtl6SEWyBoMO2hZnzMa.jpg'
  },
  {
    id: 'marvel-television',
    name: 'Marvel Television',
    shortName: 'Marvel TV',
    description: 'Produced beloved long-form television expanded lore including Marvel\'s Agents of S.H.I.E.L.D., The Defenders Saga, Runaways, Cloak & Dagger, and Legion.',
    foundedYear: 2010,
    featuredFranchises: ['Agents of S.H.I.E.L.D.', 'Daredevil', 'Jessica Jones', 'Luke Cage', 'The Punisher', 'Runaways', 'Legion'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/pPALpad1Fh14g7ejyQjqKzlhrBw.jpg'
  }
];

export const UNIVERSES_DATA: UniverseInfo[] = [
  {
    id: 'earth-616',
    designation: 'Earth-616 / Earth-199999',
    name: 'The Sacred Timeline (MCU)',
    description: 'The primary continuity of the Marvel Cinematic Universe where the Infinity Saga and Multiverse Saga unfold, protected by the Avengers.',
    primaryStudio: 'Marvel Studios',
    keyHeroes: ['Iron Man', 'Captain America', 'Thor', 'Spider-Man', 'Doctor Strange', 'Scarlet Witch', 'Loki'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg'
  },
  {
    id: 'earth-96283',
    designation: 'Earth-96283',
    name: 'Raimi Spider-Man Universe',
    description: 'The beloved universe created by director Sam Raimi, starring Tobey Maguire as Peter Parker facing Green Goblin, Doc Ock, Sandman, and Venom.',
    primaryStudio: 'Sony Pictures',
    keyHeroes: ['Peter Parker / Spider-Man (Tobey Maguire)', 'Mary Jane Watson', 'Harry Osborn'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg'
  },
  {
    id: 'earth-120703',
    designation: 'Earth-120703',
    name: 'Webb Amazing Spider-Man Universe',
    description: 'The Marc Webb continuity featuring Andrew Garfield as a scientifically brilliant Peter Parker seeking the truth of his parents\' OsCorp origins.',
    primaryStudio: 'Sony Pictures',
    keyHeroes: ['Peter Parker / Spider-Man (Andrew Garfield)', 'Gwen Stacy'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg'
  },
  {
    id: 'earth-688',
    designation: 'Earth-688',
    name: 'Sony\'s Spider-Man Universe (SSU)',
    description: 'A darker parallel reality centered around anti-heroes and symbiotes, including Tom Hardy\'s Venom, Morbius the Living Vampire, and Kraven the Hunter.',
    primaryStudio: 'Sony Pictures',
    keyHeroes: ['Eddie Brock / Venom', 'Michael Morbius', 'Kraven the Hunter', 'Madame Web'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg'
  },
  {
    id: 'earth-10005',
    designation: 'Earth-10005',
    name: 'Fox Original X-Men Timeline',
    description: 'The original mutant timeline spanning the 2000-2006 trilogy, Origins: Wolverine, and the dystopian Sentinel future of Days of Future Past.',
    primaryStudio: '20th Century Fox',
    keyHeroes: ['Logan / Wolverine', 'Charles Xavier', 'Magneto', 'Jean Grey', 'Cyclops', 'Storm', 'Rogue'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8M97.jpg'
  },
  {
    id: 'earth-trn414',
    designation: 'Earth-TRN414',
    name: 'Fox Revised X-Men & Deadpool Timeline',
    description: 'The altered timeline created after 1973 time-travel events in Days of Future Past, continuing through First Class, Apocalypse, Logan, and Deadpool.',
    primaryStudio: '20th Century Fox',
    keyHeroes: ['Wade Wilson / Deadpool', 'Logan (Elder Wolverine)', 'Young Charles Xavier', 'X-23 Laura'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1jv8M97.jpg'
  },
  {
    id: 'earth-121698',
    designation: 'Earth-121698',
    name: 'Fantastic Four Universe (2005/2007)',
    description: 'Tim Story\'s vibrant cosmic era featuring Reed Richards, Sue Storm, Johnny Storm (Chris Evans), Ben Grimm, Doctor Doom, and the Silver Surfer.',
    primaryStudio: '20th Century Fox',
    keyHeroes: ['Mister Fantastic', 'Invisible Woman', 'Human Torch', 'The Thing', 'Silver Surfer'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg'
  },
  {
    id: 'earth-26320',
    designation: 'Earth-26320',
    name: 'Blade Vampire Universe',
    description: 'The dark gothic reality where the Daywalker, Blade (Wesley Snipes), wages eternal war against Deacon Frost, the Reapers, and Dracula.',
    primaryStudio: 'New Line Cinema',
    keyHeroes: ['Eric Brooks / Blade', 'Abraham Whistler', 'Abigail Whistler'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/7NKfxJrQn053UJeLftlx4m4NTzo.jpg'
  },
  {
    id: 'earth-sv',
    designation: 'Spider-Verse Multiverse',
    name: 'The Web of Life & Destiny (Spider-Verse)',
    description: 'The breathtaking animated multiversal convergence where Miles Morales, Gwen Stacy, Peter B. Parker, and the Spider-Society protect the canon.',
    primaryStudio: 'Sony Pictures Animation',
    keyHeroes: ['Miles Morales', 'Gwen Stacy / Spider-Woman', 'Peter B. Parker', 'Miguel O\'Hara / Spider-Man 2099', 'Pavitr Prabhakar'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg'
  },
  {
    id: 'earth-92131',
    designation: 'Earth-92131',
    name: '1990s Marvel Animated Universe / X-Men \'97',
    description: 'The beloved animated universe of the 1990s X-Men and Spider-Man series, triumphantly revived in Marvel Studios\' X-Men \'97.',
    primaryStudio: 'Marvel Animation',
    keyHeroes: ['Cyclops', 'Storm', 'Wolverine', 'Jean Grey', 'Beast', 'Gambit', 'Rogue', 'Spider-Man (90s)'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/jIyEmnBrZtl6SEWyBoMO2hZnzMa.jpg'
  },
  {
    id: 'marvel-legacy-tv',
    designation: 'Marvel Television Expanded Canon',
    name: 'Marvel Television Continuity',
    description: 'Ground-level and cosmic television arcs exploring secret operations, Inhuman outbreaks, street crime, and adolescent super-powers.',
    primaryStudio: 'Marvel Television',
    keyHeroes: ['Phil Coulson', 'Daisy Johnson / Quake', 'Matt Murdock / Daredevil', 'Frank Castle / Punisher', 'Tandy Bowen & Tyrone Johnson'],
    bannerUrl: 'https://image.tmdb.org/t/p/w1280/pPALpad1Fh14g7ejyQjqKzlhrBw.jpg'
  }
];
