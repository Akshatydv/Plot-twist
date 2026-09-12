/**
 * GUIDE — "Festival trips for solo travellers".
 *
 * ─── WHY THIS PAGE AND NOT ANOTHER EDC PAGE ─────────────────────────────────
 * The EDC guide is timely and dies in December. This one does not mention a
 * date, a festival or a country, which is the entire point: it is the page
 * that still earns traffic for Journey 03 and Journey 04, and the one that
 * can accumulate links for a year instead of a quarter.
 *
 * It also sits one level up the funnel. Somebody searching "going to EDC
 * Thailand alone" has already picked a festival. Somebody searching for group
 * trips for solo travellers has not picked anything, which is a better moment
 * to meet them and a much less contested one.
 *
 * ─── THE SAME RULES ─────────────────────────────────────────────────────────
 * Useful first, nothing invented, no numbers that cannot be sourced. There are
 * deliberately NO statistics on this page: "78% of Gen Z travel solo" is the
 * kind of line that makes a page feel authoritative and is almost never
 * traceable to anything real. The argument stands without one.
 */
export const soloFestivalGuide = {
  slug: "festival-trips-for-solo-travellers",

  seo: {
    title: "Festival Trips for Solo Travellers: How Group Trips Work | Plot Twist",
    description:
      "Want to do a festival abroad but nobody to go with? How group trips for solo travellers actually work, where they go wrong, and what to ask before you book one.",
  },

  /** Dates for the Article schema. `modified` is the one that matters: these
   *  pages have a shelf life, and this is the honest signal of whether anyone
   *  has looked at it since. Bump it when you edit the copy. */
  published: "2026-09-12",
  modified: "2026-09-12",

  kicker: "FOR PEOPLE WITH NOBODY TO GO WITH",
  headline: ["NOBODY TO GO WITH", "IS NOT A REASON TO NOT GO."],
  lede: "The hardest part of a festival abroad is rarely the money or the leave. It is that the people you would want there have jobs, partners, exams and a different idea of a good time.",

  sections: [
    {
      h: "The coordination problem",
      p: [
        "A festival trip needs four people to agree on a destination, a week off, a budget and a lineup. Every one of those is a veto. Most trips die at the second one, usually in a group chat, usually in March.",
        "So the trip does not happen, or one person goes alone. Both are worse than the third option most people never seriously consider: go with people you have not met yet.",
      ],
    },
    {
      h: "What a group trip is actually solving",
      p: [
        "Not loneliness at the festival — you will be fine inside the gates. It solves the other twenty hours: the day after, the meals, the 3am taxi, the person who notices you are not back yet.",
        "It also solves the thing nobody says out loud, which is permission. A lot of people do not go because going alone feels like it needs explaining. Going with a group does not.",
      ],
    },
    {
      h: "Where group trips go wrong",
      list: [
        {
          k: "It is a tour with a playlist",
          v: "A fixed itinerary, a guide with a raised arm, and a schedule that leaves no room for the night that turns into the story. If every hour is planned, none of it is yours.",
        },
        {
          k: "Anyone can buy in",
          v: "The single biggest determinant of whether a group trip is good is who else is on it. If the only filter is a working card, the group is random, and random is a coin flip you are paying for.",
        },
        {
          k: "It is too big",
          v: "Past roughly twenty, a group stops being a group and becomes a logistics problem with cliques. You will spend the week with four of them and queue behind the rest.",
        },
        {
          k: "The hosts are staff",
          v: "There is a real difference between someone running the trip from inside it and someone managing it from outside. You can feel it by day two.",
        },
      ],
    },
    {
      h: "What to ask before you book one",
      list: [
        {
          k: "How do you decide who comes?",
          v: "If the answer is \"first come first served\", you now know what the group will be. If a person reads something you wrote, you know somebody is thinking about the mix.",
        },
        {
          k: "How many people, exactly?",
          v: "A number, not \"a small group\". Small means different things to a company filling a coach.",
        },
        {
          k: "What is not scheduled?",
          v: "Ask what the free time looks like. A trip with none is a tour; a trip that is all free time is a hotel booking with extra steps.",
        },
        {
          k: "Who is hosting, and are they coming?",
          v: "Ask whether the people organising it are actually on the trip.",
        },
        {
          k: "What happens if I do not click with anyone?",
          v: "A straight answer to this tells you more than the itinerary does. Anyone who says it never happens is selling.",
        },
      ],
    },
    {
      h: "The honest catch",
      p: [
        "Going with strangers is a bet. You are trading the certainty of your own company for the possibility of a much better week, and it does not always land. Anyone telling you otherwise has something to sell.",
        "What you can control is the odds, and the odds are set entirely by how the group was picked. That is the only thing worth comparing.",
      ],
    },
  ],

  cta: {
    kicker: "HOW WE DO IT",
    headline: "Twenty people. Picked one at a time.",
    body: "Plot Twist runs trips for twenty people aged 18 to 30 who mostly did not know each other before. A real person reads every application, which is why it is not instant, and why the group is not whoever paid first. Hosts come along; they are in the crowd, not holding a flag outside it.",
    action: "See the current trip",
  },
} as const;
