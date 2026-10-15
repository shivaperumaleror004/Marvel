/**
 * MARVEL // ZERO-G — Complete Backend Test Suite
 * Validates health, TMDB proxying, validation, error handling, and CORS origins.
 */

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

async function runTestSuite() {
  console.log('======================================================');
  console.log('   MARVEL // ZERO-G BACKEND TEST SUITE');
  console.log('   Target URL:', BASE_URL);
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    process.stdout.write(`• Testing: ${name}... `);
    try {
      await fn();
      console.log('PASSED');
      passed++;
    } catch (err) {
      console.log('FAILED');
      console.error(`  Error: ${err.message}`);
      failed++;
    }
  }

  // 1. Health Check
  await test('GET /health (Service Health & Uptime)', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(`Expected status "ok", got "${data.status}"`);
    if (!data.tmdbConfigured) throw new Error('tmdbConfigured is false on server');
  });

  // 2. Movie Search
  await test('GET /api/tmdb?path=/search/movie&query=Iron%20Man', async () => {
    const res = await fetch(`${BASE_URL}/api/tmdb?path=/search/movie&query=Iron%20Man`);
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const data = await res.json();
    if (!data.results || !data.results.length) throw new Error('Expected results array');
    const match = data.results.find(m => m.title && m.title.toLowerCase().includes('iron man'));
    if (!match) throw new Error('Could not find Iron Man in results');
  });

  // 3. TV Search
  await test('GET /api/tmdb?path=/search/tv&query=Loki', async () => {
    const res = await fetch(`${BASE_URL}/api/tmdb?path=/search/tv&query=Loki`);
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const data = await res.json();
    if (!data.results || !data.results.length) throw new Error('Expected results array');
    const match = data.results.find(s => s.name && s.name.toLowerCase().includes('loki'));
    if (!match) throw new Error('Could not find Loki in results');
  });

  // 4. Query with Apostrophes & Spaces
  await test('GET /api/tmdb with special characters ("Marvel\'s The Avengers")', async () => {
    const p = new URLSearchParams({ path: '/search/movie', query: "Marvel's The Avengers" });
    const res = await fetch(`${BASE_URL}/api/tmdb?` + p.toString());
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const data = await res.json();
    if (!data.results || !data.results.length) throw new Error('Expected results array');
  });

  // 5. Invalid Path Rejection
  await test('GET /api/tmdb with disallowed path (Security / Path Whitelist)', async () => {
    const res = await fetch(`${BASE_URL}/api/tmdb?path=/admin/secret`);
    if (res.status !== 400) throw new Error(`Expected HTTP 400 Bad Request, got ${res.status}`);
    const data = await res.json();
    if (!data.error) throw new Error('Expected error message in response');
  });

  // 6. Disallowed Parameter Rejection
  await test('GET /api/tmdb with client-supplied credentials (api_key param)', async () => {
    const res = await fetch(`${BASE_URL}/api/tmdb?path=/search/movie&query=test&api_key=hacked`);
    if (res.status !== 400) throw new Error(`Expected HTTP 400 Bad Request, got ${res.status}`);
    const data = await res.json();
    if (!data.error) throw new Error('Expected error message in response');
  });

  // 7. Unsupported HTTP Method
  await test('POST /api/tmdb (Method Whitelist - only GET/HEAD allowed)', async () => {
    const res = await fetch(`${BASE_URL}/api/tmdb?path=/search/movie&query=test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'test' })
    });
    if (res.status !== 405) throw new Error(`Expected HTTP 405 Method Not Allowed, got ${res.status}`);
  });

  // 8. CORS: Allowed Vercel Origin
  await test('CORS allowed origin: https://marvel-zero-g.vercel.app', async () => {
    const origin = 'https://marvel-zero-g.vercel.app';
    const res = await fetch(`${BASE_URL}/health`, {
      headers: { 'Origin': origin }
    });
    const acao = res.headers.get('access-control-allow-origin');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (acao !== origin) throw new Error(`Expected ACAO "${origin}", got "${acao}"`);
  });

  // 9. CORS: Allowed Preview Vercel Origin
  await test('CORS allowed preview origin: https://preview-123.vercel.app', async () => {
    const origin = 'https://preview-123.vercel.app';
    const res = await fetch(`${BASE_URL}/health`, {
      headers: { 'Origin': origin }
    });
    const acao = res.headers.get('access-control-allow-origin');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (acao !== origin) throw new Error(`Expected ACAO "${origin}", got "${acao}"`);
  });

  // 10. CORS: Allowed Localhost Origin
  await test('CORS allowed localhost origin: http://localhost:5173', async () => {
    const origin = 'http://localhost:5173';
    const res = await fetch(`${BASE_URL}/health`, {
      headers: { 'Origin': origin }
    });
    const acao = res.headers.get('access-control-allow-origin');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (acao !== origin) throw new Error(`Expected ACAO "${origin}", got "${acao}"`);
  });

  // 11. CORS Preflight OPTIONS
  await test('CORS preflight: OPTIONS /api/tmdb', async () => {
    const origin = 'https://marvel-zero-g.vercel.app';
    const res = await fetch(`${BASE_URL}/api/tmdb`, {
      method: 'OPTIONS',
      headers: {
        'Origin': origin,
        'Access-Control-Request-Method': 'GET'
      }
    });
    if (res.status !== 204) throw new Error(`Expected HTTP 204 No Content, got ${res.status}`);
    const methods = res.headers.get('access-control-allow-methods') || '';
    if (!methods.includes('GET')) throw new Error(`Expected GET in allow-methods, got "${methods}"`);
  });

  // 12. CORS: Unauthorized Origin Rejection
  await test('CORS unauthorized origin rejection (https://malicious-site.com)', async () => {
    const origin = 'https://malicious-site.com';
    const res = await fetch(`${BASE_URL}/health`, {
      headers: { 'Origin': origin }
    });
    if (res.status !== 403) throw new Error(`Expected HTTP 403 Forbidden, got ${res.status}`);
  });

  console.log('\n======================================================');
  console.log(`   TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
