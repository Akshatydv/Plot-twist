import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * THE PRIVILEGED CLIENT — bypasses RLS entirely.
 *
 * Two, and only two, kinds of code may import this:
 *   1. src/lib/applicationStore.ts, to insert a new application.
 *   2. Admin Server Components/Actions, and only after requireAdmin() has
 *      already confirmed the caller is an authenticated, allow-listed admin.
 *
 * The `server-only` import makes any accidental client-side import a build
 * error rather than a leaked service-role key.
 */

const URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(URL && SERVICE_KEY);

export class StorageNotConfiguredError extends Error {
  constructor() {
    super("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set.");
    this.name = "StorageNotConfiguredError";
  }
}

let client: SupabaseClient | null = null;

export function serviceRoleClient(): SupabaseClient {
  if (!URL || !SERVICE_KEY) throw new StorageNotConfiguredError();
  // No session persistence or refresh — this is a one-shot server credential, not a user session.
  client ??= createClient(URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
