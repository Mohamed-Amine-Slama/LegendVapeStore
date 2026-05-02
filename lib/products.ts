import "server-only";

import { getSanityClient, SANITY_ENABLED, urlFor } from "@/lib/sanity";
import { ALL_PRODUCTS_QUERY } from "@/lib/queries";
import type {
  SanityBrand,
  SanityFlavorFamily,
  SanityProduct,
  SanityVolume,
} from "@/lib/sanity-types";
import type {
  Brand,
  FlavorFamily,
  NicotineMg,
  ShopProduct,
  Volume,
} from "@/types/shop";
import { SHOP_PRODUCTS } from "@/constants/shop";

/**
 * The single product fetcher used by the shop page. Strategy:
 *  1. If Sanity is configured AND the dataset has products → return the
 *     mapped Sanity products.
 *  2. Otherwise (no env vars, network error, empty dataset) → fall back to
 *     the in-repo mock catalogue so the site keeps working.
 *
 * This file is server-only — `next-sanity` makes a real HTTP request and
 * we don't want to bundle the client into the browser.
 */
export async function fetchProducts(): Promise<ShopProduct[]> {
  const client = getSanityClient();
  if (!SANITY_ENABLED || !client) return SHOP_PRODUCTS;

  try {
    const sanityProducts = await client.fetch<SanityProduct[]>(ALL_PRODUCTS_QUERY);
    if (!sanityProducts?.length) return SHOP_PRODUCTS;
    return sanityProducts.map(mapSanityToShopProduct);
  } catch (err) {
    // Don't block rendering on a Sanity outage — fall back silently.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[products] Sanity fetch failed, falling back to mock:", err);
    }
    return SHOP_PRODUCTS;
  }
}

/* ─── Mapper: SanityProduct → ShopProduct ──────────────────────────────── */

const BRAND_MAP: Record<SanityBrand, Brand> = {
  original: "LEGEND VAPE STORE Original",
  max: "LEGEND VAPE STORE MAX",
  pro: "LEGEND VAPE STORE PRO",
  lite: "LEGEND VAPE STORE LITE",
};

const FLAVOR_FAMILY_MAP: Record<SanityFlavorFamily, FlavorFamily> = {
  fruity: "Fruity",
  minty: "Minty",
  creamy: "Creamy",
  tobacco: "Tobacco",
  sweet: "Sweet",
  icy: "Icy",
};

/** "2ml" → 2, "30ml" → 30. Returns undefined when input is missing. */
function parseVolume(v: SanityVolume | undefined): Volume | undefined {
  if (!v) return undefined;
  const n = Number(v.replace("ml", ""));
  return ([1, 2, 4, 10, 30] as const).find((x) => x === n) as Volume | undefined;
}

/** Convert a Sanity image into a 600×900 URL via the image pipeline.
 *  Returns the same product placeholder used by the mock catalogue when
 *  the image isn't available. */
function imageSrc(image: SanityProduct["mainImage"], fallback: string): string {
  const builder = urlFor(image);
  if (!builder) return fallback;
  return builder.width(600).url();
}

function propImageSrc(image: SanityProduct["flavor"]["propImage"]): string | undefined {
  if (!image) return undefined;
  const builder = urlFor(image);
  return builder?.width(160).url() ?? undefined;
}

export function mapSanityToShopProduct(p: SanityProduct): ShopProduct {
  const releaseOrder = p.publishedAt
    ? Math.floor(new Date(p.publishedAt).getTime() / 1000)
    : 0;
  const featuredOrder = p.featured ? 0 : 100;

  return {
    id: p._id,
    name: p.name,
    category: p.category.title,
    description: p.shortDescription ?? "",
    priceTND: p.price,
    nicotineMg: p.nicotineStrength as NicotineMg,
    mlSize: parseVolume(p.volume),
    puffCount: p.puffCount,
    caffeinated: p.caffeinated ?? false,
    brand: BRAND_MAP[p.brand],
    flavorFamily: FLAVOR_FAMILY_MAP[p.flavor.family],
    flavorColor: p.flavor.color,
    imageSrc: imageSrc(p.mainImage, "/products/device-refill.png"),
    propSrc: propImageSrc(p.flavor.propImage),
    // The schema includes "" as a valid (no-badge) value; treat it as undefined.
    badge: p.badge ? (p.badge as ShopProduct["badge"]) : undefined,
    releaseOrder,
    featuredOrder,
  };
}
