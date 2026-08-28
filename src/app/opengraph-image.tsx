import { ImageResponse } from "next/og";
import { brand, hero } from "@/content/site";

/**
 * The social preview, generated at build time from the same copy as the page.
 *
 * Deliberately: no photograph of the destination, no place name, nothing that
 * reads as a generic travel ad. It's the hook and the withheld answer —
 * exactly what the hero says — so a shared link still poses the question.
 *
 * Built with plain layout primitives rather than the site's fonts: Satori
 * would need each font file fetched and embedded, which is a lot of weight
 * for one static image. The palette and the composition carry the brand.
 */
export const alt = "PLOT TWIST — You've found the plot. But do you know where it's going?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(135% 100% at 58% 78%, #FFD45E 0%, #FFA236 12%, #FF7A3D 26%, #FB5544 40%, #EF3A5F 54%, #A52468 74%, #3D1030 92%, #1A0D18 100%)",
          color: "#FFF1DC",
          fontFamily: "sans-serif",
        }}
      >
        {/* masthead */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "0.16em",
              border: "3px solid #FFF1DC",
              padding: "10px 20px",
            }}
          >
            {brand.name}
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.22em", opacity: 0.75, paddingTop: 12 }}>
            {hero.eyebrow}
          </div>
        </div>

        {/* the hook */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
            YOU&apos;VE FOUND THE PLOT.
          </div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 22, opacity: 0.9 }}>
            {hero.sub}
          </div>
          {/* the underline mark, straightened into a bar for Satori */}
          <div style={{ display: "flex", width: 320, height: 10, background: "#FF4F87", marginTop: 26 }} />
        </div>

        {/* the promise, never the place */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "0.04em" }}>
            {brand.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 26, opacity: 0.75 }}>{brand.instagram}</div>
        </div>
      </div>
    ),
    size
  );
}
