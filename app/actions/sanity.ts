"use server";

import { sanityWriteClient } from "@/lib/sanity";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: any, links: any[]) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "Authentication missing. Please add your SANITY_API_TOKEN to .env.local" };
  }

  try {
    const doc: any = {
      _type: "product",
      name: formData.name,
      slug: { _type: "slug", current: formData.slug.trim() },
      mainImageUrl: formData.mainImageUrl || undefined,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      shortDescription: formData.shortDescription,
      description: formData.description,
      status: formData.status,
      featured: formData.featured === "true",
      pros: formData.pros ? formData.pros.split("\n").filter(Boolean) : [],
      cons: formData.cons ? formData.cons.split("\n").filter(Boolean) : [],
      affiliateLinks: links.map((link) => ({
        _key: crypto.randomUUID(),
        countryCode: link.countryCode,
        platform: link.platform,
        url: link.url,
        displayPrice: link.displayPrice,
        active: link.active,
      })),
    };

    // Resolve category slug → proper Sanity reference
    if (formData.category) {
      const cat = await sanityWriteClient.fetch(
        `*[_type == "category" && slug.current == $slug][0]{ _id }`,
        { slug: formData.category }
      );
      if (cat?._id) {
        doc.category = { _type: "reference", _ref: cat._id };
      }
    }

    await sanityWriteClient.create(doc);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error: any) {
    console.error("Sanity write error:", error);
    return { error: error.message || "Failed to create product in Sanity." };
  }
}

export async function createArticle(formData: any) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "Authentication missing. Please add your SANITY_API_TOKEN to .env.local" };
  }

  try {
    const doc = {
      _type: "article",
      title: formData.title,
      slug: { _type: "slug", current: formData.slug.trim() },
      mainImageUrl: formData.mainImageUrl || undefined,
      type: formData.type,
      author: formData.author,
      status: formData.status,
      excerpt: formData.excerpt,
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
      },
      // Note: Full Portable Text (rich text) is tough to construct from plain text without a parser.
      // We will save it as a simple block text for now.
      body: [
        {
          _type: "block",
          _key: crypto.randomUUID(),
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: crypto.randomUUID(),
              marks: [],
              text: formData.body,
            },
          ],
        },
      ],
    };

    await sanityWriteClient.create(doc);
    
    revalidatePath("/admin/articles");
    if (formData.type === "review" || formData.type === "tutorial") revalidatePath("/reviews");
    else revalidatePath("/buying-guides");

    return { success: true };
  } catch (error: any) {
    console.error("Sanity write error:", error);
    return { error: error.message || "Failed to create article in Sanity." };
  }
}

export async function updateArticle(id: string, formData: any) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "SANITY_API_TOKEN not configured." };
  }
  
  try {
    const modifications: any = {
      title: formData.title,
      slug: { _type: "slug", current: formData.slug.trim() },
      mainImageUrl: formData.mainImageUrl || undefined,
      type: formData.type,
      author: formData.author,
      status: formData.status,
      excerpt: formData.excerpt,
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
      },
    };

    // Only patch body if provided (otherwise we keep the existing rich text)
    if (formData.body && formData.body.trim() !== "") {
      modifications.body = [
        {
          _type: "block",
          _key: crypto.randomUUID(),
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: crypto.randomUUID(),
              marks: [],
              text: formData.body,
            },
          ],
        },
      ];
    }

    await sanityWriteClient.patch(id).set(modifications).commit();
    
    revalidatePath("/admin/articles");
    if (formData.type === "review" || formData.type === "tutorial") revalidatePath("/reviews");
    else revalidatePath("/buying-guides");
    revalidatePath(`/${formData.slug}`);

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update article." };
  }
}

export async function deleteArticle(id: string) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "SANITY_API_TOKEN not configured." };
  }
  try {
    await sanityWriteClient.delete(id);
    revalidatePath("/admin/articles");
    revalidatePath("/reviews");
    revalidatePath("/buying-guides");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete article." };
  }
}

export async function updateProduct(id: string, formData: any, links: any[]) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "SANITY_API_TOKEN not configured." };
  }
  try {
    // Resolve category slug → Sanity document _id
    let categoryRef: { _type: "reference"; _ref: string } | undefined;
    if (formData.category && formData.category.trim() !== "") {
      const catId: string | null = await sanityWriteClient.fetch(
        `*[_type == "category" && slug.current == $slug][0]._id`,
        { slug: formData.category.trim() }
      );
      if (catId) categoryRef = { _type: "reference", _ref: catId };
    }

    const patch = sanityWriteClient.patch(id).set({
      name: formData.name,
      slug: { _type: "slug", current: formData.slug.trim() },
      mainImageUrl: formData.mainImageUrl || undefined,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      shortDescription: formData.shortDescription,
      status: formData.status,
      featured: formData.featured === "true",
      pros: formData.pros ? formData.pros.split("\n").filter(Boolean) : [],
      cons: formData.cons ? formData.cons.split("\n").filter(Boolean) : [],
      affiliateLinks: links.map((link) => ({
        _key: link._key || crypto.randomUUID(),
        countryCode: link.countryCode,
        platform: link.platform,
        url: link.url,
        displayPrice: link.displayPrice,
        active: link.active,
      })),
    });

    // Set or unset the category reference
    if (categoryRef) {
      patch.set({ category: categoryRef });
    } else {
      patch.unset(["category"]);
    }

    await patch.commit();
    revalidatePath("/admin/products");
    revalidatePath("/products", "layout");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update product." };
  }
}


export async function deleteProduct(id: string) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "SANITY_API_TOKEN not configured." };
  }
  try {
    await sanityWriteClient.delete(id);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete product." };
  }
}

export async function createCategory(name: string, slug: string, description: string, order: number) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "SANITY_API_TOKEN not configured." };
  }
  try {
    const existing = await sanityWriteClient.fetch(
      `*[_type == "category" && slug.current == $slug][0]._id`,
      { slug }
    );
    if (existing) return { error: `A category with slug "${slug}" already exists.` };

    await sanityWriteClient.create({
      _type: "category",
      name: name.trim(),
      slug: { _type: "slug", current: slug.trim() },
      description: description.trim() || undefined,
      order,
    });
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create category." };
  }
}

export async function deleteCategory(id: string) {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.includes("your-sanity")) {
    return { error: "SANITY_API_TOKEN not configured." };
  }
  try {
    await sanityWriteClient.delete(id);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete category." };
  }
}
