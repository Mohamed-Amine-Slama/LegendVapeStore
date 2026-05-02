"use client";

import { useEffect, useRef } from "react";

/**
 * "scroll" label + chevron, opacity-pulses 1↔0.25, fades out past 80px scroll.
 */
export default function HeroScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const op = window.scrollY > 80 ? 0 : 1;
      el.style.opacity = String(op);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="legend-vape-store-pulse pointer-events-none absolute bottom-8 left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500"
      style={{ color: "rgba(26,26,26,0.45)" }}
      aria-hidden
    >
      <span
        className="font-ui uppercase"
        style={{ fontSize: 10, letterSpacing: "0.22em" }}
      >
        scroll
      </span>
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M1 1 L8 8 L15 1" />
      </svg>
    </div>
  );
}
