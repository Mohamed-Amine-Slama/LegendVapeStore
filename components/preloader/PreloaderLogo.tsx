"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const TEXT = "Legend Vape Store";
const LETTERS = TEXT.split("");

/**
 * "Legend Vape Store" in Dancing Script — each letter reveals via clip-path L→R.
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
      stagger: 0.05, // Faster stagger since it's a longer string
    });
  }, []);

  return (
    <div
      className="flex flex-wrap justify-center font-script text-bg-dark leading-none"
      style={{ fontSize: "clamp(48px, 9vw, 100px)", fontWeight: 700, letterSpacing: "-0.02em" }}
    >
      {LETTERS.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el && char !== " ") charsRef.current[i] = el;
          }}
          className="inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
