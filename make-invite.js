/* ============================================================================
   make-invite.js — render one personalised invite PDF per guest.

     node make-invite.js Deepali                    one personalised invite
     node make-invite.js Deepali Arjun Riya          several at once
     node make-invite.js --list guests.txt           one name per line
     node make-invite.js --open                      the general invite, no name

   Output: invites/Plot-Twist-Invite-<Name>.pdf
           invites/Plot-Twist-Invite-Goa.pdf   (--open)

   ─── TWO MODES, ONE SOURCE ───────────────────────────────────────────────
   invite-source.html carries both versions, marked with <!--IF:NAMED--> and
   <!--IF:OPEN--> blocks; this script keeps one and strips the other. That is
   deliberate: a copy change to a chapter beat or the pass has to land on both
   invites, and two separate files would drift apart within a week.

   The open version is not the named one with the name deleted. Removing it
   would leave a greeting reading "for ," and an empty passenger field, and it
   would leave two lines making a claim we cannot make about a stranger. So the
   greeting becomes "if this reached you", the pass becomes a blank ticket you
   write yourself, and "We think you are one of them" becomes a question.

   ─── HOW THIS DIFFERS FROM THE MAC RENDERER ───────────────────────────────
   The original drove a live Next.js route over CDP, scrolled it to trigger
   framer-motion reveals, screenshotted it, and hand-assembled a PDF so it
   could bolt link annotations onto a flat image. It had to: printing that page
   either lost the reveals or lost the gradient scrims.

   invite-source.html has no JavaScript and nothing that animates in, so it can
   be printed directly. That means real vector text, live links for free, and
   no screenshot step — which also removes the macOS-only dependencies
   (/Applications/Google Chrome.app and /usr/bin/sips).

   ─── PAGE HEIGHT ─────────────────────────────────────────────────────────
   The page is one tall sheet, so the @page height must match the content or
   Chrome will either clip it or leave a blank tail. measure() loads the page
   headless and reports the real height; --measure prints it so the value in
   invite-source.html can be corrected when the design changes.
   ========================================================================== */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'invite-source.html');
const OUTDIR = path.join(ROOT, 'invites');

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find(p => fs.existsSync(p));
if (!CHROME) { console.error('Chrome not found.'); process.exit(1); }

const argv = process.argv.slice(2);
const measureOnly = argv.includes('--measure');
const openMode   = argv.includes('--open');
let names = argv.filter(a => !a.startsWith('--'));

const listIdx = argv.indexOf('--list');
if (listIdx !== -1 && argv[listIdx + 1]) {
  names = fs.readFileSync(argv[listIdx + 1], 'utf8')
    .split(/\r?\n/).map(s => s.trim()).filter(Boolean);
}

if (!measureOnly && !openMode && !names.length) {
  console.error('usage: node make-invite.js <Name> [Name...] | --list guests.txt | --open | --measure');
  process.exit(1);
}

const template = fs.readFileSync(SRC, 'utf8');

/* The sheet is one tall page, so its height must match the content exactly or
   Chrome clips it / leaves a blank tail. The two modes differ: the open pass
   carries a blank signature line where the named one carries a name, so it
   runs ~21mm longer. Re-measure with --measure (add --open for that mode)
   after any design change and update these. */
const PAGE_H = { named: 989, open: 994 };

/* A guest's name lands inside HTML, so it gets escaped. Nobody is called
   "<script>", but the invite is generated from a list somebody types. */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Keep one mode's blocks, drop the other's. */
function render(mode, name) {
  const keep = mode === 'open' ? 'OPEN' : 'NAMED';
  const drop = mode === 'open' ? 'NAMED' : 'OPEN';
  const wa = mode === 'open'
    ? 'https://wa.me/919013806803?text=Saw%20the%20Goa%20invite%20%F0%9F%8C%B4%20I%27m%20in%20%E2%80%94%20send%20me%20the%20plot'
    : 'https://wa.me/919013806803?text=I%27m%20in%20for%20Goa%20%F0%9F%8C%B4%20send%20me%20the%20rest%20of%20the%20plot';
  return template
    .replace(new RegExp('<!--IF:' + drop + '-->[\\s\\S]*?<!--/IF:' + drop + '-->', 'g'), '')
    .replace(new RegExp('<!--IF:' + keep + '-->|<!--/IF:' + keep + '-->', 'g'), '')
    .replace(/{{WA}}/g, wa)
    .replace(/{{PAGEH}}/g, String(PAGE_H[mode] || PAGE_H.named))
    .replace(/{{NAME}}/g, name ? esc(name) : '');
}

function chrome(args) {
  return execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--allow-file-access-from-files', '--virtual-time-budget=20000',
    ...args,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
}

/* --measure: what height does the content actually need? */
function measure() {
  const tmp = path.join(ROOT, '_measure.html');
  fs.writeFileSync(tmp, render(openMode ? 'open' : 'named', 'Measure')
    .replace('</body>', `<script>
      window.addEventListener('load', () => {
        const h = document.querySelector('main').getBoundingClientRect().height;
        document.title = 'H=' + (h / 3.7795275591).toFixed(1) + 'mm';
      });
    </script></body>`));
  const dump = chrome(['--dump-dom', `file:///${tmp.replace(/\\/g, '/')}`]).toString();
  fs.unlinkSync(tmp);
  const m = dump.match(/H=([\d.]+)mm/);
  console.log(m ? `content height: ${m[1]}mm  (set @page size: 114mm ${Math.ceil(+m[1])}mm)`
                : 'could not measure');
}

if (measureOnly) { measure(); process.exit(0); }

fs.mkdirSync(OUTDIR, { recursive: true });

/* One job list, so --open and the named runs share the whole render path
   below and cannot drift in how they are produced or checked. */
const jobs = openMode
  ? [{ mode: 'open', name: null, label: 'OPEN (no name)', file: 'Goa' }]
  : names.map(n => ({
      mode: 'named',
      name: n,
      label: n,
      file: n.replace(/[^\p{L}\p{N} _-]/gu, '').trim().replace(/\s+/g, '-'),
    }));

console.log(`rendering ${jobs.length} invite${jobs.length > 1 ? 's' : ''}\n`);

for (const job of jobs) {
  const tmp = path.join(ROOT, `_invite_${job.file}.html`);
  const out = path.join(OUTDIR, `Plot-Twist-Invite-${job.file}.pdf`);

  fs.writeFileSync(tmp, render(job.mode, job.name));
  try {
    chrome(['--print-to-pdf-no-header', `--print-to-pdf=${out}`,
            `file:///${tmp.replace(/\\/g, '/')}`]);
  } finally { fs.unlinkSync(tmp); }

  const b = fs.readFileSync(out);
  const s = b.toString('latin1');
  const links = (s.match(/\/Subtype\s*\/Link/g) || []).length;
  const wa = /wa\.me/.test(s);
  const fonts = (s.match(/\/Type\s*\/Font/g) || []).length;
  console.log(
    `  ${job.label.padEnd(14)} ${(b.length / 1048576).toFixed(2)}MB  ` +
    `${links} links  ${fonts} fonts  ${wa ? "I'M IN -> WhatsApp OK" : '!! NO WHATSAPP LINK'}`
  );
}

console.log(`\ndone -> ${path.relative(ROOT, OUTDIR)}/`);
