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
import { CartProvider } from "@/context/CartContext";
import { I18nProvider } from "@/context/I18nContext";
import CartDrawer from "@/components/cart/CartDrawer";
import LanguagePicker from "@/components/i18n/LanguagePicker";
import { detectServerLocale } from "@/lib/detect-locale";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Maison Des Vapes — Premium Vapor",
  description: "Engineered for those who demand precision.",
  icons: {
    icon: "/Logo (2).png",
    apple: "/Logo (2).png",
  },
  openGraph: {
    type: "website",
    siteName: "La Maison Des Vapes",
    title: "La Maison Des Vapes — Premium Vapor",
    description: "Engineered for those who demand precision.",
    images: [
      {
        url: "/Logo (2).png",
        width: 1200,
        height: 630,
        alt: "La Maison Des Vapes Logo",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initialLocale = await detectServerLocale();
  const dir = initialLocale === "ar" ? "rtl" : "ltr";
  return (
    <html
      lang={initialLocale}
      dir={dir}
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${dancingScript.variable} ${oswald.variable} ${dmSerifDisplay.variable} ${syne.variable}`}
    >
      <body className="bg-bg-light text-bg-dark overflow-x-hidden">
        <I18nProvider initialLocale={initialLocale}>
          <CartProvider>
            <PreloaderProvider>
              <SmoothScroll>
                <ScrollTriggerProvider>
                  <Preloader />
                  <CustomCursor />
                  <Navbar />
                  {children}
                  <CartDrawer />
                  <LanguagePicker />
                </ScrollTriggerProvider>
              </SmoothScroll>
            </PreloaderProvider>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
