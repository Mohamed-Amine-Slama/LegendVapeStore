import {
  Bebas_Neue,
  Dancing_Script,
  Oswald,
  DM_Serif_Display,
  Syne,
} from "next/font/google";

export const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const dancingScript = Dancing_Script({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const oswald = Oswald({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-oswald-google",
  display: "swap",
});

export const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const syne = Syne({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});
