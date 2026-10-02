# JOURNEY 3 — THAILAND: THE CHAOS
## Visual architecture for the rebuild, written before a line of code

> Goa is a film. Bali is a mystery. Bir × Barot is a descent. Sri Lanka is a
> trailer.
> **Thailand is a night that doesn't end.**

The current page is a gate: you arrive, the gates open, you are inside a
festival. That was the right idea for a teaser and it is the wrong idea for
this. A gate is a *moment*. This page has to be a *week* — seven days where the
light keeps changing and never quite goes out.

The brief's own framing is the best one-line statement of it and it governs
every colour decision below:

```
BIR = EARTH      SRI LANKA = WATER      THAILAND = LIGHT
```

The sentence the page is built to produce, in order:

```
"What the hell is this?"   →   "I want to go."   →   "How do I get on the list?"
```

---

## 0. THREE THINGS IN THE BRIEF THAT THE TRIP CANNOT SUPPORT

Flagged before any code, because two of them would mean inventing an itinerary
and the house rule across every one of these documents is **nothing invented**.

### 0.1 There is no Bangkok on this trip

The brief opens on `WORLD 01 — BANGKOK AFTER DARK` and returns to it in the
hero sequence, the transitions and the media research list. The confirmed
itinerary — owner-confirmed twice, and currently live on the page — is:

```
15 Dec  land PHUKET → road to KRABI → Railay at sunset → welcome night
16 Dec  PHI PHI + MAYA BAY by boat → night out
17 Dec  Krabi → PHUKET → pool, beach, get ready
18 Dec  EDC night 01
19 Dec  EDC night 02
20 Dec  EDC night 03
21 Dec  slow breakfast → checkout → airport
```

No Bangkok. No beach club. No final-night dinner after the festival — day 07 is
a departure morning, which is a very different emotional beat from the brief's
"ONE LAST NIGHT".

**Resolved in this document by reading the Bangkok section as a description of
ENERGY rather than of STOPS.** What the brief actually asks for in World 01 is
arrival, speed, neon, sensory overload, "the city doesn't sleep". Landing in
Phuket and driving to Krabi at dusk can carry all of that without claiming a
city the trip does not visit. If Bangkok is genuinely being added to the
itinerary, say so — it changes the structure, not just the copy.

### 0.2 The dates in the brief are Sri Lanka's

The hero example reads `29 DEC — 4 JAN`. That is Journey 4. Thailand is
**15–21 December 2026**, with EDC on 18–20 December.

### 0.3 The brief asks for price; the latest instruction says not to

The brief lists `PRICE` in the conversion section. The most recent instruction
on this campaign was the opposite: *"not to mention price right now, only
mention pre registrations"*. **The later instruction wins** — this document
plans for `price.confirmed: false` and a pre-registration CTA throughout. One
flag flips it back.

---

## 1. WHAT IS INHERITED AND NOT NEGOTIABLE

From `docs/edc-thailand-design.md` §0 and `docs/bir-barot-design.md` §0, both
still binding:

- **No new fonts.** Instrument Serif for cinematic headlines, DM Sans for body
  and the tracked 9–11px metadata, Caveat for the one human scribble per world.
  Anton is Goa's loudness and the current EDC page's display face — this rebuild
  moves the headline voice to Instrument Serif, which is what Bir and Sri Lanka
  both use and what makes them read as film rather than as poster.
- **`PlotButton` is the only button.** No pills, no gradients, no rounded CTAs.
- **Copy lives in `content/thailand.ts`.** Components read; they never hold words.
- **Shared and structurally untouched:** the casting board, the application form,
  the footer. They take a *tone*, never a redesign.
- **Nothing invented.** Every hotel, activity, time and inclusion on the page
  traces to the confirmed brief.

### The media constraint, stated plainly

The brief asks for Bangkok night footage, speedboat footage, EDC footage. None
of it is in this repo and none can be licensed from inside the build. So this
page uses **Bir's slot system**, which is already written and proven:

1. Every photographic surface is a slot. Empty, it renders a **fully designed
   illustrated environment** — not a grey box. Filled, the footage plays over
   that environment, which becomes its own poster and fallback.
2. The illustrated layer is the page's surreal register, and it stays under the
   footage as colour and depth even once real video lands.
3. The exact shots, lengths, framing and encodes get listed in
   `public/videos/thailand/VIDEOS.md`. Dropping a file in and setting one string
   is the whole integration.

Seven licensed stills already exist in `public/photos/thailand/days/` and four
more in `launch-assets/`, all cleared, credited and checked at full resolution.
They are the fallback layer, not the ambition.

---

## 2. THE SEVEN WORLDS

Mapped onto the real itinerary. `THAILAND = LIGHT`, so every world is defined by
what kind of light it is in — not by what colour it is painted.

