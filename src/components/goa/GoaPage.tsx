import { Ticker } from "@/components/Ticker";
import { TrustStrip } from "@/components/TrustStrip";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { ContactTeaCup } from "@/components/ContactTeaCup";
import { WhatsATen } from "@/components/WhatsATen";
import { cast } from "@/content/goa";
import { GoaHero } from "./GoaHero";
import { ThePremise } from "./ThePremise";
import { ChapterBollywood } from "./ChapterBollywood";
import { ChapterFlamingo } from "./ChapterFlamingo";
import { ChapterLostInGoa } from "./ChapterLostInGoa";
import { ChapterHangoverClub } from "./ChapterHangoverClub";
import { ThePlotTwists } from "./ThePlotTwists";
import { TheDifference } from "./TheDifference";
import { TheFacts } from "./TheFacts";
import { FinalBeat } from "./FinalBeat";

/**
 * THE REVEAL PAGE — Journey 00, Goa.
 *
 * ─── THE RHYTHM ─────────────────────────────────────────────────────────────
 * The section order alternates deliberately, so the page never runs two of the
 * same kind of moment back to back:
 *
 *   dark hero      → paper argument  → dark people
 *   → BLACK club   → WHITE boat      → paper map      → warm scrapbook
 *   → dark reveal  → dark thesis     → paper document → dark close
 *
 * Light and dark alternate; immersion and information alternate. The two
 * biggest tonal jumps are placed where they do the most work: club→boat
 * (Chapter 01 into 02, near-black into near-white) and chapters→call sheet
 * (maximum atmosphere into maximum plainness, which is what makes the plain
 * section read as honest).
 *
 * ─── WHAT IS DELIBERATELY ABSENT ────────────────────────────────────────────
 * No clue tracker, no clue cards, no guess box, no reward envelope. All of it
 * still exists and still runs on Journey 01 — see journeys/types.ts. This page
 * simply doesn't mount it.
 *
 * The application form IS shared with Journey 01 on purpose: one form, one
 * table, one admin. Its own headline still reads MAKE YOUR CASE, which reads
 * correctly under a REQUEST YOUR INVITE button — the button is the request,
 * the form is where the case gets made.
 */
export function GoaPage() {
  return (
    <>
      <main className="relative">
        <GoaHero />

        <div className="relative -mt-4 overflow-hidden">
          <Ticker
            items={["GOA · OCTOBER 2026", "20 SEATS. NO FILLERS.", "10/10s ONLY", "DO IT FOR THE PLOT"]}
            bg="#FF4F87"
            fg="#FFF1DC"
            rotate={-1.6}
          />
        </div>

        <ThePremise />

        {/*
          THE CAST — the shared casting board, the same one Journey 01 runs.
          Deliberately NOT a Goa-specific reinterpretation: this is the master
          Cast concept for every trip, and it already adapts itself per journey
          through JourneyProvider (the stamp and the three photo scraps come
          from journey00.ts).

          `compact` keeps it from becoming a standalone page section between
          the premise and the four chapters — see the note on WhatsATen. The
          hierarchy this protects is EXPERIENCE → PEOPLE → EXPERIENCE.
        */}
        <WhatsATen compact composition={cast.split} />

        {/* the four days — anchor target for the hero's scroll cue */}
        <div id="chapters">
          <ChapterBollywood />
          <ChapterFlamingo />
          <ChapterLostInGoa />
          <ChapterHangoverClub />
        </div>

        <ThePlotTwists />

        <div className="relative -mt-4 overflow-hidden">
          <Ticker
            items={["4 DAYS", "20 PEOPLE", "10 GIRLS + 10 GUYS", "OCTOBER 2026", "APPLICATIONS ARE READ BY HUMANS"]}
            bg="#1A0D0A"
            fg="#FFF1DC"
            rotate={1.4}
          />
        </div>

        <TheDifference />
        <TheFacts />

        {/* who's on the other end — immediately before the form asks for a number */}
        <TrustStrip />

        <FinalBeat />
        <ApplicationForm />
        <Footer />
      </main>

      <ContactTeaCup />
    </>
  );
}
