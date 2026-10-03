import { TRIP, festival } from "./thailand";

/**
 * LAYER 2 — THE TRAVELLER'S INFORMATION.
 *
 * The week's chapters (thailand.ts `week`, chaos.ts `worlds`) are LAYER 1: they
 * sell the experience and never carry logistics. This file is the other half —
 * what a careful person asks after they have been moved by it: where do I
 * sleep, what is moving me, what do I eat, what is mine to sort out.
 *
 * ─── THE RULE THIS FILE IS HELD TO ──────────────────────────────────────────
 * NOTHING HERE IS INVENTED, AND NOTHING UNDECIDED IS ADVERTISED. Every line is
 * either (a) already confirmed in thailand.ts, (b) stated by the site owner in
 * the 2 October 2026 brief, or (c) generic advice labelled as advice that
 * promises nothing.
 *
 * Details that are not established — hotel names, room sharing, pick-up
 * windows, flight windows, payment and cancellation terms — are LEFT OUT, not
 * shown as "to be confirmed". A page full of "being finalised" reads as an
 * operator who is not ready; a page that simply states what is settled reads as
 * one that is. They are tracked in the project notes instead, and each one
 * belongs back in this file the day it is decided.
 *
 * That is also why there are NO CLOCK TIMES: a competitor's itinerary prints
 * "9:05 AM" and it reads as professionalism only because somebody confirmed it
 * with an airline. Ours are not confirmed.
 */

/* ------------------------------------------------------------------ */
/* at a glance                                                         */
/* ------------------------------------------------------------------ */

/** The overview strip: the whole trip in ten seconds. */
export const atAGlance = {
  label: "THE TRIP, IN TEN SECONDS",
  items: [
    { k: "DATES", v: TRIP.dates.value },
    { k: "LENGTH", v: "7 DAYS · 6 NIGHTS" },
    { k: "ROUTE", v: "PHUKET → KRABI → PHI PHI → PHUKET" },
    { k: "WHERE YOU SLEEP", v: "3 NIGHTS KRABI · 3 NIGHTS PHUKET" },
    { k: "STAYS", v: "PREMIUM HOTELS" },
    { k: "BREAKFAST", v: "INCLUDED EVERY DAY" },
    { k: "MOVING", v: "PREMIUM GROUP TRANSFERS" },
    { k: "FESTIVAL", v: `EDC · ${festival.dates.toUpperCase()} · GA TICKET INCLUDED` },
    { k: "THE CREW", v: "16* + A PLOT TWIST TRIP LEADER" },
  ],
  caveat: "*The final group size can vary and is not guaranteed.",
} as const;

/* ------------------------------------------------------------------ */
/* the day log                                                         */
/* ------------------------------------------------------------------ */

export type DayLogEntry = {
  n: string;
  date: string;
  name: string;
  /** where the group sleeps */
  stay: string;
  /** what moves the group, in plain words */
  moves: string;
  morning: string;
  afternoon: string;
  evening: string;
  /** meals, only as far as they are actually established */
  meals?: string;
  /** "INCLUDED TODAY" — every item traces to the confirmed inclusions */
  included: readonly string[];
  /** "NOT INCLUDED TODAY" — only where a reader would otherwise assume it is */
  notIncluded?: string;
  /** a single operational note */
  note?: string;
};

