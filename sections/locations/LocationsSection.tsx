"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type StoreLocation = {
  id: string;
  name: string;
  tag: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
};

// TODO(client): Replace with the three real addresses + coordinates.
// To get coordinates: open the address in Google Maps → right-click the pin →
// click the "lat, lng" pair at the top of the menu (it copies to clipboard).
// For a richer pin you can swap `buildEmbedUrl()` for a /maps/embed?pb=... URL
// from Google Maps → Share → Embed map → Copy HTML (extract the src).
const LOCATIONS: StoreLocation[] = [
  {
    id: "sousse-flagship",
    name: "Legend Vape Store",
    tag: "Flagship",
    address: "RHPW+FG6, Yasser Arafat Ave",
    city: "Sousse",
    phone: "+216 00 000 000",
    hours: "Mon–Sat · 09:00 — 22:00",
    lat: 35.8288,
    lng: 10.6133,
  },
  {
    id: "k-west",
    name: "Kwest Vape Store K-west",
    tag: "Boutique",
    address: "Av. Hassen Ibn Saïd",
    city: "Sousse 4054",
    phone: "+216 00 000 000",
    hours: "Mon–Sat · 09:00 — 22:00",
    lat: 35.8368,
    lng: 10.6038,
  },
  {
    id: "we-vape",
    name: "We Vape Store",
    tag: "Boutique",
    address: "Av. Charles De Gaulle",
    city: "Sousse 4031",
    phone: "+216 00 000 000",
    hours: "Mon–Sat · 09:00 — 22:00",
    lat: 35.8354,
    lng: 10.6272,
  },
];

function buildEmbedUrl(loc: StoreLocation): string {
  return `https://www.google.com/maps?q=${loc.lat},${loc.lng}&hl=en&z=16&output=embed`;
}

function buildDirectionsUrl(loc: StoreLocation): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
}

export default function LocationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!cardsRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current!.querySelectorAll(".loc-card");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.12,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-light"
      style={{ padding: "clamp(72px, 10vw, 120px) 0" }}
      data-section="locations"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-12">
        <div className="mb-12 flex flex-col items-start gap-6 sm:mb-14 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <span className="font-ui text-accent mb-3 block text-[11px] uppercase tracking-[0.34em]">
              Where to find us
            </span>
            <h2 className="display-tight text-bg-dark text-[clamp(40px,7vw,86px)]">
              STEP INSIDE THE <span className="text-accent">LEGEND</span>
            </h2>
          </div>
          <p className="font-serif text-bg-dark/65 max-w-[420px] text-[15px] italic leading-relaxed">
            Three boutiques. Every device, every refill — inspected, displayed, ready
            to vape.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {LOCATIONS.map((loc) => (
            <article
              key={loc.id}
              className="loc-card group relative flex flex-col overflow-hidden bg-white transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5"
              style={{
                borderRadius: 18,
                boxShadow: "0 2px 24px rgba(26,26,26,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 18px 40px rgba(26,26,26,0.13)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 24px rgba(26,26,26,0.07)";
              }}
            >
              <div className="relative" style={{ height: 240 }}>
                <iframe
                  src={buildEmbedUrl(loc)}
                  title={`${loc.name} — map`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
                <span
                  className="font-ui pointer-events-none absolute z-[2] font-bold uppercase"
                  style={{
                    top: 14,
                    left: 14,
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    padding: "5px 11px",
                    borderRadius: 9999,
                    background: "#1A1A1A",
                    color: "#F0EDE8",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
                  }}
                >
                  {loc.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 px-6 py-5">
                <h3 className="font-oswald text-bg-dark text-[22px] font-semibold leading-tight">
                  {loc.name}
                </h3>
                <div className="font-ui text-bg-dark/70 text-[13px] leading-relaxed">
                  {loc.address}
                  <br />
                  {loc.city}
                </div>
                <div className="font-ui flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
                  <a
                    href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                    className="text-bg-dark/80 hover:text-accent transition-colors"
                  >
                    {loc.phone}
                  </a>
                  <span className="text-bg-dark/55">{loc.hours}</span>
                </div>
                <a
                  href={buildDirectionsUrl(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui group/cta text-bg-dark hover:text-accent mt-auto inline-flex items-center gap-1.5 self-start pt-2 text-[12px] font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  Get directions
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform group-hover/cta:translate-x-0.5"
                    aria-hidden
                  >
                    <line x1="2" y1="6.5" x2="11" y2="6.5" />
                    <polyline points="7 2.5 11 6.5 7 10.5" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
