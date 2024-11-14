import { createServerClient as createClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side operations with cookie handling
 *
 * This client is specifically designed for server components and API routes.
 * It handles cookie management for maintaining user sessions across requests.
 *
 * Cookie Operations:
 * - get: Retrieves cookie values for auth state
 * - set: Stores new cookies for session management
 * - remove: Cleans up cookies during logout
 *
 * @returns {SupabaseClient} A configured Supabase client for server-side use
 */
export function createServerClient() {
  const cookieStore = cookies()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // Get cookie value by name
        get(name) {
          return cookieStore.get(name)?.value
        },
        // Set a cookie with name, value, and options
        set(name, value, options) {
          try {
            cookieStore.set(name, value, options)
          } catch (error) {
            // Silent fail for edge runtime compatibility
          }
        },
        // Remove a cookie by setting its expiry to the past
        remove(name, options) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 })
          } catch (error) {
            // Silent fail for edge runtime compatibility
          }
        },
      },
    }
  )
}
