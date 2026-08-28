/**
 * Who counts as an admin, and nothing else. Deliberately dependency-free
 * (no next/headers, no Supabase client) so it can be imported from the Edge
 * middleware without dragging Node-only code into that bundle.
 *
 * Being a valid Supabase Auth user is necessary but not sufficient — the
 * email must also be on this list. There's no self-serve admin signup.
 */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.trim().toLowerCase());
}
