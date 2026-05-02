"use client";

import RangeSlider from "@/components/ui/RangeSlider";
import { PUFF_RANGE_LIMITS } from "@/constants/shop";

interface PuffCountFilterProps {
  value: number;
  onChange: (n: number) => void;
}

export default function PuffCountFilter({ value, onChange }: PuffCountFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <RangeSlider
        value={value}
        min={PUFF_RANGE_LIMITS[0]}
        max={PUFF_RANGE_LIMITS[1]}
        step={100}
        onChange={onChange}
        ariaLabel="Maximum puff count"
      />
      <p
        className="text-center font-oswald font-semibold uppercase"
        style={{ fontSize: 18, color: "#1A1A1A", letterSpacing: "0.04em" }}
      >
        Up to {value.toLocaleString()} puffs
      </p>
    </div>
  );
}
