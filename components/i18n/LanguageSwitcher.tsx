"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/context/I18nContext";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/translations";
import { cn } from "@/lib/cn";

/**
 * Compact language switcher. Renders as a 36×36 chip in the navbar showing
 * the current locale code (EN / FR / AR). Tapping it opens a small portal
 * dropdown with the three options.
 */
export default function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;
    const place = () => {
      const r = btnRef.current!.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pickAndClose = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.changeLanguage")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-full border px-2.5 font-ui font-bold uppercase transition-colors",
          onDark
            ? "border-accent/50 text-bg-light hover:bg-accent hover:text-bg-light hover:border-accent"
            : "border-bg-dark/30 text-bg-dark hover:bg-bg-dark hover:text-bg-light hover:border-bg-dark",
        )}
        style={{ fontSize: 11, letterSpacing: "0.12em" }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <circle cx="8" cy="8" r="6.5" />
          <path d="M1.5 8 H14.5" />
          <path d="M8 1.5 C5 5 5 11 8 14.5" />
          <path d="M8 1.5 C11 5 11 11 8 14.5" />
        </svg>
        <span>{locale.toUpperCase()}</span>
      </button>

      {open && pos && typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            className="fixed z-[9500] min-w-[180px] overflow-hidden rounded-xl border border-bg-dark/10 bg-bg-light shadow-[0_12px_32px_rgba(26,26,26,0.18)]"
            style={{ top: pos.top, right: pos.right }}
          >
            {LOCALES.map((l) => {
              const meta = LOCALE_LABELS[l];
              const active = locale === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => pickAndClose(l)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors",
                    active ? "bg-accent/10" : "hover:bg-bg-dark/[0.04]",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span style={{ fontSize: 18 }} aria-hidden>{meta.flag}</span>
                    <span
                      className={cn(
                        "font-oswald font-semibold",
                        active ? "text-bg-dark" : "text-bg-dark/80",
                      )}
                      style={{ fontSize: 14 }}
                      dir={l === "ar" ? "rtl" : "ltr"}
                    >
                      {meta.native}
                    </span>
                  </span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#C8A96E" strokeWidth="2.4" aria-hidden>
                      <polyline points="3 9.5 7 13.5 15 5.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
}
