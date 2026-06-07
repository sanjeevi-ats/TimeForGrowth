"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { ChevronRight, Star, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// ============================================================
// Hero Slider with Carousel - PROFESSIONAL ANIMATIONS
// ============================================================
export function AdvancedHeroSlider() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slides = [
    {
      title: "Better Choices Create a Better Life",
      subtitle: "Discover premium tools and resources for personal growth, productivity, and lasting success",
      cta1: "Explore Products",
      cta2: "Start Improving",
    },
    {
      title: "Build Better Habits Today",
      subtitle: "Transform your life with proven strategies for wellness, mindfulness, and self-improvement",
      cta1: "View Journals",
      cta2: "Learn More",
    },
    {
      title: "Unlock Your Potential",
      subtitle: "Access premium resources for productivity, success mindset, and personal excellence",
      cta1: "Browse Gadgets",
      cta2: "Get Started",
    },
  ];

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Swiper Carousel */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        speed={1000}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background gradient overlay - improved for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />

            {/* Decorative blur elements with parallax effect */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-800 rounded-full opacity-5 blur-3xl"
                animate={{
                  y: [0, 20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-700 rounded-full opacity-5 blur-3xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Content - properly layered with smooth transitions */}
            <div className="relative z-20 w-full h-full flex items-center justify-center px-14 sm:px-12 lg:px-32 py-8 sm:py-0">
              <motion.div
                className="w-full max-w-2xl sm:max-w-4xl mx-auto text-center space-y-3 sm:space-y-6 md:space-y-8"
                key={`slide-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Title - with smooth transition */}
                <motion.h1
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight will-change-transform"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle - with staggered animation */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto px-1 sm:px-0 will-change-transform"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTA Buttons - with staggered entrance */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center pt-2 sm:pt-4 md:pt-6 will-change-transform"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link 
                      href="/products"
                      className="inline-flex items-center justify-center w-full sm:w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-3 bg-white text-black font-bold text-xs sm:text-sm md:text-base lg:text-base rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl group"
                    >
                      {slide.cta1}
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={16} className="ml-2 sm:ml-2" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link 
                      href="/products"
                      className="inline-flex items-center justify-center w-full sm:w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-3 bg-transparent border-2 border-white text-white font-bold text-xs sm:text-sm md:text-base lg:text-base rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                      {slide.cta2}
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      >
                        <ArrowRight size={16} className="ml-2 sm:ml-2" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for Swiper - responsive arrow sizing */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          width: 10px;
          height: 10px;
        }
        :global(.swiper-pagination-bullet-active) {
          background: white;
          width: 32px;
          border-radius: 5px;
        }
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          /* Mobile: compact small arrows - w-8 h-8 */
          width: 32px;
          height: 32px;
          top: 50%;
          transform: translateY(-50%);
          margin-top: 0;
        }
        /* Position arrows outside content area on mobile */
        :global(.swiper-button-prev) {
          left: 8px;
        }
        :global(.swiper-button-next) {
          right: 8px;
        }
        /* Tablet: medium arrows (640px and up) - w-10 h-10 */
        @media (min-width: 640px) {
          :global(.swiper-button-next),
          :global(.swiper-button-prev) {
            width: 40px;
            height: 40px;
          }
          :global(.swiper-button-prev) {
            left: 16px;
          }
          :global(.swiper-button-next) {
            right: 16px;
          }
        }
        /* Desktop: larger arrows (1024px and up) - w-12 h-12 */
        @media (min-width: 1024px) {
          :global(.swiper-button-next),
          :global(.swiper-button-prev) {
            width: 48px;
            height: 48px;
          }
          :global(.swiper-button-prev) {
            left: 30px;
          }
          :global(.swiper-button-next) {
            right: 30px;
          }
        }
        /* Reduce icon size inside button - mobile: w-3 h-3 */
        :global(.swiper-button-next::after),
        :global(.swiper-button-prev::after) {
          font-size: 12px;
          line-height: 1;
          width: 12px;
          height: 12px;
        }
        /* Tablet: w-4 h-4 */
        @media (min-width: 640px) {
          :global(.swiper-button-next::after),
          :global(.swiper-button-prev::after) {
            font-size: 16px;
            width: 16px;
            height: 16px;
          }
        }
        /* Desktop: w-5 h-5 */
        @media (min-width: 1024px) {
          :global(.swiper-button-next::after),
          :global(.swiper-button-prev::after) {
            font-size: 20px;
            width: 20px;
            height: 20px;
          }
        }
        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }
        :global(.swiper-button-next:disabled),
        :global(.swiper-button-prev:disabled) {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}

// ============================================================
// Category Cards Section - CLICKABLE CATEGORY CARDS
// ============================================================
export function AdvancedCategoryCardsSection() {
  const categories = [
    { name: "Books", slug: "books", icon: "book" },
    { name: "Journals", slug: "journals", icon: "journal" },
    { name: "Gadgets", slug: "gadgets", icon: "gadget" },
    { name: "Wellness", slug: "wellness", icon: "wellness" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid of category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link href={`/products?category=${category.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group cursor-pointer"
                >
                  {/* Card container */}
                  <div className="h-full flex flex-col items-center justify-center p-6 sm:p-8 bg-black rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
                    
                    {/* Icon container */}
                    <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors duration-300">
                      <CategoryCardIcon name={category.icon} />
                    </div>

                    {/* Category name */}
                    <h3 className="text-lg sm:text-xl font-bold text-white text-center group-hover:text-gray-100 transition-colors">
                      {category.name}
                    </h3>

                    {/* Hover indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 sm:mt-4 flex items-center gap-1 text-gray-400 group-hover:text-white transition-colors text-sm"
                    >
                      <span>Explore</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Category Card Icon Component
// ============================================================
function CategoryCardIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  
  if (lower.includes("book")) {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="8" y="6" width="26" height="36" rx="3" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M8 42h28a4 4 0 0 0 4-4V10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="16" x2="28" y2="16" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="14" y1="22" x2="28" y2="22" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="14" y1="28" x2="22" y2="28" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      </svg>
    );
  }
  
  if (lower.includes("journal")) {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="12" y="6" width="28" height="36" rx="3" stroke="white" strokeWidth="2" fill="none"/>
        <rect x="8" y="8" width="6" height="32" rx="2" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <line x1="18" y1="16" x2="34" y2="16" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="18" y1="22" x2="34" y2="22" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="18" y1="28" x2="28" y2="28" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="21" cy="36" r="1.5" fill="white" opacity="0.5"/>
      </svg>
    );
  }
  
  if (lower.includes("gadget")) {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="6" y="12" width="36" height="24" rx="4" stroke="white" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="24" r="5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <line x1="6" y1="36" x2="18" y2="42" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
        <line x1="42" y1="36" x2="30" y2="42" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
        <line x1="18" y1="42" x2="30" y2="42" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      </svg>
    );
  }
  
  if (lower.includes("wellness")) {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <path d="M24 38 C24 38 8 28 8 18a8 8 0 0 1 16-2 8 8 0 0 1 16 2c0 10-16 20-16 20z" stroke="white" strokeWidth="2" fill="none" opacity="0.8"/>
        <line x1="24" y1="10" x2="24" y2="24" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        <line x1="17" y1="17" x2="31" y2="17" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
      </svg>
    );
  }
  
  return null;
}

// ============================================================
// Advanced Category Section with View More Button - IMPROVED
// ============================================================
interface AdvancedCategorySectionProps {
  products: Product[];
  categoryName: string;
  categorySlug: string;
  sectionTitle: string;
  region: string;
}

export function AdvancedCategorySection({
  products,
  categoryName,
  categorySlug,
  sectionTitle,
  region,
}: AdvancedCategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          el.querySelectorAll(".animate-on-scroll").forEach((c) => c.classList.add("is-visible"));
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    
    // Parallax scroll effect
    const handleScroll = () => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        const distance = elementCenter - windowCenter;
        setScrollY(distance * 0.1); // Parallax factor
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter products by category
  const categoryProducts = products.filter(
    (p) => p.category?.slug?.current === categorySlug || p.category?.name?.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with View More button - improved spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-12 sm:mb-16"
          style={{ y: scrollY }}
        >
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-black text-black mb-2 leading-tight">
              {sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Curated premium products for your growth journey
            </p>
          </div>
          <Link 
            href={`/products?category=${categorySlug}`}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white font-semibold text-sm sm:text-base rounded-full hover:bg-gray-900 transition-all duration-300 hover:shadow-lg group whitespace-nowrap"
          >
            View More
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Products grid - improved responsive layout with consistent alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full">
          {categoryProducts.length > 0
            ? categoryProducts.slice(0, 4).map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="animate-on-scroll w-full"
                >
                  <AdvancedProductCard product={p} />
                </motion.div>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="animate-on-scroll w-full"
                >
                  <AdvancedProductCardSkeleton />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Advanced Product Card with Hover Effects - IMPROVED BORDERS
// ============================================================
interface AdvancedProductCardProps {
  product: Product;
}

function AdvancedProductCard({ product }: AdvancedProductCardProps) {
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
                priority={false}
              />
            ) : (
              <div>
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

// ============================================================
// Advanced Product Card Skeleton - IMPROVED WITH BORDERS
// ============================================================
function AdvancedProductCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col h-full w-full">
      {/* Card container with border - full height */}
      <div className="h-full w-full flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white">
        {/* Image skeleton with fixed aspect ratio */}
        <div className="w-full aspect-square bg-gradient-to-br from-gray-200 to-gray-300 border-b border-gray-200 flex-shrink-0" />
        
        {/* Content skeleton */}
        <div className="flex-1 flex flex-col p-4 sm:p-5 space-y-3 w-full">
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-5 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-3/4 flex-1" />
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />
          
          {/* Rating skeleton */}
          <div className="flex justify-between pt-1 border-t border-gray-200 mt-auto w-full">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded-full w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Testimonials Section - IMPROVED
// ============================================================
export function AdvancedTestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Entrepreneur",
      text: "This platform helped me discover the perfect tools for my productivity journey. The curated selection is exceptional!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Student",
      text: "The curated selection of books and journals has transformed my daily habits and mindset. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Wellness Coach",
      text: "An excellent resource for finding quality wellness products. The reviews are honest and the selection is premium.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-black mb-3 leading-tight">What Our Users Say</h2>
          <p className="text-base sm:text-lg text-gray-600">Join thousands of people improving their lives</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">"{testimonial.text}"</p>

              {/* Author */}
              <div>
                <p className="font-bold text-black text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Newsletter Section - IMPROVED
// ============================================================
export function AdvancedNewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black border-b border-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 sm:space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">Stay Updated</h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            Get weekly tips, exclusive product recommendations, and growth strategies delivered to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {status === "success" ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-900/30 border border-green-700 text-green-300 font-semibold rounded-full">
              <span>✓</span> Successfully subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                className="flex-1 px-4 sm:px-6 py-3 bg-gray-900 border border-gray-700 rounded-full placeholder:text-gray-500 text-white text-sm sm:text-base focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 sm:px-8 py-3 bg-white text-black font-semibold text-sm sm:text-base rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm mt-4">Something went wrong. Please try again.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
