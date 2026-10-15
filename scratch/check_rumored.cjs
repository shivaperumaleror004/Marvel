const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function search(q) {
  const param = new URLSearchParams({ path: '/search/multi', query: q });
  const res = await fetch(`${BACKEND_URL}?${param.toString()}`);
  const data = await res.json();
  console.log(`\n=== SEARCH: "${q}" ===`);
  data.results?.slice(0, 5).forEach(r => {
    console.log(`  [${r.media_type}] ${r.title || r.name} (${r.release_date || r.first_air_date}) ID: ${r.id} | status/pop: ${r.popularity}`);
  });
}

async function run() {
  await search('Doctor Strange 3');
  await search('Black Panther 3');
  await search('Zodiac');
  await search('Marvel Zodiac');
  await search('Avengers');
}

run();
