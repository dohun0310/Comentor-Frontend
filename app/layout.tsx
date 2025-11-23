import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const nanumGothic = Nanum_Gothic({
  display: "swap",
  weight: ["400", "700", "800"],
  variable: "--font-nanum-gothic",
});

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Comentor",
  description: "청소년의 건전한 미디어 인식을 돕는 AI 가이드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${nanumGothic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
