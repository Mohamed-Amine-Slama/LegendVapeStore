import "server-only";

import { ObjectId } from "mongodb";

import { COLLECTIONS, getDb } from "@/lib/db";
import type {
  CreateOrderInput,
  Order,
  OrderLineItem,
} from "@/types/order";

/**
 * Server-only orders helpers.
 *
 * Writes go through `createOrder()` (called from /api/orders). The
 * storefront does NOT read orders back; the dashboard owns that.
 */

const ORDER_REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No 0/O/1/I/L
const ORDERS_COLLECTION = "orders" as const;

/** Generate a short order reference like "LVS-7K3X9". 5 chars from a
 *  Crockford-ish alphabet — collision odds are negligible at this scale. */
function generateOrderReference(): string {
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += ORDER_REF_ALPHABET[Math.floor(Math.random() * ORDER_REF_ALPHABET.length)];
  }
  return `LVS-${suffix}`;
}

/** Free Tunisia-wide flat shipping. Adjust here when policy changes. */
const SHIPPING_FLAT_TND = 0;

export async function createOrder(input: CreateOrderInput): Promise<{
  reference: string;
  orderId: string;
}> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not configured. Set MONGODB_URI in .env.local.");
  }

  const items: OrderLineItem[] = input.items.map((i) => ({
    ...i,
    lineTotalTND: Math.round(i.unitPriceTND * i.qty * 100) / 100,
  }));

  const subtotalTND = Math.round(
    items.reduce((sum, i) => sum + i.lineTotalTND, 0) * 100,
  ) / 100;

  const reference = generateOrderReference();
  const now = new Date().toISOString();

  const doc: Omit<Order, "_id"> = {
    reference,
    customer: input.customer,
    delivery: input.delivery,
    items,
    subtotalTND,
    shippingTND: SHIPPING_FLAT_TND,
    totalTND: subtotalTND + SHIPPING_FLAT_TND,
    paymentMethod: input.paymentMethod,
    status: "pending",
    locale: input.locale,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db
    .collection<Omit<Order, "_id"> & { _id?: ObjectId }>(ORDERS_COLLECTION)
    .insertOne(doc);

  return { reference, orderId: result.insertedId.toString() };
}

/** Exposed so the dashboard project (or admin tooling) can reuse the
 *  same constant without drift. */
export const ORDER_COLLECTION_NAME = ORDERS_COLLECTION;

// Re-export so callers don't need a second import for the products collection.
export { COLLECTIONS };
