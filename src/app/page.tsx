import { JourneyPage } from "@/components/JourneyPage";
import { DEFAULT_JOURNEY } from "@/content/journeys";

/**
 * The root URL always renders the default journey (see DEFAULT_JOURNEY) —
 * moving it would break every existing link and QR code. Every other journey
 * lives at /journey/<slug>; the default's own slug redirects here so the two
 * URLs never compete for the same canonical.
 */
export default function Page() {
  return <JourneyPage journey={DEFAULT_JOURNEY} />;
}
