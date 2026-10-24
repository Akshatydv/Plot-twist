import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { tripLabel } from "@/lib/reviews";
import { lookupInvite } from "@/lib/reviewInvite";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How was it? | Plot Twist",
  // A personal link: never indexed, and the token never leaks via Referer.
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

const BG = "radial-gradient(110% 80% at 20% 0%, #4a1238 0%, #1a0817 55%, #120510 100%)";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-[100svh] overflow-hidden px-5 pb-20 pt-6 text-sand sm:px-8" style={{ background: BG }}>
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(30rem 30rem at 95% 15%, rgba(255,79,135,0.2), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[760px]">
        <Link href="/" aria-label="Plot Twist — home" className="inline-block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand">
          <Logo className="text-[12px] sm:text-[14px]" />
        </Link>
        {children}
      </div>
    </main>
  );
}

/**
 * /review/<token> — the personal "how was it?" page each guest gets after a trip.
 *
 * The token is checked server-side (lib/reviewInvite.ts). The guest's name is
 * pre-filled and the trip is fixed; their review is automatically verified and
 * they can leave exactly one.
 */
export default async function PersonalReviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await lookupInvite(token);

  if (!invite) {
    return (
      <Shell>
        <h1 className="mt-20 font-display text-[clamp(2.4rem,9vw,4.5rem)] uppercase leading-[0.92]">
          This link’s
          <br />
          <span className="font-serif normal-case italic text-[#FF4F87]">lost the plot.</span>
        </h1>
        <p className="mt-6 max-w-[40ch] font-serif text-[1.35rem] leading-[1.35] text-sand/80">
          It may have been mistyped, or it’s expired. You can still leave a review on the public form — or message us and we’ll send a fresh link.
        </p>
        <Link href="/reviews#share" className="mt-8 inline-flex min-h-12 items-center bg-sand px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[5px_5px_0_0_#FF4F87]">
          Write a review →
        </Link>
      </Shell>
    );
  }

  const trip = tripLabel(invite.tripId);

  if (invite.alreadyReviewed) {
    return (
      <Shell>
        <h1 className="mt-20 font-display text-[clamp(2.4rem,9vw,4.5rem)] uppercase leading-[0.92]">
          You already
          <br />
          <span className="font-serif normal-case italic text-[#FF4F87]">told us. Thank you.</span>
        </h1>
        <p className="mt-6 max-w-[40ch] font-serif text-[1.35rem] leading-[1.35] text-sand/80">
          Your {trip} review is with us. Once it’s approved it goes up on the wall with the rest of the cast.
        </p>
        <Link href="/reviews" className="mt-8 inline-flex min-h-12 items-center bg-sand px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[5px_5px_0_0_#FF4F87]">
          See the wall →
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="mt-14 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-sand/70">
        <span className="h-px w-10 bg-sand/50" /> {trip} · the cast review
      </p>
      <h1 className="mt-5 font-display text-[clamp(2.8rem,11vw,6rem)] uppercase leading-[0.88] tracking-[-0.01em]">
        Hey {invite.firstName},
        <br />
        <span className="font-serif normal-case italic tracking-[-0.02em] text-[#FF4F87]">how was {trip}?</span>
      </h1>
      <p className="mt-6 max-w-[36ch] font-serif text-[clamp(1.25rem,3.6vw,1.6rem)] leading-[1.3] text-sand/85">
        Two minutes, your words, a photo or two if you’ve got them. The good, the great, the “honestly the boat was too loud”.
      </p>
      <p className="mt-4 flex items-center gap-2 text-[0.85rem] text-[#7be8a6]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Your review will carry a “verified guest” stamp.
      </p>

      <div className="mt-10 rounded-[30px] bg-[#fff1dc] p-2 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-3">
        <ReviewForm invite={{ token, displayName: invite.displayName, tripId: invite.tripId }} />
      </div>
    </Shell>
  );
}
