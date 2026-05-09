import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what Time For Growth is, how we recommend products, and our affiliate transparency policy.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black mb-8">About Time For Growth</h1>

      <div className="space-y-6 text-[#333] leading-relaxed">
        <p>
          <strong>Time For Growth</strong> is a YouTube-first media brand built around honest gear recommendations for creators, tech enthusiasts, and everyday consumers across the globe. What started as a single channel has grown into a full platform — and this store is the next step in that evolution.
        </p>

        <h2 className="text-2xl font-black text-black mt-10">What We Do</h2>
        <p>
          We research, test, and review gear — cameras, audio equipment, productivity tools, lighting setups, and more. Every product on this site has been assessed by our team. We don't list something unless we genuinely believe it's worth your money.
        </p>

        <h2 className="text-2xl font-black text-black mt-10">Smarter Shopping, Wherever You Are</h2>
        <p>
          One of the biggest frustrations with global affiliate sites is broken links. A reader in India clicks a link to Amazon.com and finds the product doesn't ship there. That's a dead click for the creator, and a frustrating experience for you.
        </p>
        <p>
          We've solved this problem. Our platform detects your country and routes you to the right store — Amazon.in or Flipkart for India, Amazon.co.uk for the UK, Amazon.ca for Canada, and so on. You always end up somewhere you can actually buy the product.
        </p>

        <h2 className="text-2xl font-black text-black mt-10">How We Make Recommendations</h2>
        <p>
          Our recommendations are always based on merit, not commercial relationships. We use a combination of hands-on testing, community feedback, and category research. Our editorial team has the final say on every product that appears on this site.
        </p>

        <h2 className="text-2xl font-black text-black mt-10">Affiliate Transparency</h2>
        <p>
          We earn affiliate commissions when you click one of our links and make a purchase. This costs you nothing extra — the retailer pays us a small percentage as a thank-you for sending you their way. This is how we keep the site free and the content independent.
        </p>
        <p>
          We will never recommend a product solely because of a higher commission rate. Our integrity is the reason you trust us, and we take that seriously.
        </p>
        <p>
          For the full disclosure, see our <a href="/affiliate-disclosure" className="underline hover:text-black transition-colors">Affiliate Disclosure</a>.
        </p>
      </div>
    </div>
  );
}
