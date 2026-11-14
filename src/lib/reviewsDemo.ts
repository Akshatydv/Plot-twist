import type { PublicReview } from "./reviews";

/**
 * SAMPLE REVIEWS — for reviewing the DESIGN only.
 *
 * Returned solely when NODE_ENV === "development" AND REVIEWS_DEMO=1 (see
 * listApprovedReviews). Production can never serve these: the NODE_ENV check is
 * a build-time constant there, and .env.local is never deployed. The pages also
 * print a visible "sample data" banner whenever this is active. The photos are
 * the existing /photos/home trip images; every name and quote below is made up
 * and must never be shown to a real visitor.
 *
 * Deliberately includes a lukewarm review: a wall of nothing but five stars
 * reads as curated, and this site's reviews are not.
 */

export const isReviewsDemo = () => process.env.NODE_ENV === "development" && process.env.REVIEWS_DEMO === "1";

const P = (n: string) => `/photos/home/${n}.jpg`;
const d = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();

export function demoReviews(): PublicReview[] {
  const base = { tripId: "goa-2026", featured: false, verified: false, reply: null } as const;
  return [
    { ...base, id: "d1", verified: true, name: "Sample · Aanya", city: "Delhi", rating: 5, createdAt: d(1), photos: [P("trip-path"), P("trip-bridge")],
      reply: "Nineteen people you’d follow anywhere — that’s the whole idea. Thank you for writing this. (Sample reply.)",
      body: "I came alone and wasn’t sure what I’d signed up for. By the second night on the yacht I had nineteen people I’d have followed anywhere. It never felt like a tour — it felt like a story we were all writing." },
    { ...base, id: "d2", verified: true, name: "Sample · Kabir", city: "Mumbai", rating: 5, createdAt: d(2), photos: [P("trip-fire")],
      body: "Sunsets, a fort, one very long night and not a single awkward silence. The hosts were always one step ahead." },
    { ...base, id: "d3", name: "Sample · Mehr", city: "Bengaluru", rating: 5, createdAt: d(3), photos: [],
      body: "The kind of trip you tell people about for years. I keep thinking about the ride back with the windows down, everyone half asleep and still singing." },
    { ...base, id: "d4", verified: true, name: "Sample · Rohan", city: "Pune", rating: 4, createdAt: d(4), photos: [P("trip-pool"), P("trip-guys"), P("trip-mirror")],
      body: "Big group energy but it never felt crowded. Loved how well it was planned without feeling planned. Would happily go again." },
    { ...base, id: "d5", name: "Sample · Zoya", city: "Hyderabad", rating: 5, createdAt: d(5), photos: [P("trip-girls")],
      body: "Cafés, beaches, strangers turning into the people you text every day. Genuinely the best four days." },
    { ...base, id: "d6", verified: true, name: "Sample · Dev", city: "Gurugram", rating: 3, createdAt: d(6), photos: [],
      reply: "Fair feedback on the transfer timings — we’re tightening that for the next one. Thanks for being straight with us. (Sample reply.)",
      body: "Loved the people and the yacht night. The airport transfers ran late on day one and the first hour was chaotic. Everything after that was great, so I’d still recommend it — just be patient at the start." },
    { ...base, id: "d7", name: "Sample · Ira", city: "Chandigarh", rating: 5, createdAt: d(7), photos: [P("trip-couple")],
      body: "Golden hour on a path in the middle of nowhere, a friendship I didn’t expect, and a camera roll I’m never deleting." },
    { ...base, id: "d8", verified: true, name: "Sample · Neel", city: "Jaipur", rating: 4, createdAt: d(8), photos: [P("trip-waiting")],
      body: "Quiet moments mattered as much as the loud ones. The balance was perfect." },
    { ...base, id: "d9", name: "Sample · Tara", city: "Kolkata", rating: 5, createdAt: d(9), photos: [P("trip-mirror2"), P("trip-path")],
      body: "I was nervous about travelling with people I didn’t know. Within an hour that was gone. This is what travel should feel like — and I’ve already told three friends to sign up for the next one." },
    { ...base, id: "d10", verified: true, name: "Sample · Vikram", city: "Ahmedabad", rating: 4, createdAt: d(10), photos: [],
      body: "Great value for what’s included, and the hosts genuinely looked after everyone. Only wish we had one more day." },
  ];
}
