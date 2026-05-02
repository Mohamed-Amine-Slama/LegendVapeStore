"use client";

import { cn } from "@/lib/cn";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel?: string;
}

/**
 * 36×20 sliding switch. OFF = grey track, ON = gold track. Knob is a
 * 16px white circle that translates 0 → 16px on toggle.
 */
export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex flex-shrink-0 cursor-pointer transition-colors duration-250",
        checked ? "bg-accent" : "bg-bg-dark/15",
      )}
      style={{ width: 36, height: 20, borderRadius: 10 }}
    >
      <span
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-transform duration-250"
        style={{
          width: 16,
          height: 16,
          left: 2,
          transform: `translate(${checked ? 16 : 0}px, -50%)`,
        }}
      />
    </button>
  );
}
