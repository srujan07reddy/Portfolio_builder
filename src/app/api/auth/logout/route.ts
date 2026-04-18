import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { securityLogger } from '@/lib/securityLogger';
import { getClientIp } from '@/lib/getClientIp';

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Log out
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    securityLogger.log(
      'USER_LOGOUT',
      'low',
      { userId: session.user.id },
      clientIp,
      session.user.id
    );

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
