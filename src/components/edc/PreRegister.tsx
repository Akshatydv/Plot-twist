"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { preRegister } from "@/content/thailand";
import { normaliseInstagram } from "@/lib/applications";
import { PLOT_EVENTS, track } from "@/lib/analytics";
import { attributionForApplication } from "@/lib/attribution";
import { useJourney } from "../mystery/JourneyProvider";
import { Note } from "../Bits";
import { Reveal } from "../motion";
import { CredChip, GateSlate, Haze, LaserSweep, NeonRule } from "./Neon";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * PRE-REGISTRATION — and deliberately NOT the application form.
 *
 * ─── WHY THIS EXISTS INSTEAD OF <ApplicationForm/> ──────────────────────────
 * Journey 02 is a teaser. It is not open for applications and is not taking
 * bookings. Mounting the three-step casting form here would have been the
 * fastest possible way to mislead someone: that form asks three written
 * questions, says MAKE YOUR CASE, and every visitor who has seen the Goa page
 * knows it is how you get a seat.
 *
 * Nobody is being cast yet. So this asks for five short facts, says twice and
 * at full contrast that it is neither a booking nor an application, and
 * promises exactly one thing — that this list hears first.
 *
 * ─── WHERE IT GOES ──────────────────────────────────────────────────────────
 * The same POST /api/applications endpoint and the same table as every other
 * journey, tagged JOURNEY 02 through JourneyProvider. One store, one admin, no
 * second system to keep in sync.
 *
 * That endpoint requires three answers, and this form does not ask three
 * questions. It therefore sends `preRegister.marker` — a bracketed system note
 * that reads unmistakably as a system note in the admin — rather than three
 * invented sentences attributed to a person who never wrote them. If
 * pre-registration becomes permanent, the correct fix is a nullable answers
 * column, not a more convincing placeholder.
 *
 * ─── VALIDATION ─────────────────────────────────────────────────────────────
 * Light on purpose. The server re-checks everything regardless (see
 * lib/applications.ts), and a pre-registration that argues with someone about
 * their phone number format has misunderstood what it is for.
 */

type Values = { name: string; instagram: string; mobile: string; city: string; age: string };
const EMPTY: Values = { name: "", instagram: "", mobile: "", city: "", age: "" };

const fieldBase =
  "w-full border-0 border-b-2 border-sand/25 bg-transparent px-0 py-3 text-[1.05rem] text-sand outline-none transition-colors placeholder:text-sand/30 focus:border-[var(--edc-hot)]";

export function PreRegister() {
  const reduce = useReducedMotion();
  const journey = useJourney();
  const [values, setValues] = useState<Values>(EMPTY);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const ready =
    values.name.trim().length > 0 &&
    normaliseInstagram(values.instagram).length > 0 &&
    values.mobile.replace(/\D/g, "").length >= 7;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!ready || state === "sending") return;

    setState("sending");
    track(PLOT_EVENTS.applicationStarted);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          instagram: normaliseInstagram(values.instagram),
          mobile: values.mobile.trim(),
          city: values.city.trim() || "—",
          age: values.age.trim() || "—",
          // See the note above: a system marker, never a fabricated answer.
          answer_1: preRegister.marker,
          answer_2: preRegister.marker,
          answer_3: preRegister.marker,
          journey: journey.id,
          ...attributionForApplication(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      track(PLOT_EVENTS.applicationSubmitted);
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="pre-register"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #24104a 0%, #170727 52%, #0a0414 100%)" }}
    >
      <LaserSweep className="right-[-28%] opacity-55" slow />
      <Haze className="left-1/2 top-0 h-[40vmin] w-[64vmin] -translate-x-1/2 opacity-45" />
      <div className="grain edc-grain-live pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-[900px]">
        <GateSlate index={preRegister.index} label={preRegister.label} meta="NOT A BOOKING" />

        <Reveal>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,8vw,4.8rem)] uppercase leading-[0.9] text-sand">
            {preRegister.headline[0]}{" "}
            <span className="text-[var(--edc-hot)] edc-glow-hot">{preRegister.headline[1]}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 max-w-[52ch] font-serif text-[clamp(1.1rem,2.8vw,1.45rem)] italic leading-[1.25] text-sand/80">
            {preRegister.sub}
          </p>
        </Reveal>

        <NeonRule className="mt-8" />

        <AnimatePresence mode="wait">
          {state === "done" ? (
            /* ---------------- the receipt ---------------- */
            <motion.div
              key="done"
              className="mt-8"
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <CredChip color="#FF2E7E">{preRegister.success.stamp}</CredChip>
              <p className="mt-5 max-w-[46ch] font-serif text-[clamp(1.15rem,3vw,1.6rem)] italic leading-[1.25] text-sand">
                {preRegister.success.line}
              </p>
              <Note className="mt-5 block text-[1.5rem] text-sand/70" rotate={-4}>
                {preRegister.success.note}
              </Note>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              className="mt-8"
              noValidate
              initial={false}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
            >
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Field
                  id="pr-name"
                  f={preRegister.fields.name}
                  value={values.name}
                  onChange={set("name")}
                  invalid={touched && !values.name.trim()}
                />
                <Field
                  id="pr-instagram"
                  f={preRegister.fields.instagram}
                  value={values.instagram}
                  onChange={set("instagram")}
                  invalid={touched && !normaliseInstagram(values.instagram)}
                />
                <Field
                  id="pr-mobile"
                  f={preRegister.fields.mobile}
                  value={values.mobile}
                  onChange={set("mobile")}
                  type="tel"
                  invalid={touched && values.mobile.replace(/\D/g, "").length < 7}
                />
                <Field id="pr-city" f={preRegister.fields.city} value={values.city} onChange={set("city")} />
                <Field
                  id="pr-age"
                  f={preRegister.fields.age}
                  value={values.age}
                  onChange={set("age")}
                  type="number"
                />
              </div>

              {/*
                THE REASSURANCE — at full contrast, directly above the button,
                not in a footnote. This is the one place a visitor could
                reasonably believe they are booking something, so it is the one
                place the page is most explicit that they are not.
              */}
              <ul className="mt-8 space-y-1.5">
                {preRegister.reassure.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.98rem] leading-[1.4] text-sand/75">
                    <span className="mt-[0.5em] h-px w-4 shrink-0 bg-[var(--edc-hot)]" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="group relative inline-flex touch-manipulation items-center gap-3 px-7 py-4 text-[13px] font-semibold tracked uppercase transition-transform duration-200 ease-out will-change-transform hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0 disabled:opacity-60"
                  style={{ background: "#FF2E7E", color: "#0A0414", boxShadow: "6px 6px 0 0 #8B3DFF" }}
                >
                  <span>{state === "sending" ? preRegister.submitting : preRegister.submit}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
                    →
                  </span>
                </button>
                <Note className="block text-[1.3rem] text-sand/65" rotate={-4}>
                  {preRegister.note}
                </Note>
              </div>

              {state === "error" && (
                <p className="mt-5 font-hand text-[1.15rem] leading-tight text-[var(--edc-hot)]">
                  {preRegister.error}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  f,
  value,
  onChange,
  type = "text",
  invalid = false,
}: {
  id: string;
  f: { label: string; placeholder: string };
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  invalid?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="edc-meta !text-[9px]">
        {f.label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={f.placeholder}
        aria-invalid={invalid || undefined}
        className={`${fieldBase} ${invalid ? "border-[var(--edc-hot)]" : ""}`}
      />
    </div>
  );
}
