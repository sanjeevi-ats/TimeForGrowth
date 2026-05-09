"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trophy } from "lucide-react";
import type { Product } from "@/lib/types";

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "published") return <span className="badge-published">{status}</span>;
  if (status === "draft") return <span className="badge-draft">{status}</span>;
  return <span className="badge-archived">{status}</span>;
};

interface ProductsFilterProps {
  products: Product[];
}

export default function ProductsFilter({ products }: ProductsFilterProps) {
  const [showTop10, setShowTop10] = useState(false);

  const displayed = showTop10 ? products.slice(0, 10) : products;

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setShowTop10(false)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
            !showTop10
              ? "bg-black text-white border-black"
              : "bg-white text-[#666] border-[#E0E0E0] hover:border-black hover:text-black"
          }`}
        >
          All Products
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
            {products.length}
          </span>
        </button>
        <button
          onClick={() => setShowTop10(true)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
            showTop10
              ? "bg-black text-white border-black"
              : "bg-white text-[#666] border-[#E0E0E0] hover:border-black hover:text-black"
          }`}
        >
          <Trophy size={12} />
          Top 10 Products
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E0E0E0] rounded-card overflow-hidden">
        {showTop10 && (
          <div className="flex items-center gap-2 px-5 py-3 bg-[#FAFAFA] border-b border-[#E0E0E0]">
            <Trophy size={14} className="text-[#999]" />
            <span className="text-xs font-semibold text-[#666]">
              Showing top {Math.min(10, products.length)} products (most recently updated)
            </span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                {showTop10 && <th>#</th>}
                <th>Product</th>
                <th>Category</th>
                <th>Status</th>
                <th>Regions</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length > 0 ? (
                displayed.map((product, index) => (
                  <tr key={product._id}>
                    {showTop10 && (
                      <td className="font-bold text-[#999] w-8">#{index + 1}</td>
                    )}
                    <td>
                      <span className="font-medium text-black">{product.name}</span>
                      <span className="block text-xs text-[#999]">/{product.slug as any}</span>
                    </td>
                    <td>{(product.category as any)?.name || "—"}</td>
                    <td><StatusBadge status={product.status} /></td>
                    <td>
                      <span className="text-sm">
                        {(product as any).regionCount || 0} regions
                      </span>
                    </td>
                    <td className="text-xs text-[#999]">
                      {new Date(product._updatedAt).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <Link
                        href={`/admin/products/${product._id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#666] hover:text-black transition-colors"
                      >
                        <Edit size={13} /> Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={showTop10 ? 7 : 6} className="text-center py-12 text-[#999]">
                    No products yet.{" "}
                    <Link href="/admin/products/new" className="underline hover:text-black transition-colors">
                      Add your first product
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
