"use client";

import { useState } from "react";
import Link from "next/link";
import { useNavbarTheme } from "@/hooks/useNavbarTheme";
import { useI18n } from "@/context/I18nContext";
import HamburgerIcon from "./HamburgerIcon";
import MenuOverlay from "./MenuOverlay";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import CartIconButton from "@/components/cart/CartIconButton";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionTheme = useNavbarTheme();
  const { t } = useI18n();

  const onDark = sectionTheme === "dark" || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[9000] h-[64px] sm:h-[68px]",
          "px-4 sm:px-6 md:px-10",
          "flex items-center justify-between",
          "transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]",
        )}
      >
        {/* Logo block */}
        <Link
          href="/"
          className="group relative flex items-center gap-3"
          aria-label={t("nav.logoAria")}
        >
          <span
            className={cn(
              "font-script leading-none transition-colors duration-500",
              "group-hover:scale-[1.05] motion-safe:transition-transform",
              "text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px]",
              onDark ? "text-accent" : "text-bg-dark",
            )}
            style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            <span className="sm:hidden">LEGEND</span>
            <span className="hidden sm:inline">LEGEND VAPE STORE</span>
          </span>
          <span
            aria-hidden
            className={cn(
              "hidden h-3 w-px transition-colors duration-500 lg:inline-block",
              onDark ? "bg-accent/40" : "bg-bg-dark/40",
            )}
          />
          <span
            className={cn(
              "hidden font-ui font-medium uppercase tabular-nums transition-colors duration-500 lg:inline-block",
              onDark ? "text-accent/55" : "text-bg-dark/55",
            )}
            style={{ fontSize: 10, letterSpacing: "0.32em" }}
          >
            {t("nav.tagline")}
          </span>
        </Link>

        {/* Hamburger (centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <HamburgerIcon
            isOpen={menuOpen}
            isDark={onDark}
            onClick={() => setMenuOpen((v) => !v)}
          />
        </div>

        {/* Right rail: language switcher · cart icon · shop CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <LanguageSwitcher onDark={onDark} />
          <CartIconButton onDark={onDark} />

          <Link
            href="/shop"
            className={cn(
              "group relative inline-flex items-center justify-center rounded-full border font-ui font-medium uppercase",
              "transition-all duration-500 ease-out",
              "hover:scale-[1.04]",
              "h-9 w-9 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-2.5",
              onDark
                ? "border-accent/50 text-bg-light hover:bg-accent hover:text-bg-light hover:border-accent"
                : "border-bg-dark/35 text-bg-dark hover:bg-accent hover:text-bg-light hover:border-accent",
            )}
            style={{ fontSize: 11, letterSpacing: "0.18em" }}
            aria-label={t("nav.shopNow")}
          >
            <svg
              className="sm:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M2 4 H14 L13 8 H3 z" />
              <path d="M3 8 V13 H13 V8" />
              <path d="M6.5 4 V2.8 a1.5 1.5 0 0 1 3 0 V4" />
            </svg>
            <span
              aria-hidden
              className={cn(
                "hidden h-1.5 w-1.5 rounded-full transition-colors duration-500 sm:block",
                onDark ? "bg-accent" : "bg-bg-dark/70",
                "group-hover:bg-bg-light",
              )}
            />
            <span className="hidden sm:inline">{t("nav.shopNow")}</span>
          </Link>
        </div>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
