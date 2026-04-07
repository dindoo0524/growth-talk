import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "META Lab — 세상의 지식을 탐구하다",
  description:
    "제약된 AI로 세상의 지식을 탐구하는 실험 저장소",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="stars" />
        <main className="relative z-10 flex flex-1 flex-col w-full max-w-md mx-auto px-5 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
