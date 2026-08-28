import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";
import { isAdminEmail } from "./adminAllowlist";

export { isAdminEmail };

/**
 * Defense in depth: every admin Server Component and Server Action calls
 * this itself, rather than trusting that middleware already ran. Redirects
 * to /admin/login if there's no session, or if the signed-in email isn't on
 * the allowlist (and signs that session out — being logged into Supabase at
 * all doesn't mean being an admin).
 */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    if (user) await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return user;
}
