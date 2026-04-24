// ============================================================
// Supabase service-role client singleton
// ============================================================
//
// Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from the
// environment at import time and throws a clear, actionable
// error if either variable is missing.
//
// The service-role key bypasses Row Level Security, so this
// module must NEVER be imported in browser/client bundles.
// ============================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[db/client] Missing required environment variable: ${name}. ` +
        'Ensure it is set in your .env file or execution environment before ' +
        'importing this module.',
    );
  }
  return value;
}

const supabaseUrl: string = requireEnv('SUPABASE_URL');
const supabaseServiceRoleKey: string = requireEnv('SUPABASE_SERVICE_ROLE_KEY');

/**
 * Singleton Supabase client configured with the service-role key.
 *
 * - persistSession: false  → no local storage / cookie session management
 * - autoRefreshToken: false → service-role JWTs do not need refreshing
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any — the Database
// generic would require a generated types file; using `any` here is acceptable
// because all table interactions are typed via our own interfaces in types.ts.
export const db: SupabaseClient<any, 'public', any> = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
