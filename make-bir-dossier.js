/* ============================================================================
   make-bir-dossier.js — render the Journey 03 (Bir × Barot) dossier PDF.

     node make-bir-dossier.js            → dossiers/Plot-Twist-Journey-03-Bir-Barot.pdf
     node make-bir-dossier.js --png      → also a PNG of every page, for review

   Sources:
     bir-dossier-source.html   the design (11 full-bleed A4 pages, no JavaScript)
     bir-dossier-data.json     the two trust pages: glimpses, reviews, creators
     src/content/bir.ts        inclusions and photo credits, read directly so
                               the dossier can never disagree with the website
     bir-dossier-assets/CREDITS.json   credits for the photos only the dossier uses

   ─── THE DRAFT RULE ────────────────────────────────────────────────────────
   Any empty glimpse / review / creator slot prints as a marked blank, a red
   DRAFT tab goes on every page, and the file is named …-DRAFT.pdf. A dossier
   with a hole where a testimonial should be must never be sendable by
   accident, and a made-up one must never be the fix.

   Rendering uses Playwright's Chromium (page.pdf) rather than a desktop Chrome
   path, so it runs the same on a laptop and in CI. Install once with
   `npm i -g playwright` if it isn't there.
   ========================================================================== */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'bir-dossier-source.html');
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'bir-dossier-data.json'), 'utf8'));
const BIR = fs.readFileSync(path.join(ROOT, 'src/content/bir.ts'), 'utf8');
const OUTDIR = path.join(ROOT, 'dossiers');
const WANT_PNG = process.argv.includes('--png');
const EXTRA = JSON.parse(fs.readFileSync(path.join(ROOT, 'bir-dossier-assets/CREDITS.json'), 'utf8')).photos;

const WHATSAPP = '919013806803';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let draft = false;

/* ---------------- price ---------------- */
const price = DATA.price
  ? { big: esc(DATA.price), small: 'FROM &middot; PER PERSON' }
  : { big: 'Announced soon', small: 'ASK US FOR THE NUMBER BEFORE IT&rsquo;S PUBLIC' };

/* ---------------- inclusions, straight from bir.ts ---------------- */
function listFrom(name) {
  const m = BIR.match(new RegExp(name + ':\\s*\\[([\\s\\S]*?)\\]\\s*as string\\[\\]'));
  if (!m) throw new Error(`Could not read inclusions.${name} from src/content/bir.ts`);
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}
const included = listFrom('included').map((s) => `<li><span class="m">✓</span>${esc(s)}</li>`).join('');
const excluded = listFrom('excluded').map((s) => `<li><span class="m">×</span>${esc(s)}</li>`).join('');

/* ---------------- glimpses ---------------- */
// Six columns of big prints (a portrait takes two, a "wide" one four), then a
// strip of five small frames. Empty places print as marked slots.
const gAll = [...DATA.glimpses];
const STRIP = 5;
let half = 0;
for (let used = 0; used < 6; half++) {
  const span = gAll[half] && gAll[half].shape === 'wide' ? 4 : 2;
  if (used + span > 6) break;
  used += span;
}
const gSlots = Math.max(half + STRIP, gAll.length);
const frames = [];
for (let i = 0; i < gSlots; i++) {
  const g = gAll[i];
  const no = String(i + 1).padStart(2, '0');
  const big = i < half;
  if (g) {
    frames.push(`<div class="fr${big && g.shape === 'wide' ? ' wide' : ''}"><img src="bir-dossier-assets/${esc(g.photo)}" alt=""><span class="no">${no}</span><div class="cap">${esc(g.caption)}</div></div>`);
  } else {
    draft = true;
    frames.push(`<div class="fr slot"><span>${no}<br>A REAL PHOTO${big ? '<br>' : ' '}FROM A PAST${big ? '<br>' : ' '}PLOT TWIST TRIP</span></div>`);
  }
}
// consecutive frames from the same place share one note: "02–05 · on a past trip"
const runs = [];
gAll.forEach((g, i) => {
  const last = runs[runs.length - 1];
  if (last && last.where === g.where) last.to = i; else runs.push({ where: g.where, from: i, to: i });
});
const nn = (i) => String(i + 1).padStart(2, '0');
const glimpseNotes = runs.map((r) => `${nn(r.from)}${r.to > r.from ? '–' + nn(r.to) : ''} · ${esc(r.where)}`).join('&nbsp;&nbsp;&nbsp;');

/* ---------------- reviews ---------------- */
const rSlots = Math.max(DATA.reviewSlots || 3, DATA.reviews.length);
const reviews = [];
for (let i = 0; i < rSlots; i++) {
  const r = DATA.reviews[i];
  if (r) {
    reviews.push(`<div class="rev"><div class="qm">&ldquo;</div><div class="q">${esc(r.quote)}</div><div class="who">${r.photo ? `<img src="bir-dossier-assets/${esc(r.photo)}" alt="">` : ''}<div><div class="n">${esc(r.name)}</div>${r.trip ? `<div class="t">${esc(r.trip)}</div>` : ''}</div></div></div>`);
  } else {
    draft = true;
    reviews.push(`<div class="rev slot"><div class="qm2">&ldquo;</div><div class="sl">A REAL REVIEW<br>IN THEIR WORDS<br>WITH PERMISSION<br><br>add to bir-dossier-data.json</div></div>`);
  }
}

