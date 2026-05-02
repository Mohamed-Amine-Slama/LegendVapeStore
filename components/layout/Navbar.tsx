"use client";

import { useState } from "react";
import Link from "next/link";
import { useNavbarTheme } from "@/hooks/useNavbarTheme";
import HamburgerIcon from "./HamburgerIcon";
import MenuOverlay from "./MenuOverlay";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionTheme = useNavbarTheme();

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
        {/* Logo block — wordmark only on mobile, eyebrow appears at sm+ */}
        <Link
          href="/"
          className="group relative flex items-center gap-3"
          aria-label="Legend Vape Store — home"
        >
          <span
            className={cn(
              "font-script leading-none transition-colors duration-500",
              "group-hover:scale-[1.05] motion-safe:transition-transform",
              "text-[24px] sm:text-[28px] md:text-[32px]",
              onDark ? "text-accent" : "text-bg-dark",
            )}
            style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            LEGEND VAPE STORE
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
            Premium Vapor
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

        {/* CTA — icon-only on mobile, full pill at sm+ */}
        <Link
          href="/shop"
          className={cn(
            "group relative inline-flex items-center justify-center rounded-full border font-ui font-medium uppercase",
            "transition-all duration-500 ease-out",
            "hover:scale-[1.04]",
            // Mobile: compact circle. sm+: full pill with label.
            "h-9 w-9 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-2.5",
            onDark
              ? "border-accent/50 text-bg-light hover:bg-accent hover:text-bg-dark hover:border-accent"
              : "border-bg-dark/35 text-bg-dark hover:bg-accent hover:text-bg-dark hover:border-accent",
          )}
          style={{ fontSize: 11, letterSpacing: "0.18em" }}
          aria-label="Shop now"
        >
          {/* On mobile: bag icon. On sm+: gold dot + label. */}
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
            <path d="M3 5 h10 l-1 9 h-8 z" />
            <path d="M5.5 5 V3.5 a2.5 2.5 0 0 1 5 0 V5" />
          </svg>
          <span
            aria-hidden
            className={cn(
              "hidden h-1.5 w-1.5 rounded-full transition-colors duration-500 sm:block",
              onDark ? "bg-accent" : "bg-bg-dark/70",
              "group-hover:bg-bg-dark",
            )}
          />
          <span className="hidden sm:inline">Shop now</span>
        </Link>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
