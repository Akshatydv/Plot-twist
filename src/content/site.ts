/**
 * PLOT TWIST — single source of truth for all copy.
 * Edit here, not in components. Journey-scoped so Journey 02 can be added later.
 */

export const brand = {
  name: "PLOT TWIST",
  instagram: "@plottwist.social",
  instagramUrl: "https://www.instagram.com/plottwist.social/",
  tagline: "20 people. One trip. 10/10s only.",
  signature: "DO IT FOR THE PLOT.",
  metaNav: ["TRAVEL", "PEOPLE", "PLOT TWISTS"],
} as const;

export const hero = {
  eyebrow: "JOURNEY 01 — 20 SEATS, AGES 18–30",
  line1: "You've found",
  line2: "the plot.",
  /**
   * The highest-attention line on the site. It used to ask a riddle; now it
   * answers "what is this" and keeps the hook in the same breath, so a
   * ten-second visitor leaves knowing the product rather than the puzzle.
   */
  sub: "20 people. One trip. You just don't know where yet.",
  support: "Come alone. Leave with 19 others.",
  cta: { label: "START THE PLOT", href: "#setup" },
  annotation: "there are clues everywhere",
  scrollHint: "SCROLL — IF YOU'RE CURIOUS",
  /** The handwritten statement on the right of the frame — not a tagline, a mood. */
  sideNote: {
    big: ["20 PEOPLE.", "ONE PLOT."],
    invite: "COME GET CAST.",
  },
  /**
   * Real photography, not generated art — swap `src` for a locally optimised
   * asset before launch. Chosen deliberately for no recognisable landmark:
   * reads as "tropical coast", not a named place.
   */
  photo: {
    src: "/photos/hero-sunset.jpg",
    alt: "Palm silhouettes against a pink and orange tropical sunset over the ocean",
  },
} as const;

export const setup = {
  index: "01",
  label: "THE SETUP",
  /**
   * One idea. The third line used to be "10/10s ONLY.", which opened the
   * casting metaphor here and left it unexplained until a later section.
   * Casting now introduces itself where it's actually explained.
   */
  big: ["20 PEOPLE.", "ONE TRIP.", "NOBODY KNOWS WHERE."],
  body: [
    "We're taking 20 people somewhere.",
    "We've planned the experiences.",
    "We've planned the parties.",
    "We've planned the unexpected.",
  ],
  withhold: {
    lead: "There's just one thing we're keeping from you.",
    reveal: "Where we're going.",
  },
  annotation: "but there's more to the plot",
  badge: "20 spots. No fillers.",
  ageRange: "18–30 ONLY.",
  ageNote: "the casting range.",
  /**
   * Points at the trip, not the puzzle. Sending people to #clues from here
   * skipped the two sections that explain why the trip is worth wanting.
   */
  cta: { label: "SEE WHAT YOU'RE IN FOR", href: "#story" },
} as const;

export type Trait = {
  id: string;
  name: string;
  /** The answer, always on the card. */
  line: string;
  /** The casting director's margin note — appears by the grade when picked. */
  verdict: string;
  accent: string;
  /** Points toward the 10/10. All six MUST sum to exactly 10 — see the assertion below `traits`. */
  weight: number;
};

/**
 * The casting board. A handwritten 10/10 gets marked up as the visitor picks
 * traits — a grade being awarded, not a score being earned. Traits toggle
 * back off, so it stays a plaything rather than a quiz.
 */
