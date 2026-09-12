import { brand } from "@/content/site";

/**
 * STRUCTURED DATA — what this site tells a crawler about itself in machine
 * readable form.
 *
 * ─── THE ONE RULE HERE IS THE AFFILIATION RULE, IN JSON ─────────────────────
 * Journey 02 is a trip built AROUND a festival that somebody else runs. The
 * obvious schema for it is `Event`, and emitting one would be the single
 * worst thing in this file: `Event` with Plot Twist as `organizer` is a
 * machine readable claim to be running EDC Thailand, which is exactly the
 * affiliation the page spends a whole disclaimer denying. A crawler cannot
 * read the disclaimer. It can read the JSON.
 *
 * So the trip is a `TouristTrip` whose `provider` is Plot Twist, which is
 * true and claims nothing about the festival. The festival is named in prose,
 * where it belongs, and nowhere in the graph.
 *
 * ─── AND NO PRICE, NO AVAILABILITY, NO RATINGS ──────────────────────────────
 * There are no `offers` because the trip has no published price and is not on
 * sale — it is a pre-registration. There is no `aggregateRating` because
 * nobody has rated anything. Inventing either is how a site earns a manual
 * action, and both are the classic thing to add "because rich results".
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotwist.in").replace(/\/+$/, "");

/** JSON-LD goes inside a <script>, so any "<" in the data has to be escaped
 *  or a crafted string could close the tag early. The content here is static,
 *  but the escape costs nothing and removes the question entirely. */
export function serialise(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Stable node ids, so the graph references one Organization rather than
 *  repeating it and leaving a crawler to guess they are the same company. */
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function organisationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: brand.name,
    url: SITE_URL,
    description: brand.tagline,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/logo.png`,
    },
    sameAs: [brand.instagramUrl],
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: brand.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/**
 * The site-wide graph. One script in the root layout rather than one per
 * schema: a single @graph lets the nodes reference each other by @id.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organisationSchema(), webSiteSchema()],
  };
}

/**
 * An FAQ, as structured data.
 *
 * ONLY CALL THIS WITH QUESTIONS THAT ARE VISIBLE ON THE PAGE. FAQPage markup
 * describing content a visitor cannot see is a documented cause of manual
 * actions, and it is the single most commonly abused schema type there is.
 * The EDC page renders every one of these in a <details> that keeps its answer
 * in the DOM whether open or not, which is what makes the markup truthful.
 */
export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * A guide page.
 *
 * `Article` rather than `BlogPosting` — these are standing reference pages
 * that get revised, not dated posts in a feed, and nothing on the site
 * presents them as a blog.
 *
 * `dateModified` matters more than `datePublished` here: a guide that answers
 * a question about a specific festival has a shelf life, and the modified date
 * is the honest signal of whether it has been looked at since.
 */
export function articleGraph({
  path,
  headline,
  description,
  published,
  modified,
}: {
  path: string;
  headline: string;
  description: string;
  published: string;
  modified: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organisationSchema(),
      webSiteSchema(),
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline,
        description,
        datePublished: published,
        dateModified: modified,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: url,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Plot Twist", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: headline, item: url },
        ],
      },
    ],
  };
}

/**
 * A journey's own page, as a trip Plot Twist provides.
 *
 * `itinerary` is deliberately absent while the day-by-day is unpublished —
 * the page says plainly that it is not public yet, and a schema that listed
 * stops the page refuses to show would contradict it.
 */
export function journeyGraph({
  path,
  name,
  description,
  startDate,
  endDate,
  destination,
  faq,
}: {
  path: string;
  name: string;
  description: string;
  /** ISO dates. Omit both if the trip has no confirmed window. */
  startDate?: string;
  endDate?: string;
  /** Plain place name, e.g. "Phuket, Thailand". */
  destination?: string;
  /** Only pass questions the page actually renders — see faqSchema. */
  faq?: readonly { q: string; a: string }[];
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organisationSchema(),
      webSiteSchema(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": `${url}#trip` },
        inLanguage: "en",
      },
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name,
        description,
        url,
        // Plot Twist provides the TRIP. It does not run the festival, and
        // nothing in this graph says otherwise. Read the note at the top.
        provider: { "@id": ORG_ID },
        touristType: "Groups",
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
        ...(destination
          ? { itinerary: { "@type": "Place", name: destination } }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Plot Twist", item: SITE_URL },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
      ...(faq?.length ? [{ ...faqSchema(faq), "@id": `${url}#faq` }] : []),
    ],
  };
}
