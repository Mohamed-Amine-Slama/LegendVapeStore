"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => {
      if (mounted) setMatches(e.matches);
    };
    
    // Delay initial check slightly to avoid synchronous setState warning
    setTimeout(() => {
      if (mounted) setMatches(mql.matches);
    }, 0);
    
    mql.addEventListener("change", handler);
    return () => {
      mounted = false;
      mql.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}

export const useIsMobile  = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet  = () => useMediaQuery("(max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
