# Journey 02 — EDC Thailand: photography provenance

Seven photographs, all under the **[Pexels License](https://www.pexels.com/license/)**.
Licence read in full before any file was downloaded — not assumed from the word
"free". It permits **commercial use**, **hosting on your own site**, and
**modification**, and requires **no attribution**.

Photographers are credited below anyway, because they should be.

## The files

| file | id | photographer | what it actually shows | slot |
| --- | --- | --- | --- | --- |
| `water.jpg` | `31029487` | Ali Kazal | A wooden longtail boat on clear emerald water beneath a limestone cliff | BEYOND THE GATES — THE WATER (4:5) |
| `streets.jpg` | `17704286` | Ahmet Çığşar | A night market from above, hundreds of lit stall canopies in dense rows | BEYOND THE GATES — THE STREETS (1:1) |
| `food.jpg` | `37324089` | Hera hendrayana | A vendor grilling skewers over a burst of open flame after dark | BEYOND THE GATES — THE FOOD (4:3) |
| `recovery.jpg` | `6821435` | Lelani Badenhorst | An empty resort poolside under palms, loungers still folded, bright morning | BEYOND THE GATES — THE RECOVERY (3:2) |
| `cast-01.jpg` | `18704290` | QVEVRI TBILISI | Friends dancing together in a crowded club under blue light | THE CAST scrap 1 |
| `cast-02.jpg` | `16118362` | Valentin Angel Fernandez | A figure with both arms raised in a festival crowd, magenta stage light | THE CAST scrap 2 |
| `cast-03.jpg` | `9005501` | Yan Krukau | People mid-dance in a dark venue strung with coloured light | THE CAST scrap 3 |

## Two honesty notes that matter

**1. Not all of these are Thailand.** `streets.jpg` is a Bangkok night market,
not Phuket. `recovery.jpg` is a resort poolside that is almost certainly not
Thailand at all. None of the three cast frames are Thailand, and nobody in them
is on this trip.

That is fine for mood photography and **not** fine if the page claims
otherwise, so:

- no `alt` line names a city, a venue, or a person;
- no caption presents a frame as documentation of this trip;
- `pass.disclaimer` states in plain text, at full contrast, that the video and
  photography are licensed stock, were not shot at EDC Thailand, and do not
  show the actual venues, stays or travellers on this trip.

Keep all three of those true if you swap a file.

**2. Identifiable people.** The three cast frames contain identifiable faces.
The Pexels License permits this commercially but prohibits using an image to
imply a person endorses you. The scraps are therefore captioned as mood notes
("the group chat, irl", "04:00", "no filter") and never as testimonial, roster
or "our travellers". Do not add a caption that reads as either.

## What was rejected, and why

Candidates were **downloaded and looked at full size**, not trusted from their
thumbnails or alt text. That is how these were caught:

- **`8041394`** — a technically good dance photo, rejected for being a **posed
  studio shot** on a seamless gradient backdrop. Plot Twist's register is a
  scrapbook: candid, imperfect, real rooms. Catalogue lighting reads as an ad.
- **`35979663`** — a street-food vendor, rejected twice over: flat fluorescent
  interior light (the slot wants a night market at 23:18), and a clearly
  legible **third-party brand logo** on the apron.
- The **AI-generated results** Pexels returns inline (served from
  `content.pexels.com/aigc-bundle/…`) were excluded on sight. The brief ruled
  out generated festival imagery, and it is easy to pick one up by accident
  because they sit in the same grid as real photographs.

## The rule for anything added here

Before a file lands in this folder, record in the table above:

- the **source** and the **exact licence** (link the licence, not the site)
- confirmation the frame contains **no third-party branding**
- confirmation of the **consent position** for identifiable faces
- the photographer's name

Then set the matching `src` in `src/content/thailand.ts` (or
`src/content/journeys/journey02.ts` for the cast scraps). Nothing in
`src/components/edc/` needs to change — `LightPlate` swaps from its designed
plate to the photograph as soon as `src` is non-null.

## Still worth upgrading

These are good stock. They are not our photographs. The real answer is footage
and stills from Journey 02 itself once it has run — at which point every frame
here can be replaced with something that is genuinely the trip, and the honesty
notes above stop being necessary.

Hero video provenance is recorded separately in
[`public/videos/thailand/VIDEOS.md`](../../videos/thailand/VIDEOS.md).
