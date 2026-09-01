# Journey 00 — chapter scene backgrounds

The four full-bleed backgrounds behind the chapter sections on the Goa page.
Separate from `../PHOTOS.md`, which covers the original hero/story set — none
of those files are reused here, deliberately: the chapters are meant to read as
four different worlds, and recycling the story photography would have made them
read as four crops of the same trip.

## Licence

All four are **Unsplash photos under the [Unsplash Licence](https://unsplash.com/license)** —
free for commercial use, no permission and no attribution required.

Tier was verified by host rather than by API record this time: Unsplash+ (the
paid tier) is served from `plus.unsplash.com`, and every file below was fetched
successfully from `images.unsplash.com`, which serves only the free tier. The
Unsplash API itself was not reachable without a key, so the `plus`/`premium`
flags could not be read directly — the host check is the substitute, and it is
the same distinction those flags encode.

Attribution is not required. Photographer credit was not recoverable without
API access; if these survive past placeholder use, look the IDs up and credit
them here.

## The files

| file | unsplash id | what it actually shows | chapter |
| --- | --- | --- | --- |
| `bollywood.jpg` | `1545128485-c400e7702796` | A club interior washed deep red, a crowd in silhouette facing four bright vertical stage lights | CHAPTER 01 — Bollywood After Dark |
| `flamingo.jpg` | `1676407118683-f0060c12b94f` | A white ship's deck curving away, teak floor and rails, open sea and a coral-to-blue sunset beyond | CHAPTER 02 — White Flamingo |
| `lost.jpg` | `1716803715998-5048abe17f2d` | Windshield POV driving a palm-lined coastal road, ocean to the left, hard blue sky | CHAPTER 03 — Lost in Goa |
| `hangover.jpg` | `1662879587704-96705bdfb8a2` | Empty poolside loungers in the foreground, warm hazy light through palms, two distant figures at a table by the water | CHAPTER 04 — The Hangover Club |

## Why these four

Chosen as a SET, not individually. The requirement was four sections that feel
like four different places, so the four were selected to share no palette:

- `bollywood` — deep red / crimson / near-black
- `flamingo` — white / coral / deep blue
- `lost` — hard blue / green / daylight
- `hangover` — warm amber / hazy / teal

Scrolling the four in order therefore changes the colour of the screen four
times, which is most of what makes them read as separate worlds.

Two also do specific narrative work: `lost.jpg` is shot from *inside* the
vehicle, so the viewer is in the car rather than looking at one, and
`hangover.jpg` leads with EMPTY chairs, which is what makes it read as the
morning after rather than as a resort advert.

## What was rejected, and why

Every candidate was downloaded and **looked at** rather than trusted from its
alt text — the same rule as the original set, and it is what caught all three
of these:

- **`1648090317719-a57c907a7284`** (party, two women) — two clearly identifiable
  faces plus a legible third-party wristband reading "GARAGEM". Faces carry
  consent considerations on a page that is a commercial advert, and the
  wristband is exactly the kind of third-party branding the original set
  rejected an "I ♥ GOA" sign for.
- **`1775803157914-9729fe7e0eca`** (luxury yacht) — the boat's own name and
  logo ("Paradise") are readable on the glass, a red GIVENCHY garment is
  legible on deck, and two men are identifiable. It is also a moored working
  boat, not a party.
- **`1672369530200-c4f5650b9a76`** (infinity pool at sunset) — genuinely
  beautiful, and rejected anyway: it is a *sunset*, and `flamingo.jpg` is
  already the page's sunset. Two sunsets two chapters apart would have undercut
  the whole point of giving each chapter its own light.

## Status: placeholder

These are stock photographs standing in for footage of the real trip. They are
mood, not documentation — nothing on the page captions them as Journey 00, and
nothing should. Replace them with real Plot Twist footage after October 2026.

Video backgrounds are wired but unused: drop a muted loop at
`/videos/goa/<chapter>.mp4` and set `video` on that chapter in
`src/content/goa.ts`. The scene upgrades from photo to video with no code
change, and falls back to the photo on reduced-motion.
