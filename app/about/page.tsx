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
          <strong>Welcome to Time For Growth.</strong>
        </p>

        <p>
          Time For Growth was created to help students and young people improve their life, build better habits, and become a better version of themselves.
        </p>

        <p>
          My journey started with my YouTube channel, where I share videos about self-improvement, discipline, productivity, focus, motivation, and better habits.
        </p>

        <p>
          Over the time, I realized something important. A lot of people want to change their life, stay focused, and become more productive… but they often don't know where to start or what tools can actually help them.
        </p>

        <p>
          That's why I created this website.
        </p>

        <h2 className="text-2xl font-black text-black mt-10">What is Time For Growth?</h2>
        <p>
          Time For Growth is more than just a website. It is a place where you can discover useful resources that support your self-improvement journey.
        </p>

        <p>
          Here, I share:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>✅ self-improvement books</li>
          <li>✅ journals and planners</li>
          <li>✅ productivity gadgets</li>
          <li>✅ study tools</li>
          <li>✅ and other useful products that can help improve focus, discipline, and daily life</li>
        </ul>

        <h2 className="text-2xl font-black text-black mt-10">How We Select Products</h2>
        <p>
          Every product recommended on this website is selected with one goal in mind: To help you grow, stay productive, and build a better future for yourself.
        </p>

        <h2 className="text-2xl font-black text-black mt-10">Our Philosophy</h2>
        <p>
          I believe real change does not happen overnight. It happens slowly through small daily habits, better routines, and consistent effort.
        </p>

        <p>
          So my goal is simple: To help people stop wasting time, take control of their life, and become the person they truly want to be.
        </p>

        <h2 className="text-2xl font-black text-black mt-10">Is This For You?</h2>
        <p>
          If you are someone who wants to improve your mindset, build discipline, stay focused, and create a better life for yourself, then you are in the right place.
        </p>

        <p>
          Your journey to becoming a better version of yourself starts now.
        </p>

        <p>
          <strong>Let's grow together.</strong>
        </p>

        <p className="text-sm text-[#666] mt-10">
          For more information about our affiliate partnerships and transparency, see our <a href="/affiliate-disclosure" className="underline hover:text-black transition-colors">Affiliate Disclosure</a>.
        </p>
      </div>
    </div>
  );
}
