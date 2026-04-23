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
  title: "Avery Romain",
  description:
    "Student athlete and founder building financial infrastructure, AI tooling, and sports intelligence systems. Based at Amherst.",
  openGraph: {
    title: "Avery Romain",
    description:
      "Building the financial tools that don't exist yet. Fintech, AI, sports intelligence.",
    type: "website",
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
