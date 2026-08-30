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

export const SUBJECT = "\u{1F3AC} Someone just auditioned for the plot.";

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

function theBasics(app: StoredApplication): Field[] {
  return [
    { label: "Name", value: app.name },
    { label: "Age", value: String(app.age) },
    { label: "City", value: app.city },
    { label: "Instagram", value: app.instagram },
  ];
}

/** Labelled with the exact question the applicant answered — see content/site.ts. */
function theirCase(app: StoredApplication): Field[] {
  return ANSWER_KEYS.map((key, i) => ({
    label: applicationCopy.questions[i]?.label ?? key,
    value: String(app[key] ?? ""),
  }));
}

function theHunt(app: StoredApplication): Field[] {
  return [
    { label: "Clues found", value: `${app.clue_progress}/${TOTAL_CLUES}` },
    { label: "Destination guess", value: app.destination_guess || "Never guessed" },
    { label: "Reward", value: describeReward(app) },
    { label: "Journey", value: app.journey },
  ];
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

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New cast member</title>
</head>
<body style="margin:0;padding:0;background:${SAND};">
  <!-- Inbox preview line. Never rendered in the body itself. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">
    ${esc(app.name)}, ${esc(String(app.age))}, ${esc(app.city)} &mdash; ${app.clue_progress}/${TOTAL_CLUES} clues found.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND};">
    <tr>
      <td align="center" style="padding:28px 14px 44px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">

          <!-- masthead -->
          <tr>
            <td style="background:${DUSK};padding:22px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:3px;color:${SUNSET_ON_DARK};text-transform:uppercase;">The Casting Room</td>
                  <td align="right" style="font-family:${SANS};font-size:10px;letter-spacing:2px;color:rgba(255,241,220,0.55);text-transform:uppercase;">${esc(app.journey)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:12px;font-family:${SANS};font-size:32px;font-weight:800;letter-spacing:-0.5px;line-height:1.05;color:${SAND};text-transform:uppercase;">New cast member</td>
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
${sectionLabel("The hunt", TROPIC)}
${fieldRows(theHunt(app))}
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

  return [
    "THE CASTING ROOM",
    "",
    "NEW CAST MEMBER",
    `Filed ${filedAt(app)} IST — ${app.journey}`,
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
    "THE HUNT",
    rule,
    ...theHunt(app).map(line),
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
