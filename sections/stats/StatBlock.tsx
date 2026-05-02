"use client";

import { forwardRef } from "react";

interface StatBlockProps {
  value: string;
  label: string;
  showSeparator?: boolean;
}

const StatBlock = forwardRef<HTMLDivElement, StatBlockProps>(function StatBlock(
  { value, label, showSeparator },
  ref,
) {
  return (
    <div ref={ref} className="relative flex flex-col items-center text-center">
      {showSeparator && (
        <span
          aria-hidden
          className="absolute -left-px top-1/2 hidden h-14 w-px -translate-y-1/2 md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(26,26,26,0.18), transparent)",
          }}
        />
      )}
      <span
        className="display-tight text-bg-dark"
        style={{
          fontSize: "clamp(44px, 6vw, 84px)",
          lineHeight: 0.9,
        }}
      >
        {value}
      </span>
      <span
        className="mt-3 font-ui font-medium uppercase"
        style={{
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "rgba(26,26,26,0.55)",
        }}
      >
        {label}
      </span>
    </div>
  );
});

export default StatBlock;
