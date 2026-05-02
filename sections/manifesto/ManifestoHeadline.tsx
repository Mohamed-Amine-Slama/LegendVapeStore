"use client";

import { forwardRef } from "react";
import GoldTag from "@/components/ui/GoldTag";

/**
 * The sticker-embedded headline. The inline tag MUST sit mid-sentence inside
 * the flow — that's the distinctive Spylt-derived treatment.
 */
const ManifestoHeadline = forwardRef<HTMLDivElement>(function ManifestoHeadline(_, ref) {
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
        <span>Legend Vape Store</span>
        <span>your</span>
        <GoldTag size="xl" rotate={-1.8} color="#C8A96E" textColor="#1A1A1A">
          Premium
        </GoldTag>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span>senses</span>
        <span style={{ color: "rgba(240,237,232,0.55)" }}>with</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span>every</span>
        <span>pull</span>
        <GoldTag size="lg" rotate={1.2} color="#E8C84A" textColor="#1A1A1A">
          Zero Diacetyl
        </GoldTag>
      </div>
    </div>
  );
});

export default ManifestoHeadline;
