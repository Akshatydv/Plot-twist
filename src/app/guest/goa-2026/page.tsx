import type { Metadata } from "next";
import { GuestRegistrationFlow, type MoreTrip } from "@/components/guest/GuestRegistrationFlow";
import { WORLDS } from "@/content/homeWorlds";
import { brand } from "@/content/site";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { GUEST_TRIP, isRegistrationOpen } from "@/lib/guestRegistration";

/** Evaluated per request so the page closes itself exactly when the trip starts. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guest registration — Goa | Plot Twist",
  description: "Guest registration for confirmed Plot Twist guests travelling to Goa, 17–20 October 2026.",
  // Private by design: shared with confirmed guests, never something to index.
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

/** After the trip has started there is nothing to register for: say so, and point at the reviews. */
function Closed() {
  return (
    <main
      className="relative min-h-[100svh] overflow-hidden px-5 pb-20 pt-6 text-sand sm:px-8"
      style={{ background: "radial-gradient(110% 80% at 20% 0%, #4a1238 0%, #1a0817 55%, #120510 100%)" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[760px]">
        <Link href="/" aria-label="Plot Twist — home" className="inline-block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand">
          <Logo className="text-[12px] sm:text-[14px]" />
        </Link>
        <p className="mt-20 text-[11px] font-medium uppercase tracking-[0.28em] text-sand/65">{GUEST_TRIP.eyebrow}</p>
        <h1 className="mt-5 font-display text-[clamp(2.8rem,11vw,6rem)] uppercase leading-[0.88]">
          That’s a wrap
          <br />
          <span className="font-serif normal-case italic text-[#FF4F87]">on {GUEST_TRIP.shortName}.</span>
        </h1>
        <p className="mt-6 max-w-[38ch] font-serif text-[clamp(1.25rem,3.6vw,1.6rem)] leading-[1.3] text-sand/85">
          Guest registration closed when the trip began. If you were on it, we’d love to hear how it went.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/reviews#share" className="inline-flex min-h-12 items-center bg-sand px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[5px_5px_0_0_#FF4F87]">
            Tell us how it was →
          </Link>
          <Link href="/" className="inline-flex min-h-12 items-center border border-sand/45 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-sand hover:bg-sand/10">
            Back to Plot Twist
          </Link>
        </div>
      </div>
    </main>
  );
}

/**
 * /guest/goa-2026 — the pre-trip registration for confirmed guests.
 *
 * "More trips" is read from the same registry the homepage renders (WORLDS),
 * so it can only ever show real, published journeys — never invented ones —
 * and it excludes the trip the guest is already on. Plain data is handed to
 * the client component; nothing here touches guest records.
 */
export default function GuestRegistrationPage() {
  if (!isRegistrationOpen()) return <Closed />;

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
