"use client";

import { useState } from "react";

/**
 * Per-guest review link actions on /admin/guests.
 *
 * "WhatsApp" opens the admin's own WhatsApp with the message pre-written; a
 * person presses send. Nothing is sent automatically from the server.
 */
export function ReviewLinkButtons({ url, waHref }: { url: string; waHref: string | null }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="flex flex-wrap gap-1.5">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            window.prompt("Copy this link:", url);
          }
        }}
        className="border border-sand/30 px-2 py-0.5 text-xs hover:border-sand/60"
      >
        {copied ? "Copied ✓" : "Copy link"}
      </button>
      {waHref && (
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="border border-[#36c96f]/50 px-2 py-0.5 text-xs text-[#7be8a6] hover:border-[#36c96f]">
          WhatsApp
        </a>
      )}
    </span>
  );
}