export const casting = {
  index: "04",
  label: "THE CASTING",
  stamp: "CASTING — JOURNEY 01",
  /**
   * The bridge. Without it the trait board reads as a quiz about the visitor;
   * with it, it reads as us showing our own casting criteria. Plain lines on
   * purpose — the clever one is the headline directly beneath.
   */
  bridge: ["20 seats. A lot more than 20 people want one.", "So we cast it like a room we'd want to be in."],
  eyebrow: "WHAT'S A",
  headline: "10/10?",
  subhead: "NOT A CROWD. A CAST.",
  intro: "We're looking for the whole package.",
  annotation: "yes, we're judging.",
  hint: "tap a trait — watch it add up",
  traits: [
    { id: "face", name: "FACE CARD", line: "Obviously.", verdict: "we noticed.", accent: "#FF7A3D", weight: 2 },
    { id: "charm", name: "CHARM", line: "You know it when you see it.", verdict: "okay, we like this.", accent: "#FF4F87", weight: 1 },
    { id: "energy", name: "ENERGY", line: "Good only.", verdict: "non-negotiable.", accent: "#00A9C7", weight: 2 },
    { id: "personality", name: "PERSONALITY", line: "Please have one.", verdict: "thank god.", accent: "#36C96F", weight: 2 },
    { id: "stories", name: "STORIES", line: "We want some.", verdict: "tell us at dinner.", accent: "#FF7A3D", weight: 2 },
    { id: "baddies", name: "BADDIES", line: "You know who you are.", verdict: "iconic behaviour.", accent: "#FF4F87", weight: 1 },
  ] satisfies Trait[],
  /** Red-pen marks by the grade. */
  marks: {
    idle: "we'll be the judge of that.",
    full: "okay. you're in.",
  },
  asides: ["no pressure.", "would we actually travel with you?"],
  /** Red-pen margin notes scattered across the board. */
  marginNotes: ["strong candidate.", "see me after class.", "interesting…", "we'd travel with this."],
  /**
   * Vibe fragments, not destination. Swap for owned assets before launch —
   * same note as story.frames.
   */
  photos: [
    {
      src: "/photos/people.jpg",
      alt: "Young people together outdoors",
      note: "the group chat, irl",
    },
    {
      src: "/photos/plot.jpg",
      alt: "A crowd silhouetted against a tropical sunset",
      note: "02:00",
    },
    {
      src: "/photos/unexpected.jpg",
      alt: "A scooter on a palm-lined coastal road at sunset",
      note: "no filter",
    },
  ],
  outro: {
    line: "THINK YOU MAKE THE CUT?",
    annotation: "be honest.",
  },
  /**
   * Casting now runs before the mystery, so sending people straight to the
   * form here skipped the reveal — and repeated the application section's own
   * MAKE YOUR CASE button. This hands forward instead: who we want, then where
   * we're going, then your case.
   */
  cta: { label: "FIRST — WHERE ARE WE GOING?", href: "#clues" },
} as const;

/** The only 10 in this feature — everything else derives from it. */
export const CASTING_MAX_SCORE = 10;

// A trait's `weight` edited without the others adjusting is exactly how this
// broke last time (every card showing the same flat number instead of six
// numbers that mean something). This module runs during `next build`'s
// static generation, so a mismatch throws there — the build fails loudly
// instead of shipping a casting board that can't reach 10/10.
const CASTING_WEIGHT_SUM = casting.traits.reduce((sum, t) => sum + t.weight, 0);
if (CASTING_WEIGHT_SUM !== CASTING_MAX_SCORE) {
  throw new Error(
    `casting.traits weights sum to ${CASTING_WEIGHT_SUM}, not ${CASTING_MAX_SCORE}. Fix the weights in site.ts.`
  );
}

export type Frame = {
  key: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  note?: string;
  /** Wires the note badge to a primary clue — see content/mystery.ts. */
  clueId?: "nightlife";
};

/**
 * Photography — swap `src` for licensed/owned assets before launch.
 * Deliberately no recognisable landmark: the destination stays unrevealed.
 */
export const story = {
  index: "02",
  label: "THE VISUAL STORY",
  headline: ["Pinned to", "the wall."],
  annotation: "no landmarks. we checked.",
  frames: [
    {
      key: "escape",
      title: "THE ESCAPE",
      caption: "Ocean / beach / adventure",
      src: "/photos/escape.jpg",
      alt: "Turquoise water breaking over a rocky coastline from above",
      note: "day 02",
    },
    {
      key: "experience",
      title: "THE EXPERIENCE",
      caption: "Nature / culture / exploration",
      src: "/photos/experience.jpg",
      alt: "Dense palm fronds and tropical foliage in a dark forest canopy",
    },
    {
      key: "people",
      title: "THE PEOPLE",
      caption: "20 strangers, briefly",
      src: "/photos/people.jpg",
      alt: "Five young people together outdoors",
      note: "10/10s only",
    },
    {
      key: "plot",
      title: "THE PLOT",
      caption: "Sunset / party / nightlife",
      src: "/photos/plot.jpg",
      alt: "Crowd silhouetted against a burning tropical sunset",
      note: "02:00",
      clueId: "nightlife",
    },
    {
      key: "unexpected",
      title: "THE UNEXPECTED",
      caption: "Not on the itinerary",
      src: "/photos/unexpected.jpg",
      alt: "A scooter on a palm-lined coastal road at sunset",
    },
  ] satisfies Frame[],
} as const;

