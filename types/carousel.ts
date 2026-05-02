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
}

export type CarouselDirection = "next" | "prev";
