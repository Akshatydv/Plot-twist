/**
 * GOA · SEASON OPENER — the copy for its page.
 *
 * Written under the same rule as the rest of this repo: state only what is
 * confirmed. As of 14 Nov 2026 that is: it is Goa, it runs 18–21 Dec 2026 (four
 * days, three nights), it is for 18–30s, its four days follow the October
 * trip's plan, and applications are read by a person. Price and seats are NOT
 * confirmed, so the page says "on request" rather than a number.
 *
 * If the dates move, change them in content/goaEditions.ts, `goaOpenerHero`
 * and `goaOpenerFacts` below, and in journeys/journey-goa-opener.ts.
 */

export const goaOpenerHero = {
  photo: { src: "/photos/trips/goa-oct-26/beach-crew.jpg", focal: "50% 55%" },
  eyebrow: "GOA · SEASON OPENER",
  line1: "THE SEASON",
  line2: "opens here.",
  secondary: "Your first Goa of the season.",
  subheading: "Four days, one yacht and a very good group chat. Apply now and you hear first.",
  tripLine: "GOA · 18–21 DEC 2026 · 4 DAYS",
  ageNote: { headline: "18–30", line: "only. no exceptions." },
  cta: { label: "REQUEST YOUR INVITE", href: "#apply" },
  annotation: "apply now. you'll hear first.",
} as const;

export const goaOpenerPremise = {
  eyebrow: "WHAT THIS IS",
  headline: ["GOA, BUT MAKE IT", "a beginning."] as const,
  points: [
    { k: "01", t: "A small group, your age", d: "People who didn't know each other until the group chat did." },
    { k: "02", t: "Goa, 18–21 December", d: "Bollywood night, an all-white yacht sunset, South Goa by road, and a slow last morning." },
    { k: "03", t: "Read by a human", d: "Every application is read by a real person, start to finish." },
  ],
} as const;

export const goaOpenerFacts = {
  eyebrow: "THE CALL SHEET",
  rows: [
    { k: "WHERE", v: "Goa, India", pending: false },
    { k: "WHEN", v: "18–21 Dec 2026 · 4 days, 3 nights", pending: false },
    { k: "WHO", v: "Ages 18–30 · a small, curated group", pending: false },
    { k: "PRICE", v: "On request", pending: true },
    { k: "THE PLAN", v: "Bollywood night · White Flamingo yacht · Lost in Goa · The Hangover Club", pending: false },
    { k: "THE STAY", v: "A handpicked luxury property · details once you're in", pending: false },
  ],
  note: "Price is sent when you request your invite. The full included / not-included list comes with it.",
} as const;
