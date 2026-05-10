"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Star, Search, X } from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductSearchFilterProps {
  products: Product[];
  initialQuery?: string;
}

export function ProductSearchFilter({ products, initialQuery = "" }: ProductSearchFilterProps) {
  const [query, setQuery] = useState(initialQuery);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;

    const searchTerm = query.toLowerCase().trim();

    return products.filter((product) => {
      // Search across multiple fields
      const searchableText = [
        product.name,
        product.shortDescription,
        product.category?.name,
        ...(product.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [query, products]);

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  const hasResults = filteredProducts.length > 0;
  const isSearching = query.trim().length > 0;

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <div className="flex items-center gap-3 px-5 py-4 border-2 border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors focus-within:border-black">
            <Search size={20} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, category, description, or keywords…"
              className="flex-1 text-base text-black outline-none placeholder:text-gray-400 bg-transparent"
              autoFocus
            />
            {query && (
              <button
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-black transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Search stats */}
        {isSearching && (
          <div className="mt-3 text-sm text-gray-600">
            Found <span className="font-semibold text-black">{filteredProducts.length}</span> product
            {filteredProducts.length !== 1 ? "s" : ""} matching "{query}"
          </div>
        )}
      </div>

      {/* Results Grid */}
      {hasResults ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : isSearching ? (
        // No results state
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="py-16 text-center"
        >
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-black mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any products matching "<span className="font-semibold">{query}</span>"
          </p>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-900 transition-colors"
          >
            Clear search
          </button>
        </motion.div>
      ) : (
        // Initial state - show all products
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.mainImageUrl || (product.images?.[0]?.asset?._ref ? `https://cdn.sanity.io/images/.../${product.images[0].asset._ref}` : null);

  // Get rating from product (fallback to random for demo)
  const rating = product.rating || (Math.random() * 2 + 3.8).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  return (
    <Link href={`/products/${product.slug?.current || product._id}`}>
      <motion.div
        whileHover={{ y: -12 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group cursor-pointer h-full w-full flex flex-col"
      >
        {/* Card container with consistent border - full height */}
        <div className="h-full w-full flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
          {/* Image container - colorful product images with fixed aspect ratio */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border-b border-gray-200 flex-shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📦</div>
                  <div className="text-xs text-gray-600">Product Image</div>
                </div>
              </div>
            )}

            {/* Hover overlay with quick view */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white font-semibold text-sm">Quick View</span>
            </div>
          </div>

          {/* Content - improved layout with consistent padding and full flex */}
          <div className="flex-1 flex flex-col p-4 sm:p-5 space-y-3 w-full">
            {/* Category badge */}
            {product.category?.name && (
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {product.category.name}
              </span>
            )}

            {/* Title - clean and readable */}
            <h3 className="text-base font-bold text-black group-hover:text-gray-800 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>

            {/* Description - meaningful content */}
            {product.shortDescription && (
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">
                {product.shortDescription}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-1" />

            {/* Rating section */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(Number(rating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-black">{rating}</span>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>

            {/* CTA - bottom section with consistent spacing and mt-auto */}
            <div className="flex items-center justify-end pt-2 border-t border-gray-200 mt-auto w-full">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="inline-flex items-center gap-1 px-3 py-2 bg-black text-white rounded-full text-xs font-semibold group-hover:bg-gray-900 transition-colors">
                  View
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
