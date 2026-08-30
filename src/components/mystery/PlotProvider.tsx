"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  PRIMARY_CLUE_IDS,
  TOTAL_CLUES,
  isCorrectGuess,
  plotHunt,
  type ClueId,
} from "@/content/mystery";
import type { LadderRung } from "@/content/journeys";
import { pickReward, rewardById, type Reward } from "@/content/rewards";
import { PLOT_EVENTS, setAnalyticsJourney, track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { useJourney } from "./JourneyProvider";

type GuessState = "idle" | "wrong" | "solved";

export type { LadderRung };

type PlotValue = {
  found: ClueId[];
  count: number;
  total: number;
  isFound: (id: ClueId) => boolean;
  discover: (id: ClueId) => void;
  /**
   * What a given primary clue revealed, chosen by WHEN it was found rather
   * than where — see CLUE_LADDER. Null until it's been discovered.
   */
  rungFor: (id: ClueId) => LadderRung | null;
  canGuess: boolean;
  guessState: GuessState;
  wrongIndex: number;
  submitGuess: (value: string) => boolean;
  /** The guess that solved it — attached to an application as context. */
  solvedGuess: string | null;

  /**
   * THE REWARD. Assigned exactly once, the moment the destination is solved,
   * and then fixed: refreshing, returning or re-reading storage all recover
   * the same one. Null until solved.
   */
  reward: Reward | null;
  /** True once the envelope has actually been opened — so returning visitors aren't re-teased. */
  rewardRevealed: boolean;
  revealReward: () => void;
  /** Only non-null if assignment genuinely failed (an empty/zero-weight pool). */
  rewardError: boolean;
  retryReward: () => void;

  /** False until localStorage has been read, so nothing flashes on hydrate. */
  ready: boolean;
};

const PlotContext = createContext<PlotValue | null>(null);

export function usePlot() {
  const ctx = useContext(PlotContext);
  if (!ctx) throw new Error("usePlot must be used inside <PlotProvider>");
  return ctx;
}

export function PlotProvider({ children }: { children: React.ReactNode }) {
  /**
   * Everything destination-shaped — the ladder, the accepted answers, the
   * reward pool and odds, and above all the storage namespace — comes from
   * the journey the route chose. This provider itself knows no destinations.
   */
  const journey = useJourney();

  const [found, setFound] = useState<ClueId[]>([]);
  const [guessState, setGuessState] = useState<GuessState>("idle");
  const [wrongIndex, setWrongIndex] = useState(0);
  const [solvedGuess, setSolvedGuess] = useState<string | null>(null);
  const [rewardId, setRewardId] = useState<string | null>(null);
  const [rewardRevealed, setRewardRevealed] = useState(false);
  const [rewardError, setRewardError] = useState(false);
  const [ready, setReady] = useState(false);
  /** Clues already reported to analytics — seeded from storage so returns are silent. */
  const reportedClues = useRef<Set<string>>(new Set());

  // Read after mount, never during render — the server has no localStorage and
  // a mismatch here would blow up hydration.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(journey.storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {
          found?: string[];
          solved?: boolean;
          guess?: string;
          rewardId?: string;
          rewardRevealed?: boolean;
        };
        if (Array.isArray(saved.found)) {
          setFound(saved.found as ClueId[]);
          // Already-found clues are history, not new discoveries.
          saved.found.forEach((id) => reportedClues.current.add(id));
        }
        if (saved.solved) setGuessState("solved");
        if (typeof saved.guess === "string") setSolvedGuess(saved.guess);
        // Recover the existing reward rather than rolling a new one. An id we
        // no longer recognise (pool edited between visits) falls through to
        // reassignment below rather than rendering a blank card.
        // Validated against THIS journey's pool: a reward saved under another
        // journey could never reach this key, but if the pool is ever edited
        // between visits the stale id falls through to reassignment below
        // rather than rendering a blank card.
        if (typeof saved.rewardId === "string" && rewardById(saved.rewardId, journey.rewards.pool)) {
          setRewardId(saved.rewardId);
          setRewardRevealed(Boolean(saved.rewardRevealed));
        }
      }
    } catch {
      // private mode, blocked storage — the hunt just starts fresh
    }
    setReady(true);
    // Both before the first event, so every event carries campaign context
    // AND the journey it belongs to.
    setAnalyticsJourney(journey.id);
    captureAttribution();
    track(PLOT_EVENTS.pageView);
    // journey is route-level configuration and never changes for a mounted
    // tree; re-running this on it would replay the page view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bonus discoveries live in the same `found` list (so FoundMark/isFound
  // still work for them) but only the five primary clues count toward the
  // tracker, the guess gate, and — as of the reward-odds mechanic — which row
  // of the reward table a solve draws from. Computed here, ahead of the
  // reward-assignment effect below, so that effect closes over the count at
  // the exact render where guessState flips to "solved".
  const primaryFound = useMemo(
    () => found.filter((id) => (PRIMARY_CLUE_IDS as string[]).includes(id)),
    [found]
  );
  const primaryCount = primaryFound.length;

  /**
   * Assign once, and only once. Guarded on `rewardId` already existing, so
   * solving → refreshing → returning can never produce a second roll — and
   * critically, so finding MORE clues after an already-assigned reward can
   * never trigger a reroll either: this effect's deps don't include
   * `primaryCount`, so a later change to it doesn't re-run the effect at all.
   *
   * `primaryCount` itself is read via closure, not as a dependency — the
   * value this effect sees is whatever it was on the render that flipped
   * `guessState` to "solved", which is exactly "clue count at the moment of
   * the first successful solve" and nothing later.
   */
  useEffect(() => {
    if (!ready || guessState !== "solved" || rewardId) return;
    // Sit still while the failure is on screen; retryReward() clears the flag,
    // which changes the dep below and runs this again.
    if (rewardError) return;

    const reward = pickReward(primaryCount, journey.rewards.pool, journey.rewards.weightsByClueProgress);
    if (!reward) {
      setRewardError(true);
      return;
    }
    setRewardId(reward.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- primaryCount intentionally omitted, see comment above
  }, [ready, guessState, rewardId, rewardError, journey]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(
        journey.storageKey,
        JSON.stringify({
          found,
          solved: guessState === "solved",
          guess: solvedGuess,
          rewardId,
          rewardRevealed,
        })
      );
    } catch {
      // nothing to do — progress simply won't survive a refresh
    }
  }, [found, guessState, solvedGuess, rewardId, rewardRevealed, ready, journey.storageKey]);

  /**
   * State updaters must stay pure: React re-invokes them (StrictMode in dev,
   * and potentially when re-rendering concurrently), so a `track()` call in
   * here fires the event twice and silently doubles the funnel. Reporting
   * happens in an effect below instead.
   */
  const discover = useCallback((id: ClueId) => {
    setFound((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const submitGuess = useCallback((value: string) => {
    const right = isCorrectGuess(value, journey.destination.accepted);
    // The raw guess is never logged — only whether it landed.
    track(PLOT_EVENTS.guessResult, { result: right ? "correct" : "incorrect" });
    if (right) {
      // Fired here rather than on render, so returning visitors who already
      // solved it don't re-report the reveal on every page load.
      track(PLOT_EVENTS.destinationRevealed);
      setSolvedGuess(value.trim());
      setGuessState("solved");
    } else {
      setGuessState("wrong");
      setWrongIndex((i) => (i + 1) % plotHunt.guess.wrong.length);
    }
    return right;
  }, [journey.destination.accepted]);

  /**
   * The rung a clue handed over is fixed at the moment it was found: its
   * position in the discovery order, not its position on the page.
   */
  const rungFor = useCallback(
    (id: ClueId): LadderRung | null => {
      const i = primaryFound.indexOf(id);
      return i === -1 ? null : (journey.ladder[i] ?? null);
    },
    [primaryFound, journey.ladder]
  );

  /**
   * Reports each primary clue exactly once, with its true ordinal.
   *
   * Seeded from storage on mount (see the hydration effect) so a returning
   * visitor doesn't re-report clues they found days ago — only genuinely new
   * discoveries emit. Idempotent, so a double-invoked effect is harmless.
   */
  useEffect(() => {
    if (!ready) return;
    primaryFound.forEach((id, i) => {
      if (reportedClues.current.has(id)) return;
      reportedClues.current.add(id);
      // Only the ordinal goes out — never anything a person typed.
      track(PLOT_EVENTS.clueDiscovered, { clue_number: i + 1, total: TOTAL_CLUES });
    });
  }, [primaryFound, ready]);

  const reward = useMemo(() => rewardById(rewardId, journey.rewards.pool), [rewardId, journey.rewards.pool]);

  const revealReward = useCallback(() => {
    // Guard and report outside the updater — see the note on `discover`.
    if (rewardRevealed) return;
    // The id is a pool identifier — safe to send, unlike anything user-typed.
    if (rewardId) track(PLOT_EVENTS.rewardRevealed, { reward_id: rewardId });
    setRewardRevealed(true);
  }, [rewardId, rewardRevealed]);

  /** Only reachable from the failure state — clears the flag so assignment re-runs. */
  const retryReward = useCallback(() => setRewardError(false), []);

  const value = useMemo<PlotValue>(
    () => ({
      found,
      count: primaryCount,
      total: TOTAL_CLUES,
      isFound: (id: ClueId) => found.includes(id),
      discover,
      rungFor,
      // The guess box is intentionally never gated by clue count — anyone can
      // try a guess from zero clues on. GUESS_THRESHOLD still does real work:
      // it's the ordinal that decides which reward-odds tier a solve draws
      // from (see rewards.ts) and it's baked into the "rung 3 makes a theory
      // possible" ladder design. It just no longer locks the input.
      canGuess: true,
      guessState,
      wrongIndex,
      submitGuess,
      solvedGuess,
      reward,
      rewardRevealed,
      revealReward,
      rewardError,
      retryReward,
      ready,
    }),
    [
      found,
      primaryCount,
      discover,
      rungFor,
      guessState,
      wrongIndex,
      submitGuess,
      solvedGuess,
      reward,
      rewardRevealed,
      revealReward,
      rewardError,
      retryReward,
      ready,
    ]
  );

  return <PlotContext.Provider value={value}>{children}</PlotContext.Provider>;
}
