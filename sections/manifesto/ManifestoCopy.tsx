"use client";

import { forwardRef } from "react";
import { useI18n } from "@/context/I18nContext";

const ManifestoCopy = forwardRef<HTMLParagraphElement>(function ManifestoCopy(_, ref) {
  const { t } = useI18n();
  return (
    <div ref={ref} className="relative z-[3] mt-14 flex flex-col items-center text-center">
      <span
        className="font-ui font-medium uppercase"
        style={{
          fontSize: 11,
          letterSpacing: "0.32em",
          color: "rgba(240,237,232,0.55)",
        }}
      >
        {t("manifesto.eyebrow")}
      </span>
      <p
        className="mt-4 max-w-[520px] font-serif italic"
        style={{
          color: "rgba(240,237,232,0.78)",
          fontSize: "clamp(16px, 1.6vw, 22px)",
          lineHeight: 1.5,
        }}
      >
        {t("manifesto.copy")}
      </p>
    </div>
  );
});

export default ManifestoCopy;
