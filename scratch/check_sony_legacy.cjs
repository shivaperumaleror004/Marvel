const BACKEND_URL = 'https://marvel-aytt.onrender.com/api/tmdb';

async function checkDetails(id) {
  const q = new URLSearchParams({ path: `/movie/${id}` });
  const res = await fetch(`${BACKEND_URL}?${q.toString()}`);
  const d = await res.json();
  console.log(`[${id}] "${d.title}" (${d.release_date}) - poster: ${d.poster_path}, backdrop: ${d.backdrop_path}`);
}

async function run() {
  const ids = [335983, 580489, 912649, 526896, 634492, 539972, 39598, 44379, 44380, 172605, 418078];
  for (const id of ids) {
    await checkDetails(id);
  }
}

run();
