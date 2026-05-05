import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout — LEGEND VAPE STORE",
  description: "Complete your order. Delivery across Tunisia.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
