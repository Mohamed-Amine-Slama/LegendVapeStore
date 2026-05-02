import type { NavItem, FooterColumn } from "@/types/navigation";

export const MENU_LINKS: NavItem[] = [
  { label: "SHOP",           href: "#shop" },
  { label: "FLAVORS",        href: "#flavors" },
  { label: "OUR STORY",      href: "#story" },
  { label: "SUSTAINABILITY", href: "#sustainability" },
  { label: "FIND A STORE",   href: "#store" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    header: "LEGEND VAPE STORE FLAVORS",
    links: [
      { label: "Shop Devices",  href: "#" },
      { label: "Starter Kits",  href: "#" },
      { label: "Pod Packs",     href: "#" },
      { label: "New Arrivals",  href: "#" },
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
