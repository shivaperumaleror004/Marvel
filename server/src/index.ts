import express, { type Request, type Response, type NextFunction } from 'express';
import cors, { type CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { executeTmdbProxy } from './tmdbProxy.js';

// Load local environment files if present (.env, .env.local, and root .env.local)
dotenv.config();
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '../.env.local' });

const app = express();

const PORT = parseInt(process.env.PORT || '5000', 10);
const HOST = '0.0.0.0';

/**
 * Configure Origin Whitelist for CORS
 * Explicitly allows:
 * - Local development and preview hosts (localhost, 127.0.0.1 on standard Vite/web ports)
 * - Vercel production and preview deployment domains (*.vercel.app)
 * - Custom origins supplied via process.env.ALLOWED_ORIGINS or process.env.FRONTEND_URL
 */
function buildCorsOptions(): CorsOptions {
  const customOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

  return {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, curl, health checks)
      if (!origin) {
        return callback(null, true);
      }

      // Check explicit custom origins
      if (customOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow localhost and local IP development servers
      const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      if (isLocalhost) {
        return callback(null, true);
      }

      // Allow Vercel production and preview deployment URLs
      const isVercelDomain = /^https:\/\/[a-zA-Z0-9_-]+(\.vercel\.app)$/.test(origin);
      if (isVercelDomain) {
        return callback(null, true);
      }

      // Reject all other arbitrary origins
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    maxAge: 86400, // 24 hours preflight cache
  };
}

const corsMiddleware = cors(buildCorsOptions());
app.use(corsMiddleware);

// Handle preflight OPTIONS requests across all endpoints
app.options('*', corsMiddleware);

// Request logger for Render logs
app.use((req: Request, _res: Response, next: NextFunction) => {
  const start = Date.now();
  _res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${_res.statusCode} (${duration}ms)`);
  });
  next();
});

/**
 * Health Check Endpoint for Render and monitoring probes
 */
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'marvel-zero-g-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    tmdbConfigured: Boolean((process.env.TMDB_API_KEY || '').trim()),
  });
});

/**
 * Root Welcome & Information Endpoint
 */
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'MARVEL // ZERO-G Backend API',
    status: 'online',
    endpoints: {
      health: '/health',
      tmdb: '/api/tmdb?path=/search/movie&query={title}',
    },
  });
});

/**
 * TMDB Serverless API Proxy Route
 * Directly invokes executeTmdbProxy preserving whitelist, parameter validation,
 * rate limit handling, and secret isolation.
 */
app.all('/api/tmdb', async (req: Request, res: Response) => {
  try {
    const result = await executeTmdbProxy(req.method, req.originalUrl || req.url);
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value);
    }
    res.status(result.statusCode).send(result.body);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ error: errorMsg });
  }
});

// Error handler middleware (handles CORS rejections and unexpected exceptions)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err && err.message && err.message.includes('CORS')) {
    return res.status(403).json({ error: err.message });
  }
  return res.status(500).json({ error: err?.message || 'Internal Server Error' });
});

// 404 Fallback for unmapped endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

// Start listening
const server = app.listen(PORT, HOST, () => {
  console.log(`MARVEL // ZERO-G Render backend running on http://${HOST}:${PORT}`);
  console.log(`Health check: http://${HOST}:${PORT}/health`);
  console.log(`TMDB Key Configured: ${Boolean((process.env.TMDB_API_KEY || '').trim())}`);
});

// Graceful shutdown
const handleShutdown = (signal: string) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
