import type { Metadata } from "next";
import { Guide } from "@/components/editorial/Guide";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleGraph } from "@/lib/seo/schema";
import { edcAloneGuide as g } from "@/content/guides/edcThailandAlone";

const PATH = `/${g.slug}`;

export const metadata: Metadata = {
  title: g.seo.title,
  description: g.seo.description,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: g.seo.title, description: g.seo.description, type: "article" },
  twitter: { title: g.seo.title, description: g.seo.description },
};

/**
 * The CTA points at Journey 02's own page, which is the conversion surface —
 * this page deliberately has no form on it. Two places to pre-register is two
 * places to keep honest, and the journey page already carries every "this is
 * not a booking" line that has to sit next to the field.
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
        ctaHref="/journey/02"
        disclaimer={g.disclaimer}
      />
    </>
  );
}
