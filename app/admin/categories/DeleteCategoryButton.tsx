"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteCategoryButton({
  id,
  name,
  productCount,
}: {
  id: string;
  name: string;
  productCount: number;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const warning =
      productCount > 0
        ? `"${name}" has ${productCount} product(s) linked to it. Deleting it will unlink those products. Continue?`
        : `Delete category "${name}"? This cannot be undone.`;

    if (!confirm(warning)) return;

    setDeleting(true);
    const { deleteCategory } = await import("@/app/actions/sanity");
    const result = await deleteCategory(id);
    if (result.error) {
      alert("Error: " + result.error);
      setDeleting(false);
    } else {
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      title="Delete category"
      className="p-2 text-[#CCC] hover:text-red-500 transition-colors rounded-md hover:bg-red-50 shrink-0"
    >
      <Trash2 size={15} />
    </button>
  );
}
