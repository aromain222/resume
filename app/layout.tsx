import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/components/ResumeContext";
import ResumeModal from "@/components/ResumeModal";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://averyromain.com"),
  title: "Avery Romain",
  description:
    "Avery Romain is a senior at Amherst with four live apps for finance, data, and college football. He also plays D-line.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Avery Romain",
    description:
      "Amherst ’27. Four live apps for finance, data, and college football.",
    url: "https://averyromain.com",
    siteName: "Avery Romain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avery Romain",
    description:
      "Amherst ’27. Four live apps for finance, data, and college football.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ResumeProvider>
          {children}
          <ResumeModal />
        </ResumeProvider>
      </body>
    </html>
  );
}
