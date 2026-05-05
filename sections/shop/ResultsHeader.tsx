"use client";

import { cn } from "@/lib/cn";
import type { ViewMode } from "@/types/shop";
import { useI18n } from "@/context/I18nContext";

interface ResultsHeaderProps {
  showing: number;
  total: number;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
}

export default function ResultsHeader({
  showing,
  total,
  viewMode,
  onViewModeChange,
}: ResultsHeaderProps) {
  const { t } = useI18n();
  return (
    <div
      className="mb-6 flex items-center justify-between border-b pb-5"
      style={{ borderColor: "rgba(26,26,26,0.06)" }}
    >
      <p
        className="font-ui font-medium uppercase"
        style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(26,26,26,0.4)" }}
      >
        {t("shop.showing")} {showing} {t("shop.of")} {total} {t("shop.products")}
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onViewModeChange("GRID")}
          aria-label={t("shop.gridView")}
          aria-pressed={viewMode === "GRID"}
          className={cn(
            "transition-colors",
            viewMode === "GRID" ? "text-bg-dark" : "text-bg-dark/25 hover:text-bg-dark/55",
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2"  width="6" height="6" rx="1" />
            <rect x="10" y="2" width="6" height="6" rx="1" />
            <rect x="2" y="10" width="6" height="6" rx="1" />
            <rect x="10" y="10" width="6" height="6" rx="1" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("LIST")}
          aria-label={t("shop.listView")}
          aria-pressed={viewMode === "LIST"}
          className={cn(
            "transition-colors",
            viewMode === "LIST" ? "text-bg-dark" : "text-bg-dark/25 hover:text-bg-dark/55",
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="2" y1="4" x2="16" y2="4" />
            <line x1="2" y1="9" x2="16" y2="9" />
            <line x1="2" y1="14" x2="16" y2="14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
