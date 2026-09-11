"use client";

/**
 * THE STAGE — half of it.
 *
 * One half of a monumental festival stage with a sculptural owl as its
 * centrepiece, drawn so the inner edge (x = 600) is a clean vertical. The
 * crossing renders it twice, the second mirrored, and parts them down that
 * seam. Closed, the two halves make one owl looking straight at you; open, it
 * splits down the middle and you walk through its face.
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
 * This owl is built instead out of the vocabulary this page already uses: the
 * eyes are concentric LED rings, which are the same arch bands the stage is
 * made of; the brow is a truss; the beak is a lighting blade. It is an owl
 * assembled from stage parts, in our palette, and it looks like nothing of
 * theirs.
 *
 * THE RESIDUAL RISK IS ASSOCIATION, NOT COPYING. An owl on a page about a
 * festival whose mark is an owl invites the comparison even when the drawing
 * shares nothing. That is a judgement the site owner made knowingly. If it
 * ever needs to go, delete the <Owl/> group — the stage underneath is complete
 * without it and was built that way first.
 */

const DECK = "#08030f";
const CHROME = "rgba(214,207,230,0.26)";

/** Centre of the arch, on the seam. The two halves share it. */
const CX = 600;
const CY = 545;

/** Point on the arch circle. θ in degrees, 90° = up, 180° = left.
 *  Rounded to 2dp: raw trig serialises differently on the server and the
 *  client, which is a hydration mismatch on every path at once. */
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

const BLADES = [96, 106, 116, 126, 136, 146, 156, 166, 176];

/** Eye centre and its ring radii, outermost first. */
const EYE = { x: 392, y: 352 };
const RINGS = [148, 122, 97, 73, 51];

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
        <radialGradient id="sa-core" cx="100%" cy={`${(CY / 900) * 100}%`} r="72%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.95" />
          <stop offset="18%" stopColor="#FF2E7E" stopOpacity="0.75" />
          <stop offset="46%" stopColor="#8B3DFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sa-blade" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#FF2E7E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="sa-blade-alt" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF7FA8" stopOpacity="0.75" />
          <stop offset="34%" stopColor="#8B3DFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.06" />
        </linearGradient>
        {/* The eye's own glow, so it reads as a lit fixture and not a target. */}
        <radialGradient id="sa-eye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.98" />
          <stop offset="34%" stopColor="#FF2E7E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={600} height={900} fill={DECK} />
      <rect x={0} y={0} width={600} height={900} fill="url(#sa-core)" />

      {/* ---------------- the radiating blades, behind everything ---------------- */}
      <g opacity={0.85}>
        {BLADES.map((t, i) => (
          <path
            key={t}
            d={blade(t, 120, 640, 3.6)}
            fill={i % 2 ? "url(#sa-blade-alt)" : "url(#sa-blade)"}
          />
        ))}
      </g>

      {/* ---------------- concentric arch bands ---------------- */}
      <g fill="none" strokeLinecap="round">
        <path d={band(196)} stroke="var(--edc-hot)" strokeWidth={14} opacity={0.8} />
        <path d={band(250)} stroke="var(--edc-violet)" strokeWidth={10} opacity={0.6} />
        <path d={band(300)} stroke="var(--edc-hot)" strokeWidth={6} opacity={0.42} />
        <path d={band(360)} stroke="var(--edc-blush)" strokeWidth={5} opacity={0.3} />
        <path d={band(430)} stroke={CHROME} strokeWidth={3} />
        <path d={band(505)} stroke={CHROME} strokeWidth={2.5} />
      </g>

      {/* ---------------- THE OWL ----------------
          Read the note at the top of this file before changing anything here.
          Delete this whole group and the stage still stands. */}
      <g>
        {/* the ear tuft — a swept truss blade, not a feather */}
        <path
          d="M236,206 L302,74 L352,196 L316,214 L286,150 L268,220 Z"
          fill={DECK}
          stroke="var(--edc-hot)"
          strokeWidth={3}
          opacity={0.95}
        />

        {/* the brow — one heavy arc sweeping from the outer edge to the seam */}
        <path
          d="M150,300 C238,196 402,176 600,232"
          fill="none"
          stroke="var(--edc-blush)"
          strokeWidth={11}
          strokeLinecap="round"
          opacity={0.9}
        />
        <path
          d="M158,326 C246,224 404,204 600,258"
          fill="none"
          stroke="var(--edc-violet)"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* the eye — concentric LED rings, the same language as the arch bands */}
        <g>
          <circle cx={EYE.x} cy={EYE.y} r={RINGS[0] + 16} fill={DECK} opacity={0.78} />
          {RINGS.map((r, i) => (
            <circle
              key={r}
              cx={EYE.x}
              cy={EYE.y}
              r={r}
              fill="none"
              stroke={i % 2 ? "var(--edc-violet)" : "var(--edc-hot)"}
              strokeWidth={i === 0 ? 7 : 5}
              opacity={0.55 + i * 0.1}
            />
          ))}
          <circle cx={EYE.x} cy={EYE.y} r={38} fill="url(#sa-eye)" />
          <circle cx={EYE.x} cy={EYE.y} r={13} fill="#FFF1DC" opacity={0.95} />
        </g>

        {/* the beak — half of it; the mirrored half completes it at the seam */}
        <path
          d="M600,392 L600,556 L528,432 Z"
          fill={DECK}
          stroke="var(--edc-hot)"
          strokeWidth={3.5}
        />
        <path d="M600,400 L546,430" stroke="var(--edc-blush)" strokeWidth={3} opacity={0.8} />
      </g>

      {/* ---------------- the proscenium mass ---------------- */}
      <path
        d={`M0,0 L600,0 L600,${CY - 520} A520,520 0 0 0 ${CX - 520},${CY} L${CX - 520},900 L0,900 Z`}
        fill={DECK}
        opacity={0.55}
      />

      {/* ---------------- the inner pillar ---------------- */}
      <g>
        <rect x={574} y={0} width={26} height={900} fill={DECK} opacity={0.72} />
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
        {Array.from({ length: 6 }, (_, i) => {
          const w = 58 - i * 4;
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
