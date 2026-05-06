"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloaderContext } from "@/context/PreloaderContext";
import { useI18n } from "@/context/I18nContext";
import PreloaderLogo from "./PreloaderLogo";
import PreloaderBar from "./PreloaderBar";
import PreloaderCurtain from "./PreloaderCurtain";

/** sessionStorage key — prevents the preloader from replaying when a route
 *  triggers a full reload within the same browser session. */
const PLAYED_KEY = "lvs.preloader.played.v1";

/**
 * Lifecycle:
 *   1. Logo letters draw (PreloaderLogo)
 *   2. Progress 0 → 100 over 2.4s drives bar + counter
 *   3. At 100, curtain split runs (~0.85s)
 *   4. onComplete: unmount + signal PreloaderContext
 */
export default function Preloader() {
  const { markDone } = usePreloaderContext();
  const { t } = useI18n();
  const counter = useRef({ val: 0 });
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // If the preloader has already played in this session, skip the intro
    // entirely. Covers cases where a stray full reload lands back on the
    // root layout (which mounts a fresh Preloader each time).
    let alreadyPlayed = false;
    try {
      alreadyPlayed = window.sessionStorage.getItem(PLAYED_KEY) === "1";
    } catch {
      // sessionStorage may be unavailable in privacy modes — fall through.
    }
    if (alreadyPlayed) {
      markDone();
      setUnmounted(true);
      return;
    }

    const tween = gsap.to(counter.current, {
      val: 100,
      duration: 2.4,
      ease: "power1.inOut",
      onUpdate: () => setProgress(Math.round(counter.current.val)),
      onComplete: () => setIsExiting(true),
    });

    // Hard safety net — if anything in the animation pipeline ever stalls
    // (curtain timeline killed mid-flight, ticker paused, gsap context
    // teardown race, etc.), this guarantees the preloader unmounts after
    // the expected total duration plus a generous buffer. Also persists the
    // played flag so the next reload skips even if the curtain never fires
    // its onComplete.
    const safetyTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(PLAYED_KEY, "1");
      } catch {
        // ignore
      }
      markDone();
      setUnmounted(true);
    }, 5000);

    return () => {
      tween.kill();
      window.clearTimeout(safetyTimer);
    };
  }, [markDone]);

  // Stable reference — without useCallback, every Preloader re-render (~100×
  // during the counter tween) would feed PreloaderCurtain a new onComplete,
  // killing and recreating its gsap timeline and stalling the exit.
  const handleCurtainComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem(PLAYED_KEY, "1");
    } catch {
      // ignore
    }
    markDone();
    setUnmounted(true);
  }, [markDone]);

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
          {t("preloader.eyebrow")}
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
          {t("preloader.loading")}
        </span>
      </div>
    </div>
  );
}
