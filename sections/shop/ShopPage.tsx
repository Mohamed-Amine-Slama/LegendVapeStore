"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useShopFilters } from "@/hooks/useShopFilters";
import { SHOP_PRODUCTS } from "@/constants/shop";

import ShopHero from "./ShopHero";
import CategoryNav, { type CategoryNavHandle } from "./CategoryNav";
import FilterSidebar from "./FilterSidebar";
import ResultsHeader from "./ResultsHeader";
import ProductGrid, { type ProductGridHandle } from "./ProductGrid";
import LoadMore from "./LoadMore";
import ShopFooterCTA from "./ShopFooterCTA";

const PAGE_SIZE = 12;

/**
 * Top-level shop page client component.
 *
 * Owns the filter controller (via useShopFilters) and orchestrates the
 * GSAP entrance choreography (Shop.md §10):
 *   1. Hero title fades up
 *   2. Category pills stagger in from above
 *   3. Sidebar slides in from the left
 *   4. Product cards stagger up + scale to 1
 */
export default function ShopPage() {
  const controller = useShopFilters();
  const {
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    visibleCount,
    setVisibleCount,
    filteredProducts,
  } = controller;

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<CategoryNavHandle>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const gridRef = useRef<ProductGridHandle>(null);

  /** Mobile-only filter drawer toggle (FilterSidebar renders as a drawer on
   *  viewports below `lg`). Defaults closed. */
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /** Count of active filter chips — used to badge the mobile Filters button. */
  const activeFilterCount = controller.activeChips.length;

  // Total count for the active category (independent of filters).
  const totalForCategory = useMemo(
    () => SHOP_PRODUCTS.filter((p) => p.category === activeCategory).length,
    [activeCategory],
  );

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount],
  );

  // Reset pagination when filters/category change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, controller.filters, sortBy, setVisibleCount]);

  // Page entrance animation — runs once on mount.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTitle = heroRef.current?.querySelector("[data-shop-title]");
      const pills = navRef.current?.pills ?? [];

      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 },
        );
      }

      if (pills.length) {
        gsap.fromTo(
          pills,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.07,
            delay: 0.3,
          },
        );
      }

      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", delay: 0.4 },
        );
      }

      const cards = gridRef.current?.cards ?? [];
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.07,
            delay: 0.5,
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Re-stagger newly mounted cards when filters / category change.
  useLayoutEffect(() => {
    const cards = gridRef.current?.cards ?? [];
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.05,
        },
      );
    });
    return () => ctx.revert();
  }, [visibleProducts]);

  return (
    <div
      data-shop-page
      className="pt-[64px] sm:pt-[68px]"
      style={{ background: "#F0EDE8", minHeight: "100vh" }}
    >
      <ShopHero
        ref={heroRef}
        title={`All ${activeCategory.toLowerCase()}`}
        productCount={totalForCategory}
      />

      <CategoryNav
        ref={navRef}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <FilterSidebar
          ref={sidebarRef}
          controller={controller}
          mobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        <main className="px-4 pb-12 pt-6 sm:px-6 md:px-8 lg:px-10 lg:pt-8">
          {/* Mobile-only Filters trigger — opens the slide-in drawer */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-bg-dark/15 px-4 py-2.5 font-ui font-semibold uppercase text-bg-dark transition-colors hover:border-bg-dark/35 lg:hidden"
            style={{ fontSize: 11, letterSpacing: "0.12em" }}
            aria-label="Open filters"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <line x1="1.5" y1="3.5" x2="12.5" y2="3.5" />
              <circle cx="5" cy="3.5" r="1.4" fill="#F0EDE8" />
              <line x1="1.5" y1="7" x2="12.5" y2="7" />
              <circle cx="9" cy="7" r="1.4" fill="#F0EDE8" />
              <line x1="1.5" y1="10.5" x2="12.5" y2="10.5" />
              <circle cx="6" cy="10.5" r="1.4" fill="#F0EDE8" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span
                className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-bg-dark"
                aria-label={`${activeFilterCount} active`}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          <ResultsHeader
            showing={visibleProducts.length}
            total={filteredProducts.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <ProductGrid ref={gridRef} products={visibleProducts} viewMode={viewMode} />

          <LoadMore
            shown={visibleProducts.length}
            total={filteredProducts.length}
            onLoadMore={() => setVisibleCount((n: number) => n + PAGE_SIZE)}
          />
        </main>
      </div>

      <ShopFooterCTA />
    </div>
  );
}
