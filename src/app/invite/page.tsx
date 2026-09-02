import type { Metadata } from "next";
import { InvitePage } from "@/components/invite/InvitePage";

/**
 * /invite — the general invitation.
 *
 * One URL, sent to many people, no personalised routes. Everything a
 * recipient sees is identical, so nothing here claims they were hand-picked;
 * the exclusivity is carried by twenty being a real number.
 *
 * NOINDEX, and kept out of the sitemap. An invitation that turns up in a
 * search result is not an invitation — it has to arrive from someone.
 */
const TITLE = "The plot found you. — Plot Twist · Journey 00";
const DESCRIPTION =
  "This isn't a group trip. It's a plot we're writing together. Goa, 17–20 October 2026. Twenty people.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/invite" },
  openGraph: {
    type: "website",
    url: "/invite",
    siteName: "Plot Twist",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InvitePage />;
}
