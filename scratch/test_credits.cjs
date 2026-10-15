const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function testCredits() {
  const q = new URLSearchParams({ path: '/movie/299536', append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Movie:', data.title);
  console.log('Cast count:', data.credits?.cast?.length);
  data.credits?.cast?.slice(0, 15).forEach(c => {
    console.log(`- ${c.name} as "${c.character}" -> profile_path: ${c.profile_path}`);
  });
}

testCredits();
