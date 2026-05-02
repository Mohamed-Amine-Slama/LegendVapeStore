"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { usePreloaderContext } from "@/context/PreloaderContext";

/**
 * Refreshes ScrollTrigger after the initial render and after the preloader
 * exits — page heights have changed by then because pinned sections are
 * mounted and product cards take their final positions.
 */
export default function ScrollTriggerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDone } = usePreloaderContext();

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => window.clearTimeout(id);
  }, [isDone]);

  return <>{children}</>;
}
