"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useI18n } from "@/context/I18nContext";

/**
 * "The La Maison Des Vapes Breach" Cinematic Transition.
 * 
 * 1. Three heavy horizontal black slabs slam into the screen from alternating sides.
 * 2. A subtle gold flash fires as the doors lock.
 * 3. Kinetic typography ("UNCOMPROMISING EXCELLENCE") slides into the center.
 * 4. The typography scales massively while an expanding SVG/CSS mask (a "hole")
 *    eats through the entire black screen, revealing the Manifesto underneath 
 *    in a dramatic 3D plunging effect.
 */
export default function HeroCurtainWipe() {
  const { t } = useI18n();
  const triggerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // The three staggered shutter strips
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);
  const strip3Ref = useRef<HTMLDivElement>(null);
  
  // The impact flash
  const flashRef = useRef<HTMLDivElement>(null);
  
  // Typography
  const textWrapRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!triggerRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const wrap = wrapperRef.current;
      const strip1 = strip1Ref.current;
      const strip2 = strip2Ref.current;
      const strip3 = strip3Ref.current;
      const flash = flashRef.current;
      const textWrap = textWrapRef.current;
      const text1 = text1Ref.current;
      const text2 = text2Ref.current;
      const subtext = subtextRef.current;

      // ─── INITIAL STATE ─────────────────────────────────────────────────
      gsap.set(wrap, { "--hole-size": "0%" }); // The mask hole starts completely closed
      
      // Strips start off-screen
      gsap.set(strip1, { xPercent: -100 });
      gsap.set(strip2, { xPercent: 100 });
      gsap.set(strip3, { xPercent: -100 });
      
      // Typography starts hidden via overflow-hidden wrappers
      gsap.set(text1, { yPercent: 100 });
      gsap.set(text2, { yPercent: -100 });
      gsap.set(subtext, { opacity: 0, y: 20 });
      
      // Flash starts invisible
      gsap.set(flash, { opacity: 0 });


      // ─── THE TIMELINE ─────────────────────────────────────────────────
      // We use a massive 200vh scroll trigger spacer to give this luxury animation time to breathe.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8, // Slightly lower scrub for snappier response
          invalidateOnRefresh: true,
        },
      });

      // 1. The Lockdown: Strips slam shut (0% - 20%)
      tl.to([strip1, strip2, strip3], { 
        xPercent: 0, 
        duration: 0.2, 
        stagger: 0.05, 
        ease: "power3.inOut" 
      }, 0);

      // 2. The Impact Flash (20% - 25%)
      tl.to(flash, { opacity: 0.8, duration: 0.02 }, 0.2);
      tl.to(flash, { opacity: 0, duration: 0.08 }, 0.22);

      // 3. The Stamp: Typography drops/rises into place (25% - 40%)
      tl.to(text1, { yPercent: 0, duration: 0.15, ease: "power3.out" }, 0.25);
      tl.to(text2, { yPercent: 0, duration: 0.15, ease: "power3.out" }, 0.25);
      tl.to(subtext, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.3);

      // 4. The Hold: Slight tracking scale (40% - 65%)
      tl.to(textWrap, { scale: 1.08, duration: 0.25, ease: "none" }, 0.4);

      // 5. The Breach: Hole expands & Text flies into the camera (65% - 100%)
      // Text flies at the camera and fades
      tl.to(textWrap, { 
        scale: 5, 
        opacity: 0, 
        duration: 0.35, 
        ease: "power3.in" 
      }, 0.65);
      
      // The mask hole expands to 120% (covering the screen corners), making the fixed layer transparent
      tl.to(wrap, { 
        "--hole-size": "120%", 
        duration: 0.35, 
        ease: "power3.in" 
      }, 0.65);

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 200vh spacer forces the user to scrub the transition */}
      <div ref={triggerRef} className="w-full h-[200vh]" aria-hidden />

      {/* The Transition Overlay */}
      <div 
        ref={wrapperRef} 
        className="fixed inset-0 z-[500] pointer-events-none overflow-hidden"
        style={{
          // We apply the CSS radial mask here. GSAP animates the --hole-size variable.
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent var(--hole-size), black calc(var(--hole-size) + 1px))",
          maskImage: "radial-gradient(circle at 50% 50%, transparent var(--hole-size), black calc(var(--hole-size) + 1px))"
        }}
      >
        
        {/* Layer 1: The Three Shutter Strips */}
        <div ref={strip1Ref} className="absolute top-0 left-0 w-full h-[33.4vh] bg-bg-night" />
        <div ref={strip2Ref} className="absolute top-[33.3vh] left-0 w-full h-[33.4vh] bg-bg-night" />
        <div ref={strip3Ref} className="absolute top-[66.6vh] left-0 w-full h-[33.4vh] bg-bg-night" />

        {/* Layer 2: The Impact Flash */}
        <div ref={flashRef} className="absolute inset-0 bg-accent mix-blend-overlay" />

        {/* Layer 3: Kinetic Typography */}
        <div ref={textWrapRef} className="absolute inset-0 flex flex-col items-center justify-center text-center">
          
          <div className="overflow-hidden">
            <h2 
              ref={text1Ref} 
              className="display-tight text-accent" 
              style={{ fontSize: "clamp(48px, 9vw, 150px)", lineHeight: 0.85 }}
            >
              {t("curtain.line1")}
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <h2 
              ref={text2Ref} 
              className="display-tight text-bg-light" 
              style={{ fontSize: "clamp(48px, 9vw, 150px)", lineHeight: 0.85 }}
            >
              {t("curtain.line2")}
            </h2>
          </div>
          
          <div className="overflow-hidden mt-6">
            <p 
              ref={subtextRef} 
              className="font-ui font-medium uppercase" 
              style={{ fontSize: 13, letterSpacing: "0.4em", color: "rgba(240,237,232,0.6)" }}
            >
              {t("curtain.subtext")}
            </p>
          </div>

        </div>

      </div>
    </>
  );
}
