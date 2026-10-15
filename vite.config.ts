import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Local middleware that mimics the Vercel serverless function
 * during both `npm run dev` and `npm run preview` by routing `/api/tmdb`
 * requests directly to `api/tmdb.ts`.
 */
function createTmdbMiddleware(env: Record<string, string>) {
  return async (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => {
    process.env.TMDB_API_KEY = env.TMDB_API_KEY || process.env.TMDB_API_KEY || '';
    try {
      const { default: handler } = await import('./api/tmdb.ts');
      await handler(req, res);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: errorMsg }));
    }
  };
}

function tmdbLocalDevPlugin(env: Record<string, string>): Plugin {
  const middleware = createTmdbMiddleware(env);
  return {
    name: 'tmdb-local-middleware',
    configureServer(server) {
      server.middlewares.use('/api/tmdb', middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/tmdb', middleware);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), tmdbLocalDevPlugin(env)],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-framer-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
            }
          },
        },
      },
    },
  };
});
