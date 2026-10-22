import { requireAdmin } from "@/lib/admin";
import { guestsToCsv, listGuests } from "@/lib/adminGuests";
import { GUEST_TRIP } from "@/lib/guestRegistration";

export const dynamic = "force-dynamic";

/**
 * CSV of guest registrations for trip operations. Behind the same two gates
 * as every /admin route: middleware, and requireAdmin() here (a signed-in
 * user who is not on ADMIN_EMAILS is signed out and redirected, never served).
 * GET only reads; nothing is cached.
 */
export async function GET() {
  await requireAdmin();
  const csv = guestsToCsv(await listGuests());
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${GUEST_TRIP.id}-guests.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
