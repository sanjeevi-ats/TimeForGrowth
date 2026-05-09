import { sanityWriteClient as sanityClient } from "@/lib/sanity";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductsFilter from "@/components/admin/ProductsFilter";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "product"] | order(_updatedAt desc) {
        _id, name, "slug": slug.current,
        status, _updatedAt,
        "category": category->{name},
        "imageCount": count(images),
        "regionCount": count(affiliateLinks[active == true]),
        "images": images[0]
      }`
    );
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Products</h1>
          <p className="text-[#666] text-sm mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <ProductsFilter products={products} />
    </div>
  );
}
