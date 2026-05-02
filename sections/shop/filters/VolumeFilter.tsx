"use client";

import { cn } from "@/lib/cn";
import { VOLUME_OPTIONS } from "@/constants/shop";
import type { Volume } from "@/types/shop";

interface VolumeFilterProps {
  value: Volume[];
  onToggle: (v: Volume) => void;
}

export default function VolumeFilter({ value, onToggle }: VolumeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {VOLUME_OPTIONS.map((vol) => {
        const active = value.includes(vol);
        return (
          <button
            key={vol}
            type="button"
            onClick={() => onToggle(vol)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-3.5 py-1.5 font-ui font-semibold uppercase transition-all duration-220",
              active
                ? "border-accent bg-accent text-bg-dark shadow-[0_3px_10px_rgba(200,169,110,0.3)]"
                : "border-bg-dark/15 bg-transparent text-bg-dark/50 hover:border-bg-dark/35",
            )}
            style={{
              fontSize: 11,
              letterSpacing: "0.06em",
              borderWidth: 1.5,
              borderStyle: "solid",
            }}
          >
            {vol}ml
          </button>
        );
      })}
    </div>
  );
}
