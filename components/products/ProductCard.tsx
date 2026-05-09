import Link from "next/link";
import Image from "next/image";
import { Star, StarHalf, ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { generateStars } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}

export default function ProductCard({ product, variant = "default", className = "" }: ProductCardProps) {
  const stars = generateStars(product.rating || 0);
  const mainImage = product.images?.[0];
  const categoryName = (product.category as any)?.name || "";
  const categorySlug = (product.category as any)?.slug?.current || "";
  const productSlug = typeof product.slug === "string" ? product.slug : product.slug?.current;

  if (variant === "horizontal") {
    return (
      <div className={`product-card flex gap-4 p-4 ${className}`}>
        <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-[#F5F5F5]">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(200).height(200).url()}
              alt={mainImage.alt || product.name}
              fill
              className="object-cover"
            />
          ) : product.mainImageUrl ? (
            <Image
              src={product.mainImageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {categoryName && (
            <span className="badge-tag mb-1.5 inline-block">{categoryName}</span>
          )}
          <h3 className="font-bold text-black text-sm line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-xs text-[#666] line-clamp-2 mb-2">{product.shortDescription}</p>
          <div className="flex items-center justify-between gap-2">
            <StarRating rating={product.rating || 0} size="sm" />
            <Link href={`/products/${productSlug}`} className="btn-primary text-xs px-3 py-1.5">
              View
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`product-card p-4 ${className}`}>
        <div className="relative aspect-square rounded-md overflow-hidden bg-[#F5F5F5] mb-3">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(400).height(400).url()}
              alt={mainImage.alt || product.name}
              fill
              className="object-cover"
            />
          ) : product.mainImageUrl ? (
            <Image
              src={product.mainImageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        <h3 className="font-bold text-black text-sm line-clamp-2 mb-2">{product.name}</h3>
        <StarRating rating={product.rating || 0} size="sm" />
        <Link href={`/products/${productSlug}`} className="btn-primary w-full mt-3 text-xs px-3 py-2">
          View Product
        </Link>
      </div>
    );
  }

  // Default full card
  return (
    <div className={`product-card group overflow-hidden ${className}`}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
        {mainImage ? (
          <Image
            src={urlFor(mainImage).width(600).height(600).url()}
            alt={mainImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : product.mainImageUrl ? (
          <Image
            src={product.mainImageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {categoryName && (
          <Link href={`/products?category=${categorySlug}`} className="badge-tag mb-2 inline-block hover:border-black transition-colors">
            {categoryName}
          </Link>
        )}
        <h3 className="font-bold text-black text-base leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-[#666] line-clamp-2 mb-3">{product.shortDescription}</p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <StarRating rating={product.rating || 0} size="sm" />
            {product.rating && (
              <span className="text-xs text-[#666]">{product.rating.toFixed(1)} / 5</span>
            )}
          </div>
          <Link href={`/products/${productSlug}`} className="btn-primary text-xs px-4 py-2 shrink-0">
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Star Rating Component
// ============================================================
interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export function StarRating({ rating, size = "md", showNumber = false }: StarRatingProps) {
  const { filled, half, empty } = generateStars(rating);
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-4.5 h-4.5";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: filled }).map((_, i) => (
          <Star key={`f-${i}`} className={`${sizeClass} fill-black text-black`} />
        ))}
        {half && <StarHalf className={`${sizeClass} fill-black text-black`} />}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e-${i}`} className={`${sizeClass} text-[#E0E0E0]`} />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-[#666] font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

// ============================================================
// Placeholder image fallback
// ============================================================
function PlaceholderImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5]">
      <div className="text-[#CCC] text-4xl select-none">📦</div>
    </div>
  );
}

// ============================================================
// Product Card Skeleton
// ============================================================
export function ProductCardSkeleton() {
  return (
    <div className="border border-[#E0E0E0] rounded-card overflow-hidden">
      <div className="skeleton aspect-square" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-16 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="h-2" />
        <div className="flex justify-between items-center">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-8 w-24 rounded-card" />
        </div>
      </div>
    </div>
  );
}
