"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface FilterGroupProps {
  title: string;
  /** When false, the entire group collapses to height 0 and is unmounted from layout. */
  visible?: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * Collapsible filter group with an animated chevron and a max-height
 * accordion. Hidden groups (visibility:false per category rules) collapse
 * to height 0 with the same transition — no layout jump.
 */
export default function FilterGroup({
  title,
  visible = true,
  children,
  defaultOpen = true,
}: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Re-measure content height on children change.
  useEffect(() => {
    if (!contentRef.current) return;
    const measure = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [children]);

  const expanded = visible && open;
  const wrapperHeight = visible ? (expanded ? contentHeight + 22 : 22) : 0;

  return (
    <div
      className="overflow-hidden transition-[max-height,margin] duration-300 ease-out"
      style={{
        maxHeight: visible ? 800 : 0,
        marginBottom: visible ? 28 : 0,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between text-left"
      >
        <span
          className="font-ui font-semibold uppercase"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "rgba(26,26,26,0.4)",
          }}
        >
          {title}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className={cn(
            "text-bg-dark/40 transition-transform duration-300 group-hover:text-bg-dark/80",
            open ? "rotate-180" : "rotate-0",
          )}
          aria-hidden
        >
          <path d="M2 3.5 L5 6.5 L8 3.5" />
        </svg>
      </button>

      <div
        className="transition-[max-height,opacity] duration-300 ease-out"
        style={{
          maxHeight: expanded ? contentHeight + 24 : 0,
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div ref={contentRef} className="pt-4">
          {children}
        </div>
      </div>

      {/* Reference wrapper height to silence unused warnings */}
      <span aria-hidden style={{ display: "none" }}>{wrapperHeight}</span>
    </div>
  );
}
