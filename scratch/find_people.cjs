const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function queryProxy(path, params = {}) {
  const q = new URLSearchParams({ path, ...params });
  const url = `${BACKEND_URL}?${q.toString()}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) {
        if (attempt === 3) return null;
        await sleep(400 * attempt);
        continue;
      }
      return await res.json();
    } catch (e) {
      if (attempt === 3) return null;
      await sleep(400 * attempt);
    }
  }
}

async function findPerson(name) {
  const data = await queryProxy('/search/person', { query: name });
  const p = data?.results?.[0];
  if (p) {
    console.log(`Person "${name}": ID ${p.id}, profile_path: ${p.profile_path}`);
    return p;
  } else {
    console.log(`Person "${name}": NOT FOUND`);
    return null;
  }
}

async function run() {
  const names = [
    'Vin Diesel',
    'Chris Pratt',
    'James Spader',
    'Paul Bettany',
    'Josh Brolin',
    'Kathryn Hahn',
    'Vanessa Kirby',
    'Pedro Pascal',
    'Joseph Quinn',
    'Ebon Moss-Bachrach',
    'Robert Downey Jr.',
    'Chris Evans',
    'Chris Hemsworth',
    'Mark Ruffalo',
    'Scarlett Johansson',
    'Jeremy Renner',
    'Tom Holland',
    'Tobey Maguire',
    'Andrew Garfield',
    'Benedict Cumberbatch',
    'Elizabeth Olsen',
    'Ryan Reynolds',
    'Hugh Jackman',
    'Wesley Snipes',
    'Samuel L. Jackson',
    'Jon Bernthal',
    'Nicolas Cage',
    'Ryan Gosling',
    'Sebastian Stan',
    'Don Cheadle',
    'Patrick Stewart',
    'Ian McKellen',
    'Bradley Cooper',
    'Zoe Saldana',
    'Tom Hardy',
    'Tom Hiddleston',
    'Chadwick Boseman',
    'Paul Rudd',
    'Brie Larson',
    'Charlie Cox',
    'Oscar Isaac',
    'Simu Liu',
    'Anthony Mackie'
  ];

  for (const n of names) {
    await findPerson(n);
    await sleep(150);
  }
}

run();
