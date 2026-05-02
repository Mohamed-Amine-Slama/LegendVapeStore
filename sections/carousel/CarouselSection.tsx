"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CAROUSEL_CARDS } from "@/constants/products";
import PillButton from "@/components/ui/PillButton";
import CarouselCard from "./CarouselCard";
import CarouselNavDots from "./CarouselNavDots";

const CARDS = CAROUSEL_CARDS;
const CARD_W = 420;
const GAP = 28;
const BLEED = 30;

export default function CarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  const pairOffsets = useRef<{ pair0: number; pair1: number }>({ pair0: 0, pair1: 0 });

  const [activeCards, setActiveCards] = useState<number[]>([0, 1]);

  const computeOffsets = () => {
    if (!containerRef.current) return { pair0: 0, pair1: 0 };
    const vw = window.innerWidth;
    const twoCardW = CARD_W * 2 + GAP;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerNaturalLeft = containerRect.left + window.scrollX;
    const desiredLeft = (vw - twoCardW) / 2 - BLEED;
    const pair0 = desiredLeft - containerNaturalLeft;
    const pair1 = pair0 - (CARD_W + GAP);
    pairOffsets.current = { pair0, pair1 };
    return { pair0, pair1 };
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

    const { pair0, pair1 } = computeOffsets();

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { x: pair0 });
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
        { x: pair0 + 120, opacity: 0 },
        {
          x: pair0,
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          snap: {
            snapTo: [0, 1],
            duration: { min: 0.2, max: 0.5 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.4) {
              setActiveCards([0, 1]);
            } else if (p > 0.6) {
              setActiveCards([1, 2]);
            } else {
              setActiveCards([0, 1, 2]);
            }
          },
        },
      });

      tl.to(containerRef.current, {
        x: pair1,
        duration: 1,
        ease: "none",
      }, 0);

      tl.to(cards[0], {
        rotate: -10,
        duration: 0.3,
        ease: "power2.in",
      }, 0);
      tl.to(cards[1], {
        rotate: 9,
        duration: 0.3,
        ease: "power2.in",
      }, 0);
      tl.to(cards[2], {
        rotate: -8,
        duration: 0.3,
        ease: "power2.in",
      }, 0);

      tl.to(cards[0], {
        rotate: -6,
        duration: 0.3,
        ease: "power2.out",
      }, 0.7);
      tl.to(cards[1], {
        rotate: 5,
        duration: 0.3,
        ease: "power2.out",
      }, 0.7);
      tl.to(cards[2], {
        rotate: -4,
        duration: 0.3,
        ease: "power2.out",
      }, 0.7);

      cards.forEach((cardEl) => {
        const props = cardEl.querySelectorAll<HTMLElement>("[data-carousel-prop]");
        props.forEach((prop, idx) => {
          const dx = idx % 2 === 0 ? -8 : 6;
          const dy = idx % 2 === 0 ? -4 : 8;
          tl.to(prop, { x: dx, y: dy, duration: 0.5, ease: "power2.out" }, 0.1);
          tl.to(prop, { x: 0, y: 0, duration: 0.4, ease: "power2.out" }, 0.6);
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
            The Flavor Legend Vape Store · 03
          </span>
          <span
            className="display-tight text-bg-dark"
            style={{ fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 0.92 }}
          >
            Pick your draw
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
              Get it now
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
              Other flavors
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
