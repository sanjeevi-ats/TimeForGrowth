import { NextRequest, NextResponse } from "next/server";
import { algoliasearch } from "algoliasearch";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [], articles: [] });
  }

  if (!appId || !searchKey || appId.includes("your-algolia")) {
    return NextResponse.json({ products: [], articles: [], unconfigured: true });
  }

  try {
    const client = algoliasearch(appId, searchKey);

    // Algolia v5: use client.search with multiple queries
    const { results } = await client.search({
      requests: [
        { indexName: "t4g_products", query, hitsPerPage: 5 },
        { indexName: "t4g_articles", query, hitsPerPage: 5 },
      ],
    });

    const products = (results[0] as any).hits || [];
    const articles = (results[1] as any).hits || [];

    return NextResponse.json({ products, articles });
  } catch (error) {
    console.error("[Search] Algolia error:", error);
    return NextResponse.json({ products: [], articles: [], error: "Search unavailable" }, { status: 500 });
  }
}
