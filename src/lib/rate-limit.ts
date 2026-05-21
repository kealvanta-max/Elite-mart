// ============================================
// ELITE MART — Rate Limiter (Token Bucket)
// ============================================

interface RateLimitEntry {
  tokens: number;
  lastRefill: number;
}

const store = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL = 60_000 * 5;
const ENTRY_TTL = 60_000 * 15;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const keysToDelete: string[] = [];
  store.forEach((entry, key) => {
    if (now - entry.lastRefill > ENTRY_TTL) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach((key) => store.delete(key));
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function rateLimit(
  key: string,
  options: { limit?: number; windowMs?: number } = {}
): RateLimitResult {
  const { limit = 60, windowMs = 60_000 } = options;
  cleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { tokens: limit - 1, lastRefill: now });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }

  const elapsed = now - entry.lastRefill;
  const tokensToAdd = Math.floor((elapsed / windowMs) * limit);
  const currentTokens = Math.min(limit, entry.tokens + tokensToAdd);

  if (currentTokens >= 1) {
    entry.tokens = currentTokens - 1;
    entry.lastRefill = now;
    return { success: true, limit, remaining: entry.tokens, reset: now + windowMs };
  }

  return { success: false, limit, remaining: 0, reset: now + windowMs };
}

export const RATE_LIMITS = {
  api: { limit: 60, windowMs: 60_000 },
  auth: { limit: 5, windowMs: 60_000 * 15 },
  upload: { limit: 10, windowMs: 60_000 },
  payment: { limit: 3, windowMs: 60_000 },
  contact: { limit: 3, windowMs: 60_000 * 60 },
  webhook: { limit: 100, windowMs: 60_000 },
  page: { limit: 120, windowMs: 60_000 },
} as const;
