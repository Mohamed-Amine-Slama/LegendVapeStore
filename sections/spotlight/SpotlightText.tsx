"use client";

import { forwardRef } from "react";
import GoldTag from "@/components/ui/GoldTag";
import { useI18n } from "@/context/I18nContext";

const SpotlightText = forwardRef<HTMLDivElement>(function SpotlightText(_, ref) {
  const { t } = useI18n();
  // Each line is rendered as its own <div> for the per-word reveal animation.
  // Lines 1+2 share a row (matches the original visual layout).
  const lines: string[][] = [
    [t("spotlight.line1"), t("spotlight.line2")],
    [t("spotlight.line3")],
    [t("spotlight.line4")],
    [t("spotlight.line5")],
  ];
  return (
    <div ref={ref} className="relative z-[2]">
      <span
        className="font-ui font-medium uppercase"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: "rgba(26,26,26,0.55)" }}
      >
        {t("spotlight.eyebrow")}
      </span>

      <h2
        className="mt-4 display-tight text-bg-dark"
        style={{
          fontSize: "clamp(56px, 9vw, 130px)",
          lineHeight: 0.86,
        }}
      >
        {lines.map((words, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap gap-x-3">
            {words.map((word, i) => (
              <span
                key={`${lineIndex}-${i}`}
                data-spotlight-word
                className="inline-block overflow-hidden align-bottom"
              >
                <span className="inline-block will-change-transform">{word}</span>
              </span>
            ))}
          </div>
        ))}
      </h2>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <GoldTag size="lg" rotate={-2.2} color="#C8A96E" textColor="#1A1A1A">
          {t("spotlight.sticker")}
        </GoldTag>
        <p
          className="font-serif italic"
          style={{
            color: "rgba(26,26,26,0.65)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            maxWidth: 380,
            lineHeight: 1.5,
          }}
        >
          {t("spotlight.copy")}
        </p>
      </div>
    </div>
  );
});

export default SpotlightText;
