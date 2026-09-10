# JOURNEY 02 — EDC THAILAND
## Design direction, written before a line of code

> **READ THIS FIRST — the page moved on after this document was written.**
> Everything below is the original direction and is still the reasoning behind
> the design. Five things changed during the build, and where the two disagree,
> **the code is right**:
>
> 1. **The hero video is a licensed, self-hosted clip**, not the embedded EDC
>    trailer. A cross-origin YouTube player could not be made seamless — it
>    booted slowly and drew its own title bar, spinner and pause button. The
>    official-trailer path is still in the component and returns if
>    `heroVideo.selfHosted` is cleared. See `public/videos/thailand/VIDEOS.md`.
> 2. **The hero was cut twice.** It is now four elements: the eyebrow, the
>    headline, one line, one button. Type over moving footage competes with the
>    footage in a way type over a still photograph does not.
> 3. **The itinerary board was removed.** The page is a TEASER: no day-by-day,
>    no price, no inclusions. `THE SHAPE` states 7D/6N and nothing else.
> 4. **No applications.** `<ApplicationForm/>` is not mounted. The only action
>    is pre-registration.
> 5. **The palette is violet → magenta → blush.** The cyan and the gold were
>    both tried and both cut — see the palette section, which is up to date.

---

## 0. WHAT THE EXISTING SITE ACTUALLY IS

Read first: `content/site.ts`, `content/goa.ts`, `content/journeys/journey00.ts` (Goa),
`content/journeys/journey01.ts` (Bali), `components/goa/*`, `components/Bits.tsx`,
`components/Brush.tsx`, `app/globals.css`.

**Two destination pages exist, and they are two *variants*, not two designs.**

| | Journey 01 — BALI | Journey 00 — GOA |
| --- | --- | --- |
| variant | `mystery` | `reveal` |
| posture | destination withheld, 5 hidden clues, guess box, reward | destination stated in the eyebrow, the four days are the story |
| spine | Hero → Setup → Collage → Statement → Cast → Mystery → Guess → Trust → Form | Hero → Ticker → Premise → Cast → 4 Chapters → Home Base → Ticker → Call Sheet → Fine Print → Final Beat → Form |

### The shared system — what is genuinely non-negotiable

1. **One h1, both pages: "You've found / the plot."** Serif line 1, brush line 2, marker
   underline under line 2. This is the masthead of the brand, not hero copy. A new
   destination page keeps the SENTENCE — Thailand sets one word inside it rather than
   replacing it. Everything else in the hero is a slot around it.
2. **Five fonts, no more.** Anton (display/uppercase), Instrument Serif (editorial italic),
   Permanent Marker (`font-brush`, the loud handwriting), Caveat (`font-hand`, the margin
   notes), DM Sans (body + 9–11px `tracked` metadata labels). Loaded once in `layout.tsx`.
   **A new page must not add a font.**
3. **`PlotButton` is the only button on the site.** A painted slab with a 6px *hard offset*
   shadow that the button slides off on hover. No pills, no gradients, no rounded corners.
4. **`SectionLabel`** — `01 ——— THE PREMISE`. Numbered from a single ordered array
   (`GOA_SECTION_ORDER`), never hardcoded, because hardcoding is exactly how Goa ended up
   with two `03`s.
5. **`Stamp`** — a 2px bordered, rotated, spring-in chip. The loudest small element available.
6. **`Ticker`** — a rotated (−1.6° / +1.4°) full-bleed marquee that overlaps the section
   above it by `-mt-4`. Used exactly twice per page: after the hero, and before the facts.
7. **`Note`** — handwritten Caveat, rotated, drifting in. Present in *every* section.
8. **`Scene`** — the background *is* the section. Full-bleed photo, per-scene scrim,
   grain on top, copy laid into it. There is deliberately no "text column + photo card"
   shape available anywhere on the site.
