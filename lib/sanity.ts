import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  // Disable Next.js fetch cache for admin pages — always get fresh data
  fetch: { cache: "no-store" } as any,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// ============================================================
// GROQ Query Helpers
// ============================================================

export const productFields = `
  _id,
  name,
  "slug": slug.current,
  "category": category-> { name, "slug": slug.current },
  tags,
  shortDescription,
  rating,
  pros,
  cons,
  verdict,
  featured,
  status,
  mainImageUrl,
  _createdAt,
  _updatedAt,
  "images": images[]{
    _key,
    alt,
    "asset": asset
  },
  affiliateLinks,
  seo
`;

export const articleFields = `
  _id,
  title,
  "slug": slug.current,
  type,
  author,
  "category": category-> { name, "slug": slug.current },
  heroImageAlt,
  mainImageUrl,
  excerpt,
  status,
  publishedAt,
  updatedAt,
  _createdAt,
  _updatedAt,
  seo,
  "heroImage": heroImage.asset->
`;
