import { NextResponse } from 'next/server';

/**
 * Security Headers Configuration
 * Provides comprehensive security headers for all responses
 */
const securityHeaders = {
  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable XSS protection (legacy but still useful)
  'X-XSS-Protection': '1; mode=block',
  
  // Referrer policy - control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions policy - restrict browser features
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  
  // Content Security Policy - prevent XSS and injection attacks
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com", // Allow Google reCAPTCHA
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://www.google.com",
    "frame-src 'self' https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
  
  // Strict Transport Security - force HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Cross-Origin policies
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

/**
 * Rate limiting store (in-memory, shared across middleware)
 * For production with multiple instances, use Redis
 */
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute per IP

/**
 * Cleanup old rate limit entries
 */
const cleanupRateLimit = () => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.expiresAt) {
      rateLimitStore.delete(key);
    }
  }
};

/**
 * Get client IP address with improved detection
 */
const getClientIP = (request) => {
  // Check various headers for IP (in order of preference)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take the first IP in the chain (original client)
    const ips = forwarded.split(',').map(ip => ip.trim());
    return ips[0];
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // Fallback for development
  return request.ip || 'unknown';
};

/**
 * Check rate limit for IP
 */
const checkRateLimit = (ip) => {
  // Periodic cleanup (10% chance)
  if (Math.random() < 0.1) {
    cleanupRateLimit();
  }
  
  const now = Date.now();
  const key = `ip:${ip}`;
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.expiresAt) {
    rateLimitStore.set(key, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  rateLimitStore.set(key, record);
  
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
};

/**
 * Main middleware function
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    // Still apply security headers but skip rate limiting for static assets
    const response = NextResponse.next();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }
  
  // Rate limiting for all routes
  const clientIP = getClientIP(request);
  const rateLimit = checkRateLimit(clientIP);
  
  if (!rateLimit.allowed) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Too many requests. Please try again later.' 
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          ...securityHeaders
        }
      }
    );
  }
  
  // Create response with security headers
  const response = NextResponse.next();
  
  // Apply all security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
  response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
  
  return response;
}

/**
 * Configure which routes the middleware runs on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
