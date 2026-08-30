"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { DEFAULT_JOURNEY, journeyBySlug } from "@/content/journeys";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GOOGLE ANALYTICS 4 — loaded once, from the root layout, for every route.
 *
 * Two pieces, and the split matters:
 *
 * 1. The script tags below load gtag.js and configure it with
 *    `send_page_view: false`. That flag turns off GA's own automatic
 *    pageview-on-load — without it, the very first page a visitor lands on
 *    would get double-counted: once by GA's automatic send, once by
 *    <RouteChangeTracker> below.
 *
 * 2. <RouteChangeTracker> is the ONLY thing that ever calls
 *    `gtag('event', 'page_view', ...)`. Its effect fires on mount (the
 *    first load) and again whenever the pathname or query string changes
 *    (every client-side navigation, since Next.js App Router doesn't
 *    trigger a real page load for those). One tracker, one code path, one
 *    page_view per URL — there is nowhere else in this codebase a
 *    "page_view" GA event can originate. See the matching note in
 *    lib/analytics.ts, which deliberately excludes its own `page_view`
 *    plot-event from the generic gtag forward for exactly this reason.
 *
 * Renders nothing if the env var is unset — no script tag, no tracker, the
 * site behaves identically either way.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      {/*
        useSearchParams() opts the subtree into client-side rendering per
        Next.js's own rules, so it needs a Suspense boundary — otherwise the
        whole route below it would lose static rendering.
      */}
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}

/**
 * Which journey a URL belongs to, by path shape alone — never by reading
 * JourneyProvider's context. GoogleAnalytics mounts in the root layout's
 * <head>, outside the tree JourneyProvider wraps, so deriving this from the
 * pathname is not a workaround, it's the only thing that works. Routes with
 * no journey (/admin/*, /privacy, /terms) resolve to undefined — the param
 * is simply omitted for those, rather than carrying a stale value.
 */
function journeyIdForPath(pathname: string): string | undefined {
  if (pathname === "/") return DEFAULT_JOURNEY.id;
  const match = pathname.match(/^\/journey\/([^/]+)/);
  if (!match) return undefined;
  return journeyBySlug(match[1])?.id ?? undefined;
}

function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    const journeyId = journeyIdForPath(pathname);

    let sent = false;
    const send = () => {
      if (sent) return;
      sent = true;
      window.gtag?.("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
        // Which journey, never which destination — see the note in lib/analytics.ts.
        ...(journeyId ? { journey_id: journeyId } : {}),
      });
    };

    /**
     * On the first load the <title> is already correct (rendered server-
     * side) — send immediately. On a client-side navigation, the new
     * route's <title> streams in from the server a variable, unpredictable
     * amount of time after this effect fires (measured anywhere from under
     * 100ms to 1s+ depending on how fast that segment resolves), so no fixed
     * delay is reliable — a MutationObserver reacts to the actual change
     * instead of guessing at its timing. The 1.2s fallback guarantees a
     * page_view is sent regardless, just without a title, rather than lost.
     */
    if (document.title) {
      send();
      return;
    }

    const titleEl = document.querySelector("title");
    const observer = titleEl ? new MutationObserver(send) : null;
    observer?.observe(titleEl!, { childList: true });
    const fallback = window.setTimeout(send, 1200);

    return () => {
      observer?.disconnect();
      window.clearTimeout(fallback);
    };
    // pathname/searchParams are the whole point of the dependency array —
    // this must re-fire on every route change, including the first render.
  }, [pathname, searchParams]);

  return null;
}
