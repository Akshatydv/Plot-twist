/* ============================================================================
   make-card.js — the Instagram DM card. One image, one recipient.

     node make-card.js Deepali                 -> dm-cards/Plot-Twist-Deepali.jpg
     node make-card.js Deepali Arjun Riya      several at once
     node make-card.js --list guests.txt       one name per line
     node make-card.js --open                  no name, send to anyone

   Exports 1080x1350 (4:5) — the largest an image renders in a DM thread
   without being cropped in preview. Captured at 2x and downsampled so the
   type survives Instagram's recompression.

   Shares the <!--IF:NAMED--> / <!--IF:OPEN--> convention with the invite, so
   the two stay consistent in how a recipient is addressed.
   ========================================================================== */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'card-source.html');
const OUT = path.join(ROOT, 'dm-cards');
const W = 540, H = 675, SCALE = 2;      // 540x675 @2x = 1080x1350

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find(p => fs.existsSync(p));
if (!CHROME) { console.error('Chrome not found.'); process.exit(1); }

const argv = process.argv.slice(2);
const openMode = argv.includes('--open');
let names = argv.filter(a => !a.startsWith('--'));

const li = argv.indexOf('--list');
if (li !== -1 && argv[li + 1]) {
  names = fs.readFileSync(argv[li + 1], 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
}
if (!openMode && !names.length) {
  console.error('usage: node make-card.js <Name> [Name...] | --list guests.txt | --open');
  process.exit(1);
}

const tpl = fs.readFileSync(SRC, 'utf8');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function render(mode, name) {
  const keep = mode === 'open' ? 'OPEN' : 'NAMED';
  const drop = mode === 'open' ? 'NAMED' : 'OPEN';
  return tpl
    .replace(new RegExp('<!--IF:' + drop + '-->[\\s\\S]*?<!--/IF:' + drop + '-->', 'g'), '')
    .replace(new RegExp('<!--IF:' + keep + '-->|<!--/IF:' + keep + '-->', 'g'), '')
    .replace(/\{\{NAME\}\}/g, name ? esc(name) : '');
}

fs.mkdirSync(OUT, { recursive: true });

const jobs = openMode
  ? [{ mode: 'open', name: null, label: 'OPEN (no name)', file: 'Goa' }]
  : names.map(n => ({
      mode: 'named', name: n, label: n,
      file: n.replace(/[^\p{L}\p{N} _-]/gu, '').trim().replace(/\s+/g, '-'),
    }));

console.log(`rendering ${jobs.length} card${jobs.length > 1 ? 's' : ''}  (1080x1350)\n`);

(async () => {
  for (const job of jobs) {
    const tmpHtml = path.join(ROOT, `_card_${job.file}.html`);
    const tmpPng = path.join(ROOT, `_card_${job.file}.png`);
    const out = path.join(OUT, `Plot-Twist-${job.file}.jpg`);

    fs.writeFileSync(tmpHtml, render(job.mode, job.name));
    try {
      execFileSync(CHROME, [
        '--headless=new', '--disable-gpu', '--no-sandbox',
        '--allow-file-access-from-files', '--virtual-time-budget=20000',
        '--hide-scrollbars', `--window-size=${W},${H}`,
        `--force-device-scale-factor=${SCALE}`,
        `--screenshot=${tmpPng}`, `file:///${tmpHtml.replace(/\\/g, '/')}`,
      ], { stdio: ['ignore', 'pipe', 'pipe'] });

      await sharp(tmpPng)
        .resize(1080, 1350, { fit: 'cover' })
        .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toFile(out);
    } finally {
      fs.rmSync(tmpHtml, { force: true });
      fs.rmSync(tmpPng, { force: true });
    }

    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`  ${job.label.padEnd(14)} ${kb} KB   ${path.basename(out)}`);
  }
  console.log(`\ndone -> ${path.relative(ROOT, OUT)}/`);
})();
