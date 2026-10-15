/**
 * Utility functions for exact time formatting and parsing across Watch Hub
 */

/**
 * Format seconds into exact digital display:
 * - If duration has hours or forceHours is true: "HH:MM:SS" (e.g., 01:24:30 or 00:02:30)
 * - Otherwise: "00:MM:SS" or "MM:SS"
 * Using explicit leading zero ensures "00:02:30" is NEVER mistaken for "2 hours 30 mins".
 */
export function formatExactTime(seconds: number, forceHours: boolean = true): string {
  if (isNaN(seconds) || seconds < 0) return forceHours ? '00:00:00' : '00:00';
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  if (forceHours || h > 0) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
}

/**
 * Formats seconds into human-readable compact text:
 * e.g., 150 -> "2m 30s", 5430 -> "1h 30m 30s"
 */
export function formatHumanDuration(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return '0s';
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 && h === 0) parts.push(`${s}s`);

  return parts.length > 0 ? parts.join(' ') : `${total}s`;
}

/**
 * Formats remaining time:
 * e.g., currentTime = 150, duration = 7200 -> "1h 57m left"
 */
export function formatRemainingTime(currentTime: number, duration: number): string {
  if (isNaN(duration) || duration <= 0) return '';
  const remaining = Math.max(0, duration - currentTime);
  if (remaining <= 0) return 'Finished';
  return `${formatHumanDuration(remaining)} left`;
}

/**
 * Parses user input timestamp string into total seconds.
 * Supported formats:
 * - "01:25:30" -> 5130 seconds
 * - "25:30" -> 1530 seconds
 * - "45m" -> 2700 seconds
 * - "1h 30m" -> 5400 seconds
 * - "90" -> 90 seconds
 */
export function parseTimeToSeconds(input: string): number | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim().toLowerCase();

  // Handle "1h 30m 15s" format
  if (trimmed.includes('h') || trimmed.includes('m') || trimmed.includes('s')) {
    let total = 0;
    const hMatch = trimmed.match(/(\d+)\s*h/);
    const mMatch = trimmed.match(/(\d+)\s*m/);
    const sMatch = trimmed.match(/(\d+)\s*s/);
    if (hMatch) total += parseInt(hMatch[1], 10) * 3600;
    if (mMatch) total += parseInt(mMatch[1], 10) * 60;
    if (sMatch) total += parseInt(sMatch[1], 10);
    return isNaN(total) ? null : total;
  }

  // Handle "HH:MM:SS" or "MM:SS"
  if (trimmed.includes(':')) {
    const parts = trimmed.split(':').map(p => parseInt(p, 10));
    if (parts.some(isNaN)) return null;
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
  }

  // Raw number
  const num = parseFloat(trimmed);
  return isNaN(num) ? null : Math.max(0, Math.floor(num));
}
