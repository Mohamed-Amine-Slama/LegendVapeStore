import "server-only";

import { COLLECTIONS, MONGO_ENABLED, getDb } from "@/lib/db";
import type { ShopProduct } from "@/types/shop";
import type { MongoProduct } from "@/types/mongo";

/**
 * Server-only product fetcher. Returns the live MongoDB catalogue —
 * sourced from the dashboard project. There is NO mock fallback: an
 * empty array is returned if MongoDB isn't configured or the query
 * fails, so the storefront's empty-state UI handles missing data.
 *
 * Edit products at the dashboard (`legend-vape-store-dashboard`,
 * port 3001) — they appear here on next page render.
 */
export async function fetchProducts(): Promise<ShopProduct[]> {
  if (!MONGO_ENABLED) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        "[products] MONGODB_URI is not set — /shop will render empty. " +
          "See vape-store-vitrine/.env.local.example.",
      );
    }
    return [];
  }

  try {
    const db = await getDb();
    if (!db) return [];

    const docs = await db
      .collection<MongoProduct>(COLLECTIONS.products)
      .find({})
      .sort({ featuredOrder: 1, releaseOrder: -1 })
      .toArray();

    return docs.map(mapMongoToShopProduct);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[products] Mongo fetch failed:", err);
    }
    return [];
  }
}

/* ─── Mapper: MongoProduct → ShopProduct ───────────────────────────────── */

const FALLBACK_IMAGE = "/products/device-refill.png";

export function mapMongoToShopProduct(p: MongoProduct): ShopProduct {
  // Only honor promo when both flag and price are set AND price is a real discount.
  const promoActive =
    p.onPromo === true &&
    typeof p.promoPriceTND === "number" &&
    p.promoPriceTND >= 0 &&
    p.promoPriceTND < p.priceTND;

  return {
    id: typeof p._id === "string" ? p._id : String(p._id),
    name: p.name,
    category: p.category,
    description: p.description,
    priceTND: p.priceTND,
    nicotineMg: p.nicotineMg,
    mlSize: p.mlSize,
    puffCount: p.puffCount,
    caffeinated: p.caffeinated,
    brand: p.brand,
    flavorFamily: p.flavorFamily,
    flavorColor: p.flavorColor,
    imageSrc: p.imageUrl || FALLBACK_IMAGE,
    propSrc: p.propImageUrl,
    flavors: p.flavors,
    badge: p.badge,
    releaseOrder: p.releaseOrder ?? 0,
    featuredOrder: p.featuredOrder ?? 100,
    inStock: p.inStock !== false,
    onPromo: promoActive,
    promoPriceTND: promoActive ? p.promoPriceTND : undefined,
  };
}
