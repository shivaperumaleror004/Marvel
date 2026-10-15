/**
 * Universal Serverless API Handler
 * Re-exports the unified TMDB proxy implementation from server/src/tmdbProxy.ts
 * ensuring identical security, parameter validation, rate-limit, and retry logic.
 */
export {
  default,
  executeTmdbProxy,
  validatePath,
  validateAndFilterParams,
  type ProxyResult,
} from '../server/src/tmdbProxy.js';
