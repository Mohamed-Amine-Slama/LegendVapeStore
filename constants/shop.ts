import type {
  Brand,
  FilterState,
  FlavorFamily,
  NicotineMg,
  ShopCategory,
  ShopProduct,
  SortOption,
  Volume,
} from "@/types/shop";

/** ─── Configuration ─────────────────────────────────────────────────── */

export const CATEGORIES: ShopCategory[] = ["PODS", "PUFFS", "CAPSULES", "LIQUID"];

export const NICOTINE_OPTIONS: { mg: NicotineMg; label: string; sub: string }[] = [
  { mg: 0,  label: "0mg",  sub: "Nicotine Free" },
  { mg: 10, label: "10mg", sub: "Light" },
  { mg: 20, label: "20mg", sub: "Standard" },
  { mg: 50, label: "50mg", sub: "Strong" },
];

export const FLAVOR_FAMILIES: { name: FlavorFamily; color: string }[] = [
  { name: "Fruity",  color: "#E8463A" },
  { name: "Minty",   color: "#4AC9A0" },
  { name: "Creamy",  color: "#F5D6A0" },
  { name: "Tobacco", color: "#7B4F2E" },
  { name: "Sweet",   color: "#E07BBF" },
  { name: "Icy",     color: "#A8D4E6" },
];

export const VOLUME_OPTIONS: Volume[] = [1, 2, 4, 10, 30];

export const BRAND_OPTIONS: Brand[] = [
  "LEGEND VAPE STORE Original",
  "LEGEND VAPE STORE MAX",
  "LEGEND VAPE STORE PRO",
  "LEGEND VAPE STORE LITE",
];

export const PRICE_RANGE_LIMITS: [number, number] = [0, 150]; // TND
export const PUFF_RANGE_LIMITS: [number, number] = [200, 5000];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "FEATURED",        label: "Featured" },
  { value: "PRICE_LOW_HIGH",  label: "Price: Low → High" },
  { value: "PRICE_HIGH_LOW",  label: "Price: High → Low" },
  { value: "NEWEST",          label: "Newest" },
];

/** Per-category visibility map for filter groups (Shop.md §6). */
export const FILTER_VISIBILITY: Record<
  ShopCategory,
  {
    nicotine: boolean;
    flavor: boolean;
    volume: boolean;
    puffCount: boolean;
    caffeine: boolean;
    price: boolean;
    brand: boolean;
  }
> = {
  PODS:     { nicotine: true, flavor: true, volume: true,  puffCount: false, caffeine: true, price: true, brand: true },
  PUFFS:    { nicotine: true, flavor: true, volume: false, puffCount: true,  caffeine: true, price: true, brand: true },
  CAPSULES: { nicotine: true, flavor: true, volume: true,  puffCount: false, caffeine: true, price: true, brand: true },
  LIQUID:   { nicotine: true, flavor: true, volume: true,  puffCount: false, caffeine: true, price: true, brand: true },
};

export const INITIAL_FILTER_STATE: FilterState = {
  nicotineMg: [],
  flavorFamilies: [],
  volumes: [],
  maxPuffCount: PUFF_RANGE_LIMITS[1],
  caffeinatedOnly: false,
  priceRange: PRICE_RANGE_LIMITS,
  brands: [],
};

