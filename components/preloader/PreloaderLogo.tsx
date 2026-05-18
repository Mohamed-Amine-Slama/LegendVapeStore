"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Brand logo (LogoBlack) on the warm preloader background.
 * Reveals via a left→right clip-path wipe + subtle scale-in.
 */
export default function PreloaderLogo() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 10, scale: 0.96 });
    gsap.to(el, {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative will-change-transform"
      style={{
        width: "clamp(120px, 22vw, 220px)",
        height: "clamp(120px, 22vw, 220px)",
      }}
    >
      <Image
        src="/LogoBlack.png"
        alt="La Maison Des Vapes"
        fill
        priority
        sizes="(max-width: 640px) 140px, 220px"
        className="object-contain"
      />
    </div>
  );
}
