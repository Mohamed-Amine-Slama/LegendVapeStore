import type { Metadata } from "next";
import {
  bebasNeue,
  dancingScript,
  oswald,
  dmSerifDisplay,
  syne,
} from "@/lib/fonts";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import ScrollTriggerProvider from "@/components/scroll/ScrollTriggerProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/preloader/Preloader";
import { PreloaderProvider } from "@/context/PreloaderContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEGEND VAPE STORE — Premium Vapor",
  description: "Engineered for those who demand precision.",
  icons: {
    icon: "/Logo (2).png",
    apple: "/Logo (2).png",
  },
  openGraph: {
    type: "website",
    siteName: "LEGEND VAPE STORE",
    title: "LEGEND VAPE STORE — Premium Vapor",
    description: "Engineered for those who demand precision.",
    images: [
      {
        url: "/Logo (2).png",
        width: 1200,
        height: 630,
        alt: "LEGEND VAPE STORE Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dancingScript.variable} ${oswald.variable} ${dmSerifDisplay.variable} ${syne.variable}`}
    >
      <body className="bg-bg-light text-bg-dark overflow-x-hidden">
        <PreloaderProvider>
          <SmoothScroll>
            <ScrollTriggerProvider>
              <Preloader />
              <CustomCursor />
              <Navbar />
              {children}
            </ScrollTriggerProvider>
          </SmoothScroll>
        </PreloaderProvider>
      </body>
    </html>
  );
}
