"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { CarouselCard as CarouselCardType } from "@/types/carousel";
import { cn } from "@/lib/cn";

interface CarouselCardProps {
  card: CarouselCardType;
  index: number;
}

/**
 * One flavor card. 420×540, fixed dimensions, permanent tilt.
 *
 * Layout:
 *   - Scattered flavor props (3) at corner positions
 *   - Centered product device, counter-tilted within card
 *   - Bottom-left flavor name (Bebas Neue 28px white) + descriptor
 *   - Bottom-right gold circular ml badge (40px)
 */
const CarouselCard = forwardRef<HTMLDivElement, CarouselCardProps>(function CarouselCard(
  { card, index },
  ref,
) {
  return (
    <div
      ref={ref}
      data-carousel-card={index}
      className={cn(
        "relative flex-shrink-0 overflow-hidden will-change-transform",
        "card-edge gloss-overlay",
      )}
      style={{
        width: 420,
        height: 540,
        borderRadius: 20,
        background: card.background,
        transform: `rotate(${card.rotation}deg)`,
      }}
    >
      {/* Subtle inner frame for premium feel */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-[14px]"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      />

      {/* Scattered flavor props */}
      {card.props.map((p, i) => (
        <div
          key={i}
          data-carousel-prop={i}
          className="absolute will-change-transform"
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
            width: p.width,
            height: p.width,
            transform: `rotate(${p.rotate}deg)`,
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.35))",
          }}
        >
          <Image src={p.src} alt="" fill sizes="120px" className="object-contain" />
        </div>
      ))}

      {/* Centered product device — counter-tilted within the card */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          height: "85%",
          aspectRatio: "120 / 200",
          transform: `translate(-50%, -50%) rotate(${card.productRotation}deg)`,
          filter: "drop-shadow(0 28px 36px rgba(0,0,0,0.4))",
        }}
      >
        <Image
          src={card.productSrc}
          alt={card.flavorName}
          fill
          sizes="(max-width: 768px) 60vw, 280px"
          className="object-contain"
        />
      </div>

      {/* Bottom-left flavor name + descriptor */}
      <div
        className="absolute z-[3]"
        style={{ bottom: 22, left: 20, color: "#FFFFFF" }}
      >
        <h3
          className="display-tight"
          style={{
            fontSize: 28,
            lineHeight: 0.92,
            letterSpacing: "0.005em",
          }}
        >
          {card.flavorName}
        </h3>
        <p
          className="mt-1.5 font-ui font-medium uppercase"
          style={{
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {card.nicotineLabel}
        </p>
      </div>

      {/* Bottom-right gold ml badge */}
      <div
        className="absolute z-[3] flex items-center justify-center font-ui sticker-shadow-sm"
        style={{
          bottom: 28,
          right: 18,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: card.badgeColor ?? "rgba(200,169,110,0.92)",
          color: "#1A1A1A",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        {card.mlLabel}
      </div>
    </div>
  );
});

export default CarouselCard;
