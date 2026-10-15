const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function checkGosling() {
  const q = new URLSearchParams({ path: '/movie/335984', append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  const data = await res.json();
  const ryan = data.credits?.cast?.find(c => c.name.includes('Ryan Gosling'));
  console.log('Ryan Gosling:', ryan?.name, ryan?.profile_path);
}

checkGosling();
