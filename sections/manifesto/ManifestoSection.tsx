"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ManifestoGhostText from "./ManifestoGhostText";
import ManifestoHeadline from "./ManifestoHeadline";
import ManifestoStrip from "./ManifestoStrip";
import ManifestoCopy from "./ManifestoCopy";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/lib/translations";

/**
 * Burgundy manifesto. Pinned for ~200vh. Cinematic backdrop:
 *  - radial dark vignette top-left
 *  - subtle inner glow centered
 *  - massive ghost text scrubbed 5%→55% opacity
 *  - 4 feature strips fly from alternating sides; last bounces elastic
 *  - sub-copy lifts in once strips settle
 */
const STRIPS: ReadonlyArray<{
  textKey: TranslationKey;
  background: string;
  textColor: string;
  rotate: number;
  from: { x: number | string; y: number };
}> = [
  { textKey: "manifesto.tag.zeroDiacetyl", background: "#F5F1EA", textColor: "#1A1A1A", rotate: -2.5, from: { x: "-110vw", y: 0 } },
  { textKey: "manifesto.tag.vaporClarity", background: "#C8A96E", textColor: "#1A1A1A", rotate: 1.8,  from: { x: "110vw",  y: 0 } },
  { textKey: "manifesto.tag.premiumCoils", background: "#1A1A1A", textColor: "#F0EDE8", rotate: -1.2, from: { x: "-110vw", y: 0 } },
  { textKey: "manifesto.tag.labCertified", background: "#E8C84A", textColor: "#1A1A1A", rotate: 2.6,  from: { x: 0,        y: -220 } },
];

export default function ManifestoSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
      });

      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        ghostRef.current,
        { opacity: 0.05 },
        {
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: true,
          },
        },
      );

      const strips = stripRefs.current.filter(Boolean) as HTMLDivElement[];
      strips.forEach((el, i) => {
        const cfg = STRIPS[i];
        gsap.set(el, { x: cfg.from.x, y: cfg.from.y, opacity: 0 });
      });

      const stripTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      stripTl
        .to(strips[0], { x: 0, y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 0)
        .to(strips[1], { x: 0, y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 0.12)
        .to(strips[2], { x: 0, y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.24)
        .to(strips[3], { x: 0, y: 0, opacity: 1, duration: 0.95, ease: "elastic.out(1, 0.55)" }, 0.36);

      gsap.from(copyRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top -20%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 60% at 30% 20%, #A11C1C 0%, #8B1A1A 35%, #5A0E0E 100%)",
      }}
      data-section="manifesto"
    >
      {/* Animated grain layer */}
      <div
        aria-hidden
        className="legend-vape-store-grain pointer-events-none absolute -inset-[10%] opacity-[0.07]"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(1200px,100vw)",
          height: "min(900px,80vh)",
          background:
            "radial-gradient(circle, rgba(232,200,74,0.08) 0%, rgba(0,0,0,0) 65%)",
          filter: "blur(40px)",
        }}
      />

      <ManifestoGhostText ref={ghostRef} />

      <div className="relative z-[2] flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center md:px-12">
        <ManifestoHeadline ref={headlineRef} />

        <div className="relative z-[3] mt-12 flex flex-wrap items-center justify-center gap-5">
          {STRIPS.map((strip, i) => (
            <ManifestoStrip
              key={strip.textKey}
              ref={(el) => {
                stripRefs.current[i] = el;
              }}
              text={t(strip.textKey)}
              background={strip.background}
              textColor={strip.textColor}
              rotate={strip.rotate}
            />
          ))}
        </div>

        <ManifestoCopy ref={copyRef} />
      </div>
    </section>
  );
}
