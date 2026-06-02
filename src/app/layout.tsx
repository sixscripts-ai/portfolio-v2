import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashtonaschenbrener-v2.vercel.app"),
  title: {
    default: "Ashton Aschenbrener — Full-stack AI Engineer",
    template: "%s · Ashton Aschenbrener",
  },
  description:
    "I build retrieval systems, agentic workflows, and production-minded interfaces with Next.js, TypeScript, Python, and Postgres.",
  keywords: [
    "Ashton Aschenbrener",
    "AI engineer",
    "full-stack",
    "Next.js",
    "TypeScript",
    "Python",
    "Postgres",
    "RAG",
    "agentic workflows",
  ],
  openGraph: {
    title: "Ashton Aschenbrener — Full-stack AI Engineer",
    description:
      "Retrieval systems, agentic workflows, and production-minded interfaces. Next.js, TypeScript, Python, Postgres.",
    type: "website",
    url: "https://ashtonaschenbrener-v2.vercel.app",
    siteName: "Ashton Aschenbrener",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashton Aschenbrener — Full-stack AI Engineer",
    description:
      "Retrieval systems, agentic workflows, and production-minded interfaces.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-volt focus:text-black focus:px-3 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
