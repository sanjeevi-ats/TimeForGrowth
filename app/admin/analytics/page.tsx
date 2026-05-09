import { getRecentClicks } from "@/lib/supabase";
import { LineChart, HBarChart } from "@/components/admin/Charts";

export default async function AdminAnalyticsPage() {
  // In production, replace with date-range filtered Supabase queries
  const recentClicks = await getRecentClicks(100).catch(() => []);

  // Build daily click data from recent
  const dailyMap: Record<string, number> = {};
  recentClicks.forEach((click: any) => {
    const date = new Date(click.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dailyMap[date] = (dailyMap[date] || 0) + 1;
  });
  const dailyData = Object.entries(dailyMap).map(([date, count]) => ({ date, count }));

  // By country
  const countryMap: Record<string, number> = {};
  recentClicks.forEach((click: any) => {
    const cc = click.country_code || "??";
    countryMap[cc] = (countryMap[cc] || 0) + 1;
  });
  const countryData = Object.entries(countryMap)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // By platform
  const platformMap: Record<string, number> = {};
  recentClicks.forEach((click: any) => {
    const plt = click.platform || "Unknown";
    platformMap[plt] = (platformMap[plt] || 0) + 1;
  });

  const totalClicks = recentClicks.length;
  const topCountry = countryData[0]?.label || "—";
  const topPlatform = Object.entries(platformMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Analytics</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Clicks", value: totalClicks },
          { label: "Unique Products", value: new Set(recentClicks.map((c: any) => c.product_slug)).size },
          { label: "Top Country", value: topCountry },
          { label: "Top Platform", value: topPlatform },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-[#E0E0E0] rounded-card p-5">
            <div className="text-xs text-[#666] uppercase tracking-wider mb-1">{label}</div>
            <div className="text-2xl font-black">{value}</div>
          </div>
        ))}
      </div>

      {/* Clicks Over Time */}
      <div className="bg-white border border-[#E0E0E0] rounded-card p-6 mb-6">
        <h2 className="font-bold text-sm mb-4">Clicks Over Time</h2>
        {dailyData.length > 0 ? (
          <div className="h-56">
            <LineChart data={dailyData} />
          </div>
        ) : (
          <div className="h-56 flex items-center justify-center text-[#999] text-sm">
            No click data yet. Data will appear once users click affiliate links.
          </div>
        )}
      </div>

      {/* Clicks by Country + Platform */}
      <div className="grid desktop:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6">
          <h2 className="font-bold text-sm mb-4">Clicks by Country</h2>
          {countryData.length > 0 ? (
            <div className="h-64">
              <HBarChart data={countryData} />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-[#999] text-sm">No data yet</div>
          )}
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded-card p-6">
          <h2 className="font-bold text-sm mb-4">Clicks by Platform</h2>
          <div className="space-y-3">
            {Object.entries(platformMap).length > 0 ? (
              Object.entries(platformMap)
                .sort((a, b) => b[1] - a[1])
                .map(([platform, count]) => (
                  <div key={platform}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{platform}</span>
                      <span className="text-[#666]">{count} clicks</span>
                    </div>
                    <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full"
                        style={{ width: `${(count / totalClicks) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-[#999] text-sm">No platform data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="mt-6 bg-white border border-[#E0E0E0] rounded-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E0E0E0] font-bold text-sm">Top Products by Clicks</div>
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Slug</th>
                <th>Total Clicks</th>
                <th>Top Country</th>
                <th>Top Platform</th>
              </tr>
            </thead>
            <tbody>
              {recentClicks.length > 0 ? (() => {
                const productMap: Record<string, any> = {};
                recentClicks.forEach((click: any) => {
                  if (!productMap[click.product_slug]) {
                    productMap[click.product_slug] = { slug: click.product_slug, clicks: 0, countries: {}, platforms: {} };
                  }
                  productMap[click.product_slug].clicks += 1;
                  productMap[click.product_slug].countries[click.country_code] = (productMap[click.product_slug].countries[click.country_code] || 0) + 1;
                  productMap[click.product_slug].platforms[click.platform] = (productMap[click.product_slug].platforms[click.platform] || 0) + 1;
                });
                return Object.values(productMap)
                  .sort((a: any, b: any) => b.clicks - a.clicks)
                  .slice(0, 10)
                  .map((p: any, i: number) => (
                    <tr key={p.slug}>
                      <td className="font-bold text-[#666]">#{i + 1}</td>
                      <td className="font-medium text-black">{p.slug}</td>
                      <td>{p.clicks}</td>
                      <td>{Object.entries(p.countries).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || "—"}</td>
                      <td>{Object.entries(p.platforms).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || "—"}</td>
                    </tr>
                  ));
              })() : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-[#999]">No click data yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
