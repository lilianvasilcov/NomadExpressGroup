/**
 * Enhanced rate limiting with improved IP detection and distributed support
 * For production with multiple instances, use Redis or a dedicated rate limiting service
 */

// Store for rate limit data (in-memory, resets on server restart)
const rateLimitStore = new Map();

// Store cleanup interval
let cleanupInterval = null;

// Start periodic cleanup if not already started
if (typeof setInterval !== 'undefined' && !cleanupInterval) {
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
      if (now > data.expiresAt) {
        rateLimitStore.delete(key);
      }
    }
  }, 60000); // Cleanup every minute
}

/**
 * Cleans up old entries from rate limit store
 */
const cleanupRateLimitStore = () => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.expiresAt) {
      rateLimitStore.delete(key);
    }
  }
};

/**
 * Checks if a request should be rate limited
 * @param {string} identifier - Unique identifier (IP address, email, etc.)
 * @param {number} maxRequests - Maximum number of requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} - { allowed: boolean, remaining: number, resetAt: number }
 */
export const checkRateLimit = (identifier, maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  // Cleanup old entries periodically
  if (Math.random() < 0.1) { // 10% chance to cleanup
    cleanupRateLimitStore();
  }
  
  const now = Date.now();
  const key = identifier;
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.expiresAt) {
    // Create new record
    rateLimitStore.set(key, {
      count: 1,
      expiresAt: now + windowMs
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs
    };
  }
  
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.expiresAt
    };
  }
  
  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.expiresAt
  };
};

/**
 * Gets client IP address from request with improved detection
 * Handles various proxy and load balancer configurations
 * @param {Request} request - Next.js request object
 * @returns {string} - IP address
 */
export const getClientIP = (request) => {
  // Check various headers for IP (in order of preference)
  // x-forwarded-for: Most common, contains chain of IPs
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take the first IP in the chain (original client)
    const ips = forwarded.split(',').map(ip => ip.trim()).filter(ip => ip);
    if (ips.length > 0) {
      return ips[0];
    }
  }
  
  // x-real-ip: Direct client IP (nginx, some proxies)
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  // cf-connecting-ip: Cloudflare
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // x-client-ip: Some proxies
  const clientIP = request.headers.get('x-client-ip');
  if (clientIP) {
    return clientIP.trim();
  }
  
  // Fallback to request.ip (Next.js)
  if (request.ip) {
    return request.ip;
  }
  
  // Last resort fallback
  return 'unknown';
};

/**
 * Creates a rate limit key with fingerprinting for better tracking
 * @param {Request} request - Next.js request object
 * @param {string} identifier - Additional identifier (email, etc.)
 * @returns {string} - Rate limit key
 */
export const createRateLimitKey = (request, identifier = '') => {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Create fingerprint for better tracking
  // Use first 50 chars of user agent to avoid too long keys
  const fingerprint = `${ip}:${userAgent.substring(0, 50)}${identifier ? `:${identifier}` : ''}`;
  
  return fingerprint;
};

