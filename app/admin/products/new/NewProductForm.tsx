"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

const REGIONS = ["IN", "US", "GB", "CA", "AU", "DE", "FR", "AE", "SG", "JP"];
const PLATFORMS = ["Amazon", "Flipkart", "eBay", "B&H Photo", "Currys", "Other"];

interface AffiliateLink {
  countryCode: string;
  platform: string;
  url: string;
  displayPrice: string;
  active: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
}

export default function NewProductForm({ categories }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [links, setLinks] = useState<AffiliateLink[]>([]);

  const addLink = () =>
    setLinks((prev) => [...prev, { countryCode: "IN", platform: "Amazon", url: "", displayPrice: "", active: true }]);
  const removeLink = (i: number) => setLinks((prev) => prev.filter((_, idx) => idx !== i));
  const updateLink = (i: number, field: keyof AffiliateLink, value: string | boolean) =>
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { createProduct } = await import("@/app/actions/sanity");
    const result = await createProduct(data, links);
    setSaving(false);
    if (result.error) {
      alert("Error saving: " + result.error);
    } else {
      alert("Product saved successfully to Sanity!");
      router.push("/admin/products");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-[#666] hover:text-black transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black">New Product</h1>
          <p className="text-sm text-[#666]">Fill in the details below and add affiliate links</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">Basic Info</h2>

          <div>
            <label className="label">Product Name *</label>
            <input name="name" className="input" placeholder="e.g. Sony WH-1000XM5" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Slug *</label>
              <input name="slug" className="input" placeholder="sony-wh-1000xm5" required />
            </div>
            <div>
              <label className="label">Rating (0–5)</label>
              <input name="rating" type="number" min="0" max="5" step="0.1" className="input" placeholder="4.5" />
            </div>
          </div>

          <div>
            <label className="label">Short Description</label>
            <input name="shortDescription" className="input" placeholder="One-liner for cards and listings" />
          </div>

          <div>
            <label className="label">Full Description</label>
            <textarea name="description" className="input min-h-[100px]" placeholder="Detailed product description..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select name="status" className="input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="label">Category</label>
              <select name="category" className="input">
                <option value="">— Select category —</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.slug}>{c.name}</option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-xs text-[#999] mt-1">
                  No categories yet —{" "}
                  <a href="/admin/categories" className="underline">add one first</a>
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="label">Main Image URL (External)</label>
            <input
              name="mainImageUrl"
              type="url"
              className="input"
              placeholder="https://m.media-amazon.com/images/I/..."
            />
            <p className="text-xs text-[#999] mt-1">Paste an Amazon (or any external) product image URL directly.</p>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input type="checkbox" name="featured" value="true" className="w-4 h-4 accent-black" />
            <span className="text-sm font-medium">Featured Product</span>
            <span className="text-xs text-[#999]">(shown on homepage hero section)</span>
          </label>
        </div>

        {/* Affiliate Links */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">Affiliate Links</h2>
            <button type="button" onClick={addLink} className="btn-secondary text-xs py-1.5 px-3">
              <Plus size={13} /> Add Link
            </button>
          </div>

          {links.length === 0 && (
            <p className="text-sm text-[#999] text-center py-6">
              No links yet. Click "Add Link" to add regional affiliate URLs.
            </p>
          )}

          <div className="space-y-4">
            {links.map((link, i) => (
              <div key={i} className="border border-[#E0E0E0] rounded-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#666] uppercase">Link #{i + 1}</span>
                  <button type="button" onClick={() => removeLink(i)} className="text-[#999] hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="label">Region</label>
                    <select className="input" value={link.countryCode} onChange={(e) => updateLink(i, "countryCode", e.target.value)}>
                      {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Platform</label>
                    <select className="input" value={link.platform} onChange={(e) => updateLink(i, "platform", e.target.value)}>
                      {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Display Price</label>
                    <input className="input" placeholder="₹29,990" value={link.displayPrice} onChange={(e) => updateLink(i, "displayPrice", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="label">Affiliate URL *</label>
                  <input className="input" placeholder="https://amzn.to/..." value={link.url} required onChange={(e) => updateLink(i, "url", e.target.value)} />
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                  <input type="checkbox" checked={link.active} onChange={(e) => updateLink(i, "active", e.target.checked)} className="w-4 h-4 accent-black" />
                  Active
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Pros / Cons */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#666]">Pros & Cons</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Pros (one per line)</label>
              <textarea name="pros" className="input min-h-[100px]" placeholder={"Great battery life\nExcellent ANC\nComfy fit"} />
            </div>
            <div>
              <label className="label">Cons (one per line)</label>
              <textarea name="cons" className="input min-h-[100px]" placeholder={"No IP rating\nBulky carry case"} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Save Product"}
          </button>
          <Link href="/admin/products" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