export const statement = {
  index: "03",
  label: "THE PHILOSOPHY",
  /**
   * "The rest" was abstract. Naming the people makes this the answer to
   * "why would I go", and hands directly to the casting section below it.
   */
  big: ["WE PLANNED THE TRIP.", "NOT THE PEOPLE."],
  body: [
    "We plan the destination. We plan the parties.",
    "We can't plan who you're friends with by 2AM, or the story you'll tell after.",
  ],
  signature: brand.signature,
} as const;

type ClueBase = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  line: string;
  hint: string;
};

export type FlightClue = ClueBase & {
  kind: "flight";
  from: string;
  to: string;
  seat: string;
};

export type PhotoClue = ClueBase & {
  kind: "photo";
  photo: { src: string; alt: string };
  /** Percent coordinates of the hidden detail. Placeholder framing for now — no puzzle logic yet. */
  hotspot: { x: number; y: number };
};

export type TwistClue = ClueBase & {
  kind: "twist";
  reveal: string;
  href: string;
  /** Copy for the evidence artifact — the moment the site admits it's out of clues. */
  evidence: {
    /** Tiny mono metadata along the top of the artifact. */
    meta: string;
    /** Rubber stamp across the artifact. */
    stamp: string;
    /** Handwritten note pointing at the handle. */
    annotation: string;
    /** One cheeky line. Exactly one — the joke is the concept, not the voice. */
    micro: string;
    cta: string;
  };
};

export type Clue = FlightClue | PhotoClue | TwistClue;

export const mystery = {
  index: "05",
  label: "THE MYSTERY",
  /**
   * Was "The clues are real. / Three of them." — which announced a system,
   * and said three when there are five (the tracker renders x/05, so anyone
   * counting concluded the site was broken). This points back at the page
   * they've already scrolled instead: a discovery, not a level.
   */
  headline: ["It's hiding", "on this page."],
  body: ["Five clues.", "Three is enough to guess.", "Nobody's making you find them."],
  annotation: "has been the whole time",
  /**
   * The three clue CARDS are per-journey — see content/journeys/. They used
   * to be duplicated here, which left one journey’s destination-specific alt
   * text and hotspot sitting in the shared brand file where nothing rendered
   * it and nothing would have caught it going stale.
   */
} as const;

export const teaser = {
  index: "06",
  label: "THE SELECTION",
  /**
   * Casting already asked "think you're a 10/10?" and already stamped "yes,
   * we're judging." Repeating both made this read as a loop. Casting says who
   * we want; this says it's your turn.
   */
  headline: ["Now the", "hard part."],
  body: ["You don't need to be famous.", "You just need to be someone we'd actually want to travel with."],
  stamp: "20 OF YOU. THAT'S IT.",
  judging: ["Your profile.", "Your answers.", "Your vibe."],
  judgingNote: "in that order? no.",
  badge: "20 spots. No fillers.",
  cta: { label: "MAKE YOUR CASE", href: "#apply" },
} as const;

export const application = {
  index: "07",
  label: "THE APPLICATION",
  headline: ["MAKE", "YOUR CASE."],
  intro: "Think of this less like an application and more like your argument for why you belong in the 20.",
  note: "Under 5 minutes. Be honest — it's more interesting.",
  /** Three steps, so nobody meets the whole form at once. */
  steps: [
    { id: "basics", n: "01", label: "THE BASICS", next: "TO THE QUESTIONS" },
    { id: "questions", n: "02", label: "THE QUESTIONS", next: "ALMOST DONE" },
    { id: "review", n: "03", label: "SUBMIT", next: "SEND IT" },
  ],
  back: "BACK",
  fields: [
    { name: "name", label: "Name", type: "text", placeholder: "First and last", autoComplete: "name", inputMode: "text" },
    { name: "instagram", label: "Instagram", type: "text", placeholder: "@yourhandle", autoComplete: "off", inputMode: "text" },
    { name: "mobile", label: "Mobile number", type: "tel", placeholder: "+__ ___ ___ ____", autoComplete: "tel", inputMode: "tel" },
    { name: "age", label: "Age", type: "number", placeholder: "21", autoComplete: "off", inputMode: "numeric" },
    { name: "city", label: "City", type: "text", placeholder: "Where you're based", autoComplete: "address-level2", inputMode: "text" },
  ],
  questions: [
    {
      name: "answer_1",
      n: "01",
      label: "Why do you want to be one of the 20?",
      helper: "Tell us like you're texting a friend.",
    },
    {
      name: "answer_2",
      n: "02",
      label: "What makes you a good travel companion?",
      helper: "No LinkedIn answers please.",
    },
    {
      name: "answer_3",
      n: "03",
      label: "What are you bringing to the plot?",
      helper: "Stories, chaos, energy, good music — whatever it is.",
    },
  ],
  review: {
    lead: "Last look before we file it.",
    note: "you can still go back.",
  },
  submit: "SEND IT",
  submitting: "FILING IT…",
  scarcity: "20 spots. Not one more.",
  disclaimer: "No email required. Instagram and your phone are how we'll reach you.",
  ageNotice: "18–30 only. That part isn't flexible.",
  /**
   * The ending — a casting room, not a thank-you page. Deliberately makes no
   * promises this system can't keep: no guaranteed call, no invented reply
   * window. "if you're making the next round" carries the maybe on purpose.
   */
  success: {
    kicker: "APPLICATION RECEIVED.",
    title: "We've got your case.",
    body: "We'll be in touch if you're making the next round.",
    note: "keep your phone nearby.",
    aside: "that's the whole thing.",
    cta: { label: "BACK TO THE PLOT", href: "#top" },
  },
  error: "That didn't send. Try again.",
  /** Same handle, same journey — the database already knows them. */
  duplicate: {
    kicker: "PLOT TWIST —",
    title: "You're already on the casting list.",
    body: "One application per handle per journey. Yours is in.",
    note: "nice try though.",
    cta: { label: "BACK TO THE PLOT", href: "#top" },
  },
} as const;

