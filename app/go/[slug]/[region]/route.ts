import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient as sanityClient } from "@/lib/sanity";
import { logClick } from "@/lib/supabase";
import { resolveAffiliateLink, buildAffiliateUrl } from "@/lib/geo";
import { getSessionId } from "@/lib/utils";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string; region: string } }
) {
  const { slug, region } = params;
  const countryCode = region.toUpperCase();

  // URL region param always wins (user explicitly chose it via dropdown/button)
  // Fall back to cookie only when the URL param is "AUTO" (generic buy button)
  const cookieRegion = request.cookies.get("t4g_region")?.value?.toUpperCase();
  const effectiveRegion = countryCode === "AUTO"
    ? (cookieRegion || "IN")
    : countryCode;

  // Also check CF-IPCountry header (Cloudflare) — used only for logging
  const cfCountry = request.headers.get("cf-ipcountry") || effectiveRegion;

  try {
    // Fetch product affiliate links from Sanity
    const product = await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug && status == "published"][0]{
        _id,
        name,
        affiliateLinks
      }`,
      { slug }
    );

    if (!product) {
      // Product not found — redirect to products page
      return NextResponse.redirect(new URL("/products", request.url), 302);
    }

    const affiliateLinks = product.affiliateLinks || [];

    // Resolve the best affiliate link using waterfall logic
    const resolved = resolveAffiliateLink(affiliateLinks, effectiveRegion);

    if (!resolved) {
      // No link found for any region — redirect back to product with unavailable flag
      const productUrl = new URL(`/products/${slug}`, request.url);
      productUrl.searchParams.set("unavailable", "true");
      return NextResponse.redirect(productUrl, 302);
    }

    // Build final URL with UTM parameters
    let finalUrl: string;
    try {
      finalUrl = buildAffiliateUrl(resolved.url, slug, effectiveRegion);
    } catch {
      finalUrl = resolved.url; // Fallback if URL construction fails
    }

    // Fire-and-forget click log (do not await — keep redirect fast)
    const sessionId = request.cookies.get("t4g_sid")?.value || crypto.randomUUID().slice(0, 12);
    logClick({
      product_slug: slug,
      country_code: cfCountry.slice(0, 2),
      platform: resolved.platform,
      referrer_url: request.headers.get("referer") || undefined,
      session_id: sessionId,
      user_agent: request.headers.get("user-agent") || undefined,
    }).catch(() => {}); // Truly fire-and-forget

    // 302 redirect to affiliate destination
    return NextResponse.redirect(finalUrl, {
      status: 302,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-T4G-Platform": resolved.platform,
        "X-T4G-Region": effectiveRegion,
      },
    });
  } catch (error) {
    console.error("Geo-routing error:", error);
    // Fallback: redirect to product page
    return NextResponse.redirect(new URL(`/products/${slug}`, request.url), 302);
  }
}
