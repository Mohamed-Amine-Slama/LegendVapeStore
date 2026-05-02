"use client";

import DualRangeSlider from "@/components/ui/DualRangeSlider";
import { PRICE_RANGE_LIMITS } from "@/constants/shop";

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (next: [number, number]) => void;
}

export default function PriceRangeFilter({ value, onChange }: PriceRangeFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <DualRangeSlider
        value={value}
        min={PRICE_RANGE_LIMITS[0]}
        max={PRICE_RANGE_LIMITS[1]}
        step={5}
        onChange={onChange}
        ariaLabelMin="Minimum price"
        ariaLabelMax="Maximum price"
      />
      <div className="flex items-center justify-between">
        <span
          className="font-oswald font-semibold uppercase"
          style={{ fontSize: 14, color: "#1A1A1A" }}
        >
          {value[0]} TND
        </span>
        <span
          className="font-ui"
          style={{ fontSize: 11, color: "rgba(26,26,26,0.4)", letterSpacing: "0.08em" }}
        >
          —
        </span>
        <span
          className="font-oswald font-semibold uppercase"
          style={{ fontSize: 14, color: "#1A1A1A" }}
        >
          {value[1]} TND
        </span>
      </div>
    </div>
  );
}
