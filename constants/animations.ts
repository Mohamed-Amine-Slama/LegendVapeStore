export const EASE = {
  power3:   "power3.out",
  power4:   "power4.out",
  elastic:  "elastic.out(1, 0.5)",
  elastic2: "elastic.out(1, 0.55)",
  back:     "back.out(1.5)",
  bounce:   "bounce.out",
  curtain:  "cubic-bezier(0.77, 0, 0.18, 1)",
} as const;

export const DURATION = {
  xs:  0.35,
  sm:  0.55,
  md:  0.7,
  lg:  0.9,
  xl:  1.1,
  xxl: 1.4,
} as const;

export const STAGGER = {
  tight:  0.06,
  normal: 0.12,
  loose:  0.18,
  char:   0.04,
  word:   0.08,
} as const;
