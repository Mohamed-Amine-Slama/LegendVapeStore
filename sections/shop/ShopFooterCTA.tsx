"use client";

import { useI18n } from "@/context/I18nContext";

export default function ShopFooterCTA() {
  const { t } = useI18n();
  return (
    <section
      className="relative flex w-full flex-col items-start justify-center gap-5 overflow-hidden bg-bg-dark px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-10 sm:py-0 md:px-20"
      style={{
        minHeight: 160,
        marginTop: 60,
      }}
      data-section="shop-footer-cta"
    >
      {/* Subtle noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[2] flex flex-col gap-1.5">
        <h3
          className="font-display uppercase text-white"
          style={{
            fontSize: "clamp(28px, 6.5vw, 42px)",
            lineHeight: 1,
            letterSpacing: "0.005em",
          }}
        >
          {t("shop.footerCta.head")}
        </h3>
        <p
          className="font-serif italic"
          style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}
        >
          {t("shop.footerCta.sub")}
        </p>
      </div>

      <a
        href="#quiz"
        className="relative z-[2] inline-flex items-center gap-2 rounded-full transition-all duration-220"
        style={{
          background: "#C8A96E",
          color: "#1A1A1A",
          padding: "13px 30px",
          fontSize: 12,
          letterSpacing: "0.1em",
          fontWeight: 600,
          fontFamily: "var(--font-ui)",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.boxShadow = "0 10px 28px rgba(200,169,110,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {t("shop.footerCta.btn")}
        <span aria-hidden>→</span>
      </a>
    </section>
  );
}
