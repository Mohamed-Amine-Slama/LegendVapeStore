/**
 * MongoDB document shapes for the products / categories / flavors
 * collections. Mirrors the schema defined in the dashboard project at
 * `legend-vape-store-dashboard/lib/types.ts` — keep them in sync.
 *
 * The `_id` on each doc is a Mongo `ObjectId`; we stringify it before
 * exposing to the frontend (see `lib/products.ts → mapMongoToShopProduct`).
 */

import type {
  Brand,
  FlavorFamily,
  NicotineMg,
  ProductBadge,
  ShopCategory,
  Volume,
} from "@/types/shop";

/** Shape stored in the `products` collection. */
export interface MongoProduct {
  _id?: string; // ObjectId, stringified at the API boundary
  name: string;
  category: ShopCategory;
  description: string;
  priceTND: number;
  nicotineMg: NicotineMg;
  mlSize?: Volume;
  puffCount?: number;
  caffeinated: boolean;
  brand: Brand;
  flavorFamily: FlavorFamily;
  flavorColor: string; // hex
  imageUrl?: string;     // remote URL or "/products/foo.png" local path
  propImageUrl?: string;
  badge?: ProductBadge;
  releaseOrder: number;  // higher = newer
  featuredOrder: number; // lower = featured first
  inStock: boolean;
  /** ISO timestamps, set by the dashboard on insert / update */
  createdAt?: string;
  updatedAt?: string;
}

/** Shape stored in the `categories` collection. */
export interface MongoCategory {
  _id?: string;
  title: ShopCategory;
  slug: string;
  description?: string;
}

/** Shape stored in the `flavors` collection. */
export interface MongoFlavor {
  _id?: string;
  name: string;
  family: FlavorFamily;
  color: string;        // hex
  propImageUrl?: string;
}
