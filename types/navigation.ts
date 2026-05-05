import type { TranslationKey } from "@/lib/translations";

export interface NavItem {
  /** Display label. Falls back when no labelKey is set. */
  label: string;
  /** Optional translation key. If present, components should resolve via `t(labelKey)`. */
  labelKey?: TranslationKey;
  href: string;
}

export interface FooterColumn {
  header: string;
  headerKey?: TranslationKey;
  links: NavItem[];
}
