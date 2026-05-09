import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Time For Growth affiliate commission disclosure statement.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black mb-8">Affiliate Disclosure</h1>
      <div className="space-y-5 text-[#333] leading-relaxed">
        <p><strong>Last updated:</strong> March 2026</p>
        <p>
          time4growth.in is a participant in various affiliate advertising programs, including the Amazon Associates Program and other affiliate networks. As an affiliate, we may earn commissions from purchases made through links on this site at no additional cost to you.
        </p>
        <h2 className="text-xl font-bold text-black mt-8">How It Works</h2>
        <p>
          When you click a product link on this site, you may be redirected to a third-party retailer (such as Amazon.in, Flipkart, Amazon.com, Amazon.co.uk, etc.). If you make a purchase within an eligible window, we receive a small commission from the retailer.
        </p>
        <h2 className="text-xl font-bold text-black mt-8">Our Commitment</h2>
        <p>
          Our editorial opinions are never influenced by affiliate relationships. Products are recommended based solely on merit — our research, testing, and genuine belief that the product will serve our readers well. Higher commission rates do not influence our recommendations.
        </p>
        <h2 className="text-xl font-bold text-black mt-8">Platform Affiliations</h2>
        <ul className="list-disc pl-5 space-y-1 text-[#333]">
          <li>Amazon Associates (US, IN, UK, CA, AU, DE, FR, ES, IT, AE, SA)</li>
          <li>Flipkart Affiliate Program (India)</li>
          <li>eBay Partner Network (AU, US)</li>
          <li>B&H Photo Video Affiliate Program (US)</li>
          <li>Other brand-direct affiliate programs as applicable</li>
        </ul>
        <h2 className="text-xl font-bold text-black mt-8">Questions</h2>
        <p>
          If you have questions about our affiliate relationships, please contact us at{" "}
          <a href="mailto:hello@time4growth.in" className="underline hover:text-black">hello@time4growth.in</a>.
        </p>
      </div>
    </div>
  );
}
