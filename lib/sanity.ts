import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Sanity is OPTIONAL — the site falls back to the mock catalogue in
 * `constants/shop.ts` when env vars are missing. This lets the project run
 * locally and on CI without a Sanity account.
 *
 * Required env vars (set in `.env.local`):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET   (defaults to "production")
 */

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const SANITY_API_VERSION = "2024-01-01";

/** True when env vars are configured. Used by `fetchProducts()` to decide
 *  whether to query Sanity or fall back to the mock catalogue. */
export const SANITY_ENABLED = Boolean(SANITY_PROJECT_ID);

/** Lazily-built singleton Sanity client. Returns `null` when not configured
 *  so callers don't have to handle missing env vars. */
let _client: SanityClient | null = null;
export function getSanityClient(): SanityClient | null {
  if (!SANITY_ENABLED) return null;
  if (_client) return _client;
  _client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: true, // public catalogue → cached responses are fine and fast
  });
  return _client;
}

/**
 * Build an image URL from a Sanity image reference (the object shape
 * Sanity returns from `mainImage` / `flavor.propImage` queries).
 *
 * Returns `null` when Sanity isn't configured or the source is missing.
 */
export function urlFor(source: SanityImageSource | undefined | null): {
  width: (w: number) => { height: (h: number) => { url: () => string }; url: () => string };
  url: () => string;
} | null {
  if (!source) return null;
  const client = getSanityClient();
  if (!client) return null;
  return imageUrlBuilder(client).image(source) as unknown as ReturnType<typeof urlFor>;
}
