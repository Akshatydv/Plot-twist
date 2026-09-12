import { serialise } from "@/lib/seo/schema";

/**
 * One <script type="application/ld+json">, server-rendered.
 *
 * Deliberately not next/script: structured data has to be in the HTML a
 * crawler is served, and anything that defers it to after hydration is a
 * script some crawlers will never run. This is a plain tag in the markup.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from static site copy and escaped in serialise().
      dangerouslySetInnerHTML={{ __html: serialise(data) }}
    />
  );
}
