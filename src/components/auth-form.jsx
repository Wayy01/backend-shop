'use client'

// Import required components and utilities
import { Button } from "@/components/ui/button"
import { createBrowserClient } from '@supabase/ssr'

// AuthForm component handles Google OAuth authentication
export function AuthForm() {
  // Initialize Supabase client for browser-side authentication
  // Using environment variables for security
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  // Handler for Google OAuth sign in
  // Uses Supabase Auth to initiate OAuth flow with Google
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google', // Specify Google as the OAuth provider
      options: {
        // Redirect back to our auth callback page after successful authentication
        redirectTo: `https://backend-shop-rho.vercel.app/auth/callback`,
        queryParams: {
          // Request offline access to get refresh token
          access_type: 'offline',
          // Force consent screen to ensure refresh token is always provided
          prompt: 'consent',
        }
      }
    })
  }

  // Render a styled button that triggers Google OAuth flow when clicked
  return (
    <Button
      onClick={handleGoogleLogin}
      // Custom styling for Google-branded button
      className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-300"
      size="lg"
    >
      {/* Google logo SVG icon */}
      <svg
        className="mr-2 h-4 w-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        />
      </svg>
      Continue with Google
    </Button>
  )
}
