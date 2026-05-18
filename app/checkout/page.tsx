import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout — La Maison Des Vapes",
  description: "Complete your order. Delivery across Tunisia.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
