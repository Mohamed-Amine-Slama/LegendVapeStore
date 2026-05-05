"use client";

import { forwardRef } from "react";
import GoldTag from "@/components/ui/GoldTag";
import PillButton from "@/components/ui/PillButton";
import { useI18n } from "@/context/I18nContext";

interface HeroCenterContentProps {
  bannerRef: React.RefObject<HTMLDivElement | null>;
  taglineRef: React.RefObject<HTMLParagraphElement | null>;
  /** PillButton renders as <a> when href is set, so the ref is HTMLElement (not specifically HTMLButtonElement). */
  btnRef: React.RefObject<HTMLElement | null>;
  ghostRef: React.RefObject<HTMLDivElement | null>;
  eyebrowRef: React.RefObject<HTMLDivElement | null>;
}

const HeroCenterContent = forwardRef<HTMLDivElement, HeroCenterContentProps>(
  function HeroCenterContent({ bannerRef, taglineRef, btnRef, ghostRef, eyebrowRef }, ref) {
    const { t } = useI18n();
    return (
      <div
        ref={ref}
        className="absolute left-1/2 top-[48%] z-[10] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 text-center"
        style={{ pointerEvents: "none" }}
      >
        {/* Ghost headline */}
        <div
          ref={ghostRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap display-tight"
          style={{
            fontSize: "clamp(96px, 18vw, 240px)",
            color: "rgba(26,26,26,0.06)",
            zIndex: 1,
            mixBlendMode: "multiply",
          }}
          aria-hidden
        >
          {t("hero.ghost")}
        </div>

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="relative z-[2] mb-5 inline-flex items-center gap-3"
          style={{ pointerEvents: "auto" }}
        >
          <span className="h-px w-10 bg-bg-dark/30" />
          <span
            className="font-ui font-medium uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              color: "rgba(26,26,26,0.62)",
            }}
          >
            {t("hero.eyebrow")}
          </span>
          <span className="h-px w-10 bg-bg-dark/30" />
        </div>

        {/* Gold sticker banner */}
        <div ref={bannerRef} className="relative z-[2]" style={{ pointerEvents: "auto" }}>
          <GoldTag size="xl" rotate={-1.5}>
            {t("hero.bannerSticker")}
          </GoldTag>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="relative z-[2] mt-6 max-w-[440px] font-serif italic"
          style={{
            color: "rgba(26,26,26,0.68)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            lineHeight: 1.45,
            pointerEvents: "auto",
          }}
        >
          {t("hero.tagline")}
        </p>

        {/* CTA */}
        <div className="relative z-[2] mt-7" style={{ pointerEvents: "auto" }}>
          <PillButton ref={btnRef} href="/shop" variant="gold" size="lg" trailingIcon>
            {t("hero.cta")}
          </PillButton>
        </div>
      </div>
    );
  },
);

export default HeroCenterContent;
