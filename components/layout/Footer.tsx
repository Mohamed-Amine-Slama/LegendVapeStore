"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FOOTER_COLUMNS } from "@/constants/navigation";
import PillButton from "@/components/ui/PillButton";

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.81-.25-2.23-.42a3.74 3.74 0 0 1-1.38-.9 3.74 3.74 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.2 8.8 2.2 12 2.2Zm0 1.78c-3.15 0-3.52 0-4.76.07-.99.04-1.53.21-1.89.35-.47.18-.81.4-1.16.75-.35.35-.57.69-.75 1.16-.14.36-.31.9-.35 1.89-.06 1.24-.07 1.61-.07 4.76s0 3.52.07 4.76c.04.99.21 1.53.35 1.89.18.47.4.81.75 1.16.35.35.69.57 1.16.75.36.14.9.31 1.89.35 1.24.06 1.61.07 4.76.07s3.52 0 4.76-.07c.99-.04 1.53-.21 1.89-.35.47-.18.81-.4 1.16-.75.35-.35.57-.69.75-1.16.14-.36.31-.9.35-1.89.06-1.24.07-1.61.07-4.76s0-3.52-.07-4.76c-.04-.99-.21-1.53-.35-1.89a3.13 3.13 0 0 0-.75-1.16 3.13 3.13 0 0 0-1.16-.75c-.36-.14-.9-.31-1.89-.35-1.24-.06-1.61-.07-4.76-.07Zm0 3.03a4.99 4.99 0 1 1 0 9.98 4.99 4.99 0 0 1 0-9.98Zm0 8.23a3.24 3.24 0 1 0 0-6.48 3.24 3.24 0 0 0 0 6.48Zm6.36-8.43a1.17 1.17 0 1 1-2.33 0 1.17 1.17 0 0 1 2.33 0Z",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M19.32 6.45a5.49 5.49 0 0 1-3.16-1 5.5 5.5 0 0 1-2.18-3.45h-3.36v12.31a2.85 2.85 0 1 1-2-2.72v-3.4a6.23 6.23 0 1 0 5.4 6.17V8.6a8.79 8.79 0 0 0 5.3 1.78V7a5.41 5.41 0 0 1 0-.55Z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.53 3h3.27l-7.14 8.16L22 21h-6.55l-5.13-6.7L4.4 21H1.13l7.63-8.72L1 3h6.7l4.64 6.13L17.53 3Zm-1.15 16.05h1.81L7.74 4.86H5.8l10.58 14.19Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.58 7.19c-.23-.86-.9-1.53-1.76-1.76C18.27 5 12 5 12 5s-6.27 0-7.82.43c-.86.23-1.53.9-1.76 1.76C2 8.74 2 12 2 12s0 3.26.42 4.81c.23.86.9 1.53 1.76 1.76C5.73 19 12 19 12 19s6.27 0 7.82-.43c.86-.23 1.53-.9 1.76-1.76C22 15.26 22 12 22 12s0-3.26-.42-4.81ZM10 15.02V8.98L15.5 12 10 15.02Z",
  },
];

const STICKERS: {
  text: string;
  bg: string;
  fg: string;
  rotate: number;
  top: string;
  left?: string;
  right?: string;
}[] = [
  { text: "NEW DROPS WEEKLY", bg: "#C8273A", fg: "#F0EDE8", rotate: -8, top: "8%", right: "6%" },
  { text: "21+ ONLY", bg: "#E8C84A", fg: "#1A1A1A", rotate: 11, top: "62%", right: "20%" },
  { text: "DROP CLUB", bg: "#C8A96E", fg: "#1A2332", rotate: -5, top: "78%", right: "2%" },
];

