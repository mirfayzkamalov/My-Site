import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'))
}

// Dummy client when not configured — prevents crash
let supabase: SupabaseClient

if (isSupabaseConfigured()) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Minimal mock so imports don't break
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: 'Supabase sozlanmagan' } }),
      signOut: async () => ({ error: null }),
      updateUser: async () => ({ data: { user: null }, error: { message: 'Supabase sozlanmagan' } }),
    },
    from: () => ({
      select: () => ({ order: () => ({ data: null, error: null }), limit: () => ({ maybeSingle: async () => ({ data: null, error: null }), data: null, error: null }), maybeSingle: async () => ({ data: null, error: null }), data: null, error: null }),
      upsert: async () => ({ error: { message: 'Supabase sozlanmagan' } }),
      delete: () => ({ eq: async () => ({ error: { message: 'Supabase sozlanmagan' } }) }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ error: { message: 'Supabase sozlanmagan' } }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
  } as unknown as SupabaseClient
  console.warn('[My Site] Supabase .env yo\'q — demo rejimda ishlaydi')
}

export { supabase }