9. **The `.grain` overlay on every dark surface.** It's what makes photography join the
   ink-and-paper world instead of sitting on top of it.
10. **Copy lives in `content/`. Components read; they never hold words.** Unconfirmed facts
    are modelled as `confirmed: false` and render an honest "not announced yet" — see
    `goa.price` and `goa.inclusions`. **Nothing is invented to make a page look finished.**
11. **The rhythm rule** (from the comment at the top of `GoaPage.tsx`): light and dark
    alternate; immersion and information alternate. The page never runs two of the same
    kind of moment back to back.

### What is *not* shared, and therefore free

Goa and Bali have **zero photographs in common** and zero sections in common beyond the
Cast board and the form. Goa invented four bespoke chapter components with four different
visual worlds. **Precedent is explicit: a new journey gets a new visual world.** That is
the licence Thailand runs on.

---

## 1. THE CREATIVE CONCEPT

> **Goa is a film. Bali is a mystery. Thailand is a gate.**

The Plot Twist site has always used a *document* as its metaphor — a script with chapters,
a call sheet, a casting board, a clapperboard slate on every scene. Thailand keeps the
document idea and swaps the document.

**The page is a festival credential, and scrolling it is the walk from landing to mainstage.**

Not "a Thailand page with EDC photos on it." The information architecture itself converts:

| Goa's device | Thailand's device |
| --- | --- |
| `SceneSlate` — DAY · CHAPTER 01 | `GateSlate` — SET TIME · STAGE 01 · 13.7563° N |
| Chapters 01–04 | Stages / set times on a run-of-show board |
| THE CALL SHEET (the plain, honest section) | THE PASS (the back of the ticket — same plainness) |
| Polaroid with a handwritten scrap | Flash photo with a burned-in timestamp |
| Masking tape | Wristband tab |
| `Stamp` | Credential chip, neon-edged |
| Marker underline | Same underline, in magenta |

The emotional spine is one sentence, and it's the founder's own line from
`goa.ts` → `founder.pivot` — *"the best part of travelling was almost never the place."*
Thailand is the page where that line finally gets a headline:

> **THAILAND IS JUST WHERE IT HAPPENS.**

### The order of reveal

```
THAILAND  →  FESTIVAL  →  EDC  →  PLOT TWIST
```

The page opens on a place, immediately reveals the place is not the point, spends its peak
on the festival, and then — at the exact moment the visitor is most overwhelmed — cuts to
twenty faces and says *this is the part you can't buy a ticket to.*

### The one thing this page must not become

"Plot Twist Thailand Package — EDC Edition." The insurance against that is **the
handwriting**. Caveat and Permanent Marker on a near-black neon page is a combination no
EDM festival site has ever shipped, because it isn't a festival site — it's a scrapbook
someone kept *at* a festival. Every single section carries at least one handwritten note.
That is a hard rule, not a flourish.

### EDC branding — the standing constraint

EDC Thailand is named as **the event the trip is built around**, and never as a partner,
sponsor, organiser or affiliate. No EDC logo, no EDC artwork, no EDC typeface, no EDC
colourway, no recreation of an official campaign. The visual language is drawn from the
*generic grammar* of large night electronic festivals — lasers, haze, crowd silhouettes,
LED ribbon boards, credentials — all of which predate and outlive any one brand. A
disclaimer line ships in the page's own copy, in the plainest section, not buried.

---

## 2. MOODBOARD / VISUAL DIRECTION

**Darkness is the canvas. Neon is light cutting through it. Handwriting is the human.**

The canvas is a VIOLET black, not a neutral one, so the darkness itself belongs to the
palette and the accents read as light inside the environment rather than paint on top of it.

Six references, blended:

1. **Haze at 2am** — the actual look of a big outdoor night stage: a crowd in pure
   silhouette, atmospheric fog holding hard-edged laser planes, everything backlit, almost
   no local colour. Contrast is extreme; midtones barely exist.
