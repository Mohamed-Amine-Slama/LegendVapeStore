"use client";

import { forwardRef } from "react";
import Image from "next/image";

interface HeroProductProps {
  src: string;
  alt: string;
  width: number;
  /** When set true, the wrapper is centered at top:50%,left:50% via xPercent/yPercent.
   *  Initial visual placement is then driven entirely by GSAP transforms. */
  centered?: boolean;
  zIndex?: number;
  index?: number;
  priority?: boolean;
  /** Ref to the inner element used for burst/float animations */
  innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * Generic hero product wrapper. Double-wrapped:
 *   - Outer div → parallax target (scroll-scrubbed y translation)
 *   - Inner div → burst/float/scale target (timeline + infinite float)
 *
 * This separation prevents GSAP parallax and float tweens from fighting
 * over the same `y` property, which was causing judder on scroll-back.
 */
const HeroProduct = forwardRef<HTMLDivElement, HeroProductProps>(function HeroProduct(
  { src, alt, width, centered = true, zIndex = 4, index, priority, innerRef },
  ref,
) {
  return (
    <div
      ref={ref}
      className="absolute pointer-events-none select-none"
      style={{
        top: centered ? "50%" : undefined,
        left: centered ? "50%" : undefined,
        width,
        height: width * 1.66,
        zIndex,
      }}
      data-hero-parallax={index}
    >
      <div
        ref={innerRef}
        className="w-full h-full"
        style={{
          filter:
            "drop-shadow(0 24px 32px rgba(0,0,0,0.25)) drop-shadow(0 8px 12px rgba(0,0,0,0.18))",
        }}
        data-hero-product={index}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 30vw, 240px"
          className="object-contain"
          priority={priority}
        />
      </div>
    </div>
  );
});

export default HeroProduct;
