import type { IncomingMessage, ServerResponse } from 'node:http';

// TMDB API Base URL
const TMDB_API_ORIGIN = 'https://api.themoviedb.org/3';

// Approved TMDB API endpoints
const ALLOWED_PATH_PATTERNS: RegExp[] = [
  /^\/movie\/\d+$/,
  /^\/tv\/\d+$/,
  /^\/tv\/\d+\/season\/\d+$/,
  /^\/tv\/\d+\/season\/\d+\/episode\/\d+$/,
  /^\/movie\/(popular|now_playing|upcoming)$/,
  /^\/tv\/(popular|airing_today)$/,
  /^\/trending\/all\/(day|week)$/,
  /^\/search\/(movie|tv|multi)$/,
  /^\/genre\/(movie|tv)\/list$/,
];

// Approved query parameters and their validation rules
function validateAndFilterParams(rawParams: URLSearchParams): { validParams: URLSearchParams; error?: string } {
  const filtered = new URLSearchParams();

  for (const [key, value] of rawParams.entries()) {
    if (key === 'path' || key === 'endpoint') {
      continue;
    }

    // Explicitly reject any attempt to pass credentials or sensitive keys from client
    if (
      key.toLowerCase().includes('key') ||
      key.toLowerCase().includes('token') ||
      key.toLowerCase().includes('auth') ||
      key.toLowerCase().includes('secret')
    ) {
      return { validParams: filtered, error: `Disallowed query parameter: "${key}"` };
    }

    switch (key) {
      case 'query': {
        const trimmed = value.trim();
        if (trimmed.length > 120) {
          return { validParams: filtered, error: 'Search query exceeds maximum length of 120 characters' };
        }
        filtered.set('query', trimmed);
        break;
      }

      case 'page': {
        const pageNum = parseInt(value, 10);
        if (isNaN(pageNum) || pageNum < 1 || pageNum > 1000) {
          return { validParams: filtered, error: 'Invalid page number' };
        }
        filtered.set('page', pageNum.toString());
        break;
      }

      case 'language': {
        if (!/^[a-z]{2,3}(-[A-Z]{2})?$/.test(value)) {
          return { validParams: filtered, error: 'Invalid language format' };
        }
        filtered.set('language', value);
        break;
      }

      case 'append_to_response': {
        // Only allow comma-separated alphanumeric keywords (e.g. credits,videos,images)
        if (!/^[a-zA-Z0-9_,]{1,60}$/.test(value)) {
          return { validParams: filtered, error: 'Invalid append_to_response parameter' };
        }
        filtered.set('append_to_response', value);
        break;
      }

      case 'include_adult': {
        filtered.set('include_adult', value === 'true' ? 'true' : 'false');
        break;
      }

      default:
        // Ignore unrecognized query parameters
        break;
    }
  }

  return { validParams: filtered };
}

/**
 * Validates whether the requested path is safe and in the whitelist.
 */
function validatePath(rawPath: string): { normalizedPath: string; error?: string } {
  if (!rawPath) {
    return { normalizedPath: '', error: 'Missing required "path" parameter' };
  }

  let normalized = rawPath.trim();
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  // Reject directory traversal, schemes, and control characters
  if (
    normalized.includes('..') ||
    normalized.includes('://') ||
    normalized.includes('\\') ||
    normalized.includes('\0')
  ) {
    return { normalizedPath: '', error: 'Invalid path format' };
  }

  // Strip query string if accidentally attached to path
  const queryIndex = normalized.indexOf('?');
  if (queryIndex !== -1) {
    normalized = normalized.substring(0, queryIndex);
  }

  const isAllowed = ALLOWED_PATH_PATTERNS.some(pattern => pattern.test(normalized));
  if (!isAllowed) {
    return { normalizedPath: '', error: 'Requested TMDB path is not allowed' };
  }

  return { normalizedPath: normalized };
}

