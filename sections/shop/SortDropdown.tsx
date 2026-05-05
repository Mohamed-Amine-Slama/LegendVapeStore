"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { SORT_OPTIONS } from "@/constants/shop";
import type { SortOption } from "@/types/shop";
import { useI18n } from "@/context/I18nContext";

interface SortDropdownProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

/**
 * Custom sort dropdown.
 *
 * The list panel renders into a portal with viewport-relative `fixed`
 * position so it isn't clipped by CategoryNav's `overflow-x-auto` scroll
 * container or its 58px sticky height.
 */
export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;
    const place = () => {
      const r = btnRef.current!.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentOpt = SORT_OPTIONS.find((o) => o.value === value);
  const current = currentOpt ? t(currentOpt.labelKey) : t("sort.featured");

  return (
    <div className="relative flex items-center gap-3" ref={wrapRef}>
      <span
        className="font-ui font-medium uppercase"
        style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(26,26,26,0.4)" }}
      >
        {t("shop.sortBy")}
      </span>

      <button
        ref={btnRef}
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

      {open && pos && typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={panelRef}
            role="listbox"
            className="fixed z-[9500] min-w-[200px] overflow-hidden rounded-lg border border-bg-dark/10 bg-bg-light shadow-[0_12px_32px_rgba(26,26,26,0.18)]"
            style={{ top: pos.top, right: pos.right }}
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
                  {t(opt.labelKey)}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
