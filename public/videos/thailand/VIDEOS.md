# Journey 02 — hero footage: provenance & licence

## The file

`festival-night.mp4` — 1920×1080, 24fps, ~4.6 MB.

| field | value |
| --- | --- |
| source | Pexels |
| page | https://www.pexels.com/video/people-dancing-and-cheering-at-a-rave-party-14670415/ |
| id | `14670415` |
| file | `14670415-hd_1920_1080_24fps.mp4` |
| licence | **Pexels License** — https://www.pexels.com/license/ |
| verified | 11 September 2026 |

## Why this licence is sufficient

The Pexels License was read in full before the file was downloaded, not assumed
from the word "free". It explicitly permits:

- **commercial use** — ads, marketing, e-commerce
- **hosting on your own website, blog or app** — which is what we do here
- **modification**
- and requires **no attribution**

Its prohibitions, and how this use stays inside them:

| prohibition | why we're clear |
| --- | --- |
| don't portray identifiable people badly or offensively | crowd is distant and in silhouette; nobody is singled out |
| don't sell unaltered copies as a product | it's a page background, not a product |
| don't imply people or brands endorse you | see the affiliation note below — this is the important one |
| don't redistribute on competing stock sites | n/a |
| don't use as part of a trademark or business name | n/a |

## THE IMPORTANT PART: this is NOT EDC footage

This clip is generic night-festival footage. **It was not shot at EDC Thailand,
it is not published by Insomniac, and nothing on the page may present it as
either.** The affiliation disclaimer in THE PASS states in plain text that
footage on the page is licensed stock and is not from EDC Thailand.

Do not caption this clip with an EDC name, an EDC date, or a stage name, and do
not put it directly beside a claim that would read as a caption for it.

## Why not the official EDC trailer

It was built first, and it worked: Insomniac's official "EDC Thailand 2026
Trailer" (`c7ZgG8GvebM`), embedded through YouTube's own player, verified
official via the oEmbed endpoint. That path is still in
`components/edc/HeroVideo.tsx` and still runs automatically if
`heroVideo.selfHosted` is ever set back to `null`.

It was replaced for one reason: a third-party iframe player cannot be made
seamless. It takes seconds to boot, and it draws its own furniture — a title
bar, a spinner, a pause affordance — that cannot be styled or removed from
outside a cross-origin frame.

**Downloading and self-hosting the EDC trailer was considered and rejected.**
"Publicly viewable on YouTube" is not a licence to copy a work onto a
commercial website. Embedding plays the publisher's file from the publisher's
servers through the player they provide for that purpose; self-hosting makes an
unlicensed copy and distributes it. The first is how the web works; the second
is infringement.

## Replacing this file

The real answer is our own footage, once Journey 02 has actually run. When that
exists, drop it here, update this file with the same fields, and point
`heroVideo.selfHosted` at it. Nothing else changes.

If you replace it with other stock, **read that licence in full first** and
record the same table above. This folder exists for the same reason
`public/photos/goa/PHOTOS.md` does.
