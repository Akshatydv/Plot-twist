/* ============================================================================
   make-bir-dossier.js — render the Journey 03 (Bir × Barot) dossier PDF.

     node make-bir-dossier.js            → dossiers/Plot-Twist-Journey-03-Bir-Barot.pdf
     node make-bir-dossier.js --png      → also a PNG of every page, for review

   Sources:
     bir-dossier-source.html   the design (10 A4 pages, no JavaScript)
     bir-dossier-data.json     the two trust pages: glimpses, reviews, creators
     src/content/bir.ts        inclusions and photo credits, read directly so
                               the dossier can never disagree with the website

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
const gAll = [...DATA.glimpses];
const gSlots = Math.max(DATA.glimpseSlots || 8, gAll.length);
const frames = [];
for (let i = 0; i < gSlots; i++) {
  const g = gAll[i];
  const no = String(i + 1).padStart(2, '0');
  if (g) {
    frames.push(`<div class="fr"><img src="bir-dossier-assets/${esc(g.photo)}" alt=""><span class="no">${no}</span><div class="cap">${esc(g.caption)}</div></div>`);
  } else {
    draft = true;
    frames.push(`<div class="fr slot"><span>${no}<br>A REAL PHOTO<br>FROM A PAST<br>PLOT TWIST TRIP</span></div>`);
  }
}
const half = Math.ceil(frames.length / 2);
const glimpseNotes = gAll.length
  ? gAll.map((g, i) => `${String(i + 1).padStart(2, '0')} · ${esc(g.where)}`).join('&nbsp;&nbsp;&nbsp;')
  : '';

/* ---------------- reviews ---------------- */
const rSlots = Math.max(DATA.reviewSlots || 3, DATA.reviews.length);
const reviews = [];
for (let i = 0; i < rSlots; i++) {
  const r = DATA.reviews[i];
  if (r) {
    reviews.push(`<div class="rev"><div class="qm">&ldquo;</div><div class="q">${esc(r.quote)}</div><div class="who">${r.photo ? `<img src="bir-dossier-assets/${esc(r.photo)}" alt="">` : ''}<div><div class="n">${esc(r.name)}</div><div class="t">${esc(r.trip)}</div></div></div></div>`);
  } else {
    draft = true;
    reviews.push(`<div class="rev slot"><div class="sl">A REAL REVIEW<br>IN THEIR WORDS<br>WITH PERMISSION<br><br>add to bir-dossier-data.json</div></div>`);
  }
}

/* ---------------- creators ---------------- */
const cSlots = Math.max(DATA.creatorSlots || 4, DATA.creators.length);
const creators = [];
for (let i = 0; i < cSlots; i++) {
  const c = DATA.creators[i];
  if (c) {
    creators.push(`<div class="cr"><div class="face">${c.photo ? `<img src="bir-dossier-assets/${esc(c.photo)}" alt="">` : ''}</div><div class="n">${esc(c.name)}</div><div class="hd">${esc(c.handle)}</div><div class="t">${esc(c.trip)}</div>${c.line ? `<div class="l">${esc(c.line)}</div>` : ''}</div>`);
  } else {
    draft = true;
    creators.push(`<div class="cr slot"><div class="sl">A CREATOR<br>WHO ACTUALLY<br>TRAVELLED<br>WITH US</div></div>`);
  }
}

