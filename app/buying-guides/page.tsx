import type { Metadata } from "next";
import { sanityClient, articleFields } from "@/lib/sanity";
import ArticleCard from "@/components/articles/ArticleCard";
import type { Article } from "@/lib/types";

export const metadata: Metadata = {
  title: "Buying Guides",
  description: "Expert buying guides to help you choose the right gear for your needs.",
};

export const dynamic = "force-dynamic";

async function getGuides(): Promise<Article[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "article" && status == "published" && (type == "buying-guide" || type == "listicle")] | order(publishedAt desc) {${articleFields}}`
    );
  } catch {
    return [];
  }
}

export default async function BuyingGuidesPage() {
  const articles = await getGuides();
  const [featured, ...rest] = articles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-black mb-2">Buying Guides</h1>
        <p className="text-[#666]">Everything you need to make the right choice</p>
      </div>

      {featured && (
        <div className="mb-10">
          <ArticleCard article={featured} variant="featured" />
        </div>
      )}

      {rest.length > 0 ? (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {rest.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-bold mb-2">No guides yet</h2>
          <p className="text-[#666]">Our first buying guides are coming soon.</p>
        </div>
      ) : null}
    </div>
  );
}
