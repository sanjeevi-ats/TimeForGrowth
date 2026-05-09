import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { formatShortDate, truncate } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured";
  className?: string;
}

const typeLabels: Record<string, string> = {
  review: "Review",
  "buying-guide": "Buying Guide",
  listicle: "Listicle",
  tutorial: "Tutorial",
};

function getArticleHref(article: Article): string {
  const rawSlug = typeof article.slug === "string" ? article.slug : (article.slug as any)?.current;
  const slug = (rawSlug || "").trim();
  const prefix = article.type === "buying-guide" || article.type === "listicle" ? "buying-guides" : "reviews";
  return `/${prefix}/${encodeURIComponent(slug)}`;
}

export default function ArticleCard({ article, variant = "default", className = "" }: ArticleCardProps) {
  const href = getArticleHref(article);
  const typeLabel = typeLabels[article.type] || article.type.toUpperCase();

  if (variant === "featured") {
    return (
      <Link href={href} className={`block group card overflow-hidden ${className}`}>
        <div className="relative h-72 overflow-hidden">
          {(article.mainImageUrl || article.heroImage) ? (
            <Image
              src={article.mainImageUrl || urlFor(article.heroImage).width(1200).height(600).url()}
              alt={article.heroImageAlt || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-[#F5F5F5] flex items-center justify-center">
              <span className="text-6xl">📖</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="badge-tag text-white border-white/40 mb-2 inline-block">{typeLabel}</span>
            <h2 className="text-2xl font-bold text-white leading-tight">{article.title}</h2>
          </div>
        </div>
        {article.excerpt && (
          <div className="p-5">
            <p className="text-[#666] text-sm leading-relaxed">{article.excerpt}</p>
          </div>
        )}
      </Link>
    );
  }

  return (
    <article className={`group card overflow-hidden ${className}`}>
      {/* Thumbnail */}
      <Link href={href}>
        <div className="relative aspect-video overflow-hidden">
          {(article.mainImageUrl || article.heroImage) ? (
            <Image
              src={article.mainImageUrl || urlFor(article.heroImage).width(800).height(450).url()}
              alt={article.heroImageAlt || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-[#F5F5F5] flex items-center justify-center">
              <span className="text-5xl">📖</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-black mb-2 block">
          {typeLabel}
        </span>

        <Link href={href}>
          <h3 className="font-bold text-black text-base leading-snug mb-2 group-hover:underline line-clamp-2">
            {article.title}
          </h3>
        </Link>

        {article.excerpt && (
          <p className="text-sm text-[#666] line-clamp-2 mb-3 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-[#999] mt-2">
          <div>
            <span>{article.author}</span>
            {article.publishedAt && (
              <>
                <span className="mx-1">·</span>
                <span>{formatShortDate(article.publishedAt)}</span>
              </>
            )}
          </div>
          <Link href={href} className="flex items-center gap-0.5 text-black font-medium hover:gap-1 transition-all duration-200">
            Read More <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="border border-[#E0E0E0] rounded-card overflow-hidden">
      <div className="skeleton aspect-video" />
      <div className="p-5 space-y-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  );
}
