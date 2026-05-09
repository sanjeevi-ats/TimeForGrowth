"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Mail, CheckCircle, Globe, Star, Zap, ShieldCheck, TrendingUp, BookOpen, Tag, LayoutGrid, Package, Book, Notebook, Lightbulb, Heart } from "lucide-react";
import ProductCard, { ProductCardSkeleton } from "@/components/products/ProductCard";
import ArticleCard from "@/components/articles/ArticleCard";
import { getCountryName, getCountryFlag } from "@/lib/geo";
import { urlFor } from "@/lib/sanity";
import { setupParallax } from "@/lib/utils";
import type { Product, Article } from "@/lib/types";

// ─── Word Reveal helper ────────────────────────────────────────────────────
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("is-visible"); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <span ref={ref} className={`word-reveal ${className}`}>
      {words.map((w, i) => (
        <span key={i} style={{ transitionDelay: `${i * 60}ms` }}>
          {w}&nbsp;
        </span>
      ))}
    </span>
  );
}

// ─── Marquee Strip ─────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "Books", "Journals", "Gadgets", "Wellness",
  "Productivity", "Self-Improvement", "Growth Tools", "Mindset",
  "Books", "Journals", "Gadgets", "Wellness",
  "Productivity", "Self-Improvement", "Growth Tools", "Mindset",
];

