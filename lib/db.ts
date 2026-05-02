import "server-only";

import { MongoClient, type Db } from "mongodb";

/**
 * MongoDB connection helper for the storefront. Single shared connection,
 * cached across hot reloads in dev and across requests in prod.
 *
 * Returns `null` when env vars are missing — callers should fall back to
 * the in-repo mock catalogue so the site keeps working without a DB.
 *
 * Required env vars (`.env.local`, server-only):
 *   MONGODB_URI   the Atlas connection string
 *   MONGODB_DB    the database name (defaults to "legend-vape-store")
 */

const URI = process.env.MONGODB_URI ?? "";
const DB_NAME = process.env.MONGODB_DB ?? "legend-vape-store";

export const MONGO_ENABLED = Boolean(URI);

declare global {
  // Cache the client promise across module reloads in development to
  // avoid exhausting the connection pool every save.
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

function buildClientPromise(): Promise<MongoClient> {
  const client = new MongoClient(URI, {
    // Atlas free tier is fine with these defaults; tune later if needed.
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5_000,
  });
  return client.connect();
}

if (MONGO_ENABLED) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = buildClientPromise();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = buildClientPromise();
  }
}

/** Returns the shared `Db` handle, or `null` when MONGODB_URI is unset. */
export async function getDb(): Promise<Db | null> {
  if (!MONGO_ENABLED || !clientPromise) return null;
  const client = await clientPromise;
  return client.db(DB_NAME);
}

/** Standard collection names — keep aligned with the dashboard project. */
export const COLLECTIONS = {
  products: "products",
  categories: "categories",
  flavors: "flavors",
} as const;
