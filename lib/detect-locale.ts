import { headers } from "next/headers";
import { LOCALES, type Locale } from "@/lib/translations";

/**
 * Server-side locale detection.
 *
 * Reads the request's `Accept-Language` and `User-Agent` headers (Next.js's
 * `headers()` helper). The first matching supported locale wins. If nothing
 * matches, defaults to `en`.
 *
 * The result is consumed by the root layout to set `<html lang>` correctly
 * on first paint and by `I18nProvider` as the initial locale, which avoids a
 * hydration flash from English to the user's actual language.
 */
export async function detectServerLocale(): Promise<Locale> {
  const h = await headers();
  const candidates: string[] = [];

  const accept = h.get("accept-language");
  if (accept) candidates.push(accept);

  const ua = h.get("user-agent");
  if (ua) candidates.push(ua);

  for (const raw of candidates) {
    const lower = raw.toLowerCase();
    if (lower.startsWith("ar") || lower.includes("ar-") || /[؀-ۿ]/.test(raw)) {
      return "ar";
    }
    if (lower.startsWith("fr") || lower.includes("fr-")) return "fr";
    if (lower.startsWith("en") || lower.includes("en-")) return "en";
    // Accept-Language can also be "ar-TN,ar;q=0.9,en;q=0.7" etc — scan parts.
    for (const part of lower.split(/[,;]/)) {
      const tag = part.trim();
      if (!tag) continue;
      if (tag.startsWith("ar")) return "ar";
      if (tag.startsWith("fr")) return "fr";
      if (tag.startsWith("en")) return "en";
    }
  }

  return "en";
}

export { LOCALES };
