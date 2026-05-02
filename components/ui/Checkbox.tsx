"use client";

import { cn } from "@/lib/cn";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * 16×16 rounded checkbox styled to spec: hollow when unchecked, solid dark
 * with white tick when checked.
 */
export default function Checkbox({
  checked,
  onChange,
  id,
  className,
  ariaLabel,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      id={id}
      onClick={onChange}
      className={cn(
        "relative inline-flex flex-shrink-0 items-center justify-center transition-all duration-150",
        checked
          ? "border-bg-dark bg-bg-dark"
          : "border-bg-dark/20 bg-transparent hover:border-bg-dark/45",
        className,
      )}
      style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1.5,
        borderStyle: "solid",
      }}
    >
      {checked && (
        <svg
          viewBox="0 0 14 14"
          width="11"
          height="11"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M2.5 7.5 L5.5 10.5 L11.5 4" />
        </svg>
      )}
    </button>
  );
}
