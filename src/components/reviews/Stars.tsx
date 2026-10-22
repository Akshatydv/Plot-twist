/**
 * A row of five stars. `rating` can be fractional (an average): the last star
 * is clipped to the right width rather than rounded up, so 4.4 never reads as 5.
 */
const PATH = "M12 2.2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3l-6.1 3.5 1.4-6.8L2.2 9.3l6.9-.8L12 2.2z";

export function Stars({
  rating,
  size = 18,
  color = "#FF4F87",
  empty = "rgba(26,13,10,0.18)",
  label = true,
  className = "",
}: {
  rating: number;
  size?: number;
  color?: string;
  empty?: string;
  /** Announce "Rated 4 out of 5" to screen readers. Turn off where the number is printed beside it. */
  label?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[3px] ${className}`}
      role={label ? "img" : undefined}
      aria-label={label ? `Rated ${rating} out of 5` : undefined}
      aria-hidden={label ? undefined : true}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <clipPath id={`s-${i}-${Math.round(fill * 100)}-${size}`}>
                <rect x="0" y="0" width={24 * fill} height="24" />
              </clipPath>
            </defs>
            <path d={PATH} fill={empty} />
            {fill > 0 && <path d={PATH} fill={color} clipPath={`url(#s-${i}-${Math.round(fill * 100)}-${size})`} />}
          </svg>
        );
      })}
    </span>
  );
}
