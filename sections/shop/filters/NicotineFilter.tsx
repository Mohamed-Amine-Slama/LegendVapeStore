"use client";

import Checkbox from "@/components/ui/Checkbox";
import { NICOTINE_OPTIONS } from "@/constants/shop";
import type { NicotineMg } from "@/types/shop";

interface NicotineFilterProps {
  value: NicotineMg[];
  onToggle: (mg: NicotineMg) => void;
}

export default function NicotineFilter({ value, onToggle }: NicotineFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      {NICOTINE_OPTIONS.map((opt) => {
        const isChecked = value.includes(opt.mg);
        return (
          <label
            key={opt.mg}
            className="flex cursor-pointer items-start gap-2.5"
            onClick={(e) => {
              e.preventDefault();
              onToggle(opt.mg);
            }}
          >
            <Checkbox checked={isChecked} onChange={() => onToggle(opt.mg)} ariaLabel={opt.label} />
            <div className="flex flex-1 flex-col">
              <span className="flex items-center gap-2">
                <span
                  className="font-ui font-medium"
                  style={{ fontSize: 12, color: "#1A1A1A" }}
                >
                  {opt.label}
                </span>
                {opt.mg === 50 && (
                  <span
                    className="font-ui font-bold uppercase"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      background: "#C8A96E",
                      color: "#1A1A1A",
                      padding: "2px 7px",
                      borderRadius: 9999,
                    }}
                  >
                    MAX
                  </span>
                )}
              </span>
              <span
                className="font-ui font-normal"
                style={{ fontSize: 10, color: "rgba(26,26,26,0.4)" }}
              >
                {opt.sub}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  );
}
