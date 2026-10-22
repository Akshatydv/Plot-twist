import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { signedIdUrl } from "@/lib/adminGuests";
import { isUuid } from "@/lib/guestRegistration";

export const dynamic = "force-dynamic";

/**
 * Opens a guest's ID document. Same two gates as every /admin route
 * (middleware + requireAdmin here), then a redirect to a 60-second signed URL
 * from the private bucket — the file is never public and the link dies fast.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isUuid(id)) return new NextResponse("Not found", { status: 404 });
  const url = await signedIdUrl(id);
  if (!url) return new NextResponse("Not found", { status: 404 });
  return NextResponse.redirect(url, { status: 302, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}
