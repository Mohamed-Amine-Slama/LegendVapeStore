import type { HeroProduct, HeroCenterProduct, HeroBurstProduct } from "@/types/product";
import type { CarouselCard } from "@/types/carousel";

/**
 * Legacy product list used by Stats / ProductLineup (still rendered as a
 * horizontal lineup). Hero section uses HERO_CENTER_PRODUCT and
 * HERO_BURST_PRODUCTS below for the burst-reveal sequence.
 */
export const HERO_PRODUCTS: HeroProduct[] = [
  {
    src: "/products/device-slim-gold.png",
    alt: "Slim vape pen, gold colorway",
    top: "16%",
    left: "6%",
    rotate: -28,
    width: 155,
    floatDuration: 3.2,
    parallaxY: -80,
  },
  {
    src: "/products/device-pod-red.png",
    alt: "Pod device, burgundy red",
    top: "8%",
    right: "20%",
    rotate: 18,
    width: 115,
    floatDuration: 4.1,
    parallaxY: -40,
  },
  {
    src: "/products/device-boxmod-black.png",
    alt: "Box mod, matte black",
    bottom: "18%",
    left: "18%",
    rotate: 12,
    width: 175,
    floatDuration: 5.0,
    parallaxY: 65,
  },
  {
    src: "/products/device-disposable-teal.png",
    alt: "Disposable vape, teal",
    top: "55%",
    right: "8%",
    rotate: -14,
    width: 135,
    floatDuration: 3.7,
    parallaxY: -100,
  },
  {
    src: "/products/device-podpack.png",
    alt: "Pod pack flat lay",
    bottom: "12%",
    right: "26%",
    rotate: 22,
    width: 145,
    floatDuration: 4.5,
    parallaxY: 35,
  },
  {
    src: "/products/device-refill.png",
    alt: "Refill pod, translucent",
    top: "38%",
    left: "44%",
    rotate: -6,
    width: 95,
    floatDuration: 2.8,
    parallaxY: -60,
  },
];

/**
 * The single hero product that zooms in from dead center and shrinks back
 * down to its resting pose just left-of-center.
 *  - Phase 1 (zoom-in): scale 0.08 → 2.8 over 1.0s
 *  - Phase 3 (shrink-and-settle): scale → 1, x→-20, y→10 over 0.85s
 */
export const HERO_CENTER_PRODUCT: HeroCenterProduct = {
  src: "/products/device-slim-gold.png",
  alt: "LEGEND VAPE STORE slim gold — hero device",
  rotate: -6,
  width: 155,
  floatDuration: 3.2,
  parallaxY: -30,
  finalX: -20,
  finalY: 10,
  zoomScale: 2.8,
};

/**
 * Five products that spawn from the same center point (hidden behind the
 * hero) and burst outward to their final resting positions. Each entry
 * defines its final translateX/translateY pixel offsets from screen center.
 * Index order is critical — it drives the stagger and final placement.
 */
export const HERO_BURST_PRODUCTS: HeroBurstProduct[] = [
  {
    src: "/products/device-pod-red.png",
    alt: "Pod device, burgundy red",
    rotate: 18,
    width: 115,
    floatDuration: 4.1,
    parallaxY: -40,
    burstX: -340,
    burstY: -190,
  },
  {
    src: "/products/device-boxmod-black.png",
    alt: "Box mod, matte black",
    rotate: 12,
    width: 175,
    floatDuration: 5.0,
    parallaxY: 65,
    burstX: 280,
    burstY: -150,
  },
  {
    src: "/products/device-disposable-teal.png",
    alt: "Disposable vape, teal",
    rotate: -14,
    width: 135,
    floatDuration: 3.7,
    parallaxY: -100,
    burstX: -260,
    burstY: 160,
  },
  {
    src: "/products/device-podpack.png",
    alt: "Pod pack flat lay",
    rotate: 22,
    width: 145,
    floatDuration: 4.5,
    parallaxY: 35,
    burstX: 310,
    burstY: 120,
  },
  {
    src: "/products/device-slim-gold.png",
    alt: "Slim vape pen, gold colorway — variant",
    rotate: -28,
    width: 140,
    floatDuration: 3.9,
    parallaxY: -60,
    burstX: -180,
    burstY: -200,
  },
  // ── New real-photo products ─────────────────────────────────────────
  // Positions fill the previously-empty zones of the burst layout:
  // top-center (NexBar), far-right-mid (Nexbar2), bottom-mid-right (Vozol).
  {
    src: "/products/NexBar.png",
    alt: "NexBar disposable",
    rotate: -3,
    width: 115,
    floatDuration: 4.4,
    parallaxY: -55,
    burstX: 40,
    burstY: -270,
  },
  {
    src: "/products/Nexbar2.png",
    alt: "NexBar 2 — premium variant",
    rotate: -22,
    width: 110,
    floatDuration: 4.7,
    parallaxY: 25,
    burstX: 390,
    burstY: 30,
  },
  {
    src: "/products/Vozol50K.png",
    alt: "Vozol 50K — high-puff disposable",
    rotate: 6,
    width: 130,
    floatDuration: 3.6,
    parallaxY: 80,
    burstX: 140,
    burstY: 240,
  },
];

