import { Ticker } from "@/components/Ticker";
import { Footer } from "@/components/Footer";
import { ContactTeaCup } from "@/components/ContactTeaCup";
import { WhatsATen } from "@/components/WhatsATen";
import { cast, edcIndex, ribbonBottom, ribbonTop } from "@/content/thailand";
import { GateHero } from "./GateHero";
import { ThePremise } from "./ThePremise";
import { TheShape } from "./TheShape";
import { TheDrop } from "./TheDrop";
import { TheLineup } from "./TheLineup";
import { BeyondTheGates } from "./BeyondTheGates";
import { ThePlot } from "./ThePlot";
import { ThePass } from "./ThePass";
import { GatesOpen } from "./GatesOpen";
import { StickyCta } from "./StickyCta";
import { PreRegister } from "./PreRegister";

/**
 * THE FESTIVAL PAGE — Journey 02, EDC Thailand.
 *
 * ─── THE RHYTHM ─────────────────────────────────────────────────────────────
 * GoaPage.tsx states the rule this page inherits: light and dark alternate,
 * immersion and information alternate, and the page never runs two of the
 * same kind of moment back to back. Here the rule is INVERTED — dark is the
 * default and light is the event:
 *
 *   video hero  → LED ribbon → black argument → black board
 *   → THE DROP (pure black, the peak)
 *   → the casting board (magenta, human)
 *   → DAYLIGHT (the one bright screen)
 *   → black panels → LED ribbon → black document → black close
 *
 * The two placements that do the most work:
 *
 *   THE DROP → THE CAST. The loudest moment on the page is followed
 *   immediately by twenty faces. Festival → people, in one scroll. That order
 *   IS the argument this whole page is making, and reordering those two
 *   sections would break the point of it.
 *
 *   THE CAST → BEYOND THE GATES. The only bright screen lands right after the
 *   peak, so the peak retroactively reads as darker than it is, and Thailand
 *   gets one screen to be beautiful without competing with the festival.
 *   Everything after it returns to black, so the last thing before the ask is
 *   night again.
 *
 * ─── WHAT IS DELIBERATELY ABSENT ────────────────────────────────────────────
 * No clue tracker, no clue cards, no guess box, no reward envelope. All of it
 * still exists and still runs on Journey 01; this page simply doesn't mount
 * it — same posture as the Goa page. Journey 02's own parked hunt lives in
 * content/journeys/journey02.ts and is ready if the variant is ever flipped.
 *
 * There is also NO accommodation section. Goa has one; this trip's stay is
 * not decided, and a stock hotel photograph standing in for it would be the
 * one invented fact on an otherwise honest page.
 *
 * ─── WHAT IS SHARED, AND MUST STAY SHARED ───────────────────────────────────
 * The casting board, the application form, the footer and the tea cup are the
 * SAME components Goa and Bali run — one form, one table, one admin, one
 * casting concept. The board already renders on a dark magenta surface with
 * sand type, so it needs no restyling here, and reinterpreting it per
 * destination is explicitly the thing not to do.
 */
export function EdcPage() {
  return (
    <>
      {/*
        `.edc` scopes every token and utility this page uses — see the block at
        the bottom of globals.css. Nothing in it can reach the Goa or Bali
        pages, because they never carry the class.
      */}
      <main className="edc relative">
        {/*
          THE LED STRIP — a venue ribbon along the top edge of the viewport,
          fixed, on every section. It is the page's heartbeat made visible:
          two pixels of light breathing at ~130 BPM with a highlight travelling
          across it every four bars.

          It exists because this page has to feel like music is playing and no
          page on this site plays audio at a visitor. So the ROOM pulses
          instead of the speakers — see the tempo note in globals.css, where
          the bar length is defined once and everything on the beat derives
          from it.

          Top edge, not bottom: the bottom of a phone viewport already belongs
          to the sticky CTA and the tea cup.
        */}
        <div className="edc-led" aria-hidden />

        <GateHero />

        {/* THE LED RIBBON — the site's existing Ticker, in festival colours.
            Same component, same rotation, same -mt-4 overlap as both other
            pages. It is the clearest single signal that this is the same
            website, placed in the first screenful after the hero. */}
        <div className="relative -mt-4 overflow-hidden">
          <Ticker items={[...ribbonTop]} bg="#FF2E7E" fg="#0A0414" rotate={-1.6} />
        </div>

        <ThePremise />
        <TheShape />

        {/* ── the peak ── */}
        <TheDrop />

        {/*
          THE LINEUP — the receipt for the sentence THE DROP just made.
          Seven names a visitor already knows do more to make "EDC THAILAND"
          concrete than any adjective could, and they land hardest directly
          AFTER the emotional claim: putting the bill first would spend the
          proof before the promise.

          It also sets up the section under it. This one ends on "you can't
          pick who you're standing next to"; the casting board opens on "the
          lineup gets announced, the cast gets picked." Three sections, one
          argument: the festival, the proof, the people.
        */}
        <TheLineup />

        {/*
          THE CAST — the shared casting board, in compact mode, immediately
          after the peak. Its stamp and photo scraps come from journey02.ts
          through JourneyProvider; only the composition line and the bridge
          are passed in, so the component stays journey-agnostic.
        */}
        <WhatsATen
          compact
          composition={cast.composition}
          index={edcIndex("cast")}
          bridge={cast.bridge}
        />

        {/* ── the one bright screen ── */}
        <BeyondTheGates />

        <ThePlot />

        <div className="relative -mt-4 overflow-hidden">
          <Ticker items={[...ribbonBottom]} bg="#8B3DFF" fg="#FFF1DC" rotate={1.4} />
        </div>

        <ThePass />
        <GatesOpen />

        {/*
          PRE-REGISTRATION, not the casting form.

          <ApplicationForm/> is deliberately NOT mounted on this page. Journey
          02 is a teaser: it is not open for applications and is not taking
          bookings, and that form asks three written questions under a MAKE
          YOUR CASE headline — every visitor who has seen the Goa page knows it
          as the way you get a seat. Mounting it here would be the fastest
          possible way to make someone think they had one.

          See components/edc/PreRegister.tsx. It writes to the same table and
          the same admin, tagged JOURNEY 02.
        */}
        <PreRegister />
        <Footer />
      </main>

      <ContactTeaCup />
      <StickyCta />
    </>
  );
}
