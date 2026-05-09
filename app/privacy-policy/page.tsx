import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Time For Growth privacy policy — how we collect and use your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <div className="space-y-5 text-[#333] leading-relaxed">
        <p><strong>Last updated:</strong> March 2026</p>
        <p>
          Your privacy is important to us. This policy explains what information we collect, how we use it, and your rights.
        </p>
        <h2 className="text-xl font-bold text-black mt-8">Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Usage Data:</strong> Page views, click events (on affiliate links), and general browsing patterns — anonymised.</li>
          <li><strong>Geographic Data:</strong> Your country code is detected to route you to the correct regional store. We do not store personally identifiable location data.</li>
          <li><strong>Email:</strong> If you subscribe to our newsletter, we store your email address with our email service provider (ConvertKit).</li>
          <li><strong>Cookies:</strong> We use cookies to remember your region preference and dismiss state for banners. No third-party tracking cookies are set without your consent.</li>
        </ul>
        <h2 className="text-xl font-bold text-black mt-8">How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To route you to the correct affiliate store for your region</li>
          <li>To send weekly newsletters (only if you opted in)</li>
          <li>To improve our product recommendations based on aggregate click data</li>
        </ul>
        <h2 className="text-xl font-bold text-black mt-8">Third-Party Services</h2>
        <p>
          Our site uses the following third-party services, each governed by their own privacy policies: Sanity (CMS), Supabase (analytics database), ConvertKit (email), Vercel (hosting), and Cloudflare (CDN and geo-detection).
        </p>
        <h2 className="text-xl font-bold text-black mt-8">Your Rights (EEA / GDPR)</h2>
        <p>
          If you are in the European Economic Area, you have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. Contact us at{" "}
          <a href="mailto:hello@time4growth.in" className="underline hover:text-black">hello@time4growth.in</a> to exercise these rights.
        </p>
        <h2 className="text-xl font-bold text-black mt-8">Contact</h2>
        <p>
          For any privacy-related queries: <a href="mailto:hello@time4growth.in" className="underline hover:text-black">hello@time4growth.in</a>
        </p>
      </div>
    </div>
  );
}
