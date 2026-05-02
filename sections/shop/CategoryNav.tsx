"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import CategoryPill from "./CategoryPill";
import SortDropdown from "./SortDropdown";
import { CATEGORIES } from "@/constants/shop";
import type { ShopCategory, SortOption } from "@/types/shop";

interface CategoryNavProps {
  activeCategory: ShopCategory;
  onCategoryChange: (c: ShopCategory) => void;
  sortBy: SortOption;
  onSortChange: (v: SortOption) => void;
}

export interface CategoryNavHandle {
  pills: HTMLButtonElement[];
}

/**
 * Sticky horizontal pill nav. Sticks 68px below viewport top to clear the
 * global Navbar. Below itself is a 1px hairline so the sidebar/grid below
 * read as a separate plane.
 */
const CategoryNav = forwardRef<CategoryNavHandle, CategoryNavProps>(function CategoryNav(
  { activeCategory, onCategoryChange, sortBy, onSortChange },
  ref,
) {
  const pillRefs = useRef<HTMLButtonElement[]>([]);

  useImperativeHandle(ref, () => ({
    pills: pillRefs.current.filter(Boolean) as HTMLButtonElement[],
  }), []);

  return (
    <nav
      className="sticky top-[64px] z-[50] h-[58px] w-full border-b border-bg-dark/8 bg-bg-light sm:top-[68px]"
    >
      {/* Subtle noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Pills row scrolls horizontally on mobile — 4 pills + sort don't fit */}
      <div className="relative z-[2] flex h-full items-center gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-8 md:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-shrink-0 items-center gap-2">
          {CATEGORIES.map((c, i) => (
            <CategoryPill
              key={c}
              category={c}
              isActive={c === activeCategory}
              onClick={() => onCategoryChange(c)}
              ref={(el) => {
                if (el) pillRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        <div className="ml-auto flex-shrink-0">
          <SortDropdown value={sortBy} onChange={onSortChange} />
        </div>
      </div>
    </nav>
  );
});

export default CategoryNav;
