import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JourneyPage } from "@/components/JourneyPage";
import { DEFAULT_JOURNEY, JOURNEYS, journeyBySlug } from "@/content/journeys";

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
 * Metadata deliberately mirrors the root page: same title, same description,
 * no destination anywhere. A shared link has to pose the question, not answer
 * it — and that is true of every journey, not just the first one.
 *
 * The canonical points at this journey's own URL, so two journeys are never
 * treated as duplicates of each other.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ journey: string }>;
}): Promise<Metadata> {
  const { journey } = await params;
  const path = `/journey/${journey}`;
  // og:url has to agree with the canonical, or a share and a crawl disagree
  // about which URL this page actually is. The layout sets both to "/".
  return { alternates: { canonical: path }, openGraph: { url: path } };
}

export default async function Page({ params }: { params: Promise<{ journey: string }> }) {
  const { journey: slug } = await params;

  // The default journey owns "/". Serving it here too would be the same page
  // on two URLs, so this one hands over rather than duplicating it.
  if (slug === DEFAULT_JOURNEY.slug) redirect("/");

  const journey = journeyBySlug(slug);
  if (!journey) notFound();

  return <JourneyPage journey={journey} />;
}
