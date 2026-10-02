/**
 * THE WORLDS — every journey as the homepage shows it.
 *
 * ─── WHY THIS IS SEPARATE FROM content/home.ts ─────────────────────────────
 * It reads the journey registry and the two journey content files so dates,
 * durations and prices are DERIVED, never retyped — the homepage cannot say
 * ₹15,000 while the Goa page says ₹14,999. That makes it heavy, so it is only
 * ever imported by server components (components/home/HomePage.tsx), which
 * hand plain data down to the client sections.
 *
 * ─── ADDING A JOURNEY ──────────────────────────────────────────────────────
 * One entry in WORLDS below. `journey: null` with `href: null` is a world
 * with no page yet — it renders as COMING SOON, with no price and no dates,
 * and its CTA follows the story on Instagram instead of a dead link.
 * The order of this array is the order of the page.
 */

import "server-only";
import { journeyById, journeyHref } from "@/content/journeys";
import { GOA, facts as goaFacts, price as goaPrice } from "@/content/goa";
import { TRIP, price as edcPrice } from "@/content/thailand";
import { trip as birTrip, price as birPrice } from "@/content/bir";
import { trip as slTrip, price as slPrice } from "@/content/srilanka";
import { brand } from "@/content/site";
import { MEDIA, type MediaSlot } from "@/content/home";

export type WorldTheme = {
  /** The world's ground colour — what the screen turns into as you arrive. */
  bg: string;
  fg: string;
  /** The loud one. Name, rules, the CTA slab's shadow. */
  accent: string;
  /** The quiet one. Kicker, vibes separator. */
  accent2: string;
  /** How the destination name is set — the single biggest identity lever. */
  type: "brush" | "serif" | "display" | "neon";
  /** Legibility scrim over the media, darkest where the copy sits. */
  scrim: string;
};

export type World = {
  key: string;
  /** The registry id, for analytics. Never the destination name. */
  journeyId: string | null;
  href: string | null;
  /** Outbound fallback when there's no page yet. */
  followHref: string;
  /** The big name on the world's own panel. */
  name: string;
  /**
   * What the trip is CALLED in lists — the hero's "where to?" row, the menu and
   * the departures board. It can be longer than `name`: Thailand's panel says
   * THAILAND (the neon type would overflow a phone with more), but the trip
   * people are choosing is THAILAND + EDC.
   */
  label: string;
  kicker: string;
  tagline: string;
  vibes: string[];
  dates: string | null;
  datesShort: string | null;
  duration: string | null;
  price: string | null;
  status: { label: string; open: boolean };
  /**
   * THE FINE PRINT, as the trip's own page already states it — "Flights,
   * alcohol and personal spends aren't in it", "the festival pass is not
   * included". Read from each trip's content file, never retyped, so the
   * landing page can only ever say what the journey page says. The trust
   * section prints it large because showing it is the point.
   */
  fineprint: string | null;
  media: MediaSlot;
  theme: WorldTheme;
};

/** "FROM ₹14,999 / PERSON" → "₹14,999". The page says FROM itself. */
function rupees(amount: string): string | null {
  return amount.match(/₹[\d,]+/)?.[0] ?? null;
}

/** "20–24 NOV 2026" → "NOV 20–24", for the compact departures board. */
function shortDates(full: string): string {
  const m = full.match(/^(\d+[–-]\d+)\s+([A-Za-z]+)/);
  return m ? `${m[2].toUpperCase()} ${m[1]}` : full;
}

/** "29 December 2026 — 4 January 2027" → "29 DEC 2026 — 4 JAN 2027": the long form, kept short enough for a four-column facts row. */
function abbreviateMonths(full: string): string {
  return full.replace(/([A-Za-z]{3})[a-z]+/g, (_, three: string) => three).toUpperCase();
}

/** "4 days · 3 nights" → "4 DAYS · 3 NIGHTS", read from the Goa call sheet. */
function goaDuration(): string {
  return (goaFacts.basics.find((b) => b.k === "HOW LONG")?.v ?? GOA.days).toUpperCase();
}

function hrefFor(id: string): string | null {
  const j = journeyById(id);
  return j ? journeyHref(j) : null;
}

