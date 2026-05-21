// ============================================
// ELITE MART — Production Middleware
// Rate Limiting · Security Headers · CDN Cache
// ============================================
// NOTE: Next.js middleware runs on Edge Runtime, so we inline
// the rate limiting logic here rather than importing from lib/.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ---- Inline Rate Limiter (Token Bucket) ----
const rateStore = new Map<string, { tokens: number; lastRefill: number }>();

function rateLimit(
  key: string,
  limit: number = 60,
  windowMs: number = 60_000
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const entry = rateStore.get(key);

  if (!entry) {
    rateStore.set(key, { tokens: limit - 1, lastRefill: now });
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

// ---- Rate Limit Configs ----
const LIMITS = {
  auth: { limit: 5, windowMs: 900_000 },     // 5 per 15 min
  upload: { limit: 10, windowMs: 60_000 },    // 10 per min
  payment: { limit: 3, windowMs: 60_000 },    // 3 per min
  contact: { limit: 3, windowMs: 3_600_000 }, // 3 per hour
  api: { limit: 60, windowMs: 60_000 },       // 60 per min
  page: { limit: 120, windowMs: 60_000 },     // 120 per min
} as const;

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  const path = request.nextUrl.pathname;

  // ============================================
  // 1. Rate Limiting
  // ============================================
  let rl: { success: boolean; limit: number; remaining: number; reset: number } | undefined;

  if (path.startsWith('/api/auth') || path.startsWith('/auth')) {
    rl = rateLimit(`auth:${ip}`, LIMITS.auth.limit, LIMITS.auth.windowMs);
  } else if (path.startsWith('/api/upload')) {
    rl = rateLimit(`upload:${ip}`, LIMITS.upload.limit, LIMITS.upload.windowMs);
  } else if (path.startsWith('/api/payment')) {
    rl = rateLimit(`payment:${ip}`, LIMITS.payment.limit, LIMITS.payment.windowMs);
  } else if (path.startsWith('/api/contact')) {
    rl = rateLimit(`contact:${ip}`, LIMITS.contact.limit, LIMITS.contact.windowMs);
  } else if (path.startsWith('/api/')) {
    rl = rateLimit(`api:${ip}`, LIMITS.api.limit, LIMITS.api.windowMs);
  }

  if (rl && !rl.success) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Please slow down. Try again shortly.',
        retryAfter: Math.ceil((rl.reset - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((rl.reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(rl.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rl.reset),
        },
      }
    );
  }

  if (rl) {
    response.headers.set('X-RateLimit-Limit', String(rl.limit));
    response.headers.set('X-RateLimit-Remaining', String(rl.remaining));
  }

  // ============================================
  // 2. Security Headers
  // ============================================
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' blob: data: https://res.cloudinary.com https://firebasestorage.googleapis.com https://lh3.googleusercontent.com",
    "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://api.resend.com https://api.cloudinary.com https://api.paystack.co https://api.flutterwave.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
  response.headers.set('Content-Security-Policy', csp);

  // ============================================
  // 3. CDN Cache Headers
  // ============================================
  if (path.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (path === '/' || path.startsWith('/products') || path === '/contact') {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  } else if (path.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  // ============================================
  // 4. CORS for API routes
  // ============================================
  if (path.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: response.headers });
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
};
