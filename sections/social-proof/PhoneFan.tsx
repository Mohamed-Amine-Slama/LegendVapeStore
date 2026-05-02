"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import PhoneMockup from "./PhoneMockup";

const PHONES = [
  { src: "/social/phone-1.svg", alt: "Customer 1 holding device" },
  { src: "/social/phone-2.svg", alt: "Customer 2 holding device" },
  { src: "/social/phone-3.svg", alt: "Customer 3 holding device" },
  { src: "/social/phone-4.svg", alt: "Customer 4 holding device" },
];

const ROTATIONS = [-22, -10, 4, 16];
const X_OFFSETS = ["0%", "16%", "32%", "48%"];
const Y_OFFSETS = [0, -16, -8, -22];

export default function PhoneFan() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    const phones = phoneRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      gsap.set(phones, { opacity: 0, scale: 0.7, x: 0, y: 0, rotate: 0 });
      gsap.to(phones, {
        opacity: 1,
        scale: 1,
        x: (i: number) => X_OFFSETS[i],
        y: (i: number) => Y_OFFSETS[i],
        rotate: (i: number) => ROTATIONS[i],
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
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[560px] w-full">
      {PHONES.map((phone, i) => (
        <PhoneMockup
          key={phone.src}
          ref={(el) => {
            phoneRefs.current[i] = el;
          }}
          src={phone.src}
          alt={phone.alt}
          zIndex={i + 1}
        />
      ))}
    </div>
  );
}
