"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import type { ShopProduct, ViewMode } from "@/types/shop";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

interface ProductGridProps {
  products: ShopProduct[];
  viewMode: ViewMode;
  onSelect?: (p: ShopProduct) => void;
}

export interface ProductGridHandle {
  cards: HTMLDivElement[];
}

const ProductGrid = forwardRef<ProductGridHandle, ProductGridProps>(function ProductGrid(
  { products, viewMode, onSelect },
  ref,
) {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      cards: cardRefs.current.filter(Boolean) as HTMLDivElement[],
    }),
    [products],
  );

  if (!products.length) return <EmptyState />;

  const isList = viewMode === "LIST";

  return (
    <div
      className={
        isList
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      }
    >
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          onSelect={onSelect}
          ref={(el) => {
            if (el) cardRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
});

export default ProductGrid;
