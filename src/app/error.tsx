"use client";

import { useEffect } from "react";
import { errors } from "@/content/site";

const E = errors.crash;

/**
 * Runtime error boundary for the public site.
 *
 * The visitor sees brand voice and a retry. The actual error goes to the
 * console (and, in production, to whatever the host collects) — never onto
 * the screen, because `error.message` can carry internals.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[plot] unhandled error:", error);
  }, [error]);

  return (
    <main
      className="flex min-h-[100svh] flex-col items-center justify-center px-6 py-16 text-center text-sand"
      style={{ background: "radial-gradient(110% 80% at 30% 10%, #3d1030 0%, #1a0817 55%, #120510 100%)" }}
    >
      <p className="font-display text-[clamp(1rem,3.4vw,1.4rem)] tracking-[0.14em] text-pink">{E.code}</p>

      <h1 className="mt-3 font-display text-[clamp(1.8rem,7vw,3.2rem)] uppercase leading-[0.95]">{E.title}</h1>

      <p className="mt-4 max-w-[34ch] text-[clamp(1rem,2.6vw,1.15rem)] leading-[1.5] text-sand/70">{E.body}</p>

      <span className="mt-5 block -rotate-2 font-hand text-[1.3rem] text-[#FFD75E]">{E.note}</span>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-3 bg-sand px-8 py-4 text-[13px] font-semibold tracked uppercase text-ink transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0"
          style={{ boxShadow: "6px 6px 0 0 #FF4F87" }}
        >
          {E.retry}
        </button>
        <a href={E.cta.href} className="text-[11px] tracked uppercase text-sand/50 underline-offset-4 hover:text-sand hover:underline">
          {E.cta.label}
        </a>
      </div>
    </main>
  );
}
