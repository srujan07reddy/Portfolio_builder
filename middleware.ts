import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Get session from cookies
  const session = req.cookies.get('session')?.value

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/dashboard/preview', '/api/portfolio', '/api/auth/logout']
  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  // If accessing protected route without session, redirect to login
  if (isProtectedRoute && !session) {
    // For API routes, return 401
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // For page routes, redirect to login
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  const authRoutes = ['/login', '/signup']
  if (session && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Set security headers
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  }

  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value)
  })

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
