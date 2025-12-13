# Security Implementation Documentation

## Overview

This document outlines the comprehensive security measures implemented to protect the Nomad Express Group website from DDoS attacks, injection attacks, and other security threats.

## Security Features Implemented

### 1. Security Headers Middleware (`src/middleware.js`)

**Purpose**: Provides comprehensive security headers for all HTTP responses.

**Headers Implemented**:
- **X-Frame-Options**: `DENY` - Prevents clickjacking attacks
- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-XSS-Protection**: `1; mode=block` - Legacy XSS protection
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer information
- **Permissions-Policy**: Restricts browser features (camera, microphone, geolocation)
- **Content-Security-Policy**: Comprehensive CSP to prevent XSS and injection attacks
- **Strict-Transport-Security**: Forces HTTPS connections (HSTS)
- **Cross-Origin Policies**: Prevents cross-origin attacks

**Rate Limiting**:
- Global rate limiting: 100 requests per minute per IP
- Applied to all routes except static assets
- Automatic cleanup of expired entries

### 2. Security Utilities (`src/utils/security.js`)

**Request Size Limits**:
- Maximum body size: 100KB
- Maximum JSON depth: 10 levels
- Maximum string length: 10,000 characters
- Request timeout: 30 seconds

**Features**:
- `validateRequestSize()`: Validates request body size before processing
- `safeJsonParse()`: Safely parses JSON with size and depth limits
- `withTimeout()`: Wraps promises with timeout protection
- `validateMethod()`: Validates HTTP methods
- `isSameOrigin()`: Basic CSRF protection via origin checking
- `validateHeaders()`: Detects suspicious header patterns
- `generateRateLimitKey()`: Creates fingerprint-based rate limit keys

### 3. Enhanced Rate Limiting (`src/utils/rateLimit.js`)

**Improvements**:
- Better IP detection supporting multiple proxy configurations:
  - `x-forwarded-for` (most common)
  - `x-real-ip` (nginx, some proxies)
  - `cf-connecting-ip` (Cloudflare)
  - `x-client-ip` (some proxies)
  - `request.ip` (Next.js fallback)
- Fingerprinting: Combines IP + User-Agent for better tracking
- Automatic cleanup: Periodic cleanup of expired entries
- Distributed-ready: Structure supports Redis integration

**API Rate Limits**:
- Contact form: 5 requests per 15 minutes per IP
- Quote form: 5 requests per 15 minutes per IP
- Application form: 5 requests per 15 minutes per IP

### 4. Enhanced API Routes

All API routes (`/api/contact`, `/api/quote`, `/api/apply`) now include:

1. **Method Validation**: Only allows POST requests
2. **Header Validation**: Detects suspicious header patterns
3. **CSRF Protection**: Basic same-origin checking
4. **Request Size Validation**: Prevents oversized requests
5. **Rate Limiting**: Per-IP rate limiting with fingerprinting
6. **Safe JSON Parsing**: Limits JSON depth and size
7. **Timeout Protection**: 10-second timeout for body reading, 25-second for email sending
8. **Error Handling**: Generic error messages to prevent information leakage

### 5. Next.js Configuration (`next.config.mjs`)

**Security Settings**:
- `poweredByHeader: false` - Removes X-Powered-By header
- `reactStrictMode: true` - Enables React strict mode for better security

## DDoS Protection Layers

### Layer 1: Global Rate Limiting (Middleware)
- **100 requests/minute per IP** across all routes
- Applied at the middleware level before any processing
- Automatic cleanup prevents memory leaks

### Layer 2: API-Specific Rate Limiting
- **5 requests per 15 minutes per IP** for form submissions
- Uses fingerprinting (IP + User-Agent) for better tracking
- Prevents IP rotation attacks

### Layer 3: Request Size Limits
- **100KB maximum** request body size
- Prevents memory exhaustion attacks
- Validates before processing

### Layer 4: Timeout Protection
- **10 seconds** for reading request body
- **25 seconds** for email operations
- Prevents slowloris-style attacks

### Layer 5: JSON Parsing Limits
- Maximum depth: 10 levels
- Maximum string length: 10,000 characters
- Prevents parser exhaustion attacks

### Layer 6: Security Headers
- CSP prevents XSS attacks
- HSTS forces HTTPS
- Frame options prevent clickjacking
- Cross-origin policies prevent CSRF

## Protection Against Specific Attacks

### ✅ DDoS Attacks
- Rate limiting at multiple layers
- Request size limits
- Timeout protection
- Automatic cleanup

### ✅ XSS Attacks
- Content Security Policy
- Input sanitization
- Safe JSON parsing
- X-XSS-Protection header

### ✅ CSRF Attacks
- Same-origin checking
- CSRF token support (infrastructure ready)
- Cross-origin policies

### ✅ Injection Attacks
- Input validation and sanitization
- Email header injection protection
- JSON depth limits

### ✅ Clickjacking
- X-Frame-Options: DENY
- CSP frame-ancestors

### ✅ MIME Sniffing
- X-Content-Type-Options: nosniff

### ✅ Slowloris Attacks
- Request timeouts
- Connection limits (handled by hosting provider)

## Production Recommendations

### 1. Use a CDN/WAF
For production, consider using:
- **Cloudflare**: Provides DDoS protection, rate limiting, and WAF
- **AWS WAF**: If using AWS infrastructure
- **Vercel**: Provides some DDoS protection automatically

### 2. Distributed Rate Limiting
For multiple server instances, replace in-memory rate limiting with:
- **Redis**: Shared rate limiting across instances
- **Upstash**: Serverless Redis for Vercel
- **Dedicated service**: Rate limiting as a service

### 3. Monitoring and Alerting
- Set up monitoring for:
  - Rate limit violations
  - Suspicious header patterns
  - Timeout occurrences
  - Large request sizes

### 4. Additional Security Measures
- Implement CAPTCHA for forms (reCAPTCHA v3)
- Add request logging and analysis
- Set up security monitoring (e.g., Sentry)
- Regular security audits

## Testing Security

### Test Rate Limiting
```bash
# Send multiple rapid requests
for i in {1..10}; do
  curl -X POST https://your-domain.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
done
```

### Test Request Size Limits
```bash
# Send oversized request
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d "$(python3 -c "print('x' * 200000)")"
```

### Test Timeout Protection
```bash
# Use a tool that can send slow requests
# Or test with a proxy that delays responses
```

## Security Headers Verification

You can verify security headers using:
- **SecurityHeaders.com**: https://securityheaders.com
- **Mozilla Observatory**: https://observatory.mozilla.org
- **Browser DevTools**: Check Network tab → Response Headers

## Maintenance

### Regular Updates
- Keep dependencies updated (`npm audit`)
- Monitor security advisories
- Review and update rate limits as needed
- Adjust timeout values based on performance

### Monitoring
- Track rate limit violations
- Monitor for suspicious patterns
- Review error logs regularly
- Set up alerts for security events

## Support

For security concerns or questions, please review this documentation or consult with the development team.

---

**Last Updated**: Implementation completed with comprehensive DDoS and security protection.
