import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "longDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required().warning("Alt text is required for accessibility and SEO"),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "mainImageUrl",
      title: "Main Image URL (External)",
      type: "url",
      description: "Use an external URL (like from Amazon) if you don't want to upload an image to Sanity.",
    }),
    defineField({
      name: "affiliateLinks",
      title: "Affiliate Links (by Region)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "countryCode", title: "Country Code", type: "string", description: "ISO 2-letter code e.g. IN, US, GB" }),
            defineField({ name: "platform", title: "Platform Name", type: "string", description: "e.g. Amazon.in, Flipkart, B&H Photo" }),
            defineField({ name: "url", title: "Affiliate URL", type: "url", validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }) }),
            defineField({ name: "displayPrice", title: "Display Price", type: "string", description: "e.g. ₹45,999 or $499" }),
            defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
          ],
          preview: {
            select: { title: "countryCode", subtitle: "platform", description: "displayPrice" },
            prepare({ title, subtitle, description }: any) {
              return { title: `${title || "??"} — ${subtitle || "Unknown"}`, subtitle: description };
            },
          },
        },
      ],
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).precision(1),
    }),
    defineField({
      name: "ratingOutOf10",
      title: "Verdict Rating (1–10)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(10).precision(1),
    }),
    defineField({
      name: "pros",
      title: "Pros",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "cons",
      title: "Cons",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "verdict",
      title: "Verdict Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "key", title: "Spec Name", type: "string" }),
            defineField({ name: "value", title: "Spec Value", type: "string" }),
          ],
          preview: { select: { title: "key", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta Title", type: "string", validation: (Rule) => Rule.max(60) }),
        defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2, validation: (Rule) => Rule.max(160) }),
        defineField({ name: "ogImage", title: "OG Image", type: "image" }),
      ],
    }),
  ],
  orderings: [
    { title: "Newest", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
    { title: "Highest Rated", name: "ratingDesc", by: [{ field: "rating", direction: "desc" }] },
    { title: "Name A–Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "status",
      media: "images.0",
    },
    prepare({ title, subtitle, media }: any) {
      return { title, subtitle: `[${subtitle?.toUpperCase() || "DRAFT"}]`, media };
    },
  },
});
