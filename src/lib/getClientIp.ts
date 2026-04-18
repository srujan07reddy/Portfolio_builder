import { NextRequest } from 'next/server';

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwarded) return forwarded;
  
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  
  return 'unknown';
}