2. **Disposable flash** — direct on-camera flash on faces in the dark. Blown highlights,
   red-eye, a date burned in the corner. The photographic *opposite* of the stage shots, and
   the reason the people sections feel real rather than promotional.
3. **LED ribbon board** — the horizontal strip above a stage running set times and text.
   Plot Twist already ships this component (`Ticker`). It just goes magenta and violet.
4. **The credential** — laminate passes, wristband RFID tabs, tiny mono legal text,
   holographic security foil, a scan-worn ticket edge. Where all the *small* type lives.
5. **Editorial travel print** — the restraint. Huge margins, one idea per screen, serif
   italic used sparingly and only for the emotional lines. This is what stops the neon.
6. **The Plot Twist scrapbook** — tape, rotation, red-pen, imperfect crops. Unchanged
   from Goa.

**Texture stack (bottom→top) on every dark section:**
photograph → per-section scrim → *one* laser plane (a single skewed gradient, slowly
sweeping) → grain → content. Never two light planes outside THE DROP. Never one over text.

**Explicitly rejected:** rainbow gradients, chrome 3D text, equalizer bars as decoration,
glitch/RGB-split, purple-to-pink meshes, spinning anything, "FESTIVAL" set in a distressed
grunge face. All of it reads as 2014 EDM stock.

---

## 3. PAGE ARCHITECTURE

Eight sections plus the form. The rhythm rule from `GoaPage.tsx` is preserved — but
inverted: on this page **dark is the default and light is the event.** There is exactly one
daylight section, and it is placed where the brief asks for the day→night contrast.

```
      00  THE GATE            night, full-bleed        HERO
          > LED ribbon        magenta on black         Ticker
      01  THE PREMISE         black, type-only         the argument
      02  THE RUN OF SHOW     black + neon             the itinerary, as a set-time board
  >>  03  THE DROP            pure black, full-bleed   THE EDC MOMENT — the peak
      03b THE LINEUP          black + magenta          the receipt: 7 headliners, 6 stages
      04  THE CAST            magenta (shared board)   the exhale. 20 people.
      05  BEYOND THE GATES    DAYLIGHT                 Thailand by day — the one bright screen
      06  THE PLOT            black, holo panels       why Plot Twist
          > LED ribbon        pink on black            Ticker
      07  THE PASS            black, plainest section  facts, price, inclusions, disclaimer
      08  GATES OPEN IN       black, countdown         final CTA
          THE APPLICATION     paper (shared, unchanged)
          FOOTER              ink (shared, unchanged)
      *   sticky CTA bar      mobile only
```

Mapping to the brief's seven beats: `01 ENTRY`→00 · `02 BUILD-UP`→02 · `03 FESTIVAL`→03 ·
`04 PEOPLE`→04 · `05 BEYOND EDC`→05 · `06 THE PLOT`→06 · `07 COUNTDOWN`→08.
Section 01 (THE PREMISE) is added — it's Plot Twist's connective tissue and the page's one
dense reading moment, exactly as on Goa.

**Why 05 is bright.** Six consecutive black sections would flatten into one long section
and the peak at 03 would stop reading as a peak. One sunlit screen at 05 does three jobs:
it makes 03 retroactively feel darker, it delivers the day→night contrast the brief asks
for, and it's where Thailand-the-country gets to be beautiful without competing with the
festival. It is followed immediately by a return to black, so the last thing before the ask
is night again.

---

## 4. THE HERO — "THE GATE"

### Headline directions explored

| # | Direction | Verdict |
| --- | --- | --- |
| A | THAILAND. BUT MAKE IT EDC. | "but make it X" is a spent meme format. Ages the page instantly. |
| B | WELCOME TO THE PLOT. EDC THAILAND AWAITS. | "Awaits" is brochure language. Plot Twist doesn't say "awaits". |
| C | THIS ISN'T A THAILAND TRIP. THIS IS EDC. | Strong, but defensive — it argues with an objection nobody has made yet, and it dismisses Thailand, which section 05 then has to sell back. |
| D | YOU'RE NOT GOING TO THAILAND. YOU'RE GOING UNDER THE LIGHTS. | Good line. Too long for the biggest type on the site. |
| E | **NOW FIND THE MAINSTAGE.** | **Chosen — as the line UNDER the headline.** |

