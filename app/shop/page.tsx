import type { Metadata } from "next";
import { fetchProducts } from "@/lib/products";
import ShopPage from "@/sections/shop/ShopPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop · LEGEND VAPE STORE",
  description: "Pods, puffs, capsules, liquid — engineered for the discerning palate.",
};

/**
 * /shop is a server component. It fetches the product catalogue from
 * Sanity (with fallback to the in-repo mock when env vars are missing),
 * then hands it to the client `<ShopPage />` which owns filtering state.
 */
export default async function Page() {
  const products = await fetchProducts();
  return <ShopPage products={products} />;
}
