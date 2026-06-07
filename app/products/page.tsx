import type { Metadata } from "next";
import { sanityWriteClient as sanityClient, productFields } from "@/lib/sanity";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/types";
import styles from "./ProductsPage.module.css";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete curated collection of tech gear, cameras, audio equipment, and more.",
};

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && status == "published"] | order(_createdAt desc) {${productFields}}`
    );
  } catch {
    return [];
  }
}

async function getCategories(): Promise<{ name: string; slug: string }[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "category"] | order(order asc, name asc) { name, "slug": slug.current }`
    );
  } catch {
    return [];
  }
}

// Returns a small inline SVG icon based on the category name
function CategorySvgIcon({ name }: { name: string }) {
  const n = name.toLowerCase();

  if (n.includes("book")) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
      </svg>
    );
  }
  if (n.includes("journal")) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="14" height="20" rx="2" />
        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2" />
        <line x1="10" y1="8" x2="16" y2="8" />
        <line x1="10" y1="12" x2="16" y2="12" />
        <line x1="10" y1="16" x2="13" y2="16" />
      </svg>
    );
  }
  if (n.includes("gadget") || n.includes("tech") || n.includes("electron") || n.includes("laptop") || n.includes("mobile")) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (n.includes("wellness") || n.includes("health") || n.includes("fitness")) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <line x1="12" y1="9" x2="12" y2="15" />
        <line x1="9" y1="12" x2="15" y2="12" />
      </svg>
    );
  }
  // Default: tag/grid icon
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; q?: string; top10?: string };
}) {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  let filtered = products;

  // Category filter
  if (searchParams.category) {
    filtered = filtered.filter(
      (p) => (p.category as any)?.slug?.current === searchParams.category ||
              (p.category as any)?.slug === searchParams.category
    );
  }

  // Text search
  if (searchParams.q) {
    const q = searchParams.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort
  if (searchParams.sort === "rating") {
    filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (searchParams.sort === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  // Top 10 filter
  const isTop10 = searchParams.top10 === "1";
  const displayed = isTop10 ? filtered.slice(0, 10) : filtered;

  // Build base href (without top10 param) for other filter links
  const baseParams = new URLSearchParams();
  if (searchParams.category) baseParams.set("category", searchParams.category);
  if (searchParams.sort) baseParams.set("sort", searchParams.sort);
  if (searchParams.q) baseParams.set("q", searchParams.q);
  const baseHref = `/products${baseParams.toString() ? `?${baseParams}` : ""}`;

  return (
    <div className={styles.pageWrapper}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>All Products</h1>
        <p className={styles.pageSubtitle}>
          {isTop10
            ? `Showing top ${displayed.length} of ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`
            : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`}
          {searchParams.category ? ` in ${searchParams.category}` : ""}
        </p>
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        {/* All pill — no icon */}
        <FilterLink
          label="All"
          href="/products"
          active={!searchParams.category && !searchParams.sort && !searchParams.q && !isTop10}
        />

        {/* Category pills with icons */}
        {categories.map((cat) => (
          <FilterLinkWithIcon
            key={cat.slug}
            label={cat.name}
            icon={<CategorySvgIcon name={cat.name} />}
            href={`/products?category=${cat.slug}`}
            active={searchParams.category === cat.slug && !isTop10}
          />
        ))}

        {/* Divider */}
        <span className={styles.filterDivider} />

        {/* Top 10 filter */}
        <FilterLink
          label="🏆 Top 10"
          href={isTop10 ? baseHref || "/products" : `${baseHref}${baseHref.includes("?") ? "&" : "?"}top10=1`}
          active={isTop10}
        />

        {/* Sort options pushed to the right */}
        <span className={styles.filterSortGroup}>
          <FilterLink
            label="Highest Rated"
            href={`/products${searchParams.category ? `?category=${searchParams.category}&` : "?"}sort=rating${isTop10 ? "&top10=1" : ""}`}
            active={searchParams.sort === "rating"}
          />
          <FilterLink
            label="A-Z"
            href={`/products${searchParams.category ? `?category=${searchParams.category}&` : "?"}sort=name${isTop10 ? "&top10=1" : ""}`}
            active={searchParams.sort === "name"}
          />
        </span>
      </div>

      {/* Product grid */}
      {displayed.length > 0 ? (
        <div className={styles.productList}>
          {displayed.map((product, index) => (
            <div key={product._id} className={styles.productRow}>
              {isTop10 && (
                <div className={styles.rankBadge}>
                  #{index + 1}
                </div>
              )}
              <ProductCard product={product} variant="horizontal" />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h2 className={styles.emptyTitle}>No products found</h2>
          <p className={styles.emptyText}>Try a different category or search term.</p>
        </div>
      )}
    </div>
  );
}

function FilterLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <a href={href} className={active ? styles.filterPillActive : styles.filterPill}>
      {label}
    </a>
  );
}

function FilterLinkWithIcon({
  label,
  icon,
  href,
  active,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  active: boolean;
}) {
  return (
    <a href={href} className={active ? styles.filterPillActive : styles.filterPill}>
      {icon}
      {label}
    </a>
  );
}