# Journey 4 — Sri Lanka: the footage

Every clip is a silent H.264 (High profile) MP4 loop (7–18s), 1920×1080 or
1080×1920, cross-faded end-into-start so the seam doesn't jump, with a
`-poster.jpg` beside it. Encoded with Intel Quick Sync (`h264_qsv`, preset
veryslow, ~3.5–6 Mbps, lanczos scaling) via the ffmpeg bundled with CapCut. No
WebM: that ffmpeg has no VP9 encoder. Trimming, cropping, re-encoding and the
montages are the only edits.

The first encode used Windows' Media Foundation H.264 at ~1 Mbps / 720p and
was visibly blocky; don't go back to it. Three Commons sources are low-res at
source (`tuktuk` 960×720, `train` 1080×810, `landing` a soft phone clip) —
re-encoding can't add detail they don't have; real trip footage fixes them.

## Licences, checked one by one

- **Wikimedia Commons** clips are CC BY-SA 3.0/4.0 or CC0 and must stay credited.
- **Mixkit** publishes two licences per clip. Its *Restricted* licence is
  personal use only — and **every clip on Mixkit's own Sri Lanka page is
  Restricted**, so none of them is used. Every Mixkit clip below was checked
  for `copyrightNotice: "Free"` on its page (Mixkit Free licence: commercial
  use, no attribution required — given anyway).
- `hero.mp4` and `hero-mobile.mp4` are montages that include
  CC BY-SA material (the Pattipola train, the Colombo landing, the tuk-tuk
  street). As ShareAlike derivatives they are themselves offered under
  **CC BY-SA 4.0**.

Shown as Sri Lanka: only the Commons clips marked 🇱🇰. Everything else is a
*moment*, not the map, and is never captioned or alt-texted as Sri Lanka.

| file | source | author | licence |
| --- | --- | --- | --- |
| `train.mp4` 🇱🇰 | [Pattipola train](https://commons.wikimedia.org/wiki/File:Pattipola_train.webm) | Cherubino | CC BY-SA 3.0 |
| `landing.mp4` 🇱🇰 | [Landing in Colombo](https://commons.wikimedia.org/wiki/File:Landing_in_Colombo.webm) | Yosef Ben Melamed | CC BY-SA 4.0 |
| `tuktuk.mp4` 🇱🇰 | [Tuk-tuks in Sri Lanka](https://commons.wikimedia.org/wiki/File:Tuk-tuks_in_Sri_Lanka.webm) | Cherubino | CC BY-SA 3.0 |
| `ocean.mp4` | [Aerial Shot Of Sea With Speedboat](https://commons.wikimedia.org/wiki/File:Aerial_Shot_Of_Sea_With_Speedboat.webm) | bellergy | CC0 |
| `jungle.mp4` | [Fly over a huge canyon covered in vegetation](https://mixkit.co/free-stock-video/fly-over-a-huge-canyon-covered-in-vegetation-41401/) | Mixkit | Mixkit Free |
| `road.mp4` | [Going down a curved highway through a mountain range](https://mixkit.co/free-stock-video/going-down-a-curved-highway-through-a-mountain-range-41576/) | Mixkit | Mixkit Free |
| `palm-sunset.mp4` | [Bright orange sunset on beach](https://mixkit.co/free-stock-video/bright-orange-sunset-on-beach-2168/) | Mixkit | Mixkit Free |
| `fireworks.mp4` | [People seeing fireworks in the beach](https://mixkit.co/free-stock-video/people-seeing-fireworks-in-the-beach-4155/) | Mixkit | Mixkit Free |
| `fireworks-gold.mp4` | [Fireworks in the beach](https://mixkit.co/free-stock-video/fireworks-in-the-beach-4156/) | Mixkit | Mixkit Free |
| `morning.mp4` | [Palm tree on a sunny day](https://mixkit.co/free-stock-video/palm-tree-on-a-sunny-day-4645/) | Mixkit | Mixkit Free |
| `gold-shore.mp4` | [Sunset from a peaceful beach](https://mixkit.co/free-stock-video/sunset-from-a-peaceful-beach-44496/) | Mixkit | Mixkit Free |
| `ocean-tall.mp4` | [Aerial view of turquoise waves crashing on the beach](https://mixkit.co/free-stock-video/aerial-view-of-the-beautiful-turquoise-waves-crashing-on-the-51500/) | Mixkit | Mixkit Free |
| `surfer-dusk.mp4` | [Surfer walking toward the ocean at sunset](https://mixkit.co/free-stock-video/surfer-walking-toward-the-ocean-at-sunset-1002/) | Mixkit | Mixkit Free |
| `boat-sunset.mp4` | [The sunset near the seashore](https://mixkit.co/free-stock-video/the-sunset-near-the-seashore-3100/) | Mixkit | Mixkit Free |
| `hero.mp4` (montage) | the clips above, plus [Flying low over the sea](https://mixkit.co/free-stock-video/flying-low-over-the-sea-of-a-beach-44392/) and [Sea waves in a little bay](https://mixkit.co/free-stock-video/sea-waves-in-a-little-bay-1954/) | — | CC BY-SA 4.0 |
| `hero-mobile.mp4` (montage) | the clips above, plus [Person with surfboard walks towards waves](https://mixkit.co/free-stock-video/person-with-surfboard-walks-towards-waves-1044/) and [Palm tree in front of the sun](https://mixkit.co/free-stock-video/palm-tree-in-front-of-the-sun-1191/) | — | CC BY-SA 4.0 |

## Replacing a clip

Same slot, same file name: drop the new `name.mp4` + `name-poster.jpg` in
here and nothing else changes. The shot list for real footage is in
`docs/sri-lanka-design.md` §6.
