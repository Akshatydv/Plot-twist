"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  EMPTY_REVIEW,
  PHOTO_ACCEPT,
  REVIEW_LIMITS,
  REVIEW_TRIPS,
  validatePhotoMeta,
  validateReview,
  type ReviewErrors,
  type ReviewInput,
} from "@/lib/reviews";
import { Stars } from "./Stars";

const ease = [0.22, 1, 0.36, 1] as const;

const field =
  "w-full rounded-xl border bg-white/85 px-4 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/80";
const ok = "border-ink/20 hover:border-ink/40";
const bad = "border-[#B3123F] bg-[#B3123F]/[0.04]";

const RATING_WORDS = ["", "Not for me", "It was okay", "Good times", "Really great", "Unforgettable"];

type Photo = { file: File; url: string };

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} role="alert" className="mt-1.5 text-[0.88rem] font-medium leading-snug text-[#B3123F]">
      {msg}
    </p>
  ) : null;
}

/**
 * "TELL IT LIKE IT WAS." — the submission form.
 *
 * Nothing is stored in the browser; photos live in memory as File objects with
 * object-URL previews (revoked on removal/unmount). The server decodes and
 * re-encodes every photo, so the preview is only a courtesy.
 */
/** Present when the form is opened from a guest's personal review link. */
export type ReviewInvite = { token: string; displayName: string; tripId: string };

