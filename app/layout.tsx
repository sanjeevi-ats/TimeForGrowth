import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Time For Growth — The Best Gear, Wherever You Are",
    template: "%s | Time For Growth",
  },
  description:
    "Time For Growth curates the best tech gear, cameras, audio equipment, and more — with smart geo-routing to the right store in your region.",
  metadataBase: new URL("https://time4growth.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://time4growth.in",
    siteName: "Time For Growth",
    title: "Time For Growth — The Best Gear, Wherever You Are",
    description:
      "Curated gear recommendations with smart geo-routing to the best store in your region.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Time For Growth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Time For Growth",
    description: "Curated gear with smart geo-routing to your local store.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-black antialiased flex flex-col min-h-screen">
        <PublicLayoutWrapper>
          <Header />
        </PublicLayoutWrapper>
        <main className="flex-1 flex flex-col">{children}</main>
        <PublicLayoutWrapper>
          <Footer />
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
