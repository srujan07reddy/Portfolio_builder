import { NextRequest, NextResponse } from 'next/server';
import { getClientIp } from './getClientIp';

// Simple in-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>(); 

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = {
  login: 5,
  signup: 3,
  api: 100,
};

export function getRateLimitKey(req: NextRequest, prefix: string): string {     
  const ip = getClientIp(req);
  return `${prefix}:${ip}`;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number = RATE_LIMIT_WINDOW
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    const newRecord = { count: 1, resetTime: now + windowMs };
    rateLimitStore.set(key, newRecord);
    return { allowed: true, remaining: limit - 1, resetTime: newRecord.resetTime };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}

export function createRateLimitResponse(
  remaining: number,
  resetTime: number
): NextResponse {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

  return new NextResponse(
    JSON.stringify({
      error: 'Too many requests. Please try again later.',
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': remaining.toString(),
      },
    }
  );
}

export const RATE_LIMITS = MAX_REQUESTS;