export function ReviewForm({ invite }: { invite?: ReviewInvite } = {}) {
  const reduce = useReducedMotion();
  const initial: ReviewInput = invite ? { ...EMPTY_REVIEW, name: invite.displayName, tripId: invite.tripId } : EMPTY_REVIEW;
  const [v, setV] = useState<ReviewInput>(initial);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [hover, setHover] = useState(0);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [doneName, setDoneName] = useState<string | null>(null);
  const [hp, setHp] = useState("");
  const inFlight = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const photosRef = useRef<Photo[]>([]);
  photosRef.current = photos;

  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);
  useEffect(() => {
    if (doneName) thanksRef.current?.focus();
  }, [doneName]);

  const set = <K extends keyof ReviewInput>(k: K, val: ReviewInput[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const addFiles = useCallback((list: FileList | File[]) => {
    const incoming = Array.from(list);
    let err: string | undefined;
    setPhotos((cur) => {
      const next = [...cur];
      for (const f of incoming) {
        if (next.length >= REVIEW_LIMITS.photos) {
          err = `Up to ${REVIEW_LIMITS.photos} photos, please.`;
          break;
        }
        const m = validatePhotoMeta(f);
        if (m) {
          err = m;
          continue;
        }
        next.push({ file: f, url: URL.createObjectURL(f) });
      }
      return next;
    });
    setErrors((e) => ({ ...e, photos: err }));
  }, []);

  const removePhoto = (i: number) => {
    setPhotos((cur) => {
      URL.revokeObjectURL(cur[i].url);
      return cur.filter((_, j) => j !== i);
    });
    setErrors((e) => ({ ...e, photos: undefined }));
  };

  const submit = async () => {
    if (inFlight.current) return;
    const errs = validateReview(v);
    setErrors(errs);
    const order: (keyof ReviewErrors)[] = ["name", "tripId", "rating", "body", "consent"];
    const first = order.find((k) => errs[k]);
    if (first) {
      setBanner("Just a couple of things to fix before we can take this.");
      requestAnimationFrame(() => {
        const el = document.getElementById(`rv-${first}`) ?? document.querySelector<HTMLElement>(`[data-rv="${first}"]`);
        el?.focus();
        el?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      });
      return;
    }

    inFlight.current = true;
    setBusy(true);
    setBanner(null);
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 60_000);
    try {
      const fd = new FormData();
      fd.append("payload", JSON.stringify({ ...v, website: hp, ...(invite ? { token: invite.token } : {}) }));
      photos.forEach((p) => fd.append("photos", p.file));
      const res = await fetch("/api/reviews", { method: "POST", body: fd, signal: ctrl.signal, cache: "no-store" });
      let data: { ok?: boolean; error?: string; errors?: ReviewErrors } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON */
      }
      if ((res.status === 201 || res.status === 200) && data.ok) {
        photos.forEach((p) => URL.revokeObjectURL(p.url));
        setDoneName(v.name.trim().split(" ")[0]);
        setPhotos([]);
        setV(initial);
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setBanner("Just a couple of things to fix before we can take this.");
        return;
      }
      if (res.status === 413) {
        setErrors({ photos: "Those photos are too big together — try fewer or smaller ones." });
        setBanner("Nothing was sent. Your review is still here.");
        return;
      }
      setBanner(data.error ?? "Something went wrong and nothing was sent. Your review is still here — please try again.");
    } catch {
      setBanner("We couldn’t reach our server, so nothing was sent. Your review is still here — check your connection and try again.");
    } finally {
      window.clearTimeout(timer);
      inFlight.current = false;
      setBusy(false);
    }
  };

  const shown = hover || v.rating;

  /* ------------------------------ success ------------------------------ */
  if (doneName !== null) {
    return (
      <motion.div
        initial={reduce ? undefined : { opacity: 0, scale: 0.96, rotate: -1.5 }}
        animate={{ opacity: 1, scale: 1, rotate: -1 }}
        transition={{ duration: 0.6, ease }}
        className="pin relative mx-auto max-w-[34rem] text-center text-ink"
      >
        <span className="tape" style={{ top: -12, left: "calc(50% - 42px)" }} aria-hidden="true" />
        <div className="px-4 pb-4 pt-10">
          <Stars rating={5} size={30} label={false} />
          <h3 ref={thanksRef} tabIndex={-1} className="mt-5 font-display text-[clamp(2rem,7vw,3rem)] uppercase leading-[0.95] outline-none">
            Thank you{doneName ? `, ${doneName}` : ""}.
          </h3>
          <p className="mx-auto mt-4 max-w-[34ch] font-serif text-[1.3rem] leading-[1.35] text-ink/80">
            We read every review ourselves. Once it’s approved, your story goes up on the wall.
          </p>
          <p className="mt-6 font-hand text-[1.6rem] leading-none text-pink">that’s the plot.</p>
        </div>
      </motion.div>
    );
  }

  /* ------------------------------- form -------------------------------- */
  return (
    <form
      noValidate
      aria-label="Write a review"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="rounded-[28px] border border-ink/15 bg-white/55 p-5 shadow-[0_30px_60px_-30px_rgba(43,15,28,0.45)] backdrop-blur-sm sm:p-8"
    >
      {banner && (
        <p role="alert" className="mb-6 rounded-xl border border-[#B3123F]/40 bg-[#B3123F]/[0.06] px-4 py-3 text-[0.92rem] font-medium text-[#8e0f32]">
          {banner}
        </p>
      )}

      {/* rating */}
      <fieldset>
        <legend className="text-[0.92rem] font-semibold">
          How was it? <span className="text-[#B3123F]" aria-hidden="true">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2" onMouseLeave={() => setHover(0)}>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={v.rating === n}
                  onChange={() => set("rating", n)}
                  data-rv={n === 1 ? "rating" : undefined}
                  aria-label={`${n} star${n > 1 ? "s" : ""} — ${RATING_WORDS[n]}`}
                  className="peer sr-only"
                />
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  className="rounded-lg transition-transform duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:scale-110 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3l-6.1 3.5 1.4-6.8L2.2 9.3l6.9-.8L12 2.2z"
                    fill={n <= shown ? "#FF4F87" : "rgba(26,13,10,0.14)"}
                    stroke={n <= shown ? "#FF4F87" : "rgba(26,13,10,0.25)"}
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            ))}
          </div>
          <span className="font-hand text-[1.6rem] leading-none text-pink" aria-live="polite">
            {RATING_WORDS[shown]}
          </span>
        </div>
        <Err id="rv-rating-err" msg={errors.rating} />
      </fieldset>

      {/* words */}
      <div className="mt-7">
        <label htmlFor="rv-body" className="block text-[0.92rem] font-semibold">
          Your story <span className="text-[#B3123F]" aria-hidden="true">*</span>
        </label>
        <p className="mt-0.5 text-[0.85rem] text-ink/60">What happened? What would you tell a friend about it?</p>
        <textarea
          id="rv-body"
          rows={6}
          maxLength={REVIEW_LIMITS.bodyMax}
          value={v.body}
          onChange={(e) => set("body", e.target.value)}
          aria-required="true"
          aria-invalid={errors.body ? true : undefined}
          aria-describedby={errors.body ? "rv-body-err" : undefined}
          className={`mt-2 resize-y font-serif text-[1.15rem] leading-[1.4] ${field} ${errors.body ? bad : ok}`}
        />
        <div className="mt-1 flex items-start justify-between gap-4">
          <Err id="rv-body-err" msg={errors.body} />
          <span className="ml-auto shrink-0 pt-1 text-[0.78rem] tabular-nums text-ink/50">
            {v.body.length}/{REVIEW_LIMITS.bodyMax}
          </span>
        </div>
      </div>

      {/* photos */}
      <div className="mt-6">
        <p id="rv-photos-label" className="text-[0.92rem] font-semibold">
          Photos <span className="font-normal text-ink/55">(optional, up to {REVIEW_LIMITS.photos})</span>
        </p>
        <div
          onDragOver={(e) => (e.preventDefault(), setDrag(true))}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`mt-2 rounded-2xl border-2 border-dashed p-4 transition-colors ${drag ? "border-pink bg-pink/10" : "border-ink/25 bg-white/50"}`}
        >
          {photos.length > 0 && (
            <ul className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {photos.map((p, i) => (
                <li key={p.url} className="pin relative !p-1.5 !pb-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={`Selected photo ${i + 1}`} className="aspect-square w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    aria-label={`Remove photo ${i + 1}`}
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[13px] text-sand shadow hover:bg-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col items-center gap-2 py-2 text-center">
            <p className="font-hand text-[1.5rem] leading-none text-ink/70">drop your best shots here</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={photos.length >= REVIEW_LIMITS.photos}
              aria-describedby="rv-photos-label"
              className="rounded-full border border-ink/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:border-ink hover:bg-ink hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              {photos.length ? "Add more" : "Choose photos"}
            </button>
            <p className="text-[0.78rem] text-ink/55">JPG, PNG or WebP · location data is removed automatically</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={PHOTO_ACCEPT.join(",")}
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
        <Err id="rv-photos-err" msg={errors.photos} />
      </div>

      {/* who */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-name" className="block text-[0.92rem] font-semibold">
            Your name <span className="text-[#B3123F]" aria-hidden="true">*</span>
          </label>
          <p className="mt-0.5 text-[0.85rem] text-ink/60">Shown with your review — first name + initial is perfect.</p>
          <input
            id="rv-name"
            value={v.name}
            maxLength={REVIEW_LIMITS.name}
            autoComplete="name"
            onChange={(e) => set("name", e.target.value)}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "rv-name-err" : undefined}
            className={`mt-2 ${field} ${errors.name ? bad : ok}`}
          />
          <Err id="rv-name-err" msg={errors.name} />
        </div>
        <div>
          <label htmlFor="rv-city" className="block text-[0.92rem] font-semibold">
            City <span className="font-normal text-ink/55">(optional)</span>
          </label>
          <p className="mt-0.5 text-[0.85rem] text-ink/60">Where you’re from.</p>
          <input
            id="rv-city"
            value={v.city}
            maxLength={REVIEW_LIMITS.city}
            autoComplete="address-level2"
            onChange={(e) => set("city", e.target.value)}
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={errors.city ? "rv-city-err" : undefined}
            className={`mt-2 ${field} ${errors.city ? bad : ok}`}
          />
          <Err id="rv-city-err" msg={errors.city} />
        </div>
      </div>

      {!invite && (
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-tripId" className="block text-[0.92rem] font-semibold">
            Which trip? <span className="text-[#B3123F]" aria-hidden="true">*</span>
          </label>
          <select
            id="rv-tripId"
            value={v.tripId}
            onChange={(e) => set("tripId", e.target.value)}
            className={`mt-2 ${field} ${ok}`}
          >
            {REVIEW_TRIPS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} · {t.when}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rv-reference" className="block text-[0.92rem] font-semibold">
            Registration reference <span className="font-normal text-ink/55">(optional)</span>
          </label>
          <p className="mt-0.5 text-[0.85rem] text-ink/60">Add it for a “verified guest” badge.</p>
          <input
            id="rv-reference"
            value={v.reference}
            maxLength={20}
            autoComplete="off"
            spellCheck={false}
            placeholder="PT-GOA-XXXXXXXX"
            onChange={(e) => set("reference", e.target.value.toUpperCase())}
            className={`mt-2 font-mono tracking-wide ${field} ${ok}`}
          />
        </div>
      </div>
      )}

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      {/* consent */}
      <div className="mt-7">
        <label
          htmlFor="rv-consent"
          className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-colors has-[:checked]:border-ink has-[:checked]:bg-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink ${
            errors.consent ? "border-[#B3123F] bg-[#B3123F]/[0.04]" : "border-ink/15 bg-white/55 hover:border-ink/40"
          }`}
        >
          <input
            id="rv-consent"
            type="checkbox"
            checked={v.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-required="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "rv-consent-err" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#2b0f1c]"
          />
          <span className="text-[0.93rem] leading-[1.5] text-ink/90">
            I’m happy for Plot Twist to publish my review, name and photos on its website and social channels. I can ask for them to be taken
            down any time.
          </span>
        </label>
        <Err id="rv-consent-err" msg={errors.consent} />
      </div>

      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 bg-ink px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-sand shadow-[6px_6px_0_0_#FF4F87] transition hover:-translate-x-[2px] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
      >
        {busy ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Sending…
          </>
        ) : (
          <>Pin it to the wall →</>
        )}
      </button>
      <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-ink/55">
        Every review is read by a person before it goes live. We never share your details beyond what you write here.
      </p>
    </form>
  );
}
