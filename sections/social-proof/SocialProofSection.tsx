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
        background:
          "radial-gradient(120% 80% at 70% 20%, #F4F0E9 0%, #E8E1D2 60%, #DAD0BC 100%)",
        paddingTop: "clamp(100px, 12vh, 160px)",
        paddingBottom: "clamp(100px, 12vh, 160px)",
        minHeight: "100vh",
      }}
      data-section="social-proof"
    >
      <NoiseOverlay opacity={0.04} />

      <div className="relative z-[2] mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-12">
        <PhoneFan />
        <SocialHeadline ref={headlineRef} />
      </div>
    </section>
  );
}
