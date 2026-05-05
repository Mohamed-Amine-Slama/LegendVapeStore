"use client";

import { forwardRef } from "react";
import GoldTag from "@/components/ui/GoldTag";
import { useI18n } from "@/context/I18nContext";

/**
 * The sticker-embedded headline. The inline tag MUST sit mid-sentence inside
 * the flow — that's the distinctive Spylt-derived treatment.
 */
const ManifestoHeadline = forwardRef<HTMLDivElement>(function ManifestoHeadline(_, ref) {
  const { t } = useI18n();
  return (
    <div
      ref={ref}
      className="relative z-[3] mx-auto display-tight text-bg-light"
      style={{
        fontSize: "clamp(64px, 12vw, 180px)",
        lineHeight: 0.86,
        maxWidth: "1280px",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span>{t("manifesto.brand")}</span>
        <span>{t("manifesto.your")}</span>
        <GoldTag size="xl" rotate={-1.8} color="#C8A96E" textColor="#1A1A1A">
          {t("manifesto.tag.premium")}
        </GoldTag>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span>{t("manifesto.senses")}</span>
        <span style={{ color: "rgba(240,237,232,0.55)" }}>{t("manifesto.with")}</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span>{t("manifesto.every")}</span>
        <span>{t("manifesto.pull")}</span>
        <GoldTag size="lg" rotate={1.2} color="#E8C84A" textColor="#1A1A1A">
          {t("manifesto.tag.zeroDiacetyl")}
        </GoldTag>
      </div>
    </div>
  );
});

export default ManifestoHeadline;
