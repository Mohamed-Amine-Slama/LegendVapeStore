"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const LETTERS = ["V", "A", "U", "L", "T", "T"];

/**
 * "LEGEND VAPE STORE" in Dancing Script — each letter reveals via clip-path L→R.
 * Subtle scale-in adds a hint of life on top of the wipe.
 */
export default function PreloaderLogo() {
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const chars = charsRef.current.filter(Boolean);
    if (!chars.length) return;
    gsap.set(chars, { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 8 });
    gsap.to(chars, {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power2.inOut",
      stagger: 0.13,
    });
  }, []);

  return (
    <div
      className="flex font-script text-bg-dark leading-none"
      style={{ fontSize: "clamp(72px, 12vw, 140px)", fontWeight: 700, letterSpacing: "-0.02em" }}
    >
      {LETTERS.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) charsRef.current[i] = el;
          }}
          className="inline-block will-change-transform"
        >
          {char}
        </span>
      ))}
    </div>
  );
}