export const dayLog = {
  label: "THE WEEK, PRACTICALLY",
  headline: ["THE SAME SEVEN DAYS.", "THE SENSIBLE VERSION."],
  sub: "The film above is how it feels. This is how it works: where you sleep, what is moving you, and what is yours to sort out.",
  annotation: "no clock times. flights are yours.",
  /** Printed under the log. The reason the times are not here. */
  timesNote:
    "No clock times are printed because flights are your own, so everyone lands and leaves at a different hour.",
  days: [
    {
      n: "01",
      date: "TUE 15 DEC",
      name: "Arrived",
      stay: "Krabi",
      moves: "Premium group transfer, Phuket → Krabi",
      morning: "You land in Phuket. Flights are your own.",
      afternoon: "Premium group transfer to Krabi, check in to the hotel, freshen up.",
      evening: "Railay and Ao Nang, sunset, then the welcome night: drinks, music, dinner and the first group experience.",
      included: ["Premium group transfer, Phuket → Krabi", "Hotel in Krabi", "The welcome night with the crew", "Your trip leader"],
      notIncluded: "Flights",
    },
    {
      n: "02",
      date: "WED 16 DEC",
      name: "The Water",
      stay: "Krabi",
      moves: "By boat to the islands, then back to Krabi",
      morning: "Breakfast, then out onto the Andaman.",
      afternoon: "Phi Phi, the hidden bays and Maya Bay. Swimming, snorkelling and island hopping, with music on the boat.",
      evening: "Back in Krabi around sunset, then Ao Nang at an easy pace.",
      meals: "Breakfast",
      included: ["Breakfast", "Phi Phi and Maya Bay by boat", "Island hopping and water experiences", "Hotel in Krabi"],
    },
    {
      n: "03",
      date: "THU 17 DEC",
      name: "The Plot Thickens",
      stay: "Krabi",
      moves: "Premium group transfers for the day's plans",
      morning: "Breakfast, then Krabi: Emerald Pool and the jungle, or beaches and viewpoints.",
      afternoon: "Ao Nang, Railay, the pool, or nothing. There is breathing room here on purpose.",
      evening: "One last Krabi sunset before the energy of the week changes.",
      meals: "Breakfast",
      included: ["Breakfast", "Krabi experiences", "Planned group experiences", "Hotel in Krabi"],
    },
    {
      n: "04",
      date: "FRI 18 DEC",
      name: "Electric Sky · EDC Night 01",
      stay: "Phuket",
      moves: "Premium group transfer, Krabi → Phuket, then group transfer to EDC",
      morning: "Packed, checked out, and transferred back to Phuket.",
      afternoon: "Check in, shower, pool, eat, rest. Then get ready.",
      evening: `Gates at ${festival.ground}. EDC night 01.`,
      meals: "Breakfast",
      included: ["Breakfast", "Premium group transfer, Krabi → Phuket", "EDC 3-day GA ticket", "Group transfers to and from EDC", "Hotel in Phuket"],
      notIncluded: "Flights (if you're flying in or out today)",
      note: "The festival is the organiser's event. Entry, bag rules and timings are theirs.",
    },
    {
      n: "05",
      date: "SAT 19 DEC",
      name: "Daylight / Nightlight · Night 02",
      stay: "Phuket",
      moves: "Premium group transfers for the Phuket day, then group transfer to EDC",
      morning: "Slow morning, breakfast, then Phuket properly: Kata Beach and Big Buddha.",
      afternoon: "Karon Viewpoint and Old Phuket Town, then back for the pool, the shower, the outfit and the pre-game.",
      evening: "EDC night 02.",
      meals: "Breakfast",
      included: ["Breakfast", "Curated Phuket exploration", "Group transfers to and from EDC", "Hotel in Phuket"],
      notIncluded: "Flights (if you're flying in or out today)",
    },
    {
      n: "06",
      date: "SUN 20 DEC",
      name: "One Last Dance · Night 03",
      stay: "Phuket",
      moves: "Premium group transfers for the adventure, then group transfer to EDC",
      morning: "Breakfast, then one more proper adventure: ATV, the water, the viewpoints.",
      afternoon: "Promthep Cape and Nai Harn Beach for a final sunset with the crew. Back to the hotel to get ready.",
      evening: "EDC night 03. The last night of the festival and of the trip.",
      meals: "Breakfast",
      included: ["Breakfast", "A Phuket adventure experience", "Group transfers to and from EDC", "Hotel in Phuket"],
      notIncluded: "Flights (if you're flying in or out today)",
    },
    {
      n: "07",
      date: "MON 21 DEC",
      name: "To Be Continued",
      stay: "Checkout",
      moves: "Premium airport transfer",
      morning: "No alarms. Breakfast, coffee, one last poolside hour, one last round of photos.",
      afternoon: "Checkout, then the transfer to the airport.",
      evening: "You fly home on your own booking. The group chat carries on.",
      meals: "Breakfast",
      included: ["Breakfast", "Premium airport transfer"],
      notIncluded: "Flights home",
      note: "Book your flight home with the morning after a festival in mind.",
    },
  ] satisfies DayLogEntry[],
} as const;

/* ------------------------------------------------------------------ */
/* the festival nights                                                 */
/* ------------------------------------------------------------------ */

