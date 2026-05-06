"use client";

import { forwardRef, type CSSProperties } from "react";
import Image from "next/image";
import { useI18n } from "@/context/I18nContext";

const SpotlightCard = forwardRef<HTMLDivElement>(function SpotlightCard(_, ref) {
  const { t } = useI18n();
  return (
    <div className="relative" style={{ perspective: 1200 }}>
      {/* Soft gold floor glow under the card */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 -z-[1] -translate-x-1/2 blur-3xl"
        style={{
          bottom: -36,
          width: "78%",
          height: 90,
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(200,169,110,0.55) 0%, rgba(200,169,110,0) 72%)",
          borderRadius: "50%",
        }}
      />

      <div
        ref={ref}
        className="relative card-edge gloss-overlay"
        style={{
          width: "clamp(280px, 34vw, 420px)",
          height: "clamp(380px, 46vw, 560px)",
          background:
            "radial-gradient(120% 90% at 25% 15%, #F4DFB2 0%, #E0C896 38%, #C8A96E 66%, #8E7A4D 100%)",
          borderRadius: 22,
          transform: "rotate(-9deg)",
        }}
      >
        {/* Inner gold-leaf double frame */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 rounded-[16px]"
          style={{
            border: "1px solid rgba(26,26,26,0.18)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 18px 26px rgba(255,255,255,0.10), inset 0 -28px 40px rgba(0,0,0,0.18)",
          }}
        />

        {/* Animated gold shimmer pass — reuses brand keyframe */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ borderRadius: 22, mixBlendMode: "soft-light" }}
        >
          <span className="legend-vape-store-shimmer absolute inset-0" />
        </span>

        {/* Vapor wisp halo behind device */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"
          style={{
            width: "72%",
            height: "58%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,247,222,0.55) 0%, rgba(255,247,222,0) 72%)",
          }}
        />

        {/* Crystal shards — matches the "Dark Crystal" product name */}
        <CrystalShard tone="dark" style={{ top: "8%", right: "9%", width: 58, transform: "rotate(-18deg)" }} />
        <CrystalShard tone="light" style={{ bottom: "13%", right: "8%", width: 46, transform: "rotate(22deg)" }} />
        <CrystalShard tone="dark" style={{ bottom: "26%", left: "8%", width: 40, transform: "rotate(-32deg)" }} />
        <CrystalShard tone="light" style={{ top: "22%", left: "12%", width: 28, transform: "rotate(14deg)" }} />

        {/* Sparkle dust */}
        <Sparkle style={{ top: "18%", right: "30%" }} size={6} />
        <Sparkle style={{ bottom: "32%", right: "26%" }} size={4} />
        <Sparkle style={{ top: "60%", left: "16%" }} size={5} />
        <Sparkle style={{ top: "44%", right: "18%" }} size={3} />

        {/* Device */}
        <div
          className="absolute"
          style={{
            width: "78%",
            aspectRatio: "120 / 200",
            left: "50%",
            top: "47%",
            transform: "translate(-50%, -50%) rotate(-15deg)",
            filter:
              "drop-shadow(0 28px 40px rgba(0,0,0,0.45)) drop-shadow(0 0 18px rgba(255,247,222,0.30))",
          }}
        >
          <Image
            src="/products/card-chocolate-device.png"
            alt={t("spotlight.card.alt")}
            fill
            sizes="(max-width: 768px) 60vw, 320px"
            className="object-contain"
          />
        </div>

        {/* Top-left edition stamp */}
        <div
          className="absolute font-oswald font-bold uppercase"
          style={{
            top: 22,
            left: 20,
            color: "rgba(26,26,26,0.78)",
            fontSize: 9,
            letterSpacing: "0.28em",
            transform: "rotate(-3deg)",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 18,
              height: 1,
              background: "rgba(26,26,26,0.45)",
              verticalAlign: "middle",
              marginRight: 8,
            }}
          />
          EDITION 02
        </div>

        {/* Bottom-left flavor name + descriptor */}
        <div className="absolute z-[3]" style={{ bottom: 24, left: 22, color: "#FFFFFF" }}>
          <h3
            className="display-tight"
            style={{
              fontSize: "clamp(24px, 2.4vw, 32px)",
              lineHeight: 0.92,
              letterSpacing: "0.005em",
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
            }}
          >
            {t("spotlight.card.title")}
          </h3>
          <p
            className="mt-1.5 font-ui font-medium uppercase"
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            {t("spotlight.card.specs")}
          </p>
        </div>

        {/* Bottom-right circular spec badge — gold-on-black */}
        <div
          className="absolute z-[3] flex flex-col items-center justify-center font-oswald font-bold uppercase sticker-shadow-sm"
          style={{
            bottom: 28,
            right: 20,
            width: 54,
            height: 54,
            borderRadius: "50%",
            background:
              "radial-gradient(60% 60% at 35% 25%, #1F1F1F 0%, #0E0E0E 70%, #050505 100%)",
            color: "#C8A96E",
            fontSize: 11,
            lineHeight: 1,
            letterSpacing: "0.06em",
            boxShadow:
              "inset 0 0 0 1px rgba(200,169,110,0.55), 4px 4px 0 rgba(0,0,0,0.22)",
          }}
        >
          <span style={{ fontSize: 13 }}>50</span>
          <span style={{ fontSize: 8, opacity: 0.85, marginTop: 1 }}>MG</span>
        </div>

        {/* Top-right NEW DROP sticker */}
        <div
          className="absolute font-oswald font-bold uppercase"
          style={{
            top: -16,
            right: -12,
            background: "#0E0E0E",
            color: "#C8A96E",
            padding: "7px 14px",
            fontSize: 12,
            letterSpacing: "0.18em",
            borderRadius: 4,
            transform: "rotate(8deg)",
            boxShadow:
              "inset 0 0 0 1px rgba(200,169,110,0.45), 4px 4px 0 rgba(0,0,0,0.26)",
          }}
        >
          {t("spotlight.card.badge")}
        </div>
      </div>
    </div>
  );
});

interface ShardProps {
  tone: "dark" | "light";
  style?: CSSProperties;
}

/** Faceted gem shape — three overlapping polygons give a hand-cut crystal look. */
function CrystalShard({ tone, style }: ShardProps) {
  const base = tone === "dark" ? "#1A1A1A" : "#E0C896";
  const high = tone === "dark" ? "#2A2218" : "#FFF1CF";
  const low = tone === "dark" ? "#0A0A0A" : "#A88848";
  return (
    <span aria-hidden className="absolute block" style={style}>
      <svg
        viewBox="0 0 64 80"
        className="block h-auto w-full"
        style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.32))" }}
      >
        <polygon
          points="32,2 60,28 50,76 14,76 4,28"
          fill={base}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
        />
        <polygon points="32,2 60,28 32,40 4,28" fill={high} opacity="0.9" />
        <polygon points="32,40 50,76 32,76" fill={low} opacity="0.7" />
        <polyline points="32,2 32,40" stroke="rgba(255,255,255,0.18)" fill="none" />
      </svg>
    </span>
  );
}

interface SparkleProps {
  size: number;
  style?: CSSProperties;
}

function Sparkle({ size, style }: SparkleProps) {
  return (
    <span
      aria-hidden
      className="absolute"
      style={{
        ...style,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.85)",
        boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(255,247,222,0.7)`,
      }}
    />
  );
}

export default SpotlightCard;
