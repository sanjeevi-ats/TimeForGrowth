export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-black mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Email Integration */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6">
          <h2 className="font-bold text-base mb-4">Email Integration (ConvertKit)</h2>
          <div className="space-y-4">
            <div>
              <label className="label">API Key</label>
              <input
                type="text"
                placeholder="Configured via CONVERTKIT_API_KEY in .env.local"
                className="input"
                disabled
              />
            </div>
            <div>
              <label className="label">Form ID</label>
              <input
                type="text"
                placeholder="Configured via CONVERTKIT_FORM_ID in .env.local"
                className="input"
                disabled
              />
            </div>
            <p className="text-xs text-[#666]">
              Update these values in your <code className="bg-[#F5F5F5] px-1 rounded">.env.local</code> file
              and redeploy to change the ConvertKit integration.
            </p>
          </div>
        </div>

        {/* Region Settings */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6">
          <h2 className="font-bold text-base mb-4">Region Settings</h2>
          <p className="text-sm text-[#666] mb-4">
            Regional routing chains are configured in <code className="bg-[#F5F5F5] px-1 rounded">lib/geo.ts</code>.
            Per-product affiliate links are set in the{" "}
            <a href="/admin/products" className="underline hover:text-black">Products</a> section.
          </p>
          <div className="border border-[#E0E0E0] rounded-card overflow-hidden">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Region</th>
                  <th>Primary Platform</th>
                  <th>Fallback</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "IN", name: "India", primary: "Flipkart", fallback: "Amazon.in" },
                  { code: "US", name: "United States", primary: "Amazon.com", fallback: "B&H Photo" },
                  { code: "GB", name: "United Kingdom", primary: "Amazon.co.uk", fallback: "Currys" },
                  { code: "CA", name: "Canada", primary: "Amazon.ca", fallback: "Amazon.com" },
                  { code: "AU", name: "Australia", primary: "Amazon.com.au", fallback: "eBay AU" },
                  { code: "DE", name: "Germany", primary: "Amazon.de", fallback: "Amazon.com" },
                  { code: "FR", name: "France", primary: "Amazon.fr", fallback: "Amazon.com" },
                  { code: "AE", name: "UAE", primary: "Amazon.ae", fallback: "Amazon.com" },
                ].map((r) => (
                  <tr key={r.code}>
                    <td className="font-bold text-[#666]">{r.code}</td>
                    <td>{r.name}</td>
                    <td>{r.primary}</td>
                    <td className="text-[#999]">{r.fallback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Users */}
        <div className="bg-white border border-[#E0E0E0] rounded-card p-6">
          <h2 className="font-bold text-base mb-4">Admin Users</h2>
          <p className="text-sm text-[#666]">
            Admin access is configured via environment variables (
            <code className="bg-[#F5F5F5] px-1 rounded">ADMIN_EMAIL</code> and{" "}
            <code className="bg-[#F5F5F5] px-1 rounded">ADMIN_PASSWORD_HASH</code>). Generate a bcrypt hash using:
          </p>
          <pre className="mt-3 p-3 bg-[#F5F5F5] rounded-card text-xs overflow-x-auto">
            {"node -e \"const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('yourpassword', 12));\""}
          </pre>
        </div>
      </div>
    </div>
  );
}
