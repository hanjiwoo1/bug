import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "전문 해충방역 서비스 | 바퀴벌레, 쥐, 개미 완전 해결",
  description: "10년이상 경력의 전문 방역사가 안전하고 효과적인 해충방역 서비스를 제공합니다. 바퀴벌레, 쥐, 개미 등 모든 해충 문제를 완전히 해결해드립니다. 합리적인 가격, 무료 상담.",
  keywords: "해충방역, 바퀴벌레, 쥐, 개미, 방역업체, 해충퇴치, 방역서비스",
  openGraph: {
    title: "전문 해충방역 서비스",
    description: "10년이상 경력의 전문 방역사가 안전하고 효과적인 해충방역 서비스를 제공합니다",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
