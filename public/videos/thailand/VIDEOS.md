# Journey 02 — hero video: what these files are

Two video files live here. **Only one of them is licensed to us.** Read this
before changing which one plays.

---

## `edc-hero.mp4` — CURRENTLY LIVE, and NOT licensed

| field | value |
| --- | --- |
| what | 24-second silent loop, seconds **93–117** of the official *EDC Thailand 2026 Trailer* |
| rights holder | **Insomniac Events** (and/or the trailer's producers) |
| our licence | **none** |
| source | `youtube.com/watch?v=c7ZgG8GvebM` — Insomniac's official channel |
| how it got here | downloaded by the site owner with yt-dlp, 11 Sep 2026; trimmed and re-encoded locally |
| encode | 1600×900, H.264 high, CRF 31, no audio, `+faststart`, ~6.2 MB |

### The position, stated plainly

This is a copy of a copyrighted work being served from a commercial website.
It was not cleared, and nobody should later assume it was.

- The site owner obtained the source and directed this use on **11 September
  2026**, after the risk was raised and explained more than once.
- **"Publicly viewable on YouTube" is not a licence to copy.** Embedding plays
  the publisher's file from the publisher's servers, through the player they
  provide for that purpose. This does not.
- The realistic consequence is a takedown notice, and potentially more.

### Why the window is 93–117s

Chosen from the actual frames, not guessed. It runs: DJ with arms up against
the ferris wheel → the magenta crowd-and-pyro shot → confetti over the decks →
stage pyro → crowd with hands up → fireworks over the mainstage. All night, all
festival, and dominantly magenta/violet — which is the page's own palette.

It **stops at 117s on purpose.** The trailer ends on an EDC logo end-card at
~125s. Looping into that would put the festival's wordmark on our hero, which
is a straightforward trademark problem on top of the copyright one.

### Two safe exits, both one field

In `src/content/thailand.ts`, on `heroVideo`:

1. `selfHosted: "/videos/thailand/festival-night.mp4"` → the licensed clip
   below. Nothing else changes.
2. `selfHosted: null` → falls back to the **official YouTube embed** of this
   same trailer, credit line and all. That is the lawful way to show this
   footage, and the code path is intact and tested.

---

## `festival-night.mp4` — the licensed fallback, kept deliberately

| field | value |
| --- | --- |
| source | Pexels — https://www.pexels.com/video/people-dancing-and-cheering-at-a-rave-party-14670415/ |
| id | `14670415` |
| licence | **[Pexels License](https://www.pexels.com/license/)** — commercial use, self-hosting and modification permitted; no attribution required |
| verified | 11 September 2026, licence read in full before download |
| what | generic night-festival crowd, mainstage, pyro. 1920×1080, ~4.6 MB |

**This is not EDC footage** and must never be captioned as though it is. It is
kept in the repo — not deleted — precisely so exit (1) above is a one-word
change rather than a re-sourcing exercise.

---

## What the page claims either way

`pass.disclaimer` in `src/content/thailand.ts` is mandatory copy and renders at
full contrast inside THE PASS. It currently states that the hero video is
festival footage from EDC Thailand's own trailer and belongs to its makers, and
that Plot Twist is not a partner, sponsor, organiser, reseller or affiliate.

**If you change which file plays, change that sentence in the same commit.** It
described the video as "licensed stock" until this file replaced it, and a
disclaimer that has quietly gone false is worse than no disclaimer.

## The upgrade that ends all of this

Our own footage, shot on Journey 02. At that point the hero is genuinely ours,
the licence question disappears, and the trip sells itself with its own
pictures instead of the organiser's.

Photography provenance is recorded separately in
[`public/photos/thailand/PHOTOS.md`](../../photos/thailand/PHOTOS.md).
