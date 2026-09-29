# Journey 03 — Bir × Barot: the footage slots

**Four clips are live** (table at the bottom). None of them is Bir or
Barot — they were chosen for the *moment* on the site owner's instruction,
and none is captioned as the place. Real Bir tandem footage replaces the hero
clip the day it exists; same slot, same two files.

Every clip ships twice: **VP9 WebM** (offered first) and **H.264 MP4**, both
silent 16s-or-shorter loops, cross-faded end-into-start so the seam doesn't
jump. That trim and re-encode is the only edit.

### Licences checked, one by one

Mixkit publishes two licences, and the one that matters is per clip. Its
*Restricted* licence is **personal use only**, and every Mixkit paragliding
clip — plus the best-looking bonfire and Himalaya clips — is Restricted.
None of those is used. The two Mixkit clips below are under its *Free*
licence (commercial use, no attribution required). The flying footage is
CC BY 3.0 from Wikimedia Commons and must stay credited.

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

| file | slot | source | author | licence | source window |
| --- | --- | --- | --- | --- | --- |
| `hero.mp4/.webm` | HERO | [Commons](https://commons.wikimedia.org/wiki/File:Paragliding_in_Blackheath_NSW_Australia_at_high_altitude.webm) | skinduptruk | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | 0:08–0:26 · paraglider over NSW, Australia |
| `above.mp4/.webm` | YOU DIDN'T COME ALL THIS WAY | [Commons](https://commons.wikimedia.org/wiki/File:Paragliding_through_clouds_in_Blackheath_NSW_Australia.webm) | skinduptruk | CC BY 3.0 | 5:48–6:06 · through cloud, NSW |
| `bonfire.mp4/.webm` | THE BONFIRE | [Mixkit](https://mixkit.co/free-stock-video/campfire-burning-wood-logs-in-the-dark-22730/) | Mixkit | [Mixkit Free](https://mixkit.co/license/#videoFree) | 0:00.5–0:10 |
| `warm-drink.mp4/.webm` | THE LAST NIGHT | [Mixkit](https://mixkit.co/free-stock-video/people-pouring-a-warm-drink-around-a-campfire-513/) | Mixkit | Mixkit Free | 0:04–0:15.5 |

| `flight-prepare.*` | THE FLIGHT · PREPARE | [Commons](https://commons.wikimedia.org/wiki/File:Paragliding_-_Parapendio_-_Vipavska_dolina,_Slovenia.webm) | Slovely.eu | CC BY 3.0 | 0:24–0:29 · wings laid out on the launch; cropped to remove the channel logo |
| `flight-takeoff.*` | THE FLIGHT · TAKE OFF | same source | Slovely.eu | CC BY 3.0 | 0:28–0:42 · a wing inflating and lifting off; same crop |
| `flight-fly.*` | THE FLIGHT · FLY | [Commons](https://commons.wikimedia.org/wiki/File:Fly_Golte,_fly_Slovenia_-_paragliding_tandem_Slovenia_9.webm) | Nejc Sedovnik | CC BY 3.0 | 0:12–0:28 · under the canopy over the Alps |
| `flight-land.*` | THE FLIGHT · LAND | [Commons](https://commons.wikimedia.org/wiki/File:Paragliding_Slovenija_-_Vrem%C5%A1%C4%8Dica.webm) | Aleš Kalin | CC BY 3.0 | 6:28–6:42 · approach and touchdown; cropped to remove the burned-in date stamp |

The flight's other two stages are stills: a launch edge (Flickr, CC BY 2.0)
and Bir from the air (Commons). Posters (`*-poster.jpg`) are single frames
of the same clips.
