"use client";

import { forwardRef } from "react";
import { useI18n } from "@/context/I18nContext";

const ManifestoGhostText = forwardRef<HTMLDivElement>(function ManifestoGhostText(_, ref) {
  const { t } = useI18n();
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center text-center display-tight"
      style={{
        fontSize: "clamp(110px, 22vw, 320px)",
        color: "rgba(240,237,232,0.05)",
        lineHeight: 0.82,
        whiteSpace: "pre-line",
      }}
      aria-hidden
    >
      {t("manifesto.ghost")}
    </div>
  );
});

export default ManifestoGhostText;
