"use client";

import Checkbox from "@/components/ui/Checkbox";
import { BRAND_OPTIONS, brandCounts, SHOP_PRODUCTS } from "@/constants/shop";
import type { Brand } from "@/types/shop";

interface BrandFilterProps {
  value: Brand[];
  onToggle: (b: Brand) => void;
}

const COUNTS = brandCounts(SHOP_PRODUCTS);

export default function BrandFilter({ value, onToggle }: BrandFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      {BRAND_OPTIONS.map((brand) => {
        const checked = value.includes(brand);
        const count = COUNTS[brand];
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
