const https = require('https');

const TMDB_API_KEY = '69a04a6a3d1bcc7d6eeaffdbfd3f6b91';

async function queryTmdb(path, params = {}) {
  const q = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
  const url = `https://api.themoviedb.org/3${path}?${q.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    return { status: res.status, error: res.statusText };
  }
  return await res.json();
}

async function run() {
  const ids = [413277, 441384, 503619, 445030, 617127, 897087, 978436, 1003596, 1003598, 119843];
  for (const id of ids) {
    const data = await queryTmdb(`/movie/${id}`);
    console.log(`Movie ${id}: title="${data.title}", poster_path="${data.poster_path}", backdrop_path="${data.backdrop_path}"`);
  }

  // Also search for Punisher One Last Kill, VisionQuest, Ghost Rider
  console.log('\n--- SEARCH PUNISHER ---');
  const pSearch = await queryTmdb('/search/multi', { query: 'The Punisher' });
  pSearch.results?.slice(0, 5).forEach(r => console.log(`  [${r.media_type}] ${r.title || r.name} (${r.release_date || r.first_air_date}) ID: ${r.id}, poster: ${r.poster_path}`));

  console.log('\n--- SEARCH VISIONQUEST ---');
  const vSearch = await queryTmdb('/search/multi', { query: 'VisionQuest' });
  vSearch.results?.slice(0, 5).forEach(r => console.log(`  [${r.media_type}] ${r.title || r.name} (${r.release_date || r.first_air_date}) ID: ${r.id}, poster: ${r.poster_path}`));
  
  const vSearch2 = await queryTmdb('/search/multi', { query: 'Vision Quest' });
  vSearch2.results?.slice(0, 5).forEach(r => console.log(`  [${r.media_type}] ${r.title || r.name} (${r.release_date || r.first_air_date}) ID: ${r.id}, poster: ${r.poster_path}`));

  console.log('\n--- SEARCH GHOST RIDER ---');
  const grSearch = await queryTmdb('/search/movie', { query: 'Ghost Rider' });
  grSearch.results?.slice(0, 5).forEach(r => console.log(`  Movie: ${r.title} (${r.release_date}) ID: ${r.id}, poster: ${r.poster_path}`));
}

run();
