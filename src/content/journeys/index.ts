/**
 * THE JOURNEY REGISTRY — the only list of journeys that exists.
 *
 * The admin filter, the router, the sitemap and the submission validator all
 * derive from JOURNEYS. Adding Journey 4 is: write journey4.ts, add it to
 * the array below, done. Nothing else needs to know.
 */

import { JOURNEY_1 } from "./journey1";
import { JOURNEY_2 } from "./journey2";
import { JOURNEY_3 } from "./journey3";
import { JOURNEY_4 } from "./journey4";
import { JOURNEY_BALI } from "./journey-bali";
import type { JourneyConfig, JourneyId } from "./types";

export type { JourneyConfig, JourneyId, JourneyPageVariant, LadderRung } from "./types";

/**
 * EVERY journey, including retired ones — the admin filter and the submission
 * validator need the full list so old applications stay readable.
 *
 * ─── THE NUMBERS ARE THE IDS NOW ────────────────────────────────────────────
 *   Journey 1 — Goa           id "JOURNEY 1"   /journey/1
 *   Journey 2 — Bir × Barot   id "JOURNEY 2"   /journey/2
 *   Journey 3 — Thailand      id "JOURNEY 3"   /journey/3
 *   Journey 4 — Sri Lanka     id "JOURNEY 4"   /journey/4
 *   Bali (retired)            id "BALI"        (no public page)
 *
 * They used to be "JOURNEY 00" / "JOURNEY 03" / "JOURNEY 02" / "JOURNEY 01",
 * which is why older comments across the codebase still say Journey 00 (Goa),
 * 01 (Bali), 02 (Thailand) and 03 (Bir). Read those through LEGACY_JOURNEY_IDS
 * below; the code they describe is unchanged.
 *
 * Ordered as the homepage shows them.
 */
export const JOURNEYS: JourneyConfig[] = [JOURNEY_1, JOURNEY_2, JOURNEY_3, JOURNEY_4, JOURNEY_BALI];

/**
 * THE OLD IDS, AND WHERE THEY GO.
 *
 * Renaming an id is safe for new data and dangerous for everything that was
 * written under the old one. Three things still carry old ids:
 *
 *   - rows in the applications table, until
 *     supabase/migrations/20260930000000_renumber_journeys.sql has run
 *   - a browser tab opened before the deploy, which will POST the id it loaded
 *   - analytics events and any saved link or QR code that carries one
 *
 * journeyById() resolves an old id to the current journey, so none of them
 * breaks: an old row still shows its journey's name, and a stale form still
 * submits — stored under the NEW id. The URLs have their own permanent
 * redirects in next.config.ts.
 *
 * It is never consulted for writing: everything stored is journey.id.
 */
export const LEGACY_JOURNEY_IDS: Record<string, string> = {
  "JOURNEY 00": "JOURNEY 1",
  "JOURNEY 03": "JOURNEY 2",
  "JOURNEY 02": "JOURNEY 3",
  "JOURNEY 01": "BALI",
};

/** A journey's current id followed by every old id it has ever had — for queries that must match rows either side of the migration. */
export function journeyIdAliases(id: string): string[] {
  return [id, ...Object.entries(LEGACY_JOURNEY_IDS).filter(([, now]) => now === id).map(([old]) => old)];
}

/** What the public site shows: everything that is not retired. */
export const PUBLIC_JOURNEYS: JourneyConfig[] = JOURNEYS.filter((j) => !j.retired);

/**
 * What `/` renders, and what a submission with no journey falls back to.
 * The default journey owns the root URL; every other journey lives at
 * /journey/<slug>, including this one's own previous default (redirect logic
 * lives in the [journey] route, keyed off this constant, not a hardcoded slug).
 */
export const DEFAULT_JOURNEY = JOURNEY_1;

/**
 * The header's "GO INTERNATIONAL" link always points here — one named
 * constant rather than a hardcoded slug, so it keeps pointing at the right
 * journey if the roster or the default ever changes again.
 */
export const INTERNATIONAL_JOURNEY = JOURNEY_3;

/**
 * WHERE A JOURNEY LIVES.
 *
 * The default journey owns "/" and every other one lives at /journey/<slug> —
 * see the redirect in app/journey/[journey]/page.tsx, which is keyed off the
 * same constant. Deriving the URL here rather than hardcoding it in the menu
 * means the day the default changes, every link follows.
 */
