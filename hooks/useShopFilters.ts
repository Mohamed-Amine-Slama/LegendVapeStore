"use client";

import { useCallback, useMemo, useState } from "react";
import { INITIAL_FILTER_STATE, SHOP_PRODUCTS } from "@/constants/shop";
import type {
  Brand,
  FilterState,
  FlavorFamily,
  NicotineMg,
  ShopCategory,
  ShopProduct,
  SortOption,
  ViewMode,
  Volume,
  ActiveFilterChip,
} from "@/types/shop";

/**
 * Owns the entire shop UI state and derives the visible product list.
 * Returned setters are stable (useCallback) so child components can be
 * memoized without re-renders.
 */
export function useShopFilters() {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("PODS");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [sortBy, setSortBy] = useState<SortOption>("FEATURED");
  const [viewMode, setViewMode] = useState<ViewMode>("GRID");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  /** ── Mutators ────────────────────────────────────────────────────── */
  const toggleNicotine = useCallback((mg: NicotineMg) => {
    setFilters((s) => ({
      ...s,
      nicotineMg: s.nicotineMg.includes(mg)
        ? s.nicotineMg.filter((x) => x !== mg)
        : [...s.nicotineMg, mg],
    }));
  }, []);

  const toggleFlavor = useCallback((f: FlavorFamily) => {
    setFilters((s) => ({
      ...s,
      flavorFamilies: s.flavorFamilies.includes(f)
        ? s.flavorFamilies.filter((x) => x !== f)
        : [...s.flavorFamilies, f],
    }));
  }, []);

  const toggleVolume = useCallback((v: Volume) => {
    setFilters((s) => ({
      ...s,
      volumes: s.volumes.includes(v)
        ? s.volumes.filter((x) => x !== v)
        : [...s.volumes, v],
    }));
  }, []);

  const toggleBrand = useCallback((b: Brand) => {
    setFilters((s) => ({
      ...s,
      brands: s.brands.includes(b)
        ? s.brands.filter((x) => x !== b)
        : [...s.brands, b],
    }));
  }, []);

  const setMaxPuffCount = useCallback((n: number) => {
    setFilters((s) => ({ ...s, maxPuffCount: n }));
  }, []);

  const setCaffeinatedOnly = useCallback((on: boolean) => {
    setFilters((s) => ({ ...s, caffeinatedOnly: on }));
  }, []);

  const setPriceRange = useCallback((range: [number, number]) => {
    setFilters((s) => ({ ...s, priceRange: range }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

  /** ── Derived: filtered + sorted product list ─────────────────────── */
  const filteredProducts = useMemo<ShopProduct[]>(() => {
    let list = SHOP_PRODUCTS.filter((p) => p.category === activeCategory);

    if (filters.nicotineMg.length) {
      list = list.filter((p) => filters.nicotineMg.includes(p.nicotineMg));
    }
    if (filters.flavorFamilies.length) {
      list = list.filter((p) => filters.flavorFamilies.includes(p.flavorFamily));
    }
    if (filters.volumes.length) {
      list = list.filter((p) => p.mlSize !== undefined && filters.volumes.includes(p.mlSize));
    }
    if (activeCategory === "PUFFS") {
      list = list.filter((p) => (p.puffCount ?? 0) <= filters.maxPuffCount);
    }
    if (filters.caffeinatedOnly) {
      list = list.filter((p) => p.caffeinated);
    }
    list = list.filter(
      (p) => p.priceTND >= filters.priceRange[0] && p.priceTND <= filters.priceRange[1],
    );
    if (filters.brands.length) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }

    switch (sortBy) {
      case "PRICE_LOW_HIGH":
        list = [...list].sort((a, b) => a.priceTND - b.priceTND);
        break;
      case "PRICE_HIGH_LOW":
        list = [...list].sort((a, b) => b.priceTND - a.priceTND);
        break;
      case "NEWEST":
        list = [...list].sort((a, b) => b.releaseOrder - a.releaseOrder);
        break;
      case "FEATURED":
      default:
        list = [...list].sort((a, b) => a.featuredOrder - b.featuredOrder);
    }
    return list;
  }, [activeCategory, filters, sortBy]);

  /** ── Derived: active filter chips for the strip above filter groups ─ */
  const activeChips = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];
    filters.nicotineMg.forEach((mg) =>
      chips.push({
        key: `nic-${mg}`,
        label: `${mg}mg`,
        remove: () => toggleNicotine(mg),
      }),
    );
    filters.flavorFamilies.forEach((f) =>
      chips.push({ key: `flv-${f}`, label: f, remove: () => toggleFlavor(f) }),
    );
    filters.volumes.forEach((v) =>
      chips.push({ key: `vol-${v}`, label: `${v}ml`, remove: () => toggleVolume(v) }),
    );
    filters.brands.forEach((b) =>
      chips.push({ key: `brand-${b}`, label: b, remove: () => toggleBrand(b) }),
    );
    if (filters.caffeinatedOnly) {
      chips.push({
        key: "caff",
        label: "Caffeinated",
        remove: () => setCaffeinatedOnly(false),
      });
    }
    return chips;
  }, [filters, toggleNicotine, toggleFlavor, toggleVolume, toggleBrand, setCaffeinatedOnly]);

  return {
    activeCategory,
    setActiveCategory,
    filters,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    visibleCount,
    setVisibleCount,
    filteredProducts,
    activeChips,
    toggleNicotine,
    toggleFlavor,
    toggleVolume,
    toggleBrand,
    setMaxPuffCount,
    setCaffeinatedOnly,
    setPriceRange,
    clearAllFilters,
  };
}

export type ShopFilterController = ReturnType<typeof useShopFilters>;
