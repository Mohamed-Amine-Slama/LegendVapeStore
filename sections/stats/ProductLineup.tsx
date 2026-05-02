"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { HERO_PRODUCTS } from "@/constants/products";

const TILTS = [-6, 4, -3, 5, -4, 2];

export default function ProductLineup() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, scale: 0.8, y: 30 });
      gsap.to(items, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Continuous gentle hover float once landed
      items.forEach((el, i) => {
        gsap.to(el, {
          y: "+=8",
          duration: 3 + (i % 3) * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6 + i * 0.2,
        });
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="flex w-full flex-wrap items-end justify-center gap-x-1 gap-y-8 md:gap-x-2"
    >
      {HERO_PRODUCTS.map((p, i) => (
        <div
          key={p.src}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="relative will-change-transform"
          style={{
            width: "clamp(90px, 14vw, 150px)",
            height: "clamp(150px, 22vw, 250px)",
            transform: `rotate(${TILTS[i] ?? 0}deg)`,
            filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.18)) drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
          }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width: 768px) 24vw, 150px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
