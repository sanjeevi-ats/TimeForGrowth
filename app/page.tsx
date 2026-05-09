import { cookies } from "next/headers";
import { sanityWriteClient as sanityClient, productFields } from "@/lib/sanity";
import {
  AdvancedHeroSlider,
  AdvancedCategoryCardsSection,
  AdvancedCategorySection,
  AdvancedTestimonialsSection,
  AdvancedNewsletterSection,
} from "@/components/home/AdvancedPremiumHome";
import type { Product } from "@/lib/types";

export const revalidate = 60;

async function getAllProducts(): Promise<Product[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && status == "published"] | order(_createdAt desc) {${productFields}}`
    );
  } catch { return []; }
}

export default async function HomePage() {
  const cookieStore = cookies();
  const region = (cookieStore as any).get("t4g_region")?.value || "IN";

  const allProducts = await getAllProducts();

  return (
    <>
      <AdvancedHeroSlider />
      
      {/* Category cards section - clickable category cards */}
      <AdvancedCategoryCardsSection />
      
      {/* Category-based product sections */}
      <AdvancedCategorySection 
        products={allProducts} 
        categoryName="Books" 
        categorySlug="books"
        sectionTitle="TOP SELF-IMPROVEMENT BOOKS"
        region={region}
      />
      
      <AdvancedCategorySection 
        products={allProducts} 
        categoryName="Journals" 
        categorySlug="journals"
        sectionTitle="BEST GROWTH JOURNALS"
        region={region}
      />
      
      <AdvancedCategorySection 
        products={allProducts} 
        categoryName="Gadgets" 
        categorySlug="gadgets"
        sectionTitle="PRODUCTIVITY GADGETS"
        region={region}
      />
      
      <AdvancedCategorySection 
        products={allProducts} 
        categoryName="Wellness" 
        categorySlug="wellness"
        sectionTitle="TOP WELLNESS ESSENTIALS"
        region={region}
      />
      
      <AdvancedTestimonialsSection />
      <AdvancedNewsletterSection />
    </>
  );
}
