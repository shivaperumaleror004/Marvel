const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function getMovieCredits(tmdbId) {
  const q = new URLSearchParams({ path: `/movie/${tmdbId}`, append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.credits?.cast || [];
}

async function getTvCredits(tmdbId) {
  const q = new URLSearchParams({ path: `/tv/${tmdbId}`, append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.credits?.cast || [];
}

async function run() {
  const moviesToCheck = [
    { name: 'Guardians Vol 1', id: 118340 },
    { name: 'Age of Ultron', id: 99861 },
    { name: 'WandaVision', tvId: 85271 },
    { name: 'Agatha All Along', tvId: 138501 },
    { name: 'Deadpool & Wolverine', id: 533535 },
    { name: 'Fantastic Four (2025)', id: 617126 },
    { name: 'X-Men: Days of Future Past', id: 127585 },
    { name: 'Daredevil', tvId: 61889 },
    { name: 'The Punisher', tvId: 67178 },
    { name: 'Ghost Rider', id: 1250 },
    { name: 'Blade', id: 36647 },
    { name: 'Spider-Man 1', id: 557 },
    { name: 'Amazing Spider-Man', id: 1930 },
    { name: 'Venom', id: 335983 },
    { name: 'Moon Knight', tvId: 92749 },
    { name: 'Loki', tvId: 84958 }
  ];

  const profiles = {};

  for (const item of moviesToCheck) {
    const cast = item.tvId ? await getTvCredits(item.tvId) : await getMovieCredits(item.id);
    if (!cast) continue;
    console.log(`\n=== ${item.name} ===`);
    cast.slice(0, 10).forEach(c => {
      console.log(`  ${c.name} as "${c.character}" -> /t/p/w780${c.profile_path}`);
      profiles[c.name] = c.profile_path;
    });
    await sleep(250);
  }
}

run();
