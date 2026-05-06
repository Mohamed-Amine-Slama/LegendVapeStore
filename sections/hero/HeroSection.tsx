"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePreloaderContext } from "@/context/PreloaderContext";
import { HERO_CENTER_PRODUCT, HERO_BURST_PRODUCTS } from "@/constants/products";
import { useIsMobile } from "@/hooks/useMediaQuery";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import HeroProduct from "./HeroProduct";
import HeroCenterContent from "./HeroCenterContent";
import HeroScrollIndicator from "./HeroScrollIndicator";

/**
 * Maps viewport width to a uniform scale factor that's applied to all
 * burst x/y offsets AND product widths. Keeps the burst layout in-bounds
 * on small viewports.
 */
function viewportScale(vw: number): number {
  if (vw >= 1280) return 1;
  if (vw >= 1024) return 0.9;
  if (vw >= 768)  return 0.78;
  if (vw >= 480)  return 0.58;
  return 0.48;
}

/**
 * Hero — "The Burst Reveal".
 *
 * Phase 1 (0.1s → 1.1s): a single hero product zooms in from the dead
 *   center of the viewport, scaling 0.08 → 2.8 with heavy deceleration.
 *
 * Phase 2 (1.15s → 2.05s): the remaining 5 products spawn from the same
 *   center point (hidden behind the hero) and burst outward to their final
 *   resting positions, each on a unique x/y trajectory.
 *
 * Phase 3 (1.15s → 2.0s): the hero shrinks back to scale 1 and translates
 *   to its slightly-offset resting pose, simultaneously with the burst.
 *
 * Phase 4 (2.0s+): every product begins an independent floating sine loop.
 *
 * Phase 5: ghost headline + sticker banner + tagline + CTA stagger in
 *   between 1.9s and 2.35s (after the products have landed).
 *
 * Scroll: parallax is applied to OUTER wrappers; float is on INNER wrappers.
 * This separation prevents GSAP from fighting itself on scroll-back.
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  // Outer wrappers (parallax targets)
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const burstParallaxRefs = useRef<HTMLDivElement[]>([]);

  // Inner wrappers (burst/float/scale targets)
  const heroProductRef = useRef<HTMLDivElement>(null);
  const burstRefs = useRef<HTMLDivElement[]>([]);

  const centerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const { isDone } = usePreloaderContext();
  const isMobile = useIsMobile();

  // Snapshots isDone on first useLayoutEffect run for this Hero instance.
  // On a fresh page load, isDone flips false → true and the entrance plays
  // once. On client-side navigation back to / after visiting /shop, isDone
  // is already true on the new Hero mount — we skip the 3-second entrance
  // and place everything directly in its resting state.
  const initialIsDoneRef = useRef<boolean | null>(null);

  // Viewport-scaled multiplier for burst offsets + product widths.
  // Recomputed on resize so the layout adapts when rotating phone, etc.
  const [scale, setScale] = useState<number>(1);
  useEffect(() => {
    const compute = () => setScale(viewportScale(window.innerWidth));
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  // On mobile, drop the last burst products to reduce clutter.
  const visibleBurstProducts = isMobile
    ? HERO_BURST_PRODUCTS.slice(0, 3)
    : HERO_BURST_PRODUCTS;

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const heroInner = heroProductRef.current;
    const heroOuter = heroParallaxRef.current;
    const burstInners = burstRefs.current.filter(Boolean);
    const burstOuters = burstParallaxRefs.current.filter(Boolean);
    if (!heroInner || !heroOuter || !burstInners.length) return;

    // Snapshot whether isDone was already true on the FIRST useLayoutEffect
    // run for this Hero instance. If yes, this is a revisit (e.g. came back
    // from /shop) — skip the 3s burst entrance and place products in their
    // resting positions directly.
    if (initialIsDoneRef.current === null) {
      initialIsDoneRef.current = isDone;
    }
    const skipEntrance = initialIsDoneRef.current === true;

    const ctx = gsap.context(() => {
      // ─── REVISIT MODE — skip the entrance, jump to resting state ───────
      if (skipEntrance) {
        gsap.set(heroOuter, { xPercent: -50, yPercent: -50, zIndex: 20 });
        gsap.set(heroInner, {
          opacity: 1,
          scale: 1,
          x: HERO_CENTER_PRODUCT.finalX * scale,
          y: HERO_CENTER_PRODUCT.finalY * scale,
          rotate: HERO_CENTER_PRODUCT.rotate,
          transformOrigin: "center center",
        });
        burstOuters.forEach((outer) => {
          gsap.set(outer, { xPercent: -50, yPercent: -50, zIndex: 4 });
        });
        burstInners.forEach((inner, i) => {
          const cfg = visibleBurstProducts[i];
          if (!cfg) return;
          gsap.set(inner, {
            opacity: 1,
            scale: 1,
            x: cfg.burstX * scale,
            y: cfg.burstY * scale,
            rotate: cfg.rotate,
            transformOrigin: "center center",
          });
        });
        gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        gsap.set(bannerRef.current, { opacity: 1, x: 0, scale: 1 });
        gsap.set(taglineRef.current, { opacity: 1, y: 0 });
        gsap.set(btnRef.current, { opacity: 1, scale: 1 });
        gsap.set(ghostRef.current, { opacity: 1, scale: 1 });
      } else {
        // ─── INITIAL STATE — start hidden, wait for preloader ────────────
        gsap.set(heroOuter, { xPercent: -50, yPercent: -50, zIndex: 20 });
        gsap.set(heroInner, {
          opacity: 0,
          scale: 0.08,
          x: 0,
          y: 0,
          rotate: 0,
          transformOrigin: "center center",
        });
        burstOuters.forEach((outer) => {
          gsap.set(outer, { xPercent: -50, yPercent: -50, zIndex: 4 });
        });
        burstInners.forEach((inner) => {
          gsap.set(inner, {
            opacity: 0,
            scale: 0.3,
            x: 0,
            y: 0,
            rotate: 0,
            transformOrigin: "center center",
          });
        });
        gsap.set(eyebrowRef.current, { opacity: 0, y: -10 });
        gsap.set(bannerRef.current, { opacity: 0, x: 110, scale: 0.92 });
        gsap.set(taglineRef.current, { opacity: 0, y: 14 });
        gsap.set(btnRef.current, { opacity: 0, scale: 0.82 });
        gsap.set(ghostRef.current, { opacity: 0, scale: 1.06 });
      }

      // Wait for the preloader to clear before kicking off the burst.
      if (!isDone) return;

      // Float-loop start delay — staggered after the entrance on the very
      // first visit, immediate on revisits.
      const floatDelay = skipEntrance ? 0 : 2.1;

      // ─── PHASES 1–3 + 5 — entrance choreography (first visit only) ─────
      if (!skipEntrance) {
        // PHASE 1 — Hero zoom-in (0.1s → 1.1s)
        gsap.to(heroInner, {
          opacity: 1,
          scale: HERO_CENTER_PRODUCT.zoomScale, // 2.8
          duration: 1.0,
          ease: "power3.inOut",
          delay: 0.1,
        });

        // PHASE 2 — Burst outward (delay 1.15s, dur 0.9s)
        gsap.to(burstInners, {
          opacity: 1,
          scale: 1,
          x: (i: number) => (visibleBurstProducts[i]?.burstX ?? 0) * scale,
          y: (i: number) => (visibleBurstProducts[i]?.burstY ?? 0) * scale,
          rotate: (i: number) => visibleBurstProducts[i]?.rotate ?? 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 1.15,
        });

        // PHASE 3 — Hero shrinks to resting pose (delay 1.15s, dur 0.85s)
        gsap.to(heroInner, {
          scale: 1,
          x: HERO_CENTER_PRODUCT.finalX * scale,
          y: HERO_CENTER_PRODUCT.finalY * scale,
          rotate: HERO_CENTER_PRODUCT.rotate, // -6deg
          duration: 0.85,
          ease: "power2.inOut",
          delay: 1.15,
        });

        // PHASE 5 — Center content stagger
        gsap.to(ghostRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
          delay: 1.8,
        });
        gsap.to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.85,
        });
        gsap.to(bannerRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          delay: 1.9,
        });
        gsap.to(taglineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 2.1,
        });
        gsap.to(btnRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.6)",
          delay: 2.35,
        });
      }

      // ─── PHASE 4 — FLOATING LOOPS (always run; immediate on revisit) ──
      gsap.to(heroInner, {
        y: `+=10`,
        duration: HERO_CENTER_PRODUCT.floatDuration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: floatDelay,
      });

      burstInners.forEach((el, i) => {
        const cfg = visibleBurstProducts[i];
        if (!cfg) return;
        gsap.to(el, {
          y: `+=8`,
          rotate: `+=${i % 2 === 0 ? 1.2 : -1.2}`,
          duration: cfg.floatDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: floatDelay + i * 0.3,
        });
      });

      // ─── PARALLAX ON SCROLL (applied to OUTER wrappers) ────────────────
      // Each burst product travels at its own rate on its outer wrapper,
      // completely independent from the float tween on the inner wrapper.
      burstOuters.forEach((el, i) => {
        const travel = visibleBurstProducts[i]?.parallaxY ?? 0;
        gsap.to(el, {
          y: travel,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });
      });

      // Hero: slower travel for depth illusion.
      gsap.to(heroOuter, {
        y: HERO_CENTER_PRODUCT.parallaxY,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // Center content: slowest of all.
      gsap.to(centerRef.current, {
        y: 45,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      ScrollTrigger.refresh();
    }, heroRef);

    return () => ctx.revert();
  }, [isDone, isMobile, visibleBurstProducts, scale]);

  return (
    <section
      ref={heroRef}
      className="relative isolate h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #F5F1EA 0%, #EAE3D5 60%, #DDD3C0 100%)",
      }}
      data-section="hero"
    >
      <NoiseOverlay opacity={0.05} />

      {/* Ambient gold halo behind center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(900px, 90vw)",
          height: "min(900px, 90vw)",
          background:
            "radial-gradient(circle, rgba(200,169,110,0.20) 0%, rgba(200,169,110,0) 65%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      {/* The HERO product (zooms in from center) */}
      <HeroProduct
        ref={heroParallaxRef}
        innerRef={heroProductRef}
        src={HERO_CENTER_PRODUCT.src}
        alt={HERO_CENTER_PRODUCT.alt}
        width={Math.round(HERO_CENTER_PRODUCT.width * scale)}
        zIndex={20}
        priority
      />

      {/* The 5 burst products (spawn from center, fly outward) */}
      {visibleBurstProducts.map((product, i) => (
        <HeroProduct
          key={`burst-${i}-${product.src}`}
          ref={(el) => {
            if (el) burstParallaxRefs.current[i] = el;
          }}
          innerRef={(el) => {
            if (el) burstRefs.current[i] = el;
          }}
          src={product.src}
          alt={product.alt}
          width={Math.round(product.width * scale)}
          zIndex={4}
          index={i}
          priority={i < 2}
        />
      ))}

      <HeroCenterContent
        ref={centerRef}
        eyebrowRef={eyebrowRef}
        bannerRef={bannerRef}
        taglineRef={taglineRef}
        btnRef={btnRef}
        ghostRef={ghostRef}
      />

      <HeroScrollIndicator />
    </section>
  );
}
