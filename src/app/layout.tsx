import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Двери для вашего интерьера",
  description: "Межкомнатные и входные двери для вашего дома.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="ru" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}