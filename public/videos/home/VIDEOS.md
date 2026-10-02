# The brand homepage — hero video

One clip, two cuts and its poster frame. Wired up as `MEDIA.HERO_VIDEO` in
`src/content/home.ts`.

| file | what | size |
| --- | --- | --- |
| `hero-sea.mp4` | 1920×1080, 30fps, 10.4s seamless loop, no audio | 3.5 MB |
| `hero-sea-mobile.mp4` | 720×1280 portrait crop of the same 10.4s — served below 768px | 2.9 MB |
| `hero-sea-poster.jpg` | frame 0 of `hero-sea.mp4`, mozjpeg q76 | 210 KB |

| field | value |
| --- | --- |
| source | Pexels — https://www.pexels.com/video/sunset-over-the-horizon-3531876/ |
| id | `3531876` |
| creator | Tom Fisk |
| licence | **[Pexels License](https://www.pexels.com/license/)** — commercial use, self-hosting and modification permitted; no attribution required |
| downloaded | 30 September 2026 — the 1080p rendition (49.8s, 34.6 MB), which is NOT in the repo |
| what it shows | a drone gliding over calm water toward a low sun, a breakwater curving through the gold reflection. Sea and sky fill the frame. No people. |

It is stock footage of an unnamed stretch of sea. It is not captioned as any Plot
Twist destination, and must not be.

## How the cut was made

The source is 50 seconds of slow forward flight that starts over a forested
island and ends over open water. Only `36s–49.7s` is used — after the last
of the island has slipped out of frame, so nothing green competes with the
headline.

1. `trim=36:49.7` then `setpts=PTS/1.2` — a gentle 1.2× to 11.4s.
2. The last second is crossfaded into the first (`xfade`), leaving a 10.4s
   file whose final frame flows into its first. The loop has no jump cut.
3. Audio dropped. `libx264 -preset slow -crf 31 -movflags +faststart`.
4. Phones: `crop=608:1080:608:0,scale=720:1280` before the same loop, CRF 28.
   The crop is centred on the sun.

```
LOOP="split=3[a][b][c];[a]trim=1:10.4,setpts=PTS-STARTPTS[body];[b]trim=0:1,setpts=PTS-STARTPTS[head];[c]trim=10.4:11.4,setpts=PTS-STARTPTS[tail];[tail][head]xfade=transition=fade:duration=1:offset=0[x];[x][body]concat=n=2:v=1:a=0"
ffmpeg -i src.mp4 -filter_complex "[0:v]trim=36:49.7,setpts=(PTS-STARTPTS)/1.2,fps=30,$LOOP,format=yuv420p[out]" -map "[out]" -an -c:v libx264 -preset slow -crf 31 -movflags +faststart hero.mp4
```

## To swap the hero

Files are named `hero-sea*` so a swap gets a new name and no cache can serve the old one — change `video.src` /
`video.srcMobile` / `poster` on `HERO_VIDEO`. Keep `reel` as the single poster
still: it is what reduced-motion visitors and a failed load fall back to.
