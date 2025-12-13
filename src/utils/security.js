/**
 * Security utilities for request validation, CSRF protection, and request limits
 */

// Request size limits (in bytes)
export const REQUEST_LIMITS = {
  MAX_BODY_SIZE: 1024 * 100, // 100KB max request body
  MAX_JSON_DEPTH: 10, // Maximum JSON nesting depth
  MAX_STRING_LENGTH: 10000, // Maximum string length in JSON
  REQUEST_TIMEOUT: 30000, // 30 seconds timeout
};

/**
 * Validates request body size
 * @param {Request} request - Next.js request object
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
export async function validateRequestSize(request) {
  const contentLength = request.headers.get('content-length');
  
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (size > REQUEST_LIMITS.MAX_BODY_SIZE) {
      return {
        valid: false,
        error: `Request body too large. Maximum size is ${REQUEST_LIMITS.MAX_BODY_SIZE / 1024}KB`
      };
    }
  }
  
  return { valid: true };
}

/**
 * Safely parses JSON with size and depth limits
 * @param {string} text - JSON string to parse
 * @returns {Object} - Parsed object or error
 */
export function safeJsonParse(text) {
  try {
    // Check string length
    if (text.length > REQUEST_LIMITS.MAX_STRING_LENGTH) {
      return {
        error: `JSON string too long. Maximum length is ${REQUEST_LIMITS.MAX_STRING_LENGTH} characters`
      };
    }
    
    // Parse JSON
    const parsed = JSON.parse(text);
    
    // Check nesting depth
    const depth = getObjectDepth(parsed);
    if (depth > REQUEST_LIMITS.MAX_JSON_DEPTH) {
      return {
        error: `JSON nesting too deep. Maximum depth is ${REQUEST_LIMITS.MAX_JSON_DEPTH}`
      };
    }
    
    return { data: parsed };
  } catch (error) {
    return {
      error: 'Invalid JSON format'
    };
  }
}

/**
 * Calculates the maximum depth of a nested object
 * @param {any} obj - Object to check
 * @param {number} currentDepth - Current depth
 * @returns {number} - Maximum depth
 */
function getObjectDepth(obj, currentDepth = 0) {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return currentDepth;
  }
  
  let maxDepth = currentDepth;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const depth = getObjectDepth(obj[key], currentDepth + 1);
      maxDepth = Math.max(maxDepth, depth);
    }
  }
  
  return maxDepth;
}

/**
 * Creates a timeout promise that rejects after specified time
 * @param {number} ms - Milliseconds to wait
 * @param {string} message - Error message
 * @returns {Promise} - Promise that rejects after timeout
 */
export function createTimeout(ms, message = 'Request timeout') {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), ms);
  });
}

/**
 * Wraps a promise with a timeout
 * @param {Promise} promise - Promise to wrap
 * @param {number} ms - Timeout in milliseconds
 * @param {string} message - Timeout error message
 * @returns {Promise} - Promise with timeout
 */
export async function withTimeout(promise, ms = REQUEST_LIMITS.REQUEST_TIMEOUT, message = 'Request timeout') {
  return Promise.race([
    promise,
    createTimeout(ms, message)
  ]);
}

/**
 * Validates request method
 * @param {Request} request - Next.js request object
 * @param {string[]} allowedMethods - Array of allowed HTTP methods
 * @returns {boolean} - True if method is allowed
 */
export function validateMethod(request, allowedMethods) {
  return allowedMethods.includes(request.method);
}

/**
 * Generates CSRF token
 * @returns {string} - CSRF token
 */
export function generateCSRFToken() {
  // In production, use crypto.randomBytes or similar
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates CSRF token
 * @param {string} token - Token from request
 * @param {string} sessionToken - Token from session
 * @returns {boolean} - True if tokens match
 */
export function validateCSRFToken(token, sessionToken) {
  if (!token || !sessionToken) {
    return false;
  }
  
  // Use constant-time comparison to prevent timing attacks
  if (token.length !== sessionToken.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ sessionToken.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Checks if request is from same origin (basic CSRF protection)
 * @param {Request} request - Next.js request object
 * @returns {boolean} - True if same origin
 */
export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  if (!origin && !referer) {
    // Some legitimate requests don't have origin/referer (e.g., direct API calls)
    // For API routes, we'll be more lenient but log it
    return true; // Allow but could be flagged for review
  }
  
  if (origin) {
    try {
      const originUrl = new URL(origin);
      return originUrl.hostname === host || originUrl.hostname.endsWith(`.${host}`);
    } catch {
      return false;
    }
  }
  
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return refererUrl.hostname === host || refererUrl.hostname.endsWith(`.${host}`);
    } catch {
      return false;
    }
  }
  
  return false;
}

/**
 * Validates request headers for suspicious patterns
 * @param {Request} request - Next.js request object
 * @returns {Object} - {valid: boolean, suspicious: string[]}
 */
export function validateHeaders(request) {
  const suspicious = [];
  
  // Check for suspicious user agents
  const userAgent = request.headers.get('user-agent') || '';
  if (!userAgent || userAgent.length < 5) {
    suspicious.push('Missing or suspicious user-agent');
  }
  
  // Check for suspicious patterns in headers
  const headers = Array.from(request.headers.entries());
  for (const [key, value] of headers) {
    // Check for header injection attempts
    if (value.includes('\r') || value.includes('\n')) {
      suspicious.push(`Potential header injection in ${key}`);
    }
    
    // Check for extremely long header values
    if (value.length > 8192) {
      suspicious.push(`Suspiciously long header value in ${key}`);
    }
  }
  
  return {
    valid: suspicious.length === 0,
    suspicious
  };
}

/**
 * Rate limit key generator with fingerprinting
 * @param {Request} request - Next.js request object
 * @returns {string} - Rate limit key
 */
export function generateRateLimitKey(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip')?.trim() ||
             request.ip ||
             'unknown';
  
  const userAgent = request.headers.get('user-agent') || '';
  
  // Create a fingerprint (simple hash of IP + User-Agent)
  // In production, use a proper hashing library
  const fingerprint = `${ip}:${userAgent.substring(0, 50)}`;
  
  return fingerprint;
}
