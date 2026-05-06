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

/** Auto-delete orders after this many days. MongoDB's TTL monitor runs
 *  every ~60s and removes any order whose `expiresAt` is in the past. */
export const ORDER_TTL_DAYS = 395;
const ORDER_TTL_MS = ORDER_TTL_DAYS * 24 * 60 * 60 * 1000;
const TTL_INDEX_NAME = "orders_ttl_expiresAt";

let indexesEnsured = false;

/** Idempotent: creates the TTL index and backfills `expiresAt` on any
 *  pre-existing order missing it. Subsequent calls in the same process
 *  are no-ops thanks to the module-level cache flag, and Mongo's
 *  createIndex / updateMany are themselves idempotent so multi-process
 *  deployments are safe. */
async function ensureOrdersIndexes(): Promise<void> {
  if (indexesEnsured) return;
  const db = await getDb();
  if (!db) return;

  const orders = db.collection(ORDERS_COLLECTION);

  // TTL index: expireAfterSeconds=0 means "delete when current time > expiresAt".
  await orders.createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: TTL_INDEX_NAME, background: true },
  );

  // Backfill: legacy orders predate the TTL field. Set expiresAt =
  // createdAt + TTL so they also age out cleanly. Only matches docs
  // missing the field, so it's a no-op on subsequent runs.
  await orders.updateMany(
    { expiresAt: { $exists: false } },
    [
      {
        $set: {
          expiresAt: {
            $dateAdd: {
              startDate: {
                $cond: [
                  { $eq: [{ $type: "$createdAt" }, "string"] },
                  { $dateFromString: { dateString: "$createdAt" } },
                  "$createdAt",
                ],
              },
              unit: "day",
              amount: ORDER_TTL_DAYS,
            },
          },
        },
      },
    ],
  );

  indexesEnsured = true;
}

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

  // First write of the process triggers the index + backfill. Cheap on
  // every subsequent call.
  await ensureOrdersIndexes();

  const items: OrderLineItem[] = input.items.map((i) => ({
    ...i,
    lineTotalTND: Math.round(i.unitPriceTND * i.qty * 100) / 100,
  }));

  const subtotalTND = Math.round(
    items.reduce((sum, i) => sum + i.lineTotalTND, 0) * 100,
  ) / 100;

  const reference = generateOrderReference();
  const nowDate = new Date();
  const now = nowDate.toISOString();
  const expiresAt = new Date(nowDate.getTime() + ORDER_TTL_MS);

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
    expiresAt,
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
