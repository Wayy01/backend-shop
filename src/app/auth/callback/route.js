import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * OAuth Callback Handler
 * This route handles the callback from Google OAuth authentication
 *
 * Flow:
 * 1. User clicks "Login with Google"
 * 2. Gets redirected to Google
 * 3. After Google auth, user is redirected back here with a 'code'
 * 4. We exchange that code for a session
 * 5. Redirect user to their intended destination
 */
export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/profile'

  if (code) {
    const supabase = createServerClient()

    // Exchange the code for a session
    const { data: { session }, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (!sessionError && session) {
      // Check if profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .single()

      // If no profile exists, create one
      if (!profile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            full_name: session.user.user_metadata.full_name,
            role: 'user'
          })

        if (profileError) {
          console.error('Error creating profile:', profileError)
        }
      }

      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  return NextResponse.redirect(new URL('/', request.url))
}
