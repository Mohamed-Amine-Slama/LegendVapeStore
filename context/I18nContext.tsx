"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TRANSLATIONS, type Locale, type TranslationKey, LOCALES } from "@/lib/translations";

const STORAGE_KEY = "lvs.locale.v1";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Translate a dot-notation key. Falls back to the English value, then the
   *  raw key if no translation is found. */
  t: (key: TranslationKey) => string;
  dir: "ltr" | "rtl";
  /** True when no saved locale exists — used to gate the language picker
   *  modal that runs once on first visit. */
  needsPicker: boolean;
  /** Mark the picker as resolved (called after the user makes a choice or
   *  dismisses the modal). */
  resolvePicker: () => void;
  detectedLocale: Locale;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Detect the visitor's preferred locale.
 *
 * The user asked us to read the User-Agent. On the client there is no clean
 * read of the raw UA string for language; the modern browser-native signal
 * is `navigator.language` / `navigator.languages`, which is exactly what
 * browsers send in the `Accept-Language` header alongside the UA. We use
 * that signal here. The UA is also inspected in case some legacy browsers
 * encode locale hints there.
 */
export function detectLocaleFromBrowser(): Locale {
  if (typeof window === "undefined") return "en";

  // Highest priority: explicit lang sources.
  const candidates: string[] = [];
  if (navigator.languages?.length) candidates.push(...navigator.languages);
  if (navigator.language) candidates.push(navigator.language);
  // Some legacy IE shapes:
  // @ts-expect-error legacy
  if (navigator.userLanguage) candidates.push(navigator.userLanguage as string);
  // UA scan as a last-resort hint.
  if (navigator.userAgent) candidates.push(navigator.userAgent);

  for (const raw of candidates) {
    const lower = raw.toLowerCase();
    if (lower.startsWith("ar") || lower.includes("ar-")) return "ar";
    if (lower.startsWith("fr") || lower.includes("fr-")) return "fr";
    if (lower.startsWith("en") || lower.includes("en-")) return "en";
  }
  return "en";
}

export function I18nProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  /** Server-detected locale used as the SSR initial value. The client
   *  effect below may swap to a saved-or-redetected value after hydration. */
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [detectedLocale, setDetectedLocale] = useState<Locale>(initialLocale);
  const [needsPicker, setNeedsPicker] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // On mount: read saved locale or detect. SSR-safe — cannot touch
  // navigator/localStorage on the server, so initial render is "en" and
  // we sync the real locale once on the client.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const detected = detectLocaleFromBrowser();
    setDetectedLocale(detected);
    let saved: Locale | null = null;
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v && (LOCALES as readonly string[]).includes(v)) {
        saved = v as Locale;
      }
    } catch {
      // ignore
    }
    if (saved) {
      setLocaleState(saved);
    } else {
      // Pre-set to detected locale so the UI doesn't flash English while the
      // picker is up. The user will confirm or change via the modal.
      setLocaleState(detected);
      setNeedsPicker(true);
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Reflect locale on <html> so screen readers + CSS direction work.
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, hydrated]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const resolvePicker = useCallback(() => setNeedsPicker(false), []);

  const t = useCallback(
    (key: TranslationKey) => {
      const dict = TRANSLATIONS[locale] ?? TRANSLATIONS.en;
      return dict[key] ?? TRANSLATIONS.en[key] ?? key;
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      dir: locale === "ar" ? "rtl" : "ltr",
      needsPicker,
      resolvePicker,
      detectedLocale,
    }),
    [locale, setLocale, t, needsPicker, resolvePicker, detectedLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
