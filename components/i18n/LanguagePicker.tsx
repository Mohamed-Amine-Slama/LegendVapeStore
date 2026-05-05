"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/translations";
import { cn } from "@/lib/cn";

/**
 * First-visit language picker.
 *
 * Renders a centered modal once on first load. The user's browser language
 * (read via navigator.language / userAgent) seeds the default selection.
 * Once the user confirms or dismisses, the choice is persisted and the
 * modal does not appear again.
 */
export default function LanguagePicker() {
  const { needsPicker, resolvePicker, setLocale, detectedLocale, locale } = useI18n();
  const [pick, setPick] = useState<Locale>(locale);

  // Sync internal selection when picker opens / detected updates.
  useEffect(() => {
    if (needsPicker) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPick(detectedLocale);
    }
  }, [needsPicker, detectedLocale]);

  if (!needsPicker) return null;

  const confirm = () => {
    setLocale(pick);
    resolvePicker();
  };

  const dismiss = () => {
    // No save — fall through with the current (detected) locale.
    setLocale(detectedLocale);
    resolvePicker();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-picker-title"
      className="fixed inset-0 z-[9700] flex items-center justify-center px-4"
    >
      <div
        aria-hidden
        onClick={dismiss}
        className="absolute inset-0 bg-bg-dark/65 backdrop-blur-sm"
      />

      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-bg-light shadow-[0_24px_60px_rgba(26,26,26,0.32)]"
        style={{ animation: "lvs-pop 0.32s cubic-bezier(0.2, 0.9, 0.3, 1.2)" }}
      >
        {/* Header strip */}
        <div className="bg-accent px-6 py-5 text-bg-light">
          <h2
            id="lang-picker-title"
            className="font-display"
            style={{ fontSize: 26, letterSpacing: "0.04em" }}
          >
            🌐 Language / Langue / اللغة
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="font-serif italic text-bg-dark/70" style={{ fontSize: 14, lineHeight: 1.5 }}>
            We detected{" "}
            <span className="font-ui font-bold not-italic text-bg-dark">
              {LOCALE_LABELS[detectedLocale].native}
            </span>{" "}
            from your browser. Confirm or pick another.
          </p>

          <div className="mt-5 flex flex-col gap-2">
            {LOCALES.map((l) => {
              const meta = LOCALE_LABELS[l];
              const isPicked = pick === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setPick(l)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200",
                    isPicked
                      ? "border-accent bg-accent/10"
                      : "border-bg-dark/12 hover:border-bg-dark/30",
                  )}
                  aria-pressed={isPicked}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 22 }} aria-hidden>
                      {meta.flag}
                    </span>
                    <div>
                      <div
                        className="font-oswald font-semibold text-bg-dark"
                        style={{ fontSize: 16 }}
                        dir={l === "ar" ? "rtl" : "ltr"}
                      >
                        {meta.native}
                      </div>
                      <div
                        className="font-ui font-medium uppercase text-bg-dark/45"
                        style={{ fontSize: 10, letterSpacing: "0.14em" }}
                      >
                        {meta.english}
                      </div>
                    </div>
                  </div>
                  {isPicked && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#C8A96E" strokeWidth="2.4" aria-hidden>
                      <polyline points="3 9.5 7 13.5 15 5.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={dismiss}
              className="font-ui font-medium text-bg-dark/55 transition-colors hover:text-bg-dark"
              style={{ fontSize: 12, letterSpacing: "0.08em" }}
            >
              Skip
            </button>
            <button
              type="button"
              onClick={confirm}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-ui font-semibold uppercase text-bg-light transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{ fontSize: 11, letterSpacing: "0.2em" }}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes lvs-pop {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
