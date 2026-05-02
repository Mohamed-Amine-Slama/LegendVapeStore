"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function PresentationSnap({ children }: { children: React.ReactNode }) {
  const snapWrapperRef = useRef<HTMLElement>(null);
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const childrenArray = React.Children.toArray(children);
  const currentPanelRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useLayoutEffect(() => {
    if (!snapWrapperRef.current || !snapContainerRef.current) return;
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      // 1. Initial Setup: all panels stacked, only first visible
      gsap.set(panels, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      });

      panels.forEach((panel, i) => {
        gsap.set(panel, {
          yPercent: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
          zIndex: panels.length - i,
        });
      });

      // 2. Panel Transition Logic
      const goToPanel = (targetIndex: number) => {
        if (isAnimatingRef.current || targetIndex === currentPanelRef.current) return;
        isAnimatingRef.current = true;

        const direction = targetIndex > currentPanelRef.current ? 1 : -1;
        const outgoing = panels[currentPanelRef.current];
        const incoming = panels[targetIndex];

        // Position incoming panel off-screen in direction of travel
        gsap.set(incoming, {
          yPercent: direction * 100,
          opacity: 0,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            currentPanelRef.current = targetIndex;
            isAnimatingRef.current = false;
          }
        });

        // Outgoing exits
        tl.to(outgoing, {
          yPercent: direction * -100,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.inOut',
        }, 0);

        // Incoming enters
        tl.to(incoming, {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.inOut',
        }, 0);
      };

      // 3. ScrollTrigger to drive transitions based on scroll progress
      ScrollTrigger.create({
        trigger: snapWrapperRef.current,
        start: 'top top',
        end: `+=${(panels.length - 1) * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.4, max: 0.7 },
          ease: 'power2.inOut',
          delay: 0.05,
        },
        onUpdate: (self) => {
          const targetIndex = Math.round(self.progress * (panels.length - 1));
          if (targetIndex !== currentPanelRef.current && !isAnimatingRef.current) {
            goToPanel(targetIndex);
          }
        },
      });

    }, snapWrapperRef);

    return () => ctx.revert();
  }, [childrenArray.length]);

  return (
    <section
      ref={snapWrapperRef}
      className="snap-zone w-full"
      style={{
        position: 'relative',
        height: "100vh",
        overflow: 'hidden',
      }}
    >
      <div
        ref={snapContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        {childrenArray.map((child, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
          >
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
