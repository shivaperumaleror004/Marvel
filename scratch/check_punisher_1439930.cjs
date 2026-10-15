const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function checkPunisher() {
  const q = new URLSearchParams({ path: '/movie/1439930', append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  const data = await res.json();
  console.log('Punisher One Last Kill:', JSON.stringify(data, null, 2));
}

checkPunisher();
