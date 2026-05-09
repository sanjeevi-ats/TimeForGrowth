"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function AddCategoryForm({ nextOrder }: { nextOrder: number }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(toSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;
    setSaving(true);
    setError("");

    const { createCategory } = await import("@/app/actions/sanity");
    const result = await createCategory(name, slug, description, nextOrder);

    setSaving(false);
    if (result.error) {
      setError(result.error);
    } else {
      setName("");
      setSlug("");
      setDescription("");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-card">
          {error}
        </div>
      )}

      <div>
        <label className="label">Category Name *</label>
        <input
          className="input"
          placeholder="e.g. Cameras"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label">Slug *</label>
        <input
          className="input font-mono text-sm"
          placeholder="cameras"
          value={slug}
          onChange={(e) => setSlug(toSlug(e.target.value))}
          required
        />
        <p className="text-xs text-[#999] mt-1">Auto-generated from name · used in URLs</p>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          className="input min-h-[72px]"
          placeholder="Optional short description shown on the site"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit" disabled={saving || !name.trim()} className="btn-primary w-full justify-center">
        {saving ? "Adding…" : (<><Plus size={14} /> Add Category</>)}
      </button>
    </form>
  );
}
