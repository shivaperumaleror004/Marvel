import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Local development plugin that mimics the Vercel serverless function
 * during `npm run dev` by routing `/api/tmdb` requests directly to `api/tmdb.ts`.
 */
function tmdbLocalDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'tmdb-local-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/tmdb', async (req, res) => {
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
      });
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
