"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { rewardMoment } from "@/content/rewards";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { Note, PlotButton } from "../Bits";
import { usePlot } from "./PlotProvider";

const ease = [0.22, 1, 0.36, 1] as const;
const R = rewardMoment;

/**
 * THE PLOT TWIST REWARD.
 *
 * A sealed envelope, not a modal or a coupon: it reuses the travel-artifact
 * language already on the page (tape, stamps, deliberate rotation) so the
 * reward reads as something handed over, not something won.
 *
 * The reward itself is assigned in PlotProvider the moment the destination is
 * solved — this component only performs the opening. Nothing here decides
 * what someone gets, which is why re-rendering it can't reroll anything.
 */
export function RewardReveal() {
  const { reward, rewardRevealed, revealReward, rewardError, retryReward } = usePlot();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [shared, setShared] = useState(false);

  /* ---------------------------------------------------------------- */
  /* assignment failed — never leave them stuck                        */
  /* ---------------------------------------------------------------- */
  if (rewardError) {
    return (
      <div className="mt-10 text-center">
        <p className="font-display text-[clamp(1.2rem,4vw,1.7rem)] uppercase text-[#FF7A3D]">{R.error.title}</p>
        <Note className="mt-2 block text-[1.15rem] text-sand/60" rotate={-2}>
          {R.error.body}
        </Note>
        <button
          type="button"
          onClick={retryReward}
          className="mt-5 border-2 border-sand/40 px-6 py-3 text-[12px] font-semibold tracked uppercase text-sand hover:border-sand"
        >
          {R.error.retry}
        </button>
      </div>
    );
  }

  if (!reward) return null;

  const open = () => {
    if (rewardRevealed || opening) return;
    track(PLOT_EVENTS.rewardRevealStarted);
    setOpening(true);
    // Just long enough for the flap to lift before the card clears it.
    window.setTimeout(() => revealReward(), reduce ? 0 : 420);
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    // Only that a share happened — never the recipient, and the shared text
    // itself already avoids naming the destination or the reward.
    track(PLOT_EVENTS.sharePlot);
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: R.share.title, text: R.share.text, url });
        return;
      }
      await navigator.clipboard.writeText(`${R.share.text} ${url}`.trim());
      setShared(true);
      window.setTimeout(() => setShared(false), 2400);
    } catch {
      // Cancelled the sheet, or clipboard is blocked. Nothing to recover from.
    }
  };

  return (
    <div className="mt-12">
      {/* the bridge out of the destination reveal */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease }}
      >
        <Note className="block text-[clamp(1.15rem,3.6vw,1.5rem)] text-sand/55" rotate={-2}>
          {R.bridge.lead}
        </Note>
        <p className="mt-1 font-display text-[clamp(1.4rem,5vw,2.4rem)] uppercase leading-[1.05] text-[#FFD75E]">
          {R.bridge.line}
        </p>
      </motion.div>

      <div className="mt-8 flex flex-col items-center">
        <span className="text-[10px] tracked text-sand/45">{R.eyebrow}</span>

        <AnimatePresence mode="wait">
          {/* ---------------- sealed ---------------- */}
          {!rewardRevealed && (
            <motion.div
              key="sealed"
              className="mt-4 flex flex-col items-center"
              exit={reduce ? undefined : { opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
            >
              <Note className="block max-w-[26ch] text-center text-[1.05rem] text-sand/50" rotate={-1}>
                {R.everyone}
              </Note>

              <motion.button
                type="button"
                onClick={open}
                aria-label="Open your Plot Twist"
                className="group relative mt-5 block w-[min(300px,82vw)] touch-manipulation outline-none"
                style={{ perspective: 800 }}
                whileHover={reduce ? undefined : { y: -4, rotate: 0 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                animate={reduce ? undefined : { rotate: opening ? 0 : -1.5 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                {/* body */}
                <span className="relative block aspect-[3/2] w-full bg-[#FFF7EA] shadow-[0_22px_48px_-18px_rgba(0,0,0,0.8)]">
                  {/* ink soak, same treatment as the other paper artifacts */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-55 mix-blend-multiply"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 10% 0%, rgba(255,122,61,0.16), transparent 55%), radial-gradient(90% 80% at 100% 100%, rgba(43,15,28,0.14), transparent 60%)",
                    }}
                  />

                  {/* the flap, hinged at the top */}
                  <motion.span
                    className="absolute inset-x-0 top-0 z-20 block h-[62%] origin-top bg-[#F7EBD6]"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                    initial={false}
                    animate={reduce ? undefined : { rotateX: opening ? -172 : 0 }}
                    transition={{ duration: 0.42, ease }}
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-ink/10" />
                  </motion.span>

                  {/* seal */}
                  <motion.span
                    className="absolute left-1/2 top-[52%] z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#FF4F87] bg-[#FF4F87]"
                    initial={false}
                    animate={reduce ? undefined : { scale: opening ? 0 : 1, opacity: opening ? 0 : 1 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    <span className="font-display text-[8px] leading-none tracking-[0.1em] text-[#FFF1DC]">
                      {R.sealStamp}
                    </span>
                  </motion.span>

                  {/* stamped mark, bottom-left, like a franked envelope */}
                  <span className="absolute bottom-3 left-3 z-10 -rotate-[7deg] border border-ink/35 px-1.5 py-0.5 text-[7.5px] tracking-[0.16em] text-ink/55">
                    {R.envelopeMark}
                  </span>

                  {/* a strip of tape across the corner */}
                  <span className="tape absolute -right-3 -top-2 h-5 w-16 rotate-[38deg]" aria-hidden />
                </span>

                <span className="mt-4 block text-center text-[12px] font-semibold tracked uppercase text-[#FFD75E] transition-colors group-hover:text-sand">
                  {opening ? R.opening : R.openLabel}
                </span>
              </motion.button>
            </motion.div>
          )}

          {/* ---------------- revealed ---------------- */}
          {rewardRevealed && (
            <motion.div
              key="revealed"
              className="mt-4 w-full"
              initial={reduce ? undefined : { opacity: 0, y: 26, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 190, damping: 18 }}
            >
              <motion.div
                className="relative mx-auto w-[min(340px,88vw)] bg-[#FFF7EA] px-6 py-7 text-center shadow-[0_24px_54px_-18px_rgba(0,0,0,0.85)]"
                style={{ clipPath: "polygon(0.6% 1%, 99.4% 0%, 100% 99%, 0.4% 100%)" }}
                initial={reduce ? undefined : { rotate: -3 }}
                animate={{ rotate: -1.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-55 mix-blend-multiply"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 12% 0%, rgba(255,122,61,0.15), transparent 55%), radial-gradient(90% 80% at 100% 100%, rgba(43,15,28,0.12), transparent 60%)",
                  }}
                />
                <span className="tape absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-5deg]" aria-hidden />

                <span className="relative block -rotate-[6deg] text-[8px] tracking-[0.18em] text-ink/45">
                  {R.envelopeMark}
                </span>

                <motion.h3
                  className="relative mt-3 font-display text-[clamp(1.5rem,6.4vw,2.2rem)] uppercase leading-[1.02] text-ink"
                  initial={reduce ? undefined : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4, ease }}
                >
                  {reward.title}
                </motion.h3>

                <motion.p
                  className="relative mt-3 font-hand text-[clamp(1.15rem,4.2vw,1.45rem)] leading-[1.25] text-ink/75"
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.24, duration: 0.4 }}
                >
                  {reward.lines[0]}
                  <br />
                  {reward.lines[1]}
                </motion.p>

                <span className="relative mt-5 block text-[8.5px] tracking-[0.12em] text-ink/35">{R.terms}</span>
              </motion.div>

              <motion.div
                className="mt-9 flex flex-col items-center gap-4"
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.45, ease }}
              >
                <PlotButton href={R.cta.href} bg="#FF4F87" fg="#FFF1DC" shadow="#FFF1DC" event={PLOT_EVENTS.makeYourCase}>
                  {R.cta.label}
                </PlotButton>

                <button
                  type="button"
                  onClick={share}
                  className="text-[11px] tracked uppercase text-sand/45 underline-offset-4 hover:text-sand hover:underline"
                >
                  {shared ? R.share.copied : `${R.share.label} →`}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
