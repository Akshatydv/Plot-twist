import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";

/**
 * THE GUIDE LAYOUT — the register the site uses when it is explaining rather
 * than selling.
 *
 * ─── WHY THESE PAGES DO NOT LOOK LIKE THE JOURNEY PAGES ─────────────────────
 * A journey page is an experience: full-bleed footage, a gate that opens, a
 * room with a mirrorball in it. That is exactly wrong for somebody who arrived
 * from a search result with a question. They want the answer, in a column, at
 * a readable measure — and a page that performs at them instead is a page they
 * leave, which search engines notice quite directly.
 *
 * So this is deliberately plain: one column, generous line height, a 62ch
 * measure, and the brand carried by type and palette rather than by motion.
 * No hero video, no scroll-driven anything, nothing that needs JavaScript to
 * become readable.
 *
 * ─── THE PITCH IS ONE BLOCK, AT THE END ─────────────────────────────────────
 * `cta` renders once, after the content has already been useful. A guide that
 * interrupts itself every two paragraphs to sell is not a guide, nobody links
 * to it, and it converts worse than the restrained version anyway.
 */

type Item = { k: string; v: string };
export type GuideSection = {
  h: string;
  p?: readonly string[];
  list?: readonly Item[];
};

export function Guide({
  kicker,
  headline,
  lede,
  sections,
  cta,
  ctaHref,
  disclaimer,
}: {
  kicker: string;
  headline: readonly string[];
  lede: string;
  sections: readonly GuideSection[];
  cta: { kicker: string; headline: string; body: string; action: string };
  ctaHref: string;
  /** Only the pages that name somebody else's festival carry one. */
  disclaimer?: string;
}) {
  return (
    <>
      <main
        className="min-h-[100svh] px-5 py-12 text-sand sm:px-8 sm:py-16 lg:px-14"
        style={{ background: "radial-gradient(115% 80% at 25% 0%, #3d1030 0%, #1a0817 52%, #120510 100%)" }}
      >
        <div className="mx-auto max-w-[62ch]">
          <Link href="/" className="inline-block outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink">
            <Logo className="text-[18px] sm:text-[22px]" />
          </Link>

          <p className="mt-10 text-[10px] tracked uppercase text-sand/55">{kicker}</p>

          <h1 className="mt-3 font-display text-[clamp(2.1rem,7.5vw,3.6rem)] uppercase leading-[0.92]">
            {headline.map((line, i) => (
              <span key={line} className={i === headline.length - 1 ? "text-pink" : undefined}>
                {line}
                {i < headline.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="mt-5 text-[1.05rem] leading-[1.6] text-sand/75">{lede}</p>

          <div className="mt-12 space-y-11">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-[clamp(1.1rem,3.6vw,1.45rem)] uppercase leading-[1.1] text-sand">
                  {s.h}
                </h2>

                {s.p?.map((para) => (
                  <p key={para} className="mt-3 text-[15.5px] leading-[1.68] text-sand/80">
                    {para}
                  </p>
                ))}

                {s.list && (
                  <dl className="mt-5 space-y-4">
                    {s.list.map((item) => (
                      <div key={item.k} className="border-l-2 border-pink/45 pl-4">
                        <dt className="font-display text-[13px] uppercase tracking-[0.06em] text-sand">
                          {item.k}
                        </dt>
                        <dd className="mt-1 text-[15px] leading-[1.6] text-sand/75">{item.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
          </div>

          {/* the one pitch */}
          <aside className="mt-14 border-2 border-pink/40 p-6 sm:p-7">
            <p className="text-[9.5px] tracked uppercase text-pink">{cta.kicker}</p>
            <p className="mt-2 font-display text-[clamp(1.3rem,4.5vw,1.9rem)] uppercase leading-[1.04] text-sand">
              {cta.headline}
            </p>
            <p className="mt-3 text-[15px] leading-[1.6] text-sand/80">{cta.body}</p>
            <Link
              href={ctaHref}
              className="mt-5 inline-flex items-center gap-2 bg-pink px-6 py-3 text-[12px] font-semibold tracked uppercase text-ink transition-transform duration-200 hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              {cta.action}
              <span aria-hidden>→</span>
            </Link>
          </aside>

          {disclaimer && (
            <p className="mt-10 border-t border-sand/15 pt-5 text-[12.5px] leading-[1.55] text-sand/55">
              {disclaimer}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