const VAPOR_PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  delay: (i * 0.7) % 6,
  duration: 4 + (i % 4) * 1.2,
  left: 10 + ((i * 17) % 80),
  drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 5) * 4),
}));

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  // ─── GSAP scroll choreography ────────────────────────────────────
  useLayoutEffect(() => {
    if (!footerRef.current) return;
    const root = footerRef.current;

    const ctx = gsap.context(() => {
      // Helper queries
      const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, root);

      // ── ENTRANCE — eyebrow + line draw ──
      const eyebrow = q("[data-footer-eyebrow]");
      const eyebrowLine = q("[data-footer-eyebrow-line]");
      gsap.from(eyebrow, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 78%" },
      });
      gsap.from(eyebrowLine, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: root, start: "top 78%" },
      });

      // ── ENTRANCE — hashtag headline letters ──
      const headlineLines = q("[data-footer-headline-line]");
      gsap.set(headlineLines, { yPercent: 110, opacity: 0 });
      gsap.to(headlineLines, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.13,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });

      // ── ENTRANCE — outline ghost behind hashtag ──
      const ghost = q("[data-footer-ghost]");
      gsap.from(ghost, {
        x: -60,
        y: 30,
        opacity: 0,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });

      // ── ENTRANCE — script kicker ──
      const kicker = q("[data-footer-kicker]");
      gsap.from(kicker, {
        scale: 0.6,
        rotate: -25,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
        delay: 0.5,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });

      // ── ENTRANCE — stickers pop with rotation ──
      const stickers = q("[data-footer-sticker]");
      gsap.set(stickers, { scale: 0, opacity: 0, rotation: 0 });
      stickers.forEach((sticker, i) => {
        const finalRotate = parseFloat(sticker.dataset.rotate || "0");
        gsap.to(sticker, {
          scale: 1,
          opacity: 1,
          rotation: finalRotate,
          duration: 0.7,
          ease: "back.out(2)",
          delay: 0.6 + i * 0.12,
          scrollTrigger: { trigger: root, start: "top 75%" },
        });

        // Continuous subtle wobble after entrance
        gsap.to(sticker, {
          rotation: finalRotate + (i % 2 ? 2 : -2),
          duration: 3 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6 + i * 0.3,
        });
      });

      // ── ENTRANCE — seal + continuous parallax drift ──
      const seal = q("[data-footer-seal]");
      gsap.from(seal, {
        scale: 0.4,
        opacity: 0,
        duration: 1.1,
        ease: "back.out(1.4)",
        delay: 0.7,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });

      // ── ENTRANCE — editorial split product stage ──
      const productStage = q("[data-footer-product-stage]");
      gsap.from(productStage, {
        x: -50,
        scale: 0.92,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-footer-editorial]", start: "top 75%" },
      });

      // ── ENTRANCE — invitation card slides from right ──
      const invitation = q("[data-footer-invitation]");
      gsap.from(invitation, {
        x: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-footer-editorial]", start: "top 75%" },
      });

      // ── ENTRANCE — invitation corner ornaments draw in ──
      const ornaments = q("[data-footer-ornament]");
      gsap.from(ornaments, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.08,
        delay: 0.5,
        scrollTrigger: { trigger: "[data-footer-editorial]", start: "top 75%" },
      });

      // ── ENTRANCE — invitation signature line draws ──
      const signLine = q("[data-footer-sign-line]");
      gsap.from(signLine, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        delay: 0.7,
        scrollTrigger: { trigger: "[data-footer-editorial]", start: "top 70%" },
      });

      // ── ENTRANCE — nav columns stagger ──
      const navCols = q("[data-footer-nav-col]");
      gsap.from(navCols, {
        y: 60,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-footer-nav]", start: "top 82%" },
      });

      // Each col header underline draws
      const colUnderlines = q("[data-footer-col-underline]");
      gsap.from(colUnderlines, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.2,
        scrollTrigger: { trigger: "[data-footer-nav]", start: "top 82%" },
      });

      // ── ENTRANCE — social hexagons rotate-pop in ──
      const socialHex = q("[data-footer-social]");
      gsap.from(socialHex, {
        scale: 0,
        rotation: 90,
        opacity: 0,
        duration: 0.65,
        ease: "back.out(2)",
        stagger: 0.09,
        delay: 0.4,
        scrollTrigger: { trigger: "[data-footer-nav]", start: "top 82%" },
      });

      // ── ENTRANCE — bottom bar fade ──
      gsap.from("[data-footer-bottom]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-footer-bottom]", start: "top 92%" },
      });

      // ═══════════════════════════════════════════════════════════════
      // PARALLAX — different layers move at different scroll speeds
      // (Lenis ticks gsap.ticker → ScrollTrigger.update is called from
      //  the Lenis 'scroll' event, so all of these scrub smoothly.)
      // ═══════════════════════════════════════════════════════════════

      // Vertical "LEGEND" spine — slow upward drift
      gsap.to("[data-footer-spine]", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Outline ghost behind the hashtag — drifts down opposite direction
      gsap.to(ghost, {
        yPercent: 22,
        x: 30,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Big foreground hashtag — gentle counter-parallax
      gsap.to("[data-footer-headline-wrap]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Seal — y parallax (CSS handles spin, GSAP handles position)
      gsap.to("[data-footer-seal-parallax]", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Stickers — each drifts at its own speed
      stickers.forEach((sticker, i) => {
        gsap.to(sticker, {
          y: (i % 2 === 0 ? -1 : 1) * (40 + i * 18),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7 + i * 0.25,
          },
        });
      });

      // Product stage — outer wrapper takes parallax (inner has CSS float)
      gsap.to("[data-footer-product-parallax]", {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-footer-editorial]",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Vapor column — slight horizontal sway with scroll
      gsap.to("[data-footer-vapor]", {
        x: 12,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-footer-editorial]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      // Invitation card — subtle counter-parallax in the opposite direction
      gsap.to(invitation, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-footer-editorial]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background gold glow shifts with scroll
      gsap.to("[data-footer-glow-1]", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to("[data-footer-glow-2]", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // ═══════════════════════════════════════════════════════════════
      // CONTINUOUS — subtle ambient motion (independent of scroll)
      // ═══════════════════════════════════════════════════════════════

      // Ghost text breathes (very subtle x/y)
      gsap.to(ghost, {
        x: "+=12",
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Eyebrow diamond gently rotates
      gsap.to("[data-footer-eyebrow-diamond]", {
        rotate: "+=360",
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    }, footerRef);

    // Refresh once images settle
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 250);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  // ─── Cursor-magnet on the rotating seal ──────────────────────────
  useEffect(() => {
    const node = sealRef.current;
    if (!node) return;
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist > 260) {
        gsap.to(node, { x: 0, y: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        return;
      }
      const pull = Math.max(0, 1 - dist / 260);
      gsap.to(node, {
        x: dx * 0.08 * pull,
        y: dy * 0.08 * pull,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <footer
      ref={footerRef}
      data-section="footer"
      className="relative w-full overflow-hidden text-[#F0EDE8]"
      style={{
        background: "linear-gradient(180deg, #1A2332 0%, #0E0E0E 100%)",
      }}
    >
      {/* Background glow layers — parallaxed independently */}
      <div
        aria-hidden
        data-footer-glow-1
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(80% 60% at 100% 0%, rgba(200,169,110,0.24) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        data-footer-glow-2
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 0% 100%, rgba(139,26,26,0.22) 0%, transparent 60%)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          1. TOP MARQUEE TICKER
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C8A96E 30%, #A88848 70%, transparent)",
        }}
      />
      <div className="relative flex h-12 items-center overflow-hidden border-b border-white/10">
        <div className="legend-vape-store-marquee flex shrink-0 items-center gap-12 whitespace-nowrap font-serif italic">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12" style={{ color: "#C8A96E" }}>
              <span style={{ fontSize: 14 }}>EST. 2024</span>
              <span style={{ opacity: 0.5 }}>◆</span>
              <span style={{ fontSize: 14 }}>Lab Certified Vapor</span>
              <span style={{ opacity: 0.5 }}>◆</span>
              <span style={{ fontSize: 14 }}>Premium Disposables</span>
              <span style={{ opacity: 0.5 }}>◆</span>
              <span style={{ fontSize: 14 }}>Members&apos; Drop Club</span>
              <span style={{ opacity: 0.5 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          2. VERTICAL "LEGEND" SPINE — parallaxed
      ═══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        data-footer-spine
        className="pointer-events-none absolute left-0 top-12 z-[1] hidden h-[calc(100%-3rem)] w-12 items-center justify-center border-r border-white/5 lg:flex"
      >
        <span
          className="font-display uppercase tracking-[0.5em]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: 13,
            color: "rgba(200,169,110,0.55)",
          }}
        >
          Legend · Vape · Store · 2024 · Premium · Vapor · Drop Club · Lab Certified
        </span>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          3. HERO BLOCK
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-[2] mx-auto max-w-[1500px] px-6 sm:px-10 md:px-16 lg:pl-28 pt-16 sm:pt-20 md:pt-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div className="relative">
            {/* Eyebrow */}
            <div className="flex items-center gap-3" data-footer-eyebrow>
              <span
                data-footer-eyebrow-diamond
                className="block h-[6px] w-[6px]"
                style={{ background: "#C8A96E", transform: "rotate(45deg)" }}
              />
              <span
                className="font-ui font-medium uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.36em",
                  color: "#C8A96E",
                }}
              >
                Section · 06 / Stay in touch
              </span>
              <div
                data-footer-eyebrow-line
                className="h-[1px] flex-1 max-w-[200px]"
                style={{
                  background:
                    "linear-gradient(90deg, #C8A96E 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Layered hashtag headline */}
            <div className="relative mt-6 overflow-hidden" data-footer-headline-wrap>
              {/* Outline ghost duplicate behind */}
              <h2
                aria-hidden
                data-footer-ghost
                className="display-tight pointer-events-none absolute left-0 top-0 select-none"
                style={{
                  fontSize: "clamp(40px, 9.5vw, 156px)",
                  lineHeight: 0.86,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(200,169,110,0.32)",
                  transform: "translate(6px, 6px)",
                }}
              >
                #VAPEWITH
                <br />
                LEGEND
              </h2>

              {/* Foreground filled — each line clipped for stagger reveal */}
              <h2
                className="display-tight relative"
                style={{
                  fontSize: "clamp(40px, 9.5vw, 156px)",
                  lineHeight: 0.86,
                }}
              >
                <span
                  className="block overflow-hidden"
                  style={{ paddingBottom: "0.1em" }}
                >
                  <span
                    data-footer-headline-line
                    className="inline-block"
                    style={{
                      background:
                        "linear-gradient(180deg, #F0EDE8 0%, #C8A96E 70%, #A88848 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    #VAPEWITH
                  </span>
                </span>
                <span
                  className="block overflow-hidden"
                  style={{ paddingBottom: "0.1em" }}
                >
                  <span
                    data-footer-headline-line
                    className="inline-block"
                    style={{
                      background:
                        "linear-gradient(180deg, #C8A96E 0%, #A88848 60%, #1A2332 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    LEGEND.
                  </span>
                </span>
              </h2>

              {/* Script kicker */}
              <span
                data-footer-kicker
                className="font-script absolute"
                style={{
                  bottom: "-0.4em",
                  right: "8%",
                  fontSize: "clamp(28px, 5.5vw, 72px)",
                  color: "#E8C84A",
                  transform: "rotate(-6deg)",
                  textShadow: "0 0 30px rgba(232,200,74,0.35)",
                }}
              >
                be a legend.
              </span>
            </div>

            {/* Floating stickers */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {STICKERS.map((s) => (
                <div
                  key={s.text}
                  data-footer-sticker
                  data-rotate={s.rotate}
                  className="sticker-shadow-md gloss-overlay absolute font-oswald font-bold uppercase"
                  style={{
                    top: s.top,
                    left: s.left,
                    right: s.right,
                    background: s.bg,
                    color: s.fg,
                    fontSize: "clamp(13px, 1.3vw, 18px)",
                    letterSpacing: "0.05em",
                    padding: "0.35em 0.85em",
                    borderRadius: 5,
                  }}
                >
                  {s.text}
                </div>
              ))}
            </div>
          </div>

          {/* Rotating seal — outer wrapper for parallax, inner for cursor-magnet */}
          <div
            data-footer-seal-parallax
            className="relative ml-auto hidden md:block"
            style={{ width: 180, height: 180 }}
          >
            <div
              ref={sealRef}
              data-footer-seal
              className="relative h-full w-full will-change-transform"
            >
              <div
                className="absolute inset-0"
                style={{ animation: "footerSealSpin 22s linear infinite" }}
              >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <defs>
                    <path
                      id="sealCircle"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text
                    fontFamily="var(--font-ui)"
                    fontSize="13"
                    fontWeight="600"
                    letterSpacing="3"
                    fill="#C8A96E"
                  >
                    <textPath href="#sealCircle">
                      ★ LEGEND VAPE STORE ★ DROP CLUB ★ MEMBERS ONLY ★ SINCE 2024
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="grid h-20 w-20 place-items-center rounded-full border"
                  style={{
                    borderColor: "#C8A96E",
                    background:
                      "radial-gradient(circle, rgba(200,169,110,0.2) 0%, transparent 70%)",
                  }}
                >
                  <span
                    className="font-script"
                    style={{ fontSize: 28, color: "#C8A96E", lineHeight: 1 }}
                  >
                    L
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. EDITORIAL SPLIT
      ═══════════════════════════════════════════════════════════════ */}
      <section
        data-footer-editorial
        className="relative z-[2] mx-auto mt-24 grid max-w-[1500px] grid-cols-1 gap-16 px-6 sm:px-10 md:mt-32 md:grid-cols-[5fr_6fr] md:px-16 lg:pl-28"
      >
        {/* Product stage */}
        <div
          data-footer-product-stage
          className="relative h-[360px] sm:h-[420px] md:h-[500px]"
        >
          {/* Spotlight pedestal */}
          <div
            aria-hidden
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2"
            style={{
              width: "70%",
              height: "30px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(200,169,110,0.5) 0%, rgba(200,169,110,0.15) 50%, transparent 80%)",
              filter: "blur(12px)",
            }}
          />
          {/* Vertical light beam */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: "55%",
              height: "85%",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.18) 30%, rgba(200,169,110,0.32) 60%, transparent 100%)",
              filter: "blur(20px)",
            }}
          />

          {/* Vapor column */}
          <div
            data-footer-vapor
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {VAPOR_PARTICLES.map((p, i) => (
              <span
                key={i}
                className="absolute bottom-[18%] block h-[6px] w-[6px] rounded-full"
                style={{
                  left: `${p.left}%`,
                  background: "rgba(240,237,232,0.45)",
                  filter: "blur(2px)",
                  animation: `footerVaporRise ${p.duration}s ease-out ${p.delay}s infinite`,
                  ["--drift" as never]: `${p.drift}px`,
                }}
              />
            ))}
          </div>

          {/* Product — outer wrapper takes scroll parallax, inner takes CSS float */}
          <div
            data-footer-product-parallax
            className="relative h-full w-full will-change-transform"
          >
            <div
              className="relative h-full w-full"
              style={{ animation: "footerHeroFloat 7s ease-in-out infinite" }}
            >
              <Image
                src="/footer/product-hero-3d.png"
                alt="LEGEND VAPE STORE flagship device"
                fill
                sizes="(max-width: 768px) 90vw, 600px"
                className="object-contain"
                style={{
                  filter:
                    "drop-shadow(0 50px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(200,169,110,0.32))",
                }}
              />
            </div>
          </div>

          {/* Reflection */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 h-[80px] w-[55%] -translate-x-1/2 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(200,169,110,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Caption */}
          <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span
              className="font-ui uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.32em",
                color: "rgba(240,237,232,0.5)",
              }}
            >
              ↑ Featured · Legend Titan V2 ↑
            </span>
          </div>
        </div>

        {/* Invitation newsletter card */}
        <div
          data-footer-invitation
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(150deg, rgba(240,237,232,0.04) 0%, rgba(200,169,110,0.06) 100%)",
            border: "1px solid rgba(200,169,110,0.35)",
            padding: "44px 36px 44px 36px",
          }}
        >
          {/* Corner ornaments */}
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <span
              key={corner}
              data-footer-ornament
              aria-hidden
              className="absolute"
              style={{
                top: corner.startsWith("t") ? 12 : "auto",
                bottom: corner.startsWith("b") ? 12 : "auto",
                left: corner.endsWith("l") ? 12 : "auto",
                right: corner.endsWith("r") ? 12 : "auto",
                width: 18,
                height: 18,
                borderTop: corner.startsWith("t") ? "1px solid #C8A96E" : "none",
                borderBottom: corner.startsWith("b") ? "1px solid #C8A96E" : "none",
                borderLeft: corner.endsWith("l") ? "1px solid #C8A96E" : "none",
                borderRight: corner.endsWith("r") ? "1px solid #C8A96E" : "none",
              }}
            />
          ))}

          <div className="flex items-center justify-between">
            <span
              className="font-ui uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.42em",
                color: "#C8A96E",
              }}
            >
              · A Personal Invitation ·
            </span>
            <span
              className="font-ui uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.32em",
                color: "rgba(240,237,232,0.45)",
              }}
            >
              No. 24/2025
            </span>
          </div>

          <h3
            className="font-serif italic mt-8"
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              lineHeight: 1.05,
              color: "#F0EDE8",
            }}
          >
            You are warmly invited
            <br />
            <span style={{ color: "#C8A96E" }}>to the next drop.</span>
          </h3>

          <p
            className="mt-5 max-w-md font-ui"
            style={{
              color: "rgba(240,237,232,0.7)",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Join the Drop Club and we&apos;ll send you private access to
            lab-certified releases, members-only flavors, and stock alerts that
            disappear in minutes.
          </p>

          <form
            className="mt-9 flex w-full flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-ui uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  color: "rgba(200,169,110,0.7)",
                }}
              >
                Email
              </span>
              <input
                type="email"
                required
                placeholder=""
                className="peer w-full border-b border-white/20 bg-transparent pb-2 pl-16 pr-4 pt-7 text-base text-white placeholder:text-white/40 focus:border-[#C8A96E] focus:outline-none"
              />
            </div>
            <PillButton variant="gold" size="md" type="submit" trailingIcon>
              R.S.V.P.
            </PillButton>
          </form>

          <div className="mt-7 flex items-center gap-4">
            <div
              data-footer-sign-line
              className="h-[1px] flex-1"
              style={{
                background:
                  "linear-gradient(90deg, #C8A96E 0%, transparent 100%)",
              }}
            />
            <span
              className="font-script"
              style={{ fontSize: 18, color: "#C8A96E" }}
            >
              with regards,
            </span>
            <span
              className="font-script"
              style={{ fontSize: 22, color: "#F0EDE8" }}
            >
              Legend
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. NAV COLUMNS
      ═══════════════════════════════════════════════════════════════ */}
      <nav
        data-footer-nav
        className="relative z-[2] mx-auto mt-20 grid max-w-[1500px] grid-cols-2 gap-x-6 gap-y-12 px-6 sm:px-10 md:grid-cols-4 md:px-16 lg:pl-28"
      >
        {FOOTER_COLUMNS.slice(0, 3).map((col, ci) => (
          <div key={col.header} data-footer-nav-col>
            <div className="flex items-center gap-3">
              <span
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: "rgba(200,169,110,0.55)",
                }}
              >
                0{ci + 1}
              </span>
              <h4
                className="font-ui font-semibold uppercase"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.28em",
                  color: "#C8A96E",
                }}
              >
                {col.header}
              </h4>
            </div>
            <div
              data-footer-col-underline
              className="mt-3 h-[1px] w-10"
              style={{ background: "#C8A96E" }}
            />
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group relative inline-flex items-center gap-3 font-ui text-[14px] text-white/75 transition-colors hover:text-white"
                  >
                    <span
                      aria-hidden
                      className="block h-[1px] bg-[#C8A96E] transition-all duration-300 ease-out group-hover:w-5"
                      style={{ width: 0 }}
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <span
                      aria-hidden
                      className="ml-1 inline-block opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      style={{ color: "#C8A96E" }}
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Follow us */}
        <div data-footer-nav-col>
          <div className="flex items-center gap-3">
            <span
              className="font-mono"
              style={{ fontSize: 10, color: "rgba(200,169,110,0.55)" }}
            >
              04
            </span>
            <h4
              className="font-ui font-semibold uppercase"
              style={{
                fontSize: 12,
                letterSpacing: "0.28em",
                color: "#C8A96E",
              }}
            >
              Follow us
            </h4>
          </div>
          <div
            data-footer-col-underline
            className="mt-3 h-[1px] w-10"
            style={{ background: "#C8A96E" }}
          />

          <p
            className="mt-5 font-serif italic"
            style={{
              color: "rgba(240,237,232,0.62)",
              fontSize: 14,
              lineHeight: 1.55,
            }}
          >
            Tag <span style={{ color: "#C8A96E" }}>@legendvape</span> for the
            chance to be featured on our wall.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                data-footer-social
                href={s.href}
                aria-label={s.label}
                className="group relative grid h-12 w-12 place-items-center transition-transform hover:scale-110"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(200,169,110,0.4)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #C8A96E 0%, #A88848 100%)",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />
                <svg
                  viewBox="0 0 24 24"
                  className="relative z-[1] h-[18px] w-[18px] fill-[#C8A96E] transition-colors group-hover:fill-[#1A2332]"
                  aria-hidden
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              className="font-ui uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.32em",
                color: "rgba(240,237,232,0.45)",
              }}
            >
              As seen in
            </span>
            {["Vapor·Mag", "Cloud Quarterly", "Lift Magazine"].map((p) => (
              <span
                key={p}
                className="font-serif italic"
                style={{
                  fontSize: 13,
                  color: "rgba(240,237,232,0.55)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          6. CTA RIBBON
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-[2] mx-auto mt-20 max-w-[1500px] px-6 sm:px-10 md:px-16 lg:pl-28">
        <div
          className="h-[1px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C8A96E 30%, #A88848 70%, transparent 100%)",
          }}
        />

        <div className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <button
            type="button"
            onClick={() =>
              typeof window !== "undefined" &&
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="group flex items-center gap-3 font-ui uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              color: "#C8A96E",
            }}
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-full border transition-all group-hover:bg-[#C8A96E] group-hover:text-[#1A2332]"
              style={{ borderColor: "#C8A96E" }}
            >
              ↑
            </span>
            Back to the top
          </button>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { k: "Region", v: "Worldwide" },
              { k: "Currency", v: "EUR €" },
              { k: "Lang", v: "EN" },
            ].map((item) => (
              <span
                key={item.k}
                className="font-ui uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  color: "rgba(240,237,232,0.5)",
                }}
              >
                {item.k}{" "}
                <span style={{ color: "#F0EDE8" }}>· {item.v}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. BOTTOM TICKER
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative flex h-10 items-center overflow-hidden border-y border-white/10"
        style={{
          background: "linear-gradient(90deg, rgba(200,169,110,0.04), transparent 70%)",
        }}
      >
        <div
          className="flex shrink-0 items-center gap-10 whitespace-nowrap font-ui uppercase"
          style={{
            animation: "footerMarqueeReverse 38s linear infinite",
            fontSize: 11,
            letterSpacing: "0.32em",
            color: "rgba(240,237,232,0.5)",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span style={{ color: "#C8A96E" }}>✦</span>
              Crafted in France
              <span style={{ color: "#C8A96E" }}>✦</span>
              Free shipping over 50€
              <span style={{ color: "#C8A96E" }}>✦</span>
              Discreet packaging
              <span style={{ color: "#C8A96E" }}>✦</span>
              Sold to 21+ only
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          8. BOTTOM BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div
        data-footer-bottom
        className="relative z-[2] mx-auto max-w-[1500px] px-6 py-8 sm:px-10 md:px-16 lg:pl-28"
      >
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-baseline gap-3">
            <span
              className="font-script"
              style={{
                fontSize: "clamp(26px, 2.6vw, 38px)",
                color: "#F0EDE8",
              }}
            >
              Legend
            </span>
            <span
              className="font-display uppercase"
              style={{
                fontSize: 14,
                letterSpacing: "0.32em",
                color: "#C8A96E",
              }}
            >
              Vape Store
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                color: "rgba(240,237,232,0.35)",
              }}
            >
              v.4.7
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Cookies", "Compliance"].map((l) => (
              <Link
                key={l}
                href="#"
                className="font-ui uppercase text-white/55 transition-colors hover:text-white"
                style={{ fontSize: 11, letterSpacing: "0.24em" }}
              >
                {l}
              </Link>
            ))}
            <span
              className="font-ui uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.24em",
                color: "rgba(240,237,232,0.4)",
              }}
            >
              © {new Date().getFullYear()}
            </span>
            <span
              className="flex items-center gap-2 font-ui uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.24em",
                color: "rgba(240,237,232,0.6)",
              }}
            >
              <span
                aria-hidden
                className="block h-2 w-2 rounded-full"
                style={{
                  background: "#C8A96E",
                  boxShadow: "0 0 8px #C8A96E",
                  animation: "footerDotPulse 2s ease-in-out infinite",
                }}
              />
              Live
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          KEYFRAMES
      ═══════════════════════════════════════════════════════════════ */}
      <style jsx>{`
        @keyframes footerHeroFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-1.5deg);
          }
          50% {
            transform: translateY(-18px) rotate(2deg);
          }
        }
        @keyframes footerSealSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes footerVaporRise {
          0% {
            transform: translate(0, 0) scale(0.4);
            opacity: 0;
          }
          15% {
            opacity: 0.55;
          }
          100% {
            transform: translate(var(--drift, 0), -240px) scale(1.6);
            opacity: 0;
          }
        }
        @keyframes footerMarqueeReverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes footerDotPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.6;
          }
        }
      `}</style>
    </footer>
  );
}
