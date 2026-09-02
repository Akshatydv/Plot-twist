import type { Metadata, Viewport } from "next";
import { Anton, Caveat, DM_Sans, Instrument_Serif, Permanent_Marker } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotwist.in";

const TITLE = "Plot Twist — 20 People. One Trip. 10/10s Only.";
const DESCRIPTION = "You've found the plot. But do you know where it's going?";

/**
 * Nothing here names the destination — a shared link has to pose the question,
 * not answer it. The OG image is generated from this same copy by
 * app/opengraph-image.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  applicationName: "Plot Twist",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Plot Twist",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#2b0f3d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dm.variable} ${anton.variable} ${marker.variable} ${caveat.variable} ${instrument.variable}`}>
      <head>
        {/* One instance, root layout only — every route (/, /journey/*, /admin/*, /privacy, /terms) mounts this exactly once. */}
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
