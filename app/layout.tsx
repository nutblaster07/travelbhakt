import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3001"),

  title: {
    default: "TravelBhakt | Discover Incredible India",
    template: "%s | TravelBhakt",
  },

  description:
    "Discover incredible destinations, travel packages, guides and experiences across India with TravelBhakt.",

  keywords: [
    "TravelBhakt",
    "India travel",
    "Northeast India travel",
    "India tour packages",
    "travel packages",
    "Sikkim travel",
    "Meghalaya travel",
    "Tawang travel",
    "Kaziranga travel",
    "India travel guide",
  ],

  authors: [
    {
      name: "TravelBhakt",
    },
  ],

  creator: "TravelBhakt",

  publisher: "TravelBhakt",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "http://localhost:3001",
    siteName: "TravelBhakt",

    title: "TravelBhakt | Discover Incredible India",

    description:
      "Discover incredible destinations, travel packages and stories across India.",
  },

  twitter: {
    card: "summary_large_image",

    title: "TravelBhakt | Discover Incredible India",

    description:
      "Discover incredible destinations, travel packages and stories across India.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}