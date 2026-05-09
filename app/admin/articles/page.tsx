import { sanityWriteClient as sanityClient } from "@/lib/sanity";
import Link from "next/link";
import { Edit, Plus, Star } from "lucide-react";

export const dynamic = "force-dynamic";


async function getArticles() {
  try {
    return await sanityClient.fetch(
      `*[_type == "article"] | order(_updatedAt desc) {
        _id, title, "slug": slug.current, type, author, status, _updatedAt,
        "category": category->{name}
      }`
    );
  } catch {
    return [];
  }
}

const typeLabels: Record<string, string> = {
  review: "⭐ Review",
  "buying-guide": "📋 Buying Guide",
  listicle: "📝 Listicle",
  tutorial: "🎓 Tutorial",
};

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Articles</h1>
          <p className="text-[#666] text-sm mt-1">{articles.length} total articles</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/articles/new?type=review" className="btn-secondary">
            <Star size={15} /> Write Review
          </Link>
          <Link href="/admin/articles/new" className="btn-primary">
            <Plus size={16} /> Write Article
          </Link>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Author</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((article: any) => (
                  <tr key={article._id}>
                    <td>
                      <span className="font-medium text-black line-clamp-1">{article.title}</span>
                    </td>
                    <td>
                      <span className="badge-tag">{typeLabels[article.type] || article.type}</span>
                    </td>
                    <td className="text-[#666]">{article.author}</td>
                    <td>
                      {article.status === "published"
                        ? <span className="badge-published">{article.status}</span>
                        : article.status === "draft"
                        ? <span className="badge-draft">{article.status}</span>
                        : <span className="badge-archived">{article.status}</span>
                      }
                    </td>
                    <td className="text-xs text-[#999]">
                      {new Date(article._updatedAt).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <Link
                        href={`/admin/articles/${article._id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#666] hover:text-black transition-colors"
                      >
                        <Edit size={13} /> Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#999]">
                    No articles yet.{" "}
                    <Link href="/admin/articles/new" className="underline hover:text-black transition-colors">
                      Write your first article
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
