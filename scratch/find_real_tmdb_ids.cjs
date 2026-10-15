const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function queryProxy(path, params = {}) {
  const q = new URLSearchParams({ path, ...params });
  const url = `${BACKEND_URL}?${q.toString()}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) {
        if (attempt === 3) return { status: res.status, error: res.statusText };
        await sleep(500 * attempt);
        continue;
      }
      return await res.json();
    } catch (e) {
      if (attempt === 3) return { error: e.message };
      await sleep(500 * attempt);
    }
  }
}

async function searchTitle(query, type = 'movie') {
  const data = await queryProxy(`/search/${type}`, { query });
  console.log(`\n=== SEARCH ${type.toUpperCase()}: "${query}" ===`);
  data?.results?.slice(0, 4).forEach(r => {
    console.log(`  ID: ${r.id} | Title: "${r.title || r.name}" (${r.release_date || r.first_air_date}) | Poster: ${r.poster_path} | Backdrop: ${r.backdrop_path}`);
  });
  await sleep(200);
}

async function run() {
  await searchTitle('Team Thor', 'movie');
  await searchTitle('Team Thor: Part 2', 'movie');
  await searchTitle('Team Darryl', 'movie');
  await searchTitle('No Good Deed', 'movie');
  await searchTitle('All Hail the King', 'movie');
  await searchTitle('The Consultant', 'movie');
  await searchTitle('Item 47', 'movie');
  await searchTitle('A Funny Thing Happened on the Way to Thor', 'movie');
  await searchTitle('Agent Carter', 'movie');
  await searchTitle('Werewolf by Night', 'movie');
  await searchTitle('The Guardians of the Galaxy Holiday Special', 'tv');
  await searchTitle('The Guardians of the Galaxy Holiday Special', 'movie');
  await searchTitle('Blade', 'movie');
  await searchTitle('Armor Wars', 'movie');
  await searchTitle('Doctor Strange', 'movie');
  await searchTitle('Black Panther', 'movie');
  await searchTitle('Spider-Man', 'movie');
}

run();
