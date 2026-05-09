"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCountryFlag, getCountryName, REGIONS } from "@/lib/geo";
import SearchModal from "@/components/search/SearchModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  // { href: "/reviews", label: "Reviews" },
  // { href: "/buying-guides", label: "Buying Guides" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [region, setRegion] = useState("IN");
  const [regionDropdown, setRegionDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  // Detect region from cookie/session
  useEffect(() => {
    const storedRegion = localStorage.getItem("t4g_region") || "IN";
    setRegion(storedRegion);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close region dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setRegionDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleRegionChange = (code: string) => {
    setRegion(code);
    localStorage.setItem("t4g_region", code);
    document.cookie = `t4g_region=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setRegionDropdown(false);
    window.location.reload();
  };



  return (
    <>
      {/* Affiliate Disclosure Bar */}
      <AffiliateDisclosureBar />

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white border-b border-[#E0E0E0] transition-shadow duration-300",
          scrolled && "shadow-sm"
        )}
      >
        {/* Algolia Search Modal */}
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <Image src="/logo.png" alt="Time For Growth" width={34} height={34} className="rounded-full" />
            <span className="font-black text-base uppercase tracking-tight text-black hidden sm:block">
              Time For Growth
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden desktop:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#333] hover:text-black transition-colors rounded-md hover:bg-[#F9F9F9]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Center */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                onClick={() => setSearchOpen(true)}
                className="w-full px-4 py-2.5 bg-[#F5F5F5] border border-[#E0E0E0] rounded-full text-sm placeholder:text-[#999] focus:outline-none focus:border-black focus:bg-white transition-all"
                readOnly
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search icon */}
            {/* <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors"
              aria-label="Open search"
            >
              <Search size={18} />
            </button> */}

            {/* Region indicator */}
            <div ref={regionRef} className="relative">
              <button
                onClick={() => setRegionDropdown(!regionDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium border border-[#E0E0E0] rounded-md hover:border-black transition-colors"
                aria-haspopup="listbox"
                aria-expanded={regionDropdown}
              >
                <span>{getCountryFlag(region)}</span>
                <span className="hidden sm:inline">{region}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-200", regionDropdown && "rotate-180")} />
              </button>

              {/* Region dropdown */}
              {regionDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E0E0E0] rounded-card shadow-card-hover z-50 overflow-hidden">
                  <div className="px-3 py-2 text-xs font-semibold text-[#666] uppercase tracking-wider border-b border-[#E0E0E0]">
                    Select Region
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {Object.values(REGIONS).map((r) => (
                      <button
                        key={r.code}
                        onClick={() => handleRegionChange(r.code)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left hover:bg-[#F9F9F9] transition-colors",
                          region === r.code && "bg-black text-white hover:bg-black"
                        )}
                      >
                        <span>{r.flag}</span>
                        <span>{r.name}</span>
                        <span className={cn("ml-auto text-xs", region === r.code ? "text-white/70" : "text-[#999]")}>
                          {r.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <span className="hidden sm:block w-px h-4 bg-[#E0E0E0]" />

            {/* Admin link */}
            <Link
              href="/admin/dashboard"
              className="hidden sm:flex items-center gap-1 text-xs text-[#666] hover:text-black transition-colors"
            >
              Admin
              <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

// ============================================================
// Affiliate Disclosure Bar
// ============================================================
function AffiliateDisclosureBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("t4g_disclosure_dismissed");
    setVisible(!dismissed);
  }, []);

  const dismiss = () => {
    localStorage.setItem("t4g_disclosure_dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="disclosure-bar relative">
      <span>
        time4growth.in earns affiliate commissions from purchases made through our links at no extra cost to you.{" "}
        <Link href="/affiliate-disclosure" className="underline hover:text-black transition-colors">
          Learn more
        </Link>
      </span>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-black transition-colors"
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>
    </div>
  );
}
