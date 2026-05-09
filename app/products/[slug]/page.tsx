import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { ChevronRight, ShoppingCart, ExternalLink } from "lucide-react";
import { sanityWriteClient as sanityClient, urlFor, productFields } from "@/lib/sanity";
import { StarRating } from "@/components/products/ProductCard";
import ProductCard from "@/components/products/ProductCard";
import { getRegion, getCountryName, getCountryFlag } from "@/lib/geo";
import type { Product } from "@/lib/types";

interface Props {
  params: { slug: string };
  searchParams: { unavailable?: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seo?.metaTitle || product.name,
    description: product.seo?.metaDescription || product.shortDescription,
    openGraph: {
      title: `${product.name} | Time For Growth`,
      description: product.shortDescription,
      images: product.images?.[0]
        ? [{ url: urlFor(product.images[0]).width(1200).height(630).url() }]
        : product.mainImageUrl
        ? [{ url: product.mainImageUrl }]
        : [],
    },
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug && status == "published"][0]{
        ${productFields},
        longDescription,
        specs,
        ratingOutOf10
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

async function getRelatedProducts(category: any, exclude: string): Promise<Product[]> {
  try {
    const catRef = category?._ref;
    if (!catRef) return [];
    return await sanityClient.fetch(
      `*[_type == "product" && status == "published" && category._ref == $catRef && slug.current != $exclude][0...4]{${productFields}}`,
      { catRef, exclude }
    );
  } catch {
    return [];
  }
}


export default async function SingleProductPage({ params, searchParams }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);
  const product = await getProduct(decodedSlug);
  if (!product) notFound();

  const cookieStore = cookies();
  const region = (cookieStore as any).get("t4g_region")?.value || "IN";
  const regionInfo = getRegion(region);

  const slug = typeof product.slug === "string" ? product.slug : (product.slug as any)?.current;
  const categoryName = (product.category as any)?.name;
  const categorySlug = (product.category as any)?.slug?.current;
  const relatedProducts = await getRelatedProducts((product.category as any), slug);

  // Find platform for current region
  const regionLink = product.affiliateLinks?.find(
    (l) => l.countryCode.toUpperCase() === region.toUpperCase() && l.active
  );

  // Structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images?.[0] 
      ? urlFor(product.images[0]).width(800).height(800).url() 
      : product.mainImageUrl 
      ? product.mainImageUrl 
      : undefined,
    aggregateRating: product.rating
      ? { "@type": "AggregateRating", ratingValue: product.rating, bestRating: 5, worstRating: 1 }
      : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Unavailable banner */}
          {searchParams.unavailable && (
            <div className="mb-6 p-4 border border-[#E0E0E0] rounded-card bg-[#F9F9F9] text-sm text-[#666]">
              ⚠️ This product is not currently available for direct purchase in your region.
              {relatedProducts.length > 0 && " Here are some alternatives you might like:"}
            </div>
          )}

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-[#666] mb-6">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-black transition-colors">Products</Link>
            {categoryName && (
              <>
                <ChevronRight size={12} />
                <Link href={`/products?category=${categorySlug}`} className="hover:text-black transition-colors">
                  {categoryName}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-black font-medium">{product.name}</span>
          </nav>

          {/* Main 2-col layout */}
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-10 mb-16">
          {/* Left: Images */}
          <ProductImageGallery images={product.images || []} mainImageUrl={product.mainImageUrl} productName={product.name} />

          {/* Right: Product info */}
          <div>
            {categoryName && (
              <Link href={`/products?category=${categorySlug}`} className="badge-tag mb-3 inline-block hover:border-black">
                {categoryName}
              </Link>
            )}

            <h1 className="text-3xl font-black text-black mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating || 0} size="md" />
              <span className="text-sm text-[#666]">{product.rating?.toFixed(1)} / 5</span>
              <a href="#verdict" className="text-xs text-[#666] underline hover:text-black transition-colors">
                (Our Verdict)
              </a>
            </div>

            <p className="text-[#333] leading-relaxed mb-6">{product.shortDescription}</p>

            {/* Region callout */}
            <div className="callout-region mb-4">
              <span className="mr-2">{getCountryFlag(region)}</span>
              Shopping from <strong>{getCountryName(region)}</strong> —{" "}
              {regionLink
                ? `We'll send you to ${regionLink.platform}`
                : `We'll find the best available store`}
            </div>

            {/* Price */}
            {regionLink?.displayPrice && (
              <div className="mb-4">
                <span className="text-2xl font-black">{regionLink.displayPrice}</span>
                <p className="text-xs text-[#999] mt-0.5">Price may vary by region and retailer</p>
              </div>
            )}

            {/* Buy Now */}
            <a
              href={`/go/${slug}/${region}`}
              className="btn-primary w-full justify-center text-base py-4 mb-3"
            >
              <ShoppingCart size={18} />
              Buy Now
            </a>

            {regionLink && (
              <p className="text-xs text-[#999] text-center mb-6">
                You will be redirected to <strong>{regionLink.platform}</strong> to complete your purchase
              </p>
            )}

            {/* Available On table */}
            {product.affiliateLinks && product.affiliateLinks.length > 0 && (
              <div className="border border-[#E0E0E0] rounded-card overflow-hidden">
                <div className="px-4 py-3 bg-[#F9F9F9] border-b border-[#E0E0E0] text-xs font-semibold uppercase tracking-wider text-[#666]">
                  Available On
                </div>
                <div className="divide-y divide-[#E0E0E0]">
                  {product.affiliateLinks.filter((l) => l.active).map((link) => (
                    <div key={link.countryCode} className="flex items-center justify-between px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#666] w-8">{link.countryCode}</span>
                        <span>{link.platform}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {link.displayPrice && <span className="font-semibold">{link.displayPrice}</span>}
                        <a
                          href={`/go/${slug}/${link.countryCode}`}
                          className="text-xs text-[#666] hover:text-black flex items-center gap-0.5 transition-colors"
                        >
                          Visit <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Overview, Specs, Verdict */}
        <ProductTabs product={product} />

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="section-heading mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} variant="compact" />
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

// ============================================================
// Image Gallery
// ============================================================
function ProductImageGallery({ images, mainImageUrl, productName }: { images: any[]; mainImageUrl?: string; productName: string }) {
  if (images.length === 0 && !mainImageUrl) {
    return (
      <div className="aspect-square rounded-card bg-[#F5F5F5] flex items-center justify-center">
        <span className="text-8xl opacity-20">📦</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-card overflow-hidden bg-[#F5F5F5]">
        {images.length > 0 ? (
          <Image
            src={urlFor(images[0]).width(800).height(800).url()}
            alt={images[0].alt || productName}
            fill
            className="object-contain p-4"
            priority
          />
        ) : (
          <Image
            src={mainImageUrl!}
            alt={productName}
            fill
            className="object-contain p-4"
            priority
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.slice(0, 6).map((img, i) => (
            <div key={img._key || i} className="relative w-16 h-16 rounded border border-[#E0E0E0] overflow-hidden cursor-pointer hover:border-black transition-colors shrink-0">
              <Image
                src={urlFor(img).width(120).height(120).url()}
                alt={img.alt || `${productName} image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Tabs — simplified server version (CSS-based tabs)
// ============================================================
function ProductTabs({ product }: { product: any }) {
  const hasSpecs = product.specs && product.specs.length > 0;
  const hasPros = product.pros && product.pros.length > 0;
  const hasCons = product.cons && product.cons.length > 0;

  return (
    <div id="verdict" className="border border-[#E0E0E0] rounded-card overflow-hidden">
      {/* Overview */}
      <div className="p-6 border-b border-[#E0E0E0]">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-black rounded-full inline-block" />
          Overview
        </h2>
        {product.shortDescription && (
          <p className="text-[#333] leading-relaxed mb-4">{product.shortDescription}</p>
        )}

        {(hasPros || hasCons) && (
          <div className="grid tablet:grid-cols-2 gap-6 mt-4">
            {hasPros && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-black">Pros</h3>
                <ul className="space-y-2">
                  {product.pros.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#333]">
                      <span className="text-black font-bold mt-0.5">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasCons && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-black">Cons</h3>
                <ul className="space-y-2">
                  {product.cons.map((con: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#333]">
                      <span className="text-black font-bold mt-0.5">−</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Specs */}
      {hasSpecs && (
        <div className="p-6 border-b border-[#E0E0E0]">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-black rounded-full inline-block" />
            Specifications
          </h2>
          <table className="w-full text-sm">
            <tbody>
              {product.specs.map((spec: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"}>
                  <td className="py-2.5 px-4 font-medium text-[#333] w-1/2">{spec.key}</td>
                  <td className="py-2.5 px-4 text-[#666]">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Verdict */}
      {product.verdict && (
        <div className="p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-black rounded-full inline-block" />
            Our Verdict
          </h2>
          <p className="text-[#333] leading-relaxed mb-6">{product.verdict}</p>
          {product.ratingOutOf10 && (
            <div className="inline-flex items-baseline gap-1">
              <span className="text-5xl font-black">{product.ratingOutOf10}</span>
              <span className="text-2xl text-[#999] font-light">/10</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