**And then the headline itself changed.** The h1 no longer matches Goa and Bali word for
word. It reads:

> You've found
> **the EDC plot.**

The brand's own fixed sentence, with the festival set *inside* it — not announced above it
in small type, not appended after it. EDC is typeset in the display face at a larger size
than the Permanent Marker either side of it, in sand with the page's brightest bloom behind
it, which makes it the loudest three letters in the hero. The sentence stays recognisable at
a glance; the thing the trip is actually about is now load-bearing inside it.

**Why E wins.** It's the only option that doesn't replace the brand's fixed h1 — it
*answers* it. Both existing heroes open with "You've found the plot." On Thailand, the very
next line turns that sentence into a festival instruction. The continuity is total and the
twist is total, in four words. It also puts the visitor *inside* the premise on line three
instead of describing it to them.

### The hero stack

```
  +- PLOT TWIST logo ------------ TRAVEL / PEOPLE / PLOT TWISTS -+
  |                                          @plottwist.social  |
  |                                                             |
  |                              ~ daylight is optional          |   <- handwritten, floating
  |                                                             |
  |  EDC THAILAND · DEC 18-20, 2026                            |   <- eyebrow, magenta, Anton
  |                                                             |
  |  You've found                                               |   <- Instrument Serif
  |  the EDC plot.                                              |   <- Marker + Anton "EDC" + magenta underline
  |                                                             |
  |  NOW FIND THE MAINSTAGE. Thailand is just where it happens. |   <- ONE line: Anton + serif
  |                                                             |
  |  [ ENTER THE PLOT -> ]   ~ twenty wristbands. that's it.    |
  |                                        GATES THIS WAY v     |
  +-------------------------------------------------------------+
```

**The environment behind it** (`GateBackdrop`, the counterpart to `SunsetBackdrop`):
a painted night gradient underneath (so a slow image never shows a black hole) → the crowd
photograph → a UV/magenta multiply grade → **two laser planes**, one slow sweep and one
static, both skewed, both `mix-blend-screen` → a haze bloom behind the headline → legibility
scrims → grain. Exactly the layer count of `SunsetBackdrop`; entirely different output.

**What is deliberately absent from the first screen:** price, itinerary, inclusions, a
second CTA, a nav bar, social proof.

**A whole copy tier was cut after the first build.** The hero originally carried a
display-size secondary headline, an italic subheading, a fact row and a tagline — the same
four-line stack the Goa hero runs. It was wrong here for one structural reason: **those
heroes sit over a still photograph and this one sits over moving footage.** Every line of
type over video is a line the visitor reads instead of watching a crowd go up. The hero is
now four things — what it is, the headline, one line, one button — plus the trip's facts at
metadata size, because the LED ribbon 200px below already says them at full volume.

---

## 5. SECTION BY SECTION

### 01 — THE PREMISE · "YOU COULD JUST BUY A TICKET."

Type-only, black, no photograph — the direct counterpart of Goa's premise section, which is
also deliberately image-free. It kills the one real objection on the spot:

> **YOU COULD JUST BUY A TICKET. OR YOU COULD MAKE A PLOT OUT OF IT.**
>
> Anyone can buy a ticket. Anyone can book a hostel.
> We bring the right people into the story.
> *You can buy a wristband. You can't buy the nineteen people wearing the other ones.*

One `Stamp`: `20 WRISTBANDS. NO FILLERS.` One handwritten note: *"that's the whole idea."*
The only ornament is a single laser rule bleeding off the right edge.

### 02 — THE RUN OF SHOW · the itinerary as a set-time board

