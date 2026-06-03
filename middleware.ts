import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true
    
    // Decode base64url
    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    
    const payload = JSON.parse(jsonPayload)
    if (payload && typeof payload.exp === 'number') {
      return Date.now() >= payload.exp * 1000
    }
    return true
  } catch (e) {
    return true
  }
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Get session from cookies
  const session = req.cookies.get('session')?.value
  const isSessionExpired = session ? isTokenExpired(session) : false

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/dashboard/preview', '/api/portfolio', '/api/auth/logout']
  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  // If accessing protected route without session or session is expired, redirect to login
  if (isProtectedRoute && (!session || isSessionExpired)) {
    // For API routes, return 401
    if (req.nextUrl.pathname.startsWith('/api')) {
      const apiRes = NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
      if (session) {
        apiRes.cookies.delete('session')
      }
      return apiRes
    }
    
    // For page routes, redirect to login
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    const redirectRes = NextResponse.redirect(loginUrl)
    if (session) {
      redirectRes.cookies.delete('session')
    }
    return redirectRes
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  const authRoutes = ['/login', '/signup']
  if (session && !isSessionExpired && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Clear cookie if it exists but is expired
  if (session && isSessionExpired) {
    res.cookies.delete('session')
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

