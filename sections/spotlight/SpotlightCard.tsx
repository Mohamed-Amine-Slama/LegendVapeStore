"use client";

import { forwardRef } from "react";
import Image from "next/image";

/**
 * Tilted gold card with the Dark Crystal device floating inside, surrounded
 * by scattered chocolate-chunk props and a subtle gloss highlight.
 */
const SpotlightCard = forwardRef<HTMLDivElement>(function SpotlightCard(_, ref) {
  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <div
        ref={ref}
        className="relative card-edge gloss-overlay"
        style={{
          width: "clamp(280px, 34vw, 420px)",
          height: "clamp(380px, 46vw, 560px)",
          background:
            "linear-gradient(135deg, #E0C896 0%, #C8A96E 45%, #8E7A4D 100%)",
          borderRadius: 22,
          transform: "rotate(-9deg)",
        }}
      >
        {/* Inner subtle frame */}
        <span
          aria-hidden
          className="absolute inset-3 rounded-[16px] border border-bg-dark/15"
        />

        {/* Decorative dots */}
        <span
          className="absolute"
          style={{ top: 28, left: 22, width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.22)" }}
        />
        <span
          className="absolute"
          style={{ top: 64, right: 32, width: 28, height: 28, borderRadius: "50%", background: "rgba(26,26,26,0.20)" }}
        />
        <span
          className="absolute"
          style={{ bottom: 96, left: 24, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }}
        />

        {/* Scattered prop accents (chocolate chunks) */}
        <div className="absolute" style={{ top: "8%", right: "8%", width: 60, height: 60, transform: "rotate(-18deg)" }}>
          <Image src="/props/chocolate-1.png" alt="" fill sizes="60px" className="object-contain" />
        </div>
        <div className="absolute" style={{ bottom: "12%", right: "10%", width: 54, height: 54, transform: "rotate(22deg)" }}>
          <Image src="/props/chocolate-1.png" alt="" fill sizes="54px" className="object-contain" />
        </div>
        <div className="absolute" style={{ bottom: "26%", left: "8%", width: 50, height: 50, transform: "rotate(-30deg)" }}>
          <Image src="/props/chocolate-1.png" alt="" fill sizes="50px" className="object-contain" />
        </div>

        {/* Device, counter-tilted within the card */}
        <div
          className="absolute"
          style={{
            width: "80%",
            aspectRatio: "120 / 200",
            left: "50%",
            top: "46%",
            transform: "translate(-50%, -50%) rotate(-15deg)",
            filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.4))",
          }}
        >
          <Image
            src="/products/card-chocolate-device.png"
            alt="Dark Crystal device"
            fill
            sizes="(max-width: 768px) 60vw, 320px"
            className="object-contain"
          />
        </div>

        {/* Footer label */}
        <div className="absolute bottom-6 left-0 right-0 px-6 text-center">
          <h3
            className="display-tight text-bg-light"
            style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
          >
            Dark Crystal
          </h3>
          <p className="mt-1.5 font-ui text-[10px] font-medium uppercase tracking-[0.22em] text-bg-light/85">
            50mg · 4ml · Lab Certified
          </p>
        </div>

        {/* Corner sticker price */}
        <div
          className="absolute font-oswald font-bold uppercase sticker-shadow-sm"
          style={{
            top: -16,
            right: -10,
            background: "#1A1A1A",
            color: "#C8A96E",
            padding: "6px 14px",
            fontSize: 13,
            letterSpacing: "0.15em",
            borderRadius: 4,
            transform: "rotate(8deg)",
          }}
        >
          NEW DROP
        </div>
      </div>
    </div>
  );
});

export default SpotlightCard;
