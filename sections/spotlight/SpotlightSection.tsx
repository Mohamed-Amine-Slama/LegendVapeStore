"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import SpotlightText from "./SpotlightText";
import SpotlightCard from "./SpotlightCard";

/**
 * Transition section between Manifesto and Carousel.
 * Word stagger reveal on left + tilted gold card flying in from right.
 */
export default function SpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const innerWords = sectionRef.current!.querySelectorAll<HTMLElement>(
        "[data-spotlight-word] > span",
      );
      gsap.set(innerWords, { yPercent: 110, opacity: 0 });

      gsap.to(innerWords, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cardRef.current, {
        x: 160,
        y: 40,
        opacity: 0,
        rotate: -24,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      // Card subtle floating loop after entrance settles
      gsap.to(cardRef.current, {
        y: "+=10",
        rotate: "-=1.2",
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 80% 20%, #F5F1EA 0%, #E8E2D8 60%, #DCD4C2 100%)",
      }}
      data-section="spotlight"
    >
      <NoiseOverlay opacity={0.04} />

      <div
        className="relative z-[2] mx-auto grid h-full min-h-screen max-w-[1500px] grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32"
      >
        <SpotlightText ref={textRef} />
        <div className="flex justify-center md:justify-end">
          <SpotlightCard ref={cardRef} />
        </div>
      </div>
    </section>
  );
}
