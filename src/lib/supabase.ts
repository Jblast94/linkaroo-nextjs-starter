import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Get environment variables with fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

// Create a mock client for development when Supabase is not configured
const createMockClient = () => {
  const notConfiguredError = () => {
    throw new Error(
      'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. See .env.example for reference.'
    )
  }

  return {
    auth: {
      getUser: notConfiguredError,
      signInWithPassword: notConfiguredError,
      signUp: notConfiguredError,
      signOut: notConfiguredError,
    },
    from: () => ({
      select: notConfiguredError,
      insert: notConfiguredError,
      update: notConfiguredError,
      delete: notConfiguredError,
    }),
  } as unknown as SupabaseClient
}

// Export the Supabase client (or mock client if not configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

// Export a helper to check if Supabase is configured
export const isSupabaseReady = isSupabaseConfigured
