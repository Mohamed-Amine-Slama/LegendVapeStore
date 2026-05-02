"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { NavItem } from "@/types/navigation";

interface NavLinkProps extends NavItem {
  onClick?: () => void;
}

export default function NavLink({ label, href, onClick }: NavLinkProps) {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const enter = () => {
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
  };
  const leave = () => {
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(arrowRef.current, { x: -16, opacity: 0, duration: 0.25, ease: "power2.in" });
  };

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="group relative inline-flex items-center gap-6 font-display uppercase leading-[0.92] text-bg-light transition-colors duration-300 hover:text-accent"
      style={{ fontSize: "clamp(56px, 9vw, 112px)", letterSpacing: "0.005em" }}
    >
      {label}
      <span
        ref={arrowRef}
        aria-hidden
        className="inline-block text-accent"
        style={{ fontSize: "0.5em", opacity: 0, transform: "translateX(-16px)" }}
      >
        →
      </span>
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </a>
  );
}
