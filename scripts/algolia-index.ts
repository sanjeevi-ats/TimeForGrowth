/**
 * Algolia Indexing Script (v5 API)
 * Fetches all published products and articles from Sanity and pushes them to Algolia.
 *
 * Usage:
 *   npx ts-node --project tsconfig.json scripts/algolia-index.ts
 *
 * Prerequisites:
 *   Fill in the env vars in .env.local:
 *   - NEXT_PUBLIC_ALGOLIA_APP_ID
 *   - ALGOLIA_ADMIN_KEY          ← Write API key (not search-only)
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - NEXT_PUBLIC_SANITY_DATASET
 *   - SANITY_API_TOKEN
 */

import { algoliasearch } from "algoliasearch";
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);

async function indexProducts() {
  console.log("📦 Fetching products from Sanity...");
  const products = await sanity.fetch(`
    *[_type == "product" && status == "published"] {
      _id, name,
      "slug": slug.current,
      shortDescription, rating, tags, status,
      "category": category->name,
      mainImageUrl
    }
  `);

  const records = products.map((p: any) => ({
    objectID: p._id,
    type: "product",
    title: p.name,
    slug: p.slug,
    description: p.shortDescription || "",
    rating: p.rating,
    tags: p.tags || [],
    category: p.category || "",
    imageUrl: p.mainImageUrl || "",
    url: `/products/${encodeURIComponent(p.slug)}`,
  }));

  // v5: use saveObjects directly on the client with indexName
  await client.saveObjects({ indexName: "t4g_products", objects: records });
  console.log(`✅ Indexed ${records.length} products`);
}

async function indexArticles() {
  console.log("📝 Fetching articles from Sanity...");
  const articles = await sanity.fetch(`
    *[_type == "article" && status == "published"] {
      _id, title,
      "slug": slug.current,
      type, excerpt, tags, publishedAt, mainImageUrl
    }
  `);

  const records = articles.map((a: any) => ({
    objectID: a._id,
    type: a.type === "buying-guide" || a.type === "listicle" ? "buying-guide" : "review",
    title: a.title,
    slug: a.slug,
    description: a.excerpt || "",
    tags: a.tags || [],
    publishedAt: a.publishedAt || "",
    imageUrl: a.mainImageUrl || "",
    url: `/${a.type === "buying-guide" || a.type === "listicle" ? "buying-guides" : "reviews"}/${encodeURIComponent(a.slug)}`,
  }));

  await client.saveObjects({ indexName: "t4g_articles", objects: records });
  console.log(`✅ Indexed ${records.length} articles`);
}

async function run() {
  try {
    await indexProducts();
    await indexArticles();
    console.log("\n🎉 Algolia indexing complete!");
  } catch (err) {
    console.error("❌ Indexing failed:", err);
    process.exit(1);
  }
}

run();
