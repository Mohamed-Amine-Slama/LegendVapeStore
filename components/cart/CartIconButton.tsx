"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { cn } from "@/lib/cn";

/**
 * Navbar cart trigger. Shows a bag icon, an item-count badge, and pulses
 * briefly each time an item is added (driven by the `lastAddedAt` timestamp
 * exposed by the cart context).
 */
export default function CartIconButton({ onDark = false }: { onDark?: boolean }) {
  const { count, openCart, lastAddedAt } = useCart();
  const { t } = useI18n();
  const btnRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!lastAddedAt || !btnRef.current) return;
    gsap.fromTo(
      btnRef.current,
      { scale: 1 },
      { scale: 1.18, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 },
    );
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.32, ease: "back.out(2.4)" },
      );
    }
  }, [lastAddedAt]);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={openCart}
      aria-label={`${t("nav.cart")}${count > 0 ? ` (${count})` : ""}`}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
        onDark
          ? "border-accent/50 text-bg-light hover:bg-accent hover:text-bg-light hover:border-accent"
          : "border-bg-dark/30 text-bg-dark hover:bg-bg-dark hover:text-bg-light hover:border-bg-dark",
      )}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 5 h10 l-1 9 h-8 z" />
        <path d="M5.5 5 V3.5 a2.5 2.5 0 0 1 5 0 V5" />
      </svg>
      {count > 0 && (
        <span
          ref={badgeRef}
          aria-hidden
          className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-ui font-bold text-bg-dark shadow-[0_2px_6px_rgba(200,169,110,0.45)]"
          style={{ fontSize: 10 }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
