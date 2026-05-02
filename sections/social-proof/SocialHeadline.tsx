"use client";

import { forwardRef } from "react";
import PillButton from "@/components/ui/PillButton";

const LINES: { text: string; color: string; italic?: boolean }[] = [
  { text: "What's", color: "#1A1A1A" },
  { text: "Everyone", color: "#C8A96E" },
  { text: "Talking", color: "#1A1A1A" },
  { text: "About.", color: "#1A1A1A" },
];

const SocialHeadline = forwardRef<HTMLDivElement>(function SocialHeadline(_, ref) {
  return (
    <div ref={ref} className="relative">
      <span
        className="font-ui font-medium uppercase"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: "rgba(26,26,26,0.55)" }}
      >
        Real reviews · 04 / 04
      </span>

      <div className="mt-5">
        {LINES.map((line) => (
          <div
            key={line.text}
            data-headline-line
            className="display-tight"
            style={{
              fontSize: "clamp(72px, 11vw, 156px)",
              lineHeight: 0.86,
              color: line.color,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      <p
        data-headline-copy
        className="mt-7 max-w-md font-serif italic"
        style={{
          color: "rgba(26,26,26,0.65)",
          fontSize: "clamp(15px, 1.4vw, 18px)",
          lineHeight: 1.5,
        }}
      >
        Over 14,000 5-star reviews and counting. See why LEGEND VAPE STORE is the most
        talked-about premium vape on the internet.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-4" data-headline-cta>
        <PillButton href="/shop" variant="gold" size="md" trailingIcon>
          Shop All
        </PillButton>
        <PillButton variant="outline" size="md">
          Read Reviews
        </PillButton>
      </div>
    </div>
  );
});

export default SocialHeadline;
