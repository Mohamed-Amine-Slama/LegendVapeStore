"use client";

import { forwardRef } from "react";
import PillButton from "@/components/ui/PillButton";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/lib/translations";

const LINE_COLORS = ["#1A1A1A", "#C8A96E", "#1A1A1A", "#1A1A1A"];
const LINE_KEYS: ReadonlyArray<TranslationKey> = [
  "socialProof.word0",
  "socialProof.word1",
  "socialProof.word2",
  "socialProof.word3",
];

const SocialHeadline = forwardRef<HTMLDivElement>(function SocialHeadline(_, ref) {
  const { t } = useI18n();
  return (
    <div ref={ref} className="relative">
      <span
        className="font-ui font-medium uppercase"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: "rgba(26,26,26,0.55)" }}
      >
        {t("socialProof.eyebrow")}
      </span>

      <div className="mt-5">
        {LINE_KEYS.map((key, i) => (
          <div
            key={key}
            data-headline-line
            className="display-tight"
            style={{
              fontSize: "clamp(72px, 11vw, 156px)",
              lineHeight: 0.86,
              color: LINE_COLORS[i],
            }}
          >
            {t(key)}
          </div>
        ))}
      </div>

      <p
        data-headline-copy
        className="mt-7 max-w-md font-serif italic"
        style={{
          color: "rgba(26,26,26,0.65)",
          fontSize: "clamp(15px, 1.4vw, 18px)",
          lineHeight: 1.5,
        }}
      >
        {t("socialProof.copy")}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-4" data-headline-cta>
        <PillButton href="/shop" variant="gold" size="md" trailingIcon>
          {t("socialProof.shopAll")}
        </PillButton>
        <PillButton variant="outline" size="md">
          {t("socialProof.readReviews")}
        </PillButton>
      </div>
    </div>
  );
});

export default SocialHeadline;
