import "server-only";

/**
 * THE CASTING FILE — the admin notification email.
 *
 * Built as a table-based, fully inline-styled document because Gmail strips
 * <style> blocks in some clients and ignores most modern CSS in all of them.
 * No images, no web fonts, no external requests: the whole thing renders on
 * first open with images blocked, which is how most admin mail gets read.
 *
 * Priorities, in order: scannable, then branded. This is an operational
 * alert that happens to look like Plot Twist, not a marketing email.
 */

import { application as applicationCopy } from "@/content/site";
import { rewardById } from "@/content/rewards";
import { journeyById } from "@/content/journeys";
import { TOTAL_CLUES } from "@/content/mystery";
import type { StoredApplication } from "@/lib/applications";

/* ------------------------------------------------------------------ */
/* palette — the site tokens from globals.css, hard-coded because email */
/* clients cannot resolve CSS custom properties.                        */
/* ------------------------------------------------------------------ */

const SAND = "#fff1dc";
const INK = "#1a0d0a";
const DUSK = "#2b0f1c";
const PINK = "#ff4f87";
const SUNSET = "#ff7a3d";
const TROPIC = "#36c96f";
/** Brand sunset lifted for use on the dusk masthead, where #ff7a3d goes muddy. */
const SUNSET_ON_DARK = "#ffa470";

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

/* ------------------------------------------------------------------ */
/* WHICH JOURNEY — the one thing the inbox has to say at a glance       */
/* ------------------------------------------------------------------ */

/**
 * Every application used to arrive with the same subject ("Someone just
 * auditioned for the plot.") and the journey buried in a 10px corner label as
 * a raw id. With three journeys taking applications at once, the person
 * reading the inbox could not tell Goa from Bir from Thailand without opening
 * each one.
 *
 * So the journey now leads: it is in the SUBJECT, in a coloured banner across
 * the masthead, in the preview line and in the plain-text version. Each
 * journey has its own colour so a list of them is recognisable before a word
 * is read.
 *
 * `accent` sits on the dark masthead (light enough to read there); `deep` sits
 * on the white body, where the same pale colour would fail contrast — the same
 * split the sectionLabel note below describes.
 */
const JOURNEY_COLOURS: Record<string, { accent: string; deep: string }> = {
  "JOURNEY 1": { accent: "#ff4f87", deep: "#d63a6e" }, // Goa — the brand pink
  "JOURNEY 2": { accent: "#7fe0d6", deep: "#1f8a7a" }, // Bir × Barot — mountain teal
  "JOURNEY 3": { accent: "#b98cff", deep: "#7a3fe0" }, // Thailand / EDC — the festival violet
  "JOURNEY 4": { accent: "#3fd0bf", deep: "#0b7f74" }, // Sri Lanka — lagoon
  BALI: { accent: SUNSET_ON_DARK, deep: SUNSET },
};

export type JourneyMark = {
  /** "Journey 1 · Goa" — what a person reads. Falls back to the raw id if the journey is unknown. */
  name: string;
  /** "GOA" — the place, for the banner. */
  place: string;
  accent: string;
  deep: string;
  /** EDC takes a pre-registration, not an application — the email should not call it one. */
  kind: "application" | "pre-registration";
  /** True for a journey that still runs the clue hunt, so "clues found" means something. */
  hasHunt: boolean;
};

export function journeyMark(app: StoredApplication): JourneyMark {
  const journey = journeyById(app.journey);
  const colours = JOURNEY_COLOURS[journey?.id ?? ""] ?? { accent: SUNSET_ON_DARK, deep: SUNSET };
  return {
    name: journey?.displayName ?? app.journey,
    place: (journey?.nav?.label ?? journey?.destination.name ?? app.journey).toUpperCase(),
    ...colours,
    kind: journey?.pageVariant === "edc" ? "pre-registration" : "application",
    // "mystery" is the default variant, and the only one with a hunt.
    hasHunt: !journey?.pageVariant || journey.pageVariant === "mystery",
  };
}

/** "🎬 New application · Journey 1 · Goa" — the journey is the second thing the admin reads. */
export function subjectFor(app: StoredApplication): string {
  const m = journeyMark(app);
  return `\u{1F3AC} New ${m.kind} · ${m.name}`;
}

/** Every value here is applicant-supplied, so nothing goes in unescaped. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Preserve the paragraph breaks the applicant actually typed. */
function paragraphs(value: string) {
  return esc(value)
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, "<br />"))
    .join('</p><p style="margin:10px 0 0;">');
}

/* ------------------------------------------------------------------ */
/* field derivation — the HTML and text versions must never disagree,   */
/* so both read from these.                                             */
/* ------------------------------------------------------------------ */

type Field = { label: string; value: string };

/**
 * Reward title, with the rupee value appended only when the title doesn't
 * already say it — the discount rewards are literally named "₹2,500 OFF",
 * and "₹2,500 OFF (₹2,500)" reads like a bug.
 */
