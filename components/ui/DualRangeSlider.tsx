"use client";

import { useCallback, useId } from "react";

interface DualRangeSliderProps {
  value: [number, number];
  min: number;
  max: number;
  step?: number;
  onChange: (next: [number, number]) => void;
  ariaLabelMin?: string;
  ariaLabelMax?: string;
}

/**
 * Dual-handle range slider. Two stacked native range inputs share the same
 * track; the fill between handles is gold. Handles can't cross — minimum
 * gap = step.
 */
export default function DualRangeSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  ariaLabelMin,
  ariaLabelMax,
}: DualRangeSliderProps) {
  const id = useId();
  const [lo, hi] = value;
  const span = max - min;
  const loPct = ((lo - min) / span) * 100;
  const hiPct = ((hi - min) / span) * 100;

  const handleLo = useCallback(
    (n: number) => {
      const next = Math.min(n, hi - step);
      onChange([next, hi]);
    },
    [hi, step, onChange],
  );
  const handleHi = useCallback(
    (n: number) => {
      const next = Math.max(n, lo + step);
      onChange([lo, next]);
    },
    [lo, step, onChange],
  );

  return (
    <div className="relative w-full">
      <style>{`
        .legend-vape-store-dual-${id} {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 18px;
          appearance: none;
          background: transparent;
          pointer-events: none;
        }
        .legend-vape-store-dual-${id}::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1A1A1A;
          border: 2.5px solid #F0EDE8;
          box-shadow: 0 2px 8px rgba(26,26,26,0.2);
          cursor: pointer;
          pointer-events: all;
          margin-top: -8px;
        }
        .legend-vape-store-dual-${id}::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1A1A1A;
          border: 2.5px solid #F0EDE8;
          box-shadow: 0 2px 8px rgba(26,26,26,0.2);
          cursor: pointer;
          pointer-events: all;
        }
        .legend-vape-store-dual-${id}::-webkit-slider-runnable-track {
          height: 3px;
          background: transparent;
        }
        .legend-vape-store-dual-${id}::-moz-range-track {
          height: 3px;
          background: transparent;
        }
      `}</style>

      <div className="relative" style={{ height: 18 }}>
        {/* Track + fill */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2"
          style={{ height: 3, background: "rgba(26,26,26,0.12)", borderRadius: 2 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{
            left: `${loPct}%`,
            width: `${hiPct - loPct}%`,
            height: 3,
            background: "#C8A96E",
            borderRadius: 2,
          }}
        />

        <input
          type="range"
          className={`legend-vape-store-dual-${id}`}
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => handleLo(Number(e.target.value))}
          aria-label={ariaLabelMin}
        />
        <input
          type="range"
          className={`legend-vape-store-dual-${id}`}
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => handleHi(Number(e.target.value))}
          aria-label={ariaLabelMax}
        />
      </div>
    </div>
  );
}
