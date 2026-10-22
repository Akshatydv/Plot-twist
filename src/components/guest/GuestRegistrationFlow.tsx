"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import {
  EMPTY_CONSENTS,
  EMPTY_DETAILS,
  GUEST_DOC_PATHS,
  GUEST_TRIP,
  ID_MAX_BYTES,
  LIMITS,
  validateConsents,
  validateDetails,
  validateIdMeta,
  type ConsentErrors,
  type DetailErrors,
  type GuestConsents,
  type GuestDetails,
} from "@/lib/guestRegistration";

/**
 * THE GUEST REGISTRATION — one page, one button.
 *
 * Everything is required and everything is on a single screen: details,
 * emergency contact, Aadhaar upload, two tick boxes, Submit. No steps and no
 * review screen, by design, to keep the number of taps as low as possible.
 *
 * Privacy decisions worth knowing about:
 *  - NOTHING is written to localStorage / sessionStorage / cookies / the URL.
 *    Answers (and the chosen ID file) live in React state only, so closing the
 *    tab discards them. A beforeunload prompt guards against accidental loss.
 *  - No analytics events are fired from here, and root analytics is switched
 *    off for /guest (see components/GoogleAnalytics.tsx).
 *  - After the server confirms, the personal data is dropped from state.
 */

export type MoreTrip = {
  key: string;
  name: string;
  kicker: string;
  tagline: string;
  dates: string | null;
  status: string;
  href: string | null;
  poster: string;
};

const DETAIL_ORDER: (keyof GuestDetails)[] = [
  "fullName",
  "dob",
  "phone",
  "email",
  "city",
  "emergencyName",
  "emergencyRelationship",
  "emergencyPhone",
  "safetyNote",
];

/* shared class strings ------------------------------------------------- */

const inputBase =
  "w-full rounded-xl border bg-white/80 px-4 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/80";
const inputOk = "border-ink/20 hover:border-ink/40";
const inputBad = "border-[#B3123F] bg-[#B3123F]/[0.04]";

const btnPrimary =
  "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-sand transition hover:bg-[#3a1a12] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60";
const linkStyle =
  "font-medium text-ink underline decoration-pink decoration-2 underline-offset-[3px] hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/* ---------------------------------------------------------------------- */
/* small pieces                                                            */
/* ---------------------------------------------------------------------- */

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.88rem] font-medium leading-snug text-[#B3123F]">
      {message}
    </p>
  );
}

function Req() {
  return (
    <span className="text-[#B3123F]" aria-hidden="true">
      *
    </span>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  maxLength,
  min,
  max,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: ReactNode;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  min?: string;
  max?: string;
}) {
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-[0.92rem] font-semibold text-ink">
        {label} <Req />
      </label>
      {hint && (
        <p id={hintId} className="mt-0.5 text-[0.85rem] leading-snug text-ink/60">
          {hint}
        </p>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required
        aria-required="true"
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint ? hintId : "", error ? errId : ""].filter(Boolean).join(" ") || undefined}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        className={`mt-2 ${inputBase} ${error ? inputBad : inputOk}`}
      />
      <ErrorText id={errId} message={error} />
    </div>
  );
}

