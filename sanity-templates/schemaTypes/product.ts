import { defineField, defineType } from "sanity";

/**
 * Main product schema. Field names must match the GROQ projection in
 * `lib/queries.ts` and the `SanityProduct` interface in
 * `lib/sanity-types.ts`. The mapper in `lib/products.ts` uses these to
 * convert into the frontend's `ShopProduct` shape.
 *
 * Brand values use lowercase keys (`original`/`max`/`pro`/`lite`) — the
 * mapper expands those to "LEGEND VAPE STORE Original/MAX/PRO/LITE".
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",

  groups: [
    { name: "basic", title: "📦 Basic Info", default: true },
    { name: "details", title: "🔬 Product Details" },
    { name: "media", title: "🖼️  Media" },
    { name: "shop", title: "🛒 Shop Settings" },
  ],

  fields: [
    // ─── BASIC INFO ───────────────────────────────────────────
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "basic",
      // e.g. "LEGEND VAPE STORE Strawberry Mint Pod"
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "basic",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "basic",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "flavor",
      title: "Flavor",
      type: "reference",
      group: "basic",
      to: [{ type: "flavor" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      group: "basic",
      // Italic descriptor under the product name on the card.
      validation: (Rule) => Rule.max(100),
    }),

    // ─── PRODUCT DETAILS ──────────────────────────────────────
    defineField({
      name: "nicotineStrength",
      title: "Nicotine Strength (mg)",
      type: "number",
      group: "details",
      options: {
        list: [
          { title: "0mg  — Nicotine Free", value: 0 },
          { title: "10mg — Light", value: 10 },
          { title: "20mg — Standard", value: 20 },
          { title: "50mg — Strong (MAX)", value: 50 },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caffeinated",
      title: "Caffeinated?",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "volume",
      title: "Volume / Size",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "1ml", value: "1ml" },
          { title: "2ml", value: "2ml" },
          { title: "4ml", value: "4ml" },
          { title: "10ml", value: "10ml" },
          { title: "30ml", value: "30ml" },
        ],
      },
      // Leave blank for PUFFS — use puffCount instead.
    }),
    defineField({
      name: "puffCount",
      title: "Puff Count",
      type: "number",
      group: "details",
      description: "Only fill this for PUFFS products.",
    }),
    defineField({
      name: "brand",
      title: "Brand Line",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "LEGEND VAPE STORE Original", value: "original" },
          { title: "LEGEND VAPE STORE MAX", value: "max" },
          { title: "LEGEND VAPE STORE PRO", value: "pro" },
          { title: "LEGEND VAPE STORE LITE", value: "lite" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients / Notes",
      type: "text",
      group: "details",
      rows: 4,
      description: "Full ingredients list or product notes.",
    }),

    // ─── MEDIA ────────────────────────────────────────────────
    defineField({
      name: "mainImage",
      title: "Main Product Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      description:
        "PNG with transparent background. Used in the shop card and hero.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional images for the product detail page.",
    }),
    defineField({
      name: "cardBackground",
      title: "Card Background Color (hex)",
      type: "string",
      group: "media",
      description:
        "Background color for the product card image zone. Use the flavor color or a pale tint. e.g. #FDECEA",
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: "hex color",
          invert: false,
        }),
    }),

    // ─── SHOP SETTINGS ────────────────────────────────────────
    defineField({
      name: "price",
      title: "Price (TND)",
      type: "number",
      group: "shop",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare-At Price (TND)",
      type: "number",
      group: "shop",
      description:
        "Original price before discount. Shows a strikethrough if set.",
    }),
    defineField({
      name: "badge",
      title: "Card Badge",
      type: "string",
      group: "shop",
      options: {
        list: [
          { title: "None", value: "" },
          { title: "NEW", value: "NEW" },
          { title: "HOT", value: "HOT" },
          { title: "MAX", value: "MAX" },
        ],
      },
      initialValue: "",
    }),
    defineField({
      name: "featured",
      title: "Featured Product?",
      type: "boolean",
      group: "shop",
      description:
        "Featured products appear first in the shop and in the flavor carousel.",
      initialValue: false,
    }),
    defineField({
      name: "inStock",
      title: "In Stock?",
      type: "boolean",
      group: "shop",
      initialValue: true,
    }),
    defineField({
      name: "stockCount",
      title: "Stock Count",
      type: "number",
      group: "shop",
      description: "Optional. Used to show low-stock warnings.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "shop",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  // Card preview in Sanity Studio list view
  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ?? "No category",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Price: Low → High",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
});
