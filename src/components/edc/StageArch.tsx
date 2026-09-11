"use client";

/**
 * THE STAGE — half of it.
 *
 * A circular stage centrepiece with a sculptural owl at its middle, drawn so
 * the inner edge (x = 600) is a clean vertical. The crossing renders it twice,
 * the second mirrored, and parts them down that seam. Closed, the two halves
 * make one owl looking straight at you inside a ring of light; open, it splits
 * down the middle and you walk through its face.
 *
 * ─── THE OWL IS OURS, AND IT HAD TO BE ──────────────────────────────────────
 * EDC's own mark is an owl, so this needs saying plainly: an owl is a bird and
 * nobody owns one. What IS owned is their particular expression of it, and
 * every distinctive element of that is deliberately absent here —
 *
 *     no sunflower eyes          no rainbow palm-frond wings
 *     no tropical island         no starfield
 *     no flowing ribbon forms    no reproduction of their geometry
 *
 * This owl is built out of the vocabulary the page already uses: the eyes are
 * concentric LED rings, the brow is a light blade, the halo behind it is the
 * same banding the rest of the page runs on. An owl assembled from stage
 * parts, in our palette.
 *
 * THE RESIDUAL RISK IS ASSOCIATION, NOT COPYING. An owl on a page about a
 * festival whose mark is an owl invites the comparison even when the drawing
 * shares nothing. That is a judgement the site owner made knowingly. Delete
 * the OWL group and the halo still stands on its own.
 *
 * ─── WHY IT IS ROUND, AND WHY THE TOWERS ARE GONE ───────────────────────────
 * The first pass framed the owl in a rectangular proscenium with truss towers
 * and hanging speaker arrays down both sides. Two problems: the towers ate the
 * outer third of each half with structure nobody looks at, and the rectangular
 * frame fought the roundness of the eyes. Stripping them leaves one circular
 * object, centred on the seam, which is what the composition wanted to be.
 *
 * ─── WHAT MUST NOT COME BACK ────────────────────────────────────────────────
 * Anything below y≈600. The crop is centred vertically, so content that sits
 * low on the canvas pushes the composition out of frame on short viewports and
 * leaves dead gradient in the middle. The canvas is sized to the artwork on
 * purpose.
 */

const DECK = "#08030f";

/** The seam, and the centre of the whole composition. */
const CX = 600;
const CY = 318;

/** Canvas height, sized to the artwork so the centred crop always lands on it. */
const H = 640;

/**
 * Point on a circle about the centre. θ in degrees, 90° = up, 180° = left,
 * 270° = down.
 *
 * Rounded to 2dp because raw trig serialises differently on the server and
 * the client, which is a hydration mismatch on every path at once.
 */
function pt(theta: number, r: number) {
  const rad = (theta * Math.PI) / 180;
  return [
    Math.round((CX + r * Math.cos(rad)) * 100) / 100,
    Math.round((CY - r * Math.sin(rad)) * 100) / 100,
  ] as const;
}

/** A halo ring — the left semicircle, top round to bottom. The mirrored half
 *  completes the circle at the seam. */
function halo(r: number) {
  const [lx, ly] = pt(180, r);
  return `M${CX},${CY - r} A${r},${r} 0 0 0 ${lx},${ly} A${r},${r} 0 0 0 ${CX},${CY + r}`;
}

/** One radiating blade: a thin wedge from the core outward. */
function blade(theta: number, inner: number, outer: number, halfWidth: number) {
  const [ax, ay] = pt(theta - halfWidth, inner);
  const [bx, by] = pt(theta + halfWidth, inner);
  const [cx, cy] = pt(theta + halfWidth * 0.55, outer);
  const [dx, dy] = pt(theta - halfWidth * 0.55, outer);
  return `M${ax},${ay} L${bx},${by} L${cx},${cy} L${dx},${dy} Z`;
}

/** Blades fan the full left semicircle now that nothing blocks the outer edge. */
const BLADES = [96, 110, 124, 138, 152, 166, 180, 194, 208, 222, 236, 250, 264];

/** The eye, and its rings outermost first. */
const EYE = { x: 428, y: 286 };
const RINGS = [104, 85, 67, 50, 35];

