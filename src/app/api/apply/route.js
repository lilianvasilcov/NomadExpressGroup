import { NextResponse } from 'next/server';
import { sendApplicationFormEmail } from '../../../utils/email';
import { validateApplicationForm } from '../../../utils/validation';
import { checkRateLimit, getClientIP, createRateLimitKey } from '../../../utils/rateLimit';
import { 
  validateRequestSize, 
  safeJsonParse, 
  withTimeout, 
  validateMethod,
  isSameOrigin,
  validateHeaders
} from '../../../utils/security';

/**
 * POST /api/apply
 * Handles driver application form submissions with validation and email sending
 * Enhanced with comprehensive security measures
 */
export async function POST(request) {
  try {
    // 1. Validate HTTP method
    if (!validateMethod(request, ['POST'])) {
      return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 }
      );
    }
    
    // 2. Validate request headers
    const headerValidation = validateHeaders(request);
    if (!headerValidation.valid) {
      console.warn('Suspicious headers detected:', headerValidation.suspicious);
    }
    
    // 3. Basic CSRF protection
    if (!isSameOrigin(request)) {
      console.warn('Cross-origin request detected from:', request.headers.get('origin'));
    }
    
    // 4. Validate request size
    const sizeValidation = await validateRequestSize(request);
    if (!sizeValidation.valid) {
      return NextResponse.json(
        { success: false, message: sizeValidation.error },
        { status: 413 }
      );
    }
    
    // 5. Rate limiting: 5 requests per 15 minutes per IP
    const clientIP = getClientIP(request);
    const rateLimitKey = createRateLimitKey(request);
    const rateLimit = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString()
          }
        }
      );
    }
    
    // 6. Parse request body with timeout and size protection
    let bodyText;
    let body;
    
    try {
      bodyText = await withTimeout(
        request.text(),
        10000,
        'Request body read timeout'
      );
      
      const parseResult = safeJsonParse(bodyText);
      if (parseResult.error) {
        return NextResponse.json(
          { success: false, message: parseResult.error },
          { status: 400 }
        );
      }
      body = parseResult.data;
    } catch (parseError) {
      if (parseError.message.includes('timeout')) {
        return NextResponse.json(
          { success: false, message: 'Request timeout. Please try again.' },
          { status: 408 }
        );
      }
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Validate and sanitize form data
    const validation = validateApplicationForm(body);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: validation.errors[0] || 'Please check your input and try again.',
          errors: validation.errors
        },
        { status: 400 }
      );
    }
    
    // 7. Send email with sanitized data (with timeout)
    let emailResult;
    try {
      emailResult = await withTimeout(
        sendApplicationFormEmail(validation.sanitizedData),
        25000,
        'Email sending timeout'
      );
    } catch (emailError) {
      if (emailError.message.includes('timeout')) {
        console.error('Email sending timeout');
        return NextResponse.json(
          { 
            success: false, 
            message: 'Request timeout. Please try again later.' 
          },
          { status: 408 }
        );
      }
      console.error('Email sending error:', emailError.message);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to submit application. Please try again later.' 
        },
        { status: 500 }
      );
    }
    
    if (!emailResult.success) {
      console.error('Failed to send application form email');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to submit application. Please try again later or contact us directly.' 
        },
        { status: 500 }
      );
    }
    
    // Success response with rate limit headers
    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully. We will review it and contact you soon.' 
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetAt.toString()
        }
      }
    );
    
  } catch (error) {
    console.error('Error processing application:', error.message);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Optional: Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

