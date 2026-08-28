import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * THE AUTH CLIENT — anon key, RLS-respecting, bound to this request's
 * cookies. This is what admin login/logout and `auth.getUser()` run through.
 *
 * This is a different client from the service-role one in
 * lib/supabase/serviceRole.ts on purpose: this one only ever proves *who
 * someone is*. It cannot read the applications table — RLS blocks it, same
 * as it blocks a browser. Reading applicant data happens separately, after
 * requireAdmin() has confirmed that identity is on the allowlist.
 */
export async function createSupabaseServerClient() {
  const URL = process.env.SUPABASE_URL;
  const ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (!URL || !ANON_KEY) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY are not set.");
  }

  const cookieStore = await cookies();

  return createServerClient(URL, ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component render, which can't set cookies.
          // Harmless as long as the middleware below is also refreshing the
          // session on navigation — this is the documented Supabase pattern.
        }
      },
    },
  });
}
