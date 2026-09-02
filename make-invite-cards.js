/* ============================================================================
   make-invite-cards.js — export the invite as social cards.

     node make-invite-cards.js                 open invite  -> cards/open/
     node make-invite-cards.js Deepali         named invite -> cards/Deepali/

   Instagram and Snapchat do not take PDFs, and the invite is a 1:8.7 strip —
   posted as one image it renders as an unreadable sliver. So it is cut at its
   own section seams into six cards and each is composed onto the two shapes
   those apps actually want:

     story/  1080x1920  Instagram Story, Snapchat, Reels cover  (9:16)
     post/   1080x1350  Instagram feed + carousel               (4:5)

   ─── WHY COMPOSE RATHER THAN RE-LAY-OUT ─────────────────────────────────
   The invite's proportions are tuned. Re-flowing every section into 9:16
   would mean re-tuning all of it and would fork the design from the PDF.
   Instead each section is rendered at its real proportions and centred on a
   card filled with that section's own background colour, so the card reads as
   the piece floating on its own ground. Nothing is cropped and nothing drifts.

   ─── THE SEAMS ──────────────────────────────────────────────────────────
   Cuts are taken from live element positions, not guessed pixel offsets, so
   they stay correct when the copy changes. THE GLIMPSE is split across two
   cards at the third chapter — all four chapters on one card would scale to
   about 70% and strand a third of the frame.
   ========================================================================== */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'invite-source.html');
const CSS_W = 431;           // the design's own width in CSS px
const OUT_W = 1080;          // export width
const DSF = OUT_W / CSS_W;   // device scale factor to hit it

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find(p => fs.existsSync(p));
if (!CHROME) { console.error('Chrome not found.'); process.exit(1); }

const name = process.argv.slice(2).find(a => !a.startsWith('--')) || null;
const mode = name ? 'named' : 'open';
const label = name || 'open';

/* same mode resolver as make-invite.js */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function render(tpl) {
  const keep = mode === 'open' ? 'OPEN' : 'NAMED';
  const drop = mode === 'open' ? 'NAMED' : 'OPEN';
  return tpl
    .replace(new RegExp('<!--IF:' + drop + '-->[\\s\\S]*?<!--/IF:' + drop + '-->', 'g'), '')
    .replace(new RegExp('<!--IF:' + keep + '-->|<!--/IF:' + keep + '-->', 'g'), '')
    .replace(/\{\{WA\}\}/g, '#')
    .replace(/\{\{PAGEH\}\}/g, '1000')
    .replace(/\{\{NAME\}\}/g, name ? esc(name) : '');
}

/* Each card: the seam to cut at, and the ground it sits on. */
const CARDS = [
  { id: '1-cover',    from: ['.cover'],   to: ['.pass'],      bg: '#140713' },
  { id: '2-pass',     from: ['.pass'],    to: ['.glimpse'],   bg: '#fff1dc' },
  { id: '3-chapters', from: ['.glimpse'], to: ['.chap', 2],   bg: '#180a14' },
  { id: '4-chapters', from: ['.chap', 2], to: ['.final'],     bg: '#180a14' },
  { id: '5-yes',      from: ['.final'],   to: null,           bg: '#0d0710' },
];

const probe = `<script>
  window.addEventListener('load', () => {
    const at = spec => {
      if (!spec) return null;
      const [sel, i] = spec;
      const el = document.querySelectorAll(sel)[i || 0];
      return el ? Math.round(el.getBoundingClientRect().top + scrollY) : null;
    };
    const H = Math.round(document.querySelector('main').getBoundingClientRect().height);
    const seams = ${JSON.stringify(CARDS.map(c => [c.from, c.to]))}
      .map(([a, b]) => [at(a), b ? at(b) : H]);
    document.title = 'SEAMS:' + JSON.stringify(seams);
  });
</script></body>`;

const tpl = fs.readFileSync(SRC, 'utf8');
const html = render(tpl);
const tmp = path.join(ROOT, '_cards.html');
fs.writeFileSync(tmp, html.replace('</body>', probe));

function chrome(args) {
  return execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--allow-file-access-from-files', '--virtual-time-budget=20000', ...args],
    { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 28 });
}

const url = `file:///${tmp.replace(/\\/g, '/')}`;
const dom = chrome([`--window-size=${CSS_W},900`, '--dump-dom', url]).toString();
const m = dom.match(/SEAMS:(\[.*?\])<\/title>/);
if (!m) { console.error('could not read seams'); process.exit(1); }
const seams = JSON.parse(m[1]);
const docH = Math.max(...seams.map(s => s[1]));

/* one tall capture at export resolution, then cut it */
const strip = path.join(ROOT, '_strip.png');
chrome([`--window-size=${CSS_W},${docH}`, `--force-device-scale-factor=${DSF}`,
        `--screenshot=${strip}`, url]);
fs.unlinkSync(tmp);

const SHAPES = [
  { dir: 'story', w: 1080, h: 1920 },
  { dir: 'post',  w: 1080, h: 1350 },
];

(async () => {
  const meta = await sharp(strip).metadata();
  const scale = meta.width / CSS_W;   // actual px per CSS px
  const base = path.join(ROOT, 'cards', label);

  /* wipe first: an earlier run with different seams left orphaned cards in
     here, which is worse than no cards — you cannot tell which set is current */
  for (const s of SHAPES) {
    const dir = path.join(base, s.dir);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  }
  console.log(`invite: ${label}   capture ${meta.width}x${meta.height}\n`);

  for (let i = 0; i < CARDS.length; i++) {
    const c = CARDS[i];
    /* inset the seam by a pixel each side: rounding was letting a sliver of
       the NEXT section's background bleed in as a dark strip along the edge */
    const top = Math.round(seams[i][0] * scale) + 1;
    const bot = Math.round(seams[i][1] * scale) - 2;
    const slice = await sharp(strip)
      .extract({ left: 0, top, width: meta.width, height: bot - top })
      .toBuffer();

    for (const s of SHAPES) {
      const out = path.join(base, s.dir, `${c.id}.jpg`);
      await sharp(slice)
        .resize({ width: s.w, height: s.h, fit: 'contain', background: c.bg })
        .flatten({ background: c.bg })
        .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toFile(out);
    }
    console.log(`  ${c.id.padEnd(10)} ${meta.width}x${bot - top}  -> story + post`);
  }

  fs.unlinkSync(strip);
  console.log(`\ndone -> cards/${label}/story  (1080x1920)`);
  console.log(`        cards/${label}/post   (1080x1350)`);
})();
