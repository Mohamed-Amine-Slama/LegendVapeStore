/**
 * WhatsApp deeplink builder.
 *
 * After an order is saved, the storefront opens a `https://wa.me/<owner>?text=...`
 * URL so the customer is dropped into a chat with the shop owner with the
 * delivery details prefilled. The owner's number is configured via
 * `NEXT_PUBLIC_OWNER_WHATSAPP` (E.164 without "+" — e.g. `21612345678`).
 *
 * Both client and server can import this — pure string building, no I/O.
 */

import type { CartItem } from "@/context/CartContext";
import type { Locale } from "@/lib/translations";
import type { OrderCustomer, OrderDelivery } from "@/types/order";

/** Reads the configured owner WhatsApp number, stripped to digits only. */
export function getOwnerWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? "";
  return raw.replace(/\D/g, "");
}

interface BuildArgs {
  reference: string;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  items: Array<Pick<CartItem, "name" | "qty" | "unitPriceTND">>;
  totalTND: number;
  locale: Locale;
}

const HEADINGS: Record<Locale, {
  title: string;
  ref: string;
  customer: string;
  phone: string;
  email: string;
  delivery: string;
  city: string;
  gov: string;
  postal: string;
  notes: string;
  items: string;
  total: string;
  payment: string;
  cod: string;
}> = {
  en: {
    title: "*New order — LEGEND VAPE STORE*",
    ref: "Reference",
    customer: "Customer",
    phone: "Phone",
    email: "Email",
    delivery: "Address",
    city: "City",
    gov: "Governorate",
    postal: "Postal code",
    notes: "Notes",
    items: "Items",
    total: "Total",
    payment: "Payment",
    cod: "Cash on delivery",
  },
  fr: {
    title: "*Nouvelle commande — LEGEND VAPE STORE*",
    ref: "Référence",
    customer: "Client",
    phone: "Téléphone",
    email: "E-mail",
    delivery: "Adresse",
    city: "Ville",
    gov: "Gouvernorat",
    postal: "Code postal",
    notes: "Notes",
    items: "Articles",
    total: "Total",
    payment: "Paiement",
    cod: "Paiement à la livraison",
  },
  ar: {
    title: "*طلب جديد — LEGEND VAPE STORE*",
    ref: "المرجع",
    customer: "العميل",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    delivery: "العنوان",
    city: "المدينة",
    gov: "الولاية",
    postal: "الرمز البريدي",
    notes: "ملاحظات",
    items: "المنتجات",
    total: "المجموع",
    payment: "الدفع",
    cod: "الدفع عند الاستلام",
  },
};

export function buildWhatsAppMessage({
  reference,
  customer,
  delivery,
  items,
  totalTND,
  locale,
}: BuildArgs): string {
  const h = HEADINGS[locale];
  const lines: string[] = [];
  lines.push(h.title);
  lines.push(`${h.ref}: *${reference}*`);
  lines.push("");
  lines.push(`${h.customer}: ${customer.fullName}`);
  lines.push(`${h.phone}: +${customer.phone}`);
  if (customer.email) lines.push(`${h.email}: ${customer.email}`);
  lines.push("");
  lines.push(`${h.delivery}: ${delivery.address}`);
  lines.push(`${h.city}: ${delivery.city}`);
  lines.push(`${h.gov}: ${delivery.governorate}`);
  if (delivery.postalCode) lines.push(`${h.postal}: ${delivery.postalCode}`);
  if (delivery.notes) lines.push(`${h.notes}: ${delivery.notes}`);
  lines.push("");
  lines.push(`${h.items}:`);
  for (const it of items) {
    const lineTotal = (it.unitPriceTND * it.qty).toFixed(0);
    lines.push(`• ${it.qty}× ${it.name} — ${lineTotal} TND`);
  }
  lines.push("");
  lines.push(`${h.total}: *${totalTND.toFixed(0)} TND*`);
  lines.push(`${h.payment}: ${h.cod}`);
  return lines.join("\n");
}

/** Returns a `https://wa.me/...` URL ready to open. Returns null when
 *  the owner number is not configured. */
export function buildWhatsAppUrl(args: BuildArgs): string | null {
  const number = getOwnerWhatsAppNumber();
  if (!number) return null;
  const text = buildWhatsAppMessage(args);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
