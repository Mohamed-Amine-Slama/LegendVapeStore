"use client";

import { useI18n } from "@/context/I18nContext";

export default function EmptyState() {
  const { t } = useI18n();
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: 320 }}
    >
      <p
        className="font-display uppercase"
        style={{
          fontSize: 32,
          color: "rgba(26,26,26,0.18)",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        {t("shop.emptyTitle")}
      </p>
      <p
        className="mt-3 font-serif italic"
        style={{ fontSize: 14, color: "rgba(26,26,26,0.4)" }}
      >
        {t("shop.emptySubtitle")}
      </p>
    </div>
  );
}
