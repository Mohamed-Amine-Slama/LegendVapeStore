"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SORT_OPTIONS } from "@/constants/shop";
import type { SortOption } from "@/types/shop";

interface SortDropdownProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

/**
 * Custom dropdown — no browser default styling. Click trigger to open,
 * click outside or option to close.
 */
export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Featured";

  return (
    <div className="relative flex items-center gap-3" ref={wrapRef}>
      <span
        className="font-ui font-medium uppercase"
        style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(26,26,26,0.4)" }}
      >
        Sort by
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border bg-transparent",
          "border-bg-dark/15 px-3 py-1.5 font-ui font-semibold text-bg-dark",
          "transition-colors hover:border-bg-dark/35",
        )}
        style={{ fontSize: 12, letterSpacing: "0.05em" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className={cn("transition-transform", open && "rotate-180")}
          aria-hidden
        >
          <path d="M2 3.5 L5 6.5 L8 3.5" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-[60] mt-2 min-w-[190px] overflow-hidden rounded-lg border border-bg-dark/10 bg-bg-light shadow-[0_8px_24px_rgba(26,26,26,0.12)]"
        >
          {SORT_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2.5 text-left font-ui transition-colors",
                  "hover:bg-bg-dark/[0.04]",
                  opt.value === value
                    ? "bg-accent/10 font-semibold text-bg-dark"
                    : "text-bg-dark/70",
                )}
                style={{ fontSize: 12, letterSpacing: "0.04em" }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
