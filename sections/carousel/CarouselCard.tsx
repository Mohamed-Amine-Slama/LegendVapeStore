"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { CarouselCard as CarouselCardType } from "@/types/carousel";
import { cn } from "@/lib/cn";
import { useI18n } from "@/context/I18nContext";

interface CarouselCardProps {
  card: CarouselCardType;
  index: number;
}

/**
 * Premium flavor card. 420×540, fixed dimensions, permanent tilt.
 *
 * Layered composition (front → back):
 *   - Top-right: gold-bordered hero stat sticker (e.g. 20K PUFFS)
 *   - Top-left:  edition number stamp ("— 01")
 *   - Bottom-left: title + nicotine label, gold hairline divider
 *   - Bottom-right: premium ml badge with inset highlights
 *   - Center: device + vapor wisp halo + sparkle dust
 *   - Surface: radial highlight + vignette + double inset frame
 */
const CarouselCard = forwardRef<HTMLDivElement, CarouselCardProps>(function CarouselCard(
  { card, index },
  ref,
) {
  const { t } = useI18n();
  const nicotineLabel =
    card.nicotineLabel === "20MG NIC SALT" ? t("carousel.nic20mgSalt")
      : card.nicotineLabel === "0MG NIC" ? t("carousel.nic0mg")
      : card.nicotineLabel;

  const isDarkText = card.textTone === "dark";
  const titleColor = isDarkText ? "#1A1A1A" : "#FFFFFF";
  const subColor = isDarkText ? "rgba(26,26,26,0.62)" : "rgba(255,255,255,0.72)";
  const stampColor = isDarkText ? "rgba(26,26,26,0.65)" : "rgba(255,255,255,0.55)";
  const stampLine = isDarkText ? "rgba(26,26,26,0.4)" : "rgba(255,255,255,0.35)";
  const dividerStart = isDarkText ? "rgba(26,26,26,0.85)" : "rgba(200,169,110,1)";
  const titleShadow = isDarkText
    ? "none"
    : "0 2px 16px rgba(0,0,0,0.30)";

  // Parse "24ml" → ["24", "ML"] for the circular badge.
  const mlMatch = card.mlLabel.match(/^(\d+)/);
  const mlValue = mlMatch ? mlMatch[1] : card.mlLabel;
  const badgeBg = card.badgeColor ?? "#C8A96E";
  const badgeIsDarkBg = badgeBg.toLowerCase() === "#1a1a1a" || badgeBg.toLowerCase() === "#0e0e0e";
  const badgeText = badgeIsDarkBg ? "#C8A96E" : "#1A1A1A";

  return (
    <div
      ref={ref}
      data-carousel-card={index}
      className={cn(
        "relative flex-shrink-0 overflow-hidden will-change-transform",
        "card-edge",
      )}
      style={{
        width: "min(420px, calc(100vw - 56px))",
        aspectRatio: "420 / 540",
        height: "auto",
        borderRadius: 20,
        background: card.background,
        transform: `rotate(${card.rotation}deg)`,
      }}
    >
      {/* Radial highlight overlay — soft top-left light */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 28% 14%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)",
          borderRadius: "inherit",
        }}
      />

      {/* Bottom vignette — premium depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 -90px 100px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.06)",
          borderRadius: "inherit",
        }}
      />

      {/* Inner double-stroke frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-[14px]"
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "inset 0 0 0 1px rgba(0,0,0,0.10), inset 0 12px 18px rgba(255,255,255,0.06)",
        }}
      />

      {/* Vapor wisp behind device */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"
        style={{
          width: "70%",
          height: "55%",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,247,222,0.42) 0%, rgba(255,247,222,0) 72%)",
        }}
      />

      {/* Sparkle dust */}
      <Sparkle style={{ top: "26%", right: "26%" }} size={5} tone={isDarkText ? "dark" : "light"} />
      <Sparkle style={{ bottom: "36%", left: "16%" }} size={4} tone={isDarkText ? "dark" : "light"} />
      <Sparkle style={{ top: "52%", right: "14%" }} size={3} tone={isDarkText ? "dark" : "light"} />

      {/* Scattered flavor props */}
      {card.props.map((p, i) => (
        <div
          key={i}
          data-carousel-prop={i}
          className="absolute will-change-transform"
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
            width: p.width,
            height: p.width,
            transform: `rotate(${p.rotate}deg)`,
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.35))",
          }}
        >
          <Image src={p.src} alt="" fill sizes="120px" className="object-contain" />
        </div>
      ))}

      {/* Centered product device — counter-tilted within the card */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          height: "85%",
          aspectRatio: "120 / 200",
          transform: `translate(-50%, -50%) rotate(${card.productRotation}deg)`,
          filter:
            "drop-shadow(0 28px 36px rgba(0,0,0,0.42)) drop-shadow(0 0 16px rgba(255,247,222,0.22))",
        }}
      >
        <Image
          src={card.productSrc}
          alt={card.flavorName}
          fill
          sizes="(max-width: 768px) 60vw, 280px"
          className="object-contain"
        />
      </div>

      {/* Top-left edition stamp */}
      <div
        className="absolute z-[3] font-oswald font-bold uppercase"
        style={{
          top: 18,
          left: 18,
          fontSize: 9,
          letterSpacing: "0.28em",
          color: stampColor,
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 16,
            height: 1,
            background: stampLine,
            verticalAlign: "middle",
            marginRight: 8,
          }}
        />
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Top-right hero stat sticker */}
      {card.heroStat && (
        <div
          className="absolute z-[3] font-oswald font-bold uppercase text-center sticker-shadow-sm"
          style={{
            top: 14,
            right: 14,
            background: "#0E0E0E",
            color: "#C8A96E",
            padding: "7px 11px",
            borderRadius: 6,
            transform: "rotate(6deg)",
            boxShadow:
              "inset 0 0 0 1px rgba(200,169,110,0.42), 3px 3px 0 rgba(0,0,0,0.28)",
            minWidth: 52,
          }}
        >
          <div style={{ fontSize: 17, lineHeight: 1, letterSpacing: "0.02em" }}>
            {card.heroStat.value}
          </div>
          <div
            style={{
              fontSize: 7,
              opacity: 0.75,
              letterSpacing: "0.22em",
              marginTop: 3,
            }}
          >
            {card.heroStat.unit}
          </div>
        </div>
      )}

      {/* Bottom-left flavor name + nicotine descriptor */}
      <div className="absolute z-[3]" style={{ bottom: 22, left: 20, color: titleColor }}>
        {/* Gold hairline divider */}
        <span
          aria-hidden
          style={{
            display: "block",
            width: 32,
            height: 1.5,
            marginBottom: 10,
            background: `linear-gradient(90deg, ${dividerStart} 0%, transparent 100%)`,
          }}
        />
        <h3
          className="display-tight"
          style={{
            fontSize: 28,
            lineHeight: 0.92,
            letterSpacing: "0.005em",
            textShadow: titleShadow,
          }}
        >
          {card.flavorName}
        </h3>
        <p
          className="mt-1.5 font-ui font-medium uppercase"
          style={{
            fontSize: 10,
            letterSpacing: "0.18em",
            color: subColor,
          }}
        >
          {nicotineLabel}
        </p>
      </div>

      {/* Bottom-right premium ml badge */}
      <div
        className="absolute z-[3] flex flex-col items-center justify-center font-oswald font-bold uppercase"
        style={{
          bottom: 26,
          right: 18,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: badgeBg,
          color: badgeText,
          lineHeight: 1,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -2px 5px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.16), 4px 4px 0 rgba(0,0,0,0.22)",
        }}
      >
        <span style={{ fontSize: 14, letterSpacing: "0.02em" }}>{mlValue}</span>
        <span style={{ fontSize: 7, opacity: 0.78, letterSpacing: "0.18em", marginTop: 2 }}>
          ML
        </span>
      </div>
    </div>
  );
});

interface SparkleProps {
  size: number;
  tone: "light" | "dark";
  style?: React.CSSProperties;
}

function Sparkle({ size, tone, style }: SparkleProps) {
  const fill = tone === "dark" ? "rgba(26,26,26,0.55)" : "rgba(255,255,255,0.85)";
  const glow =
    tone === "dark" ? "rgba(26,26,26,0.35)" : "rgba(255,247,222,0.65)";
  return (
    <span
      aria-hidden
      className="absolute"
      style={{
        ...style,
        width: size,
        height: size,
        borderRadius: "50%",
        background: fill,
        boxShadow: `0 0 ${size * 2}px ${size / 2}px ${glow}`,
      }}
    />
  );
}

export default CarouselCard;
