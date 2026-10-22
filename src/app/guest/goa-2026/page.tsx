import type { Metadata } from "next";
import { GuestRegistrationFlow, type MoreTrip } from "@/components/guest/GuestRegistrationFlow";
import { WORLDS } from "@/content/homeWorlds";
import { brand } from "@/content/site";
import { GUEST_TRIP } from "@/lib/guestRegistration";

export const metadata: Metadata = {
  title: "Guest registration — Goa | Plot Twist",
  description: "Guest registration for confirmed Plot Twist guests travelling to Goa, 17–20 October 2026.",
  // Private by design: shared with confirmed guests, never something to index.
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

/**
 * /guest/goa-2026 — the pre-trip registration for confirmed guests.
 *
 * "More trips" is read from the same registry the homepage renders (WORLDS),
 * so it can only ever show real, published journeys — never invented ones —
 * and it excludes the trip the guest is already on. Plain data is handed to
 * the client component; nothing here touches guest records.
 */
export default function GuestRegistrationPage() {
  const trips: MoreTrip[] = WORLDS.filter((w) => w.journeyId !== GUEST_TRIP.journeyId && w.href).map((w) => ({
    key: w.key,
    name: w.label,
    // No trip numbers on this page: "JOURNEY 2 · NOV 2026" -> "NOV 2026".
    kicker: w.kicker.replace(/^JOURNEY\s+\d+\s*·\s*/i, ""),
    tagline: w.tagline,
    dates: w.dates,
    status: w.status.label,
    href: w.href,
    poster: w.media.poster,
  }));

  return <GuestRegistrationFlow trips={trips} instagramUrl={brand.instagramUrl} />;
}
