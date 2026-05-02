"use client";

import type { ActiveFilterChip } from "@/types/shop";

interface ActiveFiltersStripProps {
  chips: ActiveFilterChip[];
}

export default function ActiveFiltersStrip({ chips }: ActiveFiltersStripProps) {
  if (!chips.length) return null;

  return (
    <div className="mb-5 flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.remove}
          className="group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-ui font-medium uppercase transition-colors"
          style={{
            fontSize: 10,
            letterSpacing: "0.06em",
            background: "rgba(200,169,110,0.15)",
            border: "1px solid rgba(200,169,110,0.4)",
            color: "#1A1A1A",
          }}
        >
          {chip.label}
          <span
            aria-hidden
            className="text-bg-dark/40 transition-colors group-hover:text-bg-dark"
            style={{ fontSize: 10 }}
          >
            ✕
          </span>
        </button>
      ))}
    </div>
  );
}
