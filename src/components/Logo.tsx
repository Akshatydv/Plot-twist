import Image from "next/image";
import logo from "../../public/brand/logo.png";

/**
 * The final mark. White-on-transparent, so it only reads correctly on the
 * site's dark surfaces (hero, footer, the 404 page) — everywhere it's
 * currently used. If a light-background spot needs one later, that's a
 * second export here, not a recolour of this file (it's a raster, not an SVG).
 *
 * Sized entirely by the caller's font-size on `className`, the same contract
 * the placeholder used — nobody sizing this needs to know it became an image.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Plot Twist"
      className={`inline-block h-[3.6em] w-auto select-none ${className}`}
      priority
    />
  );
}
