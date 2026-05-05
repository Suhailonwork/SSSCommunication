import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sssdelhi.in"),
  title: {
    default: "SSS Communications | BPO & Web Development Delhi",
    template: "%s | SSS Communications",
  },
  description:
    "SSS Communications — Delhi's trusted partner for Business Process Outsourcing (BPO), call center services, and professional web development since 2014. We lead, others follow.",
  keywords: [
    "SSS Communications",
    "BPO Delhi",
    "Business Process Outsourcing",
    "call center services Delhi",
    "web development Delhi",
    "inbound outbound call center",
    "SSS Communications Delhi",
    "BPO company New Delhi",
    "sssdelhi",
  ],
  authors: [{ name: "SSS Communications", url: "https://sssdelhi.in" }],
  creator: "SSS Communications",
  publisher: "SSS Communications",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sssdelhi.in",
    siteName: "SSS Communications",
    title: "SSS Communications | BPO & Web Development Delhi",
    description: "Delhi's trusted partner for Business Process Outsourcing and Web Development since 2014.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SSS Communications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SSS Communications | BPO & Web Development Delhi",
    description: "Delhi's trusted partner for BPO and Web Development since 2014.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://sssdelhi.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="text-slate-800">
        {children}
      </body>
    </html>
  );
}
