# MARVEL // ZERO-G — Render Dedicated Backend

Dedicated Node.js + Express backend service for MARVEL // ZERO-G, hosting the secure TMDB API proxy with strict whitelisting, parameter validation, rate-limit resilience, and CORS origin protection.

---

## Render Deployment Settings

When configuring your Web Service in the [Render Dashboard](https://dashboard.render.com):

| Setting | Value |
| :--- | :--- |
| **Name** | `marvel-zero-g-api` (or your preferred name) |
| **Language / Environment** | `Node` |
| **Region** | Choose the region closest to your users / Vercel deployment (e.g. `Frankfurt` or `Oregon`) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Health Check Path** | `/health` |

---

## Required Environment Variables (Render Dashboard)

Add these under **Environment Variables** in Render:

1. **`TMDB_API_KEY`** *(Required)*:
   - Your TMDB API v3 key or API Read Access Token (Bearer).
   - Never prefix with `VITE_`.
2. **`ALLOWED_ORIGINS`** *(Recommended)*:
   - Comma-separated list of your production frontend origins:
     `https://your-app.vercel.app,http://localhost:5173`
   - Wildcard origins (`*`) are disallowed.
3. **`PORT`** *(Optional)*:
   - Render automatically injects `PORT=10000`. The server dynamically binds to `process.env.PORT`.

---

## Connecting Vercel Frontend to Render

In your **Vercel Project Dashboard** (or `.env.local` for local testing):
- Add environment variable:
  ```env
  VITE_API_BASE_URL=https://marvel-zero-g-api.onrender.com
  ```
- Redeploy the frontend. All TMDB queries will now route securely through your dedicated Render instance.

---

## Available Endpoints

* `GET /health` — Health check endpoint returning uptime and service status (used by Render).
* `GET /api/tmdb?path=/search/movie&query=Iron+Man` — Secure proxied TMDB query.
* `OPTIONS /api/tmdb` — CORS preflight response.

---

## Local Development & Testing

```bash
# From workspace root:
npm run server:build
npm run server:start

# Or directly from the server directory:
cd server
npm install
npm run build
npm start
```
