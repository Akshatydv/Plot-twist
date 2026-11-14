import Link from "next/link";
import { goaEditionHref, goaEditions, type GoaEdition } from "@/content/goaEditions";

/**
 * GOA, TWO WAYS — the date picker for a destination that departs twice.
 *
 * `GoaSwitcher` is the compact pair of dates that sits under a Goa hero, so a
 * visitor who landed on the wrong edition can change it without scrolling.
 * `GoaStrip` is the larger section near the end of each page. Both read
 * content/goaEditions.ts, and both mark the edition you are already on.
 */
export function GoaSwitcher({ current, tone = "dark" }: { current: GoaEdition["key"]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <nav aria-label="Goa dates" className="mt-6">
      <p className={`mb-2 text-[10px] font-semibold tracked ${light ? "text-ink/55" : "text-sand/60"}`}>PICK YOUR GOA</p>
      <ul className="flex flex-wrap gap-2.5">
        {goaEditions.map((e) => {
          const here = e.key === current;
          const cls = `inline-flex flex-col border px-4 py-2.5 text-left transition-colors ${
            here
              ? "border-pink bg-pink text-sand"
              : light
                ? "border-ink/30 text-ink hover:border-ink"
                : "border-sand/40 text-sand hover:border-sand"
          }`;
          const body = (
            <>
              <span className="font-display text-[1.05rem] uppercase leading-none tracking-[0.02em]">{e.dates}</span>
              <span className="mt-1 font-serif text-[0.9rem] italic leading-none opacity-80">{e.label}</span>
            </>
          );
          return (
            <li key={e.key}>
              {here ? (
                <span className={cls} aria-current="page">
                  {body}
                </span>
              ) : (
                <Link href={goaEditionHref(e)} className={cls}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function GoaStrip({ current }: { current: GoaEdition["key"] }) {
  return (
    <section className="paper relative overflow-hidden px-5 py-20 text-ink sm:px-8 sm:py-24 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <p className="flex items-center gap-3 text-[11px] font-medium tracked text-ink/55">
          <span className="h-px w-10 bg-ink/30" /> GOA, TWO WAYS
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.2rem,8vw,4.6rem)] uppercase leading-[0.9]">
          Same Goa.
          <br />
          <span className="font-brush normal-case text-pink">Two departures.</span>
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {goaEditions.map((e) => {
            const here = e.key === current;
            const inner = (
              <div
                className={`relative h-full border-2 p-6 sm:p-7 ${here ? "border-ink bg-ink text-sand" : "border-ink/25 bg-white/40 text-ink transition-colors hover:border-ink"}`}
              >
                <p className={`text-[10px] font-semibold tracked ${here ? "text-[#FFE9A8]" : "text-pink"}`}>{here ? "YOU'RE HERE" : "ALSO IN GOA"}</p>
                <p className="mt-3 font-display text-[clamp(1.8rem,6vw,2.6rem)] uppercase leading-none">{e.label}</p>
                <p className="mt-2 font-serif text-[1.15rem] italic opacity-75">
                  {e.dates} · {e.note}
                </p>
                {!here && <p className="mt-5 text-[11px] font-semibold tracked">SEE THIS ONE →</p>}
              </div>
            );
            return <li key={e.key}>{here ? inner : <Link href={goaEditionHref(e)}>{inner}</Link>}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
