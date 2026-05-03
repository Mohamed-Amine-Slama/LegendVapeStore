"use client";

import { cn } from "@/lib/cn";
import { LIQUID_TYPE_OPTIONS } from "@/constants/shop";
import type { LiquidType } from "@/types/shop";

interface LiquidTypeFilterProps {
  value: LiquidType[];
  onToggle: (t: LiquidType) => void;
}

export default function LiquidTypeFilter({ value, onToggle }: LiquidTypeFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {LIQUID_TYPE_OPTIONS.map((opt) => {
        const selected = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            aria-pressed={selected}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-2 text-left transition-all duration-200",
              selected
                ? "border-bg-dark bg-bg-dark text-bg-light"
                : "border-bg-dark/15 bg-transparent text-bg-dark hover:border-bg-dark/40",
            )}
          >
            <span
              aria-hidden
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: opt.accent,
                flexShrink: 0,
              }}
            />
            <span
              className="font-ui font-semibold uppercase"
              style={{ fontSize: 10, letterSpacing: "0.1em" }}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
