/**
 * GOA, TWO WAYS.
 *
 * Goa runs more than once a season, so it is the one destination with two
 * departures. Both read from here — the homepage hero's date picker, the
 * switcher under each Goa page's hero and the "Goa, two ways" strip — so the
 * two dates can never disagree with each other. The page for each edition
 * owns its own copy; this file only holds what has to match everywhere.
 *
 * The Season Opener runs 18–21 Dec 2026 (confirmed 14 Nov 2026).
 */
export const goaEditions = [
  {
    key: "opener",
    label: "Season Opener",
    dates: "18–21 DEC",
    note: "4 days · 3 nights",
    slug: "goa-season-opener",
  },
  {
    key: "newyears",
    label: "New Year's",
    dates: "30 DEC – 2 JAN",
    note: "16 seats · 8 + 8",
    slug: "goa-new-years",
  },
] as const;

export type GoaEdition = (typeof goaEditions)[number];
export const goaEditionHref = (e: GoaEdition) => `/journey/${e.slug}`;
