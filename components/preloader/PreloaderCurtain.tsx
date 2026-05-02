"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface PreloaderCurtainProps {
  onComplete: () => void;
}

/**
 * Two halves of the salmon panel slide apart to reveal the page beneath.
 * Top half travels up, bottom slides down — driven by one timeline so
 * they finish in lock-step.
 */
export default function PreloaderCurtain({ onComplete }: PreloaderCurtainProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ onComplete });
    tl.to(topRef.current,    { yPercent: -100, duration: 0.95, ease: "cubic-bezier(0.77,0,0.18,1)" }, 0);
    tl.to(bottomRef.current, { yPercent:  100, duration: 0.95, ease: "cubic-bezier(0.77,0,0.18,1)" }, 0);
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const halfStyle: React.CSSProperties = {
    background:
      "radial-gradient(120% 100% at 50% 50%, #D49180 0%, #C87D65 60%, #9C5D49 100%)",
  };

  return (
    <>
      <div ref={topRef}    className="absolute top-0    left-0 right-0 h-1/2" style={halfStyle} />
      <div ref={bottomRef} className="absolute bottom-0 left-0 right-0 h-1/2" style={halfStyle} />
    </>
  );
}
