"use client";

import Image from "next/image";
import { hero } from "@/content/site";

/**
 * Real photography, colour-graded into the Plot Twist palette rather than
 * painted from scratch. The file is self-hosted in /public/photos: as the LCP
 * element it must not depend on a third-party CDN being reachable inside the
 * image optimizer's fetch timeout.
 */
export function SunsetBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1a0d18]">
      {/*
        A painted sunset sits under the photograph so a slow or failed load
        degrades to brand colour rather than a black hole. alt="" keeps the
        description out of the frame — the hero is atmosphere, and the copy
        on top already carries the meaning.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(135% 90% at 58% 68%, #ffd45e 0%, #ffa236 14%, #ff7a3d 26%, #fb5544 40%, #ef3a5f 54%, #a52468 74%, #3d1030 92%, #1a0d18 100%)",
        }}
        aria-hidden
      />
      <Image
        src={hero.photo.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_58%]"
      />

      {/* pulls a real photo into the brand's pink/orange without faking the sky */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(200deg, rgba(255,122,61,0.22) 0%, rgba(255,79,135,0.14) 45%, rgba(43,15,61,0.32) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{ background: "radial-gradient(120% 90% at 32% 8%, rgba(255,214,140,0.35) 0%, transparent 55%)" }}
      />

      {/* legibility scrims — darkest where the headline and CTA row sit */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,5,18,0.5)_0%,rgba(18,5,18,0.08)_26%,transparent_46%,rgba(14,4,16,0.74)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,4,16,0.62)_0%,rgba(14,4,16,0.2)_46%,transparent_72%)]" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
