"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ShopProduct } from "@/types/shop";

const STORAGE_KEY = "lvs.cart.v1";

export interface CartItem {
  id: string;
  name: string;
  category: ShopProduct["category"];
  imageSrc: string;
  unitPriceTND: number;     // Resolved purchase price (promo or list).
  listPriceTND: number;     // Original list price for line-through display.
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  totalTND: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (p: ShopProduct, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  /** Pulse-flash hint emitted when an item is added. Consumers can read
   *  `lastAddedAt` to trigger a brief icon animation in the navbar. */
  lastAddedAt: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function resolveUnitPrice(p: ShopProduct): number {
  if (
    p.onPromo === true &&
    typeof p.promoPriceTND === "number" &&
    p.promoPriceTND < p.priceTND
  ) {
    return p.promoPriceTND;
  }
  return p.priceTND;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(0);
  const hydrated = useRef(false);

  // Hydrate from localStorage on mount. SSR-safe: cannot read storage on
  // the server, so initial state is empty and we sync once on the client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupt storage
    } finally {
      hydrated.current = true;
    }
  }, []);

  // Persist on change (skip the very first render before hydration).
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // quota / private mode — ignore
    }
  }, [items]);

  const addItem = useCallback((p: ShopProduct, qty = 1) => {
    if (p.inStock === false) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) {
        return prev.map((i) =>
          i.id === p.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [
        ...prev,
        {
          id: p.id,
          name: p.name,
          category: p.category,
          imageSrc: p.imageSrc,
          unitPriceTND: resolveUnitPrice(p),
          listPriceTND: p.priceTND,
          qty,
        },
      ];
    });
    setLastAddedAt(Date.now());
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty } : i));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const totalTND = items.reduce((sum, i) => sum + i.qty * i.unitPriceTND, 0);
    return {
      items,
      count,
      totalTND,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
      addItem,
      removeItem,
      setQty,
      clearCart,
      lastAddedAt,
    };
  }, [items, isOpen, lastAddedAt, addItem, removeItem, setQty, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
