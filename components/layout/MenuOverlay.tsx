"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import NavLink from "./NavLink";
import { MENU_LINKS } from "@/constants/navigation";
import { useI18n } from "@/context/I18nContext";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const { t } = useI18n();
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const wrap = linksWrapRef.current;
    if (!overlay || !wrap) return;
    const links = wrap.querySelectorAll<HTMLElement>("a");

    if (isOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" },
      );
      gsap.fromTo(
        links,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.15,
        },
      );
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { y: -16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 },
        );
      }
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", delay: 0.55 },
        );
      }
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.32,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[8000] hidden flex-col justify-center bg-bg-night pl-[10vw] pr-[10vw]"
      style={{
        background:
          "radial-gradient(140% 100% at 30% 30%, #1A1A1A 0%, #0E0E0E 70%)",
      }}
    >
      {/* Animated grain */}
      <div
        aria-hidden
        className="legend-vape-store-grain pointer-events-none absolute -inset-[10%] opacity-[0.05]"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Eyebrow */}
      <div
        ref={eyebrowRef}
        className="absolute left-[10vw] top-[14vh] flex items-center gap-3"
      >
        <span className="h-px w-10 bg-accent/40" />
        <span
          className="font-ui font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.32em", color: "rgba(200,169,110,0.78)" }}
        >
          {t("menu.eyebrow")}
        </span>
      </div>

      <div ref={linksWrapRef} className="relative flex flex-col gap-1">
        {MENU_LINKS.map((link, i) => (
          <div key={link.label} className="flex items-center gap-6">
            <span
              className="font-ui font-medium uppercase tabular-nums"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "rgba(200,169,110,0.45)",
              }}
            >
              0{i + 1}
            </span>
            <NavLink {...link} onClick={onClose} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-10 left-[10vw] right-[10vw] flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <p
          className="font-serif italic"
          style={{
            color: "rgba(240,237,232,0.55)",
            fontSize: 14,
            maxWidth: 320,
            lineHeight: 1.5,
          }}
        >
          {t("menu.quote")}
          <br />
          <span className="not-italic font-ui text-[11px] uppercase tracking-[0.2em] text-accent/70">
            {t("menu.attribution")}
          </span>
        </p>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <span
            className="font-ui font-medium uppercase"
            style={{ fontSize: 10, letterSpacing: "0.32em", color: "rgba(240,237,232,0.4)" }}
          >
            {t("menu.followLabel")}
          </span>
          <div className="flex gap-5">
            {["Instagram", "TikTok", "X", "YouTube"].map((label) => (
              <a
                key={label}
                href="#"
                className="font-ui transition-colors duration-200 hover:text-accent"
                style={{ fontSize: 12, letterSpacing: "0.18em", color: "rgba(240,237,232,0.65)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
