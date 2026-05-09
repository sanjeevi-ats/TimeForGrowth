"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

const REGIONS = ["IN", "US", "GB", "CA", "AU", "DE", "FR", "AE", "SG", "JP"];
const PLATFORMS = ["Amazon", "Flipkart", "eBay", "B&H Photo", "Currys", "Other"];

interface AffiliateLink {
  _key?: string;
  countryCode: string;
  platform: string;
  url: string;
  displayPrice: string;
  active: boolean;
}

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  shortDescription?: string;
  mainImageUrl?: string;
  status: string;
  category?: string;
  rating?: number;
  pros?: string[];
  cons?: string[];
  affiliateLinks?: AffiliateLink[];
  featured?: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Props {
  product: Product;
  categories: Category[];
}

export default function EditProductForm({ product, categories }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [links, setLinks] = useState<AffiliateLink[]>(product.affiliateLinks || []);
  const [imageUrl, setImageUrl] = useState(product.mainImageUrl || "");

  const addLink = () =>
    setLinks((prev) => [...prev, { countryCode: "IN", platform: "Amazon", url: "", displayPrice: "", active: true }]);
  const removeLink = (i: number) => setLinks((prev) => prev.filter((_, idx) => idx !== i));
  const updateLink = (i: number, field: keyof AffiliateLink, value: string | boolean) =>
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const { updateProduct } = await import("@/app/actions/sanity");
    const result = await updateProduct(product._id, data, links);
    setSaving(false);
    if (result.error) {
      alert("Error: " + result.error);
    } else {
      router.push("/admin/products");
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Remove "${product.name}" from your store? This will delete the product and all its affiliate links from Sanity.`)) return;
    setDeleting(true);
    const { deleteProduct } = await import("@/app/actions/sanity");
    const result = await deleteProduct(product._id);
    if (result.error) {
      alert("Error: " + result.error);
      setDeleting(false);
    } else {
      router.push("/admin/products");
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="text-[#666] hover:text-black transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-black">Edit Product</h1>
            <p className="text-sm text-[#666]">{product.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/products/${product.slug?.current}`}
            target="_blank"
            rel="noopener"
            className="btn-secondary text-xs py-1.5 px-3"
          >
            <ExternalLink size={12} /> Preview
          </a>
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
            <label className="label">Product Name *</label>
            <input name="name" className="input" defaultValue={product.name} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Slug *</label>
              <input name="slug" className="input" defaultValue={product.slug?.current} required />
            </div>
            <div>
              <label className="label">Rating (0–5)</label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="input"
                defaultValue={product.rating}
              />
            </div>
          </div>

          <div>
            <label className="label">Short Description</label>
            <input name="shortDescription" className="input" defaultValue={product.shortDescription} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select name="status" className="input" defaultValue={product.status}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="label">Category</label>
              <select name="category" className="input" defaultValue={product.category || ""}>
                <option value="">— Select category —</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.slug}>{c.name}</option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-xs text-[#999] mt-1">No categories — <a href="/admin/categories" className="underline">add one first</a></p>
              )}
            </div>
          </div>

          <div>
            <label className="label">Main Image URL (External)</label>
            <input
              name="mainImageUrl"
              type="url"
              className="input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://m.media-amazon.com/images/I/..."
            />
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 h-24 w-24 object-contain border border-[#E0E0E0] rounded-card p-1 bg-[#F9F9F9]"
              />
            )}
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product.featured}
              value="true"
              className="w-4 h-4 accent-black"
            />
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
              <div key={link._key || i} className="border border-[#E0E0E0] rounded-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#666] uppercase">Link #{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeLink(i)}
                    className="text-[#999] hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="label">Region</label>
                    <select
                      className="input"
                      value={link.countryCode}
                      onChange={(e) => updateLink(i, "countryCode", e.target.value)}
                    >
                      {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Platform</label>
                    <select
                      className="input"
                      value={link.platform}
                      onChange={(e) => updateLink(i, "platform", e.target.value)}
                    >
                      {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Display Price</label>
                    <input
                      className="input"
                      placeholder="₹29,990"
                      value={link.displayPrice}
                      onChange={(e) => updateLink(i, "displayPrice", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Affiliate URL</label>
                  <input
                    className="input"
                    placeholder="https://amzn.to/..."
                    value={link.url}
                    onChange={(e) => updateLink(i, "url", e.target.value)}
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                  <input
                    type="checkbox"
                    checked={link.active}
                    onChange={(e) => updateLink(i, "active", e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
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
              <textarea
                name="pros"
                className="input min-h-[100px]"
                defaultValue={(product.pros || []).join("\n")}
              />
            </div>
            <div>
              <label className="label">Cons (one per line)</label>
              <textarea
                name="cons"
                className="input min-h-[100px]"
                defaultValue={(product.cons || []).join("\n")}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Update Product"}
          </button>
          <Link href="/admin/products" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