/** ─── Mock product catalogue ─────────────────────────────────────────── */

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "p001",
    name: "Strawberry Mint Pod",
    category: "PODS",
    description: "Crisp, icy, with a hint of menthol bite.",
    priceTND: 12,
    nicotineMg: 20,
    mlSize: 2,
    caffeinated: false,
    brand: "LEGEND VAPE STORE Original",
    flavorFamily: "Fruity",
    flavorColor: "#C8273A",
    imageSrc: "/products/card-strawberry-device.png",
    propSrc: "/props/strawberry-1.png",
    badge: "NEW",
    releaseOrder: 12,
    featuredOrder: 1,
  },
  {
    id: "p002",
    name: "Cookies & Cream Pod",
    category: "PODS",
    description: "Rich, creamy, dessert-style vapor.",
    priceTND: 12,
    nicotineMg: 20,
    mlSize: 2,
    caffeinated: false,
    brand: "LEGEND VAPE STORE Original",
    flavorFamily: "Creamy",
    flavorColor: "#8B5E3C",
    imageSrc: "/products/card-cookies-device.png",
    propSrc: "/props/cookie-1.png",
    releaseOrder: 9,
    featuredOrder: 2,
  },
  {
    id: "p003",
    name: "Max Dark Chocolate",
    category: "PODS",
    description: "Intense and smooth — for the bold palate.",
    priceTND: 18,
    nicotineMg: 50,
    mlSize: 4,
    caffeinated: true,
    brand: "LEGEND VAPE STORE MAX",
    flavorFamily: "Sweet",
    flavorColor: "#1A1A1A",
    imageSrc: "/products/card-chocolate-device.png",
    propSrc: "/props/chocolate-1.png",
    badge: "MAX",
    releaseOrder: 10,
    featuredOrder: 3,
  },
  {
    id: "p004",
    name: "Iced Mint 600",
    category: "PUFFS",
    description: "Sharp menthol exhale, glacier-clean finish.",
    priceTND: 8,
    nicotineMg: 20,
    puffCount: 600,
    caffeinated: false,
    brand: "LEGEND VAPE STORE LITE",
    flavorFamily: "Icy",
    flavorColor: "#A8D4E6",
    imageSrc: "/products/device-disposable-teal.png",
    badge: "NEW",
    releaseOrder: 11,
    featuredOrder: 4,
  },
  {
    id: "p005",
    name: "Vanilla Tobacco Capsule",
    category: "CAPSULES",
    description: "Aged tobacco warmed by Madagascan vanilla.",
    priceTND: 15,
    nicotineMg: 10,
    mlSize: 1,
    caffeinated: false,
    brand: "LEGEND VAPE STORE PRO",
    flavorFamily: "Tobacco",
    flavorColor: "#7B4F2E",
    imageSrc: "/products/device-refill.png",
    releaseOrder: 6,
    featuredOrder: 7,
  },
  {
    id: "p006",
    name: "Watermelon Ice Liquid",
    category: "LIQUID",
    description: "Sun-ripened watermelon over a clean ice base.",
    priceTND: 28,
    nicotineMg: 0,
    mlSize: 30,
    caffeinated: false,
    brand: "LEGEND VAPE STORE Original",
    flavorFamily: "Fruity",
    flavorColor: "#E8463A",
    imageSrc: "/products/device-refill.png",
    propSrc: "/props/strawberry-2.png",
    releaseOrder: 7,
    featuredOrder: 8,
  },
  {
    id: "p007",
    name: "Caffeine Boost Pod",
    category: "PODS",
    description: "Bold espresso, real caffeine, no compromise.",
    priceTND: 22,
    nicotineMg: 50,
    mlSize: 2,
    caffeinated: true,
    brand: "LEGEND VAPE STORE MAX",
    flavorFamily: "Sweet",
    flavorColor: "#5A3A20",
    imageSrc: "/products/card-cookies-device.png",
    propSrc: "/props/chocolate-1.png",
    badge: "HOT",
    releaseOrder: 8,
    featuredOrder: 5,
  },
  {
    id: "p008",
    name: "Pure Mint Liquid",
    category: "LIQUID",
    description: "Cold-pressed peppermint — single note, full clarity.",
    priceTND: 18,
    nicotineMg: 20,
    mlSize: 10,
    caffeinated: false,
    brand: "LEGEND VAPE STORE Original",
    flavorFamily: "Minty",
    flavorColor: "#4AC9A0",
    imageSrc: "/products/device-refill.png",
    releaseOrder: 4,
    featuredOrder: 9,
  },
  {
    id: "p009",
    name: "Mango Chill 5000",
    category: "PUFFS",
    description: "Tropical mango carved by an icy backbone.",
    priceTND: 24,
    nicotineMg: 50,
    puffCount: 5000,
    caffeinated: false,
    brand: "LEGEND VAPE STORE MAX",
    flavorFamily: "Fruity",
    flavorColor: "#FFB347",
    imageSrc: "/products/device-disposable-teal.png",
    propSrc: "/props/strawberry-3.png",
    badge: "MAX",
    releaseOrder: 5,
    featuredOrder: 6,
  },
  {
    id: "p010",
    name: "Nordic Berry Capsule",
    category: "CAPSULES",
    description: "Lingonberry, blackcurrant, a whisper of pine.",
    priceTND: 14,
    nicotineMg: 20,
    mlSize: 1,
    caffeinated: false,
    brand: "LEGEND VAPE STORE PRO",
    flavorFamily: "Fruity",
    flavorColor: "#9C2654",
    imageSrc: "/products/device-refill.png",
    propSrc: "/props/strawberry-2.png",
    releaseOrder: 3,
    featuredOrder: 10,
  },
  {
    id: "p011",
    name: "Espresso Crema Pod",
    category: "PODS",
    description: "Triple-shot espresso topped with silk crema.",
    priceTND: 13,
    nicotineMg: 20,
    mlSize: 2,
    caffeinated: true,
    brand: "LEGEND VAPE STORE Original",
    flavorFamily: "Creamy",
    flavorColor: "#3D2A18",
    imageSrc: "/products/card-cookies-device.png",
    propSrc: "/props/cookie-2.png",
    badge: "NEW",
    releaseOrder: 13,
    featuredOrder: 11,
  },
  {
    id: "p012",
    name: "Caramel Tobacco Liquid",
    category: "LIQUID",
    description: "Slow-burnt caramel over Virginia tobacco leaf.",
    priceTND: 22,
    nicotineMg: 10,
    mlSize: 30,
    caffeinated: false,
    brand: "LEGEND VAPE STORE LITE",
    flavorFamily: "Tobacco",
    flavorColor: "#7B4F2E",
    imageSrc: "/products/device-refill.png",
    propSrc: "/props/cookie-3.png",
    releaseOrder: 2,
    featuredOrder: 12,
  },
];

/** Number of products per brand — used by BrandFilter "(12)" badge. */
export function brandCounts(products: ShopProduct[]): Record<Brand, number> {
  const counts = {
    "LEGEND VAPE STORE Original": 0,
    "LEGEND VAPE STORE MAX": 0,
    "LEGEND VAPE STORE PRO": 0,
    "LEGEND VAPE STORE LITE": 0,
  } as Record<Brand, number>;
  products.forEach((p) => counts[p.brand]++);
  return counts;
}
