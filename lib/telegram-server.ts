import "server-only";

import type { CartItem } from "@/context/CartContext";
import type { Locale } from "@/lib/translations";
import type { OrderCustomer, OrderDelivery } from "@/types/order";

/**
 * Server-side Telegram bot notifier.
 *
 * After every successful order, the storefront posts to Telegram's Bot
 * API to push a message into the owner's chat with the bot. Reliable,
 * free, no rate limits at our scale.
 *
 * ── Owner setup (one-time, ~2 min) ───────────────────────────────────
 *   1. Open Telegram → search @BotFather → /newbot → pick a name and
 *      a username ending in "bot" (e.g. legend_vape_orders_bot).
 *      BotFather replies with a token like 1234567890:ABCdef...
 *      Paste it into TELEGRAM_BOT_TOKEN.
 *   2. Open YOUR new bot in Telegram and send /start (or any message).
 *   3. Visit /api/telegram-test in dev — it auto-discovers your
 *      chat_id from the bot's getUpdates and prints it. Paste that
 *      value into TELEGRAM_CHAT_ID, then restart the dev server.
 *   4. Hit /api/telegram-test again to confirm the bot can message you.
 *
 * The chat_id can be a personal user id (positive int), a group id
 * (negative int, prefix the bot to the group first), or an @channel
 * username (string starting with '@').
 */

interface NotifyArgs {
  reference: string;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  items: Array<Pick<CartItem, "name" | "qty" | "unitPriceTND">>;
  totalTND: number;
  locale: Locale;
}

export interface NotifyResult {
  ok: boolean;
  /** Telegram error description (`description` field) or fetch error. */
  detail?: string;
  /** True when env vars are missing — caller may want to log louder. */
  notConfigured?: boolean;
}

const TELEGRAM_API = "https://api.telegram.org";

function getBotToken(): string {
  return (process.env.TELEGRAM_BOT_TOKEN ?? "").trim();
}

function getChatId(): string {
  return (process.env.TELEGRAM_CHAT_ID ?? "").trim();
}

/* ── Message formatting ──────────────────────────────────────────── */

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
    title: "🛒 New order — LEGEND VAPE STORE",
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
    title: "🛒 Nouvelle commande — LEGEND VAPE STORE",
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
    title: "🛒 طلب جديد — LEGEND VAPE STORE",
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

/** Plain-text message — Telegram is happy with raw UTF-8, no markdown
 *  needed. We avoid parse_mode entirely to dodge the escape rules. */
export function buildOrderMessage({
  reference,
  customer,
  delivery,
  items,
  totalTND,
  locale,
}: NotifyArgs): string {
  const h = HEADINGS[locale];
  const lines: string[] = [];
  lines.push(h.title);
  lines.push(`${h.ref}: ${reference}`);
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
  lines.push(`${h.total}: ${totalTND.toFixed(0)} TND`);
  lines.push(`${h.payment}: ${h.cod}`);
  return lines.join("\n");
}

/* ── HTTP transport ──────────────────────────────────────────────── */

async function callBot<T = unknown>(
  token: string,
  method: string,
  body: Record<string, unknown>,
): Promise<{ ok: boolean; result?: T; detail?: string }> {
  const url = `${TELEGRAM_API}/bot${token}/${method}`;
  try {
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), 12_000);
    const res = await fetch(url, {
      method: "POST",
      signal: ac.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    clearTimeout(timeout);
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      result?: T;
      description?: string;
      error_code?: number;
    };
    if (!res.ok || !json.ok) {
      return {
        ok: false,
        detail: json.description
          ? `[${json.error_code ?? res.status}] ${json.description}`
          : `HTTP ${res.status}`,
      };
    }
    return { ok: true, result: json.result };
  } catch (err) {
    const detail =
      err instanceof Error
        ? err.name === "AbortError"
          ? "timeout"
          : err.message
        : "unknown";
    return { ok: false, detail };
  }
}

/* ── Public API ──────────────────────────────────────────────────── */

/** Sends the order notification to the owner's Telegram chat. Never
 *  throws — caller can ignore the result; the order is already saved. */
export async function notifyOwner(args: NotifyArgs): Promise<NotifyResult> {
  const token = getBotToken();
  const chatId = getChatId();

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is unset — " +
          "skipping owner notification.",
      );
    }
    return { ok: false, notConfigured: true };
  }

  const text = buildOrderMessage(args);
  const r = await callBot(token, "sendMessage", {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  });

  if (!r.ok && process.env.NODE_ENV !== "production") {
    console.warn("[telegram] send failed:", r.detail);
  } else if (r.ok && process.env.NODE_ENV !== "production") {
    console.log("[telegram] notification sent to chat", chatId);
  }
  return { ok: r.ok, detail: r.detail };
}

/* ── Diagnostic helpers ──────────────────────────────────────────── */

interface TgChat {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
}

interface TgUpdate {
  update_id: number;
  message?: { chat?: TgChat; text?: string };
  channel_post?: { chat?: TgChat };
}

interface DiscoveredChat {
  id: number;
  type: string;
  label: string;
  lastText?: string;
}

/** Pulls recent updates from the bot and extracts every distinct chat
 *  it has heard from. Used by the diagnostic endpoint to help the
 *  owner find their `chat_id` without leaving the browser. */
export async function discoverChats(): Promise<{
  ok: boolean;
  chats: DiscoveredChat[];
  detail?: string;
  hint?: string;
}> {
  const token = getBotToken();
  if (!token) {
    return {
      ok: false,
      chats: [],
      detail: "TELEGRAM_BOT_TOKEN not set",
      hint: "Create a bot via @BotFather and paste the token into TELEGRAM_BOT_TOKEN, then restart the dev server.",
    };
  }
  const r = await callBot<TgUpdate[]>(token, "getUpdates", { timeout: 0, limit: 50 });
  if (!r.ok) {
    return { ok: false, chats: [], detail: r.detail };
  }
  const updates = r.result ?? [];
  const seen = new Map<number, DiscoveredChat>();
  for (const u of updates) {
    const chat = u.message?.chat ?? u.channel_post?.chat;
    if (!chat) continue;
    if (seen.has(chat.id)) continue;
    const label =
      chat.title ??
      chat.username ??
      chat.first_name ??
      `${chat.type} chat`;
    seen.set(chat.id, {
      id: chat.id,
      type: chat.type,
      label,
      lastText: u.message?.text,
    });
  }
  const chats = Array.from(seen.values());
  return {
    ok: true,
    chats,
    hint: chats.length === 0
      ? "No chats found. Open your bot in Telegram and send /start (or any message), then refresh this endpoint."
      : "Pick the chat you want notifications in and paste its `id` into TELEGRAM_CHAT_ID, then restart the dev server.",
  };
}

/** Sends a one-line ping to the configured chat. */
export async function pingDiagnostic(): Promise<{
  ok: boolean;
  chatId: string | null;
  detail?: string;
}> {
  const token = getBotToken();
  const chatId = getChatId();
  if (!token || !chatId) {
    return { ok: false, chatId: chatId || null, detail: "missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID" };
  }
  const r = await callBot(token, "sendMessage", {
    chat_id: chatId,
    text: "LEGEND VAPE STORE — diagnostic ping ✅",
    disable_web_page_preview: true,
  });
  return { ok: r.ok, chatId, detail: r.detail };
}
