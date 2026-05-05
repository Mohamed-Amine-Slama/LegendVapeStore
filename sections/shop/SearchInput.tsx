"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ShopProduct } from "@/types/shop";
import { useI18n } from "@/context/I18nContext";

interface SearchInputProps {
  value: string;
  onChange: (q: string) => void;
  /** Catalogue used to compute live suggestions. */
  catalogue: ShopProduct[];
  /** Optional: invoked when user picks a suggestion (default = setValue). */
  onPick?: (product: ShopProduct) => void;
}

const MAX_SUGGESTIONS = 6;

/**
 * Predictive name search. As the user types, surfaces up to 6 product-name
 * matches (substring match, case-insensitive). Picking a suggestion fills
 * the input with that product's name — `useShopFilters` then narrows the
 * grid to that match across all categories.
 */
export default function SearchInput({ value, onChange, catalogue, onPick }: SearchInputProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo<ShopProduct[]>(() => {
    const q = value.trim().toLowerCase();
    if (q.length < 1) return [];
    const matches: ShopProduct[] = [];
    const seen = new Set<string>();
    for (const p of catalogue) {
      if (p.name.toLowerCase().includes(q) && !seen.has(p.name)) {
        matches.push(p);
        seen.add(p.name);
        if (matches.length >= MAX_SUGGESTIONS) break;
      }
    }
    return matches;
  }, [value, catalogue]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Reset highlight when suggestion list changes
  useEffect(() => {
    setActiveIdx(0);
  }, [suggestions.length]);

  const showDropdown = open && suggestions.length > 0;

  const pick = (product: ShopProduct) => {
    if (onPick) onPick(product);
    else onChange(product.name);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        {/* Magnifying glass icon */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "rgba(26,26,26,0.45)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="6" cy="6" r="4.2" />
            <line x1="9.2" y1="9.2" x2="12.2" y2="12.2" strokeLinecap="round" />
          </svg>
        </span>

        <input
          type="search"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!showDropdown) {
              if (e.key === "Escape") onChange("");
              return;
            }
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIdx((i) => (i + 1) % suggestions.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIdx((i) => (i - 1 + suggestions.length) % suggestions.length);
            } else if (e.key === "Enter") {
              e.preventDefault();
              pick(suggestions[activeIdx]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder={t("shop.searchPlaceholder")}
          aria-label={t("shop.searchAria")}
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          className="font-ui w-full rounded-full bg-white py-3 pl-11 pr-12 outline-none transition-shadow"
          style={{
            fontSize: 13,
            color: "#1A1A1A",
            border: "1px solid rgba(26,26,26,0.14)",
            boxShadow: "0 1px 4px rgba(26,26,26,0.04)",
          }}
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            aria-label={t("shop.clearSearch")}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-bg-dark/55 transition-colors hover:bg-bg-dark hover:text-bg-light"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="2" y1="2" x2="9" y2="9" />
              <line x1="9" y1="2" x2="2" y2="9" />
            </svg>
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-[40] mt-2 max-h-[320px] overflow-y-auto bg-white"
          style={{
            borderRadius: 14,
            border: "1px solid rgba(26,26,26,0.1)",
            boxShadow: "0 14px 36px rgba(26,26,26,0.12)",
          }}
        >
          {suggestions.map((p, i) => (
            <li
              key={p.id}
              role="option"
              aria-selected={i === activeIdx}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(p);
              }}
              onMouseEnter={() => setActiveIdx(i)}
              className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 transition-colors"
              style={{
                background: i === activeIdx ? "rgba(200,169,110,0.12)" : "transparent",
                borderBottom:
                  i < suggestions.length - 1 ? "1px solid rgba(26,26,26,0.06)" : "none",
              }}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block shrink-0 rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: p.flavorColor,
                  }}
                />
                <span
                  className="font-oswald truncate"
                  style={{ fontSize: 14, color: "#1A1A1A" }}
                >
                  {highlight(p.name, value)}
                </span>
              </span>
              <span
                className="font-ui shrink-0 uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  color: "rgba(26,26,26,0.45)",
                }}
              >
                {p.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Render `text` with the matched substring of `query` bolded. */
function highlight(text: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ color: "#A88848", fontWeight: 700 }}>
        {text.slice(idx, idx + q.length)}
      </strong>
      {text.slice(idx + q.length)}
    </>
  );
}
