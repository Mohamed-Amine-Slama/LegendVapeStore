"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "outlineLight" | "dark";
  size?: "sm" | "md" | "lg";
  trailingIcon?: boolean;
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(function PillButton(
  { children, variant = "gold", size = "md", trailingIcon, className, ...props },
  ref,
) {
  const sizeStyles =
    size === "sm"
      ? "px-5 py-2 text-[11px]"
      : size === "lg"
      ? "px-9 py-4 text-[14px]"
      : "px-7 py-3 text-[12.5px]";

  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full font-ui font-semibold uppercase tracking-[0.12em]",
        "transition-all duration-300 ease-out will-change-transform",
        sizeStyles,
        variant === "gold" && [
          "bg-accent text-bg-dark gold-halo",
          "hover:scale-[1.04] hover:bg-[#D6BB7E]",
          "active:scale-[0.98]",
        ],
        variant === "outline" && [
          "border border-bg-dark/80 bg-transparent text-bg-dark",
          "hover:bg-bg-dark hover:text-bg-light hover:border-bg-dark hover:scale-[1.02]",
        ],
        variant === "outlineLight" && [
          "border border-bg-light/40 bg-transparent text-bg-light",
          "hover:bg-bg-light hover:text-bg-dark hover:border-bg-light",
        ],
        variant === "dark" && [
          "bg-bg-dark text-accent border border-accent/40",
          "hover:bg-accent hover:text-bg-dark",
        ],
        className,
      )}
    >
      {children}
      {trailingIcon && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </button>
  );
});

export default PillButton;
