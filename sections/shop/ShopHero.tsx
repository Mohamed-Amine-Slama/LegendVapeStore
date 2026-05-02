"use client";

import { forwardRef } from "react";

interface ShopHeroProps {
  title: string;
  productCount: number;
}

/**
 * Thin 180px dark banner at the very top of the shop page.
 * Layout: ghost "SHOP" decorative word far-left + breadcrumb + title (left)
 * with product count (right). A gold gradient hairline runs across the
 * bottom edge for the brand seal.
 */
const ShopHero = forwardRef<HTMLElement, ShopHeroProps>(function ShopHero(
  { title, productCount },
  ref,
) {
  return (
    <section
      ref={ref}
      data-section="shop-hero"
      className="relative h-[140px] w-full overflow-hidden bg-bg-dark sm:h-[160px] md:h-[180px]"
    >
      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ghost decorative "SHOP" word — far left, smaller on mobile */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-display uppercase leading-none"
        style={{
          fontSize: "clamp(120px, 24vw, 200px)",
          color: "rgba(200,169,110,0.12)",
          letterSpacing: "-0.02em",
          paddingLeft: "2vw",
        }}
      >
        SHOP
      </span>

      {/* Left content block — breadcrumb + page title */}
      <div className="relative z-[2] flex h-full items-center px-4 sm:px-8 md:px-12">
        <div className="flex flex-col gap-1.5 sm:gap-2.5">
          <p
            className="font-ui font-medium uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <a href="/" className="transition-colors hover:text-accent">
              Home
            </a>
            <span className="mx-2 opacity-50">/</span>
            <span>Shop</span>
          </p>
          <h1
            data-shop-title
            className="font-display uppercase leading-none text-white"
            style={{
              fontSize: "clamp(28px, 6.5vw, 52px)",
              letterSpacing: "0.005em",
            }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Right product count — moves below the title on small screens */}
      <div
        className="absolute right-4 top-3 z-[2] font-oswald font-semibold uppercase sm:right-8 sm:top-1/2 sm:-translate-y-1/2 md:right-12"
        style={{
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {productCount} {productCount === 1 ? "product" : "products"}
      </div>

      {/* Gold gradient bottom hairline */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0"
        style={{
          height: 2,
          width: "40%",
          background: "linear-gradient(90deg, #C8A96E 0%, transparent 100%)",
        }}
      />
    </section>
  );
});

export default ShopHero;
