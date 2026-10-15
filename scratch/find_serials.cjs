const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function search(q) {
  const p = new URLSearchParams({ path: '/search/movie', query: q });
  const res = await fetch(`${BACKEND_URL}?${p.toString()}`);
  const d = await res.json();
  console.log(`\n=== SEARCH: "${q}" ===`);
  d.results?.slice(0, 5).forEach(r => {
    console.log(`  ID: ${r.id} | "${r.title}" (${r.release_date}) | poster: ${r.poster_path}`);
  });
}

async function run() {
  await search('Captain America 1944');
  await search('Spider-Man 1977');
  await search('Spider-Man Strikes Back');
  await search("Spider-Man: The Dragon's Challenge");
  await search('Spider-Man 1978');
  await search('Supaidaman');
}

run();
