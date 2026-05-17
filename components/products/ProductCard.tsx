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
      <div className={`product-card flex flex-col sm:flex-row gap-3 sm:gap-6 p-3 sm:p-6 border border-[#E0E0E0] rounded-lg bg-white hover:shadow-md transition-shadow duration-300 ${className}`}>
        {/* Image - Left side on mobile/tablet, top on mobile */}
        <Link 
          href={`/products/${productSlug}`} 
          className="block relative w-full sm:w-32 md:w-40 lg:w-48 h-32 sm:h-40 md:h-48 lg:h-56 flex-shrink-0 rounded-md overflow-hidden bg-[#F5F5F5] group"
        >
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(400).height(500).url()}
              alt={mainImage.alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 160px, (max-width: 1024px) 160px, 192px"
            />
          ) : product.mainImageUrl ? (
            <Image
              src={product.mainImageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 160px, (max-width: 1024px) 160px, 192px"
            />
          ) : (
            <PlaceholderImage />
          )}
        </Link>

        {/* Content - Right side */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Top section */}
          <div>
            {categoryName && (
              <span className="badge-tag mb-2 inline-block text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1">{categoryName}</span>
            )}
            <h3 className="font-bold text-black text-base sm:text-lg md:text-xl line-clamp-2 sm:line-clamp-3 mb-1 sm:mb-2">{product.name}</h3>
            <p className="text-xs sm:text-sm text-[#666] line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3">{product.shortDescription}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <StarRating rating={product.rating || 0} size="sm" />
              {product.rating && (
                <span className="text-xs sm:text-sm text-[#666]">{product.rating.toFixed(1)} / 5</span>
              )}
            </div>

            {/* Additional info - Desktop only */}
            <div className="hidden sm:block text-xs sm:text-sm text-[#666] mb-3 pb-3 border-b border-[#E0E0E0]">
              <p className="mb-2">📍 Shopping from India — We'll find the best available store</p>
            </div>
          </div>

          {/* Bottom section - Buy Now button */}
          <Link 
            href={`/products/${productSlug}`} 
            className="w-full bg-black text-white font-bold text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 rounded-md hover:bg-gray-800 active:bg-gray-900 transition-colors text-center flex items-center justify-center gap-2"
          >
            🛒 Buy Now
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`product-card p-4 ${className}`}>
        <Link href={`/products/${productSlug}`} className="block relative aspect-square rounded-md overflow-hidden bg-[#F5F5F5] mb-3">
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
        </Link>
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
    <div className={`product-card group overflow-hidden border border-[#E0E0E0] rounded-lg ${className}`}>
      {/* Image - Wrapped in Link for clickability */}
      <Link href={`/products/${productSlug}`} className="block relative aspect-square overflow-hidden bg-[#F5F5F5]">
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
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {categoryName && (
          <Link href={`/products?category=${categorySlug}`} className="badge-tag mb-2 inline-block hover:border-black transition-colors text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1">
            {categoryName}
          </Link>
        )}
        <h3 className="font-bold text-black text-sm sm:text-base leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs sm:text-sm text-[#666] line-clamp-1 sm:line-clamp-2 mb-3">{product.shortDescription}</p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <StarRating rating={product.rating || 0} size="sm" />
            {product.rating && (
              <span className="text-xs text-[#666]">{product.rating.toFixed(1)} / 5</span>
            )}
          </div>
          <Link href={`/products/${productSlug}`} className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2 shrink-0">
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