/* ---------------- creators ---------------- */
const cSlots = Math.max(DATA.creatorSlots || 4, DATA.creators.length);
const creators = [];
for (let i = 0; i < cSlots; i++) {
  const c = DATA.creators[i];
  if (c) {
    creators.push(`<div class="cr"><div class="face">${c.photo ? `<img src="bir-dossier-assets/${esc(c.photo)}" alt="">` : ''}</div><div class="n">${esc(c.name)}</div>${c.handle ? `<div class="hd">${esc(c.handle)}</div>` : ''}${c.trip ? `<div class="t">${esc(c.trip)}</div>` : ''}${c.line ? `<div class="l">${esc(c.line)}</div>` : ''}</div>`);
  } else {
    draft = true;
    creators.push(`<div class="cr slot"><div class="ring"></div><div class="sl">A CREATOR<br>WHO ACTUALLY<br>TRAVELLED WITH US</div></div>`);
  }
}

/* ---------------- credits, from bir.ts ---------------- */
const LIC = {
  CC_BY_SA_4: 'CC BY-SA 4.0', CC_BY_4: 'CC BY 4.0', CC_BY_2: 'CC BY 2.0', CC_BY_3: 'CC BY 3.0',
  CC0: 'CC0', CC_BY_SA_2: 'CC BY-SA 2.0', PDM: 'Public Domain Mark', MIXKIT: 'Mixkit Free',
};
const SOURCE = fs.readFileSync(SRC, 'utf8');
const credits = [];
for (const m of BIR.matchAll(/file: "([^"]+)", title: "([^"]+)", author: "([^"]+)", \.\.\.(\w+)/g)) {
  const base = path.basename(m[1]).replace(/\.mp4$/, '-poster.jpg');
  if (fs.existsSync(path.join(ROOT, 'bir-dossier-assets', base)) && SOURCE.includes(`bir-dossier-assets/${base}`)) {
    credits.push(`${esc(m[2])} — ${esc(m[3])} (${LIC[m[4]] || m[4]})`);
  }
}
// the take-off still is a frame of the Slovely.eu clip, whose entry is "prepare"
if (SOURCE.includes('flight-takeoff-poster.jpg')) credits.push('Paragliding – Vipavska dolina — Slovely.eu (CC BY 3.0)');
// dossier-only photos, grouped by series so the line stays readable
const series = new Map();
for (const c of EXTRA) {
  if (!SOURCE.includes(`bir-dossier-assets/${c.file}`)) continue;
  const key = `${c.title} — ${c.author} (${c.licence})`;
  series.set(key, (series.get(key) || 0) + 1);
}
for (const [key, n] of series) credits.unshift(n > 1 ? `${key}, ${n} photographs` : key);
for (const m of (SOURCE + JSON.stringify(DATA).replace(/"photo":"/g, '"photo":"bir-dossier-assets/')).matchAll(/bir-dossier-assets\/([\w./-]+\.(?:jpg|png))/g)) {
  if (!fs.existsSync(path.join(ROOT, 'bir-dossier-assets', m[1]))) throw new Error(`Missing asset: ${m[1]}`);
}
const creditLine = 'PHOTOGRAPHS: ' + [...new Set(credits)].join(' · ') + ' · Founder photographs: Akshat. Not every photograph is of Bir or Barot; where a place is named, it is.';

/* ---------------- assemble ---------------- */
const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hey Plot Twist 👀 I'm in for Bir × Barot — Journey 03.")}`;
// the fonts go in as data URIs: headless Chromium blocks font loads from
// file:// pages, and a print pipeline should not depend on the network
const FONTDIR = path.join(ROOT, 'bir-dossier-assets/fonts');
const fontCss = fs.readFileSync(path.join(FONTDIR, 'fonts.css'), 'utf8')
  .replace(/url\(([\w.-]+\.woff2)\)/g, (_, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(FONTDIR, f)).toString('base64')})`);
let html = SOURCE
  .replace('<link href="bir-dossier-assets/fonts/fonts.css" rel="stylesheet">', `<style>${fontCss}</style>`)
  .replaceAll('{{PRICE_BIG}}', price.big)
  .replaceAll('{{PRICE_SMALL}}', price.small)
  .replaceAll('{{WA}}', wa)
  .replace('{{INCLUDED}}', included)
  .replace('{{EXCLUDED}}', excluded)
  .replace('{{GLIMPSES_A}}', frames.slice(0, half).join(''))
  .replace('{{GLIMPSES_B}}', frames.slice(half).join(''))
  .replace('{{GLIMPSE_NOTES}}', glimpseNotes)
  .replace('{{REVIEWS}}', reviews.join(''))
  .replace('{{CREATORS}}', creators.join(''))
  .replace('{{CREDITS}}', creditLine)
  .replace('{{DRAFT}}', draft ? 'draft' : '');
if (/\{\{[A-Z_]+\}\}/.test(html)) throw new Error('Unfilled placeholder: ' + html.match(/\{\{[A-Z_]+\}\}/)[0]);

fs.mkdirSync(OUTDIR, { recursive: true });
const built = path.join(ROOT, '.bir-dossier-built.html');
fs.writeFileSync(built, html);

(async () => {
  let chromium;
  try { ({ chromium } = require('playwright')); } catch {
    ({ chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.goto('file://' + built, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const name = `Plot-Twist-Journey-03-Bir-Barot${draft ? '-DRAFT' : ''}.pdf`;
  const out = path.join(OUTDIR, name);
  await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
  const pages = await page.evaluate(() => document.querySelectorAll('.page').length);
  if (WANT_PNG) {
    for (let i = 0; i < pages; i++) {
      const el = (await page.$$('.page'))[i];
      await el.screenshot({ path: path.join(OUTDIR, `page-${String(i + 1).padStart(2, '0')}.png`) });
    }
  }
  await browser.close();
  fs.unlinkSync(built);
  // one PDF page per .page, or something overflowed onto a page of its own
  const printed = (fs.readFileSync(out, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (printed !== pages) throw new Error(`PDF has ${printed} pages but the source has ${pages}: something overflowed`);
  console.log((draft ? 'DRAFT — ' : '') + out, `${pages} pages`, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB');
})();
