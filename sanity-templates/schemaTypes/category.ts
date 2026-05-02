import { defineField, defineType } from "sanity";

/**
 * Defines the 4 product categories. Title values are UPPERCASE — the
 * frontend's `ShopCategory` type relies on them.
 */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      options: {
        list: [
          { title: "Pods", value: "PODS" },
          { title: "Puffs", value: "PUFFS" },
          { title: "Capsules", value: "CAPSULES" },
          { title: "Liquid", value: "LIQUID" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Category Icon",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
