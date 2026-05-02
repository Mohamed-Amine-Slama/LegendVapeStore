"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SlamTag from "./SlamTag";

const TAGS = [
  { text: "Shelf Stable",     background: "#C87D65", textColor: "#F0EDE8", rotate: -1.5 },
  { text: "Vapor + Clarity",  background: "#C8A96E", textColor: "#1A1A1A", rotate: 1 },
  { text: "Premium Hardware", background: "#8B1A1A", textColor: "#F0EDE8", rotate: -0.8 },
  { text: "Lab Certified",    background: "#E8C84A", textColor: "#1A1A1A", rotate: 2.2 },
];

/**
 * Dark slab section. Tags slam in from alternating sides; final tag bounces
 * elastic. Soft red and gold ambient glows in the corners.
 */
export default function FeatureSlamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const tags = tagRefs.current.filter(Boolean) as HTMLDivElement[];
    const ctx = gsap.context(() => {
      gsap.set([tags[0], tags[2]], { x: "-130vw", opacity: 0 });
      gsap.set([tags[1], tags[3]], { x: "130vw", opacity: 0 });
      gsap.set(eyebrowRef.current, { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      tl.to(tags[0], { x: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, 0.15);
      tl.to(tags[1], { x: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, 0.27);
      tl.to(tags[2], { x: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, 0.39);
      tl.to(tags[3], { x: 0, opacity: 1, duration: 0.95, ease: "elastic.out(1, 0.5)" }, 0.51);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center justify-center gap-7 overflow-hidden bg-bg-night px-6 py-12 md:gap-10 md:py-20"
      style={{ height: "100vh" }}
      data-section="feature-slam"
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

      {/* Soft glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "-10%",
          top: "20%",
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(139,26,26,0.4) 0%, rgba(0,0,0,0) 65%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: "-10%",
          bottom: "10%",
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(200,169,110,0.32) 0%, rgba(0,0,0,0) 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Eyebrow */}
      <div ref={eyebrowRef} className="relative z-[2] flex flex-col items-center text-center">
        <span
          className="font-ui font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.34em", color: "rgba(240,237,232,0.55)" }}
        >
          Built different.
        </span>
        <h2
          className="mt-4 display-tight text-bg-light"
          style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.9 }}
        >
          What&apos;s inside<br />the legend-vape-store.
        </h2>
      </div>

      <div className="relative z-[2] flex flex-col items-center gap-6 md:gap-8">
        {TAGS.map((tag, i) => (
          <SlamTag
            key={tag.text}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            {...tag}
          />
        ))}
      </div>
    </section>
  );
}
