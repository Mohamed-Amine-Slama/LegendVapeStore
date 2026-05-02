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
          "fixed top-0 left-0 right-0 z-[9000] h-[68px]",
          "px-6 md:px-10",
          "flex items-center justify-between",
          "transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]",
        )}
      >
        {/* Logo block */}
        <a
          href="#"
          className="group relative flex items-center gap-3"
        >
          <span
            className={cn(
              "font-script leading-none transition-colors duration-500",
              "group-hover:scale-[1.05] motion-safe:transition-transform",
              onDark ? "text-accent" : "text-bg-dark",
            )}
            style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            LEGEND VAPE STORE
          </span>
          <span
            aria-hidden
            className={cn(
              "hidden h-3 w-px transition-colors duration-500 sm:inline-block",
              onDark ? "bg-accent/40" : "bg-bg-dark/40",
            )}
          />
          <span
            className={cn(
              "hidden font-ui font-medium uppercase tabular-nums transition-colors duration-500 sm:inline-block",
              onDark ? "text-accent/55" : "text-bg-dark/55",
            )}
            style={{ fontSize: 10, letterSpacing: "0.32em" }}
          >
            Premium Vapor
          </span>
        </a>

        {/* Hamburger (centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <HamburgerIcon
            isOpen={menuOpen}
            isDark={onDark}
            onClick={() => setMenuOpen((v) => !v)}
          />
        </div>

        {/* CTA — links to the shop */}
        <Link
          href="/shop"
          className={cn(
            "group relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-ui font-medium uppercase",
            "transition-all duration-500 ease-out",
            "hover:scale-[1.04]",
            onDark
              ? "border-accent/50 text-bg-light hover:bg-accent hover:text-bg-dark hover:border-accent"
              : "border-bg-dark/35 text-bg-dark hover:bg-accent hover:text-bg-dark hover:border-accent",
          )}
          style={{ fontSize: 11, letterSpacing: "0.18em" }}
        >
          <span
            aria-hidden
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors duration-500",
              onDark ? "bg-accent" : "bg-bg-dark/70",
              "group-hover:bg-bg-dark",
            )}
          />
          Shop now
        </Link>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
