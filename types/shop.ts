/**
 * Shop domain types.
 *
 * Categories drive which filter groups are visible (per Shop.md §6).
 * FilterState is the entire filter UI's state — read by FilterSidebar +
 * derived against the product list to produce the visible grid.
 */

export type ShopCategory = "PODS" | "PUFFS" | "CAPSULES" | "LIQUID";

export type FlavorFamily =
  | "Fruity"
  | "Minty"
  | "Creamy"
  | "Tobacco"
  | "Sweet"
  | "Icy";

export type Brand =
  | "LEGEND VAPE STORE Original"
  | "LEGEND VAPE STORE MAX"
  | "LEGEND VAPE STORE PRO"
  | "LEGEND VAPE STORE LITE";

export type NicotineMg = 0 | 10 | 20 | 50;

export type Volume = 1 | 2 | 4 | 10 | 30;

export type ProductBadge = "NEW" | "HOT" | "MAX";

export type SortOption =
  | "FEATURED"
  | "PRICE_LOW_HIGH"
  | "PRICE_HIGH_LOW"
  | "NEWEST";

export type ViewMode = "GRID" | "LIST";

export interface ShopProduct {
  id: string;
  name: string;
  category: ShopCategory;
  description: string;            // DM Serif Display italic line
  priceTND: number;               // Price in Tunisian Dinar
  nicotineMg: NicotineMg;
  mlSize?: Volume;                // undefined for PUFFS
  puffCount?: number;             // 200..5000, only for PUFFS
  caffeinated: boolean;
  brand: Brand;
  flavorFamily: FlavorFamily;
  flavorColor: string;            // hex — drives card image bg tint + bottom strip
  imageSrc: string;               // /products/*.png
  propSrc?: string;               // optional decorative prop on the card image
  badge?: ProductBadge;
  /** Sort key for "NEWEST" — higher = newer. */
  releaseOrder: number;
  /** Sort key for "FEATURED" — lower = more prominent. */
  featuredOrder: number;
}

export interface FilterState {
  /** Selected nicotine strengths. Empty array = no filter (show all). */
  nicotineMg: NicotineMg[];
  /** Selected flavor families. Empty = no filter. */
  flavorFamilies: FlavorFamily[];
  /** Selected volumes. Empty = no filter. */
  volumes: Volume[];
  /** PUFFS only — max puff count cap (slider). */
  maxPuffCount: number;
  /** Caffeinated-only toggle. */
  caffeinatedOnly: boolean;
  /** Price range [min, max] in TND. */
  priceRange: [number, number];
  /** Selected brands. Empty = no filter. */
  brands: Brand[];
}

export type ActiveFilterChip = {
  /** Stable key so React knows what to remove on click. */
  key: string;
  label: string;
  /** Mutator that removes this single filter from state. */
  remove: () => void;
};
