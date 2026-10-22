# Journey 4 — Sri Lanka: the design

`/journey/4` · `pageVariant: "srilanka"` · components in `src/components/srilanka/`,
every word in `src/content/srilanka.ts`.

## 1. The idea

Bir is a descent. Goa is a film. **Sri Lanka is a trailer**: you're not shown a
destination, you're walked through seven days of a story — one *world* per
day — with New Year's Eve as the climax. The island is the backdrop, the people
are the characters, the experiences are the plot.

Same DNA as Bir (studied first): a sticky, scroll-driven hero; chapter cards
per day; footage slots that fall back to stills; mask-line headline reveals and
blur-to-focus copy; serif for emotion, tracked caps for metadata, hand-script
for asides; information last and plain; the shared casting board, form, footer
and tea cup. What is new is said below.

## 2. The rhythm

Route: **GALLE → AHANGAMA → MIRISSA → ELLA** (arrive and leave via Colombo airport).
Positioning: **slow southern Sri Lanka · New Year · coast to mountains.** Less rush. More story.

```
video hero → black → THROUGH THE LETTERS → jungle (the film index)
→ 01 saffron  29 DEC  THE BEGINNING        card · departures board · airport→Galle road reel · first night in Galle
→ 02 green    30 DEC  THE CREATIVE COAST   card · Ahangama day reel (fort coffee → surf → cafés → stilts at golden hour → night)
→ 03 black/   31 DEC  THE COUNTDOWN        card · light ramp (Ahangama 09:30 → coast road → Mirissa → beach → sunset → 23:59)
     hibiscus                              · Midnight in Paradise (a curated coastal NYE, no venue named) · countdown → 2027
→ 04 PAPER    1 JAN   THE FIRST DAY        slow lines · prints (breakfast, Coconut Tree Hill, surfboards, hammock) · first swim
→ 05 lagoon   2 JAN   THE ASCENT           card · OCEAN → GREEN → THE CLIMB → TEA COUNTRY → ELLA · mountain sunset
→ 06 violet   3 JAN   THE FINALE           card · the Ella day as a pile of prints · the Last Supper (final night) + awards
→ 07 black    4 JAN   THE WAY HOME         roll: last breakfast → final views → the whole trip → Colombo · closing line
→ post-credits: THERE'S ONE MORE PLOT TWIST (locked, "revealed on Day 3")
→ what's included → who is this for → casting board → the details (₹54,999) → final CTA → form
```

The route has changed twice (Ella-first, then Kandy-first, now Galle-first).
Each time only content changed: every world keeps its component, layout,
palette and motion. Mirissa, Ahangama and Hiriketiya on 1 Jan are places to
drift to, not a schedule. The same route is in the PDF dossier
(make-srilanka-dossier.js).

## 3. The set pieces

| piece | file | how |
| --- | --- | --- |
| Hero | `IslandHero.tsx` | Two cuts of one montage — 16:9 and 9:16 — chosen once after hydration; art-directed poster via `<picture>` is the first paint. Pushes in and goes black as you leave. |
| Entry | `Entry.tsx` | WELCOME TO SRI LANKA in white on a black layer with `mix-blend-mode: multiply` over jungle footage → the island is visible *only through the letters*; the letters scale ×26 and you fly through them. |
| Chapter navigator | `Chrome.tsx` | `01 / 07 · THE BEGINNING · 29 DEC` pinned top, seven segments that fill per chapter, tap to jump. |
| Reels | `Kit.tsx → HorizontalReel` | Pinned sideways scroll, distance measured not assumed; reduced motion → native snap scroller. |
| Light ramp | `WorldCountdown.tsx` | Ten stages, one pinned frame, a clock that interpolates minute by minute, a wash that darkens and heats. |
| Countdown | `WorldCountdown.tsx` | 23:59:50 → 00:00:00 scrubbed by scroll, ring fills, then fireworks footage + canvas `Burst` + 2027. Scroll back = un-happen it. |
| Floating sunset | `WorldSaltSun.tsx` | Horizon rocks ±1°, a sun sinks through the frame, words float up out of the sea, bobbing out of step. |
| The secret | `WorldEnd.tsx → Secret` | Blurred frame, press-and-hold lock, a new refusal each try. Nothing about it is hinted, because nothing is decided. |

Fixed chrome is exactly two things (navigator + CTA) and lives *inside* `.sl`
so it inherits the colour tokens.

## 4. Performance

- Media mounts within ~a screen of the viewport and unmounts after (Bir's
  `Footage`); clips play only while visible. Reel panels use `mounted`
  (they're clipped by an overflow-hidden track, where an observer can't see
  them coming).
- All clips 1080p H.264 High (Quick Sync). Hero ≈ 13.5 MB (16:9) / 7.9 MB
  (9:16); other clips 3–10 MB. Only one cut of the hero ever loads; the poster
  is the first paint, and every other clip loads only near the viewport.
- Phones: no per-image filters, no endless push-ins (same guard as Bir).
- Everything honours `prefers-reduced-motion`: pinned sequences become flat
  sections, no autoplaying video.

## 5. What's honest, and what isn't decided

- **Price**: ₹54,999 per person (early bird ₹49,999, final ₹59,999), flights
  not included. Lives in `price` in content/srilanka.ts; the homepage card and
  the dossier read the same numbers.
- **Inclusions**: the brief's categories, flagged as being finalised.
- **Seats**: 16 — the brief's own number. Confirm.
- **Nine Arches** (3 Jan): no train time is stated anywhere — trains cross
  several times a day; check the timetable on the day.
- **Not named anywhere on purpose**: hotels, the NYE venue, restaurants,
  activity prices, which coastal town is the base. The tea estate is "to be
  confirmed".
- **Hiriketiya has no photo**: no openly licensed image of it exists on
  Commons/Openverse, so it is named in text only and never pinned to a
  photo of another beach. Add a real one when there is one.
- **The secret**: deliberately unwritten.
- Moment imagery (fireworks, parties, breakfasts, the boat, most footage) is
  from elsewhere and never labelled as Sri Lanka. Credits render on the page.

## 6. Shot list — real footage to replace the stand-ins

Same slot, same filename (see `public/videos/srilanka/VIDEOS.md`). Priority order:

| slot | what it must show | length | framing |
| --- | --- | --- | --- |
| `hero` / `hero-mobile` | Sri Lanka montage: south-coast drone, the blue train in the hills, jungle, people jumping into the sea, a beach party, NYE fireworks | 15–20s loop | 16:9 and native 9:16; keep the bottom-left third calm (title) |
| `fireworks` / `fireworks-gold` | The group on the beach at midnight, fireworks over the sea | 10–15s | wide, people silhouetted at the waterline |
| `train` | The blue train crossing Nine Arches, from the viewpoint | 10–15s | wide |
| `jungle` | Zipline POV or drone over the Ella gap | 10–15s | wide, looking down |
| `boat-sunset` | On deck at sunset off Mirissa, people in frame | 10–12s | horizon in upper third |
| `landing` | Window seat landing into Colombo | 10s | 9:16 |
| `road` / `tuktuk` | Van window, hill-country road; a tuk-tuk ride | 10s | centred vanishing point |
| stills | Ahangama villa + pool, breakfast, the Last Supper long table | — | real photos replace `pool`, `breakfast`, `dinner*` |
