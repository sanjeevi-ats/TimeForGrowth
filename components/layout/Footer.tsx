import Link from "next/link";
import { Youtube, Mail, ExternalLink } from "lucide-react";

const footerLinks = {
  about: {
    heading: "About",
    content:
      "Time For Growth is a YouTube-first media brand that curates the best gear for global audiences — intelligently routing you to the right store for your region.",
  },
  quickLinks: {
    heading: "Quick Links",
    links: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/reviews", label: "Reviews" },
      { href: "/buying-guides", label: "Buying Guides" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  categories: {
    heading: "Categories",
    links: [
      { href: "/products?category=cameras", label: "Cameras" },
      { href: "/products?category=audio", label: "Audio" },
      { href: "/products?category=productivity", label: "Productivity" },
      { href: "/products?category=lighting", label: "Lighting" },
      { href: "/products?category=accessories", label: "Accessories" },
      { href: "/products?category=mobile-gear", label: "Mobile Gear" },
    ],
  },
  connect: {
    heading: "Connect",
    links: [
      { href: "https://youtube.com/@time4growth", label: "YouTube", icon: <Youtube size={14} />, external: true },
      { href: "mailto:hello@time4growth.in", label: "hello@time4growth.in", icon: <Mail size={14} />, external: false },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E0E0E0] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div>
            <div className="font-black text-lg uppercase tracking-tight text-black mb-3">
              Time For Growth
            </div>
            <p className="text-sm text-[#666] leading-relaxed">{footerLinks.about.content}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-4">
              {footerLinks.quickLinks.heading}
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#666] hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-4">
              {footerLinks.categories.heading}
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#666] hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-4">
              {footerLinks.connect.heading}
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-sm text-[#666] hover:text-black transition-colors"
                  >
                    {link.icon}
                    {link.label}
                    {link.external && <ExternalLink size={11} className="text-[#999]" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E0E0E0] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666]">
          <span>© {new Date().getFullYear()} Time For Growth. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/affiliate-disclosure" className="hover:text-black transition-colors">
              Affiliate Disclosure
            </Link>
            <span className="text-[#E0E0E0]">|</span>
            <Link href="/privacy-policy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
