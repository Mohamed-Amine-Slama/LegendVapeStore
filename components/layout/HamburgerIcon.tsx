"use client";

import { cn } from "@/lib/cn";

interface HamburgerIconProps {
  isOpen: boolean;
  isDark: boolean;
  onClick: () => void;
}

/**
 * Three-bar hamburger that morphs to an X when isOpen.
 * Bar color flips between white (transparent navbar) and gold (scrolled).
 */
export default function HamburgerIcon({ isOpen, isDark, onClick }: HamburgerIconProps) {
  const barColor = isDark ? "bg-accent" : "bg-bg-dark";

  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center"
    >
      <span
        className={cn(
          "absolute block h-[2px] w-6 origin-center transition-all duration-300",
          barColor,
          isOpen ? "translate-y-0 rotate-45" : "-translate-y-[7px]",
        )}
      />
      <span
        className={cn(
          "absolute block h-[2px] w-6 transition-all duration-300",
          barColor,
          isOpen ? "scale-x-0 opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute block h-[2px] w-6 origin-center transition-all duration-300",
          barColor,
          isOpen ? "translate-y-0 -rotate-45" : "translate-y-[7px]",
        )}
      />
    </button>
  );
}
