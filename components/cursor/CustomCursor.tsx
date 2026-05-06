"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ACCENT_RGB = "200, 169, 110";
const RING_BORDER_IDLE = `rgba(${ACCENT_RGB}, 0.55)`;
const RING_BORDER_ACTIVE = `rgba(${ACCENT_RGB}, 0.9)`;
const RING_FILL_IDLE = `rgba(${ACCENT_RGB}, 0)`;
const RING_FILL_ACTIVE = `rgba(${ACCENT_RGB}, 0.14)`;
const HOVER_SELECTOR = "a, button, [role='button'], [data-cursor-expand]";

/**
 * Dual-layer cursor: precise gold dot + trailing gold ring.
 *  - dot snaps tightly to the pointer (precision)
 *  - ring trails with easing (luxury halo)
 *  - hover over interactive elements expands ring + tints fill
 *  - mousedown gives a subtle press pulse
 *  - hidden on coarse pointers (touch / pen with no fine cursor)
 *  - respects prefers-reduced-motion (near-instant tracking)
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isCoarse = useMediaQuery("(max-width: 767px), (pointer: coarse)");

  useEffect(() => {
    if (isCoarse || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dotDur = reducedMotion ? 0.05 : 0.12;
    const ringDur = reducedMotion ? 0.05 : 0.45;

    const dotX = gsap.quickTo(dot, "x", { duration: dotDur, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: dotDur, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: ringDur, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: ringDur, ease: "power3.out" });

    let revealed = false;
    let hoveringInteractive = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
    };

    const expand = () => {
      gsap.to(ring, {
        scale: 1.9,
        backgroundColor: RING_FILL_ACTIVE,
        borderColor: RING_BORDER_ACTIVE,
        duration: 0.32,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, { scale: 0.4, duration: 0.32, ease: "power3.out", overwrite: "auto" });
    };

    const shrink = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: RING_FILL_IDLE,
        borderColor: RING_BORDER_IDLE,
        duration: 0.32,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, { scale: 1, duration: 0.32, ease: "power3.out", overwrite: "auto" });
    };

    const press = () => {
      gsap.to(ring, {
        scale: hoveringInteractive ? 1.55 : 0.78,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const release = () => {
      if (hoveringInteractive) expand();
      else shrink();
    };

    const conceal = () => {
      revealed = false;
      hoveringInteractive = false;
      shrink();
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
    };

    const move = (e: MouseEvent) => {
      reveal();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el?.closest(HOVER_SELECTOR)) {
        hoveringInteractive = true;
        expand();
      }
    };

    const handleOut = (e: MouseEvent) => {
      const from = e.target as Element | null;
      const to = (e.relatedTarget as Element | null) ?? null;
      if (from?.closest(HOVER_SELECTOR) && !to?.closest(HOVER_SELECTOR)) {
        hoveringInteractive = false;
        shrink();
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    document.documentElement.addEventListener("mouseleave", conceal);
    document.documentElement.addEventListener("mouseenter", reveal);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
      document.documentElement.removeEventListener("mouseleave", conceal);
      document.documentElement.removeEventListener("mouseenter", reveal);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: "50%",
          border: `1.5px solid ${RING_BORDER_IDLE}`,
          backgroundColor: RING_FILL_IDLE,
          boxShadow: `0 0 22px rgba(${ACCENT_RGB}, 0.18)`,
          opacity: 0,
          visibility: "hidden",
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          backgroundColor: "#C8A96E",
          boxShadow: `0 0 10px rgba(${ACCENT_RGB}, 0.55)`,
          opacity: 0,
          visibility: "hidden",
        }}
        aria-hidden
      />
    </>
  );
}
