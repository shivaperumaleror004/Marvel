/**
 * Marvel Zero-G - High-fidelity Title-Specific Fallback Artwork Generator
 * Generates an SVG Data-URI with dynamic Marvel typography, branding, and category badges.
 * Prevents broken images, generic blurry photos, and missing poster icons.
 */

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function createTitleSpecificPoster(
  title: string,
  category: 'movie' | 'series' | 'character' | 'special' | 'upcoming' = 'movie',
  subtitle?: string
): string {
  const cleanTitle = escapeXml((title || 'MARVEL').toUpperCase());
  const cleanSub = escapeXml((subtitle || (category === 'upcoming' ? 'OFFICIAL ARTWORK PENDING' : 'MARVEL ARCHIVE')).toUpperCase());

  // Wrap long titles into 2 lines if needed
  const words = cleanTitle.split(' ');
  let line1 = cleanTitle;
  let line2 = '';
  if (cleanTitle.length > 18 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(' ');
    line2 = words.slice(mid).join(' ');
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0e17" />
        <stop offset="50%" stop-color="#121826" />
        <stop offset="100%" stop-color="#05070b" />
      </linearGradient>
      <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e62429" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#ff474c" stop-opacity="0.3" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="600" height="900" fill="url(#bg)" />
    <rect width="600" height="900" fill="url(#grid)" />
    
    <!-- Outer metallic borders -->
    <rect x="24" y="24" width="552" height="852" rx="12" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
    <rect x="32" y="32" width="536" height="836" rx="8" fill="none" stroke="rgba(230,36,41,0.25)" stroke-width="1" />

    <!-- Top Badge Header -->
    <g transform="translate(300, 110)">
      <rect x="-85" y="-18" width="170" height="36" rx="6" fill="#e62429" />
      <text x="0" y="7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', sans-serif" font-weight="900" font-size="18" fill="#ffffff" letter-spacing="4" text-anchor="middle">MARVEL</text>
    </g>

    <!-- Center Icon Shield -->
    <g transform="translate(300, 360)">
      <circle r="90" fill="rgba(230,36,41,0.06)" stroke="rgba(230,36,41,0.3)" stroke-width="2" stroke-dasharray="6 4" />
      <circle r="72" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
      <path d="M 0 -45 L 36 -25 L 36 15 Q 36 45 0 60 Q -36 45 -36 15 L -36 -25 Z" fill="none" stroke="#e62429" stroke-width="3.5" stroke-linejoin="round" />
      <path d="M 0 -30 L 22 -15 L 22 10 Q 22 32 0 44 Q -22 32 -22 10 L -22 -15 Z" fill="rgba(230,36,41,0.2)" />
      <circle cx="0" cy="5" r="8" fill="#e62429" />
    </g>

    <!-- Title and Subtitle Block -->
    <g transform="translate(300, 570)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', sans-serif" font-weight="900" font-size="${line2 ? 32 : 36}" fill="#ffffff" letter-spacing="1" text-anchor="middle">${line1}</text>
      ${line2 ? `<text x="0" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', sans-serif" font-weight="900" font-size="30" fill="#ffffff" letter-spacing="1" text-anchor="middle">${line2}</text>` : ''}
      <line x1="-60" y1="${line2 ? 65 : 25}" x2="60" y2="${line2 ? 65 : 25}" stroke="#e62429" stroke-width="3" />
      <text x="0" y="${line2 ? 98 : 58}" font-family="Consolas, 'Courier New', monospace" font-weight="700" font-size="13" fill="#9ca3af" letter-spacing="3" text-anchor="middle">${cleanSub}</text>
    </g>

    <!-- Footer System Text -->
    <g transform="translate(300, 830)">
      <text x="0" y="0" font-family="Consolas, 'Courier New', monospace" font-size="10" fill="rgba(255,255,255,0.3)" letter-spacing="2" text-anchor="middle">ZERO-G // VERIFIED DATABASE ARCHIVE</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function createTitleSpecificBackdrop(title: string, subtitle?: string): string {
  const cleanTitle = escapeXml((title || 'MARVEL').toUpperCase());
  const cleanSub = escapeXml((subtitle || 'ARCHIVAL RECORD').toUpperCase());

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070a12" />
        <stop offset="50%" stop-color="#111728" />
        <stop offset="100%" stop-color="#05070b" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="1280" height="720" fill="url(#bg)" />
    <rect width="1280" height="720" fill="url(#grid)" />
    <rect x="30" y="30" width="1220" height="660" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
    <g transform="translate(640, 260)">
      <circle r="70" fill="rgba(230,36,41,0.08)" stroke="rgba(230,36,41,0.3)" stroke-width="2" />
      <rect x="-65" y="-14" width="130" height="28" rx="4" fill="#e62429" />
      <text x="0" y="6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="14" fill="#ffffff" letter-spacing="3" text-anchor="middle">MARVEL</text>
    </g>
    <g transform="translate(640, 420)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="44" fill="#ffffff" letter-spacing="2" text-anchor="middle">${cleanTitle}</text>
      <text x="0" y="42" font-family="Consolas, monospace" font-size="14" fill="#9ca3af" letter-spacing="4" text-anchor="middle">${cleanSub}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
