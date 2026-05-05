"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import StatBlock from "./StatBlock";
import ProductLineup from "./ProductLineup";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/lib/translations";

const STATS: ReadonlyArray<{ value: string; labelKey: TranslationKey }> = [
  { value: "20mg", labelKey: "stats.label.perDevice" },
  { value: "600+", labelKey: "stats.label.puffsPod" },
  { value: "14d",  labelKey: "stats.label.coilLife" },
  { value: "9",    labelKey: "stats.label.flavors" },
  { value: "2ml",  labelKey: "stats.label.eliquid" },
];

export default function StatsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const blocks = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(blocks, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 100%, #F5F1EA 0%, #E8E1D2 60%, #DCD3BF 100%)",
        paddingTop: "clamp(40px, 8vh, 100px)",
        paddingBottom: "clamp(40px, 8vh, 100px)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      data-section="stats"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Eyebrow + headline */}
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
          <span
            className="font-ui font-medium uppercase"
            style={{ fontSize: 11, letterSpacing: "0.32em", color: "rgba(26,26,26,0.55)" }}
          >
            {t("stats.eyebrow")}
          </span>
          <h2
            ref={headlineRef}
            className="mt-4 display-tight text-bg-dark"
            style={{ fontSize: "clamp(44px, 6.5vw, 96px)", lineHeight: 0.9 }}
          >
            {t("stats.headline")}
          </h2>
        </div>

        <ProductLineup />

        <div
          className="mx-auto mt-20 grid max-w-[1200px] grid-cols-2 gap-y-12 md:grid-cols-5"
        >
          {STATS.map((s, i) => (
            <StatBlock
              key={s.labelKey}
              value={s.value}
              label={t(s.labelKey)}
              showSeparator={i > 0}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
