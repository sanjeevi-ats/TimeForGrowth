import type { Metadata } from "next";
import { sanityClient, articleFields } from "@/lib/sanity";
import ArticleCard, { ArticleCardSkeleton } from "@/components/articles/ArticleCard";
import type { Article } from "@/lib/types";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Honest, in-depth product reviews from the Time For Growth team.",
};

export const dynamic = "force-dynamic";

async function getReviews(): Promise<Article[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "article" && status == "published" && (type == "review" || type == "tutorial")] | order(publishedAt desc) {${articleFields}}`
    );
  } catch {
    return [];
  }
}

export default async function ReviewsPage() {
  const articles = await getReviews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-black mb-2">Reviews</h1>
        <p className="text-[#666]">{articles.length} reviews published</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold mb-2">No reviews yet</h2>
          <p className="text-[#666]">Check back soon for our first reviews.</p>
        </div>
      )}
    </div>
  );
}