/**
 * Carousel — three flavor cards laid out side-by-side. Two cards are visible
 * at any time, with the pair sliding horizontally on scroll. Each card has
 * a permanent tilt, scattered flavor props, and a bottom-left text block.
 *
 * Per Section7.md.
 */
export const CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: 0,
    flavorName: "WOTOFO NEXBAR 20K",
    descriptor: "Premium disposable, 20,000 puffs of pure flavor.",
    nicotineLabel: "20MG NIC SALT",
    mlLabel: "24ml",
    background: "#E8463A",
    rotation: -6,
    productSrc: "/products/Nexbar2.png",
    productRotation: -12,
    props: [
      { src: "/props/strawberry-1.png", width: 80, top: "12%", left: "8%", rotate: -20 },
      { src: "/props/strawberry-2.png", width: 64, top: "20%", right: "10%", rotate: 14 },
      { src: "/props/strawberry-3.png", width: 52, bottom: "28%", right: "6%", rotate: -8 },
    ],
  },
  {
    id: 1,
    flavorName: "VOZOL GEAR 50000",
    descriptor: "The ultimate long-lasting disposable experience.",
    nicotineLabel: "20MG NIC SALT",
    mlLabel: "30ml",
    background: "#A8D4E6",
    rotation: 5,
    productSrc: "/products/Vozol50K.png",
    productRotation: 8,
    props: [
      { src: "/props/cookie-1.png", width: 72, top: "10%", right: "12%", rotate: 22 },
      { src: "/props/cookie-2.png", width: 58, top: "26%", left: "8%", rotate: -15 },
      { src: "/props/cookie-3.png", width: 48, bottom: "30%", left: "14%", rotate: 10 },
    ],
  },
  {
    id: 2,
    flavorName: "WOTOFO NEXBAR 18K",
    descriptor: "Compact, punchy, and incredibly satisfying over 18k puffs.",
    nicotineLabel: "20MG NIC SALT",
    mlLabel: "20ml",
    background: "#C8A96E",
    rotation: -4,
    productSrc: "/products/NexBar.png",
    productRotation: -8,
    badgeColor: "#1A1A1A",
    props: [
      { src: "/props/chocolate-1.png", width: 66, top: "14%", left: "10%", rotate: -18 },
      { src: "/props/chocolate-1.png", width: 54, top: "22%", right: "8%", rotate: 12 },
      { src: "/props/chocolate-1.png", width: 60, bottom: "26%", right: "12%", rotate: -6 },
    ],
  },
  {
    id: 3,
    flavorName: "RAGNAROK X 50ML",
    descriptor: "Intense red fruits. Shortfill 50ml by A&L Ultimate.",
    nicotineLabel: "0MG NIC",
    mlLabel: "50ml",
    background: "#A52A40",
    rotation: 7,
    productSrc: "/products/device-refill.png",
    productRotation: 10,
    props: [
      { src: "/props/strawberry-1.png", width: 60, top: "15%", right: "8%", rotate: 25 },
      { src: "/props/strawberry-2.png", width: 70, bottom: "35%", left: "12%", rotate: -12 },
      { src: "/props/strawberry-3.png", width: 40, top: "45%", right: "10%", rotate: -5 },
    ],
  },
  {
    id: 4,
    flavorName: "LEMON TART",
    descriptor: "Award-winning sweet lemon meringue tart by Dinner Lady.",
    nicotineLabel: "0MG NIC",
    mlLabel: "50ml",
    background: "#E8C84A",
    rotation: -3,
    productSrc: "/products/device-disposable-teal.png",
    productRotation: -5,
    badgeColor: "#A52A40",
    props: [
      { src: "/props/cookie-1.png", width: 80, top: "10%", left: "6%", rotate: 18 },
      { src: "/props/cookie-2.png", width: 55, top: "30%", right: "14%", rotate: -22 },
      { src: "/props/cookie-3.png", width: 50, bottom: "20%", left: "10%", rotate: 15 },
    ],
  }
];