interface ProxyResult {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

/**
 * Core proxy request handler
 */
async function executeTmdbProxy(
  method: string | undefined,
  urlString: string | undefined
): Promise<ProxyResult> {
  // 1. HTTP Method validation: only GET and HEAD allowed
  const upperMethod = (method || 'GET').toUpperCase();
  if (upperMethod !== 'GET' && upperMethod !== 'HEAD') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Allow': 'GET, HEAD',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ error: 'Method Not Allowed. Only GET is supported.' }),
    };
  }

  // 2. Parse URL and Query
  const parsedUrl = new URL(urlString || '/', 'http://localhost');
  const rawPath = parsedUrl.searchParams.get('path') || parsedUrl.searchParams.get('endpoint') || '';

  // 3. Validate Path
  const { normalizedPath, error: pathError } = validatePath(rawPath);
  if (pathError) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ error: pathError }),
    };
  }

  // 4. Validate Query Parameters
  const { validParams, error: paramError } = validateAndFilterParams(parsedUrl.searchParams);
  if (paramError) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ error: paramError }),
    };
  }

  // 5. Credential Verification from Server Environment Only
  const apiKey = (process.env.TMDB_API_KEY || '').trim();
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        error: 'TMDB API credentials are not configured on the server. Please set TMDB_API_KEY in server environment.',
      }),
    };
  }

  // 6. Assemble Upstream TMDB Request
  const isBearerToken = apiKey.startsWith('eyJ');
  if (!isBearerToken) {
    validParams.set('api_key', apiKey);
  }

  const upstreamUrl = `${TMDB_API_ORIGIN}${normalizedPath}?${validParams.toString()}`;

  try {
    const upstreamHeaders: HeadersInit = {
      'Accept': 'application/json',
      'User-Agent': 'Marvel-Zero-G/1.0',
    };

    if (isBearerToken) {
      upstreamHeaders['Authorization'] = `Bearer ${apiKey}`;
    }

    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'GET',
      headers: upstreamHeaders,
    });

    if (upstreamResponse.status === 404) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify({ error: 'Resource not found on TMDB' }),
      };
    }

    if (upstreamResponse.status === 429) {
      return {
        statusCode: 429,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
          'Retry-After': upstreamResponse.headers.get('Retry-After') || '5',
        },
        body: JSON.stringify({ error: 'TMDB rate limit exceeded. Please try again later.' }),
      };
    }

    if (upstreamResponse.status === 401 || upstreamResponse.status === 403) {
      return {
        statusCode: 502,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify({ error: 'Upstream TMDB authentication failed.' }),
      };
    }

    if (!upstreamResponse.ok) {
      return {
        statusCode: upstreamResponse.status >= 500 ? 502 : upstreamResponse.status,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify({ error: `Upstream TMDB error (HTTP ${upstreamResponse.status})` }),
      };
    }

    const responseData = await upstreamResponse.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400',
      },
      body: responseData,
    };
  } catch (_err) {
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ error: 'Failed to communicate with TMDB upstream' }),
    };
  }
}

/**
 * Universal Serverless Handler
 * Supports:
 * - Vercel Serverless Function (Node.js runtime: IncomingMessage, ServerResponse)
 * - Vite Connect dev server middleware (IncomingMessage, ServerResponse)
 * - Web Standard Request / Edge runtime (Request -> Promise<Response>)
 */
export default async function handler(
  req: IncomingMessage | Request,
  res?: ServerResponse
): Promise<Response | void> {
  // Node.js HTTP / Connect Middleware Signature
  if (res && typeof (res as ServerResponse).writeHead === 'function') {
    const nodeReq = req as IncomingMessage;
    const nodeRes = res as ServerResponse;

    const result = await executeTmdbProxy(nodeReq.method, nodeReq.url);

    nodeRes.writeHead(result.statusCode, result.headers);
    nodeRes.end(result.body);
    return;
  }

  // Web Standard Fetch API / Edge Signature
  const webReq = req as Request;
  const result = await executeTmdbProxy(webReq.method, webReq.url);

  return new Response(result.body, {
    status: result.statusCode,
    headers: result.headers,
  });
}