export function describeReward(app: StoredApplication): string {
  const reward = rewardById(app.reward_id, journeyById(app.journey)?.rewards.pool);
  if (!reward) return "Not assigned — applied without solving";

  if (reward.value == null) return reward.title;

  const amount = `₹${reward.value.toLocaleString("en-IN")}`;
  return reward.title.includes(amount) ? reward.title : `${reward.title} (${amount})`;
}

const ANSWER_KEYS = ["answer_1", "answer_2", "answer_3"] as const;

/**
 * Mobile is here because this alert exists to be ACTED ON, and the application
 * form itself says "we call, we don't email". Leaving the number out meant
 * opening the case file just to read one field back.
 *
 * It is no more exposed than the rest of this email already is — the same
 * message carries a name, an age, a city, a handle and three written answers.
 * The line that must stay true is the one in notifyApplication.ts: none of
 * this may appear in the structured LOG, which goes to a far wider audience
 * than the casting inbox.
 */
function theBasics(app: StoredApplication): Field[] {
  return [
    { label: "Name", value: app.name },
    { label: "Age", value: String(app.age) },
    { label: "City", value: app.city },
    { label: "Instagram", value: app.instagram },
    { label: "Mobile", value: app.mobile },
  ];
}

/** Labelled with the exact question the applicant answered — see content/site.ts. */
function theirCase(app: StoredApplication): Field[] {
  return ANSWER_KEYS.map((key, i) => ({
    label: applicationCopy.questions[i]?.label ?? key,
    value: String(app[key] ?? ""),
  }));
}

/**
 * WHICH JOURNEY, and — only where there is one — how the hunt went.
 *
 * Goa, Bir × Barot and Thailand have no clue hunt, so "Clues found 0/5" and
 * "Never guessed" were noise on every one of their emails. They now get the
 * journey and, if the applicant somehow carried a reward, the reward. A journey
 * that does run a hunt keeps the full block.
 */
function theJourney(app: StoredApplication): { title: string; fields: Field[] } {
  const m = journeyMark(app);
  const journeyField: Field = { label: "Journey", value: m.name };

  if (m.hasHunt) {
    return {
      title: "The hunt",
      fields: [
        { label: "Clues found", value: `${app.clue_progress}/${TOTAL_CLUES}` },
        { label: "Destination guess", value: app.destination_guess || "Never guessed" },
        { label: "Reward", value: describeReward(app) },
        journeyField,
      ],
    };
  }

  return {
    title: "The journey",
    fields: app.reward_id ? [journeyField, { label: "Reward", value: describeReward(app) }] : [journeyField],
  };
}

function attribution(app: StoredApplication): Field[] {
  return [
    { label: "Source", value: app.source || "direct" },
    { label: "Medium", value: app.medium || "—" },
    { label: "Campaign", value: app.campaign || "—" },
    { label: "Content", value: app.content || "—" },
  ];
}

