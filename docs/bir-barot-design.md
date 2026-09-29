# JOURNEY 03 — BIR × BAROT
## Visual architecture, written before a line of code

> **Itinerary change (after launch).** The stay moved to **Bir for all three
> nights**. Day 01 is now Bir itself (route Delhi → Bir, the town, the social
> club, the evening, the bonfire as the Plot Twist Social Night). Day 02 is a
> day trip: Barot's river and trail in the morning, Billing and the flight
> back down to Bir in the afternoon, golden hour on landing. Days 03 and 04
> are unchanged. Every section and transition below survives — they were
> reordered, not redrawn. Where this document and the code disagree, the
> code is right.

> Goa is a film. Bali is a mystery. Thailand is a gate.
> **Bir × Barot is a descent.**

The page is one continuous camera move. You start in the air above the
Dhauladhar, you come down into a valley nobody told you about, you go back up
into the sky, you walk into a forest, you earn a view, and then the camera
pulls away and the mountains get smaller behind a van window. Every section is
a *place the camera is*, never a *card about a place*.

The one sentence the page is built to produce, in order:

```
"What the hell is this trip?"   →   "…okay, I need to be there."
```

---

## 0. THE CONSTRAINTS THIS PAGE INHERITS

From `docs/edc-thailand-design.md` §0 — still binding:

- **No new fonts.** Instrument Serif carries the cinematic headlines (it is the
  editorial serif the brief asks for), DM Sans carries body and the tracked
  9–11px metadata, Caveat is the one human scribble per section. Anton and
  Permanent Marker are *not* used here — they are Goa's loudness.
- **`PlotButton` is the only button.** Same slab, same hard shadow, lit in this
  page's colours.
- **Copy lives in `content/bir.ts`.** Components read; they never hold words.
- **Nothing invented.** Price is not supplied → `price.confirmed: false`, which
  renders "announced soon". Exact dates are an interpretation of "last
  weekend of November" → flagged in `trip` as the one assumption to confirm.
- **Shared, unchanged:** the casting board, the application form, the footer,
  the tea cup. Two of them gain an `alpine` *tone* (the same mechanism the EDC
  page used to add `night`) — structure untouched.

### The media constraint, stated plainly

The brief asks for real Bir-Billing tandem footage in the hero. None exists in
this repo and none could be licensed from inside the build environment. So:

1. **Every photographic surface is a slot** (`media` in `content/bir.ts`).
   Empty, it renders a fully-designed illustrated environment — generated
   ridgelines, fog, stars, fire, topo lines. Filled, it renders the footage over
   the same environment, which then becomes the poster/fallback.
2. The illustrated layer is **not a placeholder look**. It is the page's
   surreal register — the "slightly surreal" in the brief — and it stays under
   the footage as colour and depth even when real video lands.
3. The exact shots needed, their length, framing and encode, are listed in
   `public/videos/bir/VIDEOS.md`. Dropping a file in and setting one string is
   the whole integration.

---

## 1. THE FOUR WORLDS

| | DAY 01 · THE ESCAPE | DAY 02 · THE FLIGHT | DAY 03 · THE WILD | DAY 04 · THE WAY HOME |
| --- | --- | --- | --- | --- |
| place | Barot | Bir · Billing | the trail | the road |
| feeling | wild, mysterious, intimate | free, social, high-energy | raw, earned | nostalgic, reflective |
| ground | `#0F1D16` deep pine | `#A9CBE0` → `#24527D` sky | `#2E2119` earth | `#F1E6D6` dawn paper |
| light | fire `#E8793A`, river `#8FB1A8` | prayer flags ×5, cream | clay `#A95F38`, trail `#D9C7A6` | peach `#E8B48A`, slate `#5D6B73` |
| texture | fog, stars, embers | clouds, flags, thermals | contour lines, footsteps | long horizon, receding ridges |
| motion | slow drift, flicker | fast, lateral, lifting | vertical, climbing | decelerating, pulling away |
| density | tight, dark, close | open, bright, loud | dense then *huge* | spacious, quiet |

Charcoal `#101311`, stone `#A59D8F` and bone `#EFE9DD` are the neutrals that
run through all four so the page stays one film.

---

## 2. THE RUNNING ORDER

