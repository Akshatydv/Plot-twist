import { ImageResponse } from "next/og";

/**
 * The link preview for /invite — and the single most important image in the
 * whole funnel.
 *
 * When the invite is sent as a link in an Instagram DM, THIS is the object
 * that lands in the thread. The recipient sees it before they decide whether
 * to tap. So it has to carry the hook on its own, at thumbnail size, with no
 * interaction: it is doing the job the PDF cover used to do.
 *
 * Composed with layout primitives rather than the site's fonts — Satori would
 * need every font file fetched and embedded, which is a lot of weight for one
 * static image. The palette, the scale jump and the composition carry the
 * brand instead.
 *
 * Deliberately: no price, and no date in the headline. The preview poses the
 * question; the page answers it.
 */
export const alt = "The plot found you. — Plot Twist, Journey 00, Goa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function InviteOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "radial-gradient(120% 110% at 22% 8%, #3A1430 0%, #250C22 34%, #150714 62%, #0B0409 100%)",
          color: "#FFF1DC",
          fontFamily: "sans-serif",
        }}
      >
        {/* masthead */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              letterSpacing: 6,
              fontWeight: 700,
              color: "rgba(255,241,220,0.62)",
            }}
          >
            PLOT TWIST
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              letterSpacing: 6,
              fontWeight: 700,
              color: "rgba(255,241,220,0.62)",
            }}
          >
            JOURNEY 00 · GOA
          </div>
        </div>

        {/* the hook */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 34, color: "#FFE9A8", marginBottom: 6 }}>
            if this reached you,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1,
              color: "#FFF1DC",
            }}
          >
            THE PLOT
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#FF4F87",
            }}
          >
            FOUND YOU.
          </div>
        </div>

        {/* the facts, and the one instruction */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: 2,
                color: "#FFE9A8",
              }}
            >
              20 PEOPLE · 4 DAYS · 17–20 OCT 2026
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 10,
                fontSize: 17,
                letterSpacing: 4,
                fontWeight: 700,
                color: "rgba(255,241,220,0.55)",
              }}
            >
              INVITATION ONLY
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "14px 28px",
              background: "#FF4F87",
              color: "#FFF1DC",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            OPEN THE INVITE →
          </div>
        </div>
      </div>
    ),
    size
  );
}