| | 01 LANDFALL | 02 THE WATER | 03 THE DAYLIGHT | 04 THE NIGHT BEFORE | 05 THE DROP | 06 AFTER HOURS | 07 THE END |
| --- | --- | --- | --- | --- | --- | --- | --- |
| day | 15 Dec | 16 Dec | 17 Dec (day) | 17 Dec (night) | 18–20 Dec | each dawn | 21 Dec |
| place | Phuket → Krabi → Railay | Phi Phi · Maya Bay | Phuket | Phuket | Rhythm Park | the beach | the airport |
| light | **last light** — sun already gone, sky still burning | **noon** — hard, high, white-hot on water | **afternoon** — flat, bright, nothing happening | **no light** — the hour before | **manufactured light** — lasers, strobes, pyro | **first light** — low and gold | **daylight** — ordinary, and that is the point |
| ground | `#2A1330` dusk violet | `#0C3A3F` deep sea | `#F1E9DC` bone paper | `#07040D` near-black | `#0A0414` void | `#1C1018` warm dark | `#08060B` black |
| accent | coral `#FF9E7A` | sea-glass `#79C8BE` | ink `#1B1B1B` | violet `#8B3DFF` | hot `#FF2E7E` | peach `#E8B48A` | bone `#EFE9DD` |
| motion | lateral, travelling | drifting, buoyant | almost none | one slow push-in | fast, strobed, cut | decelerating | receding |
| density | busy, loaded | open, wide | empty, spacious | tight, held | maximum | loose | sparse |

**Rhythm.** dusk → sea → **PAPER** → black → **MAXIMUM** → gold → black.

