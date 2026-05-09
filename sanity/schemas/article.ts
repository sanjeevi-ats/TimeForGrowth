import { defineType, defineField } from "sanity";

export const articleSchema = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Article Type",
      type: "string",
      options: {
        list: [
          { title: "Review", value: "review" },
          { title: "Buying Guide", value: "buying-guide" },
          { title: "Listicle", value: "listicle" },
          { title: "Tutorial", value: "tutorial" },
        ],
        layout: "radio",
      },
      initialValue: "review",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Byline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image (Upload)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mainImageUrl",
      title: "Main Image URL (External)",
      type: "url",
      description: "Use this to link an external image instead of uploading one.",
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt Text",
      type: "string",
      validation: (Rule) => Rule.warning("Always provide alt text for hero images"),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
        {
          type: "object",
          name: "productCard",
          title: "Embedded Product Card",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "context",
              title: "Context Note",
              type: "string",
              description: "Optional note to show above the card",
            }),
          ],
          preview: {
            select: { title: "product.name", subtitle: "context" },
            prepare({ title, subtitle }: any) {
              return { title: `📦 ${title || "Product Card"}`, subtitle: subtitle || "Embedded product" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "relatedProducts",
      title: "Products Mentioned",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Scheduled", value: "scheduled" },
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
      name: "scheduledFor",
      title: "Scheduled For",
      type: "datetime",
    }),
    defineField({
      name: "updatedAt",
      title: "Last Updated",
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
    { title: "Newest First", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Type", name: "typeAsc", by: [{ field: "type", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }: any) {
      const typeLabel = subtitle === "buying-guide" ? "GUIDE" : subtitle?.toUpperCase() || "ARTICLE";
      return { title, subtitle: typeLabel, media };
    },
  },
});
