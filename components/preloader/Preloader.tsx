"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloaderContext } from "@/context/PreloaderContext";
import PreloaderLogo from "./PreloaderLogo";
import PreloaderBar from "./PreloaderBar";
import PreloaderCurtain from "./PreloaderCurtain";

/**
 * Lifecycle:
 *   1. Logo letters draw (PreloaderLogo)
 *   2. Progress 0 → 100 over 2.4s drives bar + counter
 *   3. At 100, curtain split runs (~0.85s)
 *   4. onComplete: unmount + signal PreloaderContext
 */
export default function Preloader() {
  const { markDone } = usePreloaderContext();
  const counter = useRef({ val: 0 });
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const tween = gsap.to(counter.current, {
      val: 100,
      duration: 2.4,
      ease: "power1.inOut",
      onUpdate: () => setProgress(Math.round(counter.current.val)),
      onComplete: () => setIsExiting(true),
    });
    return () => {
      tween.kill();
    };
  }, []);

  const handleCurtainComplete = () => {
    markDone();
    setUnmounted(true);
  };

  if (unmounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 30%, #D49180 0%, #C87D65 60%, #9C5D49 100%)",
      }}
      aria-hidden
    >
      {/* Animated grain */}
      <div
        aria-hidden
        className="legend-vape-store-grain pointer-events-none absolute -inset-[10%] opacity-[0.07]"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top eyebrow */}
      <div className="absolute top-12 left-1/2 z-[2] -translate-x-1/2">
        <span
          className="font-ui font-medium uppercase tabular-nums"
          style={{ fontSize: 11, letterSpacing: "0.36em", color: "rgba(26,26,26,0.55)" }}
        >
          Premium Vapor · Est. 2024
        </span>
      </div>

      {isExiting ? (
        <PreloaderCurtain onComplete={handleCurtainComplete} />
      ) : (
        <div className="relative z-[2] flex flex-col items-center">
          <PreloaderLogo />
          <PreloaderBar progress={progress} />
          <div className="mt-3 flex items-center gap-3">
            <span
              className="font-ui tabular-nums"
              style={{ fontSize: 12, letterSpacing: "0.22em", color: "#1A1A1A" }}
            >
              {progress.toString().padStart(3, "0")}
            </span>
            <span
              className="font-ui"
              style={{ fontSize: 12, letterSpacing: "0.22em", color: "rgba(26,26,26,0.5)" }}
            >
              / 100
            </span>
          </div>
        </div>
      )}

      {/* Bottom hint */}
      <div className="absolute bottom-12 left-1/2 z-[2] -translate-x-1/2">
        <span
          className="font-serif italic"
          style={{ fontSize: 13, color: "rgba(26,26,26,0.55)" }}
        >
          Loading the legend-vape-store…
        </span>
      </div>
    </div>
  );
}
