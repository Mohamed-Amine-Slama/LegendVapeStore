"use client";

import { cn } from "@/lib/cn";

interface CarouselNavDotsProps {
  total: number;
  activeCards: number[];
}

export default function CarouselNavDots({ total, activeCards }: CarouselNavDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = activeCards.includes(i);
        return (
          <span
            key={i}
            aria-label={`Card ${i + 1}`}
            className={cn(
              "block transition-all duration-300 ease-out",
              isActive
                ? "h-[6px] w-[20px] rounded-full bg-accent"
                : "h-[6px] w-[6px] rounded-full bg-bg-dark/20",
            )}
          />
        );
      })}
    </div>
  );
}
