/**
 * Order domain types.
 *
 * Orders are written by the storefront when a customer completes the
 * checkout form. They live in the `orders` collection alongside
 * `products` so the dashboard (future page) can list and fulfill them.
 *
 * Payment is "Cash on Delivery" only (the Tunisia market norm). After
 * the order is persisted the storefront opens a WhatsApp deeplink to
 * the owner's number with the delivery details prefilled — no online
 * payment gateway is involved.
 */

import type { ShopCategory } from "@/types/shop";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type PaymentMethod = "cod";

export interface OrderLineItem {
  productId: string;
  name: string;
  category: ShopCategory;
  imageSrc: string;
  unitPriceTND: number;
  listPriceTND: number;
  qty: number;
  /** Pre-computed for convenience: unitPriceTND * qty. */
  lineTotalTND: number;
}

export interface OrderCustomer {
  fullName: string;
  /** E.164 without "+" — e.g. "21612345678". The form normalizes the input. */
  phone: string;
  email?: string;
}

export interface OrderDelivery {
  /** Street + building + apartment. Free-form. */
  address: string;
  city: string;
  /** Tunisian governorate. */
  governorate: string;
  postalCode?: string;
  /** Optional gate-code / landmark / instructions to the courier. */
  notes?: string;
}

/** Stored shape (matches what's written to MongoDB). */
export interface Order {
  _id?: string;
  /** Short human-readable reference (e.g. "LVS-7K3X9"). Generated server-side. */
  reference: string;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  items: OrderLineItem[];
  subtotalTND: number;
  shippingTND: number;
  totalTND: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  /** Locale of the visitor at checkout time — useful for follow-up messages. */
  locale: "en" | "fr" | "ar";
  /** ISO timestamp set on insert. */
  createdAt: string;
  /** ISO timestamp set on every update. */
  updatedAt: string;
}

/** Payload sent from the checkout form to POST /api/orders. */
export interface CreateOrderInput {
  customer: OrderCustomer;
  delivery: OrderDelivery;
  items: Array<Omit<OrderLineItem, "lineTotalTND">>;
  paymentMethod: PaymentMethod;
  locale: Order["locale"];
}

/** Response body from POST /api/orders. */
export interface CreateOrderResponse {
  ok: true;
  reference: string;
  orderId: string;
}

export interface CreateOrderError {
  ok: false;
  error: string;
}
