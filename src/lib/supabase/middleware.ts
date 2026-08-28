import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth cookie on every request and returns who (if
 * anyone) is signed in. Lives separately from lib/supabase/server.ts because
 * middleware runs on the Edge and can't use next/headers' `cookies()` — it
 * reads and writes cookies through the request/response objects directly.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const URL = process.env.SUPABASE_URL;
  const ANON_KEY = process.env.SUPABASE_ANON_KEY;

  // Not configured yet — let the route render and explain itself rather than
  // redirect-looping on a login page that can't work either.
  if (!URL || !ANON_KEY) return { response, user: null };

  const supabase = createServerClient(URL, ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
