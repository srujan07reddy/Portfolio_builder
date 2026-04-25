import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateLoginCredentials } from '@/lib/validation';
import { getRateLimitKey, checkRateLimit, createRateLimitResponse, RATE_LIMITS } from '@/lib/rateLimit';
import { securityLogger } from '@/lib/securityLogger';
import { getClientIp } from '@/lib/getClientIp';

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    
    // Rate limiting
    const key = getRateLimitKey(req, 'login');
    const rateLimit = checkRateLimit(key, RATE_LIMITS.login);

    if (!rateLimit.allowed) {
      securityLogger.logSuspiciousActivity(
        'BRUTE_FORCE_ATTEMPT',
        { resource: '/api/auth/login' },
        clientIp
      );
      return createRateLimitResponse(rateLimit.remaining, rateLimit.resetTime); 
    }

    const body = await req.json();
    const { email, password } = body;

    // Validate input
    const result = validateLoginCredentials(email, password);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { email: validEmail, password: validPassword } = result.data;

    // Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validEmail,
      password: validPassword,
    });

    if (error) {
      securityLogger.logAuthAttempt(validEmail, false, clientIp, req.headers.get('user-agent') || 'unknown');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    securityLogger.logAuthAttempt(validEmail, true, clientIp, req.headers.get('user-agent') || 'unknown');

    return NextResponse.json(
      {
        success: true,
        user: data.user,
        session: data.session,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${data.session?.access_token}; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Strict; Path=/; Max-Age=86400`,
        },
      }
    );
  } catch (error: any) {
    securityLogger.logSuspiciousActivity(
      'AUTH_ERROR',
      { error: error.message },
      getClientIp(req)
    );

    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