export const WORLDS: World[] = [
  {
    key: "goa",
    journeyId: "JOURNEY 1",
    href: hrefFor("JOURNEY 1"),
    followHref: brand.instagramUrl,
    name: "GOA",
    label: "GOA",
    fineprint: goaPrice.note,
    kicker: "JOURNEY 1 · THE FIRST PLOT",
    tagline: "Four days. One yacht. Zero early nights.",
    vibes: ["PARTY", "BEACHES", "YACHTS", "PEOPLE"],
    dates: GOA.when,
    datesShort: "OCT 2026",
    duration: goaDuration(),
    price: goaPrice.confirmed ? rupees(goaPrice.amount) : null,
    status: { label: "APPLICATIONS OPEN", open: true },
    media: MEDIA.GOA_VIDEO,
    theme: {
      bg: "#1A0D0A",
      fg: "#FFF1DC",
      accent: "#FF4F87",
      accent2: "#FFE9A8",
      type: "brush",
      scrim:
        "linear-gradient(180deg,rgba(26,13,10,0.55) 0%,rgba(26,13,10,0.05) 35%,rgba(26,13,10,0.35) 60%,rgba(26,13,10,0.92) 100%),linear-gradient(90deg,rgba(43,15,28,0.55) 0%,transparent 60%)",
    },
  },
  {
    key: "bir",
    // Journey 03 — built and deployed as its own page (content/bir.ts). Every
    // fact below is read from there so this card can never disagree with it.
    journeyId: "JOURNEY 2",
    href: hrefFor("JOURNEY 2"),
    followHref: brand.instagramUrl,
    name: birTrip.name,
    label: birTrip.name,
    fineprint: birPrice.note,
    kicker: journeyById("JOURNEY 2")?.nav?.kicker ?? "JOURNEY 2",
    tagline: "Thin air. Slow mornings. Escape the ordinary.",
    vibes: ["MOUNTAINS", "PARAGLIDING", "SLOW MORNINGS", "ADVENTURE"],
    dates: birTrip.dates,
    datesShort: shortDates(birTrip.dates),
    duration: birTrip.length,
    price: birPrice.confirmed ? rupees(birPrice.amount) : null,
    status: { label: "APPLICATIONS OPEN", open: true },
    media: MEDIA.BIR_VIDEO,
    theme: {
      bg: "#14302B",
      fg: "#FFF1DC",
      accent: "#FF7A3D",
      accent2: "#BFE3D9",
      type: "serif",
      scrim: "linear-gradient(180deg,transparent 30%,rgba(16,38,34,0.55) 50%,rgba(14,34,30,0.85) 68%,rgba(12,30,27,0.96) 100%)",
    },
  },
  {
    key: "thailand",
    journeyId: "JOURNEY 3",
    href: hrefFor("JOURNEY 3"),
    followHref: brand.instagramUrl,
    name: "THAILAND",
    label: "THAILAND + EDC",
    fineprint: edcPrice.note,
    kicker: "JOURNEY 3 · EDC THAILAND",
    tagline: "Three nights of Thailand. Three nights of festival. One very loud week.",
    vibes: ["FESTIVAL", "ISLANDS", "NIGHTLIFE", "CHAOS"],
    dates: TRIP.dates.confirmed ? TRIP.dates.value : null,
    datesShort: TRIP.dates.confirmed ? TRIP.dates.short : null,
    duration: TRIP.days.confirmed ? TRIP.days.value : null,
    price: edcPrice.confirmed ? rupees(edcPrice.amount) : null,
    status: { label: "PRE-REGISTRATION OPEN", open: true },
    media: MEDIA.THAILAND_VIDEO,
    theme: {
      bg: "#0A0414",
      fg: "#FFF1DC",
      accent: "#FF2E7E",
      accent2: "#FF7FA8",
      type: "neon",
      scrim:
        "radial-gradient(120% 80% at 50% 0%,rgba(139,61,255,0.35) 0%,transparent 55%),linear-gradient(180deg,rgba(10,4,20,0.45) 0%,transparent 35%,rgba(10,4,20,0.6) 62%,rgba(10,4,20,0.96) 100%)",
    },
  },
  {
    key: "srilanka",
    // Journey 4 — built as its own page (content/srilanka.ts, /journey/4). Dates,
    // length and price are read from there; nothing below is typed twice.
    journeyId: "JOURNEY 4",
    href: hrefFor("JOURNEY 4"),
    followHref: brand.instagramUrl,
    name: "SRI LANKA",
    label: "SRI LANKA",
    // Until a price exists the page says so itself; that sentence is the honest fine print.
    fineprint: slPrice.confirmed ? slPrice.note : slPrice.pendingNote,
    kicker: journeyById("JOURNEY 4")?.nav?.kicker ?? "JOURNEY 4",
    tagline: "Seven days. One island. One New Year.",
    vibes: ["TEA HILLS", "TRAINS", "SOUTH COAST", "NEW YEAR'S EVE"],
    // With the year on both ends: this one crosses into 2027, and "29 DEC — 4 JAN" alone doesn't say so.
    dates: abbreviateMonths(slTrip.datesLong),
    datesShort: slTrip.dates,
    duration: slTrip.length,
    // Not confirmed yet — the page itself says "pricing is being finalised". TBA, not a guess.
    price: slPrice.confirmed ? rupees(slPrice.amount) : null,
    status: { label: "WAITLIST OPEN", open: true },
    media: MEDIA.SRILANKA_VIDEO,
    theme: {
      bg: "#1B1206",
      fg: "#FFF1DC",
      accent: "#F2A23A",
      accent2: "#FFD79A",
      type: "display",
      scrim:
        // Heavier through the middle than the other worlds: the Colombo skyline is bright and
        // busy exactly where the facts sit, and white type on it needs a real floor.
        "linear-gradient(180deg,rgba(27,18,6,0.5) 0%,rgba(27,18,6,0.05) 26%,rgba(27,18,6,0.62) 46%,rgba(22,13,4,0.86) 64%,rgba(18,10,3,0.96) 100%)",
    },
  },
];

// A world pointing at a journey that isn't in the registry would render a
// dead ENTER button, and one pointing at a RETIRED journey would send visitors
// to a URL that just bounces them home. Fail the build instead. (Bali, Journey
// 01, is retired and deliberately not listed above — see `retired` in
// content/journeys/types.ts.)
for (const w of WORLDS) {
  if (!w.journeyId) continue;
  const j = journeyById(w.journeyId);
  if (!w.href || !j) {
    throw new Error(`Homepage world "${w.key}" points at ${w.journeyId}, which is not in the journey registry.`);
  }
  if (j.retired) {
    throw new Error(`Homepage world "${w.key}" points at ${w.journeyId}, which is retired.`);
  }
}
