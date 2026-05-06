"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import PhoneFan from "./PhoneFan";
import SocialHeadline from "./SocialHeadline";

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const lines = sectionRef.current!.querySelectorAll<HTMLElement>("[data-headline-line]");
      const copy = sectionRef.current!.querySelector<HTMLElement>("[data-headline-copy]");
      const cta = sectionRef.current!.querySelector<HTMLElement>("[data-headline-cta]");

      gsap.from(lines, {
        x: -90,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      if (copy) {
        gsap.from(copy, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      }

      if (cta) {
        gsap.from(cta, {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.85,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        paddingTop: "clamp(100px, 12vh, 160px)",
        paddingBottom: "clamp(100px, 12vh, 160px)",
        minHeight: "100vh",
      }}
      data-section="social-proof"
    >
      {/* Fixed cinematic backdrop — vape + vapor, locked behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/footer/product-hero-3d.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Light wash so the dark headline stays readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(244,240,233,0.92) 0%, rgba(244,240,233,0.78) 45%, rgba(232,225,210,0.55) 100%)",
        }}
      />

      <NoiseOverlay opacity={0.04} />

      <div className="relative z-[2] mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-12">
        <PhoneFan />
        <SocialHeadline ref={headlineRef} />
      </div>
    </section>
  );
}
