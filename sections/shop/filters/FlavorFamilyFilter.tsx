"use client";

import { cn } from "@/lib/cn";
import { FLAVOR_FAMILIES } from "@/constants/shop";
import type { FlavorFamily } from "@/types/shop";
import { useI18n } from "@/context/I18nContext";

interface FlavorFamilyFilterProps {
  value: FlavorFamily[];
  onToggle: (f: FlavorFamily) => void;
}

export default function FlavorFamilyFilter({ value, onToggle }: FlavorFamilyFilterProps) {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-3 gap-x-3 gap-y-4">
      {FLAVOR_FAMILIES.map((flv) => {
        const selected = value.includes(flv.name);
        return (
          <button
            key={flv.name}
            type="button"
            onClick={() => onToggle(flv.name)}
            aria-pressed={selected}
            aria-label={t(flv.nameKey)}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={cn("transition-all duration-200", selected && "scale-[1.08]")}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: flv.color,
                boxShadow: selected
                  ? "0 0 0 2.5px #1A1A1A, 0 0 0 5.5px #F0EDE8, 0 0 0 7.5px #1A1A1A"
                  : "0 0 0 1.5px rgba(26,26,26,0.12)",
              }}
            />
            <span
              className="font-ui font-medium"
              style={{
                fontSize: 9,
                color: selected ? "#1A1A1A" : "rgba(26,26,26,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              {t(flv.nameKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
