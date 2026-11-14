/**
 * THE TRIP WALL — real photos from Plot Twist Goa, October 2026 (guests' own
 * phones + the yacht drone). Shared by the homepage and every journey page,
 * and mirrored in the itinerary PDFs (luxe/wall.json). Real trip, real people:
 * nothing here is stock. Source files: public/photos/trips/goa-oct-26/.
 */
export type TripShot = { src: string; alt: string; caption: string; focal: string; shape: "tall" | "wide" | "square" };

export const tripWall = {
  eyebrow: "THE CAMERA ROLL",
  headline: ["GLIMPSES FROM", "our previous trips."] as const,
  note: "Real trip. Real people. Zero stock photos.",
  shots: [
  {
    src: "/photos/trips/goa-oct-26/beach-crew.jpg",
    alt: "The whole group posing on the beach at dusk",
    caption: "the whole cast, one frame",
    focal: "50% 50%",
    shape: "wide"
  },
  {
    src: "/photos/trips/goa-oct-26/bridge-crew.jpg",
    alt: "The group on the yacht under the bridge",
    caption: "pov: you said yes",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/crew-selfie.jpg",
    alt: "Group selfie on the yacht deck",
    caption: "the whole yacht in one selfie",
    focal: "50% 40%",
    shape: "wide"
  },
  {
    src: "/photos/trips/goa-oct-26/yacht-bridge.jpg",
    alt: "The group on the yacht deck passing under a cable-stayed bridge",
    caption: "under the bridge, over the moon",
    focal: "50% 45%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/linen-crew.jpg",
    alt: "Friends in white linen on the deck",
    caption: "linen everywhere",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/deck-lounge.jpg",
    alt: "Friends lounging across the yacht sun-deck",
    caption: "we sat on everything",
    focal: "50% 50%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/bow-crew.jpg",
    alt: "Friends gathered on the bow of the yacht",
    caption: "strangers at 4, besties by 6",
    focal: "50% 45%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/deck-smiles.jpg",
    alt: "Friends smiling together on the yacht",
    caption: "smiles, mostly sunburn",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/cheers.jpg",
    alt: "Friends cheering together on the yacht",
    caption: "cheers to strangers",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/beach-gang.jpg",
    alt: "A group selfie on the beach at sunset",
    caption: "new friends, old jokes",
    focal: "50% 40%",
    shape: "wide"
  },
  {
    src: "/photos/trips/goa-oct-26/pink-sunset.jpg",
    alt: "A woman in a pink dress at the yacht rail at sunset",
    caption: "main character, golden hour",
    focal: "50% 30%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/white-yacht.jpg",
    alt: "A woman in white on the yacht deck",
    caption: "dress code: all white",
    focal: "50% 35%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/glance.jpg",
    alt: "A woman in pink glancing back at sunset",
    caption: "the look",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/white-dress.jpg",
    alt: "A woman in white dancing on the yacht at golden hour",
    caption: "golden hour, no filter",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/laughing.jpg",
    alt: "A woman in pink laughing at the yacht rail",
    caption: "laughing at nothing",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/pink-rail.jpg",
    alt: "A woman in pink at the yacht rail at sunset",
    caption: "pink at golden hour",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/windswept.jpg",
    alt: "A woman with wind in her hair on the yacht",
    caption: "windswept, on purpose",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/puppy.jpg",
    alt: "Two friends hugging a puppy on the beach at night",
    caption: "we adopted him for an hour",
    focal: "50% 35%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/beach-duo.jpg",
    alt: "Two friends posing on the beach",
    caption: "beach, then sunset",
    focal: "50% 40%",
    shape: "wide"
  },
  {
    src: "/photos/trips/goa-oct-26/kayak-girls.jpg",
    alt: "Two friends in a kayak in the palm lagoon",
    caption: "lagoon club",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/kayak-duo.jpg",
    alt: "Two friends sharing a kayak",
    caption: "two in a kayak",
    focal: "50% 55%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/kayaks.jpg",
    alt: "Friends in yellow kayaks in a palm-fringed lagoon",
    caption: "paddling, mostly",
    focal: "50% 55%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/deck-dance.jpg",
    alt: "Friends dancing on the yacht deck",
    caption: "the deck was the dancefloor",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/drone.jpg",
    alt: "Aerial view of the group on the yacht bow",
    caption: "the drone said slay",
    focal: "50% 40%",
    shape: "square"
  },
  {
    src: "/photos/trips/goa-oct-26/sundowner.jpg",
    alt: "Friends at the yacht rail at sunset",
    caption: "sundowner, literally",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/pool-float.jpg",
    alt: "Floating in the resort pool",
    caption: "do not disturb",
    focal: "50% 50%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/arms-out.jpg",
    alt: "Three friends with arms out on the yacht",
    caption: "king of the world x3",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/hair-up.jpg",
    alt: "A woman on the rocks at sunset, hands in her hair",
    caption: "golden hour, hands up",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/confetti.jpg",
    alt: "Confetti falling over a packed dance floor",
    caption: "confetti o’clock",
    focal: "50% 45%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/white-wharf.jpg",
    alt: "The resort pool lit up at night",
    caption: "home base, after dark",
    focal: "50% 50%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/lagoon.jpg",
    alt: "A woman relaxing in a kayak in a palm lagoon",
    caption: "the lagoon was the vibe",
    focal: "50% 55%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/club-selfie.jpg",
    alt: "A red-lit club selfie with the group",
    caption: "nobody slept",
    focal: "50% 40%",
    shape: "wide"
  },
  {
    src: "/photos/trips/goa-oct-26/bridge-sunset.jpg",
    alt: "The sun setting behind the bridge over the river",
    caption: "the view from the deck",
    focal: "50% 50%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/rocks-glance.jpg",
    alt: "A woman glancing back on the rocks at sunset",
    caption: "sunset on the rocks",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/lagoon-smile.jpg",
    alt: "A woman smiling in a kayak in the lagoon",
    caption: "floating, smiling",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/candles.jpg",
    alt: "Cocktails and a candle on a beach table at dusk",
    caption: "drinks by candlelight",
    focal: "50% 50%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/beach-dusk.jpg",
    alt: "Friends on the beach at dusk",
    caption: "the beach at dusk",
    focal: "50% 40%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/rocks-sunset.jpg",
    alt: "A woman in a striped dress on the rocks at sunset",
    caption: "sun down, hair up",
    focal: "50% 30%",
    shape: "tall"
  },
  {
    src: "/photos/trips/goa-oct-26/deck-selfie.jpg",
    alt: "A selfie on the yacht deck",
    caption: "deck selfie no. 1 of 400",
    focal: "50% 40%",
    shape: "wide"
  },
  {
    src: "/photos/trips/goa-oct-26/dj-night.jpg",
    alt: "A club night under a neon KARAN sign",
    caption: "the DJ knew our names",
    focal: "50% 40%",
    shape: "tall"
  }
] as TripShot[],
} as const;
