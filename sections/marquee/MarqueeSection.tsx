"use client";

import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/lib/translations";

const ITEM_KEYS: ReadonlyArray<TranslationKey> = [
  "marquee.0",
  "marquee.1",
  "marquee.2",
  "marquee.3",
  "marquee.4",
  "marquee.5",
];

/**
 * Gold ticker. Track is duplicated so a -50% translate gives a seamless loop.
 * Hover pauses. Burgundy stars between items + a thin black border above
 * and below so it reads as a layered ribbon.
 */
export default function MarqueeSection() {
  const { t } = useI18n();
  const items = ITEM_KEYS.map((k) => t(k));
  return (
    <section
      className="relative w-full overflow-hidden"
      data-section="marquee"
    >
      {/* Top + bottom hairlines for ribbon feel */}
      <div className="h-px w-full bg-bg-dark/35" />

      <div
        className="relative h-[56px] w-full overflow-hidden sm:h-[68px] md:h-[76px]"
        style={{
          background:
            "linear-gradient(180deg, #D6BB7E 0%, #C8A96E 50%, #B89D5E 100%)",
        }}
      >
        <div className="legend-vape-store-marquee absolute inset-y-0 flex items-center whitespace-nowrap will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-6 pr-6 sm:gap-9 sm:pr-9 md:gap-12 md:pr-12">
              {items.map((label, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-6 sm:gap-9 md:gap-12">
                  <span
                    className="display-tight text-bg-dark"
                    style={{ fontSize: "clamp(20px, 4.5vw, 36px)", letterSpacing: "0.05em" }}
                  >
                    {label}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      color: "#8B1A1A",
                      fontSize: "clamp(16px, 3vw, 26px)",
                      lineHeight: 1,
                    }}
                  >
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Edge fades — narrower on mobile so more text is visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 md:w-24"
          style={{ background: "linear-gradient(to right, rgba(200,169,110,0.95), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 md:w-24"
          style={{ background: "linear-gradient(to left, rgba(200,169,110,0.95), transparent)" }}
        />
      </div>

      <div className="h-px w-full bg-bg-dark/35" />
    </section>
  );
}
