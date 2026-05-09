"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ARTICLE_TYPES = [
  { value: "review", label: "Review" },
  { value: "buying-guide", label: "Buying Guide" },
  { value: "listicle", label: "Listicle" },
  { value: "tutorial", label: "Tutorial" },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [type, setType] = useState("review");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const { createArticle } = await import("@/app/actions/sanity");
    const result = await createArticle(data);

    setSaving(false);
    
    if (result.error) {
      alert("Error saving: " + result.error);
    } else {
      alert("Article saved successfully to Sanity!");
      router.push("/admin/articles");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/articles" className="text-[#666] hover:text-black transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black">Write Article</h1>
          <p className="text-sm text-[#666]">Create a new review, guide, or tutorial</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">Basic Info</h2>

          <div>
            <label className="label">Title *</label>
            <input name="title" className="input" placeholder="e.g. Sony WH-1000XM5 Review: The King of ANC?" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Slug *</label>
              <input name="slug" className="input" placeholder="sony-wh-1000xm5-review" required />
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
              <input name="author" className="input" placeholder="Your name" />
            </div>
            <div>
              <label className="label">Status</label>
              <select name="status" className="input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Excerpt</label>
            <textarea name="excerpt" className="input min-h-[80px]" placeholder="Short summary shown on listing pages and social previews…" />
          </div>

          <div>
            <label className="label">Main Image URL (External)</label>
            <input name="mainImageUrl" type="url" className="input" placeholder="https://example.com/hero-image.jpg" />
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
              placeholder={`## Introduction\n\nStart writing your article here…\n\n## Our Verdict\n\nFinal thoughts go here.`}
            />
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">SEO</h2>
          <div>
            <label className="label">Meta Title</label>
            <input name="metaTitle" className="input" placeholder="Appears in browser tab and search results (50–60 chars)" />
          </div>
          <div>
            <label className="label">Meta Description</label>
            <textarea name="metaDescription" className="input min-h-[80px]" placeholder="Shown in Google snippets (120–160 chars)" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Save Article"}
          </button>
          <Link href="/admin/articles" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
