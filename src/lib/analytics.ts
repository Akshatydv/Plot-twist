/**
 * ANALYTICS SEAM
 *
 * Vendor-neutral on purpose. Call sites emit clean, named events; this file
 * decides who hears them. Point it at Plausible / GA / GTM / Meta later and
 * nothing upstream changes.
 *
 * TWO HARD RULES:
 *
 * 1. NO PII, EVER. Names, handles, mobile numbers, cities, ages and answers
 *    never pass through here. Call sites send ordinals, counts, outcomes and
 *    configured ids. `Props` is typed narrowly and every call site is
 *    reviewed against it. Destination names are not sent either — a journey
 *    is identified by `journey_id` ("JOURNEY 00"), never by where it goes,
 *    so no analytics vendor ever learns the answer to the mystery.
 *
 * 2. NOTHING BLOCKS FIRST PAINT. No provider script is loaded by this module;
 *    events queue until a provider appears. If none ever does, the queue is
 *    just a dev console aid.
 */

import { readStoredAttribution } from "./attribution";

export const PLOT_EVENTS = {
  pageView: "page_view",

  // funnel: the mystery
  startPlot: "start_plot",
  clueDiscovered: "clue_discovered",
  guessStarted: "guess_started",
  guessResult: "guess_result",
  destinationRevealed: "destination_revealed",

  // funnel: the reward
  rewardRevealStarted: "reward_reveal_started",
  /** Carries `reward_id` — a pool identifier, not anything about the person. */
  rewardRevealed: "reward_revealed",
  sharePlot: "share_plot",

  // funnel: the application
  makeYourCase: "make_your_case",
  applicationStarted: "application_started",
  applicationStep: "application_step_completed",
  applicationSubmitted: "application_submitted",

  openInstagram: "open_instagram",
  /** The tea cup. Fires on the click that actually leaves for WhatsApp — never on merely opening the note. */
  contactWhatsapp: "contact_whatsapp",
} as const;

export type PlotEvent = (typeof PLOT_EVENTS)[keyof typeof PLOT_EVENTS];

/**
 * Only non-identifying values. Names, handles, phone numbers and answers must
 * never be passed as props — send ordinals, counts and outcomes instead.
 */
type Props = Record<string, string | number | boolean | null | undefined>;

/* ------------------------------------------------------------------ */
/* consent                                                             */
/* ------------------------------------------------------------------ */

/**
 * Tracking is gated so a consent banner can be dropped in later without
 * touching a single call site. Default is ON, which is the correct posture
 * for first-party, cookieless, non-PII analytics (Plausible-style) and for
 * India, the launch market. The moment a provider that needs consent is wired
 * up — Meta Pixel, GA with ads features — flip DEFAULT_CONSENT to false and
 * call `setAnalyticsConsent(true)` from the banner.
 */
const DEFAULT_CONSENT = true;
const CONSENT_KEY = "plottwist.analytics.consent";

let consent: boolean | null = null;

function hasConsent() {
  if (consent !== null) return consent;
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    consent = saved === null ? DEFAULT_CONSENT : saved === "true";
  } catch {
    consent = DEFAULT_CONSENT;
  }
  return consent;
}

export function setAnalyticsConsent(granted: boolean) {
  consent = granted;
  try {
    window.localStorage.setItem(CONSENT_KEY, String(granted));
  } catch {
    // Private mode — consent just won't persist across sessions.
  }
  if (granted) flush();
}

/* ------------------------------------------------------------------ */
/* the queue                                                           */
/* ------------------------------------------------------------------ */

type Queued = { event: PlotEvent; props?: Props; at: number };

/** Held so a provider that boots late can still replay the funnel. */
const queue: Queued[] = [];
/** How far through the queue each provider has been fed. */
let sent = 0;

/**
 * Which journey the current page is. Set once by PlotProvider on mount, then
 * attached to every event, so Journey 00 and Journey 01 funnels can be
 * compared without a join and without either page carrying a bespoke event
 * vocabulary.
 *
 * Module-level rather than passed per call: every call site is inside one
 * journey's tree, so threading it through forty `track()` calls would add
 * noise and a way to forget.
 */
let journeyId: string | null = null;

export function setAnalyticsJourney(id: string) {
  journeyId = id;
}

/**
 * Campaign context, attached to every event so funnel steps can be broken
 * down by Reel without a join. Read lazily — attribution is captured on mount
 * and this module may be imported earlier than that.
 */
function campaignProps(): Props {
  const a = readStoredAttribution();
  const journey: Props = journeyId ? { journey_id: journeyId } : {};
  if (!a) return journey;
  return {
    ...journey,
    source: a.source ?? undefined,
    medium: a.medium ?? undefined,
    campaign: a.campaign ?? undefined,
    content: a.content ?? undefined,
  };
}

function deliver(item: Queued) {
  const w = window as unknown as {
    plausible?: (e: string, o?: { props?: Props }) => void;
    gtag?: (kind: string, e: string, o?: Props) => void;
    dataLayer?: unknown[];
    fbq?: (kind: string, e: string, o?: Props) => void;
  };

  const props = { ...campaignProps(), ...item.props };
  const hasProps = Object.keys(props).length > 0;

  let delivered = false;

  if (typeof w.plausible === "function") {
    w.plausible(item.event, hasProps ? { props } : undefined);
    delivered = true;
  }
  if (typeof w.gtag === "function") {
    // GoogleAnalytics.tsx's RouteChangeTracker is the sole source of GA
    // page_view events — it fires once per URL, first load included, with
    // send_page_view disabled at config time specifically so nothing else
    // ever sends one. Forwarding this app's own "page_view" plot-event
    // (PlotProvider's per-mount signal, not a GA-shaped pageview) here too
    // would double-count every visit to / and /journey/*.
    if (item.event !== PLOT_EVENTS.pageView) {
      w.gtag("event", item.event, props);
    }
    delivered = true;
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: item.event, ...props });
    delivered = true;
  }
  // Meta's standard events are a different vocabulary — see metaEventFor.
  if (typeof w.fbq === "function") {
    const meta = metaEventFor(item.event);
    if (meta) w.fbq("track", meta, props);
    delivered = true;
  }

  if (!delivered && process.env.NODE_ENV === "development") {
    console.debug("[plot]", item.event, props);
  }
}

function flush() {
  if (typeof window === "undefined" || !hasConsent()) return;
  while (sent < queue.length) {
    deliver(queue[sent]);
    sent += 1;
  }
}

export function track(event: PlotEvent, props?: Props) {
  queue.push({ event, props, at: Date.now() });
  if (typeof window === "undefined") return;
  // Never block the caller — and never block paint.
  if (hasConsent()) flush();
}

/**
 * Meta standard-event mapping.
 *
 * Deliberately conservative: `Lead` fires ONLY on a real submitted
 * application, never on a button click, and `CompleteRegistration` is not
 * used at all because nobody registers anything. Inflating these teaches
 * Meta's optimiser the wrong thing and quietly wastes ad spend.
 */
function metaEventFor(event: PlotEvent): string | null {
  switch (event) {
    case PLOT_EVENTS.pageView:
      return "PageView";
    case PLOT_EVENTS.startPlot:
      return "ViewContent";
    case PLOT_EVENTS.applicationStarted:
      return "InitiateCheckout";
    case PLOT_EVENTS.applicationSubmitted:
      return "Lead";
    default:
      return null;
  }
}

/** Exposed for debugging the funnel in the console. */
export function trackedEvents() {
  return [...queue];
}
