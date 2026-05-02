import { defineField, defineType } from "sanity";

/**
 * Reusable flavor profiles. The frontend's `FlavorFamily` type expects the
 * lowercase `family` values below — keep them in sync with
 * `lib/sanity-types.ts`.
 */
export const flavor = defineType({
  name: "flavor",
  title: "Flavor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Flavor Name",
      type: "string",
      // e.g. "Strawberry Mint", "Cookies & Cream"
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "family",
      title: "Flavor Family",
      type: "string",
      options: {
        list: [
          { title: "Fruity", value: "fruity" },
          { title: "Minty", value: "minty" },
          { title: "Creamy", value: "creamy" },
          { title: "Tobacco", value: "tobacco" },
          { title: "Sweet", value: "sweet" },
          { title: "Icy", value: "icy" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Flavor Color (hex)",
      type: "string",
      description:
        "Hex color code. Used for the card color strip and image-zone tint.",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
          name: "hex color",
          invert: false,
        }),
    }),
    defineField({
      name: "propImage",
      title: "Flavor Prop Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Decorative prop on the product card (e.g. strawberry, chocolate chunk). PNG with transparent background.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "family",
    },
  },
});
