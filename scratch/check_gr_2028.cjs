const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function checkGhostRider() {
  const q = new URLSearchParams({ path: '/movie/1738010', append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  const data = await res.json();
  console.log('Ghost Rider (2028):', JSON.stringify(data, null, 2));
}

checkGhostRider();