Never a bulleted list. A **stage timetable**: a left rail of set times, day cards that read
like a lineup poster.

```
  SET TIME          DAY 01                        [ TBA ]
  -- 15:00 --       LANDING                        +------------+
                    Touchdown. Check in.           | photo slot |
                    Meet the twenty.               +------------+
                    ~ nobody's shy by the second round.

  -- 11:00 --       DAY 02  STREETS / WATER / NEON
  -- 16:00 --       DAY 03  THE MAIN EVENT   <- marked, oversized, neon
  -- 12:00 --       DAY 04  AFTER HOURS
```

Day 03 breaks the grid on purpose: bigger type, a neon edge, a `MAINSTAGE` credential chip.
The board is built from a `days[]` array where every unconfirmed field renders `[ TBA ]` in
a mono chip rather than a plausible invention. **No hotel, activity, time or date is written
until it is confirmed.**

### 03 — THE DROP · **the EDC moment**

The section where the page stops behaving like a website. Full viewport, pure `#05050A`,
no padding, no section label, no nav.

Sequence, scroll-driven:

1. Black. A single hairline of violet-into-magenta grows across the screen.
2. A soundwave — 64 deterministic bars, scaling from the centre outward — rises and settles.
3. Four words arrive one at a time, each a full display line, each with a neon bloom
   appearing *behind* it a beat after the letterform:
   **ELECTRIC. / LOUD. / UNREAL. / EDC THAILAND.**
4. Beat of silence.
5. Handwritten, small, off-centre, at an angle: *and you're going with the plot.*

The scale drop from the fourth line to the fifth is the whole point of the section — the
loudest type on the site, then a person's handwriting. That contrast *is* Plot Twist.
No photograph is required for this to work, which is deliberate: it's the one section that
is finished today, with no asset dependency.

### 03b — THE LINEUP · the receipt

Added after the first build, and it earns its slot by *where* it sits. THE DROP is pure
feeling — three words and a festival name. This section is the proof for it: seven names a
visitor already knows do more to make "EDC THAILAND" concrete than any adjective could, and
they land hardest **directly after** the emotional claim. Putting the bill first would spend
the proof before the promise.

Typeset as the poster is: a stacked wall of names in the display face, one per line, hairline
between, a tiny genre tag in the margin. **No artist photography, no artist logos, no
stage-brand artwork** — names as type only.

Every name is published fact, verified against the organiser's June 2026 announcement for
the December edition: **Martin Garrix, Tiësto, Charlotte de Witte, DJ Snake, Dom Dolla,
Above & Beyond, Andy C**, across six stages. An on-screen note says the bill is the
organiser's and subject to their changes, because it is.

It closes on the line that hands the page back to Plot Twist — *"You can read a lineup
anywhere. You can't pick who you're standing next to."* — which sets up the section directly
below, whose bridge reads *"The lineup gets announced. The cast gets picked."*
**Three sections, one argument: the festival, the proof, the people.**

### 04 — THE CAST · the exhale

The **shared `WhatsATen` casting board, unchanged**, in `compact` mode. It already renders
on a dark magenta radial with `text-sand`, so it drops into this page with no restyling —
and that's the right call: the Cast board is the master concept across every journey and
must not be reinterpreted per destination. Only its stamp (`CASTING — JOURNEY 02`), its
three photo scraps and its bridge line are per-journey.

Bridge copy: **"20 PEOPLE. ONE CREW. ONE FESTIVAL."** / *"The lineup's announced. The
cast isn't."*

### 05 — BEYOND THE GATES · Thailand, in daylight

The one bright screen. Warm, over-exposed, sunlit — an editorial photo grid (islands, street
food, longtails, markets, the hangover swim) with handwritten scraps and burned-in
timestamps. The copy holds the hierarchy in place:

