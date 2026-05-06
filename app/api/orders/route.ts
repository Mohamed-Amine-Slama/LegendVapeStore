import { NextResponse } from "next/server";

import { createOrder } from "@/lib/orders";
import { notifyOwner } from "@/lib/telegram-server";
import type {
  CreateOrderError,
  CreateOrderInput,
  CreateOrderResponse,
} from "@/types/order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bad(status: number, error: string): NextResponse<CreateOrderError> {
  return NextResponse.json({ ok: false, error }, { status });
}

function isPositiveNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0;
}

function validate(input: unknown): CreateOrderInput | string {
  if (!input || typeof input !== "object") return "Invalid request body.";
  const i = input as Record<string, unknown>;

  const customer = i.customer as Record<string, unknown> | undefined;
  if (!customer) return "Missing customer.";
  const fullName = typeof customer.fullName === "string" ? customer.fullName.trim() : "";
  const phone = typeof customer.phone === "string" ? customer.phone.replace(/\D/g, "") : "";
  if (fullName.length < 2) return "Full name is required.";
  if (phone.length < 8) return "A valid phone number is required.";
  const email =
    typeof customer.email === "string" && customer.email.trim().length > 0
      ? customer.email.trim()
      : undefined;

  const delivery = i.delivery as Record<string, unknown> | undefined;
  if (!delivery) return "Missing delivery details.";
  const address = typeof delivery.address === "string" ? delivery.address.trim() : "";
  const city = typeof delivery.city === "string" ? delivery.city.trim() : "";
  const governorate =
    typeof delivery.governorate === "string" ? delivery.governorate.trim() : "";
  const postalCode =
    typeof delivery.postalCode === "string" && delivery.postalCode.trim().length > 0
      ? delivery.postalCode.trim()
      : undefined;
  const notes =
    typeof delivery.notes === "string" && delivery.notes.trim().length > 0
      ? delivery.notes.trim()
      : undefined;
  if (address.length < 4) return "Delivery address is required.";
  if (city.length < 2) return "City is required.";
  if (governorate.length < 2) return "Governorate is required.";

  const itemsRaw = i.items;
  if (!Array.isArray(itemsRaw) || itemsRaw.length === 0) {
    return "Cart is empty.";
  }
  const items = itemsRaw.map((raw, idx) => {
    if (!raw || typeof raw !== "object") {
      throw new Error(`Item ${idx} is not an object.`);
    }
    const r = raw as Record<string, unknown>;
    const productId = typeof r.productId === "string" ? r.productId : "";
    const name = typeof r.name === "string" ? r.name : "";
    const category = typeof r.category === "string" ? r.category : "";
    const imageSrc = typeof r.imageSrc === "string" ? r.imageSrc : "";
    const unitPriceTND = r.unitPriceTND;
    const listPriceTND = r.listPriceTND;
    const qty = r.qty;
    if (!productId || !name) throw new Error(`Item ${idx} is missing identifiers.`);
    if (!isPositiveNumber(unitPriceTND)) throw new Error(`Item ${idx} has invalid price.`);
    if (!isPositiveNumber(listPriceTND)) throw new Error(`Item ${idx} has invalid list price.`);
    if (typeof qty !== "number" || qty < 1) throw new Error(`Item ${idx} has invalid qty.`);
    return {
      productId,
      name,
      category: category as CreateOrderInput["items"][number]["category"],
      imageSrc,
      unitPriceTND,
      listPriceTND,
      qty: Math.floor(qty),
    };
  });

  const locale = i.locale === "fr" || i.locale === "ar" ? i.locale : "en";
  const paymentMethod = i.paymentMethod === "cod" ? "cod" : "cod";

  return {
    customer: { fullName, phone, email },
    delivery: { address, city, governorate, postalCode, notes },
    items,
    paymentMethod,
    locale,
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad(400, "Request body must be valid JSON.");
  }

  let input: CreateOrderInput;
  try {
    const result = validate(body);
    if (typeof result === "string") return bad(400, result);
    input = result;
  } catch (err) {
    return bad(400, err instanceof Error ? err.message : "Invalid items.");
  }

  try {
    const { reference, orderId } = await createOrder(input);

    // Push the order into the owner's Telegram chat. Awaited so the
    // dashboard can use `telegramSent` later, but failures never
    // bubble up — the order is already persisted and the customer
    // should still see success.
    const notify = await notifyOwner({
      reference,
      customer: input.customer,
      delivery: input.delivery,
      items: input.items.map((i) => ({
        name: i.name,
        qty: i.qty,
        unitPriceTND: i.unitPriceTND,
      })),
      totalTND: input.items.reduce((sum, i) => sum + i.unitPriceTND * i.qty, 0),
      locale: input.locale,
    });

    if (!notify.ok && process.env.NODE_ENV !== "production") {
      console.warn(
        `[orders] Telegram notification did not send for ${reference}:`,
        notify.detail ?? (notify.notConfigured ? "not configured" : "unknown"),
      );
    }

    const payload: CreateOrderResponse = {
      ok: true,
      reference,
      orderId,
      telegramSent: notify.ok,
    };
    return NextResponse.json(payload, { status: 201 });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[orders] insert failed:", err);
    }
    const message =
      err instanceof Error ? err.message : "Could not save the order.";
    return bad(500, message);
  }
}
