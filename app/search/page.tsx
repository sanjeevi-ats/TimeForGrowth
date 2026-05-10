import type { Metadata } from "next";
import { sanityWriteClient as sanityClient, productFields } from "@/lib/sanity";
import { ProductSearchFilter } from "@/components/search/ProductSearchFilter";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search for self-improvement books, journals, gadgets, and wellness products on Time For Growth.",
};

export const revalidate = 60;

async function getAllProducts(): Promise<Product[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && status == "published"] | order(_createdAt desc) {${productFields}}`
    );
  } catch {
    return [];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const allProducts = await getAllProducts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-black mb-3">
            {query ? "Search Results" : "Explore Products"}
          </h1>
          <p className="text-lg text-gray-600">
            {query
              ? `Showing results for "${query}"`
              : "Browse our curated collection of self-improvement products"}
          </p>
        </div>

        {/* Search Filter Component */}
        <ProductSearchFilter products={allProducts} initialQuery={query} />
      </div>
    </div>
  );
}
