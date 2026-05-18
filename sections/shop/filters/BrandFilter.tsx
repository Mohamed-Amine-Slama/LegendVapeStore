"use client";

import { useMemo } from "react";
import Checkbox from "@/components/ui/Checkbox";
import { BRAND_OPTIONS, brandCounts } from "@/constants/shop";
import type { Brand, ShopProduct } from "@/types/shop";

interface BrandFilterProps {
  value: Brand[];
  onToggle: (b: Brand) => void;
  /** Live catalogue — drives the (count) badges. Defaults to all-zero
   *  counts if omitted. Wired through `useShopFilters().catalogue`. */
  catalogue?: ShopProduct[];
}

export default function BrandFilter({
  value,
  onToggle,
  catalogue,
}: BrandFilterProps) {
  const counts = useMemo(
    () =>
      catalogue
        ? brandCounts(catalogue)
        : ({
            "La Maison Des Vapes Original": 0,
            "La Maison Des Vapes MAX": 0,
            "La Maison Des Vapes PRO": 0,
            "La Maison Des Vapes LITE": 0,
          } as Record<Brand, number>),
    [catalogue],
  );

  return (
    <div className="flex flex-col gap-3">
      {BRAND_OPTIONS.map((brand) => {
        const checked = value.includes(brand);
        const count = counts[brand];
        return (
          <label
            key={brand}
            className="flex cursor-pointer items-center gap-2.5"
            onClick={(e) => {
              e.preventDefault();
              onToggle(brand);
            }}
          >
            <Checkbox checked={checked} onChange={() => onToggle(brand)} ariaLabel={brand} />
            <span
              className="font-ui font-medium"
              style={{ fontSize: 12, color: "#1A1A1A" }}
            >
              {brand}
            </span>
            <span
              className="ml-auto font-ui"
              style={{ fontSize: 10, color: "rgba(26,26,26,0.35)" }}
            >
              ({count})
            </span>
          </label>
        );
      })}
    </div>
  );
}
