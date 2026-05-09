import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for products, reviews, and buying guides on Time For Growth.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-black mb-6">
        {query ? `Search results for "${query}"` : "Search"}
      </h1>
      <form action="/search" className="mb-8">
        <div className="flex gap-3 max-w-xl">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search products, reviews, guides…"
            className="input flex-1"
            autoFocus
          />
          <button type="submit" className="btn-primary px-6">
            Search
          </button>
        </div>
      </form>

      {query ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold mb-2">Connect Algolia to enable search</h2>
          <p className="text-[#666]">
            Add your <code className="bg-[#F5F5F5] px-1 rounded">ALGOLIA_APP_ID</code> and{" "}
            <code className="bg-[#F5F5F5] px-1 rounded">ALGOLIA_SEARCH_KEY</code> to{" "}
            <code className="bg-[#F5F5F5] px-1 rounded">.env.local</code> to activate full search, or explore products below.
          </p>
        </div>
      ) : (
        <p className="text-[#666]">Enter a search term above to find products, reviews, and buying guides.</p>
      )}
    </div>
  );
}