/** Branded dead ends. Never a stack trace, never a vendor error string. */
export const errors = {
  notFound: {
    code: "404",
    title: "WRONG PLOT.",
    body: "That page isn't part of the story.",
    note: "the plot is this way →",
    cta: { label: "BACK TO THE PLOT", href: "/" },
  },
  crash: {
    code: "PLOT TWIST —",
    title: "SOMETHING WENT SIDEWAYS.",
    body: "Not your fault. Try that again.",
    note: "we’ve been told.",
    retry: "TRY AGAIN",
    cta: { label: "BACK TO THE PLOT", href: "/" },
  },
} as const;

/**
 * THE TRUST STRIP — a small casting-file artifact, not an About Us section.
 *
 * Sits right before the application, because that's the exact moment a
 * visitor is deciding whether to hand over their number. Two short notes:
 * who's actually reading this, and what we genuinely do (nothing invented —
 * no background checks, no claims we can't back). No names, no photos —
 * deliberately anonymous-but-human rather than corporate.
 */
export const trust = {
  eyebrow: "BEFORE YOU APPLY",
  who: {
    title: "WHO'S ACTUALLY READING THIS",
    body: "A small team, not a bot. Every application gets read by a real person — that's also why it isn't instant.",
  },
  safety: {
    title: "THE BORING STUFF WE TAKE SERIOUSLY",
    points: [
      "A real human reads every application.",
      "Shortlisted? You get an actual conversation before anything is final.",
      "You'll have a direct contact for the whole trip, not just before it.",
      "Trip details are shared clearly before anyone travels.",
    ],
  },
} as const;

/**
 * THE DAMAGE — the price slot.
 *
 * `revealed: false` until a real number exists. A placeholder like "FROM
 * ₹XX,XXX" shown to a live visitor reads as broken, not mysterious, so the
 * component this feeds renders nothing while this stays false. Flip it and
 * fill in `amount` once pricing is final — nothing else needs to change.
 */
export const pricing = {
  revealed: false,
  eyebrow: "THE DAMAGE",
  amount: "",
  note: "",
} as const;

/**
 * THE TEA CUP — the only contact surface on the page.
 *
 * The number lives in an env var rather than here because it is the one part
 * of this file that differs between a local run and production, and nobody
 * should edit content to change where messages land. Digits only, country
 * code included, no "+" and no spaces — the format wa.me expects.
 *
 * Unset, the cup does not render at all. A contact button that opens a broken
 * chat is worse than no contact button.
 */
export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  /** Reads as the visitor's own opening line, not a support ticket. */
  prefill: "Hey Plot Twist 👀 I need the tea...",
  headline: ["NEED", "THE TEA?"],
  sub: ["Talk to the people", "behind the plot →"],
  cta: "WhatsApp",
  aria: "Need the tea? Contact Plot Twist on WhatsApp",
} as const;

export const footer = {
  tagline: brand.tagline,
  instagram: brand.instagram,
  instagramUrl: brand.instagramUrl,
  signature: brand.signature,
  legal: `© ${new Date().getFullYear()} Plot Twist. Destination undisclosed.`,
  /** Draft pages — see the DRAFT banner on each route. Real routes, not dead links. */
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
