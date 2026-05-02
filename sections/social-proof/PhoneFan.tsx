"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import PhoneMockup from "./PhoneMockup";

const PHONES = [
  { src: "/social/phone-1.png", alt: "Customer 1 holding device" },
  { src: "/social/phone-2.png", alt: "Customer 2 holding device" },
  { src: "/social/phone-3.png", alt: "Customer 3 holding device" },
  { src: "/social/phone-4.png", alt: "Customer 4 holding device" },
];

interface FanLayout {
  count: 3 | 4;
  width: number;        // phone width in px
  rotations: number[];
  xOffsets: string[];
  yOffsets: number[];
  containerHeight: number;
}

/** Picks a phone-fan layout sized for the current viewport. */
function pickLayout(vw: number): FanLayout {
  if (vw >= 1024) {
    return {
      count: 4,
      width: 280,
      rotations: [-22, -10, 4, 16],
      xOffsets: ["0%", "16%", "32%", "48%"],
      yOffsets: [0, -16, -8, -22],
      containerHeight: 700,
    };
  }
  if (vw >= 768) {
    return {
      count: 4,
      width: 220,
      rotations: [-20, -8, 6, 18],
      xOffsets: ["0%", "20%", "40%", "60%"],
      yOffsets: [0, -12, -8, -18],
      containerHeight: 580,
    };
  }
  if (vw >= 480) {
    return {
      count: 3,
      width: 180,
      rotations: [-16, -2, 14],
      xOffsets: ["0%", "30%", "60%"],
      yOffsets: [0, -10, -16],
      containerHeight: 480,
    };
  }
  return {
    count: 3,
    width: 140,
    rotations: [-14, 0, 14],
    xOffsets: ["0%", "32%", "62%"],
    yOffsets: [0, -8, -14],
    containerHeight: 380,
  };
}

export default function PhoneFan() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [layout, setLayout] = useState<FanLayout>(() => pickLayout(1280));

  // Track viewport changes so the fan re-lays itself out on resize.
  useEffect(() => {
    const compute = () => setLayout(pickLayout(window.innerWidth));
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  const visiblePhones = PHONES.slice(0, layout.count);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    const phones = phoneRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!phones.length) return;

    const ctx = gsap.context(() => {
      gsap.set(phones, { opacity: 0, scale: 0.7, x: 0, y: 0, rotate: 0 });
      gsap.to(phones, {
        opacity: 1,
        scale: 1,
        x: (i: number) => layout.xOffsets[i],
        y: (i: number) => layout.yOffsets[i],
        rotate: (i: number) => layout.rotations[i],
        duration: 0.85,
        ease: "back.out(1.6)",
        stagger: 0.13,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtle continuous tilt loop after settle
      phones.forEach((el, i) => {
        gsap.to(el, {
          y: `+=${i % 2 === 0 ? 6 : -6}`,
          rotate: `+=${i % 2 === 0 ? 1.2 : -1.2}`,
          duration: 4 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6 + i * 0.2,
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [layout]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ height: layout.containerHeight }}
    >
      {visiblePhones.map((phone, i) => (
        <PhoneMockup
          key={`${phone.src}-${layout.count}`}
          ref={(el) => {
            phoneRefs.current[i] = el;
          }}
          src={phone.src}
          alt={phone.alt}
          zIndex={i + 1}
          width={layout.width}
        />
      ))}
    </div>
  );
}
