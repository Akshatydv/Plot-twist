import Link from "next/link";
import { errors } from "@/content/site";
import { Logo } from "@/components/Logo";

const E = errors.notFound;

/**
 * A dead end that still sounds like Plot Twist. No stack trace, no framework
 * chrome — the visitor gets a joke and a way back.
 */
export default function NotFound() {
  return (
    <main
      className="flex min-h-[100svh] flex-col items-center justify-center px-6 py-16 text-center text-sand"
      style={{ background: "radial-gradient(110% 80% at 30% 10%, #3d1030 0%, #1a0817 55%, #120510 100%)" }}
    >
      <Logo className="text-[18px] sm:text-[22px]" />

      <p className="mt-14 font-display text-[clamp(3.5rem,18vw,7rem)] leading-none text-pink">{E.code}</p>

      <h1 className="mt-3 font-display text-[clamp(1.8rem,7vw,3.2rem)] uppercase leading-[0.95]">{E.title}</h1>

      <p className="mt-4 max-w-[34ch] text-[clamp(1rem,2.6vw,1.15rem)] leading-[1.5] text-sand/70">{E.body}</p>

      <span className="mt-5 block font-hand text-[1.3rem] -rotate-2 text-[#FFD75E]">{E.note}</span>

      <Link
        href={E.cta.href}
        className="group mt-9 inline-flex items-center gap-3 bg-sand px-8 py-4 text-[13px] font-semibold tracked uppercase text-ink transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0"
        style={{ boxShadow: "6px 6px 0 0 #FF4F87" }}
      >
        {E.cta.label}
        <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
          →
        </span>
      </Link>
    </main>
  );
}