export function StageArch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 600 ${H}`}
      preserveAspectRatio="xMaxYMid slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id="sa-core" cx="100%" cy={`${(CY / H) * 100}%`} r="78%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.9" />
          <stop offset="16%" stopColor="#FF2E7E" stopOpacity="0.7" />
          <stop offset="46%" stopColor="#8B3DFF" stopOpacity="0.36" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sa-blade" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.75" />
          <stop offset="30%" stopColor="#FF2E7E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="sa-blade-alt" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF7FA8" stopOpacity="0.7" />
          <stop offset="34%" stopColor="#8B3DFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="sa-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.98" />
          <stop offset="34%" stopColor="#FF2E7E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={600} height={H} fill={DECK} />
      <rect x={0} y={0} width={600} height={H} fill="url(#sa-core)" />

      {/* ---------------- the radiating blades ---------------- */}
      <g opacity={0.8}>
        {BLADES.map((t, i) => (
          <path
            key={t}
            d={blade(t, 96, 520, 3.4)}
            fill={i % 2 ? "url(#sa-blade-alt)" : "url(#sa-blade)"}
          />
        ))}
      </g>

      {/* ---------------- the halo ----------------
          Full rings about the seam. With the towers gone this is the only
          frame the composition has, so it carries the structure. */}
      <g fill="none" strokeLinecap="round">
        <path d={halo(196)} stroke="var(--edc-hot)" strokeWidth={13} opacity={0.8} />
        <path d={halo(238)} stroke="var(--edc-violet)" strokeWidth={9} opacity={0.6} />
        <path d={halo(282)} stroke="var(--edc-hot)" strokeWidth={6} opacity={0.4} />
        <path d={halo(322)} stroke="var(--edc-blush)" strokeWidth={4} opacity={0.28} />
      </g>

      {/* ---------------- THE OWL ----------------
          Read the note at the top of this file before changing anything here. */}
      <g>
        {/* the ear tuft — a swept blade, not a feather */}
        <path
          d="M318,150 L392,44 L430,158 L398,172 L376,110 L346,168 Z"
          fill={DECK}
          stroke="var(--edc-hot)"
          strokeWidth={3}
          opacity={0.95}
        />

        {/* the brow, sweeping from the outer edge in to the seam */}
        <path
          d="M262,244 C320,150 452,132 600,170"
          fill="none"
          stroke="var(--edc-blush)"
          strokeWidth={10}
          strokeLinecap="round"
          opacity={0.9}
        />
        <path
          d="M272,268 C330,176 456,158 600,194"
          fill="none"
          stroke="var(--edc-violet)"
          strokeWidth={4.5}
          strokeLinecap="round"
          opacity={0.65}
        />

        {/* the eye — concentric LED rings */}
        <g>
          <circle cx={EYE.x} cy={EYE.y} r={RINGS[0] + 14} fill={DECK} opacity={0.72} />
          {RINGS.map((r, i) => (
            <circle
              key={r}
              cx={EYE.x}
              cy={EYE.y}
              r={r}
              fill="none"
              stroke={i % 2 ? "var(--edc-violet)" : "var(--edc-hot)"}
              strokeWidth={i === 0 ? 6 : 4}
              opacity={0.55 + i * 0.1}
            />
          ))}
          <circle cx={EYE.x} cy={EYE.y} r={27} fill="url(#sa-eye)" />
          <circle cx={EYE.x} cy={EYE.y} r={9} fill="#FFF1DC" opacity={0.95} />
        </g>

        {/* the beak — half of it; the mirrored half completes it at the seam */}
        <path
          d="M600,322 L600,452 L546,352 Z"
          fill={DECK}
          stroke="var(--edc-hot)"
          strokeWidth={3.5}
        />
        <path d="M600,330 L558,352" stroke="var(--edc-blush)" strokeWidth={2.5} opacity={0.8} />
      </g>

      {/* ---------------- the seam edge ----------------
          The brightest line on the structure, because it is the edge you walk
          past when the halves part. */}
      <g>
        <path d={`M600,0 L600,${H}`} stroke="var(--edc-hot)" strokeWidth={6} />
        <path d={`M592,0 L592,${H}`} stroke="var(--edc-blush)" strokeWidth={1.5} opacity={0.6} />
      </g>
    </svg>
  );
}
