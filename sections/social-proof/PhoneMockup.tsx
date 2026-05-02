"use client";

import { forwardRef } from "react";
import Image from "next/image";

interface PhoneMockupProps {
  src: string;
  alt: string;
  zIndex: number;
}

const PhoneMockup = forwardRef<HTMLDivElement, PhoneMockupProps>(function PhoneMockup(
  { src, alt, zIndex },
  ref,
) {
  return (
    <div
      ref={ref}
      className="absolute will-change-transform"
      style={{
        width: 200,
        height: 400,
        zIndex,
        bottom: 0,
        left: 0,
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden bg-bg-night"
        style={{
          borderRadius: 32,
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.35), inset 0 0 0 4px #1A1A1A, inset 0 0 0 6px rgba(200,169,110,0.18)",
        }}
      >
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />

        {/* Dynamic island */}
        <div
          aria-hidden
          className="absolute left-1/2 top-2 z-[3] h-6 w-24 -translate-x-1/2 rounded-full bg-bg-night"
        />

        {/* Side button outlines */}
        <span aria-hidden className="absolute -left-[3px] top-[80px]  h-12 w-[3px] rounded-l-sm bg-bg-night" />
        <span aria-hidden className="absolute -left-[3px] top-[140px] h-20 w-[3px] rounded-l-sm bg-bg-night" />
        <span aria-hidden className="absolute -right-[3px] top-[110px] h-16 w-[3px] rounded-r-sm bg-bg-night" />

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