export function MarqueeStrip() {
  return (
    <div className="bg-white border-y border-[#E0E0E0] py-3 overflow-hidden select-none">
      <div className="marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-3 mx-6 text-[#666] text-xs font-semibold uppercase tracking-widest whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[#999]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Hero Section — Clean, centered design matching the spec
// ============================================================
export function HeroSection({ featuredProduct }: { featuredProduct?: Product }) {
  return (
    <section className="relative min-h-[85vh] bg-white flex items-center overflow-hidden">
      <div className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="space-y-8">
          {/* Main heading */}
          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black text-black leading-[1.1]"
            style={{ animation: "fadeInUp 0.7s ease-out 0ms both" }}>
            Better Choices Create a Better Life
          </h1>

          {/* Subheading */}
          <p className="text-lg text-[#666] max-w-2xl mx-auto leading-relaxed"
            style={{ animation: "fadeInUp 0.7s ease-out 150ms both" }}>
            Here, you'll discover simple and effective tools that help you stay consistent and focused every day. Each resource is chosen to support your habits and mindset, making it easier to move forward step by step and see real progress in your life.
          </p>

          {/* CTA Button */}
          <div style={{ animation: "fadeInUp 0.7s ease-out 300ms both" }}>
            <Link href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold text-base rounded-lg border border-black transition-all duration-300 hover:bg-white hover:text-black">
              START YOUR JOURNEY
            </Link>
          </div>

          {/* Category icons grid - CLICKABLE CARDS */}
          <div
  className="pt-12 w-full"
  style={{ animation: "fadeInUp 0.7s ease-out 450ms both" }}
>
  <div className="stagger-children grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[1200px] mx-auto px-4">

    {[
      { name: "Book", slug: "books", icon: Book },
      { name: "Journal", slug: "journals", icon: Notebook },
      { name: "Gadgets", slug: "gadgets", icon: Lightbulb },
      { name: "Wellness", slug: "wellness", icon: Heart }
    ].map((cat) => {
      const Icon = cat.icon;

      return (
        <Link
          key={cat.slug}
          href={`/products?category=${cat.slug}`}
          className="group relative bg-black rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)"
            }}
          />

          {/* Icon */}
          <div className="w-14 h-14 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            <Icon size={36} className="text-white" />
          </div>

          {/* Text */}
          <span className="text-white font-bold text-sm text-center px-2 leading-tight">
            {cat.name}
          </span>
        </Link>
      );
    })}
  </div>
</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Trending Section
// ============================================================
export function TrendingSection({ products, region }: { products: Product[]; region: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countryName = getCountryName(region);
  const flag = getCountryFlag(region);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          el.querySelectorAll(".animate-on-scroll").forEach((c) => c.classList.add("is-visible"));
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-black">TOP SELF-IMPROVEMENT BOOKS</h2>
        <p className="text-[#666] text-sm">Curated for your region: {flag} {countryName}</p>
      </div>
      <div className="stagger-children grid grid-cols-2 tablet:grid-cols-4 gap-4">
        {products.length > 0
          ? products.slice(0, 4).map((p) => (
              <div key={p._id} className="animate-on-scroll"><ProductCard product={p} /></div>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-on-scroll"><ProductCardSkeleton /></div>
            ))}
      </div>
    </section>
  );
}

// ============================================================
// Category Grid — dynamic from Sanity, universal icon
// ============================================================
// Category-specific SVG icons
function CategoryIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("book")) {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="8" y="6" width="26" height="36" rx="3" stroke="black" strokeWidth="2" fill="none"/>
        <path d="M8 42h28a4 4 0 0 0 4-4V10" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="16" x2="28" y2="16" stroke="black" strokeWidth="1.5" opacity="0.6"/>
        <line x1="14" y1="22" x2="28" y2="22" stroke="black" strokeWidth="1.5" opacity="0.6"/>
        <line x1="14" y1="28" x2="22" y2="28" stroke="black" strokeWidth="1.5" opacity="0.6"/>
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
  if (lower.includes("gadget") || lower.includes("tech") || lower.includes("electron")) {
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
  if (lower.includes("wellness") || lower.includes("health") || lower.includes("fitness")) {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <path d="M24 38 C24 38 8 28 8 18a8 8 0 0 1 16-2 8 8 0 0 1 16 2c0 10-16 20-16 20z" stroke="white" strokeWidth="2" fill="none" opacity="0.8"/>
        <line x1="24" y1="10" x2="24" y2="24" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        <line x1="17" y1="17" x2="31" y2="17" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
      </svg>
    );
  }
  // Default fallback icon
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <rect x="6" y="14" width="36" height="28" rx="4" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M16 14V10a8 8 0 0 1 16 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      <line x1="24" y1="14" x2="24" y2="42" stroke="white" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

export function CategoryGrid({ categories }: { categories: { name: string; slug: string }[] }) {
  // Show only the first 4 categories as per design spec
  const displayCategories = categories.slice(0, 4);
  return (
    <section className=" bg-white relative overflow-hidden">
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1>ewewe</h1>
          <h2 className="text-3xl font-black text-black">BEST GROWTH JOURNALS</h2>
        </div>

        {displayCategories.length === 0 ? (
          <div className="flex flex-col justify-center py-16 gap-3 text-[#999]">
            <LayoutGrid size={36} strokeWidth={1} />
            <p className="text-sm">No categories yet — <a href="/admin/categories" className="underline">add one in the admin panel</a></p>
          </div>
        ) : (
          <div className="stagger-children grid grid-cols-2 tablet:grid-cols-4 gap-4">
            <><h1>sdsds</h1></>
            {displayCategories.map((cat, i) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`}
                className="animate-on-scroll group relative bg-black rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                style={{ animationDelay: `${i * 80}ms`, animation: "fadeInUp 0.5s ease-out both" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
                <div className="w-14 h-14 flex items-center justify-center opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300">
                  <CategoryIcon name={cat.name} />
                </div>
                <span className="text-white font-bold text-sm text-center px-2 leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// Category-Based Product Sections
// ============================================================

interface CategoryProductsProps {
  products: Product[];
  categoryName: string;
  categorySlug: string;
  sectionTitle: string;
}

export function CategoryProductsSection({ products, categoryName, categorySlug, sectionTitle }: CategoryProductsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          el.querySelectorAll(".animate-on-scroll").forEach((c) => c.classList.add("is-visible"));
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Filter products by category
  const categoryProducts = products.filter(
    (p) => p.category?.slug?.current === categorySlug || p.category?.name?.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <section ref={sectionRef} className="py-20 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <>wewe</>
        <h2 className="text-3xl font-black text-black">{sectionTitle}</h2>
      </div>
      <div className="stagger-children grid grid-cols-2 tablet:grid-cols-4 gap-4">
        {categoryProducts.length > 0
          ? categoryProducts.slice(0, 4).map((p) => (
              <div key={p._id} className="animate-on-scroll"><ProductCard product={p} /></div>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-on-scroll"><ProductCardSkeleton /></div>
            ))}
      </div>
    </section>
  );
}

// ============================================================
// Latest Articles - REMOVED (No longer displayed on home page)
// ============================================================
export function LatestArticles({ articles }: { articles: Article[] }) {
  // This section is no longer displayed on the home page
  return null;
}

// ============================================================
// Stats Parallax Strip
// ============================================================
const STATS = [
  { value: 200, suffix: "+", label: "Products Reviewed", icon: Star },
  { value: 20, suffix: "+", label: "Countries Supported", icon: Globe },
  { value: 50, suffix: "K+", label: "Customers per Month", icon: TrendingUp },
  { value: 100, suffix: "%", label: "Honest, Unsponsored", icon: ShieldCheck },
];

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); }
      else setCount(n);
    }, 16);
    return () => clearInterval(t);
  }, [target, active]);
  return count;
}

function StatItem({ value, suffix, label, icon: Icon }: { value: number; suffix: string; label: string; icon: React.ElementType }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center">
        <Icon size={24} className="text-white/70" />
      </div>
      <div className="text-5xl font-black text-white tabular-nums tracking-tight">{count}{suffix}</div>
      <div className="text-xs text-white/40 font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
}

export function StatsParallaxStrip() {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bgRef.current) return;
    return setupParallax([{ el: bgRef.current, speed: 0.3 }]);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="relative z-10  max-w-7xl mx-auto ">
        <div className="text-center">
          <h2 className="text-3xl font-black text-black mb-6">WHY TRUST US</h2>
          <p className="text-lg text-[#666] leading-relaxed max-w-3xl mx-auto">
            We are dedicated to helping you grow in every area of life — from mindset to productivity. Every product featured on this website is carefully selected based on real user reviews, quality, and its ability to create positive change. Because our goal is simple: Help you choose the right tools to improve your life faster.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// How It Works
// ============================================================
const STEPS = [
  { number: "01", icon: Globe, title: "We Detect Your Location", body: "Our geo-routing engine silently reads your IP and maps it to your nearest supported country the moment you land." },
  { number: "02", icon: BookOpen, title: "We Surface the Right Gear", body: "Our editors curate products specifically for your region — the right model at the right price, not generic global picks." },
  { number: "03", icon: Zap, title: "One Click to Your Store", body: "Tap 'Buy Now' and land directly on local Amazon, Flipkart, or your regional partner. No wrong-region 404s, ever." },
];

export function HowItWorks() {
  return (
    // <section className="py-20 bg-white relative overflow-hidden">
    //   <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="text-center mb-16">
    //       <h2 className="text-3xl font-black text-black mb-4">TOP WELLNESS ESSENTIALS</h2>
    //       <p className="text-[#666] text-base max-w-2xl mx-auto">Curated tools and resources to support your wellness journey</p>
    //     </div>

    //     <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
    //       {STEPS.map((step, i) => {
    //         const Icon = step.icon;
    //         return (
    //           <div key={step.number} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-[#E0E0E0] hover:border-black hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
    //             style={{ animation: `fadeInUp 0.5s ease-out ${i * 100}ms both` }}>
    //             <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center">
    //               <Icon size={22} className="text-white" />
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-black text-black mb-2">{step.title}</h3>
    //               <p className="text-[#666] leading-relaxed text-sm">{step.body}</p>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </section>
    <></>
  );
}

// ============================================================
// Email Capture Banner
// ============================================================
export function EmailBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  return (
    <section className="relative bg-white  overflow-hidden">
      <div className="relative z-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-black mb-4">JOIN OUR SELF-IMPROVEMENT JOURNEY</h2>
        <p className="text-lg text-[#666] mb-10 leading-relaxed max-w-2xl mx-auto">
          Get simple weekly self-improvement updates that help you build better habits, stay focused, and improve your daily life. Each week, you'll receive useful books, journals, and tools that support your personal growth step by step and make your journey easier and more consistent.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-black font-semibold text-lg">
            <CheckCircle size={22} /> You're subscribed! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="timeforgrowth@gmail.com" required disabled={status === "loading"}
              className="flex-1 px-6 py-3.5 border border-black rounded-full placeholder:text-[#999] text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all" />
            <button type="submit" disabled={status === "loading"}
              className="px-8 py-3.5 bg-black text-white font-bold text-sm rounded-full hover:bg-[#1a1a1a] transition-all duration-300 shrink-0">
              {status === "loading" ? <span className="spinner" /> : "SUBSCRIBE"}
            </button>
          </form>
        )}
        {status === "error" && <p className="text-red-600 text-sm mt-4">Something went wrong. Please try again.</p>}
      </div>
    </section>
  );
}
