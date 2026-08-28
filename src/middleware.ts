import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAdminEmail } from "@/lib/adminAllowlist";

/**
 * First line of defense for /admin — refreshes the auth session and bounces
 * anyone who isn't a signed-in, allow-listed admin to /admin/login.
 *
 * This is not the only check: every admin Server Component/Action calls
 * requireAdmin() itself too (see lib/admin.ts). Middleware can be
 * misconfigured or skipped by a route change; the page-level check can't be.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);

  if (pathname === "/admin/login") return response;
  if (!pathname.startsWith("/admin")) return response;

  if (!user || !isAdminEmail(user.email)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
