/**
 * THE JOURNEY REGISTRY — the only list of journeys that exists.
 *
 * The admin filter, the router, the sitemap and the submission validator all
 * derive from JOURNEYS. Adding Journey 02 is: write journey02.ts, add it to
 * the array below, done. Nothing else needs to know.
 */

import { JOURNEY_00 } from "./journey00";
import { JOURNEY_01 } from "./journey01";
import type { JourneyConfig, JourneyId } from "./types";

export type { JourneyConfig, JourneyId, LadderRung } from "./types";

/** Newest first — the order the admin dropdown shows. */
export const JOURNEYS: JourneyConfig[] = [JOURNEY_01, JOURNEY_00];

/**
 * What `/` renders, and what a submission with no journey falls back to.
 * Journey 01 keeps the root URL it launched on; every other journey lives at
 * /journey/<slug>.
 */
export const DEFAULT_JOURNEY = JOURNEY_01;

export function journeyById(id: string | null | undefined): JourneyConfig | null {
  if (!id) return null;
  return JOURNEYS.find((j) => j.id === id) ?? null;
}

export function journeyBySlug(slug: string | null | undefined): JourneyConfig | null {
  if (!slug) return null;
  return JOURNEYS.find((j) => j.slug === slug) ?? null;
}

export function isJourneyId(value: unknown): value is JourneyId {
  return typeof value === "string" && JOURNEYS.some((j) => j.id === value);
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
