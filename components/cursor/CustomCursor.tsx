"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * 30px gold ring cursor. Replaces native cursor on desktop only.
 * Expands ×2 over interactive elements via mouseenter/leave delegation.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    let raf = 0;
    let x = 0;
    let y = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX - 15;
      y = e.clientY - 15;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          gsap.to(cursor, { x, y, duration: 0.18, ease: "power3.out" });
          raf = 0;
        });
      }
    };

    const expand = () => gsap.to(cursor, { scale: 2, duration: 0.22, ease: "power2.out" });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.22, ease: "power2.out" });

    window.addEventListener("mousemove", move);

    // Event delegation for hover-grow on interactive elements.
    const handleOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el?.closest("a, button, [data-cursor-expand]")) expand();
    };
    const handleOut = (e: MouseEvent) => {
      const from = e.target as Element | null;
      const to = (e.relatedTarget as Element | null) ?? null;
      if (from?.closest("a, button, [data-cursor-expand]") && !to?.closest("a, button, [data-cursor-expand]")) {
        shrink();
      }
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "2px solid #C8A96E",
        background: "transparent",
        mixBlendMode: "difference",
      }}
      aria-hidden
    />
  );
}
