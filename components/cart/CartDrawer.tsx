"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { cn } from "@/lib/cn";

/**
 * Slide-in cart drawer. Anchored to the right edge, full height, ~420px wide
 * on desktop / 92vw on mobile. Locks body scroll while open.
 */
export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQty, totalTND, count, clearCart } =
    useCart();
  const { t } = useI18n();

  // Body scroll lock + ESC to close.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-[9100] bg-bg-dark/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
        className={cn(
          "fixed right-0 top-0 z-[9200] flex h-[100dvh] w-[92vw] max-w-[420px] flex-col bg-bg-light shadow-[-12px_0_40px_rgba(26,26,26,0.18)]",
          "transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.18,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-bg-dark/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-bg-dark" style={{ fontSize: 24, letterSpacing: "0.04em" }}>
              {t("cart.title")}
            </h2>
            <span
              className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 font-ui font-bold text-bg-light"
              style={{ fontSize: 11 }}
            >
              {count}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t("cart.close")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-bg-dark transition-colors hover:bg-bg-dark/5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="2" y1="2" x2="12" y2="12" />
              <line x1="12" y1="2" x2="2" y2="12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-dark/5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-bg-dark/60">
                <path d="M5 7 h14 l-1.5 12 h-11 z" />
                <path d="M8.5 7 V4.5 a3.5 3.5 0 0 1 7 0 V7" />
              </svg>
            </div>
            <p className="font-serif text-bg-dark/70 italic" style={{ fontSize: 15 }}>
              {t("cart.empty")}
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-ui font-semibold uppercase text-bg-light transition-transform hover:scale-[1.03]"
              style={{ fontSize: 11, letterSpacing: "0.18em" }}
            >
              {t("cart.shopCta")}
            </Link>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-5 py-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 border-b border-bg-dark/8 py-4 last:border-b-0"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-bg-dark/5">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p
                    className="font-ui font-medium uppercase text-bg-dark/40"
                    style={{ fontSize: 9, letterSpacing: "0.14em" }}
                  >
                    {item.category}
                  </p>
                  <h3 className="font-oswald font-semibold leading-tight text-bg-dark" style={{ fontSize: 14 }}>
                    {item.name}
                  </h3>
                  <div className="mt-auto flex items-end justify-between pt-2">
                    {/* Qty stepper */}
                    <div className="inline-flex items-center rounded-full border border-bg-dark/15">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={t("cart.decrease")}
                        className="h-7 w-7 text-bg-dark/70 transition-colors hover:text-accent"
                      >
                        −
                      </button>
                      <span
                        className="min-w-7 text-center font-ui font-semibold tabular-nums text-bg-dark"
                        style={{ fontSize: 13 }}
                      >
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={t("cart.increase")}
                        className="h-7 w-7 text-bg-dark/70 transition-colors hover:text-accent"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-oswald font-bold text-bg-dark" style={{ fontSize: 16 }}>
                        {(item.unitPriceTND * item.qty).toFixed(0)}
                      </span>
                      <span className="font-ui font-medium text-bg-dark/45" style={{ fontSize: 10 }}>
                        TND
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={t("cart.remove")}
                  className="self-start text-bg-dark/40 transition-colors hover:text-accent"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <line x1="2" y1="2" x2="12" y2="12" />
                    <line x1="12" y1="2" x2="2" y2="12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-bg-dark/10 bg-bg-light px-5 py-4">
            <div className="mb-3 flex items-baseline justify-between">
              <span
                className="font-ui font-medium uppercase text-bg-dark/55"
                style={{ fontSize: 11, letterSpacing: "0.16em" }}
              >
                {t("cart.subtotal")}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-oswald font-bold text-bg-dark" style={{ fontSize: 22 }}>
                  {totalTND.toFixed(0)}
                </span>
                <span className="font-ui font-medium text-bg-dark/55" style={{ fontSize: 12 }}>
                  TND
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-full bg-accent py-3.5 text-center font-ui font-semibold uppercase text-bg-light transition-transform hover:scale-[1.02] active:scale-[0.99]"
              style={{ fontSize: 12, letterSpacing: "0.2em" }}
            >
              {t("cart.checkout")}
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 block w-full font-ui text-bg-dark/55 underline-offset-2 transition-colors hover:text-accent hover:underline"
              style={{ fontSize: 11, letterSpacing: "0.12em" }}
            >
              {t("cart.clear")}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
