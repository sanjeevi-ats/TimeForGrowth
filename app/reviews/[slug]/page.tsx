import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor, articleFields, productFields } from "@/lib/sanity";
import ProductCard from "@/components/products/ProductCard";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface Props { params: { slug: string } }

export const dynamic = "force-dynamic";

async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "article" && slug.current == $slug && status == "published" && (type == "review" || type == "tutorial")][0]{
        ${articleFields},
        body,
        "relatedProducts": relatedProducts[]->{${productFields}}
      }`,
      { slug }
    );
  } catch { return null; }
}


function ArticlePage({ article }: { article: Article }) {
  const publishedDate = article.publishedAt ? formatDate(article.publishedAt) : null;
  const updatedDate = (article as any).updatedAt ? formatDate((article as any).updatedAt) : null;
  const typeLabels: Record<string, string> = {
    review: "Review",
    "buying-guide": "Buying Guide",
    listicle: "Listicle",
    tutorial: "Tutorial",
  };

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[340px] overflow-hidden bg-black">
        {(article.mainImageUrl || article.heroImage) ? (
          <Image
            src={article.mainImageUrl || urlFor(article.heroImage).width(1600).height(900).url()}
            alt={article.heroImageAlt || article.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#111]" />
        )}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="badge-tag text-white border-white/40 mb-3 inline-block">
              {typeLabels[article.type]}
            </span>
            <h1 className="text-4xl desktop:text-5xl font-black text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta line */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#666] mb-8 pb-6 border-b border-[#E0E0E0]">
          <span className="font-medium text-black">{article.author}</span>
          {publishedDate && <><span>·</span><span>{publishedDate}</span></>}
          {updatedDate && <><span>·</span><span>Updated {updatedDate}</span></>}
          {article.category && (
            <>
              <span>·</span>
              <Link href={`/products?category=${(article.category as any).slug?.current}`} className="badge-tag hover:border-black transition-colors">
                {(article.category as any).name}
              </Link>
            </>
          )}
        </div>

        {/* Rich text body — simplified rendering */}
        {article.body && (
          <div className="prose max-w-none text-[#333] leading-relaxed space-y-4">
            {(article.body as any[]).map((block: any, i: number) => {
              if (block._type === "block") {
                const text = block.children?.map((c: any) => c.text).join("") || "";
                if (block.style === "h2") return <h2 key={i} className="text-2xl font-black text-black mt-10 mb-4">{text}</h2>;
                if (block.style === "h3") return <h3 key={i} className="text-xl font-bold text-black mt-8 mb-3">{text}</h3>;
                if (block.style === "blockquote") return <blockquote key={i} className="border-l-4 border-black pl-4 italic text-[#666]">{text}</blockquote>;
                return <p key={i} className="text-base leading-relaxed">{text}</p>;
              }
              if (block._type === "image" && block.asset) {
                return (
                  <div key={i} className="my-8 rounded-card overflow-hidden">
                    <Image src={urlFor(block.asset).width(800).height(450).url()} alt={block.alt || ""} width={800} height={450} className="object-cover w-full" />
                    {block.caption && <p className="text-xs text-[#999] text-center mt-2">{block.caption}</p>}
                  </div>
                );
              }
              if (block._type === "productCard" && block.product) {
                return (
                  <div key={i} className="my-6">
                    <ProductCard product={block.product} variant="horizontal" />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Products mentioned */}
        {(article as any).relatedProducts?.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E0E0E0]">
            <h2 className="section-heading mb-6">Products Mentioned in This Article</h2>
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
              {(article as any).relatedProducts.map((p: any) => (
                <ProductCard key={p._id} product={p} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// ============================================================
// Reviews — [slug]
// ============================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const article = await getArticle(decodedSlug);
  if (!article) return { title: "Review Not Found" };
  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
  };
}

export default async function ReviewSlugPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);
  const article = await getArticle(decodedSlug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