> **THE FESTIVAL IS THE REASON. IT ISN'T THE WHOLE STORY.**
> *Four days. One of them is EDC. The other three are why people book the next one.*

Then a hard cut back to black.

### 06 — THE PLOT · why Plot Twist

Four **holographic credential panels** — translucent, 1px neon edge, backdrop-blur, a
faint diagonal foil sheen. Never corporate:

| | |
| --- | --- |
| YOU'RE NOT JOINING A TOUR | You're joining a crew. Twenty people, picked one at a time by a person who reads every application. |
| THE FESTIVAL IS ONE CHAPTER | Thailand is another. The nights nobody planned are the rest. |
| HOSTS, NOT GUIDES | People who are at the festival with you, not holding a flag outside it. |
| ROOM FOR THE UNPLANNED | Some of it is scheduled. The best parts won't be. |

### 07 — THE PASS · the plainest section on the page

Directly modelled on Goa's `TheFacts` — and it works for the same reason: after four
immersive screens, one plain document reads as the section that isn't selling. Laid out as
**the back of a ticket**: a tear-perforation rule, mono metadata, a QR-shaped decorative
block, and the six basics in a three-column grid. Price and inclusions run through the same
`confirmed: false` machinery as Goa's, so they render "NOT ANNOUNCED YET — ask us" until
real numbers exist. **The EDC affiliation disclaimer lives here**, in plain type, at full
contrast.

### 08 — GATES OPEN IN · the final beat

Countdown, dates, seats left, CTA.

**The countdown is honest.** No confirmed date exists, and a countdown to an invented date
is a fabricated fact. So the component takes `target: string | null` and, until a date is
set, runs a **live Bangkok clock** with the gate state reading `GATES — TBA`. It still
ticks, it still animates, it still creates urgency, and it lies about nothing. Set the
target and the identical component becomes a real countdown with no other change.

> **THE LINEUP GETS ANNOUNCED. THE CAST GETS PICKED.**
> *Twenty wristbands. You want one.*
> **[ ENTER THE PLOT -> ]** *~ see you after dark.*

---

## 6. TYPOGRAPHY & COLOUR

### Type — five faces, zero new loads

| role | face | usage |
| --- | --- | --- |
| DESTINATION / FESTIVAL / the loud lines | **Anton** (`font-display`) | uppercase, `clamp(2.2rem, 12vw, 7.5rem)`, `leading-[0.86]`, `tracking-[-0.01em]`. The lineup voice. |
| the emotional line | **Instrument Serif** italic (`font-serif`) | one per section, never two. |
| the twist / the h1's second line | **Permanent Marker** (`font-brush`) | rationed — the h1, and the section 03 sign-off. |
| annotations | **Caveat** (`font-hand`) | at least one per section. Non-negotiable. |
| metadata / technical labels | **DM Sans** | 9–11px, `letter-spacing: 0.28em` (`.tracked`), uppercase. Set times, coordinates, gate numbers, credential fields. |

**Hierarchy, largest → smallest:** `EDC THAILAND` (03) → `NOW FIND THE MAINSTAGE` (hero) →
day titles (02) → section headlines → serif emotional lines → body → handwriting → metadata.

Only the display face ever exceeds 2rem. The technical labels never exceed 11px. The gap
between those two extremes is where the festival feeling actually comes from.

### Colour

```
  --edc-void      #0A0414   canvas. ~95% of the page's pixels. A VIOLET black, not a neutral one.
  --edc-deep      #170727   the second black — section gradients
  --edc-panel     #1A0A2E   credential stock, ticket stub
  --edc-violet    #8B3DFF   GLOW AND FILL ONLY, never text
  --edc-hot       #FF2E7E   magenta — the primary accent, text-safe
  --edc-blush     #FF7FA8   the soft step — secondary tags, ordinary days
  --edc-chrome    #D6CFE6   metallic — hairlines, mono labels, credential edges
  sand            #FFF1DC   <- EXISTING BRAND SAND. Body copy, and the max-emphasis type.
```

