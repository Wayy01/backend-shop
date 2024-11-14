import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Middleware for handling authentication and route protection
 *
 * This middleware runs before every applicable request to:
 * 1. Check authentication status
 * 2. Protect routes that require authentication
 * 3. Handle redirects based on auth state
 *
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The response or redirect
 */
export async function middleware(request) {
  // Create initial response to modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Initialize Supabase client and get session
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Define routes that require authentication
  const protectedPaths = ['/profile', '/checkout', '/orders']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Redirect to login if accessing protected route without session
  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Redirect to profile if accessing auth page while logged in
  if (session && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return response
}

/**
 * Configure which routes middleware applies to
 *
 * Excludes:
 * - API routes (/api/*)
 * - Static files (_next/static/*)
 * - Images (_next/image/*)
 * - Favicon (favicon.ico)
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
