import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRecentClicks } from "@/lib/supabase";
import { sanityWriteClient as sanityClient } from "@/lib/sanity";
import Link from "next/link";
import { ExternalLink, Package, FileText, MousePointerClick, Globe } from "lucide-react";

async function getStats() {
  try {
    const [products, articles] = await Promise.all([
      sanityClient.fetch(`count(*[_type == "product" && status == "published"])`),
      sanityClient.fetch(`count(*[_type == "article" && status == "published"])`),
    ]);
    return { products: products || 0, articles: articles || 0 };
  } catch {
    return { products: 0, articles: 0 };
  }
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-card p-6 flex items-start gap-4">
      <div className="p-2.5 bg-black rounded-md">
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <div className="text-3xl font-black text-black">{value}</div>
        <div className="text-sm text-[#666] mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [stats, recentClicks] = await Promise.all([
    getStats(),
    getRecentClicks(10).catch(() => []),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black">Dashboard</h1>
        <p className="text-[#666] text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4 mb-8">
        <StatCard label="Published Products" value={stats.products} icon={Package} />
        <StatCard label="Published Articles" value={stats.articles} icon={FileText} />
        <StatCard label="Clicks This Month" value="—" icon={MousePointerClick} />
        <StatCard label="Top Country" value="—" icon={Globe} />
      </div>

      {/* Two panels */}
      <div className="grid desktop:grid-cols-2 gap-6 mb-6">
        {/* Recent Clicks */}
        <div className="bg-white border border-[#E0E0E0] rounded-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E0E0E0]">
            <h2 className="font-bold text-sm">Recent Clicks</h2>
            <Link href="/admin/analytics" className="text-xs text-[#666] hover:text-black transition-colors flex items-center gap-1">
              View All <ExternalLink size={11} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Product</th>
                  <th>Country</th>
                  <th>Platform</th>
                </tr>
              </thead>
              <tbody>
                {recentClicks.length > 0 ? (
                  recentClicks.map((click: any) => (
                    <tr key={click.id}>
                      <td className="text-xs text-[#999]">
                        {new Date(click.created_at).toLocaleTimeString("en-GB")}
                      </td>
                      <td className="font-medium text-black max-w-[150px] truncate">
                        {click.product_slug}
                      </td>
                      <td>{click.country_code}</td>
                      <td>{click.platform}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-[#999] py-8 text-sm">
                      No clicks recorded yet. Clicks will appear here once users buy products.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-5">
          <h2 className="font-bold text-sm mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/products/new" className="btn-primary justify-center py-3 text-xs">
              + Add Product
            </Link>
            <Link href="/admin/articles/new" className="btn-secondary justify-center py-3 text-xs">
              + Write Article
            </Link>
            <Link href="/admin/links" className="btn-secondary justify-center py-3 text-xs">
              Affiliate Links
            </Link>
            <Link href="/admin/analytics" className="btn-secondary justify-center py-3 text-xs">
              View Analytics
            </Link>
          </div>

          {/* Setup checklist */}
          <div className="mt-6 pt-5 border-t border-[#E0E0E0]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-3">Setup Checklist</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Connect Sanity CMS", href: null },
                { label: "Configure Supabase DB", href: null },
                { label: "Add ConvertKit API", href: "/admin/settings" },
                { label: "Create first product", href: "/admin/products/new" },
                { label: "Publish first article", href: "/admin/articles/new" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-[#666]">
                  <div className="w-4 h-4 rounded border border-[#E0E0E0] shrink-0" />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-black transition-colors hover:underline">{item.label}</Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