**The palette is one continuous arc: violet → magenta → blush.** Every hue is adjacent to
the next, so any two of them together read as the same stage lit from two angles rather than
as two light sources fighting. `#FF2E7E` is a half-step off the theme's own
`--color-pink`, which is what keeps the page inside the brand ecosystem.

**Two things were tried and cut, and both failed the same way.** First a cyan/pink pairing on
neutral black: opposite sides of the wheel with nothing between them, so it clanged. Then a
gold step (`#FFC93C`): the footage itself contains no yellow — EDC after dark is violet,
magenta and lilac light on skin tones — so gold sat *outside* the environment and read as
ugly at any tuning. **The rule that came out of both: no fourth hue. Every clash this page
has had came from adding one.**

**The brightest thing on the page is not a colour.** Where a line needs maximum emphasis —
the EDC lockup in the hero, the payoff line in THE DROP, the countdown digits — the type is
set in **sand** with a magenta-into-violet bloom behind it (`.edc-glow-max`). That is how
festival signage actually reads: white-hot type with coloured light spilling off it. It
cannot clash with the footage, and it stays the loudest element in any frame.

**Accessibility, as a hard rule:**
`#FFF1DC` on `#0A0414` ≈ **17:1** ok · `#FF7FA8` ≈ **8.6:1** ok ·
`#FF2E7E` ≈ **5.3:1** ok · **`#8B3DFF` ≈ 3.6:1 FAIL** — which is why violet is a
*light source* in this system and never a text colour. Body copy sits
at `sand/85` minimum, never below `sand/60` for anything load-bearing.

---

## 7. MOTION SYSTEM

Everything below is `transform` + `opacity` only — no layout-triggering animation anywhere.
`framer-motion` is already a dependency; nothing new is installed.

| device | where | how |
| --- | --- | --- |
| **laser sweep** | hero, section 03 | one skewed linear-gradient bar, `mix-blend-screen`, 9–14s `translateX` loop. Max one per section. Never crosses text. |
| **live grain** | all dark sections | existing `.grain` + a `steps(8)` 0.8s micro-translate. Sub-pixel. |
| **stage-light reveal** | section headlines | the neon bloom fades in ~120ms *after* the letterform, so the type arrives first and the light catches up. |
| **announcement type** | section 03 | `Stagger`, 0.42s between lines. Deliberately slower than the site's 0.09s default — an announcement, not a list. |
| **soundwave** | section 03 | 64 bars from a fixed seeded array, `scaleY` driven by scroll progress. Deterministic: same shape every load, no audio API, no randomness. |
| **wristband fasten** | section 02 entry | the set-time rail draws downward as the board enters. |
| **slow parallax** | hero, 05 | ±6% background translate. Never more. |
| **marquee** | 2 tickers | existing `Ticker`, unchanged. |
| **countdown flip** | section 08 | digits translate up one row on change. |

**Banned:** glitch, RGB split, rotation, flashing above 1Hz, more than one gradient in
motion at a time, any animation on a surface a user is reading.

**`prefers-reduced-motion`** kills every sweep, the grain drift, the soundwave and the
parallax; the countdown falls back to a plain number tick. `globals.css` already zeroes
durations globally, and every component additionally branches on `useReducedMotion()`,
matching the existing codebase.

---

## 8. MOBILE

Mobile-first, and the mobile page is not a squeezed desktop page.

- **`min-h-[100svh]`, never `vh`.** iOS chrome pushes `vh` content under the address bar —
  the existing `Scene` component already documents this.
- **Two crops of one file per full-bleed image** (`focalMobile` / `focal`), the existing
  `Scene` pattern. A wide crowd shot loses its subject in portrait otherwise.
- **Sticky CTA bar** — new for this page, and the one place Thailand adds UI Goa doesn't
  have. Appears after the hero leaves the viewport, disappears at the application form,
  respects `env(safe-area-inset-bottom)`, and sits at `z-40` — **below** the `z-50` tea cup,
  which is offset upward while the bar is showing so the two never collide.
