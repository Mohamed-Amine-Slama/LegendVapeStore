"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CAROUSEL_CARDS } from "@/constants/products";
import PillButton from "@/components/ui/PillButton";
import CarouselCard from "./CarouselCard";
import CarouselNavDots from "./CarouselNavDots";
import { useI18n } from "@/context/I18nContext";

const CARDS = CAROUSEL_CARDS;
const CARD_W = 420;
const GAP = 28;
const BLEED = 30;

export default function CarouselSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  const pairOffsets = useRef<number[]>([]);

  const [activeCards, setActiveCards] = useState<number[]>([0, 1]);

  const computeOffsets = () => {
    if (!containerRef.current) return [];
    const vw = window.innerWidth;
    // Read the actual rendered card width at runtime
    const firstCard = cardRefs.current.find(Boolean);
    const cardW = firstCard?.offsetWidth ?? CARD_W;
    const bleed = vw < 640 ? 12 : BLEED;
    const twoCardW = cardW * 2 + GAP;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerNaturalLeft = containerRect.left + window.scrollX;
    const desiredLeft = (vw - twoCardW) / 2 - bleed;
    
    const offsets = [];
    let currentOffset = desiredLeft - containerNaturalLeft;
    offsets.push(currentOffset);
    
    const totalPairs = Math.max(1, CARDS.length - 1);
    for (let i = 1; i < totalPairs; i++) {
       currentOffset -= (cardW + GAP);
       offsets.push(currentOffset);
    }
    
    pairOffsets.current = offsets;
    return offsets;
  };

  useEffect(() => {
    const onResize = () => {
      computeOffsets();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== CARDS.length) return;

    const offsets = computeOffsets();
    if (offsets.length === 0) return;
    const startOffset = offsets[0];

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { x: startOffset });
      cards.forEach((el, i) => {
        gsap.set(el, { rotate: CARDS[i].rotation });
      });

      gsap.from(eyebrowRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
      gsap.fromTo(
        containerRef.current,
        { x: startOffset + 120, opacity: 0 },
        {
          x: startOffset,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        },
      );
      gsap.from([btnRef.current, otherRef.current], {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      const numTransitions = offsets.length - 1;
      // Define total scroll amount proportional to number of transitions. 
      // original was "+=150%" for 1 transition.
      const endScroll = `+=${(numTransitions) * 150}%`;

      const snapPoints = Array.from({ length: numTransitions + 1 }, (_, i) => i / Math.max(1, numTransitions));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: endScroll,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.5 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            // activeCards calculation
            const progressPerStep = 1 / Math.max(1, numTransitions);
            const currentStep = Math.floor(p / progressPerStep);
            const remainder = p % progressPerStep;
            
            const nextStep = Math.min(numTransitions, currentStep + 1);
            
            if (remainder < progressPerStep * 0.4) {
              setActiveCards([currentStep, currentStep + 1]);
            } else if (remainder > progressPerStep * 0.6) {
              setActiveCards([nextStep, nextStep + 1]);
            } else {
               // showing 3 cards during transition
              setActiveCards([currentStep, currentStep + 1, currentStep + 2]);
            }
          },
        },
      });

      // Build the scrubbing timeline
      for (let i = 0; i < numTransitions; i++) {
         const startTime = i;
         const transitionDuration = 1;

         tl.to(containerRef.current, {
           x: offsets[i + 1],
           duration: transitionDuration,
           ease: "none",
         }, startTime);

         // Add rotation jiggle
         cards.forEach((card, cardIdx) => {
            // Target the visible cards mainly
            if (cardIdx >= i && cardIdx <= i + 2) {
               tl.to(card, {
                 rotate: CARDS[cardIdx].rotation + (Math.random() > 0.5 ? 4 : -4),
                 duration: 0.3 * transitionDuration,
                 ease: "power2.in",
               }, startTime);
               tl.to(card, {
                 rotate: CARDS[cardIdx].rotation,
                 duration: 0.7 * transitionDuration,
                 ease: "power2.out",
               }, startTime + 0.3 * transitionDuration);
            }
         });
      }

      cards.forEach((cardEl) => {
        const props = cardEl.querySelectorAll<HTMLElement>("[data-carousel-prop]");
        props.forEach((prop, idx) => {
          const dx = idx % 2 === 0 ? -8 : 6;
          const dy = idx % 2 === 0 ? -4 : 8;
          // Float props around relative to timeline steps
          for (let i = 0; i < numTransitions; i++) {
            tl.to(prop, { x: dx, y: dy, duration: 0.5, ease: "power2.out" }, i + 0.1);
            tl.to(prop, { x: 0, y: 0, duration: 0.4, ease: "power2.out" }, i + 0.6);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden"
      style={{
        height: "100vh",
        background: "#F0EDE8",
      }}
      data-section="carousel"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div
          ref={eyebrowRef}
          className="flex flex-col items-center gap-1 text-center"
        >
          <span
            className="font-ui font-medium uppercase"
            style={{ fontSize: 10, letterSpacing: "0.32em", color: "rgba(26,26,26,0.55)" }}
          >
            {t("carousel.eyebrow")}
          </span>
          <span
            className="display-tight text-bg-dark"
            style={{ fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 0.92 }}
          >
            {t("carousel.headline")}
          </span>
        </div>

        <div aria-hidden style={{ height: 16, flexShrink: 0 }} />

        <div
          ref={containerRef}
          className="flex items-center will-change-transform"
          style={{ gap: GAP, height: 540, flexShrink: 0 }}
        >
          {CARDS.map((card, i) => (
            <CarouselCard
              key={card.id}
              card={card}
              index={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        <div aria-hidden style={{ height: 14, flexShrink: 0 }} />

        <div className="flex flex-col items-center gap-2.5">
          <CarouselNavDots total={CARDS.length} activeCards={activeCards} />

          <div ref={btnRef}>
            <PillButton href="/shop" variant="gold" size="md" trailingIcon>
              {t("carousel.cta")}
            </PillButton>
          </div>

          <div ref={otherRef}>
            <a
              href="/shop"
              className="inline-flex items-center rounded-full border px-6 py-2 font-ui font-medium uppercase transition-all duration-250"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "rgba(26,26,26,0.45)",
                borderColor: "rgba(26,26,26,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1A1A1A";
                e.currentTarget.style.color = "#F0EDE8";
                e.currentTarget.style.borderColor = "#1A1A1A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(26,26,26,0.45)";
                e.currentTarget.style.borderColor = "rgba(26,26,26,0.3)";
              }}
            >
              {t("carousel.altLink")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
