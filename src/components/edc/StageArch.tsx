"use client";

/**
 * THE MAINSTAGE ARCH — half of it.
 *
 * One half of a monumental festival stage, drawn so its inner edge (x = 600)
 * is a clean vertical. The crossing renders it twice, the second mirrored, and
 * parts them down that seam. Closed they read as one symmetrical stage; open,
 * you walk through the middle of it.
 *
 * ─── WHAT IT IS DELIBERATELY NOT ────────────────────────────────────────────
 * NOT a reproduction of kineticFIELD or any other EDC stage. Those designs —
 * especially their sculptural centrepieces — are proprietary artwork and trade
 * dress, and the affiliation rule for this page (content/thailand.ts) rules
 * out copying EDC artwork outright. There is no figure, no crown, no
 * recreation of any identifiable stage here.
 *
 * What it draws is the staging grammar that every large festival shares and
 * nobody owns:
 *
 *   · a fan of radiating LED blades from a bright core
 *   · concentric arch bands stepping outward
 *   · a blown-out centre bloom
 *   · heavy truss towers with hanging line arrays
 *
 * Recognisable as "a mainstage", traceable to no particular one.
 *
 * ─── WHY IT IS SOLID AND NOT WIREFRAME ──────────────────────────────────────
 * The first version was thin outlines on dark, and it read as a technical
 * drawing rather than a lit object — an architect's elevation, not a stage.
 * This one is built from FILLED wedges and thick lit arcs, with the linework
 * reduced to structural accents. A stage at night is mass and light; the
 * outlines are the least important part of it.
 */

const DECK = "#08030f";
const CHROME = "rgba(214,207,230,0.26)";

/** Centre of the arch, on the seam. The two halves share it. */
const CX = 600;
const CY = 545;

/**
 * Point on the arch circle. θ in degrees, 90° = straight up, 180° = left.
 *
 * ROUNDED TO 2dp, AND THAT IS NOT COSMETIC. This component renders on the
 * server and again on the client, and raw `Math.cos`/`Math.sin` output
 * serialised at full precision can differ in its last digits between the two
 * passes. React compares the `d` attribute as a string, so that is a hydration
 * mismatch on every blade at once. Two decimal places is far finer than a
 * pixel at this viewBox and is identical on both passes.
 */
function pt(theta: number, r: number) {
  const rad = (theta * Math.PI) / 180;
  return [
    Math.round((CX + r * Math.cos(rad)) * 100) / 100,
    Math.round((CY - r * Math.sin(rad)) * 100) / 100,
  ] as const;
}

/** An arch band from straight-up round to straight-left. */
function band(r: number) {
  const [lx, ly] = pt(180, r);
  const [tx, ty] = pt(90, r);
  return `M${lx},${ly} A${r},${r} 0 0 1 ${tx},${ty}`;
}

/** One radiating blade: a thin wedge from the core outward. */
function blade(theta: number, inner: number, outer: number, halfWidth: number) {
  const [ax, ay] = pt(theta - halfWidth, inner);
  const [bx, by] = pt(theta + halfWidth, inner);
  const [cx, cy] = pt(theta + halfWidth * 0.55, outer);
  const [dx, dy] = pt(theta - halfWidth * 0.55, outer);
  return `M${ax},${ay} L${bx},${by} L${cx},${cy} L${dx},${dy} Z`;
}

/** Blade angles, up (90°) round to left (180°). */
const BLADES = [96, 106, 116, 126, 136, 146, 156, 166, 176];

