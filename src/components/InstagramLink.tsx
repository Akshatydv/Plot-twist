"use client";

import type { CSSProperties, ReactNode } from "react";
import { PLOT_EVENTS, track } from "@/lib/analytics";

/**
 * An outbound link to the grid that reports the click.
 *
 * Exists as its own client component so the Footer can stay a Server
 * Component — only the link needs to be interactive, not the whole footer.
 */
export function InstagramLink({
  href,
  children,
  className = "",
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** The footer sets its colour per tone; a class cannot, since it varies. */
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => track(PLOT_EVENTS.openInstagram)}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
