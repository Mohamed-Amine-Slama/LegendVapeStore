"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ShopProduct } from "@/types/shop";

interface ProductDetailModalProps {
  product: ShopProduct;
  onClose: () => void;
}

function hexTint(hex: string, alpha = 0.06): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-[9000] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(26,26,26,0.55)" }}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[88vh] w-full max-w-[760px] flex-col overflow-hidden bg-white sm:flex-row"
        style={{ borderRadius: 18, boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-full bg-bg-dark text-bg-light transition-colors hover:bg-accent hover:text-bg-dark"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="3" x2="11" y2="11" />
            <line x1="11" y1="3" x2="3" y2="11" />
          </svg>
        </button>

        <div
          className="relative flex shrink-0 items-center justify-center sm:w-[300px]"
          style={{
            height: 280,
            background: hexTint(product.flavorColor, 0.08),
          }}
        >
          <div
            className="relative h-[78%] w-[72%]"
            style={{ filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.22))" }}
          >
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 80vw, 300px"
              className="object-contain"
            />
          </div>
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-[3px] w-full"
            style={{ background: product.flavorColor }}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-7 sm:px-8">
          <p
            className="font-ui font-medium uppercase"
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "rgba(26,26,26,0.4)",
              marginBottom: 6,
            }}
          >
            {product.category}
          </p>
          <h2
            className="font-oswald font-semibold"
            style={{ fontSize: 24, color: "#1A1A1A", lineHeight: 1.15 }}
          >
            {product.name}
          </h2>
          <p
            className="font-serif italic"
            style={{
              fontSize: 13,
              color: "rgba(26,26,26,0.6)",
              marginTop: 8,
              marginBottom: 16,
              lineHeight: 1.5,
            }}
          >
            {product.description}
          </p>

          <div className="flex items-baseline gap-3" style={{ marginBottom: 18 }}>
            <span
              className="font-oswald font-bold"
              style={{ fontSize: 28, color: "#1A1A1A" }}
            >
              {product.priceTND}
            </span>
            <span
              className="font-ui font-medium"
              style={{ fontSize: 12, color: "rgba(26,26,26,0.45)" }}
            >
              TND
            </span>
            {product.puffCount && (
              <span
                className="ml-auto font-ui font-semibold uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  padding: "5px 11px",
                  borderRadius: 9999,
                  background: "rgba(200,169,110,0.18)",
                  border: "1px solid #C8A96E",
                  color: "#1A1A1A",
                }}
              >
                {product.puffCount.toLocaleString()} puffs
              </span>
            )}
          </div>

          {product.flavors && product.flavors.length > 0 && (
            <div className="border-t border-bg-dark/10 pt-5">
              <p
                className="font-ui font-semibold uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "rgba(26,26,26,0.55)",
                  marginBottom: 10,
                }}
              >
                Available flavors
              </p>
              <ul className="flex flex-col gap-1.5">
                {product.flavors.map((flavor) => (
                  <li
                    key={flavor}
                    className="font-ui"
                    style={{ fontSize: 13, color: "#1A1A1A", lineHeight: 1.4 }}
                  >
                    <span
                      aria-hidden
                      className="mr-2 inline-block align-middle"
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 9999,
                        background: product.flavorColor,
                      }}
                    />
                    {flavor}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
