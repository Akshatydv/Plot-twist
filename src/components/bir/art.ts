/**
 * THE GENERATED LANDSCAPE — pure functions, no React.
 *
 * Every ridgeline, contour and star on the Bir × Barot page is computed here
 * from a fixed seed, so the server and the client produce byte-identical SVG
 * (no hydration mismatch) and the same mountain is the same mountain on every
 * visit. Nothing here touches the DOM, and all of it runs once at module load.
 *
 * Why generated rather than drawn: the page needs a dozen distinct ranges at
 * different depths, in four different palettes, and a hand-drawn set of that
 * size would be a design asset nobody can change. A seed is one number.
 */

/** mulberry32 — small, fast, good enough for scenery. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export type RidgeOpts = {
  seed: number;
  /** viewBox width. Ranges are drawn at 1600 and stretched with preserveAspectRatio="none". */
  width?: number;
  height?: number;
  /** Average height of the ridge, as a fraction of `height` from the top. 0 = top edge. */
  base: number;
  /** Peak-to-trough amplitude, as a fraction of `height`. */
  amp: number;
  /** 0.4 = soft hills, 0.65 = jagged Himalaya. */
  rough?: number;
};

/**
 * A mountain ridge by midpoint displacement, closed to the bottom edge so it
 * can be filled. Returns an SVG path `d`.
 */
export function ridgePath({ seed, width = 1600, height = 400, base, amp, rough = 0.55 }: RidgeOpts): string {
  const rand = rng(seed);
  const n = 128;
  const ys = new Array<number>(n + 1).fill(0);
  ys[0] = (rand() - 0.5) * amp;
  ys[n] = (rand() - 0.5) * amp;
  let step = n;
  let scale = amp;
  while (step > 1) {
    const half = step / 2;
    for (let i = half; i < n; i += step) {
      ys[i] = (ys[i - half] + ys[i + half]) / 2 + (rand() - 0.5) * scale;
    }
    step = half;
    scale *= rough;
  }
  const pts = ys.map((y, i) => `${r1((i / n) * width)},${r1((base + y) * height)}`);
  return `M0,${height} L${pts.join(" L")} L${width},${height} Z`;
}

/**
 * A set of closed, wobbling contour rings around one summit — the topo-map
 * texture for Day 03. Each ring is its own path so they can draw in sequence.
 */
export function contourRings({
  seed,
  cx,
  cy,
  rings = 9,
  r0 = 30,
  gap = 26,
  wobble = 0.22,
}: {
  seed: number;
  cx: number;
  cy: number;
  rings?: number;
  r0?: number;
  gap?: number;
  wobble?: number;
}): string[] {
  const rand = rng(seed);
  const harmonics = [2, 3, 5, 7].map((k) => ({ k, phase: rand() * Math.PI * 2, amp: rand() }));
  const out: string[] = [];
  for (let ring = 0; ring < rings; ring++) {
    const r = r0 + ring * gap;
    const pts: string[] = [];
    const steps = 72;
    for (let s = 0; s <= steps; s++) {
      const th = (s / steps) * Math.PI * 2;
      let d = 0;
      for (const h of harmonics) d += Math.sin(th * h.k + h.phase + ring * 0.18) * h.amp;
      const rr = r * (1 + (wobble * d) / harmonics.length);
      pts.push(`${r1(cx + Math.cos(th) * rr)},${r1(cy + Math.sin(th) * rr * 0.78)}`);
    }
    out.push(`M${pts.join(" L")} Z`);
  }
  return out;
}

export type Star = { x: number; y: number; r: number; delay: number };

/** Stars as percentages of the frame, so one set works at any aspect ratio. */
export function starField(seed: number, count: number, maxY = 70): Star[] {
  const rand = rng(seed);
  return Array.from({ length: count }, () => ({
    x: r1(rand() * 100),
    y: r1(rand() * maxY),
    r: r1(0.4 + rand() * rand() * 1.4),
    delay: r1(rand() * 6),
  }));
}

/**
 * An elevation profile for the Day 03 trek, as a smooth open path across a
 * 1000 × 300 box, rising left to right with two false summits. Returned with
 * a sampler so a marker can be placed ON the line at any progress.
 */
export function trekProfile(seed: number) {
  const rand = rng(seed);
  const n = 40;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    // rises overall, with two bumps and some jitter
    const rise = Math.pow(t, 1.15);
    const bumps = Math.sin(t * Math.PI * 3.2) * 0.06 + Math.sin(t * Math.PI * 7.1 + 1.3) * 0.025;
    const jitter = (rand() - 0.5) * 0.02;
    const y = 280 - (rise * 0.82 + bumps + jitter + 0.05) * 260;
    pts.push([t * 1000, Math.max(12, Math.min(290, y))]);
  }
  const d = `M${pts.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" L")}`;
  const area = `${d} L1000,300 L0,300 Z`;
  const at = (p: number): [number, number] => {
    const f = Math.max(0, Math.min(1, p)) * n;
    const i = Math.min(n - 1, Math.floor(f));
    const k = f - i;
    return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
  };
  return { d, area, at };
}

/**
 * A row of conifer silhouettes along a baseline — one path, many triangles
 * stacked in tiers, so a whole forest layer is a single fill. Coordinates in
 * a 1600 × 400 box, matching the ridges.
 */
export function pinesPath({
  seed,
  count = 60,
  baseY = 400,
  minH = 60,
  maxH = 160,
}: {
  seed: number;
  count?: number;
  baseY?: number;
  minH?: number;
  maxH?: number;
}): string {
  const rand = rng(seed);
  let d = `M0,400 L0,${baseY}`;
  const step = 1600 / count;
  for (let i = 0; i < count; i++) {
    const cx = i * step + step / 2 + (rand() - 0.5) * step * 0.6;
    const h = minH + rand() * (maxH - minH);
    const w = h * (0.32 + rand() * 0.1);
    const top = baseY - h;
    // three tiers, each a little narrower, drawn as one zig-zag outline
    d += ` L${r1(cx - w / 2)},${baseY}`;
    d += ` L${r1(cx - w * 0.22)},${r1(top + h * 0.62)} L${r1(cx - w * 0.4)},${r1(top + h * 0.64)}`;
    d += ` L${r1(cx - w * 0.14)},${r1(top + h * 0.32)} L${r1(cx - w * 0.3)},${r1(top + h * 0.34)}`;
    d += ` L${r1(cx)},${r1(top)}`;
    d += ` L${r1(cx + w * 0.3)},${r1(top + h * 0.34)} L${r1(cx + w * 0.14)},${r1(top + h * 0.32)}`;
    d += ` L${r1(cx + w * 0.4)},${r1(top + h * 0.64)} L${r1(cx + w * 0.22)},${r1(top + h * 0.62)}`;
    d += ` L${r1(cx + w / 2)},${baseY}`;
  }
  return `${d} L1600,${baseY} L1600,400 Z`;
}
