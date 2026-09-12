import type { Metadata } from "next";
import { Guide } from "@/components/editorial/Guide";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleGraph } from "@/lib/seo/schema";
import { soloFestivalGuide as g } from "@/content/guides/soloFestivalTrips";

const PATH = `/${g.slug}`;

export const metadata: Metadata = {
  title: g.seo.title,
  description: g.seo.description,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: g.seo.title, description: g.seo.description, type: "article" },
  twitter: { title: g.seo.title, description: g.seo.description },
};

/**
 * No disclaimer on this one, and that is correct rather than an omission: it
 * names no festival and no organiser, so there is no affiliation to disclaim.
 * The moment a named event appears in this copy, it needs one.
 *
 * The CTA points at "/" — the current trip — rather than at Journey 02
 * directly. This page outlives any single journey, and the root always renders
 * whichever is current.
 */
export default function Page() {
  return (
    <>
      <JsonLd
        data={articleGraph({
          path: PATH,
          headline: g.seo.title,
          description: g.seo.description,
          published: g.published,
          modified: g.modified,
        })}
      />
      <Guide
        kicker={g.kicker}
        headline={g.headline}
        lede={g.lede}
        sections={g.sections}
        cta={g.cta}
        ctaHref="/"
      />
    </>
  );
}
