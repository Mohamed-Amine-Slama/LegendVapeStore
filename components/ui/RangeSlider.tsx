"use client";

import { useId } from "react";

interface RangeSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (next: number) => void;
  ariaLabel?: string;
}

/**
 * Single-handle range slider built on a native <input type="range"> with
 * fully custom styling. The track fill (left of thumb) is rendered via an
 * absolute-positioned gold strip computed from value/(max-min).
 */
export default function RangeSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  ariaLabel,
}: RangeSliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      <style>{`
        .legend-vape-store-range-${id}::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1A1A1A;
          border: 2.5px solid #F0EDE8;
          box-shadow: 0 2px 8px rgba(26,26,26,0.2);
          cursor: pointer;
          margin-top: -8px;
        }
        .legend-vape-store-range-${id}::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1A1A1A;
          border: 2.5px solid #F0EDE8;
          box-shadow: 0 2px 8px rgba(26,26,26,0.2);
          cursor: pointer;
        }
        .legend-vape-store-range-${id}::-webkit-slider-runnable-track {
          height: 3px;
          background: transparent;
          border-radius: 2px;
        }
        .legend-vape-store-range-${id}::-moz-range-track {
          height: 3px;
          background: transparent;
          border-radius: 2px;
        }
      `}</style>

      {/* Track + fill — rendered behind the input */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2"
        style={{ height: 3, background: "rgba(26,26,26,0.12)", borderRadius: 2 }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: "#C8A96E",
            borderRadius: 2,
          }}
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        className={`legend-vape-store-range-${id} relative z-[2] w-full appearance-none bg-transparent`}
        style={{ height: 18 }}
      />
    </div>
  );
}
