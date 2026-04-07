import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "성장톡 — 오늘의 성장 대화",
  description:
    "하루 10분, 제약된 AI 대화로 오늘을 돌아보고 내일의 한 걸음을 정하는 성장 도구",
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
        <main className="flex flex-1 flex-col w-full max-w-md mx-auto px-5 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
