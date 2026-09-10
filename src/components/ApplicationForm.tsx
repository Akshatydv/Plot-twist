"use client";

import { useMemo, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { application } from "@/content/site";
import {
  normaliseInstagram,
  validateAnswers,
  validateBasics,
  type ApplicationInput,
  type FieldErrors,
} from "@/lib/applications";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { attributionForApplication } from "@/lib/attribution";
import { useJourney } from "./mystery/JourneyProvider";
import { Note, SectionLabel } from "./Bits";
import { Reveal } from "./motion";
import { CircleScribble, MarkerUnderline } from "./Brush";
import { usePlot } from "./mystery/PlotProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const fieldBase =
  "w-full border-0 border-b-2 bg-transparent px-0 py-3 text-[1.05rem] text-ink outline-none transition-colors placeholder:text-ink/30";

type Values = Record<string, string>;

const EMPTY: Values = {
  name: "",
  instagram: "",
  mobile: "",
  age: "",
  city: "",
  answer_1: "",
  answer_2: "",
  answer_3: "",
  // Honeypot. Left blank by everyone who can't see it — see the input below.
  _hp: "",
};

/** Shared field chrome so an error state looks the same everywhere. */
function FieldError({ message }: { message?: string }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {message && (
        <motion.span
          className="mt-1.5 block font-hand text-[1rem] leading-tight text-pink"
          initial={reduce ? undefined : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease }}
        >
          {message}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/**
 * The casting application: three steps, so nobody meets the whole form at
 * once. Validation runs per step (the same rules the route handler re-checks),
 * and submission posts to /api/applications.
 */
export function ApplicationForm({
  index,
}: {
  /**
   * Section number beside the label. Defaults to `application.index` —
   * this section's position in JOURNEY 01's running order. The reveal page
   * has a different order and passes its own; see GOA_SECTION_ORDER.
   */
  index?: string;
} = {}) {
  const reduce = useReducedMotion();
  const journey = useJourney();
  const { count, solvedGuess, reward } = usePlot();

  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "duplicate">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  /**
   * A failed "Next" used to be completely invisible.
   *
   * next() set the field errors and returned — no scroll, no focus, no message
   * anywhere near the control that was just pressed. On a phone the button sits
   * below five stacked fields, so the only thing that changed was 300-500px
   * above the thumb, often off-screen entirely. Thumb on the button, eyes on
   * the button: the tap did nothing. That is exactly what it was reported as.
   *
   * (submit() already scrolled back to the broken step, so the two paths
   * disagreed about whether failure deserved feedback.)
   */
  const [formError, setFormError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const headingRef = useRef<HTMLDivElement>(null);

  const steps = application.steps;
  const isLast = step === steps.length - 1;

  const set = (name: string, value: string) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track(PLOT_EVENTS.applicationStarted, { clue_progress: count });
    }
    setValues((v) => ({ ...v, [name]: value }));
    // Clear the error the moment they start fixing it — never re-add mid-typing.
    setErrors((e) => (e[name as keyof FieldErrors] ? { ...e, [name]: undefined } : e));
    setFormError(null);
  };

  const goTo = (nextStep: number) => {
    setStep(nextStep);
    // Keep the step change visible — the form is taller than the viewport.
    headingRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const onlyReal = (found: FieldErrors) =>
    Object.fromEntries(Object.entries(found).filter(([, v]) => v)) as FieldErrors;

  /**
   * Screen order, so "the first problem" means the first one they'd read
   * rather than whichever key the validator happened to write first.
   */
  const FIELD_ORDER: (keyof FieldErrors)[] = [
    "name", "instagram", "mobile", "age", "city",
    "answer_1", "answer_2", "answer_3",
  ];

  /**
   * Scroll to the first broken field and focus it. Focus is the important
   * half: it moves the caret, it opens the keyboard on mobile, and it is what
   * a screen reader announces.
   *
   * Deferred with setTimeout rather than requestAnimationFrame. Both wait long
   * enough for React to commit the step change, but rAF additionally waits for
   * a PAINT -- and a tab that is not compositing never paints, so the focus
   * move silently never happened. Moving focus is an accessibility behaviour
   * and must not depend on the compositor.
   */
  const showFirstError = (found: FieldErrors) => {
    const first = FIELD_ORDER.find((k) => found[k]);
    if (!first) return;
    setTimeout(() => {
      const el = document.getElementById(first) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      el.focus({ preventScroll: true });
    });
  };

  const next = () => {
    const real = onlyReal(step === 0 ? validateBasics(values) : validateAnswers(values));
    if (Object.keys(real).length > 0) {
      setErrors(real);
      const n = Object.keys(real).length;
      setFormError(n === 1 ? "One thing needs fixing above." : `${n} things need fixing above.`);
      showFirstError(real);
      return;
    }
    setErrors({});
    setFormError(null);
    track(PLOT_EVENTS.applicationStep, { step: steps[step].n });
    goTo(step + 1);
  };

  const submit = async () => {
    const real = onlyReal({ ...validateBasics(values), ...validateAnswers(values) });
    if (Object.keys(real).length > 0) {
      setErrors(real);
      // Send them back to whichever step actually has the problem.
      const basicsBroken = real.name || real.instagram || real.mobile || real.age || real.city;
      const n = Object.keys(real).length;
      setFormError(n === 1 ? "One thing needs fixing." : `${n} things need fixing.`);
      goTo(basicsBroken ? 0 : 1);
      showFirstError(real);
      return;
    }

    setStatus("sending");
    try {
      const payload: ApplicationInput = {
        name: values.name,
        instagram: values.instagram,
        mobile: values.mobile,
        age: values.age,
        city: values.city,
        answer_1: values.answer_1,
        answer_2: values.answer_2,
        answer_3: values.answer_3,
        journey: journey.id,
        clue_progress: count,
        destination_guess: solvedGuess,
        reward_id: reward?.id ?? null,
        // Anonymous first-touch campaign context — see lib/attribution.ts.
        ...attributionForApplication(),
        _hp: values._hp,
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { errors?: FieldErrors; duplicate?: boolean; error?: string }
          | null;

        // Already on the list — a punchline, not a failure.
        if (res.status === 409 || body?.duplicate) {
          setStatus("duplicate");
          return;
        }

        if (body?.errors) {
          setErrors(body.errors);
          goTo(0);
          setStatus("idle");
          return;
        }

        setServerError(body?.error ?? application.error);
        setStatus("error");
        return;
      }

      track(PLOT_EVENTS.applicationSubmitted, { clue_progress: count });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const igPreview = useMemo(() => normaliseInstagram(values.instagram), [values.instagram]);

  /* ---------------------------------------------------------------- */
  /* already on the list                                               */
  /* ---------------------------------------------------------------- */
  if (status === "duplicate") {
    const D = application.duplicate;
    return (
      <section id="apply" className="relative overflow-hidden bg-sand px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[680px] text-center">
          <motion.div
            className="font-display text-[clamp(1.1rem,3.4vw,1.5rem)] tracking-[0.12em] text-pink"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {D.kicker}
          </motion.div>

          <motion.h2
            className="mt-4 font-display text-[clamp(1.9rem,6.4vw,3.4rem)] uppercase leading-[0.95] text-ink"
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease }}
          >
            {D.title}
          </motion.h2>

          <p className="mx-auto mt-6 max-w-[36ch] text-[clamp(1rem,2.4vw,1.2rem)] leading-[1.5] text-ink/75">
            {D.body}
          </p>

          <Note className="mt-5 block text-[clamp(1.2rem,3.8vw,1.6rem)] text-ink/45" rotate={-3}>
            {D.note}
          </Note>

          <a
            href={D.cta.href}
            className="group mt-8 inline-flex touch-manipulation items-center gap-3 bg-ink px-8 py-4 text-[13px] font-semibold tracked uppercase text-sand transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0"
            style={{ boxShadow: "6px 6px 0 0 #FF4F87" }}
          >
            {D.cta.label}
            <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
              →
            </span>
          </a>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /* the ending                                                        */
  /* ---------------------------------------------------------------- */
  if (status === "done") {
    const S = application.success;
    return (
      <section id="apply" className="relative overflow-hidden bg-sand px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div
            className="font-display text-[clamp(1.1rem,3.4vw,1.5rem)] tracking-[0.12em] text-[#1f7a45]"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {S.kicker}
          </motion.div>

          <motion.h2
            className="relative mx-auto mt-5 inline-block font-serif text-[clamp(1.7rem,5.4vw,3rem)] italic leading-[1.1] text-ink"
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease }}
          >
            {S.title}
            <CircleScribble
              color="#FF4F87"
              className="pointer-events-none absolute -inset-x-6 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+3rem)] opacity-70"
            />
          </motion.h2>

          <motion.p
            className="mx-auto mt-9 max-w-[38ch] text-[clamp(1.05rem,2.5vw,1.25rem)] leading-[1.5] text-ink/80"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {S.body}
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease }}
          >
            <Note className="mt-7 block text-[clamp(1.4rem,4.4vw,1.9rem)] text-pink" rotate={-3}>
              {S.note}
            </Note>
            <Note className="mt-2 block text-[clamp(1.05rem,3vw,1.3rem)] text-ink/45" rotate={2}>
              {S.aside}
            </Note>

            <a
              href={S.cta.href}
              className="group mt-9 inline-flex touch-manipulation items-center gap-3 bg-ink px-8 py-4 text-[13px] font-semibold tracked uppercase text-sand transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0"
              style={{ boxShadow: "6px 6px 0 0 #FF4F87" }}
            >
              {S.cta.label}
              <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
                →
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /* the form                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <section id="apply" className="relative overflow-hidden bg-sand px-5 py-14 sm:px-8 sm:py-20 lg:px-14">
      <SectionLabel index={index ?? application.index} label={application.label} />

      <div className="mt-6 max-w-[1100px]">
        <div ref={headingRef} className="grid scroll-mt-6 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-14">
          <Reveal>
            <h2 className="relative font-display text-[clamp(2.9rem,12vw,7.5rem)] leading-[0.86] text-ink">
              {application.headline[0]}
              <br />
              <span className="relative inline-block text-sunset">
                {application.headline[1]}
                <MarkerUnderline color="#00A9C7" className="absolute -bottom-2 left-0 h-4 w-full" />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-[42ch] font-serif text-[clamp(1.2rem,3vw,1.7rem)] italic leading-[1.25] text-ink/85">
              {application.intro}
            </p>
            <Note className="mt-4 block text-[clamp(1.15rem,3.4vw,1.5rem)] text-ink/60" rotate={-2}>
              {application.note}
            </Note>
          </Reveal>
        </div>

        {/* step tally — same margin-tally language as the casting board */}
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => i < step && goTo(i)}
                disabled={i >= step}
                aria-current={active ? "step" : undefined}
                className={`flex min-h-[44px] items-center gap-2 border-2 px-3.5 py-2 text-[11px] font-semibold tracked transition-colors duration-300 ${
                  i < step ? "cursor-pointer" : "cursor-default"
                }`}
                style={{
                  borderColor: active ? "#FF4F87" : done ? "#1f7a45" : "rgba(26,13,10,0.2)",
                  color: active ? "#FF4F87" : done ? "#1f7a45" : "rgba(26,13,10,0.4)",
                  background: active ? "rgba(255,79,135,0.08)" : "transparent",
                }}
              >
                <span className="font-display text-[13px] tracking-normal">{s.n}</span>
                {s.label}
                {done && <span aria-hidden>✓</span>}
              </button>
            );
          })}
          <span className="font-display text-[13px] tracking-[0.06em] text-ink/35">
            {steps[step].n} / {String(steps.length).padStart(2, "0")}
          </span>
        </div>

        <form
          className="relative mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            if (isLast) void submit();
            else next();
          }}
          noValidate
        >
          {/*
            Honeypot — invisible to people, irresistible to scripts that fill
            every field they find. Zero-size + overflow-hidden rather than a
            large negative offset, so it can never introduce horizontal scroll.
          */}
          <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
            <label htmlFor="_hp">Leave this field blank</label>
            <input
              id="_hp"
              name="_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values._hp}
              onChange={(e) => set("_hp", e.target.value)}
            />
          </div>

          <AnimatePresence mode="wait">
            {/* ---------------- STEP 01 — THE BASICS ---------------- */}
            {step === 0 && (
              <motion.div
                key="basics"
                initial={reduce ? undefined : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  {application.fields.map((f, i) => {
                    const err = errors[f.name as keyof FieldErrors];
                    return (
                      <div key={f.name} className={f.name === "city" ? "sm:col-span-2 sm:max-w-[50%]" : ""}>
                        <label htmlFor={f.name} className="flex items-baseline gap-2 text-[10px] tracked text-ink/60">
                          <span className="font-display text-[13px] tracking-normal text-ocean">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {f.label}
                        </label>
                        <input
                          id={f.name}
                          name={f.name}
                          type={f.type}
                          inputMode={f.inputMode as HTMLAttributes<HTMLInputElement>["inputMode"]}
                          autoComplete={f.autoComplete}
                          placeholder={f.placeholder}
                          value={values[f.name]}
                          onChange={(e) => set(f.name, e.target.value)}
                          aria-invalid={!!err}
                          aria-describedby={err ? `${f.name}-error` : undefined}
                          min={f.name === "age" ? 18 : undefined}
                          max={f.name === "age" ? 30 : undefined}
                          className={`${fieldBase} ${err ? "border-pink" : "border-ink/30 focus:border-pink"}`}
                        />
                        <span id={`${f.name}-error`}>
                          <FieldError message={err} />
                        </span>
                        {f.name === "instagram" && igPreview && !err && (
                          <span className="mt-1.5 block font-hand text-[1rem] text-ink/45">saving as {igPreview}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Note className="mt-8 block text-[clamp(1.05rem,3vw,1.3rem)] text-ink/45" rotate={-2}>
                  {application.ageNotice}
                </Note>
              </motion.div>
            )}

            {/* ---------------- STEP 02 — THE QUESTIONS ---------------- */}
            {step === 1 && (
              <motion.div
                key="questions"
                initial={reduce ? undefined : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease }}
                className="space-y-10"
              >
                {application.questions.map((q) => {
                  const err = errors[q.name as keyof FieldErrors];
                  return (
                    <div key={q.name}>
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-[clamp(1.5rem,4.6vw,2.2rem)] leading-none text-pink">
                          {q.n}
                        </span>
                        <label
                          htmlFor={q.name}
                          className="font-serif text-[clamp(1.25rem,3.6vw,1.9rem)] leading-[1.15] text-ink"
                        >
                          {q.label}
                        </label>
                      </div>
                      <Note className="mt-2 block text-[1.05rem] text-ink/50" rotate={-1}>
                        {q.helper}
                      </Note>
                      <textarea
                        id={q.name}
                        name={q.name}
                        rows={3}
                        value={values[q.name]}
                        onChange={(e) => set(q.name, e.target.value)}
                        aria-invalid={!!err}
                        aria-describedby={err ? `${q.name}-error` : undefined}
                        placeholder="Type it like you would text it."
                        className={`${fieldBase} mt-3 resize-none leading-[1.5] ${
                          err ? "border-pink" : "border-ink/30 focus:border-pink"
                        }`}
                      />
                      <div className="mt-1.5">
                        <span id={`${q.name}-error`}>
                          <FieldError message={err} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* ---------------- STEP 03 — SUBMIT ---------------- */}
            {step === 2 && (
              <motion.div
                key="review"
                initial={reduce ? undefined : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="font-serif text-[clamp(1.3rem,3.6vw,1.9rem)] italic leading-[1.2] text-ink">
                  {application.review.lead}
                </p>

                <dl className="mt-7 grid gap-x-10 gap-y-4 border-t-2 border-ink/15 pt-6 sm:grid-cols-2">
                  {[
                    ["Name", values.name],
                    ["Instagram", igPreview],
                    ["Mobile", values.mobile],
                    ["Age", values.age],
                    ["City", values.city],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] tracked text-ink/45">{label}</dt>
                      <dd className="mt-0.5 font-display text-[1.05rem] tracking-[0.02em] text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 space-y-5 border-t-2 border-ink/15 pt-6">
                  {application.questions.map((q) => (
                    <div key={q.name}>
                      <div className="text-[10px] tracked text-ink/45">
                        {q.n} — {q.label}
                      </div>
                      <p className="mt-1 whitespace-pre-line text-[0.98rem] leading-[1.5] text-ink/80">
                        {values[q.name]}
                      </p>
                    </div>
                  ))}
                </div>

                <Note className="mt-6 block text-[1.2rem] text-ink/45" rotate={-2}>
                  {application.review.note}
                </Note>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---------------- controls ---------------- */}
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group order-1 inline-flex touch-manipulation items-center justify-center gap-3 bg-ink px-9 py-5 text-[13px] font-semibold tracked uppercase text-sand transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
              style={{ boxShadow: "6px 6px 0 0 #FF4F87" }}
            >
              {status === "sending" ? application.submitting : isLast ? application.submit : steps[step].next}
              <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
                →
              </span>
            </button>

            {step > 0 && (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="order-2 min-h-[48px] self-start border-2 border-ink/25 px-6 py-3.5 text-[12px] font-semibold tracked uppercase text-ink/60 transition-colors hover:border-ink/50 hover:text-ink"
              >
                ← {application.back}
              </button>
            )}

            <div className="order-3">
              <p className="font-display text-[12px] tracking-[0.04em] text-pink">{application.scarcity}</p>
              <p className="mt-0.5 text-[11px] tracked text-ink/45">{application.disclaimer}</p>
            </div>
          </div>

          {/* Feedback at the point of interaction. The field-level errors are
              still the detail; this exists so that pressing the button is never
              silent, whatever is scrolled into view. */}
          <div aria-live="assertive">
            {formError && status !== "sending" && (
              <Note className="mt-5 block text-[1.25rem] text-pink" rotate={-1}>
                {formError}
              </Note>
            )}
          </div>

          <div aria-live="polite">
            {status === "error" && (
              <Note className="mt-5 block text-[1.25rem] text-pink" rotate={-2}>
                {serverError ?? application.error}
              </Note>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
