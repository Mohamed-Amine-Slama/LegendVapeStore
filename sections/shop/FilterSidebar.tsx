"use client";

import { forwardRef, useEffect } from "react";
import { FILTER_VISIBILITY } from "@/constants/shop";
import type { ShopFilterController } from "@/hooks/useShopFilters";
import { cn } from "@/lib/cn";
import FilterGroup from "./FilterGroup";
import ActiveFiltersStrip from "./ActiveFiltersStrip";
import NicotineFilter from "./filters/NicotineFilter";
import FlavorFamilyFilter from "./filters/FlavorFamilyFilter";
import VolumeFilter from "./filters/VolumeFilter";
import LiquidTypeFilter from "./filters/LiquidTypeFilter";
import PuffCountFilter from "./filters/PuffCountFilter";
import CaffeineFilter from "./filters/CaffeineFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import BrandFilter from "./filters/BrandFilter";

interface FilterSidebarProps {
  controller: ShopFilterController;
  /** When true, the mobile slide-in drawer is open. Ignored on lg+ where
   *  the sidebar is always rendered as a sticky rail. */
  mobileOpen?: boolean;
  /** Closes the mobile drawer (backdrop click, X tap, Apply button). */
  onMobileClose?: () => void;
}

const FilterSidebar = forwardRef<HTMLElement, FilterSidebarProps>(function FilterSidebar(
  { controller, mobileOpen = false, onMobileClose },
  ref,
) {
  const {
    catalogue,
    activeCategory,
    filters,
    activeChips,
    toggleNicotine,
    toggleFlavor,
    toggleVolume,
    toggleLiquidType,
    toggleBrand,
    setMaxPuffCount,
    setCaffeinatedOnly,
    setPriceRange,
    clearAllFilters,
  } = controller;

  const vis = FILTER_VISIBILITY[activeCategory];

  // Lock body scroll when mobile drawer is open.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mobileOpen) return;
    if (window.innerWidth >= 1024) return; // drawer is mobile-only
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const filterContent = (
    <>
      <div className="flex items-center justify-between">
        <h2
          className="font-display uppercase"
          style={{ fontSize: 22, letterSpacing: "0.06em", color: "#1A1A1A", lineHeight: 1 }}
        >
          Filters
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearAllFilters}
            className="font-ui font-medium uppercase transition-colors hover:underline"
            style={{ fontSize: 10, letterSpacing: "0.1em", color: "#C8A96E" }}
          >
            Clear all
          </button>
          {/* Mobile drawer close button */}
          {onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Close filters"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-bg-dark/15 text-bg-dark/55 transition-colors hover:border-bg-dark/40 hover:text-bg-dark lg:hidden"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="3" y1="3" x2="11" y2="11" />
                <line x1="11" y1="3" x2="3" y2="11" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div
        aria-hidden
        style={{ margin: "14px 0 18px", height: 1, background: "rgba(26,26,26,0.08)" }}
      />

      <ActiveFiltersStrip chips={activeChips} />

      <FilterGroup title="Nicotine Strength" visible={vis.nicotine}>
        <NicotineFilter value={filters.nicotineMg} onToggle={toggleNicotine} />
      </FilterGroup>

      <FilterGroup title="Type" visible={vis.liquidType}>
        <LiquidTypeFilter value={filters.liquidTypes} onToggle={toggleLiquidType} />
      </FilterGroup>

      <FilterGroup title="Flavor Family" visible={vis.flavor}>
        <FlavorFamilyFilter value={filters.flavorFamilies} onToggle={toggleFlavor} />
      </FilterGroup>

      <FilterGroup title="Volume / Size" visible={vis.volume}>
        <VolumeFilter value={filters.volumes} onToggle={toggleVolume} />
      </FilterGroup>

      <FilterGroup title="Puff Count" visible={vis.puffCount}>
        <PuffCountFilter value={filters.maxPuffCount} onChange={setMaxPuffCount} />
      </FilterGroup>

      <FilterGroup title="Caffeine" visible={vis.caffeine}>
        <CaffeineFilter value={filters.caffeinatedOnly} onChange={setCaffeinatedOnly} />
      </FilterGroup>

      <FilterGroup title="Price Range" visible={vis.price}>
        <PriceRangeFilter value={filters.priceRange} onChange={setPriceRange} />
      </FilterGroup>

      <FilterGroup title="Brand" visible={vis.brand}>
        <BrandFilter
          value={filters.brands}
          onToggle={toggleBrand}
          catalogue={catalogue}
        />
      </FilterGroup>

      {/* Mobile-only Apply CTA at the bottom of the drawer */}
      {onMobileClose && (
        <div className="sticky bottom-0 -mx-7 mt-6 border-t border-bg-dark/8 bg-bg-light px-7 pb-5 pt-4 lg:hidden">
          <button
            type="button"
            onClick={onMobileClose}
            className="w-full rounded-full bg-bg-dark py-3 font-ui font-semibold uppercase text-bg-light transition-colors hover:bg-accent hover:text-bg-dark"
            style={{ fontSize: 12, letterSpacing: "0.12em" }}
          >
            Show results
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* ── Desktop / lg+: sticky sidebar rail ───────────────────────────── */}
      <aside
        ref={ref}
        className="hidden self-start lg:block"
        style={{
          width: 260,
          position: "sticky",
          top: 68 + 58, // Navbar (68) + CategoryNav (58)
          height: "calc(100vh - 126px)",
          overflowY: "auto",
          padding: "32px 28px",
          borderRight: "1px solid rgba(26,26,26,0.07)",
          background: "#F0EDE8",
        }}
      >
        <style>{`
          aside::-webkit-scrollbar { width: 3px }
          aside::-webkit-scrollbar-track { background: transparent }
          aside::-webkit-scrollbar-thumb {
            background: rgba(200,169,110,0.4);
            border-radius: 2px;
          }
        `}</style>
        {filterContent}
      </aside>

      {/* ── Mobile / below-lg: slide-in drawer + backdrop ────────────────── */}
      <div
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-[7000] lg:hidden",
          "transition-opacity duration-300",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={onMobileClose}
          aria-label="Close filters"
          tabIndex={mobileOpen ? 0 : -1}
          className="absolute inset-0 cursor-pointer bg-bg-dark/55 backdrop-blur-[2px]"
        />

        {/* Drawer panel */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[88vw] max-w-[360px] flex-col overflow-y-auto bg-bg-light",
            "shadow-[6px_0_36px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
          style={{ padding: "28px 28px 0" }}
        >
          <style>{`
            .legend-vape-store-drawer::-webkit-scrollbar { width: 3px }
            .legend-vape-store-drawer::-webkit-scrollbar-thumb {
              background: rgba(200,169,110,0.4);
              border-radius: 2px;
            }
          `}</style>
          <div className="legend-vape-store-drawer">{filterContent}</div>
        </div>
      </div>
    </>
  );
});

export default FilterSidebar;
