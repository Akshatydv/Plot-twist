import type { Metadata } from "next";
import { JourneyPage } from "@/components/JourneyPage";
import { DEFAULT_JOURNEY } from "@/content/journeys";
import { JsonLd } from "@/components/seo/JsonLd";
import { journeyGraph } from "@/lib/seo/schema";

/**
 * The root URL always renders the default journey (see DEFAULT_JOURNEY) —
 * moving it would break every existing link and QR code. Every other journey
 * lives at /journey/<slug>; the default's own slug redirects here so the two
 * URLs never compete for the same canonical.
 */

/**
 * The homepage IS a journey page, so it takes that journey's search metadata
 * like any other — otherwise the default journey is the one page on the site
 * that cannot say what it is, purely because of where it happens to live.
 *
 * It inherits the generic pair from the layout when the default journey has no
 * `seo` block, which is the correct behaviour if a mystery journey is ever
 * promoted to the root.
 */
export function generateMetadata(): Metadata {
  const seo = DEFAULT_JOURNEY.seo;
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
  };
}

export default function Page() {
  return (
    <>
      {DEFAULT_JOURNEY.seo && (
        <JsonLd
          data={journeyGraph({
            // Canonical for the default journey is "/", not its slug.
            path: "/",
            name: DEFAULT_JOURNEY.seo.title,
            description: DEFAULT_JOURNEY.seo.description,
            startDate: DEFAULT_JOURNEY.seo.startDate,
            endDate: DEFAULT_JOURNEY.seo.endDate,
            destination: DEFAULT_JOURNEY.seo.destination,
          })}
        />
      )}
      <JourneyPage journey={DEFAULT_JOURNEY} />
    </>
  );
}
