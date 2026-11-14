import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ColorSchemeScript, UiKitProvider, mantineHtmlProps } from "@/ui-kit";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Двери для вашего интерьера",
  description: "Межкомнатные и входные двери для вашего дома.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={geistSans.variable} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <UiKitProvider>
          <Header />
          {children}
        </UiKitProvider>
      </body>
    </html>
  );
}
