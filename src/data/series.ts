import type { Series } from '../types';

export const SERIES_DATA: Series[] = [
  {
    id: 'loki',
    title: 'Loki',
    year: 2021,
    releaseYear: '2021 - 2023',
    overview: 'The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame. Recruited by the Time Variance Authority, he navigates the complex Sacred Timeline.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    rating: 8.2,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Sci-Fi', 'Fantasy'],
    creator: 'Michael Waldron',
    releaseOrder: 25,
    chronologicalOrder: 25,
    tagline: 'Loki\'s time has come.',
    tmdbId: 88396,
    watchConfig: {
      tmdbId: 88396,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Tom Hiddleston', role: 'Loki' },
      { name: 'Owen Wilson', role: 'Mobius M. Mobius' },
      { name: 'Sophia Di Martino', role: 'Sylvie' },
      { name: 'Gugu Mbatha-Raw', role: 'Ravonna Renslayer' },
      { name: 'Ke Huy Quan', role: 'O.B.' }
    ],
    characters: ['loki'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'After stealing the Tesseract during Avengers: Endgame, Loki is brought to the mysterious Time Variance Authority.',
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'loki_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Glorious Purpose',
            runtime: 51,
            overview: 'Loki is apprehended by the Time Variance Authority (TVA) after escaping with the Tesseract in 2012.',
            still: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-06-09',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 88396
            }
          },
          {
            id: 'loki_s1_e2',
            seasonNumber: 1,
            episodeNumber: 2,
            title: 'The Variant',
            runtime: 54,
            overview: 'Mobius puts Loki to work, but not everyone at the TVA is thrilled about the God of Mischief\'s presence.',
            still: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-06-16',
            episodeWatchConfig: {
              season: 1,
              episode: 2,
              watchProvider: 'screenscape',
              tmdbId: 88396
            }
          },
          {
            id: 'loki_s1_e6',
            seasonNumber: 1,
            episodeNumber: 6,
            title: 'For All Time. Always.',
            runtime: 46,
            overview: 'The clock is ticking in the season finale as Loki and Sylvie face the mastermind behind the Citadel at the End of Time.',
            still: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-07-14',
            episodeWatchConfig: {
              season: 1,
              episode: 6,
              watchProvider: 'screenscape',
              tmdbId: 88396
            }
          }
        ]
      },
      {
        seasonNumber: 2,
        title: 'Season 2',
        overview: 'Loki navigates an ever-expanding, increasingly dangerous Multiverse in search of Sylvie, Judge Renslayer, and Miss Minutes.',
        poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'loki_s2_e1',
            seasonNumber: 2,
            episodeNumber: 1,
            title: 'Ouroboros',
            runtime: 45,
            overview: 'Loki finds himself time-slipping violently across past, present, and future inside TVA headquarters.',
            still: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
            airDate: '2023-10-05',
            episodeWatchConfig: {
              season: 2,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 88396
            }
          },
          {
            id: 'loki_s2_e6',
            seasonNumber: 2,
            episodeNumber: 6,
            title: 'Glorious Purpose (Part II)',
            runtime: 56,
            overview: 'Loki learns the true burden of his glorious purpose as he takes his throne at the center of all time.',
            still: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
            airDate: '2023-11-09',
            episodeWatchConfig: {
              season: 2,
              episode: 6,
              watchProvider: 'screenscape',
              tmdbId: 88396
            }
          }
        ]
      }
    ]
  },
  {
    id: 'wandavision',
    title: 'WandaVision',
    year: 2021,
    releaseYear: '2021',
    overview: 'Blends the style of classic sitcoms with the MCU, in which Wanda Maximoff and Vision - two super-powered beings living ideal suburban lives - begin to suspect that everything is not as it seems.',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    rating: 7.9,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Drama', 'Sci-Fi', 'Mystery'],
    creator: 'Jac Schaeffer',
    releaseOrder: 23,
    chronologicalOrder: 26,
    tagline: 'A love like no other.',
    tmdbId: 85271,
    watchConfig: {
      tmdbId: 85271,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Elizabeth Olsen', role: 'Wanda Maximoff / Scarlet Witch' },
      { name: 'Paul Bettany', role: 'Vision' },
      { name: 'Kathryn Hahn', role: 'Agatha Harkness' },
      { name: 'Teyonah Parris', role: 'Monica Rambeau' }
    ],
    characters: ['scarlet-witch', 'vision'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Wanda and Vision live out classic sitcom decades in Westview.',
        poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'wandavision_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Filmed Before a Live Studio Audience',
            runtime: 30,
            overview: 'Wanda and Vision try to conceal their powers during a dinner with Vision\'s boss and his wife.',
            still: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-01-15',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 85271
            }
          },
          {
            id: 'wandavision_s1_e9',
            seasonNumber: 1,
            episodeNumber: 9,
            title: 'The Series Finale',
            runtime: 50,
            overview: 'The climax of WandaVision unfold as Wanda embraces her destiny as the Scarlet Witch.',
            still: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-03-05',
            episodeWatchConfig: {
              season: 1,
              episode: 9,
              watchProvider: 'screenscape',
              tmdbId: 85271
            }
          }
        ]
      }
    ]
  },
  {
    id: 'the-falcon-and-the-winter-soldier',
    title: 'The Falcon and the Winter Soldier',
    year: 2021,
    releaseYear: '2021',
    overview: 'Following the events of Avengers: Endgame, Sam Wilson/Falcon and Bucky Barnes/Winter Soldier team up in a global adventure that tests their abilities—and their patience.',
    poster: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    rating: 7.1,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Adventure', 'Drama'],
    creator: 'Malcolm Spellman',
    releaseOrder: 24,
    chronologicalOrder: 27,
    tagline: 'Honor the legacy.',
    tmdbId: 88396, // Or TV ID for TFATWS (88396/92782)
    watchConfig: {
      tmdbId: 88396,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Anthony Mackie', role: 'Sam Wilson / Falcon' },
      { name: 'Sebastian Stan', role: 'Bucky Barnes / Winter Soldier' },
      { name: 'Wyatt Russell', role: 'John Walker / U.S. Agent' }
    ],
    characters: ['captain-america'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Sam Wilson struggles with taking up the mantle of Captain America.',
        poster: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'fatws_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'New World Order',
            runtime: 50,
            overview: 'Sam Wilson hands over Captain America\'s shield while Bucky Barnes tries to make amends.',
            still: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-03-19',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 88396
            }
          }
        ]
      }
    ]
  },
  {
    id: 'what-if',
    title: 'What If...?',
    year: 2021,
    releaseYear: '2021 - 2024',
    overview: 'Exploring pivotal moments from the Marvel Cinematic Universe and turning them on their head, leading the audience into uncharted territory through alternate timelines.',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    rating: 7.4,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Animation', 'Action', 'Sci-Fi'],
    creator: 'A.C. Bradley',
    releaseOrder: 26,
    chronologicalOrder: 29,
    tagline: 'Enter the multiverse of infinite possibilities.',
    tmdbId: 91363,
    watchConfig: {
      tmdbId: 91363,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Jeffrey Wright', role: 'The Watcher' }
    ],
    characters: ['iron-man', 'thor', 'captain-america'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Alternate realities across the Marvel Multiverse.',
        poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'what_if_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'What If... Captain Carter Were The First Avenger?',
            runtime: 34,
            overview: 'When Steve Rogers is injured, Peggy Carter takes the super soldier serum.',
            still: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-08-11',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 91363
            }
          }
        ]
      }
    ]
  },
  {
    id: 'hawkeye',
    title: 'Hawkeye',
    year: 2021,
    releaseYear: '2021',
    overview: 'Former Avenger Clint Barton has a seemingly simple mission: get back to his family for Christmas. Possible? With the help of Kate Bishop, a 22-year-old archer with dreams of becoming a superhero.',
    poster: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop',
    rating: 7.5,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Adventure', 'Crime'],
    creator: 'Jonathan Igla',
    releaseOrder: 27,
    chronologicalOrder: 31,
    tagline: 'This holiday season, target accuracy is everything.',
    tmdbId: 88329,
    watchConfig: {
      tmdbId: 88329,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Jeremy Renner', role: 'Clint Barton / Hawkeye' },
      { name: 'Hailee Steinfeld', role: 'Kate Bishop' },
      { name: 'Florence Pugh', role: 'Yelena Belova' }
    ],
    characters: ['hawkeye'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Clint Barton teams up with Kate Bishop during Christmas in NYC.',
        poster: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'hawkeye_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Never Meet Your Heroes',
            runtime: 47,
            overview: 'Clint Barton\'s NYC holiday trip with his kids is interrupted when Kate Bishop gets involved with the Ronin suit.',
            still: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
            airDate: '2021-11-24',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 88329
            }
          }
        ]
      }
    ]
  },
  {
    id: 'moon-knight',
    title: 'Moon Knight',
    year: 2022,
    releaseYear: '2022',
    overview: 'Steven Grant discovers he\'s been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse for his troubled life.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    rating: 7.3,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Adventure', 'Fantasy'],
    creator: 'Jeremy Slater',
    releaseOrder: 29,
    chronologicalOrder: 32,
    tagline: 'Embrace the chaos.',
    tmdbId: 92749,
    watchConfig: {
      tmdbId: 92749,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Oscar Isaac', role: 'Steven Grant / Marc Spector / Moon Knight' },
      { name: 'Ethan Hawke', role: 'Arthur Harrow' },
      { name: 'May Calamawy', role: 'Layla El-Faouly' }
    ],
    characters: [],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Steven Grant uncovers his alter ego Marc Spector and the avatar of Khonshu.',
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'moon_knight_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'The Goldfish Problem',
            runtime: 45,
            overview: 'Mild-mannered gift shop employee Steven Grant experiences blackouts and memories of another life.',
            still: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
            airDate: '2022-03-30',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 92749
            }
          }
        ]
      }
    ]
  },
  {
    id: 'ms-marvel',
    title: 'Ms. Marvel',
    year: 2022,
    releaseYear: '2022',
    overview: 'Kamala Khan, a Muslim American teenager growing up in Jersey City. An avid gamer and a voracious fan-fiction scribe, Kamala is a Super Hero mega-fan with an oversized imagination, particularly when it comes to Captain Marvel.',
    poster: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    rating: 6.3,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Adventure', 'Comedy'],
    creator: 'Bisha K. Ali',
    releaseOrder: 30,
    chronologicalOrder: 33,
    tagline: 'Future is cosmic.',
    tmdbId: 92783,
    watchConfig: {
      tmdbId: 92783,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Iman Vellani', role: 'Kamala Khan / Ms. Marvel' },
      { name: 'Matt Lintz', role: 'Bruno Carrelli' },
      { name: 'Yasmeen Fletcher', role: 'Nakia Bahadir' }
    ],
    characters: [],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Kamala gets cosmic light powers from a heirloom bangle.',
        poster: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'ms_marvel_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Generation Why',
            runtime: 47,
            overview: 'Kamala Khan attends AvengerCon dressed as Captain Marvel and unlocks unexpected superpowers.',
            still: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
            airDate: '2022-06-08',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 92783
            }
          }
        ]
      }
    ]
  },
  {
    id: 'she-hulk',
    title: 'She-Hulk: Attorney at Law',
    year: 2022,
    releaseYear: '2022',
    overview: 'Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered hulk.',
    poster: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop',
    rating: 5.3,
    phase: 'Phase 4',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    creator: 'Jessica Gao',
    releaseOrder: 31,
    chronologicalOrder: 34,
    tagline: 'Lawyer. Hulk. Icon.',
    tmdbId: 92782,
    watchConfig: {
      tmdbId: 92782,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Tatiana Maslany', role: 'Jennifer Walters / She-Hulk' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / Smart Hulk' },
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' }
    ],
    characters: ['hulk'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Jennifer balances her superhero cases with her fourth-wall breaking social life.',
        poster: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'she_hulk_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'A Normal Amount of Rage',
            runtime: 35,
            overview: 'Jennifer Walters\' life changes forever after a car accident exposes her to Bruce Banner\'s gamma-irradiated blood.',
            still: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
            airDate: '2022-08-18',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 92782
            }
          }
        ]
      }
    ]
  },
  {
    id: 'secret-invasion',
    title: 'Secret Invasion',
    year: 2023,
    releaseYear: '2023',
    overview: 'Nick Fury learns of a secret invasion of Earth by a faction of shapeshifting Skrulls. Fury joins his allies to stop the Skrull threat.',
    poster: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1600&auto=format&fit=crop',
    rating: 5.9,
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Adventure', 'Drama', 'Mystery'],
    creator: 'Kyle Bradstreet',
    releaseOrder: 32,
    chronologicalOrder: 35,
    tagline: 'Trust no one.',
    tmdbId: 114472,
    watchConfig: {
      tmdbId: 114472,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Samuel L. Jackson', role: 'Nick Fury' },
      { name: 'Ben Mendelsohn', role: 'Talos' },
      { name: 'Emilia Clarke', role: 'G\'iah' },
      { name: 'Olivia Colman', role: 'Sonya Falsworth' }
    ],
    characters: ['nick-fury'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Nick Fury uncovers a secret Skrull plot infiltrating Earth\'s governments.',
        poster: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'secret_invasion_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Resurrection',
            runtime: 54,
            overview: 'Nick Fury returns to Earth to investigate a rogue Skrull faction planning to ignite war.',
            still: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=800&auto=format&fit=crop',
            airDate: '2023-06-21',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 114472
            }
          }
        ]
      }
    ]
  },
  {
    id: 'echo',
    title: 'Echo',
    year: 2024,
    releaseYear: '2024',
    overview: 'Maya Lopez must face her past, reconnect with her Native American roots, and embrace the meaning of family and community if she ever hopes to move forward after Wilson Fisk.',
    poster: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    rating: 6.1,
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Crime', 'Drama'],
    creator: 'Marion Dayre',
    releaseOrder: 33,
    chronologicalOrder: 36,
    tagline: 'No place left to hide.',
    tmdbId: 125928,
    watchConfig: {
      tmdbId: 125928,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Alaqua Cox', role: 'Maya Lopez / Echo' },
      { name: 'Vincent D\'Onofrio', role: 'Wilson Fisk / Kingpin' },
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' }
    ],
    characters: [],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Maya Lopez flees to Oklahoma while pursued by Kingpin\'s empire.',
        poster: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'echo_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Chafa',
            runtime: 49,
            overview: 'Maya Lopez\'s origin story and her tragic ties to Wilson Fisk in New York.',
            still: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
            airDate: '2024-01-09',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 125928
            }
          }
        ]
      }
    ]
  },
  {
    id: 'agatha-all-along',
    title: 'Agatha All Along',
    year: 2024,
    releaseYear: '2024',
    overview: 'A spell-bound Agatha Harkness regains freedom thanks to a mysterious goth teen. Intrigued by his plea, she embarks upon the Witches\' Road to reclaim her lost powers.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    rating: 7.7,
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Comedy', 'Fantasy', 'Mystery'],
    creator: 'Jac Schaeffer',
    releaseOrder: 35,
    chronologicalOrder: 38,
    tagline: 'Don\'t cross the witches.',
    tmdbId: 138502,
    watchConfig: {
      tmdbId: 138502,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Kathryn Hahn', role: 'Agatha Harkness' },
      { name: 'Joe Locke', role: 'Billy Maximoff / Wiccan' },
      { name: 'Aubrey Plaza', role: 'Rio Vidal / Death' },
      { name: 'Patti LuPone', role: 'Lilia Calderu' }
    ],
    characters: ['scarlet-witch'],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Agatha gathers a coven to walk the perilous Witches\' Road.',
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'agatha_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Seekest Thou the Road',
            runtime: 42,
            overview: 'Agatha Harkness breaks free from Wanda\'s spell in Westview with the help of Teen.',
            still: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
            airDate: '2024-09-18',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 138502
            }
          }
        ]
      }
    ]
  },
  {
    id: 'daredevil-born-again',
    title: 'Daredevil: Born Again',
    year: 2025,
    releaseYear: '2025',
    overview: 'Matt Murdock, a blind lawyer with heightened abilities who fights for justice through his bustling law firm, while former mob boss Wilson Fisk pursues his own political endeavors in New York.',
    poster: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop',
    rating: 8.5,
    phase: 'Phase 5',
    saga: 'Multiverse Saga',
    genres: ['Action', 'Crime', 'Drama'],
    creator: 'Dario Scardapane',
    releaseOrder: 36,
    chronologicalOrder: 39,
    tagline: 'Justice returns to Hell\'s Kitchen.',
    tmdbId: 202720,
    watchConfig: {
      tmdbId: 202720,
      type: 'tv',
      watchProvider: 'screenscape',
      language: 'eng'
    },
    cast: [
      { name: 'Charlie Cox', role: 'Matt Murdock / Daredevil' },
      { name: 'Vincent D\'Onofrio', role: 'Wilson Fisk / Kingpin' },
      { name: 'Jon Bernthal', role: 'Frank Castle / The Punisher' },
      { name: 'Deborah Ann Woll', role: 'Karen Page' }
    ],
    characters: [],
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Matt Murdock and Wilson Fisk collision course in New York City politics and vigilante street wars.',
        poster: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=800&auto=format&fit=crop',
        episodes: [
          {
            id: 'daredevil_ba_s1_e1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Devil\'s Work',
            runtime: 54,
            overview: 'Matt Murdock defends Hell\'s Kitchen against corruption while Wilson Fisk launches his mayor campaign.',
            still: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
            airDate: '2025-03-04',
            episodeWatchConfig: {
              season: 1,
              episode: 1,
              watchProvider: 'screenscape',
              tmdbId: 202720
            }
          }
        ]
      }
    ]
  }
];
