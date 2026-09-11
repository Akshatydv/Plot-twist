import Link from "next/link";
import { brand, footer } from "@/content/site";
import { Logo } from "./Logo";
import { InstagramLink } from "./InstagramLink";

/**
 * THE TWO TONES THIS FOOTER CAN BE LIT IN.
 *
 * Same reasoning as the casting board (see CAST_TONES in WhatsATen.tsx): one
 * shared footer across every journey, but its colours were hardcoded to the
 * Goa/Bali palette — a warm brown-black ground (`bg-ink`, #1A0D0A), an orange
 * Instagram handle and a brand-pink signature.
 *
 * Under Journey 02 that landed a warm brown slab at the bottom of a
 * violet-black page, with an orange link on it. Both are outside that page's
 * arc, and the two blacks read as a seam rather than a continuation.
 *
 * "warm" is byte-identical to the previous values and is the default, so Goa
 * and Bali are untouched and neither page needed an edit.
 */
type FooterTone = {
  surface: string;
  /** The Instagram handle. */
  handle: string;
  /** The oversized brush signature. */
  signature: string;
};

const FOOTER_TONES: Record<"warm" | "night", FooterTone> = {
  warm: { surface: "#1A0D0A", handle: "#FF7A3D", signature: "#FF4F87" },
  night: { surface: "#0A0414", handle: "#FF7FA8", signature: "#FF2E7E" },
};

export function Footer({ tone = "warm" }: { tone?: "warm" | "night" } = {}) {
  const ft = FOOTER_TONES[tone];

  return (
    <footer
      className="relative overflow-hidden px-5 pb-8 pt-14 text-sand sm:px-8 lg:px-14"
      style={{ background: ft.surface }}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Logo className="text-[26px] sm:text-[40px]" />
          <div className="sm:text-right">
            <p className="font-display text-[clamp(0.95rem,3vw,1.35rem)] tracking-[0.04em]">{footer.tagline}</p>
            <InstagramLink
              href={footer.instagramUrl}
              className="mt-2 inline-block font-hand text-[clamp(1.5rem,5vw,2.2rem)] leading-none underline-offset-4 hover:underline"
              style={{ color: ft.handle }}
            >
              {footer.instagram}
            </InstagramLink>
          </div>
        </div>

        <div
          className="mt-10 select-none font-brush leading-[0.82]"
          style={{ fontSize: "clamp(2.6rem,13vw,10rem)", color: ft.signature }}
          aria-hidden
        >
          {footer.signature}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sand/15 pt-5 text-[10px] tracked text-sand/45">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{footer.legal}</span>
            {footer.legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-sand/80">
                {l.label}
              </Link>
            ))}
          </span>
          <span>{brand.metaNav.join("  /  ")}</span>
        </div>
      </div>
    </footer>
  );
}
