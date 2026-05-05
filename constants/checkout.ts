/**
 * Tunisia governorates — used by the CheckoutForm dropdown.
 *
 * Order matches the official numbering (north → south, west → east coast,
 * then south). Stored as the human-readable string the customer chose;
 * normalize on the dashboard if needed for analytics.
 */
export const TUNISIA_GOVERNORATES = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Béja",
  "Jendouba",
  "Le Kef",
  "Siliana",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Kairouan",
  "Kasserine",
  "Sidi Bouzid",
  "Gabès",
  "Médenine",
  "Tataouine",
  "Gafsa",
  "Tozeur",
  "Kébili",
] as const;

export type TunisiaGovernorate = (typeof TUNISIA_GOVERNORATES)[number];
