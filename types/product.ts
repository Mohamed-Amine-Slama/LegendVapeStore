export interface PropImage {
  src: string;
  width: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: number;
}

export interface HeroProduct {
  src: string;
  alt: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: number;
  width: number;
  floatDuration: number;
  parallaxY: number;
}

/**
 * Burst-reveal hero: products start at the dead center of the screen and fly
 * out to (burstX, burstY) pixel offsets. Used by the new HeroSection burst
 * animation per Hero.md.
 */
export interface HeroBurstProduct {
  src: string;
  alt: string;
  rotate: number;            // final resting tilt
  width: number;             // resting width
  floatDuration: number;     // post-landing sine loop duration
  parallaxY: number;         // scroll parallax travel
  burstX: number;            // final translateX from screen center
  burstY: number;            // final translateY from screen center
}

/**
 * Single hero product that zooms in from dead center → scales back down to
 * its resting pose (slightly offset from center). No CSS top/left offsets —
 * positioning is all driven by GSAP transform.
 */
export interface HeroCenterProduct {
  src: string;
  alt: string;
  rotate: number;
  width: number;
  floatDuration: number;
  parallaxY: number;
  finalX: number;            // resting translateX (after zoom-shrink)
  finalY: number;            // resting translateY (after zoom-shrink)
  zoomScale: number;         // peak scale during zoom-in
}