function filedAt(app: StoredApplication) {
  return new Date(app.submitted_at).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

/* ------------------------------------------------------------------ */
/* HTML pieces                                                         */
/* ------------------------------------------------------------------ */

/**
 * The small tracked-out label and rule that open every block.
 *
 * The label itself is ink, not the accent colour: sand-on-white brand orange
 * at 11px fails contrast badly, and this email has to survive being skimmed
 * on a phone. The accent moves to the rule underneath, where it reads as
 * colour without being asked to carry any text.
 */
function sectionLabel(text: string, accent: string) {
  return `
      <tr>
        <td style="padding:26px 0 0;">
          <div style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:2.4px;color:${INK};text-transform:uppercase;">${esc(text)}</div>
          <div style="height:2px;background:${accent};margin-top:7px;font-size:0;line-height:0;">&nbsp;</div>
        </td>
      </tr>`;
}

/** Label left, value right — the travel-document look, scannable at a glance. */
function fieldRows(fields: Field[]) {
  const rows = fields
    .map(
      ({ label, value }) => `
            <tr>
              <td style="padding:9px 12px 9px 0;font-family:${SANS};font-size:11px;letter-spacing:1.4px;color:rgba(26,13,10,0.55);text-transform:uppercase;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
              <td style="padding:9px 0;font-family:${SERIF};font-size:16px;color:${INK};text-align:right;vertical-align:top;">${esc(value)}</td>
            </tr>`
    )
    .join("");

  return `
      <tr>
        <td style="padding:4px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-bottom:1px solid rgba(26,13,10,0.12);">
            ${rows}
          </table>
        </td>
      </tr>`;
}

/** An answer: the question in small caps, the answer in serif beneath a hairline. */
function answerBlocks(fields: Field[]) {
  return fields
    .map(
      ({ label, value }, i) => `
      <tr>
        <td style="padding:16px 0 0;">
          <div style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.2px;color:rgba(26,13,10,0.78);text-transform:uppercase;"><span style="color:${SUNSET};">0${i + 1}</span>&nbsp;&nbsp;${esc(label)}</div>
          <div style="border-left:2px solid ${SUNSET};padding-left:14px;margin-top:8px;">
            <p style="margin:0;font-family:${SERIF};font-size:16px;line-height:1.62;color:${INK};">${paragraphs(value)}</p>
          </div>
        </td>
      </tr>`
    )
    .join("");
}

/* ------------------------------------------------------------------ */
/* the document                                                        */
/* ------------------------------------------------------------------ */

export function renderApplicationEmailHtml(app: StoredApplication, caseUrl: string) {
  const submitted = filedAt(app);
  const mark = journeyMark(app);
  const journeyBlock = theJourney(app);
  const heading = mark.kind === "pre-registration" ? "New pre-registration" : "New cast member";
  // The clue count only means something on a journey that has a hunt.
  const preview = mark.hasHunt ? ` &mdash; ${app.clue_progress}/${TOTAL_CLUES} clues found.` : ".";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(heading)} &middot; ${esc(mark.name)}</title>
</head>
<body style="margin:0;padding:0;background:${SAND};">
  <!-- Inbox preview line. Never rendered in the body itself. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">
    ${esc(mark.name)} &mdash; ${esc(app.name)}, ${esc(String(app.age))}, ${esc(app.city)}${preview}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND};">
    <tr>
      <td align="center" style="padding:28px 14px 44px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">

          <!-- the journey's colour, edge to edge: the first thing the eye lands on -->
          <tr>
            <td bgcolor="${mark.accent}" style="background:${mark.accent};height:8px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- masthead -->
          <tr>
            <td style="background:${DUSK};padding:22px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:3px;color:${SUNSET_ON_DARK};text-transform:uppercase;">The Casting Room</td>
                  <td align="right" style="font-family:${SANS};font-size:10px;letter-spacing:2px;color:rgba(255,241,220,0.55);text-transform:uppercase;">${esc(mark.place)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:14px;">
                    <span style="display:inline-block;background:${mark.accent};color:${INK};font-family:${SANS};font-size:13px;font-weight:800;letter-spacing:2.6px;padding:8px 14px;text-transform:uppercase;">${esc(mark.name)}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:14px;font-family:${SANS};font-size:32px;font-weight:800;letter-spacing:-0.5px;line-height:1.05;color:${SAND};text-transform:uppercase;">${esc(heading)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:8px;font-family:${SERIF};font-style:italic;font-size:15px;color:rgba(255,241,220,0.68);">Filed ${esc(submitted)} IST</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- the file -->
          <tr>
            <td style="background:#ffffff;padding:6px 26px 30px;border-left:1px solid rgba(26,13,10,0.10);border-right:1px solid rgba(26,13,10,0.10);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${sectionLabel("The applicant", PINK)}
${fieldRows(theBasics(app))}
${sectionLabel("Their case", PINK)}
${answerBlocks(theirCase(app))}
${sectionLabel(journeyBlock.title, mark.deep)}
${fieldRows(journeyBlock.fields)}
${sectionLabel("Attribution", SUNSET)}
${fieldRows(attribution(app))}

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding:32px 0 6px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="${PINK}" style="border-radius:2px;">
                          <a href="${esc(caseUrl)}" style="display:inline-block;padding:16px 34px;font-family:${SANS};font-size:13px;font-weight:700;letter-spacing:2.4px;color:${SAND};text-decoration:none;text-transform:uppercase;">Open casting file &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:12px 0 0;font-family:${SERIF};font-style:italic;font-size:14px;color:rgba(26,13,10,0.45);">Status stays PENDING until someone opens it.</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="background:${DUSK};padding:16px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${SERIF};font-style:italic;font-size:15px;color:${SAND};">&ldquo;Someone wants in.&rdquo;</td>
                  <td align="right" style="font-family:${SANS};font-size:9px;letter-spacing:1.8px;color:rgba(255,241,220,0.42);text-transform:uppercase;">Internal &mdash; do not forward</td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plain-text fallback. Same information, same order, no markup. */
export function renderApplicationEmailText(app: StoredApplication, caseUrl: string) {
  const line = (f: Field) => `  ${f.label.padEnd(20)}${f.value}`;
  const rule = "  ----------------------------------------";
  const mark = journeyMark(app);
  const journeyBlock = theJourney(app);

  return [
    "THE CASTING ROOM",
    "",
    // The journey first, before anything else — this is the line the admin scans for.
    `>>> ${mark.name.toUpperCase()} <<<`,
    "",
    mark.kind === "pre-registration" ? "NEW PRE-REGISTRATION" : "NEW CAST MEMBER",
    `Filed ${filedAt(app)} IST`,
    "",
    "THE APPLICANT",
    rule,
    ...theBasics(app).map(line),
    "",
    "THEIR CASE",
    rule,
    // Answers can run to several paragraphs; indent every line so the block
    // still reads as one answer in a plain-text client.
    ...theirCase(app).flatMap((f, i) => [
      `  0${i + 1}  ${f.label}`,
      ...f.value.split("\n").map((l) => `      ${l}`),
      "",
    ]),
    journeyBlock.title.toUpperCase(),
    rule,
    ...journeyBlock.fields.map(line),
    "",
    "ATTRIBUTION",
    rule,
    ...attribution(app).map(line),
    "",
    "OPEN CASTING FILE ->",
    `  ${caseUrl}`,
    "",
    '"Someone wants in."',
    "Internal — do not forward.",
    "",
  ].join("\n");
}
