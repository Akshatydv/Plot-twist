import { Ticker } from "@/components/Ticker";
import { Footer } from "@/components/Footer";
import { WORLDS } from "@/content/homeWorlds";
import { SHOW_MOMENTS_WALL } from "@/content/home";
import { HomeAnalytics } from "./HomeAnalytics";
import { HomeNav } from "./HomeNav";
import { HomeHero } from "./HomeHero";
import { NotATour } from "./NotATour";
import { Worlds } from "./Worlds";
import { Principles } from "./Principles";
import { HowItWorks } from "./HowItWorks";
import { Curation } from "./Curation";
import { MomentsWall } from "./MomentsWall";
import { Trust } from "./Trust";
import { WhereNext } from "./WhereNext";
import { FinalScene } from "./FinalScene";

/**
 * THE BRAND HOMEPAGE — the trailer for the whole universe.
 *
 * ─── THE PROGRESSION ────────────────────────────────────────────────────────
 *   LAND        hero footage                       dark
 *   UNDERSTAND  THIS ISN'T A TRIP.                 dark → through the letters
 *   DISCOVER    the worlds, one at a time          each world its own colour
 *   FEEL        why · how · we don't take everyone paper → dusk → pink
 *   TRUST       the wall                           night
 *   IMAGINE     departures                         ink
 *   ACT         the last scene, then credits       black
 *
 * Like the Goa page, light and dark alternate so no two neighbouring
 * sections are the same kind of moment, and no two sections move the same
 * way: scrubbed type, horizontal travel, cursor prints, a drawn route,
 * sliding statements, drifting columns, a stepped story, a closing
 * letterbox.
 *
 * This is a server component. It reads the world registry (dates, prices,
 * hrefs — all derived from the journey content files) and hands plain data to
 * the client sections, so none of that content ships to the browser twice.
 */
export function HomePage() {
  // The menu and the hero list a trip by what it is CALLED (THAILAND + EDC), not by its panel's big name.
  const navWorlds = WORLDS.map(({ key, label, kicker, href, journeyId }) => ({ key, name: label, kicker, href, journeyId }));
  const heroTrips = WORLDS.map((w) => ({ key: w.key, label: w.label, href: w.href, journeyId: w.journeyId }));
  // The trust section's receipt: each trip's published facts, from the same data as its card.
  const ledger = WORLDS.map((w) => ({
    key: w.key,
    label: w.label,
    href: w.href,
    journeyId: w.journeyId,
    dates: w.datesShort ?? w.dates,
    duration: w.duration,
    price: w.price,
    status: w.status,
    fineprint: w.fineprint,
  }));

  return (
    <>
      <HomeAnalytics />
      <HomeNav worlds={navWorlds} />
      <main className="relative">
        <HomeHero trips={heroTrips} />
        <NotATour />
        <Worlds worlds={WORLDS} />

        <div className="relative z-10 -my-4 overflow-hidden py-4">
          <Ticker items={["CURATED, NOT CROWDED", "20 SEATS A JOURNEY", "COME FOR THE PLACE", "STAY FOR THE PEOPLE"]} bg="#FF4F87" fg="#FFF1DC" rotate={-1.4} />
        </div>

        <Principles />
        <HowItWorks />
        <Curation />
        {/* Hidden, not deleted: flip SHOW_MOMENTS_WALL in content/home.ts to bring the photo wall back. */}
        {SHOW_MOMENTS_WALL && <MomentsWall />}
        <Trust ledger={ledger} />
        <WhereNext worlds={WORLDS} />
        <FinalScene />
      </main>
      <Footer />
    </>
  );
}