function Check({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  const errId = `${id}-err`;
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-colors has-[:checked]:border-ink has-[:checked]:bg-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink ${
          error ? "border-[#B3123F] bg-[#B3123F]/[0.04]" : "border-ink/15 bg-white/55 hover:border-ink/40"
        }`}
      >
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#2b0f1c]"
        />
        <span className="text-[0.95rem] leading-[1.5] text-ink/90">{children}</span>
      </label>
      <ErrorText id={errId} message={error} />
    </div>
  );
}

function DocLink({ href, children }: { href: string; children: ReactNode }) {
  // New tab, so reading a document never costs the guest their answers.
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/* ---------------------------------------------------------------------- */
/* the page                                                                */
/* ---------------------------------------------------------------------- */

export function GuestRegistrationFlow({ trips, instagramUrl }: { trips: MoreTrip[]; instagramUrl: string }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [details, setDetails] = useState<GuestDetails>(EMPTY_DETAILS);
  const [consents, setConsents] = useState<GuestConsents>(EMPTY_CONSENTS);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [detailErrors, setDetailErrors] = useState<DetailErrors>({});
  const [consentErrors, setConsentErrors] = useState<ConsentErrors>({});
  const [idError, setIdError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  // Random per page-load. If a request is retried (or double-fired) the server
  // returns the same registration instead of creating a second one.
  const [submissionKey] = useState(() => crypto.randomUUID());
  const [hp, setHp] = useState("");
  const inFlight = useRef(false);
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);

  const dirty =
    !done &&
    (idFile !== null ||
      consents.agreement ||
      consents.privacy_media ||
      Object.entries(details).some(([k, v]) => v.trim() !== "" && v.trim() !== EMPTY_DETAILS[k as keyof GuestDetails].trim()));

  /* Warn before a refresh/close throws away what's been typed. */
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  /* On success, move to the top and put focus on the confirmation heading. */
  useEffect(() => {
    if (!done) return;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    doneHeadingRef.current?.focus({ preventScroll: true });
  }, [done, reduce]);

  const setField = useCallback(
    <K extends keyof GuestDetails>(key: K, value: string) => {
      setDetails((d) => ({ ...d, [key]: value }));
      // Once a field has been flagged, refresh its message as they type.
      setDetailErrors((prev) => {
        if (!prev[key]) return prev;
        return { ...prev, [key]: validateDetails({ ...details, [key]: value })[key] };
      });
    },
    [details]
  );

  const blurField = (key: keyof GuestDetails) => {
    const msg = validateDetails(details)[key];
    setDetailErrors((prev) => ({ ...prev, [key]: msg }));
  };

  const focusFirst = (ids: string[]) => {
    requestAnimationFrame(() => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          el.focus();
          el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
          return;
        }
      }
    });
  };

  const onPickFile = (file: File | null) => {
    setIdFile(file);
    setIdError(file ? validateIdMeta(file) : undefined);
  };

  const submit = async () => {
    if (inFlight.current) return; // a double-tap must not fire a second request

    const dErr = validateDetails(details);
    const cErr = validateConsents(consents);
    const iErr = validateIdMeta(idFile);
    setDetailErrors(dErr);
    setConsentErrors(cErr);
    setIdError(iErr);
    const badIds = [
      ...DETAIL_ORDER.filter((k) => dErr[k]).map((k) => `gf-${k}`),
      ...(iErr ? ["gf-idDocument"] : []),
      ...(cErr.agreement ? ["gf-c-agreement"] : []),
      ...(cErr.privacy_media ? ["gf-c-privacy_media"] : []),
    ];
    if (badIds.length) {
      setBanner("A few things still need filling in — we’ve marked them below.");
      focusFirst(badIds);
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setBanner(null);

    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 45_000);
    try {
      const form = new FormData();
      form.append("payload", JSON.stringify({ submissionKey, details, consents, website: hp }));
      form.append("idDocument", idFile as File);

      const res = await fetch("/api/guest-registrations", { method: "POST", body: form, signal: ctrl.signal, cache: "no-store" });

      let data: {
        ok?: boolean;
        reference?: string;
        error?: string;
        duplicate?: boolean;
        errors?: { details?: DetailErrors; consents?: ConsentErrors; idDocument?: string };
      } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON error body (proxy page etc.) -> handled as a failure below */
      }

      // Success is shown ONLY when the server says it saved the record.
      if ((res.status === 200 || res.status === 201) && data.ok === true && typeof data.reference === "string") {
        setReference(data.reference);
        // The registration is stored; drop the personal data from memory.
        setDetails(EMPTY_DETAILS);
        setConsents(EMPTY_CONSENTS);
        setIdFile(null);
        setDone(true);
        return;
      }

      if (res.status === 422 && data.errors) {
        const d = data.errors.details ?? {};
        setDetailErrors(d);
        setConsentErrors(data.errors.consents ?? {});
        setIdError(data.errors.idDocument);
        setBanner("A few things need another look before we can save this.");
        focusFirst([...DETAIL_ORDER.filter((k) => d[k]).map((k) => `gf-${k}`), "gf-idDocument"]);
        return;
      }

      if (res.status === 413) {
        setIdError("That file is too large — 5 MB maximum.");
        setBanner("Your ID file is too large. Nothing was saved.");
        return;
      }

      setBanner(data.error ?? "Something went wrong and nothing was saved. Your answers are still here — please try again.");
    } catch {
      setBanner(
        "We couldn’t reach our server, so nothing was saved. Check your connection — your answers are still here, and you can try again."
      );
    } finally {
      window.clearTimeout(timer);
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  const motionProps = reduce
    ? {}
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } };

  /* ------------------------------------------------------------------ */

  return (
    <div className="paper min-h-[100svh] text-ink">
      <header className="bg-[#1a0817] px-5 py-4 text-sand sm:px-8">
        <div className="mx-auto flex max-w-[760px] items-center justify-between">
          <a href="/" aria-label="Plot Twist — home" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand">
            <Logo className="text-[11px] sm:text-[13px]" />
          </a>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sand/70 sm:text-[11px]">Guest registration</span>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <motion.div key={done ? "done" : "form"} {...motionProps}>
          {!done ? (
            <form
              noValidate
              aria-labelledby="gf-h"
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/70 sm:text-[12px]">{GUEST_TRIP.eyebrow}</p>
              <h1 id="gf-h" className="mt-3 font-display text-[clamp(2rem,8vw,3.4rem)] uppercase leading-[0.96] tracking-[-0.005em]">
                Before we make the memories, a few little things.
              </h1>
              <p className="mt-4 max-w-[52ch] font-serif text-[1.25rem] leading-[1.4] text-ink/80">
                A couple of minutes and you’re done. Everything here is required.
              </p>

              {banner && (
                <p role="alert" className="mt-6 rounded-xl border border-[#B3123F]/40 bg-[#B3123F]/[0.06] px-4 py-3 text-[0.92rem] font-medium text-[#8e0f32]">
                  {banner}
                </p>
              )}

              <fieldset className="mt-9 space-y-5">
                <legend className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">You</legend>
                <TextField
                  id="gf-fullName"
                  label="Full legal name"
                  hint="As it appears on your Aadhaar."
                  value={details.fullName}
                  onChange={(v) => setField("fullName", v)}
                  onBlur={() => blurField("fullName")}
                  error={detailErrors.fullName}
                  autoComplete="name"
                  maxLength={LIMITS.name}
                />
                <TextField
                  id="gf-dob"
                  label="Date of birth"
                  type="date"
                  value={details.dob}
                  onChange={(v) => setField("dob", v)}
                  onBlur={() => blurField("dob")}
                  error={detailErrors.dob}
                  autoComplete="bday"
                  min="1900-01-01"
                  max={new Date().toISOString().slice(0, 10)}
                />
                <TextField
                  id="gf-phone"
                  label="Mobile number"
                  hint="Country code optional."
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(v) => setField("phone", v)}
                  onBlur={() => blurField("phone")}
                  error={detailErrors.phone}
                  maxLength={24}
                />
                <TextField
                  id="gf-email"
                  label="Email address"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={(v) => setField("email", v)}
                  onBlur={() => blurField("email")}
                  error={detailErrors.email}
                  maxLength={LIMITS.email}
                />
                <TextField
                  id="gf-city"
                  label="City you live in"
                  autoComplete="address-level2"
                  value={details.city}
                  onChange={(v) => setField("city", v)}
                  onBlur={() => blurField("city")}
                  error={detailErrors.city}
                  maxLength={LIMITS.city}
                />
              </fieldset>

              <fieldset className="mt-10 space-y-5 rounded-3xl border border-ink/15 bg-white/45 p-5 sm:p-6">
                <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">Emergency contact</legend>
                <p className="text-[0.88rem] leading-snug text-ink/65">
                  Someone we can reach if an emergency happens during the trip. They won’t be contacted for anything else.
                </p>
                <TextField
                  id="gf-emergencyName"
                  label="Their full name"
                  autoComplete="off"
                  value={details.emergencyName}
                  onChange={(v) => setField("emergencyName", v)}
                  onBlur={() => blurField("emergencyName")}
                  error={detailErrors.emergencyName}
                  maxLength={LIMITS.name}
                />
                <TextField
                  id="gf-emergencyRelationship"
                  label="Relationship to you"
                  placeholder="e.g. Mother, sibling, partner, friend"
                  autoComplete="off"
                  value={details.emergencyRelationship}
                  onChange={(v) => setField("emergencyRelationship", v)}
                  onBlur={() => blurField("emergencyRelationship")}
                  error={detailErrors.emergencyRelationship}
                  maxLength={LIMITS.relationship}
                />
                <TextField
                  id="gf-emergencyPhone"
                  label="Their phone number"
                  hint="Country code optional."
                  type="tel"
                  inputMode="tel"
                  autoComplete="off"
                  value={details.emergencyPhone}
                  onChange={(v) => setField("emergencyPhone", v)}
                  onBlur={() => blurField("emergencyPhone")}
                  error={detailErrors.emergencyPhone}
                  maxLength={24}
                />
              </fieldset>

              <div className="mt-10">
                <label htmlFor="gf-safetyNote" className="block text-[0.92rem] font-semibold">
                  Allergies or accessibility needs <Req />
                </label>
                <p id="gf-safetyNote-hint" className="mt-0.5 text-[0.85rem] leading-snug text-ink/60">
                  So the hosts and operators can plan meals, transport and activities safely. Write “None” if there’s nothing.
                </p>
                <textarea
                  id="gf-safetyNote"
                  name="gf-safetyNote"
                  rows={3}
                  required
                  maxLength={LIMITS.safetyNote}
                  value={details.safetyNote}
                  onChange={(e) => setField("safetyNote", e.target.value)}
                  onBlur={() => blurField("safetyNote")}
                  aria-required="true"
                  aria-invalid={detailErrors.safetyNote ? true : undefined}
                  aria-describedby={`gf-safetyNote-hint${detailErrors.safetyNote ? " gf-safetyNote-err" : ""}`}
                  className={`mt-2 resize-y ${inputBase} ${detailErrors.safetyNote ? inputBad : inputOk}`}
                />
                <ErrorText id="gf-safetyNote-err" message={detailErrors.safetyNote} />
              </div>

              <div className="mt-10">
                <label htmlFor="gf-idDocument" className="block text-[0.92rem] font-semibold">
                  Aadhaar card <Req />
                </label>
                <p id="gf-idDocument-hint" className="mt-0.5 text-[0.85rem] leading-snug text-ink/60">
                  A clear photo or scan — JPG, PNG or PDF, up to {ID_MAX_BYTES / 1024 / 1024} MB. It’s stored privately and only used to verify your
                  identity for the trip.
                </p>
                <input
                  id="gf-idDocument"
                  name="gf-idDocument"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  required
                  aria-required="true"
                  aria-invalid={idError ? true : undefined}
                  aria-describedby={`gf-idDocument-hint${idError ? " gf-idDocument-err" : ""}`}
                  onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                  className={`mt-2 block w-full cursor-pointer rounded-xl border bg-white/80 text-[0.92rem] text-ink/80 file:mr-4 file:cursor-pointer file:border-0 file:bg-ink file:px-5 file:py-3.5 file:text-[12px] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-sand focus-visible:ring-2 focus-visible:ring-ink/80 focus-visible:outline-none ${idError ? inputBad : inputOk}`}
                />
                {idFile && !idError && (
                  <p className="mt-1.5 text-[0.85rem] text-ink/65">
                    {idFile.name} · {formatSize(idFile.size)}
                  </p>
                )}
                <ErrorText id="gf-idDocument-err" message={idError} />
              </div>

              {/* Honeypot — off-screen, skipped by keyboard and assistive tech. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </label>
              </div>

              <div className="mt-10 space-y-3">
                <Check
                  id="gf-c-agreement"
                  checked={consents.agreement}
                  onChange={(v) => {
                    setConsents((c) => ({ ...c, agreement: v }));
                    if (v) setConsentErrors((p) => ({ ...p, agreement: undefined }));
                  }}
                  error={consentErrors.agreement}
                >
                  I have read and agree to the Plot Twist <DocLink href={GUEST_DOC_PATHS.terms}>Trip Terms &amp; Conditions</DocLink> for Goa and the
                  Guest <DocLink href={GUEST_DOC_PATHS.conduct}>Code of Conduct and safety guidelines</DocLink>, and I confirm that the
                  information I have provided is accurate to the best of my knowledge.
                </Check>
                <Check
                  id="gf-c-privacy_media"
                  checked={consents.privacy_media}
                  onChange={(v) => {
                    setConsents((c) => ({ ...c, privacy_media: v }));
                    if (v) setConsentErrors((p) => ({ ...p, privacy_media: undefined }));
                  }}
                  error={consentErrors.privacy_media}
                >
                  I have read the <DocLink href={GUEST_DOC_PATHS.privacy}>privacy notice</DocLink>, and I’m happy for Plot Twist to use photos and videos from
                  the trip.
                </Check>
                <p className="px-1 text-[0.82rem] leading-snug text-ink/60">
                  Links open in a new tab, so you won’t lose anything you’ve typed. Agreeing doesn’t remove Plot Twist’s own responsibility to look
                  after you.
                </p>
              </div>

              <div className="mt-8">
                <button type="submit" className={btnPrimary} disabled={submitting} aria-busy={submitting}>
                  {submitting ? (
                    <>
                      <Spinner /> Saving…
                    </>
                  ) : (
                    <>Submit registration</>
                  )}
                </button>
                <p className="sr-only" role="status" aria-live="polite">
                  {submitting ? "Saving your registration" : ""}
                </p>
                <p className="mt-4 text-center text-[0.82rem] leading-relaxed text-ink/60">
                  Your information is handled carefully and used for trip coordination and the purposes in our{" "}
                  <DocLink href={GUEST_DOC_PATHS.privacy}>privacy notice</DocLink>.
                </p>
              </div>
            </form>
          ) : (
            reference && <Confirmation headingRef={doneHeadingRef} reference={reference} trips={trips} instagramUrl={instagramUrl} />
          )}
        </motion.div>
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------------- */

function Confirmation({
  headingRef,
  reference,
  trips,
  instagramUrl,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  reference: string;
  trips: MoreTrip[];
  instagramUrl: string;
}) {
  return (
    <div>
      <section aria-labelledby="gf-h" className="rounded-3xl bg-[#1a0817] px-6 py-9 text-sand sm:px-10 sm:py-12">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#36c96f]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7be8a6]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Registration confirmed
        </p>
        <h2 id="gf-h" ref={headingRef} tabIndex={-1} className="mt-5 font-display text-[clamp(2.1rem,8vw,3.6rem)] uppercase leading-[0.96] outline-none">
          You’re all set. Goa, here we come.
        </h2>
        <p className="mt-5 max-w-[50ch] font-serif text-[1.25rem] leading-[1.4] text-sand/85">
          Your guest registration is complete. We’re looking forward to a few days of great experiences, new connections and memories worth keeping.
        </p>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-sand/15 sm:grid-cols-3">
          {[
            ["Trip", GUEST_TRIP.name],
            ["Dates", GUEST_TRIP.dates],
            ["Reference", reference],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#1a0817] p-4">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/60">{k}</dt>
              <dd className={`mt-1 break-words text-[1.02rem] font-semibold ${k === "Reference" ? "font-mono tracking-wide" : ""}`}>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-[56ch] text-[0.9rem] leading-relaxed text-sand/70">
          Keep your reference handy if you ever need to message us about your registration. We’ll share further trip updates with you directly,
          using the contact details you gave us.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            Follow Plot Twist on Instagram<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {trips.length > 0 && (
            <a
              href="#more-trips"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-sand/40 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
            >
              Explore upcoming trips
            </a>
          )}
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-sand/40 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
          >
            Back to Plot Twist
          </a>
        </div>
      </section>

      {trips.length > 0 && (
        <section id="more-trips" aria-labelledby="gf-more" className="mt-16 scroll-mt-8">
          <h2 id="gf-more" className="font-display text-[clamp(1.8rem,6.6vw,2.8rem)] uppercase leading-none">
            One trip down. More stories ahead.
          </h2>
          <p className="mt-3 font-serif text-[1.3rem] text-ink/75">If Goa is only the beginning, there’s more to discover.</p>

          <ul className="mt-7 grid gap-4 sm:grid-cols-2">
            {trips.map((t) => (
              <li key={t.key} className="group overflow-hidden rounded-3xl border border-ink/15 bg-white/60">
                <div className="relative h-40 overflow-hidden bg-[#1a0817]">
                  <Image
                    src={t.poster}
                    alt=""
                    fill
                    sizes="(min-width: 800px) 360px, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/60">{t.kicker}</p>
                  <h3 className="mt-1 font-display text-[1.5rem] uppercase leading-none">{t.name}</h3>
                  <p className="mt-2 text-[0.92rem] leading-snug text-ink/70">{t.tagline}</p>
                  <p className="mt-3 text-[0.82rem] text-ink/60">
                    {[t.dates, t.status].filter(Boolean).join(" · ")}
                  </p>
                  {t.href && (
                    <a href={t.href} className={`${linkStyle} mt-3 inline-block text-[0.92rem]`}>
                      Take a look<span className="sr-only"> at {t.name}</span> →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
