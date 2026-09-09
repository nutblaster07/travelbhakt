import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://travelgency.in"),

  title: {
    default: "Travel Bhakt | Discover Incredible India",
    template: "%s | Travel Bhakt",
  },

  description:
    "Discover incredible destinations, travel packages, guides and experiences across India with Travel Bhakt.",

  keywords: [
    "Travel Bhakt",
    "TravelBhakt",
    "India travel",
    "Northeast India travel",
    "India tour packages",
    "travel packages",
    "Sikkim travel",
    "Meghalaya travel",
    "Tawang travel",
    "Kaziranga travel",
    "Assam travel",
    "India travel guide",
  ],

  authors: [
    {
      name: "Travel Bhakt",
    },
  ],

  creator: "Travel Bhakt",

  publisher: "Travel Bhakt",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://travelgency.in",
    siteName: "Travel Bhakt",

    title: "Travel Bhakt | Discover Incredible India",

    description:
      "Discover incredible destinations, travel packages and stories across India with Travel Bhakt.",
  },

  twitter: {
    card: "summary_large_image",

    title: "Travel Bhakt | Discover Incredible India",

    description:
      "Discover incredible destinations, travel packages and stories across India with Travel Bhakt.",
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