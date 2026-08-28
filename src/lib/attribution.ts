/**
 * ATTRIBUTION — where a visitor came from, and nothing else about them.
 *
 * FIRST-TOUCH. The first landing wins and is never overwritten, because the
 * question we actually need answered is "which Reel produced this applicant",
 * not "which page were they on when they finally filled the form". Someone
 * who arrives from reel01, wanders off, and comes back a week later by typing
 * the URL is still a reel01 applicant.
 *
 * Session touch is recorded separately so a later campaign can still be seen
 * without destroying the original credit.
 *
 * Deliberately NOT collected: IP, user agent, screen/canvas/font signals, or
 * anything else that would constitute a fingerprint. Four strings and a
 * timestamp is the whole payload.
 */

export type Attribution = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
};

export type StoredAttribution = Attribution & {
  /** ISO timestamp of the first landing. */
  first_visit_at: string;
  /** Where they came from on THIS visit, if it differs from first touch. */
  last_source: string | null;
  last_campaign: string | null;
  last_content: string | null;
};

const KEY = "plottwist.attribution.v1";

const EMPTY: Attribution = { source: null, medium: null, campaign: null, content: null, term: null };

/** Trimmed, length-capped and lowercased so a stray query string can't bloat the record. */
function clean(value: string | null): string | null {
  if (!value) return null;
  const v = value.trim().toLowerCase().slice(0, 64);
  return v.length ? v : null;
}

/** Reads UTM params off a URL. Returns all-null when there are none. */
export function readUtm(search: string): Attribution {
  const p = new URLSearchParams(search);
  return {
    source: clean(p.get("utm_source")),
    medium: clean(p.get("utm_medium")),
    campaign: clean(p.get("utm_campaign")),
    content: clean(p.get("utm_content")),
    term: clean(p.get("utm_term")),
  };
}

function hasAny(a: Attribution) {
  return Boolean(a.source || a.medium || a.campaign || a.content || a.term);
}

/**
 * Falls back to the referrer when there are no UTMs, so organic Instagram
 * traffic (a bio link tapped without campaign params) still lands somewhere
 * more useful than "unknown".
 */
function fromReferrer(referrer: string): Attribution {
  if (!referrer) return { ...EMPTY, source: "direct", medium: "none" };
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (typeof window !== "undefined" && host === window.location.hostname) {
      return { ...EMPTY }; // internal navigation — not a new touch
    }
    const known: Record<string, string> = {
      "instagram.com": "instagram",
      "l.instagram.com": "instagram",
      "facebook.com": "facebook",
      "l.facebook.com": "facebook",
      "t.co": "twitter",
      "x.com": "twitter",
      "youtube.com": "youtube",
      "wa.me": "whatsapp",
      "web.whatsapp.com": "whatsapp",
    };
    const source = known[host] ?? host;
    return { ...EMPTY, source: clean(source), medium: known[host] ? "social" : "referral" };
  } catch {
    return { ...EMPTY, source: "direct", medium: "none" };
  }
}

export function readStoredAttribution(): StoredAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredAttribution) : null;
  } catch {
    return null;
  }
}

/**
 * Call once on landing. Writes first touch if nothing is stored yet, and
 * always refreshes the "last" fields so a returning visitor from a new
 * campaign is still visible without overwriting the original credit.
 */
export function captureAttribution(): StoredAttribution | null {
  if (typeof window === "undefined") return null;

  const incoming = readUtm(window.location.search);
  const touch = hasAny(incoming) ? incoming : fromReferrer(document.referrer);
  const existing = readStoredAttribution();

  const next: StoredAttribution = existing
    ? {
        // First touch is immutable.
        ...existing,
        last_source: touch.source ?? existing.last_source,
        last_campaign: touch.campaign ?? existing.last_campaign,
        last_content: touch.content ?? existing.last_content,
      }
    : {
        ...touch,
        first_visit_at: new Date().toISOString(),
        last_source: touch.source,
        last_campaign: touch.campaign,
        last_content: touch.content,
      };

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode. Attribution just won't survive the session.
  }
  return next;
}

/** The four fields that ride along with an application. Nothing identifying. */
export function attributionForApplication(): Pick<Attribution, "source" | "medium" | "campaign" | "content"> {
  const a = readStoredAttribution();
  return {
    source: a?.source ?? null,
    medium: a?.medium ?? null,
    campaign: a?.campaign ?? null,
    content: a?.content ?? null,
  };
}
