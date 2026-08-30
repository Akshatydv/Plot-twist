"use client";

import { useEffect, useState } from "react";
import { useJourney } from "./JourneyProvider";
import { readStoredAttribution } from "@/lib/attribution";
import { trackedEvents } from "@/lib/analytics";
import { usePlot } from "./PlotProvider";

/**
 * DEV-ONLY campaign/funnel inspector.
 *
 * Returns null unless NODE_ENV === "development", so it is never bundled into
 * a production render. Collapsed to a small corner tab by default — it exists
 * to make campaign testing quick, not to sit on top of the experience.
 *
 * Reset clears the hunt AND attribution, which is the only reliable way to
 * re-test a "brand new visitor from reel02" journey.
 */
export function PlotDebug() {
  const journey = useJourney();
  const { count, total, guessState, reward, rewardRevealed } = usePlot();
  const [open, setOpen] = useState(false);
  const [attr, setAttr] = useState<ReturnType<typeof readStoredAttribution>>(null);
  const [events, setEvents] = useState(0);

  useEffect(() => {
    if (!open) return;
    setAttr(readStoredAttribution());
    setEvents(trackedEvents().length);
  }, [open, count, guessState, rewardRevealed]);

  if (process.env.NODE_ENV !== "development") return null;

  const reset = () => {
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith("plottwist."))
        .forEach((k) => window.localStorage.removeItem(k));
    } catch {
      /* private mode */
    }
    window.location.href = window.location.pathname;
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-3 right-3 z-[60] rounded border border-white/25 bg-black/70 px-2 py-1 font-mono text-[10px] text-white/70 backdrop-blur hover:text-white"
      >
        plot·debug
      </button>
    );
  }

  return (
    <aside className="fixed top-3 right-3 z-[60] w-[248px] rounded border border-white/25 bg-black/85 p-3 font-mono text-[11px] leading-relaxed text-white/85 backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-white/50">plot · debug</span>
        <button type="button" onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
          ×
        </button>
      </div>

      <Line k="journey" v={journey.id} />
      <Line k="clues" v={`${count}/${total}`} />
      <Line k="guess" v={guessState} />
      <Line k="reward" v={reward ? `${reward.id}${rewardRevealed ? " (opened)" : " (sealed)"}` : "—"} />
      <Line k="events" v={String(events)} />

      <div className="mt-2 border-t border-white/15 pt-2">
        <Line k="source" v={attr?.source ?? "—"} />
        <Line k="medium" v={attr?.medium ?? "—"} />
        <Line k="campaign" v={attr?.campaign ?? "—"} />
        <Line k="content" v={attr?.content ?? "—"} />
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-3 w-full rounded border border-white/25 px-2 py-1 text-white/70 hover:text-white"
      >
        reset visitor
      </button>
    </aside>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-white/45">{k}</span>
      <span className="truncate text-right">{v}</span>
    </div>
  );
}
