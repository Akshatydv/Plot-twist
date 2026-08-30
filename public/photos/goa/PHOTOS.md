# Journey 00 — photography & clue provenance

Every image Journey 00 renders lives in this folder. Nothing here is shared
with Journey 01: the two journeys deliberately have no frame in common, so
someone switching between them sees the same brand and a completely different
trip.

## Licence

All seven files are **Unsplash photos under the [Unsplash Licence](https://unsplash.com/license)** —
free to use commercially, no permission and no attribution required.

Verified per file, not assumed: each photo's API record was checked for
`"plus": false` and `"premium": false`. Unsplash+ photos (served from
`plus.unsplash.com`) are a paid licence and **none were used** — two otherwise
good candidates were rejected on that basis alone.

Attribution is not required, but the photographers are credited below because
they should be.

## The files

| file | id | photographer | what it actually shows | slot |
| --- | --- | --- | --- | --- |
| `hero.jpg` | `6XsT6TUdLZc` | Shravan Yelburgi | A rocky, palm-crowded headland rising from calm water under flat coastal haze | Hero |
| `escape.jpg` | `tHgATU9wbtQ` | Chirayu Sharma | A small cove seen from a clifftop, rocky headlands into a hazy sea | THE ESCAPE |
| `experience.jpg` | `rqlZNkjYafA` | vinay kumar | A bamboo footbridge over a still creek, leading to fields fringed with coconut palms | THE EXPERIENCE |
| `people.jpg` | `WQSRc4QZ5jU` | Aakash Goel | People walking a wide beach in warm hazy light, slightly motion-blurred | THE PEOPLE |
| `plot.jpg` | `u4BF1kV2ZSo` | Yash Parashar | A beach after dark, lantern-lit tables on the sand below shacks strung with lights | THE PLOT (nightlife) |
| `unexpected.jpg` | `KNg2AyOXa-Q` | Parth Tendulkar | A surfboard propped against a whitewashed beach cafe, golden hour | THE UNEXPECTED |
| `landscape-clue.jpg` | `6O6CoqqYWkA` | Jaideep Arora | A dusk beach, figures at the waterline — **and the hidden clue** | Clue 02 (zoom) |

`people.jpg`, `plot.jpg` and `unexpected.jpg` are reused as the three casting
photo scraps, exactly as Journey 01 reuses its own.

### Why these, and what was rejected

The brief was editorial, cinematic, candid, slightly imperfect — not a tourism
brochure. Every candidate was **downloaded and looked at** rather than trusted
from its alt text, which is how these were caught:

- an otherwise perfect fairy-lit beach-shack night shot contained an
  **"I ♥ GOA" sign** — it would have given the answer away outright;
- a strong nightlife frame was covered in **third-party brand signage**
  ("COCO CABANA", a Heineken banner) — not something to put on a brand page;
- two aerial beach panoramas were **Unsplash+**, not free.

None of the seven chosen frames contains a named landmark, readable signage,
or third-party branding.

## `landscape-clue.jpg` — the zoom clue

**Hidden detail: a whitewashed masonry cross on a stepped plinth, standing on
the rocks at the waterline.**

At a glance the photograph is a dusk beach scene: silhouetted figures walking,
the last pink of the sunset on the water. The cross reads as one more rock
until it is magnified — and then it is the odd thing out. A Catholic wayside
cross planted on an Indian shoreline is not something you can explain away,
and it lands directly on ladder rung 03 (Portuguese for 451 years, baroque
churches). Wayside and coastal crosses of exactly this form are a standard
feature of the Goan landscape, a legacy of that period.

It rewards inspection rather than announcing itself, which is the whole point
of the card. No signage, no landmark, no text.

| | |
| --- | --- |
| source | Unsplash `6O6CoqqYWkA`, 3416 × 4270 |
| crop | `rect=0,2179,1600,1200` → **1600 × 1200 (4:3)** |
| why 4:3 | the clue card renders `aspect-[4/3]` with `object-cover`; pre-cropping to the same aspect means the frame and the hotspot can never drift apart |
| why x=25 | the magnifier is 112px wide and centred on the hotspot. At 768px — the narrowest the clue card gets — anything below ~22% clips it against the left edge of the frame. The crop was chosen to place the cross here |
| adjustment | `bri=8` — a small brightness lift so the scene reads on a phone without making the cross obvious |
| **hotspot** | **`{ x: 25, y: 58 }`** — the centre of the cross |
| alt text | describes the cross's *shape*, never its country, so a screen-reader user gets the same puzzle rather than the answer |

If this file is ever replaced, re-measure the hotspot: the marker and the
magnifier both read from it, and a wrong hotspot magnifies empty sand.

## The clue ladder — every fact, and where it came from

Five rungs, handed out in discovery order. Rung 03 is the one that has to make
a real guess possible, which is why the guess gate sits at three. No rung names
the destination — `content/journeys/index.ts` fails the build if one ever does.

### Clue 01 — SOMEWHERE WARM (broad)

> Not an island. A coastline — about a hundred kilometres of it, and you could
> get through the whole trip without putting shoes on.

| | |
| --- | --- |
| fact | ~105 km of coastline |
| source | [Britannica](https://www.britannica.com/place/Goa) |
| why it helps | establishes warm + coastal + casual, and rules out an island — which is the one thing Journey 01 was |

### Clue 02 — NARROWING IT (geographic)

> Still India — no passport, nothing to exchange. West-facing coast, so the sun
> goes down into the sea every single night, and we're going once the rains
> have finished.

| | |
| --- | --- |
| facts | the state faces the Arabian Sea on India's west coast; the tourist season runs after the south-west monsoon |
| source | [Britannica](https://www.britannica.com/place/Goa) |
| why it helps | country, then which side of it. The field drops from a continent to one coastline |

### Clue 03 — THE TELL (the rung that makes Goa guessable)

> The churches are baroque, and the old houses are glazed with oyster shell
> instead of glass. Both because the people who sailed in got here in 1510 and
> stayed for 451 years.

| | |
| --- | --- |
| facts | Portuguese rule 1510–1961 (451 years); traditional Goan houses glazed with translucent windowpane-oyster shell (*carepa* / nacre) rather than glass |
| sources | [Britannica](https://www.britannica.com/place/Goa), [World History Encyclopedia](https://www.worldhistory.org/Portuguese_Goa/), [Google Arts & Culture](https://artsandculture.google.com/story/goa%E2%80%99s-windows-a-heritage-of-shell-work-dastkari-haat-samiti/yQXxCoZOhtsRJw?hl=en), [Homegrown](https://homegrown.co.in/homegrown-explore/the-fading-light-of-goas-oyster-shell-windows) |
| why it helps | on India's west coast, "Portuguese for 451 years" narrows to essentially one answer. The shell windows are the detail that makes it specific rather than general-knowledge |

### Clue 04 — CONFIRMATION (landscape / visual)

> Red laterite headlands between the beaches. Two rivers you cross on a free
> government ferry, because there's no bridge. Shacks on the sand that go up in
> September and come down before the rain.

| | |
| --- | --- |
| facts | laterite is ~73% of Goa's soil and caps the low plateaus that form the rocky headlands at the seafront; the Mandovi and Zuari are crossed by government ferries, free for foot passengers and two-wheelers, where no bridge exists; licensed beach shacks operate 1 September – 31 May |
| sources | [Goa Dept. of Information & Publicity](https://dip.goa.gov.in/physiography/), [Goa River Navigation Department](https://rnd.goa.gov.in/ferry-routes/), [Goa Tourism shack policy (PDF)](https://goatourism.gov.in/wp-content/uploads/2019/10/TOURISM-SHACK-POLICY-2019-22.pdf) |
| why it helps | this is what it looks like out of the window, and the free river ferry is a genuinely local detail rather than a fact you could guess |

### Clue 05 — LAST ONE (final nudge)

> The smallest state in the country. It has its own word for doing absolutely
> nothing and feeling excellent about it — and a cashew spirit that legally
> can't use its own name unless it was made here.

| | |
| --- | --- |
| facts | smallest Indian state by area; *susegad*, from Portuguese *sossegado*; cashew feni holds a Geographical Indication (2009 — the state's first, and India's first for a local liquor) |
| sources | [Britannica](https://www.britannica.com/place/Goa), [Wikipedia — Susegad](https://en.wikipedia.org/wiki/Susegad), [Drishti IAS](https://www.drishtiias.com/daily-updates/daily-news-analysis/gi-tagged-feni-goa) |
| why it helps | three things that are true of exactly one place, delivered as personality rather than trivia |

### The flight card (bonus clue, not a rung)

Journey 01's card says *"You're going to need a passport."* For this
destination that is simply false, so Journey 00's says the opposite. It is the
strongest single signal on the card, and a clue that lies is worse than no clue.

## Rules for the next journey

1. Look at every image before using it. Alt text will not tell you there's a
   sign in the frame naming the destination.
2. Verify every factual claim against a primary or reputable source, and record
   it here. If it can't be verified, don't use it.
3. The zoom clue is a real puzzle, not decoration: a beautiful wide photograph
   with one small, genuinely place-specific thing in it.
4. Alt text describes shape, never country.
5. Pre-crop the zoom clue to 4:3 and re-measure the hotspot.
