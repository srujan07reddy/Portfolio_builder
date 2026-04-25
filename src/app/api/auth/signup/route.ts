import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateSignupCredentials } from '@/lib/validation';
import { getRateLimitKey, checkRateLimit, createRateLimitResponse, RATE_LIMITS } from '@/lib/rateLimit';
import { securityLogger } from '@/lib/securityLogger';
import { getClientIp } from '@/lib/getClientIp';

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    
    // Rate limiting (stricter for signup)
    const key = getRateLimitKey(req, 'signup');
    const rateLimit = checkRateLimit(key, RATE_LIMITS.signup);

    if (!rateLimit.allowed) {
      securityLogger.logSuspiciousActivity(
        'SIGNUP_SPAM_ATTEMPT',
        { resource: '/api/auth/signup' },
        clientIp
      );
      return createRateLimitResponse(rateLimit.remaining, rateLimit.resetTime); 
    }

    const body = await req.json();
    
    // Validate input with strict rules
    const result = validateSignupCredentials(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    const { email: validEmail, password: validPassword } = result.data;

    // Create new user (Supabase handles existing user check)
    const { data, error } = await supabase.auth.signUp({
      email: validEmail,
      password: validPassword,
    });

    if (error) {
      securityLogger.logAuthAttempt(validEmail, false, clientIp, req.headers.get('user-agent') || 'unknown');
      return NextResponse.json(
        { error: error.message || 'Signup failed' },
        { status: 400 }
      );
    }

    securityLogger.log(
      'USER_REGISTERED',
      'low',
      { email: validEmail },
      clientIp
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Signup successful. Check your email to confirm.',
        user: data.user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    securityLogger.logSuspiciousActivity(
      'SIGNUP_ERROR',
      { error: error.message },
      getClientIp(req)
    );

    return NextResponse.json(
      { error: 'Signup failed. Please try again later.' },
      { status: 500 }
    );
  }
}
