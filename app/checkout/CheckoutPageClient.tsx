"use client";

import Link from "next/link";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useI18n } from "@/context/I18nContext";

/**
 * Client wrapper for /checkout — needs access to the cart and i18n
 * contexts. The page.tsx server component just renders this; metadata
 * lives in the parent so it stays static.
 */
export default function CheckoutPageClient() {
  const { t } = useI18n();
  return (
    <main className="min-h-[100dvh] bg-bg-light pt-[64px] sm:pt-[68px]">
      {/* Hero banner — same dark slab pattern as ShopHero, slimmer. */}
      <section className="relative overflow-hidden bg-bg-dark text-bg-light">
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-6 right-4 select-none font-display text-bg-light/[0.06] sm:right-10"
          style={{
            fontSize: "clamp(96px, 22vw, 180px)",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          {t("checkout.heroGhost")}
        </span>
        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-2 px-4 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-14 md:px-12">
          <span
            className="font-ui font-medium uppercase text-accent"
            style={{ fontSize: 11, letterSpacing: "0.22em" }}
          >
            {t("checkout.eyebrow")}
          </span>
          <h1
            className="display-tight text-bg-light"
            style={{ fontSize: "clamp(32px, 7vw, 56px)" }}
          >
            {t("checkout.title")}
          </h1>
          <p className="max-w-2xl font-serif italic text-bg-light/75" style={{ fontSize: 16 }}>
            {t("checkout.subtitle")}
          </p>
          <div className="mt-3 flex items-center gap-3 font-ui text-bg-light/55" style={{ fontSize: 12, letterSpacing: "0.08em" }}>
            <Link href="/" className="hover:text-accent">
              {t("shop.breadcrumbHome")}
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-accent">
              {t("shop.breadcrumbShop")}
            </Link>
            <span>/</span>
            <span className="text-bg-light">{t("checkout.title")}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 sm:py-14 md:px-12">
        <CheckoutForm />
      </section>
    </main>
  );
}
