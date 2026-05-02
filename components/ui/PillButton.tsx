"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "gold" | "outline" | "outlineLight" | "dark";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  trailingIcon?: boolean;
  className?: string;
}

interface AsButton extends CommonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  "aria-label"?: string;
}

interface AsLink extends CommonProps {
  /** When set, the component renders as a Next.js Link (<a> underneath). */
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
}

type PillButtonProps = AsButton | AsLink;

/**
 * Reusable rounded pill CTA. Renders as <button> by default; pass `href` to
 * render as a Next.js <Link> (used for navigation to /shop, etc.).
 *
 * The forwarded ref is typed `HTMLElement` so the same ref can be passed
 * regardless of whether the button or anchor variant is rendered. This
 * keeps GSAP animation refs (`useRef<HTMLElement>`) compatible with both.
 */
const PillButton = forwardRef<HTMLElement, PillButtonProps>(function PillButton(
  props,
  ref,
) {
  const { children, variant = "gold", size = "md", trailingIcon, className } = props;

  const sizeClasses =
    size === "sm"
      ? "px-5 py-2 text-[11px]"
      : size === "lg"
      ? "px-9 py-4 text-[14px]"
      : "px-7 py-3 text-[12.5px]";

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-ui font-semibold uppercase tracking-[0.12em]",
    "transition-all duration-300 ease-out will-change-transform",
    sizeClasses,
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
  );

  const inner = (
    <>
      {children}
      {trailingIcon && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, onClick } = props;
    const ariaLabel = props["aria-label"];
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  const buttonProps = props as AsButton;
  const ariaLabel = buttonProps["aria-label"];
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {inner}
    </button>
  );
});

export default PillButton;
