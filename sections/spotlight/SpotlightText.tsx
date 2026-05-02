"use client";

import { forwardRef } from "react";
import GoldTag from "@/components/ui/GoldTag";

const LINES: string[][] = [
  ["WE", "HAVE"],
  ["SOMETHING"],
  ["FREAKING"],
  ["GOOD"],
];

const SpotlightText = forwardRef<HTMLDivElement>(function SpotlightText(_, ref) {
  return (
    <div ref={ref} className="relative z-[2]">
      <span
        className="font-ui font-medium uppercase"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: "rgba(26,26,26,0.55)" }}
      >
        — Legend Vape Store Drop / 02
      </span>

      <h2
        className="mt-4 display-tight text-bg-dark"
        style={{
          fontSize: "clamp(56px, 9vw, 130px)",
          lineHeight: 0.86,
        }}
      >
        {LINES.map((words, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap gap-x-3">
            {words.map((word, i) => (
              <span
                key={`${lineIndex}-${i}`}
                data-spotlight-word
                className="inline-block overflow-hidden align-bottom"
              >
                <span className="inline-block will-change-transform">{word}</span>
              </span>
            ))}
          </div>
        ))}
      </h2>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <GoldTag size="lg" rotate={-2.2} color="#C8A96E" textColor="#1A1A1A">
          Premium Grade
        </GoldTag>
        <p
          className="font-serif italic"
          style={{
            color: "rgba(26,26,26,0.65)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            maxWidth: 380,
            lineHeight: 1.5,
          }}
        >
          Hand-tuned coils. Triple-distilled bases. Every batch lab-tested,
          every flavor a deliberate choice.
        </p>
      </div>
    </div>
  );
});

export default SpotlightText;
