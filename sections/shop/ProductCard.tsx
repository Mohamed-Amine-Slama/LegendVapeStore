"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ShopProduct } from "@/types/shop";

interface ProductCardProps {
  product: ShopProduct;
  onAdd?: (p: ShopProduct) => void;
}

const BADGE_STYLE: Record<NonNullable<ShopProduct["badge"]>, { bg: string; fg: string }> = {
  NEW: { bg: "#1A1A1A", fg: "#F0EDE8" },
  HOT: { bg: "#C8273A", fg: "#FFFFFF" },
  MAX: { bg: "#C8A96E", fg: "#1A1A1A" },
};

/** Convert a hex flavor color to a pale 6%-opacity rgba background tint. */
function hexTint(hex: string, alpha = 0.06): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(function ProductCard(
  { product, onAdd },
  ref,
) {
  const propRotation = ((product.id.charCodeAt(2) || 0) % 40) - 20;
  const isHigh = product.nicotineMg >= 50;

  return (
    <div
      ref={ref}
      data-product-card={product.id}
      className={cn(
        "group relative cursor-pointer overflow-hidden bg-white",
        "transition-[transform,box-shadow] duration-240 ease-out",
        "hover:-translate-y-1.5",
      )}
      style={{
        borderRadius: 16,
        boxShadow: "0 2px 20px rgba(26,26,26,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 14px 36px rgba(26,26,26,0.11)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 20px rgba(26,26,26,0.06)";
      }}
    >
      {/* Image zone */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: 240,
          background: hexTint(product.flavorColor, 0.06),
        }}
      >
        {/* Top-left badge */}
        {product.badge && (
          <span
            className="absolute z-[3] font-ui font-bold uppercase"
            style={{
              top: 14,
              left: 14,
              fontSize: 9,
              letterSpacing: "0.12em",
              padding: "4px 10px",
              borderRadius: 9999,
              background: BADGE_STYLE[product.badge].bg,
              color: BADGE_STYLE[product.badge].fg,
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Decorative prop image (top-right) */}
        {product.propSrc && (
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              top: 18,
              right: 20,
              width: 48,
              height: 48,
              transform: `rotate(${propRotation}deg)`,
              opacity: 0.85,
            }}
          >
            <Image src={product.propSrc} alt="" fill sizes="48px" className="object-contain" />
          </div>
        )}

        {/* Product image — scales + tilts on hover */}
        <div
          className="relative h-[75%] w-[60%] transition-transform duration-350 ease-out group-hover:scale-[1.06] group-hover:-rotate-2"
          style={{
            filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.18))",
          }}
        >
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 80vw, 280px"
            className="object-contain"
          />
        </div>

        {/* Quick-add button (revealed on hover) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.(product);
          }}
          aria-label={`Add ${product.name} to cart`}
          className="absolute z-[3] flex items-center justify-center rounded-full opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-accent hover:text-bg-dark"
          style={{
            bottom: 12,
            right: 12,
            width: 36,
            height: 36,
            background: "#1A1A1A",
            color: "#F0EDE8",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="7" y1="2" x2="7" y2="12" />
            <line x1="2" y1="7" x2="12" y2="7" />
          </svg>
        </button>
      </div>

      {/* Info zone */}
      <div className="px-[18px] pb-5 pt-4">
        <p
          className="font-ui font-medium uppercase"
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "rgba(26,26,26,0.38)",
            marginBottom: 5,
          }}
        >
          {product.category}
        </p>
        <h3
          className="font-oswald font-semibold"
          style={{
            fontSize: 17,
            color: "#1A1A1A",
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {product.name}
        </h3>
        <p
          className="font-serif italic"
          style={{
            fontSize: 12,
            color: "rgba(26,26,26,0.48)",
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span
              className="font-oswald font-bold"
              style={{ fontSize: 20, color: "#1A1A1A", letterSpacing: 0 }}
            >
              {product.priceTND}
            </span>
            <span
              className="ml-1 font-ui font-medium"
              style={{ fontSize: 11, color: "rgba(26,26,26,0.4)" }}
            >
              TND
            </span>
          </div>

          <span
            className="font-ui font-semibold uppercase"
            style={{
              fontSize: 10,
              letterSpacing: "0.08em",
              padding: "4px 10px",
              borderRadius: 9999,
              ...(isHigh
                ? {
                    background: "rgba(200,169,110,0.15)",
                    border: "1px solid #C8A96E",
                    color: "#1A1A1A",
                  }
                : {
                    border: "1px solid rgba(26,26,26,0.18)",
                    color: "rgba(26,26,26,0.55)",
                  }),
            }}
          >
            {product.nicotineMg}MG
          </span>
        </div>
      </div>

      {/* Bottom flavor color strip */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0"
        style={{
          height: 3,
          width: "100%",
          background: product.flavorColor,
          borderRadius: "0 0 16px 16px",
        }}
      />
    </div>
  );
});

export default ProductCard;
