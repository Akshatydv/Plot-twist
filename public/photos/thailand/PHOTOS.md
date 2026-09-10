# Journey 02 — EDC Thailand: photography brief

**This folder is empty on purpose.** Every photo slot on the Journey 02 page
currently ships `src: null` and renders a designed light plate instead.

## Why it is empty

Nothing in this repo is a licensed Thailand or festival photograph, and
sourcing images without verifying their licence is exactly the mistake
[`public/photos/goa/PHOTOS.md`](../goa/PHOTOS.md) exists to prevent. That file
records a per-image check (`plus: false`, `premium: false` on the Unsplash API
record, verified per file rather than assumed) and documents two
otherwise-perfect candidates that were **rejected on licence grounds alone**.

Guessing here would be worse than on the Goa page, because two extra risks
apply to festival photography specifically:

1. **Third-party branding.** Festival photography is full of stage branding,
   sponsor banners and event wordmarks. A frame containing EDC or Insomniac
   branding would imply an affiliation this trip does not have — see the
   affiliation rule at the top of `src/content/thailand.ts`.
2. **Identifiable faces.** Crowd photography is people. Licence and consent are
   two different questions, and a stock licence does not settle the second one
   for a commercial travel page.

## The rule for anything added here

Before a file lands in this folder, record in the table below:

- the **source** and the **exact licence** (link the licence, not the site)
- for Unsplash: the API record's `plus` and `premium` flags, checked per file
- confirmation the frame contains **no EDC / Insomniac / third-party branding**
- confirmation of the **model-release / consent** position for identifiable faces
- the photographer's name (credit them even where attribution is not required)

Then set the matching `src` in `src/content/thailand.ts`. Nothing in
`src/components/edc/` needs to change — `LightPlate` swaps to the photograph as
soon as `src` is non-null.

## The shot list

Ordered by how much each one is missed. The first three are the ones holding
the page back.

| # | slot | content key | what it needs to be | notes |
| --- | --- | --- | --- | --- |
| 1 | THE RUN OF SHOW — Day 03 | `runOfShow.days[2].photo` | A mainstage at night: crowd in silhouette, lasers through haze, stage lights as the only source. Landscape 16:9. | The single most important frame on the page. **Must not** contain EDC/Insomniac branding, a readable stage wordmark, or a recognisable performer. |
| 2 | THE CAST — 3 scraps | `journey02.casting.photos` | Group energy at night. Friends, flash, crowd. | **Currently reusing Journey 00's night frames** — see the documented exception in `src/content/journeys/journey02.ts`. Goa and Bali share no photograph; this breaks that rule, and replacing these is the first job once real photography exists. |
| 3 | BEYOND THE GATES — 4 frames | `beyond.frames` | Thailand in daylight: longtail boats and limestone (portrait 4:5), a night market (square), street food over flame (4:3), an empty pool the morning after (3:2). | The one bright screen. Four *different* subjects and four different aspect ratios — four versions of the same beach shot would collapse the section into a card grid. |
| 4 | THE RUN OF SHOW — Days 01/02/04 | `runOfShow.days[n].photo` | Arrival, daytime water, the morning after. Landscape 3:2. | Lowest priority: the plates read well at this size and the copy carries these days. |

## What is NOT needed

- **A hero image.** The hero is the official EDC Thailand trailer, embedded from
  Insomniac's own YouTube channel and played unmodified. See
  `src/components/edc/HeroVideo.tsx`.
- **An accommodation set.** There is no stay section on this page, because the
  stay is not decided. Do not add stock hotel photography to fill the gap — that
  would be the one invented fact on an otherwise honest page.
- **Any EDC artwork, logo, wordmark, poster or campaign asset.** Not licensed,
  not ours, and using it would imply a partnership that does not exist.
