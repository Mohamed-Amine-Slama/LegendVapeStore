"use client";

import { forwardRef } from "react";
import Image from "next/image";

interface PhoneMockupProps {
  src: string;
  alt: string;
  zIndex: number;
  /** Fixed pixel width for the phone. Defaults to 200 (desktop). */
  width?: number;
}

const PhoneMockup = forwardRef<HTMLDivElement, PhoneMockupProps>(function PhoneMockup(
  { src, alt, zIndex, width = 200 },
  ref,
) {
  // Phone keeps the iPhone-style 1:2 aspect ratio.
  const height = width * 2;
  // Side-button positions scale with phone height.
  const topVolUp = height * 0.20;
  const topVolDown = height * 0.35;
  const topPower = height * 0.275;
  const dynamicIslandWidth = Math.round(width * 0.48);
  const dynamicIslandHeight = Math.max(18, Math.round(width * 0.12));
  const radius = Math.round(width * 0.16);

  return (
    <div
      ref={ref}
      className="absolute will-change-transform"
      style={{
        width,
        height,
        zIndex,
        bottom: 0,
        left: 0,
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden bg-bg-night"
        style={{
          borderRadius: radius,
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.35), inset 0 0 0 4px #1A1A1A, inset 0 0 0 6px rgba(200,169,110,0.18)",
        }}
      >
        <Image src={src} alt={alt} fill sizes={`${width}px`} className="object-cover" />

        {/* Dynamic island */}
        <div
          aria-hidden
          className="absolute left-1/2 top-2 z-[3] -translate-x-1/2 rounded-full bg-bg-night"
          style={{ width: dynamicIslandWidth, height: dynamicIslandHeight }}
        />

        {/* Side button outlines — scale with phone size */}
        <span
          aria-hidden
          className="absolute -left-[3px] w-[3px] rounded-l-sm bg-bg-night"
          style={{ top: topVolUp, height: height * 0.075 }}
        />
        <span
          aria-hidden
          className="absolute -left-[3px] w-[3px] rounded-l-sm bg-bg-night"
          style={{ top: topVolDown, height: height * 0.12 }}
        />
        <span
          aria-hidden
          className="absolute -right-[3px] w-[3px] rounded-r-sm bg-bg-night"
          style={{ top: topPower, height: height * 0.10 }}
        />

        {/* Screen gloss */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(0,0,0,0.12) 100%)",
          }}
        />
      </div>
    </div>
  );
});

export default PhoneMockup;
