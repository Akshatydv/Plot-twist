import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Terms — Plot Twist", robots: { index: false, follow: true } };

/**
 * DRAFT. Exists so "*T&Cs apply" on the reward card points somewhere real,
 * and so applicants aren't agreeing to nothing. Not final, not reviewed by a
 * lawyer — replace before any payment or booking flow goes live.
 */
export default function TermsPage() {
  return (
    <main
      className="min-h-[100svh] px-5 py-14 text-sand sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "radial-gradient(110% 80% at 30% 0%, #3d1030 0%, #1a0817 55%, #120510 100%)" }}
    >
      <div className="mx-auto max-w-[64ch]">
        <Logo className="text-[18px] sm:text-[22px]" />

        <div className="mt-10 inline-block -rotate-2 border-2 border-[#FFD75E] px-3 py-1 text-[10px] tracked text-[#FFD75E]">
          DRAFT — NOT FINAL
        </div>

        <h1 className="mt-4 font-display text-[clamp(2rem,7vw,3.4rem)] uppercase leading-[0.95]">Terms</h1>
        <p className="mt-3 max-w-[46ch] text-sand/60">
          What applying does and doesn't mean, in plain language. This is a draft — the real terms
          (dates, price, cancellation, travel-specific fine print) will replace this before anyone is
          asked to pay for anything.
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.65] text-sand/80">
          <section>
            <h2 className="font-display text-[13px] tracked text-sand">APPLYING ISN'T BOOKING</h2>
            <p className="mt-2">
              Submitting an application is a request to be considered for Journey 01. It does not
              reserve a spot, does not charge you anything, and does not guarantee selection. Selection
              is manual — a real person reads every application.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">ELIGIBILITY</h2>
            <p className="mt-2">
              Applicants must be 18–30 years old at the time of travel. We may decline any application
              without stating a reason — the casting decision is ours, and it's genuinely not
              algorithmic.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">THE REWARD</h2>
            <p className="mt-2">
              Solving the destination mystery unlocks one reward from a fixed pool, assigned once and
              not re-rolled. Rewards are tied to Journey 01 and have no cash-equivalent value beyond
              what's stated at the time they're honoured.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">WHAT'S NOT DECIDED YET</h2>
            <p className="mt-2">
              Price, exact dates, cancellation policy, and travel insurance requirements aren't final
              and aren't published here yet. None of this is invented or implied by anything currently
              on the site — if you don't see a number, we haven't set one.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">CONTACT</h2>
            <p className="mt-2">Questions: reach us on Instagram or via the WhatsApp link on the site.</p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-2 border-b border-sand/30 pb-1 text-[12px] tracked text-sand/60 hover:text-sand"
        >
          ← back to the plot
        </Link>
      </div>
    </main>
  );
}
