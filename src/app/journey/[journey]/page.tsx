import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JourneyPage } from "@/components/JourneyPage";
import { DEFAULT_JOURNEY, JOURNEYS, journeyBySlug } from "@/content/journeys";
import { JsonLd } from "@/components/seo/JsonLd";
import { journeyGraph } from "@/lib/seo/schema";

/**
 * /journey/00, /journey/01, /journey/02 …
 *
 * Statically generated from the registry, so adding a journey adds a route
 * with no file change here.
 */
export function generateStaticParams() {
  return JOURNEYS.map((j) => ({ journey: j.slug }));
}

/** Anything not in the registry is a 404, not a blank hunt. */
export const dynamicParams = false;

/**
 * A MYSTERY JOURNEY MIRRORS THE ROOT PAGE. A REVEALED ONE DOES NOT.
 *
 * Every journey used to ship the root title and description verbatim, on the
 * reasoning that a shared link should pose the question rather than answer it.
 * That is still exactly right for `pageVariant: "mystery"`, where the withheld
 * destination is the product.
 *
 * It was wrong for the two journeys that state their destination in their own
 * H1. Goa and EDC Thailand were carrying a title that named neither, so the
 * only page on this site with real search demand behind it — a festival with
 * dates, a venue and a country people are actively looking up — was invisible
 * for every term that could have found it, and read to a crawler as a
 * duplicate of the homepage besides. Metadata cannot give away what the hero
 * already says out loud.
 *
 * So the per-journey pair is used when the registry defines one, and the
 * generic pair is inherited when it does not. See `seo` in content/journeys/types.ts.
 *
 * The canonical points at this journey's own URL either way, so two journeys
 * are never treated as duplicates of each other.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ journey: string }>;
}): Promise<Metadata> {
  const { journey } = await params;
  const path = `/journey/${journey}`;
  const config = JOURNEYS.find((j) => j.slug === journey);

  // og:url has to agree with the canonical, or a share and a crawl disagree
  // about which URL this page actually is. The layout sets both to "/".
  const base: Metadata = { alternates: { canonical: path }, openGraph: { url: path } };
  if (!config?.seo) return base;

  const { title, description } = config.seo;
  return {
    ...base,
    title,
    description,
    // Restated on both social cards: a share of the EDC page should say what
    // it is, not repeat the site's generic line.
    openGraph: { ...base.openGraph, title, description },
    twitter: { title, description },
  };
}

export default async function Page({ params }: { params: Promise<{ journey: string }> }) {
  const { journey: slug } = await params;

  // The default journey owns "/". Serving it here too would be the same page
  // on two URLs, so this one hands over rather than duplicating it.
  if (slug === DEFAULT_JOURNEY.slug) redirect("/");

  const journey = journeyBySlug(slug);
  if (!journey) notFound();

  return (
    <>
      {/*
        Structured data only for a journey that has declared its SEO block —
        which, by the rule in types.ts, means only one that already states its
        destination on the page. A mystery journey emits nothing rather than
        describing a trip it refuses to name.
      */}
      {journey.seo && (
        <JsonLd
          data={journeyGraph({
            path: `/journey/${journey.slug}`,
            name: journey.seo.title,
            description: journey.seo.description,
            startDate: journey.seo.startDate,
            endDate: journey.seo.endDate,
            destination: journey.seo.destination,
          })}
        />
      )}
      <JourneyPage journey={journey} />
    </>
  );
}
