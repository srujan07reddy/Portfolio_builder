import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateAndSanitizeProfile } from '@/lib/validation';
import { securityLogger } from '@/lib/securityLogger';
import { getClientIp } from '@/lib/getClientIp';

export async function GET(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch user's portfolio
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('owner_id', session.user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    securityLogger.logDataAccess(session.user.id, 'portfolio', clientIp);

    return NextResponse.json({ portfolio: data || null });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      securityLogger.logAccessDenied(
        'unknown',
        '/api/portfolio',
        'No session',
        clientIp
      );
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validate and sanitize input
    const validatedData = validateAndSanitizeProfile(body);

    // Ensure user can only update their own portfolio - strict ownership check
    const { data: existingPortfolio, error: fetchError } = await supabase
      .from('portfolios')
      .select('owner_id')
      .eq('owner_id', session.user.id);

    // Check if user is trying to access another user's portfolio
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // If portfolio exists, verify ownership before allowing update
    if (existingPortfolio && existingPortfolio.length > 0) {
      const ownershipVerified = existingPortfolio.some(
        (p: any) => p.owner_id === session.user.id
      );
      
      if (!ownershipVerified) {
        securityLogger.logAccessDenied(
          session.user.id,
          '/api/portfolio',
          'Attempting to modify another user\'s portfolio',
          clientIp
        );
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }
    }

    // Update or create portfolio with explicit owner_id enforcement
    const { data, error } = await supabase
      .from('portfolios')
      .upsert({
        owner_id: session.user.id,
        ...validatedData,
        is_public: false, // Default to private for security
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Verify the returned data belongs to current user before logging
    if (data && data.owner_id !== session.user.id) {
      securityLogger.logAccessDenied(
        session.user.id,
        '/api/portfolio',
        'Portfolio returned with mismatched owner_id',
        clientIp
      );
      return NextResponse.json(
        { error: 'Security verification failed' },
        { status: 403 }
      );
    }

    securityLogger.log(
      'PORTFOLIO_UPDATED',
      'low',
      { userId: session.user.id, username: validatedData.username },
      clientIp,
      session.user.id
    );

    return NextResponse.json(
      { success: true, portfolio: data },
      { status: 200 }
    );
  } catch (error: any) {
    securityLogger.logSuspiciousActivity(
      'PORTFOLIO_UPDATE_ERROR',
      { error: error.message },
      getClientIp(req)
    );

    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}
