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
import styles from "./ProductDetails.module.css";

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

      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Unavailable banner */}
          {searchParams.unavailable && (
            <div className={styles.unavailableBanner}>
              ⚠️ This product is not currently available for direct purchase in your region.
              {relatedProducts.length > 0 && " Here are some alternatives you might like:"}
            </div>
          )}

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
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
          <div className={styles.productgrid}>
            {/* Left: Images */}
            <ProductImageGallery images={product.images || []} mainImageUrl={product.mainImageUrl} productName={product.name} />

            {/* Right: Product info */}
            <div className={styles.productInfo}>
              {categoryName && (
                <Link href={`/products?category=${categorySlug}`} className={`badge-tag inline-block hover:border-black ${styles.categoryTag}`}>
                  {categoryName}
                </Link>
              )}

              <h1 className={styles.productTitle}>{product.name}</h1>

              <div className={styles.ratingRow}>
                <StarRating rating={product.rating || 0} size="md" />
                <span className={styles.ratingText}>{product.rating?.toFixed(1)} / 5</span>
                <a href="#verdict" className={styles.verdictLink}>
                  (Our Verdict)
                </a>
              </div>

              {/* Region callout */}
              <div className={`callout-region ${styles.regionCallout}`}>
                <span className="mr-2">{getCountryFlag(region)}</span>
                Shopping from <strong>{getCountryName(region)}</strong> —{" "}
                {regionLink
                  ? `We'll send you to ${regionLink.platform}`
                  : `We'll find the best available store`}
              </div>

              {/* Price */}
              {regionLink?.displayPrice && (
                <div className={styles.priceSection}>
                  <span className={styles.price}>{regionLink.displayPrice}</span>
                  <p className={styles.priceNote}>Price may vary by region and retailer</p>
                </div>
              )}

              {/* Buy Now */}
              <a
                href={`/go/${slug}/${region}`}
                className={`btn-primary ${styles.buyButton}`}
              >
                <ShoppingCart size={18} />
                Buy Now
              </a>

              {regionLink && (
                <p className={styles.redirectText}>
                  You will be redirected to <strong>{regionLink.platform}</strong> to complete your purchase
                </p>
              )}
            </div>
          </div>

          {/* Available On — full width below image + info */}
          {product.affiliateLinks && product.affiliateLinks.length > 0 && (
            <div className={styles.availableOnWrapper}>
              <div className={styles.availableOnHeader}>
                Available On
              </div>
              <div className={styles.availableOnList}>
                {product.affiliateLinks.filter((l) => l.active).map((link) => (
                  <div key={link.countryCode} className={styles.availableOnRow}>
                    <div className={styles.availableOnLeft}>
                      <span className={styles.availableOnCode}>{link.countryCode}</span>
                      <span>{link.platform}</span>
                    </div>
                    <div className={styles.availableOnRight}>
                      {link.displayPrice && <span className={styles.availableOnPrice}>{link.displayPrice}</span>}
                      <a
                        href={`/go/${slug}/${link.countryCode}`}
                        className={styles.availableOnLink}
                      >
                        Visit <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs: Overview, Specs, Verdict */}
          <ProductTabs product={product} />
          {/* Related products */}
          {relatedProducts.length > 0 && (

            <div className={styles.relatedProducts}>
              <h2 className={`section-heading ${styles.relatedHeading}`}>You Might Also Like</h2>
              <div className={styles.relatedGrid}>
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
      <div className={styles.galleryPlaceholder}>
        <span className={styles.galleryPlaceholderIcon}>📦</span>
      </div>
    );
  }

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.galleryMainImage}>
        {images.length > 0 ? (
          <Image
            src={urlFor(images[0]).width(800).height(1067).url()}
            alt={images[0].alt || productName}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={mainImageUrl!}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      {images.length > 1 && (
        <div className={styles.galleryThumbs}>
          {images.slice(0, 6).map((img, i) => (
            <div key={img._key || i} className={styles.galleryThumb}>
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
    <div id="verdict" className={styles.tabsWrapper}>
      {/* Overview */}
      <div className={styles.tabSection}>
        <h2 className={styles.tabHeading}>
          <span className={styles.tabHeadingAccent} />
          Overview
        </h2>
        {product.shortDescription && (
          <p className={styles.tabDescription}>{product.shortDescription}</p>
        )}

        {(hasPros || hasCons) && (
          <div className={styles.prosConsGrid}>
            {hasPros && (
              <div>
                <h3 className={styles.prosConsTitle}>Pros</h3>
                <ul className={styles.prosConsList}>
                  {product.pros.map((pro: string, i: number) => (
                    <li key={i} className={styles.prosConsItem}>
                      <span className={styles.prosConsSign}>+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasCons && (
              <div>
                <h3 className={styles.prosConsTitle}>Cons</h3>
                <ul className={styles.prosConsList}>
                  {product.cons.map((con: string, i: number) => (
                    <li key={i} className={styles.prosConsItem}>
                      <span className={styles.prosConsSign}>−</span>
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
        <div className={styles.tabSection}>
          <h2 className={styles.tabHeading}>
            <span className={styles.tabHeadingAccent} />
            Specifications
          </h2>
          <table className={styles.specsTable}>
            <tbody>
              {product.specs.map((spec: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? styles.specsRowEven : styles.specsRowOdd}>
                  <td className={styles.specsKey}>{spec.key}</td>
                  <td className={styles.specsValue}>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Verdict */}
      {product.verdict && (
        <div className={styles.tabSection}>
          <h2 className={styles.tabHeading}>
            <span className={styles.tabHeadingAccent} />
            Our Verdict
          </h2>
          <p className={styles.verdictText}>{product.verdict}</p>
          {product.ratingOutOf10 && (
            <div className={styles.verdictScore}>
              <span className={styles.verdictScoreNumber}>{product.ratingOutOf10}</span>
              <span className={styles.verdictScoreDenom}>/10</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}