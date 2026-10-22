import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Ticker } from "@/components/Ticker";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewsHero } from "@/components/reviews/ReviewsHero";
import { ReviewsWall } from "@/components/reviews/ReviewsWall";
import { isReviewsDemo } from "@/lib/reviewsDemo";
import { statsOf } from "@/lib/reviews";
import { listApprovedReviews } from "@/lib/reviewsStore";

/** New approvals show up within five minutes without a redeploy. */
export const revalidate = 300;

const TITLE = "Reviews — what people said after the trip | Plot Twist";
const DESCRIPTION = "Real words and real photos from people who travelled with Plot Twist.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/reviews" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/reviews" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/**
 * /reviews — the wall.
 *
 * Only APPROVED reviews are ever read here (see lib/reviewsStore.ts). With none,
 * the page says so honestly and leads with the invitation; nothing is invented.
 */
export default async function ReviewsPage() {
  const reviews = await listApprovedReviews();
  const { count, average } = statsOf(reviews);
  const shots = reviews.flatMap((r) => r.photos.map((src) => ({ src, name: r.name }))).slice(0, 3);

  return (
    <>
      {isReviewsDemo() && (
        <p role="status" className="fixed inset-x-0 top-0 z-[90] bg-[#FFD75E] px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
          Sample data — development preview only. None of this is real.
        </p>
      )}

      <main>
        <ReviewsHero count={count} average={average} shots={shots} />

        <div className="relative z-10 -my-4 overflow-hidden py-4">
          <Ticker items={["REAL TRAVELLERS", "REAL WORDS", "REAL PHOTOS", "NO FILTERS ON THE TRUTH"]} bg="#FF4F87" fg="#FFF1DC" rotate={-1.4} />
        </div>

        {/* ------------------------------ the wall ------------------------------ */}
        <section id="wall" className="paper relative overflow-hidden px-5 py-24 text-ink sm:px-8 sm:py-32 lg:px-14">
          <div className="grain pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-[1300px]">
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-ink/60">
              <span className="h-px w-10 bg-ink/40" /> The wall
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,8vw,5.5rem)] uppercase leading-[0.92] tracking-[-0.01em]">
              Pinned up,
              <br />
              <span className="font-serif normal-case italic tracking-[-0.02em] text-pink">word for word.</span>
            </h2>

            <div className="mt-14">
              {count > 0 ? (
                <ReviewsWall reviews={reviews} />
              ) : (
                <div className="mx-auto max-w-[34rem] rotate-[-1deg] rounded-[6px] border-2 border-dashed border-ink/30 bg-white/40 px-8 py-14 text-center">
                  <p className="font-serif text-[clamp(1.5rem,4.5vw,2.1rem)] leading-[1.25] text-ink/85">
                    The first stories land right after Goa.
                  </p>
                  <p className="mt-3 text-[0.95rem] text-ink/60">When the cast gets home, this wall fills up with what they actually said.</p>
                  <a href="#share" className="mt-7 inline-block font-hand text-[1.9rem] leading-none text-pink underline-offset-4 hover:underline">
                    been on a trip? tell us →
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------ your turn ------------------------------ */}
        <section
          id="share"
          className="relative scroll-mt-4 overflow-hidden px-5 py-24 text-sand sm:px-8 sm:py-32 lg:px-14"
          style={{ background: "radial-gradient(110% 80% at 80% 0%, #3d1030 0%, #1a0817 60%, #120510 100%)" }}
        >
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-12 lg:self-start">
              <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-sand/70">
                <span className="h-px w-10 bg-sand/50" /> Your turn
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,8.5vw,6rem)] uppercase leading-[0.9] tracking-[-0.01em]">
                Tell it
                <br />
                <span className="font-serif normal-case italic tracking-[-0.02em] text-[#FF4F87]">like it was.</span>
              </h2>
              <p className="mt-6 max-w-[30ch] font-serif text-[clamp(1.2rem,3.2vw,1.6rem)] leading-[1.3] text-sand/80">
                Good, great, or “honestly, the boat was too loud.” We want the real version.
              </p>
              <ul className="mt-8 space-y-3 text-[0.95rem] text-sand/75">
                {["We read every review before it goes up.", "Photos have their location data stripped automatically.", "Ask us to take yours down any time."].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4F87]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[30px] bg-[#fff1dc] p-2 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-3">
              <ReviewForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
