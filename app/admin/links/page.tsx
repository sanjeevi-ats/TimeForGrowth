import { sanityWriteClient as sanityClient } from "@/lib/sanity";
import { getCountryFlag } from "@/lib/geo";

async function getAllLinks() {
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && status == "published"] {
        _id, name,
        "slug": slug.current,
        affiliateLinks
      }`
    );
  } catch {
    return [];
  }
}

export default async function AdminLinksPage() {
  const products = await getAllLinks();

  const allLinks: any[] = [];
  products.forEach((product: any) => {
    (product.affiliateLinks || []).forEach((link: any) => {
      allLinks.push({ ...link, productName: product.name, productSlug: product.slug });
    });
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Affiliate Links</h1>
          <p className="text-[#666] text-sm mt-1">{allLinks.length} links across {products.length} products</p>
        </div>
        <a
          href="#"
          className="btn-secondary text-sm"
          title="Export all links as CSV (coming soon)"
        >
          Export CSV
        </a>
      </div>

      {allLinks.length === 0 && (
        <div className="bg-[#F9F9F9] border border-[#E0E0E0] rounded-card p-8 text-center text-[#666]">
          No affiliate links configured yet. Add links when editing products in{" "}
          <a href="/admin/products" className="underline hover:text-black">Products</a>.
        </div>
      )}

      {allLinks.length > 0 && (
        <div className="bg-white border border-[#E0E0E0] rounded-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Region</th>
                  <th>Platform</th>
                  <th>Price</th>
                  <th>URL</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allLinks.map((link, i) => (
                  <tr key={i}>
                    <td className="font-medium text-black">{link.productName}</td>
                    <td>
                      <span className="flex items-center gap-1.5 text-sm">
                        <span>{getCountryFlag(link.countryCode)}</span>
                        <span>{link.countryCode}</span>
                      </span>
                    </td>
                    <td>{link.platform}</td>
                    <td>{link.displayPrice || "—"}</td>
                    <td>
                      <span className="text-xs text-[#666] truncate max-w-xs block" title={link.url}>
                        {link.url?.slice(0, 50)}…
                      </span>
                    </td>
                    <td>
                      {link.active
                        ? <span className="badge-published">Active</span>
                        : <span className="badge-archived">Inactive</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
