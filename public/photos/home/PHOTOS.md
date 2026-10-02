# The brand homepage — photography & provenance

Every image the homepage (`/home`, `components/home/`) renders lives in this
folder, wired up in `src/content/home.ts`. Nothing here is shared with a
journey page.

## Licence

All 34 stock files below are **Unsplash photos under the [Unsplash Licence](https://unsplash.com/license)** —
free to use commercially, no permission and no attribution required. Each was
checked for `"premium": false` and `"plus": false` before download; Unsplash+
is a paid licence and none were used. Downloaded 30 September 2026.

## TWO KINDS OF PHOTOGRAPH, KEPT APART

**Stock (Unsplash) — places only.** Everything below the "trip-" rows contains no
posed people and no crowds. Until enough real trips exist to fill a whole page,
posed models pretending to be travellers were the wrong bet, so the worlds, the
reveal, the principle prints and the final scene are all scenery.

**Real Plot Twist trips — the wall ("NOT A BROCHURE. A FEELING.").** The ten
`trip-*.jpg` files are the club's own photographs, copied from the
"Glimpses from the plot" archive (`archive/src/`) and the casting posters
(`casting-assets/`). They are not stock and are not from Unsplash, so the
Unsplash Licence does not apply to them — see the table further down.

> **Before launch:** confirm everyone pictured is happy to be on a public
> homepage. These were shared for the earlier "Glimpses from the plot" post,
> which is a different audience and a different context from a site anyone can
> land on. Individual cast portraits (`cast-assets/`) were deliberately NOT used.

The wall is set to `mode: "trips"` in `src/content/home.ts`. Its captions are
playful, not factual: none names a place or a trip.

## THE JOURNEY WORLDS ARE LOCATION-VERIFIED

Goa, Bir, Thailand and Sri Lanka frames were filtered by the **location Unsplash
records for each photograph**, not by its title or tags — so a "Goa" frame was
taken in Goa. The "where" column is that recorded location.

Two honest limits:

- **Vasco da Gama (Goa)** was searched for by name and rejected. The only free
  photographs tagged there are a naval-museum helicopter, a snapped church and a
  rocky shoreline — not hero-grade. The Goa world uses Goa's strongest real
  places instead. If you have your own Vasco da Gama photographs, drop them in
  and add them to `GOA_VIDEO`.
- **`thailand-dusk`** is recorded only as "Thailand". Everything else in the
  Thailand world is Phuket or Krabi. Swap it if you want every frame pinned to
  a place.

## RESOLUTION

Journey-world files, the reveal and the final scene are stored at up to
3840px wide (JPEG, mozjpeg q82) — full-bleed, and a phone at 3× needs them.
Principle prints and wall tiles are 1800px. Next serves them at quality 90
(`images.qualities` in `next.config.ts`; its default is 75, which softened
skies and left banding).

## The files

Stock rows first; the last ten rows (`trip-*`) are the club's own photographs.

| file | unsplash id | photographer | recorded location | original | slot |
| --- | --- | --- | --- | --- | --- |
| `goa-vagator.jpg` | `YVYRaXhGUhs` | Avin CP | Vagator Beach, Goa | 6048x4024 | Goa world (poster) |
| `goa-aguada.jpg` | `sqTxn6pcxVM` | Hiren Harsora | Aguada Fort area, Candolim, Goa | 6000x4000 | Goa world |
| `goa-butterfly.jpg` | `YZ1gYMlWb5E` | Zoshua Colah | Butterfly Beach, Devalkajjan, Goa | 5472x3648 | Goa world |
| `goa-dudhsagar.jpg` | `2SClsGyrt1g` | Venki Allu | Dudhsagar Falls, Sonauli, Goa | 4297x2846 | Goa world |
| `goa-palolem.jpg` | `eSRtxPd9q1c` | Sumit Sourav | Palolem Beach, Goa | 5832x3888 | Goa world |
| `bir-hills.jpg` | `lUQp_ZdMi14` | Damini | Bir, Himachal Pradesh | 5184x3456 | Bir world |
| `bir-billing.jpg` | `-58-oGcFYBs` | Bir Billing India | Bir Billing landing site, Himachal Pradesh | 4176x2784 | Bir world (poster) |
| `bir-chokling.jpg` | `Dk0zS-khYTo` | Jack Sparrow | Chokling Monastery, Bir Road, Bir | 12278x8185 | Bir world |
| `bir-stupa.jpg` | `-7VqJemQW8w` | Arsh.D.sonda | Bir, Himachal Pradesh | 4896x2752 | Bir world |
| `bir-road.jpg` | `XubT_coeOxg` | Abhinav | Bir, Himachal Pradesh | 3841x5462 | Bir world (stored at 2400px wide) |
| `thailand-kalim.jpg` | `QqD5zsQL16U` | Ivan Ragozin | Kalim Beach, Kathu, Phuket | 5464x3640 | Thailand world (poster) |
| `thailand-dusk.jpg` | `JE01L3hB0GQ` | v2osk | Thailand (recorded at country level only) | 4164x2716 | Thailand world |
| `thailand-krabi.jpg` | `YbnJy7-nqpc` | Andreas M | Krabi, Thailand | 5755x3620 | Thailand world |
| `thailand-oldtown.jpg` | `JKbVkKzI0TM` | Vaskar Sam | Old Phuket Town, Phuket | 6000x4000 | Thailand world |
| `twist-reveal-lake.jpg` | `Nvdo48sQNrk` | David Billings | not recorded (generic lake) | 3380x3402 | THIS ISN'T A TRIP — the reveal |
| `twist-fill-sky.jpg` | `3dRHnsJN82E` | Emerson Peters | not recorded (generic sky) | 4272x2848 | inside the letters of PLOT TWIST. |
| `calm-lake.jpg` | `MKddvpUfIWw` | Katelyn G | not recorded | 3064x4592 | Principle 01 |
| `calm-dunes.jpg` | `GeReAnOMiZ8` | Ze Paulo | not recorded | 6000x4000 | Principle 02; COMMUNITY_VIDEO poster |
| `calm-falls.jpg` | `0lQIJQ2aqVQ` | Florian GIORGIO | not recorded | 5191x3461 | Principle 03 |
| `calm-tide.jpg` | `DA_tplYgTow` | Yousef Espanioly | not recorded | 5758x3829 | Principle 04 |
| `calm-bay.jpg` | `2Fbn7JWAZkc` | Miltiadis Fragkidis | not recorded | 4056x3040 | Principle 05 |
| `end-sun.jpg` | `a3xymeWNDso` | Explore with Joshua | not recorded | 3000x2000 | Final scene (poster) |
| `end-dusk.jpg` | `umBi-QFWPKA` | Rafael Garcin | not recorded | 3456x4608 | Final scene |
| `end-pink.jpg` | `Tqfaa46DRD0` | yagmur celik | not recorded | 3024x4032 | Final scene |

| `trip-bridge.jpg` | — | Plot Twist archive | Four friends, selfie, on a footbridge held by giant stone hands | 1280x960 | Wall |
| `trip-couple.jpg` | — | Plot Twist archive | Two friends on a stone path at golden hour | 960x1280 | Wall (tall) |
| `trip-pool.jpg` | — | Plot Twist archive | The whole group by the pool at night — same frame as the Goa page's group photo | 629x550 | Wall (low-res original) |
| `trip-guys.jpg` | — | Plot Twist archive | Six friends lined up on a path at dusk | 960x1280 | Wall (tall) |
| `trip-mirror.jpg` | — | Plot Twist archive | A group caught in a round road mirror | 960x1280 | Wall (tall) |
| `trip-girls.jpg` | — | Plot Twist archive | Two friends in a street-cafe selfie | 1280x960 | Wall |
| `trip-fire.jpg` | — | Plot Twist archive (casting-assets/s5-fire) | Friends toasting around a fire at night | 1080x1350 | Wall (tall) |
| `trip-path.jpg` | — | Plot Twist archive | A big group posing on a path in the evening | 1280x960 | Wall |
| `trip-mirror2.jpg` | — | Plot Twist archive | Friends in a curved mirror by the road | 960x1280 | Wall (tall) |
| `trip-waiting.jpg` | — | Plot Twist archive (casting-assets/s6-waiting) | Loungers by a pool, sun setting over the sea | 1080x1350 | Wall (tall) |

| `srilanka-colombo.jpg` | `rxMPvBoo8Vc` | Zoshua Colah | Kollupitiya, Colombo, Sri Lanka | 8108x5068 | Sri Lanka world |
| `srilanka-ella.jpg` | `ySl4ry2hjP0` | Datingscout | Little Adam's Peak, Sri Lanka | 4032x3024 | Sri Lanka world |
| `srilanka-train.jpg` | `Dw9dWTzzsUE` | Adam Vandermeer | Ella, Sri Lanka (the blue train on the Nine Arch Bridge) | 6000x4000 | Sri Lanka world (poster) |
| `srilanka-mirissa.jpg` | `cuZbrYoimv8` | Sarmat Batagov | Mirissa Beach, Mirissa, Sri Lanka | 4032x3024 | Sri Lanka world |
| `srilanka-sunset.jpg` | `Z64DP0otOYs` | Matt Dany | Mirissa, Sri Lanka | 5848x3899 | Sri Lanka world |
| `srilanka-stilt.jpg` | `0cCGQd1K5AM` | Geoff Brooks | Koggala Beach, Koggala, Sri Lanka (stilt fishermen) | 4913x3044 | Sri Lanka world |

## BALI IS OFF THE SITE FOR NOW

Journey 01 (Bali) is retired — see `retired` in `src/content/journeys/types.ts`.
Its four homepage photographs were deleted with it. They are all on Unsplash;
search the ID to get them back if Bali returns: `PXl3L6A1hRE` (Ulun Danu),
`2pE_uUpYWYc` (terraces), `OQRkj2erTPI` (Batu Bolong), `RBVlbLEYGc8` (Tanah Lot).

## SRI LANKA: WHY THE JOURNEY'S OWN PHOTOS ARE NOT HERE

Journey 4 (`/journey/4`) has its own 37 photographs and a set of clips in
`public/photos/srilanka` and `public/videos/srilanka`. Most are Wikimedia
Commons CC BY / CC BY-SA, which require a visible credit, and the landing page has
no credits line. These six Unsplash frames — all with a recorded Sri Lankan
location, all on the trip's route (Colombo, Ella, Mirissa, the south coast) — need
none. If you would rather the landing page used the journey's own imagery, add a
credits line and swap the paths in `SRILANKA_VIDEO` in `src/content/home.ts`.
