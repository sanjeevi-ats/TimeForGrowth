import { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://time4growth.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/buying-guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const [products, articles] = await Promise.all([
      sanityClient.fetch(
        `*[_type == "product" && status == "published"]{ "slug": slug.current, _updatedAt }`
      ),
      sanityClient.fetch(
        `*[_type == "article" && status == "published"]{ "slug": slug.current, type, _updatedAt }`
      ),
    ]);

    const productRoutes: MetadataRoute.Sitemap = (products || []).map((p: any) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const articleRoutes: MetadataRoute.Sitemap = (articles || []).map((a: any) => {
      const prefix = a.type === "buying-guide" || a.type === "listicle" ? "buying-guides" : "reviews";
      return {
        url: `${base}/${prefix}/${a.slug}`,
        lastModified: new Date(a._updatedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      };
    });

    return [...staticRoutes, ...productRoutes, ...articleRoutes];
  } catch {
    return staticRoutes;
  }
}
