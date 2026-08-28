"use client";

export function Ticker({
  items,
  bg = "#FF4F87",
  fg = "#FFF1DC",
  rotate = -1.4,
  className = "",
}: {
  items: string[];
  bg?: string;
  fg?: string;
  rotate?: number;
  className?: string;
}) {
  const run = [...items, ...items];
  return (
    <div
      className={`relative z-20 overflow-hidden py-3 sm:py-4 ${className}`}
      style={{ background: bg, color: fg, transform: `rotate(${rotate}deg)`, width: "104%", marginLeft: "-2%" }}
      aria-hidden
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap will-change-transform sm:gap-12">
        {run.concat(run).map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-[clamp(0.95rem,2.6vw,1.6rem)] tracking-[0.06em] sm:gap-12">
            {item}
            <span className="text-[0.7em] opacity-70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