/* ---------------- the topo map for day 03 ---------------- */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function rings(seed, cx, cy, n, r0, gap) {
  const rand = rng(seed);
  const h = [2, 3, 5].map((k) => ({ k, p: rand() * 6.28, a: rand() }));
  let out = '';
  for (let i = 0; i < n; i++) {
    const r = r0 + i * gap;
    const pts = [];
    for (let s = 0; s <= 64; s++) {
      const th = (s / 64) * Math.PI * 2;
      let d = 0;
      for (const x of h) d += Math.sin(th * x.k + x.p + i * 0.2) * x.a;
      const rr = r * (1 + (0.2 * d) / 3);
      pts.push(`${(cx + Math.cos(th) * rr).toFixed(1)},${(cy + Math.sin(th) * rr * 0.7).toFixed(1)}`);
    }
    out += `<path d="M${pts.join(' L')} Z" stroke="#d9c7a6" stroke-width="${i % 4 === 0 ? 0.4 : 0.22}" opacity="${i % 4 === 0 ? 0.42 : 0.24}"/>`;
  }
  return out;
}
const topo =
  rings(3, 176, 150, 12, 4, 6.2) +
  rings(8, 40, 196, 6, 4, 7) +
  `<path d="M20 172 C 36 166, 44 176, 58 166 C 72 156, 80 164, 96 160 C 112 156, 108 178, 124 178 C 142 178, 150 160, 164 156 C 170 154, 172 150, 176 146" stroke="#e8793a" stroke-width=".8" stroke-dasharray="1.4 1.8" stroke-linecap="round"/>` +
  [[20, 172, '#d9c7a6'], [58, 166, '#d9c7a6'], [124, 178, '#d9c7a6'], [176, 146, '#e8793a']]
    .map(([x, y, c]) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 9}" stroke="#efe9dd" stroke-width=".35"/><path d="M${x} ${y - 9} l5 1.6 l-5 1.6 z" fill="${c}"/>`)
    .join('') +
  `<path d="M173 144 l3 -5 l3 5 z" fill="#efe9dd" opacity=".8"/><text x="181" y="143" fill="#d9c7a6" font-size="3" letter-spacing=".8" font-family="DM Sans">VIEWPOINT</text>`;

/* ---------------- credits, from bir.ts ---------------- */
const LIC = {
  CC_BY_SA_4: 'CC BY-SA 4.0', CC_BY_4: 'CC BY 4.0', CC_BY_2: 'CC BY 2.0', CC_BY_3: 'CC BY 3.0',
  CC0: 'CC0', CC_BY_SA_2: 'CC BY-SA 2.0', PDM: 'Public Domain Mark', MIXKIT: 'Mixkit Free',
};
const credits = [];
for (const m of BIR.matchAll(/file: "([^"]+)", title: "([^"]+)", author: "([^"]+)", \.\.\.(\w+)/g)) {
  const base = path.basename(m[1]).replace(/\.mp4$/, '-poster.jpg');
  const asset = base === 'flight-takeoff-poster.jpg' ? base : base;
  if (fs.existsSync(path.join(ROOT, 'bir-dossier-assets', asset)) && fs.readFileSync(SRC, 'utf8').includes(asset)) {
    credits.push(`${esc(m[2])} — ${esc(m[3])} (${LIC[m[4]] || m[4]})`);
  }
}
// the take-off still is a frame of the Slovely.eu clip, whose entry is "prepare"
if (fs.readFileSync(SRC, 'utf8').includes('flight-takeoff-poster.jpg')) credits.push('Paragliding – Vipavska dolina — Slovely.eu (CC BY 3.0)');
const creditLine = 'PHOTOGRAPHS: ' + [...new Set(credits)].join(' · ') + ' · Founder photographs: Akshat. Not all photographs are of Bir or Barot; places are labelled only where they are.';

/* ---------------- assemble ---------------- */
const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hey Plot Twist 👀 I'm in for Bir × Barot — Journey 03.")}`;
let html = fs.readFileSync(SRC, 'utf8')
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
  .replace('{{TOPO}}', topo)
  .replace('{{CREDITS}}', creditLine)
  .replace('{{DRAFT}}', draft ? '<div class="draft">DRAFT · TRUST PAGES NEED REAL CONTENT · SEE bir-dossier-data.json</div>' : '');

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
  if (WANT_PNG) {
    const n = await page.evaluate(() => document.querySelectorAll('.page').length);
    for (let i = 0; i < n; i++) {
      const el = (await page.$$('.page'))[i];
      await el.screenshot({ path: path.join(OUTDIR, `page-${String(i + 1).padStart(2, '0')}.png`) });
    }
  }
  await browser.close();
  fs.unlinkSync(built);
  console.log((draft ? 'DRAFT — ' : '') + out, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB');
})();
