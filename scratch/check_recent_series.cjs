const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function checkTv(id, name) {
  const q = new URLSearchParams({ path: `/tv/${id}`, append_to_response: 'credits' });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  const d = await res.json();
  console.log({
    id: d.id,
    name: d.name,
    first_air_date: d.first_air_date,
    seasons: d.seasons?.map(s => ({ num: s.season_number, name: s.name, epCount: s.episode_count, poster: s.poster_path, airDate: s.air_date })),
    poster_path: d.poster_path,
    backdrop_path: d.backdrop_path,
    overview: d.overview?.substring(0, 80)
  });
}

async function run() {
  await checkTv(202555, 'Daredevil: Born Again');
  await checkTv(198178, 'Wonder Man');
  await checkTv(138503, 'Your Friendly Neighborhood Spider-Man');
  await checkTv(138502, "X-Men '97");
  await checkTv(138505, 'Marvel Zombies');
  await checkTv(241388, 'Eyes of Wakanda');
  await checkTv(114471, 'Ironheart');
}

run();
