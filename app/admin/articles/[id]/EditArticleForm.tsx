"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

const ARTICLE_TYPES = [
  { value: "review", label: "Review" },
  { value: "buying-guide", label: "Buying Guide" },
  { value: "listicle", label: "Listicle" },
  { value: "tutorial", label: "Tutorial" },
];

interface Props {
  article: any;
}

export default function EditArticleForm({ article }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [type, setType] = useState(article.type || "review");

  // Attempt to extract the plain text body from our simple block structure
  let defaultBody = "";
  if (article.body && article.body[0] && article.body[0].children && article.body[0].children[0]) {
    defaultBody = article.body[0].children[0].text || "";
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const { updateArticle } = await import("@/app/actions/sanity");
    const result = await updateArticle(article._id, data);

    setSaving(false);
    
    if (result.error) {
      alert("Error saving: " + result.error);
    } else {
      router.push("/admin/articles");
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${article.title}"?`)) return;
    setDeleting(true);
    const { deleteArticle } = await import("@/app/actions/sanity");
    const result = await deleteArticle(article._id);
    if (result.error) {
      alert("Error: " + result.error);
      setDeleting(false);
    } else {
      router.push("/admin/articles");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="text-[#666] hover:text-black transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-black">Edit Article</h1>
            <p className="text-sm text-[#666]">{article.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {article.slug?.current && (
            <a
              href={`/${article.slug.current}`}
              target="_blank"
              rel="noopener"
              className="btn-secondary text-xs py-1.5 px-3"
            >
              <ExternalLink size={12} /> View Live
            </a>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 text-xs font-medium border border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50 rounded-card px-3 py-1.5 transition-colors"
          >
            <Trash2 size={12} /> {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">Basic Info</h2>

          <div>
            <label className="label">Title *</label>
            <input name="title" className="input" defaultValue={article.title} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Slug *</label>
              <input name="slug" className="input" defaultValue={article.slug?.current} required />
            </div>
            <div>
              <label className="label">Article Type *</label>
              <select name="type" className="input" value={type} onChange={(e) => setType(e.target.value)}>
                {ARTICLE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Author</label>
              <input name="author" className="input" defaultValue={article.author} />
            </div>
            <div>
              <label className="label">Status</label>
              <select name="status" className="input" defaultValue={article.status}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Excerpt</label>
            <textarea name="excerpt" className="input min-h-[80px]" defaultValue={article.excerpt} />
          </div>

          <div>
            <label className="label">Main Image URL (External)</label>
            <input 
              name="mainImageUrl" 
              type="url" 
              className="input" 
              defaultValue={article.mainImageUrl}
              placeholder="https://example.com/hero-image.jpg" 
            />
            <p className="text-xs text-[#999] mt-1">Paste an external image URL directly instead of uploading to Sanity.</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">Content</h2>
            <span className="text-xs text-[#999] bg-[#F5F5F5] px-2 py-1 rounded">
              Full rich-text editing is available in Sanity Studio →{" "}
              <a href="/studio" target="_blank" className="underline hover:text-black">Open Studio</a>
            </span>
          </div>

          <div>
            <label className="label">Body (Markdown / Plain Text)</label>
            <textarea
              name="body"
              className="input min-h-[240px] font-mono text-sm"
              defaultValue={defaultBody}
            />
            <p className="text-xs text-[#999] mt-1">
              Note: If you made complex edits or added images in Sanity Studio, this plain text box may override them if changed. Use Sanity Studio for complex layouts.
            </p>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">SEO</h2>
          <div>
            <label className="label">Meta Title</label>
            <input name="metaTitle" className="input" defaultValue={article.seo?.metaTitle} />
          </div>
          <div>
            <label className="label">Meta Description</label>
            <textarea name="metaDescription" className="input min-h-[80px]" defaultValue={article.seo?.metaDescription} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Update Article"}
          </button>
          <Link href="/admin/articles" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
