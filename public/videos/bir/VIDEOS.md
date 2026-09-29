# Journey 03 — Bir × Barot: the footage slots

**No video is live yet.** Twelve licensed *photographs* of Bir and Barot now
fill most slots (see `public/photos/bir/PHOTOS.md`); the rest still run on
the illustrated environments in `src/components/bir/Scenery.tsx`. Every slot
takes a clip the same way it takes a still.

Stock clips of some other mountain range labelled as Bir would be the one
invented fact on an otherwise honest page, so none were used.

## How to go live

1. Put the file here (video) or in `public/photos/bir/` (still).
2. Set the path on the matching slot in `src/content/bir.ts` → `media`:

```ts
hero: {
  video: "/videos/bir/hero.mp4",
  image: "/videos/bir/hero-poster.jpg", // poster + reduced-motion still
  alt: "A tandem paraglider over the green Bir valley, the Dhauladhar behind",
},
```

3. Log provenance and licence in this file, the way
   `public/videos/thailand/VIDEOS.md` does. **Every file needs a line.**

That's it. The illustrated scene stays underneath as colour and depth; the
footage fades in over it once it is actually playing, so a slow network never
shows a black box. Video mounts only near the viewport, pauses off-screen,
and never mounts for `prefers-reduced-motion` (the still shows instead).

## The shot list

| slot | what it must show | length | framing |
| --- | --- | --- | --- |
| `hero` | **Tandem** paragliding over the Bir valley — pilot and passenger both visible, green valley and villages far below, the Dhauladhar behind. Must read as *height* and *Bir*, not a generic Himalayan pan. | 12–20s seamless loop | wide; subject in the upper-right third (the title sits bottom-left) |
| `flight` | The whole flight in one cut: Billing launch → run → lift-off → glide → Bir landing field | 20–30s | wide; horizon in the upper half |
| `river` | The Uhl at Barot — moving water, forested valley walls | 8–12s | wide, slow, no people needed |
| `bonfire` | Fire close-up with sparks lifting, at night | 6–10s | tight; composited into a soft radial mask |
| `trail` | still or clip — forest trail along the river, light through pines | — | wide |
| `goldenHour` | still or clip — the valley at last light | — | wide, sun low |
| `social` | still — a Bir café / street moment with people | — | subject on the right (text sits left) |
| `summit` | still or clip — the trek viewpoint panorama | — | very wide; revealed through a circular mask, centre-bottom matters most |
| `lastNight` | still — the long table, candles, fire | — | wide, 21:9-ish crop |
| `road` | clip — the road back, from a rear window | 10–15s | centred vanishing point |

## Encode

Match what the EDC hero uses: H.264 high, no audio track, `+faststart`,
~1600×900 for landscape clips (add a 720×1280 portrait cut for `hero` if a
phone crop of the landscape loses the glider), CRF 28–32, aim for under 6 MB.

```sh
ffmpeg -i in.mov -an -vf "scale=1600:-2" -c:v libx264 -profile:v high -crf 30 -preset slow -movflags +faststart hero.mp4
ffmpeg -i hero.mp4 -vframes 1 -q:v 3 hero-poster.jpg
```

## Provenance

| file | source | licence | notes |
| --- | --- | --- | --- |
| — | — | — | nothing yet |
