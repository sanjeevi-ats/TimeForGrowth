import { sanityWriteClient as sanityClient } from "@/lib/sanity";
import { FolderOpen } from "lucide-react";
import AddCategoryForm from "./AddCategoryForm";
import DeleteCategoryButton from "./DeleteCategoryButton";

export const dynamic = "force-dynamic";


async function getCategories() {
  try {
    return await sanityClient.fetch(
      `*[_type == "category"] | order(order asc) {
        _id, name, "slug": slug.current, description, order,
        "productCount": count(*[_type == "product" && references(^._id)])
      }`
    );
  } catch {
    return [];
  }
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Categories</h1>
          <p className="text-[#666] text-sm mt-1">{categories.length} categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
        {/* Left — Add Category Form */}
        <div className="desktop:col-span-1">
          <div className="bg-white border border-[#E0E0E0] rounded-card p-6 sticky top-6">
            <h2 className="font-bold text-sm uppercase tracking-wider text-[#666] mb-4">New Category</h2>
            <AddCategoryForm nextOrder={categories.length + 1} />
          </div>
        </div>

        {/* Right — Category Grid */}
        <div className="desktop:col-span-2 space-y-3">
          {categories.length === 0 ? (
            <div className="bg-white border border-[#E0E0E0] rounded-card p-12 text-center text-[#999]">
              No categories yet. Use the form to add your first one.
            </div>
          ) : (
            categories.map((cat: any) => (
              <div
                key={cat._id}
                className="bg-white border border-[#E0E0E0] rounded-card p-4 flex items-center gap-4"
              >
                <div className="p-2.5 bg-[#F5F5F5] rounded-md shrink-0">
                  <FolderOpen size={18} className="text-[#666]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-black">{cat.name}</div>
                  <div className="text-xs text-[#999] mt-0.5">/{cat.slug}</div>
                  {cat.description && (
                    <p className="text-sm text-[#666] mt-1 line-clamp-2">{cat.description}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-medium">{cat.productCount}</div>
                  <div className="text-xs text-[#999]">products</div>
                </div>
                <DeleteCategoryButton id={cat._id} name={cat.name} productCount={cat.productCount} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