```
 00  HERO — FLY INTO HIMACHAL          sticky 220vh   flight → cloud → descent
     ↓ (the descent IS the transition — no cut)
 01  THE JOURNEY                        dark          four worlds, one line each
 02  DAY 01 — THE ESCAPE                pine          title card
       DELHI → BAROT                    sticky 260vh  route draws with scroll: city → highway → hills → valley
       THE RIVER / THE TRAIL / GOLDEN HOUR            three full-bleed plates, masked in
       THE BONFIRE                      sticky 300vh  "TONIGHT, WE DISAPPEAR." — seven elements lit one by one
 ~~  NIGHT → SUNRISE → ROAD → BIR       sticky 240vh  sky interpolates, stars die, road draws
 03  DAY 02 — THE FLIGHT                sky           title card + prayer flags
       BIR, INTRODUCED                  horizontal drift strip: flags / cafés / monastery / roads / people
       THE FLIGHT                       sticky 600vh  PREPARE → EDGE → TAKE OFF → FLY → LOOK DOWN → LAND
       BILLING → BIR                    flight path with altimeter 2,400 m → 1,400 m
       THE BIR SOCIAL CLUB              warm dusk
       SUNSET. MUSIC. STRANGERS. NOT FOR LONG.  one word per beat
       PLOT TWIST SOCIAL NIGHT
 ~~  CLOUDS → AERIAL → INTO THE FOREST  sticky 200vh  camera drops through cloud into canopy
 04  DAY 03 — THE WILD                  earth         "LEAVE THE ROAD. FIND THE TRAIL."
       THE MOUNTAIN CHALLENGE           sticky 400vh  a walker climbs an elevation profile: START / ASCEND / DISCOVER / ARRIVE
       THE REVEAL                       sticky 220vh  "SOME VIEWS HAVE TO BE EARNED." — a keyhole mask opens to the whole range
       THE LAST NIGHT                   fire          shower → warm clothes → sunset → dinner → fire; the long table; polaroids
       LEAVE IT BEHIND                  interactive   tap (or write) what you're leaving; it burns
 ~~  EMBERS → SUNRISE → ROAD            (the ritual's embers rise into Day 04's dawn)
 05  DAY 04 — THE WAY HOME              dawn paper    the epilogue; ridges recede with scroll
 06  THE CAST                           shared board, alpine tone
 07  THE RECAP                          montage       ten words, ten worlds, fast
 08  THE DETAILS                        bone paper    dates, route, price, included/not, departure, group
 09  FINAL CTA                          night         "YOUR NEXT PLOT TWIST STARTS HERE." I'M IN →
     THE APPLICATION                    shared form
     FOOTER                             alpine tone
  *  JOIN THE JOURNEY →                 mobile: sticky bottom bar · desktop: corner slab
  *  THE HUD                            desktop: day · place · altitude, bottom-left, changes per world
```

**Rhythm.** Dark → dark → *sky* → earth → *paper* → dark. The single brightest
section (Day 02) sits dead centre, flanked by the two darkest (the bonfire, the
forest). Day 04 is the only paper-light chapter because the page is meant to
exhale there — the brief's "less immersive and more spacious".

---

## 3. EVERY TRANSITION, SCROLL BY SCROLL

**Hero → Day 01 (the landing).** Sticky 220vh. 0–35%: flying — ridges stream
past at three speeds, clouds rush toward camera. 35–70%: descent — the whole
scene scales up 1→1.6 and tilts down, a cloud bank crosses the frame, the
hero type blurs and lifts away. 70–100%: the cloud clears onto pine-dark ground
and the first line of Day 01 is already there. There is never a white frame.

**Day 01 → Day 02.** Sticky 240vh. Sky gradient is a scroll-driven
interpolation night → blue hour → sunrise gold → morning sky; stars fade out
in the first third; a sun rises behind a ridge; a road draws itself across the
lower third and ends at a pin: BIR. The time-of-day readout ticks 23:40 → 07:10.

**Day 02 → Day 03.** Sticky 200vh. From the sky-blue of Day 02 the camera
drops: cloud layer rushes up past the lens, the ridges grow to fill the frame,
and the screen goes to canopy green, then earth. "LEAVE THE ROAD." sits on the
far side of the cloud.

**Day 03 → Day 04.** The ritual's embers are the transition: they rise out of
the last-night section into a dawn that is already paper-coloured. Campfire →
embers → sunrise → road, with no hard edge between the fire and the morning.

---

## 4. WHERE VIDEO IS REQUIRED

| slot | shot | length | fallback when empty |
| --- | --- | --- | --- |
| `hero` | tandem paragliding POV over the Bir valley, pilot + passenger visible, ridges below | 12–20s loop | the illustrated flight |
| `river` | Uhl river at Barot, slow | 8–12s | fog over water, illustrated |
| `flight` | Billing launch → glide → Bir landing field | 20–30s | the scroll-driven illustrated flight |
| `bonfire` | fire close-up, sparks | 6–10s | the ember canvas |

Stills (optional, same slot system): `trail`, `goldenHour`, `bir` ×5,
`social`, `lastNight` ×3 polaroids, `road`.

All video: muted, `playsInline`, `preload="none"`, mounted only when near the
viewport, paused when it leaves, never mounted under reduced motion.

## 5. WHERE ANIMATION IS REQUIRED — AND WHAT IT COSTS

Scroll-driven, transform/opacity only (compositor-cheap on phones):
the hero descent, the route line, the dawn, the flight, the forest drop, the
trek profile, the reveal mask, the Day 04 recession.

Time-driven, CSS only: cloud drift, flag flutter, star twinkle.

Canvas, one at a time, paused off-screen: the embers (bonfire, last night).

No animated `filter: blur()` on full-screen layers — blur is pre-baked into
static layers and crossfaded. That is the single biggest thing that makes
this kind of page lag on a mid-range Android phone.

## 6. INTERACTIVE MOMENTS

1. **The flight** — scroll *is* the flight. Scroll stops, the glider hangs.
2. **The bonfire** — each element lights when you reach it.
3. **Leave it behind** — tap a card (or write your own); it curls into the fire.
   Nothing is stored or sent. It is a moment, not a data capture.
4. **The recap** — scroll-scrubbed montage.

## 7. MOBILE

Designed at 390×844 first. Sticky sequences use `svh` so the URL bar never
jumps them. Headlines are `clamp()`ed so the serif stays huge on a phone.
The sticky bottom bar (JOIN THE JOURNEY →) is 56px, thumb-height, hidden
over the form, and lifts the tea cup the same way the EDC bar does. The HUD
is desktop-only; on mobile each world announces itself in its own title card.
