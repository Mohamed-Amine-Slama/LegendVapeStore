"use client";

import { useMemo } from "react";
import Checkbox from "@/components/ui/Checkbox";
import { BRAND_OPTIONS, brandCounts } from "@/constants/shop";
import type { Brand, ShopProduct } from "@/types/shop";

interface BrandFilterProps {
  value: Brand[];
  onToggle: (b: Brand) => void;
  /** When supplied, the (count) badges reflect this catalogue. Falls back
   *  to all-zero counts if omitted. Wire this to the products passed into
   *  ShopPage so badges stay accurate when the catalogue changes (Sanity). */
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
            "LEGEND VAPE STORE Original": 0,
            "LEGEND VAPE STORE MAX": 0,
            "LEGEND VAPE STORE PRO": 0,
            "LEGEND VAPE STORE LITE": 0,
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
