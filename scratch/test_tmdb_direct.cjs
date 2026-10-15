const TMDB_API_KEY = '69a04a6a3d1bcc7d6eeaffdbfd3f6b91';

async function queryDirect(path, params = {}) {
  const q = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
  const url = `https://api.themoviedb.org/3${path}?${q.toString()}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Marvel-Zero-G-App/1.0',
      'Accept': 'application/json'
    }
  });
  if (!res.ok) return { status: res.status, error: res.statusText };
  return await res.json();
}

async function run() {
  const p = await queryDirect('/search/person', { query: 'Robert Downey Jr.' });
  console.log('RDJ result:', p.results?.[0]?.name, p.results?.[0]?.profile_path);

  const vin = await queryDirect('/search/person', { query: 'Vin Diesel' });
  console.log('Vin Diesel:', vin.results?.[0]?.name, vin.results?.[0]?.profile_path);

  const spader = await queryDirect('/search/person', { query: 'James Spader' });
  console.log('James Spader:', spader.results?.[0]?.name, spader.results?.[0]?.profile_path);

  const brolin = await queryDirect('/search/person', { query: 'Josh Brolin' });
  console.log('Josh Brolin:', brolin.results?.[0]?.name, brolin.results?.[0]?.profile_path);
}

run();
