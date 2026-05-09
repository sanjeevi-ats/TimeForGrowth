import { sanityWriteClient } from "@/lib/sanity";
import NewProductForm from "./NewProductForm";

async function getCategories() {
  try {
    return await sanityWriteClient.fetch(
      `*[_type == "category"] | order(order asc) { _id, name, "slug": slug.current }`
    );
  } catch {
    return [];
  }
}

export default async function NewProductPage() {
  const categories = await getCategories();
  return <NewProductForm categories={categories} />;
}
