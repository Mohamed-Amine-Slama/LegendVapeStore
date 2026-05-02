import type { Metadata } from "next";
import ShopPage from "@/sections/shop/ShopPage";

export const metadata: Metadata = {
  title: "Shop · LEGEND VAPE STORE",
  description: "Pods, puffs, capsules, liquid — engineered for the discerning palate.",
};

export default function Page() {
  return <ShopPage />;
}
