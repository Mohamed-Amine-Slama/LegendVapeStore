"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { TUNISIA_GOVERNORATES } from "@/constants/checkout";
import type { CreateOrderInput, CreateOrderResponse, CreateOrderError } from "@/types/order";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; reference: string };

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  governorate: string;
  postalCode: string;
  notes: string;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  governorate: "",
  postalCode: "",
  notes: "",
};

/** Strip non-digits, drop a leading 00, drop a single leading +.
 *  Tunisian numbers are typed as "12 345 678" or "+216 12 345 678" — we
 *  normalize to E.164 digits-only so wa.me works in both shapes. */
function normalizePhone(raw: string): string {
  const trimmed = raw.trim().replace(/^\+/, "").replace(/^00/, "");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 8 && /^[2-9]/.test(digits)) {
    // Bare 8-digit local number — assume Tunisia.
    return `216${digits}`;
  }
  return digits;
}

export default function CheckoutForm() {
  const { items, totalTND, count, clearCart } = useCart();
  const { t, locale } = useI18n();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const subtotal = totalTND;
  const shipping = 0;
  const total = subtotal + shipping;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    if (items.length === 0) return;

    const phone = normalizePhone(form.phone);
    const payload: CreateOrderInput = {
      customer: {
        fullName: form.fullName.trim(),
        phone,
        email: form.email.trim() || undefined,
      },
      delivery: {
        address: form.address.trim(),
        city: form.city.trim(),
        governorate: form.governorate.trim(),
        postalCode: form.postalCode.trim() || undefined,
        notes: form.notes.trim() || undefined,
      },
      items: items.map((i) => ({
        productId: i.id,
        name: i.name,
        category: i.category,
        imageSrc: i.imageSrc,
        unitPriceTND: i.unitPriceTND,
        listPriceTND: i.listPriceTND,
        qty: i.qty,
      })),
      paymentMethod: "cod",
      locale,
    };

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as CreateOrderResponse | CreateOrderError;
      if (!res.ok || !json.ok) {
        const message = !json.ok ? json.error : t("checkout.errorRetry");
        setStatus({ kind: "error", message });
        return;
      }

      // Backend already pushed the order into the owner's Telegram via
      // /api/orders → notifyOwner(). Customer-side, we just confirm
      // the order was saved.
      clearCart();
      setStatus({ kind: "success", reference: json.reference });
    } catch (err) {
      const message = err instanceof Error ? err.message : t("checkout.errorRetry");
      setStatus({ kind: "error", message });
    }
  }

  /* ── Empty cart state ──────────────────────────────────────────── */
  if (count === 0 && status.kind !== "success") {
    return (
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-bg-dark/10 bg-bg-light p-10 text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-bg-dark/5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-bg-dark/60">
            <path d="M5 7 h14 l-1.5 12 h-11 z" />
            <path d="M8.5 7 V4.5 a3.5 3.5 0 0 1 7 0 V7" />
          </svg>
        </div>
        <h2 className="font-display text-bg-dark" style={{ fontSize: 28, letterSpacing: "0.04em" }}>
          {t("checkout.emptyTitle")}
        </h2>
        <p className="mt-2 font-serif italic text-bg-dark/65" style={{ fontSize: 15 }}>
          {t("checkout.emptyDesc")}
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-ui font-semibold uppercase text-bg-dark transition-transform hover:scale-[1.03]"
          style={{ fontSize: 12, letterSpacing: "0.18em" }}
        >
          {t("checkout.backToShop")}
        </Link>
      </div>
    );
  }

  /* ── Success state ─────────────────────────────────────────────── */
  if (status.kind === "success") {
    return (
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-accent/30 bg-bg-light p-10 text-center shadow-[0_24px_60px_rgba(26,26,26,0.08)]">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13 l4 4 L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-bg-dark" style={{ fontSize: 32, letterSpacing: "0.04em" }}>
          {t("checkout.successTitle")}
        </h2>
        <p className="mt-3 font-serif italic text-bg-dark/70" style={{ fontSize: 15 }}>
          {t("checkout.successDesc")}
        </p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-bg-dark/5 px-4 py-2 font-ui font-semibold uppercase tracking-[0.18em] text-bg-dark/75" style={{ fontSize: 11 }}>
          <span className="text-bg-dark/50">{t("checkout.reference")}</span>
          <span className="font-oswald text-bg-dark" style={{ letterSpacing: "0.06em" }}>
            {status.reference}
          </span>
        </p>
        <div className="mt-7 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-ui font-semibold uppercase text-bg-dark transition-transform hover:scale-[1.03]"
            style={{ fontSize: 12, letterSpacing: "0.18em" }}
          >
            {t("checkout.continue")} →
          </Link>
        </div>
      </div>
    );
  }

  /* ── Form ──────────────────────────────────────────────────────── */
  const isSubmitting = status.kind === "submitting";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(320px,400px)]">
      {/* LEFT: form fields */}
      <div className="space-y-7">
        {/* Contact */}
        <fieldset className="rounded-3xl border border-bg-dark/10 bg-bg-light/60 p-6 sm:p-7">
          <legend className="px-2 font-ui font-semibold uppercase text-bg-dark/55" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
            {t("checkout.contact")}
          </legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t("checkout.fullName")} required>
              <input
                type="text"
                required
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </Field>
            <Field
              label={t("checkout.phone")}
              required
              hint={t("checkout.phoneHint")}
            >
              <input
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="+216 12 345 678"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </Field>
            <Field label={t("checkout.email")} className="sm:col-span-2">
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </Field>
          </div>
        </fieldset>

        {/* Delivery */}
        <fieldset className="rounded-3xl border border-bg-dark/10 bg-bg-light/60 p-6 sm:p-7">
          <legend className="px-2 font-ui font-semibold uppercase text-bg-dark/55" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
            {t("checkout.delivery")}
          </legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t("checkout.address")} required className="sm:col-span-2">
              <input
                type="text"
                required
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </Field>
            <Field label={t("checkout.city")} required>
              <input
                type="text"
                required
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </Field>
            <Field label={t("checkout.governorate")} required>
              <select
                required
                value={form.governorate}
                onChange={(e) => update("governorate", e.target.value)}
                className={cn(inputClass, "appearance-none bg-[length:14px] bg-[right_14px_center] bg-no-repeat pr-10")}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%231A1A1A' stroke-width='1.6'><path d='M1 1l5 5 5-5'/></svg>\")",
                }}
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  {t("checkout.governoratePlaceholder")}
                </option>
                {TUNISIA_GOVERNORATES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("checkout.postalCode")}>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={form.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </Field>
            <Field label={t("checkout.notes")} className="sm:col-span-2">
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={cn(inputClass, "resize-none")}
                disabled={isSubmitting}
              />
            </Field>
          </div>
        </fieldset>

        {/* Payment */}
        <fieldset className="rounded-3xl border border-bg-dark/10 bg-bg-light/60 p-6 sm:p-7">
          <legend className="px-2 font-ui font-semibold uppercase text-bg-dark/55" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
            {t("checkout.payment")}
          </legend>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-accent bg-accent/8 p-4">
            <input
              type="radio"
              name="payment"
              checked
              readOnly
              className="mt-1 h-4 w-4 accent-accent"
            />
            <span className="flex flex-col">
              <span className="font-oswald font-semibold uppercase text-bg-dark" style={{ fontSize: 14, letterSpacing: "0.04em" }}>
                {t("checkout.cod")}
              </span>
              <span className="mt-0.5 font-ui text-bg-dark/70" style={{ fontSize: 12 }}>
                {t("checkout.codDesc")}
              </span>
            </span>
          </label>
        </fieldset>

        {status.kind === "error" && (
          <div className="rounded-2xl border border-accent-red/40 bg-accent-red/10 px-5 py-4 text-bg-dark">
            <p className="font-oswald font-semibold uppercase" style={{ fontSize: 12, letterSpacing: "0.12em" }}>
              {t("checkout.errorTitle")}
            </p>
            <p className="mt-1 font-ui" style={{ fontSize: 13 }}>
              {status.message || t("checkout.errorRetry")}
            </p>
          </div>
        )}
      </div>

      {/* RIGHT: order summary */}
      <aside className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="rounded-3xl border border-bg-dark/10 bg-bg-light p-6 shadow-[0_18px_50px_rgba(26,26,26,0.05)]">
          <h2 className="font-display text-bg-dark" style={{ fontSize: 22, letterSpacing: "0.04em" }}>
            {t("checkout.summary")}
          </h2>

          <ul className="mt-5 space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-bg-dark/5">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                  <span className="absolute right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-bg-dark px-1.5 font-ui font-bold text-bg-light" style={{ fontSize: 10 }}>
                    {item.qty}
                  </span>
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="font-oswald font-semibold leading-tight text-bg-dark" style={{ fontSize: 13 }}>
                    {item.name}
                  </span>
                  <span className="mt-0.5 font-ui uppercase text-bg-dark/50" style={{ fontSize: 9, letterSpacing: "0.14em" }}>
                    {item.category}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 self-start">
                  <span className="font-oswald font-bold text-bg-dark" style={{ fontSize: 14 }}>
                    {(item.unitPriceTND * item.qty).toFixed(0)}
                  </span>
                  <span className="font-ui text-bg-dark/45" style={{ fontSize: 9 }}>TND</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-bg-dark/10 pt-4 font-ui" style={{ fontSize: 13 }}>
            <Row label={t("cart.subtotal")} value={`${subtotal.toFixed(0)} TND`} />
            <Row label={t("checkout.shipping")} value={t("checkout.shippingFree")} muted />
          </div>
          <div className="mt-3 flex items-baseline justify-between border-t border-bg-dark/10 pt-3">
            <span className="font-ui font-semibold uppercase text-bg-dark" style={{ fontSize: 12, letterSpacing: "0.16em" }}>
              {t("checkout.total")}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-oswald font-bold text-bg-dark" style={{ fontSize: 26 }}>
                {total.toFixed(0)}
              </span>
              <span className="font-ui font-medium text-bg-dark/55" style={{ fontSize: 12 }}>
                TND
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className={cn(
              "mt-6 block w-full rounded-full bg-accent py-3.5 font-ui font-semibold uppercase text-bg-dark transition-transform",
              "hover:scale-[1.02] active:scale-[0.99]",
              "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100",
            )}
            style={{ fontSize: 12, letterSpacing: "0.2em" }}
          >
            {isSubmitting ? t("checkout.placing") : t("checkout.placeOrder")}
          </button>
        </div>
      </aside>
    </form>
  );
}

/* ── Local UI helpers ────────────────────────────────────────────── */

const inputClass =
  "w-full rounded-xl border border-bg-dark/15 bg-bg-light px-4 py-2.5 font-ui text-bg-dark placeholder:text-bg-dark/35 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60";

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-center gap-1 font-ui font-medium uppercase text-bg-dark/65" style={{ fontSize: 10.5, letterSpacing: "0.18em" }}>
        {label}
        {required && <span className="text-accent-red">*</span>}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block font-ui text-bg-dark/50" style={{ fontSize: 11 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-bg-dark/65">{label}</span>
      <span className={cn(muted ? "text-accent" : "text-bg-dark", "font-semibold")}>{value}</span>
    </div>
  );
}
