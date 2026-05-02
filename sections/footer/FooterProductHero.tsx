"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function FooterProductHero() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 80,
        opacity: 0,
        scale: 0.82,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      // Idle float
      gsap.to(ref.current, {
        y: "+=14",
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative mx-auto my-12 flex justify-center">
      {/* Backlit glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(640px, 80vw)",
          height: "min(640px, 80vw)",
          background:
            "radial-gradient(circle, rgba(200,169,110,0.28) 0%, rgba(200,169,110,0.08) 35%, rgba(0,0,0,0) 65%)",
          filter: "blur(16px)",
        }}
      />

      <div
        ref={ref}
        className="relative"
        style={{
          width: "clamp(220px, 32vw, 440px)",
          height: "clamp(280px, 42vw, 580px)",
          filter:
            "drop-shadow(0 30px 50px rgba(0,0,0,0.55)) drop-shadow(0 12px 18px rgba(0,0,0,0.35))",
        }}
      >
        <Image
          src="/footer/product-hero-3d.png"
          alt="LEGEND VAPE STORE premium device with vapor"
          fill
          sizes="(max-width: 768px) 80vw, 440px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
