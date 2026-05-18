import type { NavItem, FooterColumn } from "@/types/navigation";

/**
 * Top-level menu (rendered inside MenuOverlay). The product-related entries
 * (SHOP, FLAVORS, FIND A STORE) all route to /shop. Editorial pages
 * (OUR STORY, SUSTAINABILITY) keep their hash anchors for now.
 */
export const MENU_LINKS: NavItem[] = [
  { label: "SHOP",           labelKey: "menu.shop",           href: "/shop" },
  { label: "FLAVORS",        labelKey: "menu.flavors",        href: "/shop" },
  { label: "OUR STORY",      labelKey: "menu.ourStory",       href: "#story" },
  { label: "SUSTAINABILITY", labelKey: "menu.sustainability", href: "#sustainability" },
  { label: "FIND A STORE",   labelKey: "menu.findStore",      href: "/shop" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    header: "LA MAISON DES VAPES FLAVORS",
    links: [
      { label: "Shop Devices",  href: "/shop" },
      { label: "Starter Kits",  href: "/shop" },
      { label: "Pod Packs",     href: "/shop" },
      { label: "New Arrivals",  href: "/shop" },
    ],
  },
  {
    header: "SHOP",
    links: [
      { label: "Drop Club",     href: "#" },
      { label: "Refer & Earn",  href: "#" },
      { label: "Coming Soon",   href: "#" },
      { label: "Pre-orders",    href: "#" },
    ],
  },
  {
    header: "COMPANY",
    links: [
      { label: "Our Story",     href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Press",         href: "#" },
      { label: "Wholesale",     href: "#" },
    ],
  },
  {
    header: "FOLLOW US",
    links: [
      { label: "Instagram",     href: "#" },
      { label: "TikTok",        href: "#" },
      { label: "Twitter / X",   href: "#" },
      { label: "YouTube",       href: "#" },
    ],
  },
];
