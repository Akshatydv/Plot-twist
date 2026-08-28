/**
 * PLOT TWIST — single source of truth for all copy.
 * Edit here, not in components. Journey-scoped so Journey 02 can be added later.
 */

export const brand = {
  name: "PLOT TWIST",
  instagram: "@plottwist.social",
  instagramUrl: "https://instagram.com/plottwist.social",
  tagline: "20 people. One trip. 10/10s only.",
  signature: "DO IT FOR THE PLOT.",
  metaNav: ["TRAVEL", "PEOPLE", "PLOT TWISTS"],
} as const;

export const hero = {
  eyebrow: "JOURNEY 01 — LOCATION CLASSIFIED",
  line1: "You've found",
  line2: "the plot.",
  sub: "But do you know where it's going?",
  support: brand.tagline,
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
  big: ["20 PEOPLE.", "ONE TRIP.", "10/10s ONLY."],
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
  cta: { label: "FIND THE CLUES", href: "#clues" },
} as const;

export type Trait = {
  id: string;
  name: string;
  /** The answer, always on the card. */
  line: string;
  /** The casting director's margin note — appears by the grade when picked. */
  verdict: string;
  accent: string;
};

/**
 * The casting board. A handwritten 10/10 gets marked up as the visitor picks
 * traits — a grade being awarded, not a score being earned. Traits toggle
 * back off, so it stays a plaything rather than a quiz.
 */
export const casting = {
  index: "02",
  label: "THE CASTING",
  stamp: "CASTING — JOURNEY 01",
  eyebrow: "WHAT'S A",
  headline: "10/10?",
  subhead: "NOT A CROWD. A CAST.",
  intro: "We're looking for the whole package.",
  annotation: "yes, we're judging.",
  hint: "tap a trait — watch it add up",
  traits: [
    { id: "face", name: "FACE CARD", line: "Obviously.", verdict: "we noticed.", accent: "#FF7A3D" },
    { id: "charm", name: "CHARM", line: "You know it when you see it.", verdict: "okay, we like this.", accent: "#FF4F87" },
    { id: "energy", name: "ENERGY", line: "Good only.", verdict: "non-negotiable.", accent: "#00A9C7" },
    { id: "personality", name: "PERSONALITY", line: "Please have one.", verdict: "thank god.", accent: "#36C96F" },
    { id: "stories", name: "STORIES", line: "We want some.", verdict: "tell us at dinner.", accent: "#FF7A3D" },
    { id: "baddies", name: "BADDIES", line: "You know who you are.", verdict: "iconic behaviour.", accent: "#FF4F87" },
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
  cta: { label: "MAKE YOUR CASE", href: "#apply" },
} as const;

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
  index: "03",
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
  index: "04",
  label: "THE PHILOSOPHY",
  big: ["THE TRIP IS PLANNED.", "THE REST IS NOT."],
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
};

export type Clue = FlightClue | PhotoClue | TwistClue;

export const mystery = {
  index: "05",
  label: "THE MYSTERY",
  headline: ["The clues", "are real."],
  body: ["Three of them.", "One destination.", "Good luck."],
  annotation: "yes, actually real",
  clues: [
    {
      id: "clue-01",
      index: "01",
      eyebrow: "DEPARTURE",
      title: "THE FLIGHT",
      kind: "flight",
      line: "You're going to need a passport.",
      hint: "Somewhere warm. Worth flying for.",
      from: "YOU",
      to: "??? ???",
      seat: "01 OF 20",
    },
    {
      id: "clue-02",
      index: "02",
      eyebrow: "LOOK CLOSER",
      title: "THE LANDSCAPE",
      kind: "photo",
      line: "Look closer.",
      hint: "Almost everyone scrolls straight past it.",
      photo: {
        src: "/photos/escape.jpg",
        alt: "Turquoise water breaking over a rocky coastline from above",
      },
      hotspot: { x: 64, y: 42 },
    },
    {
      id: "clue-03",
      index: "03",
      eyebrow: "ONE MORE THING",
      title: "THE LAST CLUE",
      kind: "twist",
      line: "This one isn't here.",
      hint: "You'll have to leave the website.",
      reveal: brand.instagram,
      href: brand.instagramUrl,
    },
  ] satisfies Clue[],
} as const;

export const teaser = {
  index: "06",
  label: "THE SELECTION",
  headline: ["Think you're", "a 10/10?"],
  body: ["You don't need to be famous.", "You just need to be someone we'd actually want to travel with."],
  stamp: "YES, WE'RE JUDGING.",
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
  /** The ending — a casting room, not a thank-you page. */
  success: {
    kicker: "YOU'RE IN THE CASTING ROOM.",
    title: "Your case has been submitted.",
    body: "Now we decide whether you're one of the 20.",
    note: "watch your phone.",
    aside: "the next step might be a call.",
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
} as const;