/**
 * WHAT A WELL-RUN EDC GROUP TRIP SAYS THAT A NORMAL THAILAND TRIP DOES NOT.
 *
 * Three columns, and the split is the point: what the TRIP does, what the
 * ORGANISER decides, and our plain ADVICE. A visitor who cannot tell which of
 * the three they are reading will blame us for the organiser's bag policy.
 *
 * `advice` is advice. It is labelled that way in the component and it carries
 * no promise, which is the only reason it is allowed to be specific.
 */
export const festivalGuide = {
  label: "ON THE FESTIVAL NIGHTS",
  headline: ["THREE NIGHTS.", "NOBODY LEFT BEHIND."],
  sub: "The part of this trip that is not like a normal Thailand holiday, said plainly.",
  trip: {
    k: "WHAT THE TRIP DOES",
    items: [
      "Moves the group to and from EDC on all three nights",
      "Keeps a Plot Twist trip leader with you all week",
      "Gives every festival day an easy daytime, so you arrive rested",
      "Leaves the morning after every night unscheduled until breakfast",
    ],
  },
  organiser: {
    k: "WHAT EDC DECIDES",
    items: [
      "Entry with your 3-day GA ticket (included in the trip)",
      "Gate times, entry and re-entry",
      "What you can and cannot bring in",
      "The lineup, the stages and the schedule",
    ],
    note: "Follow the organiser's published rules. They are theirs, and they change.",
  },
  advice: {
    k: "OUR ADVICE",
    items: [
      "Eat properly before you go in",
      "Wear shoes you can dance in for hours",
      "Bring a power bank, and keep your phone on low-power mode",
      "Drink water between everything else",
      "Pick one place to meet if you lose each other, and tell the group where it is",
      "Plan the morning after as a slow one",
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* before you book                                                     */
/* ------------------------------------------------------------------ */

/**
 * The practical questions a good operator answers up front and we had not.
 * Each answer states what is true, says plainly what is not ours to decide,
 * and promises nothing. Appended to the existing straight-answers list.
 */
export const practicalFaq = [
  {
    q: "Are flights included, and when should I land?",
    a: "No. Flights to and from Thailand are your own. Day 01, 15 December, starts in Phuket and day 07, 21 December, ends with the transfer to the airport, so plan to land on the 15th and leave on the 21st.",
  },
  {
    q: "Who looks after the group?",
    a: "A dedicated Plot Twist trip leader is on the trip with you for the whole week, not holding a flag outside it.",
  },
  {
    q: "Where do we sleep?",
    a: "Premium hotels. Krabi for the first three nights, 15, 16 and 17 December, and Phuket for the last three, 18, 19 and 20 December.",
  },
  {
    q: "Which meals are included?",
    a: "Breakfast every day. Meals outside the planned experiences are not included.",
  },
  {
    q: "How do we get to and from EDC?",
    a: "The trip moves the group to and from the festival on all three nights. Your EDC Thailand 3-day GA ticket is included in the package.",
  },
  {
    q: "How do I pay, and what if I cancel?",
    a: "Early bird ₹74,999 until 15 October (EDC ticket included), then ₹79,999 to 15 November, then ₹84,999. To confirm your seat: a ₹15,000 booking amount plus ₹30,000 towards your EDC ticket. The balance is due by 2 December 2026. If you cancel 30 or more days before departure a 30% fee is deducted, 16 to 29 days before it is 75%, and 15 days or fewer is non-refundable.",
  },
  {
    q: "Do I need a visa?",
    a: "Entry rules depend on your passport and they change, so we do not state them here. Check the official Thai immigration or e-visa site for your passport before booking anything. Visa and travel insurance are not included; we strongly suggest you take insurance.",
  },
  {
    q: "What about money, plugs and a SIM?",
    a: "Thailand uses the Thai baht (THB). Power is 220V, and most sockets take Type A, B, C or O plugs, so a universal adapter is the sensible thing to carry. Phones and SIMs are your own to sort out.",
  },
  {
    q: "What should I pack?",
    a: "Light summer clothes, swimwear, sunscreen, sunglasses, comfortable shoes, mosquito repellent, a power bank, a universal adapter, and your festival outfit plus a spare. Pack for the water as much as for the dance floor.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* payment and cancellation                                            */
/* ------------------------------------------------------------------ */

/**
 * HOW YOU PAY, AND WHAT CHANGING YOUR MIND COSTS.
 *
 * ─── WHERE THESE TERMS CAME FROM ────────────────────────────────────────────
 * Booking amount, balance date and the festival-pass handling: stated by the
 * site owner, 2 October 2026. The cancellation LADDER is copied from a
 * competitor's published terms (Boketto, Vietnam, July) at the owner's
 * direction: 30 or more days before departure → 30% fee deducted; 16 to 29 days
 * → 75%; 15 days or fewer → non-refundable. The competitor states it in days
 * before departure, so the dates below are that rule counted back from the
 * 15 December departure (30 days = 15 November, 16 days = 29 November,
 * 15 days = 30 November).
 *
 * Each fee is a percentage OF WHAT HAS BEEN PAID, which is how the source
 * states it ("fee deducted"). The booking amount is 30% of the trip price, so
 * cancelling in the first window forfeits the booking amount and nothing else.
 *
 * ─── TWO THINGS THE OWNER SHOULD LOOK AT, AND THEY ARE NOT HIDDEN ───────────
 * 1. THE BALANCE IS DUE (2 DEC) AFTER THE REFUNDS HAVE ENDED (30 NOV). That is
 *    a legitimate structure, but it means nobody can pay the balance and still
 *    cancel for a refund. Said plainly in `note` rather than left to be
 *    discovered.
 * 2. THE EDC PASS HAS ITS OWN REFUND TERMS. If a traveller asks us to help book it
 *    it is the organiser's ticket, so any refund follows the organiser's rules,
 *    not this ladder. `passNote` says so. If the organiser's actual policy is
 *    different, that sentence must change.
 */
export const payments = {
  label: "PAYING, AND CHANGING YOUR MIND",
  headline: ["HOW YOU PAY.", "AND IF PLANS CHANGE."],
  sub: "Same trip at every price — the price moves with the date you book. Plain terms, in the order they happen.",
  steps: [
    {
      k: "THE PRICE · EARLY BIRD",
      v: "₹74,999",
      note: "Book by 15 October — EDC Thailand 3-day GA ticket included. ₹79,999 from 16 Oct – 15 Nov; ₹84,999 from 16 Nov. Flights additional.",
    },
    {
      k: "TO CONFIRM YOUR SEAT",
      v: "₹15,000",
      note: "The booking amount. It holds your spot on the trip.",
    },
    {
      k: "WITH IT · THE EDC TICKET",
      v: "₹30,000",
      note: "Paid with the booking amount, towards your EDC Thailand 3-day GA ticket.",
    },
    {
      k: "THE REST",
      v: "BY 2 DECEMBER",
      note: "The balance of the trip is due by 2 December 2026.",
    },
  ],
  passNote:
    "The trip doesn't change. The price does. The EDC 3-day GA ticket is included at every price; flights are additional.",
  cancelLabel: "IF YOU CANCEL",
  cancellations: [
    { when: "30 or more days before departure", cutoff: "On or before 15 November", fee: "30% fee deducted", tone: "soft" },
    { when: "16 to 29 days before departure", cutoff: "16 to 29 November", fee: "75% fee deducted", tone: "firm" },
    { when: "15 days or fewer before departure", cutoff: "From 30 November", fee: "Non-refundable", tone: "hard" },
  ],
  feeNote: "Fees are taken from the amount you have paid at the time.",
  note: "The balance is due on 2 December, after the refund window has closed, so paying it means you are going.",
} as const;

/** The closing question line, in the voice the rest of the page uses. */
export const questions = {
  lead: "Still have a question?",
  line: "Message us on WhatsApp",
  /** Digits only, country code included — the format wa.me expects. */
  whatsapp: "917065555549",
  whatsappDisplay: "+91 70655 55549",
  prefill: "Hey Plot Twist 👀 I have a question about the EDC Thailand trip",
  instagramLine: "or on Instagram",
} as const;

/** The booking link every "Get into the plot" CTA uses. */
export const bookLink =
  "https://wa.me/917065555549?text=" +
  encodeURIComponent("Hi Plot Twist, I'm interested in Thailand × EDC and the ₹74,999 Early Bird.");