export function StageArch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 900"
      preserveAspectRatio="xMaxYMid slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        {/* The core bloom behind everything — the reason the blades read as lit
            rather than painted. */}
        <radialGradient id="ga-core" cx="100%" cy={`${(CY / 900) * 100}%`} r="72%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.95" />
          <stop offset="18%" stopColor="#FF2E7E" stopOpacity="0.75" />
          <stop offset="46%" stopColor="#8B3DFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0" />
        </radialGradient>

        {/* Blades are brightest at the root and fall off outward, like a real
            LED fan seen through haze. */}
        <linearGradient id="ga-blade" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.85" />
          <stop offset="30%" stopColor="#FF2E7E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="ga-blade-alt" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF7FA8" stopOpacity="0.8" />
          <stop offset="34%" stopColor="#8B3DFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* the solid mass of the structure, so light reads against something */}
      <rect x={0} y={0} width={600} height={900} fill={DECK} />

      {/* ---------------- the core bloom ---------------- */}
      <rect x={0} y={0} width={600} height={900} fill="url(#ga-core)" />

      {/* ---------------- the radiating blades ---------------- */}
      <g>
        {BLADES.map((t, i) => (
          <path
            key={t}
            d={blade(t, 120, 640, 3.6)}
            fill={i % 2 ? "url(#ga-blade-alt)" : "url(#ga-blade)"}
          />
        ))}
      </g>

      {/* ---------------- concentric arch bands ----------------
          Stepping outward from the core. The inner two are lit hard; the outer
          ones fall back into structure. */}
      <g fill="none" strokeLinecap="round">
        <path d={band(168)} stroke="#FFF1DC" strokeWidth={9} opacity={0.9} />
        <path d={band(196)} stroke="var(--edc-hot)" strokeWidth={16} opacity={0.95} />
        <path d={band(250)} stroke="var(--edc-violet)" strokeWidth={11} opacity={0.72} />
        <path d={band(300)} stroke="var(--edc-hot)" strokeWidth={7} opacity={0.5} />
        <path d={band(360)} stroke="var(--edc-blush)" strokeWidth={5} opacity={0.35} />
        <path d={band(430)} stroke={CHROME} strokeWidth={3} />
        <path d={band(505)} stroke={CHROME} strokeWidth={2.5} />
      </g>

      {/* ---------------- the proscenium frame ----------------
          A heavy dark mass around the arch, which is what stops the blades
          bleeding into the sky and gives the whole thing an edge. */}
      <path
        d={`M0,0 L600,0 L600,${CY - 520} A520,520 0 0 0 ${CX - 520},${CY} L${CX - 520},900 L0,900 Z`}
        fill={DECK}
        opacity={0.92}
      />

      {/* ---------------- the inner pillar ----------------
          Frames the opening; its inner face is the brightest edge on the
          structure because it is the edge you walk past. */}
      {/* Narrow on purpose. It was 66 units wide, which put a heavy dark column
          down the middle of the closed stage and broke the arch bands in half
          at the seam — the two halves stopped reading as one structure. At 26
          it still frames the opening without cutting the arch. */}
      <g>
        <rect x={574} y={0} width={26} height={900} fill={DECK} opacity={0.9} />
        <path d="M600,0 L600,900" stroke="var(--edc-hot)" strokeWidth={7} />
        <path d="M591,0 L591,900" stroke="var(--edc-blush)" strokeWidth={2} opacity={0.7} />
      </g>

      {/* ---------------- the outer truss tower ---------------- */}
      <g>
        <rect x={84} y={150} width={104} height={750} fill={DECK} stroke={CHROME} strokeWidth={2.5} />
        {Array.from({ length: 12 }, (_, i) => {
          const y = 162 + i * 62;
          return (
            <path
              key={i}
              d={
                i % 2
                  ? `M88,${y} L184,${y + 62} M88,${y + 62} L184,${y + 62}`
                  : `M184,${y} L88,${y + 62} M88,${y + 62} L184,${y + 62}`
              }
              stroke={CHROME}
              strokeWidth={2}
              fill="none"
            />
          );
        })}
        <path d="M188,152 L188,898" stroke="var(--edc-violet)" strokeWidth={3} opacity={0.75} />
      </g>

      {/* ---------------- hanging line array ---------------- */}
      <g>
        <path d="M264,150 L264,196" stroke={CHROME} strokeWidth={2} />
        {Array.from({ length: 7 }, (_, i) => {
          const w = 62 - i * 4;
          const y = 196 + i * 21;
          return (
            <rect
              key={i}
              x={264 - w / 2}
              y={y}
              width={w}
              height={19}
              fill={DECK}
              stroke={CHROME}
              strokeWidth={1.6}
            />
          );
        })}
      </g>

      {/* ---------------- the deck ---------------- */}
      <g>
        <rect x={0} y={852} width={600} height={48} fill={DECK} />
        <path d="M0,852 L600,852" stroke="var(--edc-blush)" strokeWidth={3} opacity={0.85} />
      </g>
    </svg>
  );
}
