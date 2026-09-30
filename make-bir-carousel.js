/* ============================================================================
   make-bir-carousel.js — render the Journey 03 (Bir × Barot) Instagram
   carousel from carousel-source.html.

     node make-bir-carousel.js   → dossiers/carousel/bir-barot-01.png … 08.png

   Each slide is 1080 × 1350 (Instagram's 4:5 portrait). Fonts are inlined as
   data URIs for the same reason as the dossier: headless Chromium blocks font
   loads from file:// pages. Photo credits for the caption are in
   carousel-assets/CAPTION.md.
   ========================================================================== */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUTDIR = path.join(ROOT, 'dossiers', 'carousel');
const FONTDIR = path.join(ROOT, 'bir-dossier-assets/fonts');

const fontCss = fs.readFileSync(path.join(FONTDIR, 'fonts.css'), 'utf8')
  .replace(/url\(([\w.-]+\.woff2)\)/g, (_, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(FONTDIR, f)).toString('base64')})`);
const html = fs.readFileSync(path.join(ROOT, 'carousel-source.html'), 'utf8')
  .replace('<link href="bir-dossier-assets/fonts/fonts.css" rel="stylesheet">', `<style>${fontCss}</style>`);

for (const m of html.matchAll(/url\('([^']+\.(?:jpg|png))'\)/g)) {
  if (!fs.existsSync(path.join(ROOT, m[1]))) throw new Error(`Missing image: ${m[1]}`);
}

const built = path.join(ROOT, '.bir-carousel-built.html');
fs.writeFileSync(built, html);
fs.mkdirSync(OUTDIR, { recursive: true });

(async () => {
  let chromium;
  try { ({ chromium } = require('playwright')); } catch {
    ({ chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto('file://' + built, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const slides = await page.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    const out = path.join(OUTDIR, `bir-barot-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: out });
  }
  await browser.close();
  fs.unlinkSync(built);
  console.log(`${slides.length} slides → ${OUTDIR}`);
})();
