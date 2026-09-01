# Journey 00 — THE HOME BASE photography

The four accommodation photographs behind the HOME BASE section on the Goa
page. All four slots declared in `src/content/goa.ts` are filled.

## What these are — and are not

They are **representative**, not a booking. The accommodation is selected from
several handpicked Goa properties depending on availability, so these four are
a *standard*, and the section says so in copy that renders directly under the
collage. Nothing on the page names or promises a specific property.

## Licence and provenance

All four were **supplied by the site owner** on 2026-09-01 (two as PNG screen
captures, two as WebP), converted to JPEG here at quality 88 without
resampling. They are not stock and were not sourced by Claude.

**Rights were not independently verified.** Same footing as `people.jpg` in
`../PHOTOS.md`: used on the site owner's instruction and at their risk. Before
these run behind paid traffic for long, confirm the properties are happy for
their images to be used, or replace them with Plot Twist's own photography —
particularly `property-03`, which shows a specific, identifiable building.

## The files

| file | size | what it shows | role in the board |
| --- | --- | --- | --- |
| `property-01.jpg` | 1039×748 | A property from directly overhead at night — lit paths winding between red-tiled roofs, palms, a floodlit pool | Hero print, largest |
| `property-02.jpg` | 816×1020 | An open wooden door onto a balcony, palms and sea beyond, beach below | The intimate one — and the only **portrait** frame |
| `property-03.jpg` | 1360×1020 | A terraced beachfront guesthouse among palms, seen from the sand with parasols and loungers | Warm daylight exterior |
| `property-04.jpg` | 1027×753 | Aerial of a headland settlement above a beach, huts down the slope, surf on the rocks | The wide context shot |

## Why these four as a set

Chosen so the board reads as a standard **across places**, not as one hotel
from four angles. They deliberately share nothing:

- **Four kinds of space** — overhead property, a room's own view, a building
  from the beach, and the surrounding neighbourhood.
- **Four kinds of light** — night, hard midday, warm late afternoon, overcast
  dawn.
- **Mixed formats** — three landscape and one portrait. The prints take their
  own aspect ratio (`aspect` in `content/goa.ts`), so the board is a pile of
  differently shaped photographs rather than a grid of identical cards.

## What was rejected

**`202505201253229515-….webp`** — a villa pool at dusk, supplied earlier and
used briefly while it was the only photo available. Dropped once these four
arrived:

- 600×400, by far the lowest resolution of the set, and it was being rendered
  around 540px wide — soft on any 2× display.
- A third-party **booking-listing** photo, so the weakest rights position of
  the five.
- `property-01` already shows a pool, so nothing was lost from the set.

**`bgdefault_bg.avif` ×3** — never usable, and worth recording so they are not
re-supplied by mistake:

- All three were **byte-identical** (MD5 `3b876257…`, 12,036 bytes) — the same
  download saved three times, not three properties.
- The file is a **booking-site placeholder graphic**, not a photograph: a grey
  tile pattern of travel icons (suitcases, keys, trolleys, cutlery, clocks).
  Its name is literally "bg default bg".
- It was also **truncated** — decoders read past the end of the file.

Every candidate was opened and looked at rather than trusted from its
filename, which is the only reason a placeholder graphic did not ship as an
"accommodation photo".

## Adding or swapping a photo

Edit the matching slot in `src/content/goa.ts` — `src`, `alt`, `note` and
`aspect` (the image's true width/height, so the print isn't cropped). The
section re-composes itself for 1, 2, 3 or 4 photos, so it stays intact if one
is removed. Supply at **≥1600px on the long edge** where possible; the four
here run 816–1360px, which is adequate at their rendered sizes but leaves
little headroom.
