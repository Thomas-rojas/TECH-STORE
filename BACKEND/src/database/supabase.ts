import { createClient } from '@supabase/supabase-js'
import { env } from '../config/env'

/**
 * Backend uses the service role key to bypass RLS.
 * Never expose this key to the frontend.
 */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
