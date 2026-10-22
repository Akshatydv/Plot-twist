import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

/**
 * Shared chrome for the two trip documents guests are asked to agree to.
 * Same dark editorial treatment as /terms and /privacy.
 *
 * Both documents are DRAFTS. The banner is not decoration: it is the honest
 * statement that nobody has signed these off, and it must be removed only by
 * a person who has the authority to say they are final.
 */
export function GuestDoc({
  title,
  intro,
  version,
  children,
}: {
  title: string;
  intro: string;
  version: string;
  children: ReactNode;
}) {
  return (
    <main
      className="min-h-[100svh] px-5 py-14 text-sand sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "radial-gradient(110% 80% at 30% 0%, #3d1030 0%, #1a0817 55%, #120510 100%)" }}
    >
      <div className="mx-auto max-w-[68ch]">
        <Logo className="text-[18px] sm:text-[22px]" />

        <div className="mt-10 inline-block -rotate-2 border-2 border-[#FFD75E] px-3 py-1 text-[10px] tracked text-[#FFD75E]">
          DRAFT — NOT LEGALLY REVIEWED
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-sand/50">Goa · 17–20 October 2026 · {version}</p>

        <h1 className="mt-4 font-display text-[clamp(2rem,7vw,3.4rem)] uppercase leading-[0.95]">{title}</h1>
        <p className="mt-3 max-w-[52ch] text-sand/65">{intro}</p>

        <div className="mt-10 space-y-9 text-[15px] leading-[1.65] text-sand/85">{children}</div>

        <Link
          href="/guest/goa-2026"
          className="mt-14 inline-flex items-center gap-2 border-b border-sand/30 pb-1 text-[12px] tracked text-sand/60 hover:text-sand"
        >
          ← back to registration
        </Link>
      </div>
    </main>
  );
}

export function DocSection({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[13px] tracked text-sand">
        {n}. {title}
      </h2>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}

/** A visible gap: a decision that belongs to the business or a lawyer, not to code. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-[#FFD75E]/60 bg-[#FFD75E]/[0.06] px-3 py-2 text-[14px] text-[#FFD75E]">
      <span className="font-semibold tracking-wide">TO BE CONFIRMED BEFORE LAUNCH — </span>
      {children}
    </p>
  );
}
