import type {
  Brand,
  FilterState,
  FlavorFamily,
  LiquidType,
  NicotineMg,
  ShopCategory,
  ShopProduct,
  SortOption,
  Volume,
} from "@/types/shop";

/** ─── Configuration ─────────────────────────────────────────────────── */

export const CATEGORIES: ShopCategory[] = ["PODS", "PUFFS", "CAPSULES", "LIQUID", "COILS"];

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

/** LIQUID sub-categories. `accent` is the chip background tint. */
export const LIQUID_TYPE_OPTIONS: { value: LiquidType; label: string; accent: string }[] = [
  { value: "Fruity",   label: "Fruity",   accent: "#E8463A" },
  { value: "Gourmand", label: "Gourmand", accent: "#A5793C" },
];

export const BRAND_OPTIONS: Brand[] = [
  "LEGEND VAPE STORE Original",
  "LEGEND VAPE STORE MAX",
  "LEGEND VAPE STORE PRO",
  "LEGEND VAPE STORE LITE",
  "Vozol",
  "Wotofo",
];

export const PRICE_RANGE_LIMITS: [number, number] = [0, 150]; // TND
export const PUFF_RANGE_LIMITS: [number, number] = [1000, 50000];

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
    liquidType: boolean;
    puffCount: boolean;
    caffeine: boolean;
    price: boolean;
    brand: boolean;
  }
> = {
  PODS:     { nicotine: true,  flavor: true,  volume: true,  liquidType: false, puffCount: false, caffeine: true,  price: true, brand: true },
  PUFFS:    { nicotine: true,  flavor: true,  volume: false, liquidType: false, puffCount: true,  caffeine: true,  price: true, brand: true },
  CAPSULES: { nicotine: true,  flavor: true,  volume: true,  liquidType: false, puffCount: false, caffeine: true,  price: true, brand: true },
  LIQUID:   { nicotine: true,  flavor: true,  volume: true,  liquidType: true,  puffCount: false, caffeine: true,  price: true, brand: true },
  COILS:    { nicotine: false, flavor: false, volume: false, liquidType: false, puffCount: false, caffeine: false, price: true, brand: true },
};

export const INITIAL_FILTER_STATE: FilterState = {
  nicotineMg: [],
  flavorFamilies: [],
  volumes: [],
  liquidTypes: [],
  maxPuffCount: PUFF_RANGE_LIMITS[1],
  caffeinatedOnly: false,
  priceRange: PRICE_RANGE_LIMITS,
  brands: [],
};

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
