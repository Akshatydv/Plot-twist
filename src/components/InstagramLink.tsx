"use client";

import type { ReactNode } from "react";
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
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => track(PLOT_EVENTS.openInstagram)}
      className={className}
    >
      {children}
    </a>
  );
}
