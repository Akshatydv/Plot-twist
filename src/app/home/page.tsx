import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { HOMEPAGE_OWNS_ROOT } from "@/content/journeys";
import { homeMeta } from "@/content/home";

/**
 * /home — the brand homepage, reachable before it owns "/".
 *
 * Noindexed and canonicalised to "/" while it is a preview: it must never
 * compete in search with the page that will eventually replace it. Once
 * HOMEPAGE_OWNS_ROOT is flipped this route simply hands over to "/".
 */
export const metadata: Metadata = {
  title: homeMeta.title,
  description: homeMeta.description,
  alternates: { canonical: "/" },
  openGraph: { title: homeMeta.title, description: homeMeta.description },
  twitter: { title: homeMeta.title, description: homeMeta.description },
  robots: { index: false, follow: true },
};

export default function Page() {
  if (HOMEPAGE_OWNS_ROOT) redirect("/");
  return <HomePage />;
}
