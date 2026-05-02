"use client";

import { forwardRef } from "react";
import { FILTER_VISIBILITY } from "@/constants/shop";
import type { ShopFilterController } from "@/hooks/useShopFilters";
import FilterGroup from "./FilterGroup";
import ActiveFiltersStrip from "./ActiveFiltersStrip";
import NicotineFilter from "./filters/NicotineFilter";
import FlavorFamilyFilter from "./filters/FlavorFamilyFilter";
import VolumeFilter from "./filters/VolumeFilter";
import PuffCountFilter from "./filters/PuffCountFilter";
import CaffeineFilter from "./filters/CaffeineFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import BrandFilter from "./filters/BrandFilter";

interface FilterSidebarProps {
  controller: ShopFilterController;
}

const FilterSidebar = forwardRef<HTMLElement, FilterSidebarProps>(function FilterSidebar(
  { controller },
  ref,
) {
  const {
    activeCategory,
    filters,
    activeChips,
    toggleNicotine,
    toggleFlavor,
    toggleVolume,
    toggleBrand,
    setMaxPuffCount,
    setCaffeinatedOnly,
    setPriceRange,
    clearAllFilters,
  } = controller;

  const vis = FILTER_VISIBILITY[activeCategory];

  return (
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
      {/* Custom scrollbar */}
      <style>{`
        aside::-webkit-scrollbar { width: 3px }
        aside::-webkit-scrollbar-track { background: transparent }
        aside::-webkit-scrollbar-thumb {
          background: rgba(200,169,110,0.4);
          border-radius: 2px;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          className="font-display uppercase"
          style={{ fontSize: 22, letterSpacing: "0.06em", color: "#1A1A1A", lineHeight: 1 }}
        >
          Filters
        </h2>
        <button
          type="button"
          onClick={clearAllFilters}
          className="font-ui font-medium uppercase transition-colors hover:underline"
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "#C8A96E",
          }}
        >
          Clear all
        </button>
      </div>

      <div
        aria-hidden
        style={{
          margin: "14px 0 18px",
          height: 1,
          background: "rgba(26,26,26,0.08)",
        }}
      />

      {/* Active filters strip */}
      <ActiveFiltersStrip chips={activeChips} />

      {/* Filter groups */}
      <FilterGroup title="Nicotine Strength" visible={vis.nicotine}>
        <NicotineFilter value={filters.nicotineMg} onToggle={toggleNicotine} />
      </FilterGroup>

      <FilterGroup title="Flavor Family" visible={vis.flavor}>
        <FlavorFamilyFilter
          value={filters.flavorFamilies}
          onToggle={toggleFlavor}
        />
      </FilterGroup>

      <FilterGroup title="Volume / Size" visible={vis.volume}>
        <VolumeFilter value={filters.volumes} onToggle={toggleVolume} />
      </FilterGroup>

      <FilterGroup title="Puff Count" visible={vis.puffCount}>
        <PuffCountFilter value={filters.maxPuffCount} onChange={setMaxPuffCount} />
      </FilterGroup>

      <FilterGroup title="Caffeine" visible={vis.caffeine}>
        <CaffeineFilter
          value={filters.caffeinatedOnly}
          onChange={setCaffeinatedOnly}
        />
      </FilterGroup>

      <FilterGroup title="Price Range" visible={vis.price}>
        <PriceRangeFilter value={filters.priceRange} onChange={setPriceRange} />
      </FilterGroup>

      <FilterGroup title="Brand" visible={vis.brand}>
        <BrandFilter value={filters.brands} onToggle={toggleBrand} />
      </FilterGroup>
    </aside>
  );
});

export default FilterSidebar;