The single brightest world (03) sits dead centre, flanked by the two darkest
(04 and the back half of 02's night-out). That is Bir's structure exactly — its
one sky-bright chapter sits between the bonfire and the forest — and it is the
reason the festival lands when it lands. **A page that is loud everywhere is
loud nowhere.**

### A palette decision that needs a second look

`02 THE WATER` is the first sea-green on this page. **Cyan was tried twice on
the current page and cut twice**, because it "didn't gel" against the magenta.
This is a different use: not an accent sitting next to pink, but the *ground of
an entire world*, separated from the magenta worlds by a paper-white chapter and
a black one. The rejection was about adjacency, and the adjacency is gone.

If it still fails in build, 02 falls back to bleached bone-and-blue rather than
reaching for the gold, which was also cut.

---

## 3. THE RUNNING ORDER

```
 00  HERO — NIGHT ARRIVAL              sticky 220vh  black → a light → the strip → the sea
     ↓ (THE CROSSING is the transition — no cut, no white frame)
 01  THE WEEK                          black         seven worlds, one line each (the film index)
 02  WORLD 01 — LANDFALL               dusk violet   title card
       THE ROAD                        sticky 260vh  Phuket → Krabi, drawn with scroll
       RAILAY                          full-bleed    "a beach you reach by boat because there is no road"
       THE WELCOME NIGHT               fire-lit      twenty strangers, lit one at a time
 ~~  DUSK → DAWN → OPEN WATER          sticky 240vh  the sky interpolates; a wake draws across the lower third
 03  WORLD 02 — THE WATER              deep sea      title card
       THE CROSSING                    horizontal    a sideways reel: longtails, cliffs, Maya Bay, the stops with no name
       MAYA BAY                        reveal        "the one you've seen a hundred times"
 ~~  WATER → WHITE                     sticky 200vh  the sea bleaches out to paper
 04  WORLD 03 — THE DAYLIGHT           bone paper    the exhale. the only light chapter.
       NOTHING HAPPENS TODAY           spacious      the last quiet day, stated plainly
 ~~  PAPER → BLACK                     sticky 180vh  the page loses its light, one stop at a time
 05  WORLD 04 — THE NIGHT BEFORE       near-black    "TOMORROW ISN'T ANOTHER DAY."
       THE COUNTDOWN                   sticky 300vh  a clock scrubs 21:00 → 23:59; the violet rises
 ~~  23:59 → 00:00                     the cut       one frame of nothing, then —
 06  WORLD 05 — THE DROP               void + hot    THE CLIMAX
       NIGHT 01 / 02 / 03              three beats, three different kinds of loud
       THE BILL                        oversized     Garrix · Tiësto · Charlotte de Witte · DJ Snake · +100
 ~~  LAST TRACK → FIRST LIGHT          sticky 240vh  the lights die, the sky comes up behind them
 07  WORLD 06 — AFTER HOURS            warm dark → gold
       "THE MUSIC STOPPED. THE SUN DIDN'T."
 08  WORLD 07 — THE END                black         the montage, fast, then stopped
       "YOU CAME FOR EDC. YOU LEFT WITH TWENTY PEOPLE."
 09  THE CAST                          shared board, night tone
 10  WHAT'S INCLUDED · WHO THIS IS FOR · THE DETAILS · FAQ   quiet, plain, informative
 11  FINAL CTA — PRE-REGISTER          night
       FOOTER                          night tone
  *  THE WEEK NAVIGATOR                pinned: 03 / 07 · THE DAYLIGHT · 17 DEC   (built, working)
  *  PRE-REGISTER →                    mobile sticky bar · desktop corner slab
```

---

## 4. THE TRANSITIONS, SCROLL BY SCROLL

The house rule from Bir: **there is never a white frame, and a world never
"ends" — it becomes the next one.**

**Hero → World 01.** Black. One light in the centre, far away. It grows, and as
it grows it resolves into a strip of signage and headlights on a coastal road at
last light. The hero type blurs and lifts away; the road is already moving by
the time it has gone. The light never cuts — it only gets closer.

**World 01 → 02 (dusk → open water).** Sticky 240vh. The sky interpolates night
→ blue hour → white morning; the fire from the welcome night falls to embers and
goes out in the first third; a boat wake draws itself across the lower third and
the horizon pulls flat. Time ticks 23:40 → 08:10.

**World 02 → 03 (water → white).** The sea desaturates upward from the bottom of
the frame until the whole screen is paper. The only transition on the page that
gets *brighter*, and it is why World 03 feels like an exhale rather than a lull.

**World 03 → 04 (paper → black).** The reverse, and deliberately mechanical: the
page loses its light one stop at a time, like someone killing a lighting rig
channel by channel. Six steps, each a little faster than the last.

**World 04 → 05 (the cut).** The countdown reaches 23:59. One frame of absolute
nothing — no type, no texture, no sound — and then the drop lands at full size.
The silence is the effect. Every other transition on this page is continuous;
this is the only hard cut, which is what makes it work.

**World 05 → 06 (last track → first light).** The lasers stop one at a time
rather than all at once; the sky behind the rig has already been getting lighter
for a full screen before anyone notices.

---

## 5. WHERE VIDEO IS REQUIRED

| slot | shot | length | fallback when empty |
| --- | --- | --- | --- |
| `hero` | night arrival: headlights, wet tarmac, signage, then the sea opening up | 15–20s loop | the illustrated approach |
| `road` | the Phuket → Krabi coastal road from a moving vehicle, dusk | 10–15s | the drawn route |
| `water` | longtail bow cutting water, Phi Phi cliffs behind | 10–15s | the illustrated crossing |
| `festival` | wide crowd + mainstage, lasers overhead, shot from inside | 15–20s | the existing licensed stills |
| `sunrise` | people on a beach at first light, from behind | 10–12s | `day-07.jpg`, already cleared |

All video: muted, `playsInline`, `preload="none"`, mounted only within ~a screen
of the viewport, paused when it leaves, **never mounted under reduced motion** —
Bir's `Footage` component already does all of this and is imported, not rewritten.

---

## 6. WHAT IT COSTS, AND WHAT IS BANNED

Scroll-driven, **transform and opacity only**: the hero approach, the road, the
dawn, the bleach, the light-death, the countdown, the recession.

Time-driven, CSS only: haze drift, laser sweep, star twinkle.

Canvas, one at a time, paused off-screen: the embers, the drop's particles.

**Banned, from Bir §5:** animated `filter: blur()` on full-screen layers. Blur is
pre-baked into static layers and crossfaded. It is the single biggest cause of
this kind of page dying on a mid-range Android.

Also banned, from the brief: repeated cards, icon grids, alternating image/text
rows, glassmorphism as a default surface, and any rounded rectangle that exists
because it was easier than composing the frame.

---

## 7. MOBILE

Designed at **390 × 844 first**, not scaled down from desktop. Sticky sequences
use `svh` so the iOS URL bar never jumps them. Headlines are `clamp()`ed so the
serif stays genuinely huge on a phone — the brief's "vertical interactive film"
is mostly a typography decision.

The hero carries a native 9:16 cut, chosen once after hydration, so a phone
never downloads the 16:9. The week navigator is already built and already works
at 390px. The sticky bar is 56px, thumb height, hidden over the form, and lifts
the crew radio the way the current bar does.

---

## 8. WHAT SURVIVES FROM THE CURRENT PAGE

The brief says treat it as a content document. Four things are genuinely worth
keeping, and all four are *mechanisms*, not looks:

1. **The confirmed content** in `content/thailand.ts` — dates, the week, the
   lineup, the FAQ, the disclaimers. All of it was verified against the
   organiser's announcements and none of it should be retyped.
2. **`WeekNav`** — built this session, works, is the house pattern.
3. **`PreRegister`** — the form, its validation and the admin notification path
   are working and were debugged at length. Not to be touched.
4. **The non-affiliation disclaimers** and the "never imply an EDC partnership"
   rule, which are legal posture and survive any redesign.

Everything else — `GateHero`, `GateCrossing`, `GatesOpen`, `TheShape`,
`ThePremise`, `TheDrop`, `ThePass`, `Room`, `StageArch`, `Neon`, the Anton
headlines, the holo panels — is replaced.
