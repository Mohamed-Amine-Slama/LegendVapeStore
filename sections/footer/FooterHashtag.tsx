"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const TEXT = "#VAPEWITHLEGEND VAPE STORE";

export default function FooterHashtag() {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll<HTMLElement>("[data-char]");
    const ctx = gsap.context(() => {
      gsap.from(chars, {
        y: -90,
        opacity: 0,
        rotate: (i) => (i % 2 === 0 ? -8 : 8),
        duration: 0.85,
        ease: "bounce.out",
        stagger: 0.035,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex flex-col items-center px-4 text-center">
      <span
        className="font-ui font-medium uppercase"
        style={{
          fontSize: 11,
          letterSpacing: "0.34em",
          color: "rgba(240,237,232,0.5)",
          paddingTop: "clamp(48px, 7vh, 100px)",
        }}
      >
        Join the Legend Vape Store community
      </span>
      <h2
        ref={ref}
        className="mt-5 flex flex-wrap justify-center display-tight text-bg-light"
        style={{
          fontSize: "clamp(34px, 9vw, 160px)",
          lineHeight: 0.92,
          maxWidth: "100%",
        }}
      >
        {TEXT.split("").map((c, i) => (
          <span
            key={i}
            data-char
            className="inline-block will-change-transform"
            style={c === " " ? { width: "0.32em" } : undefined}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </h2>
    </div>
  );
}
