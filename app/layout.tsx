import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import GlobalNavigationLoader from "@/components/global-navigation-loader";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "신한 쏠(SOL) - 신한은행",
  description: "신한은행 모바일 뱅킹",
  manifest: "/manifest.json",
  icons: {
    icon: "/bank-icon.png",
    apple: "/bank-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1976F3",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} font-sans antialiased bg-white`}
      >
        <GlobalNavigationLoader />
        {children}
      </body>
    </html>
  );
}
