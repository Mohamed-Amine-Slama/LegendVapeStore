/**
 * Raw response shapes returned by the GROQ queries in `lib/queries.ts`.
 * These are the *Sanity* shape — DIFFERENT from the app's `ShopProduct`
 * shape used by ShopPage / FilterSidebar etc. The mapper in
 * `lib/products.ts` translates between the two.
 */

import type { SanityImageSource } from "@sanity/image-url";

/** Sanity image fields are returned as one of the shapes covered by
 *  SanityImageSource (asset reference object, expanded asset, etc.). We
 *  alias for clarity at call sites. */
export type SanityImage = SanityImageSource;

export type SanityCategoryTitle = "PODS" | "PUFFS" | "CAPSULES" | "LIQUID";

export type SanityFlavorFamily =
  | "fruity"
  | "minty"
  | "creamy"
  | "tobacco"
  | "sweet"
  | "icy";

export type SanityBrand = "original" | "max" | "pro" | "lite";

export type SanityVolume = "1ml" | "2ml" | "4ml" | "10ml" | "30ml";

export interface SanityCategoryRef {
  title: SanityCategoryTitle;
  slug?: string;
}

export interface SanityFlavorRef {
  name: string;
  family: SanityFlavorFamily;
  color: string; // hex
  propImage?: SanityImage;
}

export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  badge?: "" | "NEW" | "HOT" | "MAX";
  featured?: boolean;
  inStock?: boolean;
  nicotineStrength: 0 | 10 | 20 | 50;
  caffeinated?: boolean;
  volume?: SanityVolume;
  puffCount?: number;
  brand: SanityBrand;
  shortDescription?: string;
  cardBackground?: string;
  publishedAt?: string;
  mainImage: SanityImage;
  category: SanityCategoryRef;
  flavor: SanityFlavorRef;
}
