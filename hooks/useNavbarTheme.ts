"use client";

import { useState, useEffect } from "react";

export type NavbarTheme = "light" | "dark";

const DARK_SECTIONS = new Set(["manifesto", "feature-slam", "footer"]);

export function useNavbarTheme(): NavbarTheme {
  const [theme, setTheme] = useState<NavbarTheme>("light");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let topSection: HTMLElement | null = null;
        let topY = Infinity;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            if (Math.abs(rect.top) < topY) {
              topY = Math.abs(rect.top);
              topSection = entry.target as HTMLElement;
            }
          }
        });

        if (topSection) {
          const sectionName = (topSection as HTMLElement).getAttribute("data-section") || "";
          setTheme(DARK_SECTIONS.has(sectionName) ? "dark" : "light");
        }
      },
      {
        rootMargin: "-1px 0px -95% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return theme;
}
