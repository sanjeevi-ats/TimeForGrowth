"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Package, BookOpen, FileText, Loader2 } from "lucide-react";

interface Hit {
  objectID: string;
  type: string;
  title: string;
  slug: string;
  description?: string;
  url: string;
  imageUrl?: string;
  rating?: number;
  _highlightResult?: {
    title?: { value: string };
    description?: { value: string };
  };
}

interface SearchResults {
  products?: Hit[];
  articles?: Hit[];
  hits?: Hit[];
  unconfigured?: boolean;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults(null);
      setSelected(-1);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Debounced search
  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults(null); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 300);
  };

  const allHits = [
    ...(results?.products || []),
    ...(results?.articles || []),
    ...(results?.hits || []),
  ];

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, allHits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, -1));
    } else if (e.key === "Enter" && selected >= 0 && allHits[selected]) {
      window.location.href = allHits[selected].url;
      onClose();
    }
  };

  if (!open) return null;

  const products = results?.products || [];
  const articles = results?.articles || [];
  const hasResults = allHits.length > 0;
  const searched = query.length >= 2;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="mx-auto w-full max-w-2xl mt-[8vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "80vh", animation: "slideUp 0.2s ease-out" }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F0F0F0]">
          {loading
            ? <Loader2 size={18} className="text-[#999] shrink-0 animate-spin" />
            : <Search size={18} className="text-[#999] shrink-0" />
          }
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products, reviews, buying guides…"
            className="flex-1 text-base text-black outline-none placeholder:text-[#BDBDBD] bg-transparent"
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults(null); inputRef.current?.focus(); }}
              className="p-1 text-[#999] hover:text-black transition-colors">
              <X size={16} />
            </button>
          )}
          <button onClick={onClose}
            className="ml-2 px-3 py-1 text-xs text-[#666] border border-[#E0E0E0] rounded-md hover:border-black transition-colors">
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 60px)" }}>
          {/* Not configured */}
          {results?.unconfigured && (
            <div className="px-5 py-10 text-center">
              <Search size={32} className="text-[#E0E0E0] mx-auto mb-3" />
              <p className="text-sm text-[#666] font-medium">Search not configured</p>
              <p className="text-xs text-[#999] mt-1">Add your Algolia keys to <code className="bg-[#F5F5F5] px-1 rounded">.env.local</code> and run the indexing script.</p>
            </div>
          )}

          {/* Empty state */}
          {searched && !loading && !hasResults && !results?.unconfigured && (
            <div className="px-5 py-10 text-center">
              <Search size={32} className="text-[#E0E0E0] mx-auto mb-3" />
              <p className="text-sm text-[#666]">No results for <strong>"{query}"</strong></p>
              <p className="text-xs text-[#999] mt-1">Try a different keyword</p>
            </div>
          )}

          {/* Products */}
          {products.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                <Package size={13} className="text-[#999]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#999]">Products</span>
              </div>
              {products.map((hit, i) => (
                <HitRow key={hit.objectID} hit={hit} selected={selected === i} onClose={onClose} globalIndex={i} />
              ))}
            </div>
          )}

          {/* Articles */}
          {articles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                {articles[0]?.type === "buying-guide"
                  ? <BookOpen size={13} className="text-[#999]" />
                  : <FileText size={13} className="text-[#999]" />
                }
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#999]">Reviews & Guides</span>
              </div>
              {articles.map((hit, i) => (
                <HitRow key={hit.objectID} hit={hit} selected={selected === products.length + i} onClose={onClose} globalIndex={products.length + i} />
              ))}
            </div>
          )}

          {/* Quick links (no query) */}
          {!query && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-[#999] mb-4">Quick links</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[["All Products", "/products"], ["Reviews", "/reviews"], ["Buying Guides", "/buying-guides"]].map(([label, href]) => (
                  <Link key={href} href={href} onClick={onClose}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[#E0E0E0] rounded-full hover:border-black hover:text-black transition-colors text-[#666]">
                    {label} <ArrowRight size={11} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HitRow({ hit, selected, onClose, globalIndex }: { hit: Hit; selected: boolean; onClose: () => void; globalIndex: number }) {
  const highlightedTitle = hit._highlightResult?.title?.value || hit.title;
  const snippet = hit._highlightResult?.description?.value || hit.description || "";

  return (
    <Link
      href={hit.url}
      onClick={onClose}
      className={`flex items-center gap-3 px-5 py-3 transition-colors group ${selected ? "bg-black text-white" : "hover:bg-[#F9F9F9]"}`}
    >
      {/* Thumbnail */}
      <div className={`w-10 h-10 rounded-lg shrink-0 overflow-hidden border ${selected ? "border-white/20" : "border-[#F0F0F0]"} bg-[#F5F5F5] flex items-center justify-center`}>
        {hit.imageUrl
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={hit.imageUrl} alt="" className="w-full h-full object-cover" />
          : <Package size={16} className={selected ? "text-white/50" : "text-[#BDBDBD]"} />
        }
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`text-sm font-semibold leading-tight line-clamp-1 ${selected ? "text-white" : "text-black"}`}
          dangerouslySetInnerHTML={{ __html: highlightedTitle }}
        />
        {snippet && (
          <div
            className={`text-xs mt-0.5 line-clamp-1 ${selected ? "text-white/60" : "text-[#999]"}`}
            dangerouslySetInnerHTML={{ __html: snippet }}
          />
        )}
      </div>

      <div className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
        selected ? "bg-white/20 text-white" : "bg-[#F0F0F0] text-[#666]"
      }`}>
        {hit.type === "product" ? "Product" : hit.type === "buying-guide" ? "Guide" : "Review"}
      </div>

      <ArrowRight size={13} className={`shrink-0 ${selected ? "text-white/70" : "text-[#CCC] group-hover:text-[#999]"} transition-colors`} />
    </Link>
  );
}
