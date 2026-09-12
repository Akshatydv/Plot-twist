import { festival } from "@/content/thailand";

/**
 * GUIDE — "Going to EDC Thailand alone".
 *
 * ─── WHY THIS PAGE EXISTS AND WHAT IT IS NOT ────────────────────────────────
 * The commercial terms around this festival are already taken. "EDC Thailand
 * packages from India" is served by established travel businesses with real
 * domain authority, and the official site owns everything with "tickets" in
 * it. Competing there from an unindexed domain in three months is not a plan.
 *
 * What none of them can credibly own is the question underneath: is it fine to
 * go on your own? That is a real thing people type at 1am, it is low
 * competition because nobody selling a package wants to answer it honestly,
 * and it happens to be the exact question Plot Twist exists to answer.
 *
 * So this is written to be USEFUL FIRST. It answers the question for somebody
 * who will never book anything with us, because a page that only works if you
 * convert is a page nobody links to and Google can tell. The pitch is one
 * block at the end and it does not pretend to be the only answer.
 *
 * ─── THE RULES THIS PAGE INHERITS ───────────────────────────────────────────
 *   1. NOTHING INVENTED. The only hard festival facts here are the dates and
 *      the venue, both pulled from `festival` so there is one source for them.
 *      No claims about crowd sizes, ticket prices, visa rules or travel times —
 *      those change, and a stale "fact" is worse than no fact.
 *   2. NO IMPLIED AFFILIATION. Plot Twist is not a partner, sponsor, reseller
 *      or agent of the festival, and `disclaimer` below says so in plain words
 *      on the page itself. Do not remove it.
 *   3. THE TRIP IS STILL A TEASER. Nothing here promises a price, an itinerary
 *      or a seat, because none of those are announced.
 */
export const edcAloneGuide = {
  slug: "going-to-edc-thailand-alone",

  seo: {
    title: "Going to EDC Thailand Alone: Is It Worth It? | Plot Twist",
    description:
      "Thinking of doing EDC Thailand solo? The honest version — what going alone is actually like, where it gets awkward, and the three ways people usually solve it.",
  },

  /** Dates for the Article schema. `modified` is the one that matters: these
   *  pages have a shelf life, and this is the honest signal of whether anyone
   *  has looked at it since. Bump it when you edit the copy. */
  published: "2026-09-12",
  modified: "2026-09-12",

  kicker: `${festival.dates} · ${festival.ground}`,
  headline: ["GOING TO EDC THAILAND", "ALONE."],
  lede: "Nobody wants to be the person standing in a field in Phuket wondering whether this was a mistake. Here is the honest version, including the parts a travel package won't tell you.",

  sections: [
    {
      h: "The short answer",
      p: [
        "Yes, and most people who do it are glad they did. Dance festivals are one of the few places where turning up alone is genuinely normal — a crowd facing the same direction for three days does a lot of the social work for you, and nobody is looking at you because everybody is looking at the stage.",
        "That is the short answer. The longer one is that \"alone\" covers two completely different trips, and people tend to discover which one they booked at about hour six.",
      ],
    },
    {
      h: "Alone at the festival is fine. Alone for the other twenty hours is the hard part",
      p: [
        "Inside the gates, solo is easy. You move at your own pace, you never negotiate which stage, you leave when you want to leave. People talk to you in queues, at the water point, waiting out a set nobody rates. Three days is long enough that faces start repeating.",
        `The festival runs ${festival.dates}. A trip to Phuket does not. The part that catches people out is the rest of it — the taxi at 3am, the day after when everyone you met has gone back to their own group, the breakfast where you are the only one at the table, the flight home with nobody to say "that was ridiculous" to.`,
        "That is not an argument against going alone. It is an argument for being honest about which hours you are actually planning for.",
      ],
    },
    {
      h: "What people actually worry about",
      list: [
        {
          k: "Will I meet anyone?",
          v: "Almost certainly, and almost certainly not in a way that survives the trip. Festival friendships are real and mostly temporary. Expect good nights, not a group chat.",
        },
        {
          k: "Is it safe on my own?",
          v: "Standard solo-travel discipline applies and matters more when you are tired: know how you are getting back before you need to, keep your phone charged enough to be useful at 4am, and tell somebody at home your plan. None of that is festival-specific and all of it is easier with people who notice you are missing.",
        },
        {
          k: "What do I do in the daytime?",
          v: "This is the real one. Three festival nights leave a lot of daylight, and Phuket is not a place you want to spend recovering in a room alone. Plan the days as deliberately as the nights.",
        },
        {
          k: "Who holds my stuff?",
          v: "Nobody. Take less than you think, and assume anything you put down stays down.",
        },
      ],
    },
    {
      h: "The three ways people solve it",
      p: [
        "Once you have decided to go, there are basically three options, and they fail in different ways.",
      ],
      list: [
        {
          k: "Go fully solo",
          v: "Maximum freedom, zero friction, and the flattest daytimes. Works best if you have done solo travel before and genuinely like your own company at 11am.",
        },
        {
          k: "Convince a friend",
          v: "The obvious answer and the one that collapses most often — leave, budget and taste in music rarely line up across three people. Plenty of solo trips started as group trips that lost a vote.",
        },
        {
          k: "Go with a group of strangers",
          v: "You get the company without needing anyone in your life to also want this. The catch is that it is only as good as who else is in it, which is entirely down to how the group was put together.",
        },
      ],
    },
    {
      h: "If you go with a group, ask how it was cast",
      p: [
        "This is the question that separates a good group trip from twenty people who happen to have bought the same package. Anything that sells a fixed number of seats to whoever pays first is a coach tour with better music.",
        "Worth asking before you book anything: does a person actually read applications, or does a payment page decide? How big is the group, really? Are the hosts in the crowd with you or holding a flag outside it? Is there room in the schedule for the parts nobody planned?",
      ],
    },
  ],

  /** The pitch. One block, at the end, after the page has already been useful. */
  cta: {
    kicker: "WHAT WE DO ABOUT IT",
    headline: "Twenty strangers, one crew.",
    body: "Plot Twist runs a seven-day trip built around this festival — sixteenth to the twenty-second of December, twenty people aged 18 to 30, picked one at a time by a person who reads every application. It is not a tour and the festival is one chapter of four. Nothing is open for booking yet; the list just hears first.",
    action: "See the trip",
  },

  /** MANDATORY. Do not remove — see rule 2 in the note at the top. */
  disclaimer:
    "Plot Twist is an independent travel company. We are not a partner, sponsor, organiser, reseller or agent of EDC, EDC Thailand or Insomniac Events, and this page is not affiliated with or endorsed by them. Festival dates and venue are the organiser's own published details and are subject to their changes.",
} as const;
