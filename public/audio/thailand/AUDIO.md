# Journey 02 — audio provenance

One track, and a hard rule about what may replace it.

## The file

| file | source | licence | author | length |
| --- | --- | --- | --- | --- |
| `mainstage.mp3` | [Omen — big room festival EDM, Pixabay track 489399](https://pixabay.com/music/electronic-omen-big-room-festival-edm-489399/) | [Pixabay Content License](https://pixabay.com/service/license-summary/) | diogodasilvasimoes | 3:08, 256 kbps, ~5.9 MB |

## How this track was chosen

The first pick was [Unity — mainstage **dark** EDM](https://pixabay.com/music/edm-unity-mainstage-dark-edm-489435/)
by the same artist, and it was wrong: it read as suspenseful rather than
energetic. Genre labels do not settle that, so the replacement was measured
rather than guessed. Seven candidates were decoded in the browser and a 45s
window taken from 38% into each — past the intro, into the body:

| track | RMS | crest (↓ = relentless) | onsets/sec | envelope variance (↓ = sits loud) | length |
| --- | --- | --- | --- | --- | --- |
| **omen** *(chosen)* | **0.277** | **3.73** | 13.58 | **0.41** | 188s |
| unity *(rejected)* | 0.240 | 4.57 | 13.65 | 0.473 | 188s |
| forever | 0.267 | 4.52 | 7.47 | 0.74 | 190s |
| night | 0.207 | 5.39 | 11.76 | 0.411 | 156s |
| energy | 0.237 | 4.17 | 11.35 | 0.566 | 72s |
| festival | 0.439 | 3.12 | 13.79 | 0.567 | **32s** |
| uplift | 0.072 | 11.02 | 10.47 | 0.36 | 226s |

`omen` is the loudest sustained full-length track, the most compressed and the
steadiest — loud, dense and relentless, which is the mainstage profile.
`uplift` is almost silent through its body and hugely dynamic (a build, not a
banger). `forever` has half the transient density — trance, not big room.
`festival` scores highest on raw loudness and density but is only 32 seconds,
which loops audibly on a page people spend minutes on.

**Numbers cannot hear key or sound design.** They rank energy, not taste. If
this one is also wrong, `festival` and `night` are the next two to try.

The licence was read in full before the file was downloaded. It permits
**commercial use**, permits **modification**, and requires **no attribution**.
Its prohibited uses are selling the content standalone, using content
containing recognisable trademarks commercially, misleading use, and using it
as a trade mark — none of which apply to a background track on our own page.

## The rule for replacing it

**It may not be replaced with a commercial dance record.** Not Martin Garrix,
not any released track, not "just a short clip", and not a track lifted from
festival footage. Putting a released recording on this page needs a **sync
licence** (the composition) and a **master licence** (the recording), which
Plot Twist does not hold. That the page is a teaser, or that the clip is short,
or that the artist is playing the festival this trip is built around, changes
none of it.

Any replacement must come with the same three things recorded above: source,
the exact licence linked, and the author.

Alternates from the same library and the same licence are listed in the table
above. Swapping is one line: `soundDesk.src` in `src/content/thailand.ts`.

## How it is served

It is **not fetched until somebody turns sound on**. `SoundDesk.tsx` has no
`src` until the first tap, so a visitor who never touches the control downloads
none of this. That is why a 5.9 MB file is acceptable on a page that already
carries a self-hosted video.

It is still 5.9 MB at 256 kbps, which is more than a looping background bed
needs. If it is worth halving, re-encode at 128 kbps mono — the page mixes it
at 34% volume and nobody is listening in stereo for detail:

```bash
ffmpeg -i mainstage.mp3 -ac 1 -b:a 128k -map_metadata -1 mainstage-128.mp3
```

## What the page does with it

Set out in full at the top of `src/components/edc/SoundDesk.tsx`. In short: it
never autoplays, it is off on every page load, it fades in and out over ~700ms,
and it pauses when the tab is hidden.

Video provenance is recorded separately in
[`public/videos/thailand/VIDEOS.md`](../../videos/thailand/VIDEOS.md), and
photography in [`public/photos/thailand/PHOTOS.md`](../../photos/thailand/PHOTOS.md).
