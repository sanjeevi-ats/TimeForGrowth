import { notFound } from "next/navigation";
import { sanityWriteClient } from "@/lib/sanity";
import EditProductForm from "./EditProductForm";

interface Props {
  params: { id: string };
}

async function getProduct(id: string) {
  try {
    return await sanityWriteClient.fetch(
      `*[_id == $id][0]{
        _id,
        name,
        slug,
        shortDescription,
        mainImageUrl,
        status,
        rating,
        featured,
        pros,
        cons,
        affiliateLinks,
        "category": category->slug.current
      }`,
      { id }
    );
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return null;
  }
}

async function getCategories() {
  try {
    return await sanityWriteClient.fetch(
      `*[_type == "category"] | order(order asc) { _id, name, "slug": slug.current }`
    );
  } catch {
    return [];
  }
}

export default async function EditProductPage({ params }: Props) {
  const [product, categories] = await Promise.all([
    getProduct(params.id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} categories={categories} />;
}
