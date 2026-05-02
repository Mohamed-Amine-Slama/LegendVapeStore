"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { ShopCategory } from "@/types/shop";

interface CategoryPillProps {
  category: ShopCategory;
  isActive: boolean;
  onClick: () => void;
}

const ICON_BY_CATEGORY: Record<ShopCategory, React.ReactNode> = {
  PODS: (
    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="1.5" width="8" height="11" rx="2.5" />
      <line x1="5" y1="4" x2="9" y2="4" />
    </svg>
  ),
  PUFFS: (
    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9 q-1.5 -2.5 1 -3.5 q0.5 -2 3 -2 q2 -0.5 3 1.5 q2 0 1.5 2 q0.5 1.5 -1 2 z" />
      <path d="M5 11 q1 1 2 0" />
    </svg>
  ),
  CAPSULES: (
    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="10" height="4" rx="2" transform="rotate(-25 7 7)" />
      <line x1="6.5" y1="3.5" x2="8" y2="10.5" transform="rotate(-25 7 7)" />
    </svg>
  ),
  LIQUID: (
    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 1.5 C 4 5, 3 7, 3 9 a4 4 0 0 0 8 0 c 0 -2 -1 -4 -4 -7.5 z" />
    </svg>
  ),
  COILS: (
    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="5" />
      <circle cx="7" cy="7" r="2.5" />
      <line x1="7" y1="2" x2="7" y2="4.5" />
      <line x1="7" y1="9.5" x2="7" y2="12" />
    </svg>
  ),
};

const CategoryPill = forwardRef<HTMLButtonElement, CategoryPillProps>(function CategoryPill(
  { category, isActive, onClick },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full font-ui font-semibold uppercase",
        "border-[1.5px] transition-all duration-220 ease-out",
        "px-6 py-2.5",
        isActive
          ? "border-bg-dark bg-bg-dark text-bg-light shadow-[0_4px_14px_rgba(26,26,26,0.14)]"
          : "border-bg-dark/15 bg-transparent text-bg-dark/45 hover:border-bg-dark hover:bg-bg-dark hover:text-bg-light hover:shadow-[0_4px_14px_rgba(26,26,26,0.14)]",
      )}
      style={{ fontSize: 12, letterSpacing: "0.1em" }}
    >
      {/* Active gold dot */}
      {isActive && (
        <span
          aria-hidden
          className="inline-block rounded-full bg-accent"
          style={{ width: 5, height: 5 }}
        />
      )}
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className="opacity-90">
          {ICON_BY_CATEGORY[category]}
        </span>
        {category}
      </span>
    </button>
  );
});

export default CategoryPill;
