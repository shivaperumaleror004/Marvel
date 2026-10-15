const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function checkCast(path) {
  const q = new URLSearchParams({ path, append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  const data = await res.json();
  console.log(`\n=== ${data.title || data.name} ===`);
  data.credits?.cast?.slice(0, 10).forEach(c => {
    console.log(`  ${c.name} as "${c.character}" -> profile_path: ${c.profile_path}`);
  });
}

async function run() {
  await checkCast('/movie/118340'); // Guardians 1
  await checkCast('/movie/99861');  // Age of Ultron
  await checkCast('/tv/138501');    // Agatha All Along
  await checkCast('/movie/505642'); // Wakanda Forever (Shuri / Namor)
  await checkCast('/movie/533535'); // Deadpool & Wolverine (Deadpool / Cassandra Nova)
}

run();
