import type { PropImage } from "./product";

export interface CarouselCard {
  id: number;
  flavorName: string;
  descriptor: string;
  nicotineLabel: string;
  mlLabel: string;
  background: string;
  rotation: number;
  productSrc: string;
  productRotation: number;
  props: PropImage[];
  badgeColor?: string;
  /** Hero stat sticker displayed at the top-right corner (e.g. 20K PUFFS,
   *  50ML SHORTFILL). Omit to hide the sticker. */
  heroStat?: { value: string; unit: string };
  /** Whether the card uses dark text (for light backgrounds like baby blue
   *  or yellow) or light text (for saturated backgrounds). Defaults to
   *  "light". */
  textTone?: "light" | "dark";
}

export type CarouselDirection = "next" | "prev";
