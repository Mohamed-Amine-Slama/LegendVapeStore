import type { NavItem, FooterColumn } from "@/types/navigation";

/**
 * Top-level menu (rendered inside MenuOverlay). The product-related entries
 * (SHOP, FLAVORS, FIND A STORE) all route to /shop. Editorial pages
 * (OUR STORY, SUSTAINABILITY) keep their hash anchors for now.
 */
export const MENU_LINKS: NavItem[] = [
  { label: "SHOP",           href: "/shop" },
  { label: "FLAVORS",        href: "/shop" },
  { label: "OUR STORY",      href: "#story" },
  { label: "SUSTAINABILITY", href: "#sustainability" },
  { label: "FIND A STORE",   href: "/shop" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    header: "LEGEND VAPE STORE FLAVORS",
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
