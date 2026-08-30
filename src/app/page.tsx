import { JourneyPage } from "@/components/JourneyPage";
import { DEFAULT_JOURNEY } from "@/content/journeys";

/**
 * The root URL is Journey 01's home — it launched here, it is linked from
 * here, and moving it would break every existing link and QR code. Every
 * other journey lives at /journey/<slug>; /journey/01 redirects here so the
 * two URLs never compete for the same canonical.
 */
export default function Page() {
  return <JourneyPage journey={DEFAULT_JOURNEY} />;
}