export function journeyHref(journey: JourneyConfig): string {
  return journeyOwnsRoot(journey) ? "/" : `/journey/${journey.slug}`;
}

/**
 * WHO OWNS "/" — THE DEFAULT JOURNEY, OR THE BRAND HOMEPAGE.
 *
 * The brand homepage (components/home/HomePage.tsx) is the entrance to every
 * journey, and it now owns the root URL.
 *
 * `true` (current): "/" renders the homepage, the default journey is served at
 * its own /journey/<slug>, /home redirects to "/", and journeyHref, the
 * masthead menu and the sitemap all follow.
 *
 * `false` puts the default journey back on "/" and keeps the homepage
 * reviewable at /home. The catch either way: anything printed or running as an
 * ad with the bare domain on it lands wherever "/" points.
 */
export const HOMEPAGE_OWNS_ROOT = true;

/** True when this journey is the one served at "/". Never true once the homepage owns it. */
export function journeyOwnsRoot(journey: JourneyConfig): boolean {
  return !HOMEPAGE_OWNS_ROOT && journey.id === DEFAULT_JOURNEY.id;
}

/**
 * THE MASTHEAD MENU'S CONTENTS — every journey that has opted in via `nav`,
 * minus the one you are already looking at.
 *
 * Derived from the registry, so launching Journey 03 puts it in the menu on
 * every page with no component change, and retiring one removes it everywhere.
 */
export function otherJourneys(currentId: string | null | undefined): JourneyConfig[] {
  return PUBLIC_JOURNEYS.filter((j) => j.nav && j.id !== currentId);
}

export function journeyById(id: string | null | undefined): JourneyConfig | null {
  if (!id) return null;
  // An old id resolves to its journey — see LEGACY_JOURNEY_IDS.
  const current = LEGACY_JOURNEY_IDS[id] ?? id;
  return JOURNEYS.find((j) => j.id === current) ?? null;
}

export function journeyBySlug(slug: string | null | undefined): JourneyConfig | null {
  if (!slug) return null;
  return JOURNEYS.find((j) => j.slug === slug) ?? null;
}

export function isJourneyId(value: unknown): value is JourneyId {
  return typeof value === "string" && journeyById(value) !== null;
}

/* ------------------------------------------------------------------ */
/* build-time invariants                                               */
/* ------------------------------------------------------------------ */

// These run during `next build`'s static generation, so a mistake fails the
// build instead of shipping a broken hunt. Same pattern as the casting-weight
// assertion in content/site.ts.

const ids = JOURNEYS.map((j) => j.id);
if (new Set(ids).size !== ids.length) {
  throw new Error(`Duplicate journey id in content/journeys: ${ids.join(", ")}`);
}

const slugs = JOURNEYS.map((j) => j.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error(`Duplicate journey slug in content/journeys: ${slugs.join(", ")}`);
}

// The single most dangerous thing to get wrong: two journeys sharing a
// storage key means one hunt's clue progress unlocks the other's guess box
// and one journey's reward shows up on the other's page.
const keys = JOURNEYS.map((j) => j.storageKey);
if (new Set(keys).size !== keys.length) {
  throw new Error(`Journeys must not share a localStorage key: ${keys.join(", ")}`);
}

for (const j of JOURNEYS) {
  if (j.ladder.length !== 5) {
    throw new Error(`${j.id} has ${j.ladder.length} ladder rungs, not 5.`);
  }
  if (j.destination.accepted.length === 0) {
    throw new Error(`${j.id} accepts no answers — nobody could ever solve it.`);
  }
  // A destination that appears in its own clue copy is not a mystery.
  const needle = j.destination.name.toLowerCase();
  const copy = [
    ...j.ladder.flatMap((r) => [r.kicker, r.reveal, r.note]),
    ...j.clues.flatMap((c) => [c.eyebrow, c.title, c.line, c.hint]),
    j.hero.eyebrow,
    ...j.hero.sideNote.big,
    ...j.story.frames.flatMap((f) => [f.title, f.caption, f.alt, f.note ?? ""]),
  ].join(" ").toLowerCase();
  if (copy.includes(needle)) {
    throw new Error(`${j.id} names its own destination ("${j.destination.name}") in clue or hero copy.`);
  }
}