- **Section 03 reflows** to a single centred column; the soundwave halves its bar count.
- **Section 02's** two-column set-time rail becomes a single stacked column with the time as
  a chip above each day.
- **All display type clamps** with a `vw` middle term; nothing has a fixed px size above 11px.
- **Video is desktop-only**, `preload="metadata"`, muted, `playsInline`, and never on the
  LCP element. **No autoplaying audio anywhere, ever.**
- Tap targets >= 44px; `touch-manipulation` on every CTA (already in `PlotButton`).

**Performance budget:** zero new fonts, zero new npm packages, one `priority` image (the
hero), everything else lazy, `next/image` with real `sizes` on every slot, no CSS filters or
`backdrop-blur` on scrolling surfaces except the four static panels in section 06.

---

## 9. CTA STRATEGY

One action on the entire page: **request an invite**. Every CTA is the same `PlotButton`
pointing at `#apply`, tracked through the existing `PLOT_EVENTS.requestInvite` so the
Thailand funnel is directly comparable to Goa's.

| position | label | why |
| --- | --- | --- |
| hero | **ENTER THE PLOT ->** | doubles as a gate verb and the brand verb. |
| after 03 (the peak) | **I'M GOING ->** | placed at maximum emotion. First-person on purpose — the visitor says it, not us. |
| sticky bar (mobile) | **ENTER THE PLOT ->** | persistent, low-commitment. |
| after 07 | **GET THE FULL PLOT ->** | information-seeking intent, → WhatsApp, not the form. The one CTA that isn't the form. |
| final (08) | **ENTER THE PLOT ->** | the close. |

Microcopy beside CTAs — small, handwritten, never more than one per button:
*twenty wristbands. that's it.* · *not everyone gets one.* · *see you after dark.*

**Deliberately absent:** "Book Now", "Enquire", urgency counters that aren't real, discount
badges, and any second competing action. The tea cup (WhatsApp) remains the only other exit.

---

## 10. WHAT THIS PAGE DOES NOT KNOW YET

Per the brief and per `content/goa.ts`'s own rule — **nothing is invented.** Every item
below ships as a marked placeholder that renders honestly and flips on with a one-line
content change:

| unknown | how it renders today |
| --- | --- |
| ~~EDC Thailand dates~~ | **RESOLVED** — 18–20 December 2026, Rhythm Park, Laguna Phuket. Verified against Insomniac's press site, and sourced on-page. |
| ~~the countdown target~~ | **RESOLVED** — a real countdown to a real published date. The live-clock fallback stays in the component for if that date is ever cleared. |
| ~~the lineup~~ | **RESOLVED** — seven headliners and six stages, verified against the organiser's announcement. |
| trip length / day count | `[ TBA ]`, one constant |
| hotel / accommodation | section omitted entirely (not faked with a stock hotel) |
| itinerary specifics | day cards carry titles and `[ TBA ]` detail chips |
| price | Goa's `confirmed: false` path → "NOT ANNOUNCED YET" |
| inclusions / exclusions | same mechanism |
| **photography** | **every image slot ships `src: null` and renders a designed light-plate instead** |

**On photography specifically:** no Thailand or festival image in this repo is licensed, and
sourcing one without verifying its licence is exactly the mistake `public/photos/goa/PHOTOS.md`
was written to prevent (it records a per-file `plus:false / premium:false` check, and two
otherwise-perfect candidates rejected on licence grounds alone). So the page ships with a
`LightPlate` fallback — a composed gradient-and-laser panel carrying the frame's caption and
timestamp — in every photo slot, and a shot list in `public/photos/thailand/PHOTOS.md`
naming exactly what to source for each one. The page reads as finished and claims nothing
false, which is the same posture `homeBase` already takes with its null slots.
