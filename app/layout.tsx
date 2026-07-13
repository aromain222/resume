import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/components/ResumeContext";
import ResumeModal from "@/components/ResumeModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://averyromain.com"),
  title: "Avery Romain",
  description:
    "Avery Romain is an Amherst student-athlete who builds tools for finance, data, and college football.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Avery Romain",
    description:
      "Amherst student-athlete. I build useful things for finance, data, and football.",
    url: "https://averyromain.com",
    siteName: "Avery Romain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avery Romain",
    description:
      "Amherst student-athlete. I build useful things for finance, data, and football.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ResumeProvider>
          {children}
          <ResumeModal />
        </ResumeProvider>
      </body>
    </html>
  );
}
