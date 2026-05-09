import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey || !formId || apiKey.includes("your-convertkit") || formId.includes("your-convertkit")) {
      // Graceful degradation — log but don't break the UX
      console.warn("[ConvertKit] Not configured — skipping email signup for:", cleanEmail);
      return NextResponse.json({ success: true });
    }

    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email: cleanEmail,
        tags: ["time4growth-homepage"],
      }),
    });

    if (res.status === 429) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    if (!res.ok) {
      const body = await res.text();
      console.error("[ConvertKit] API error:", res.status, body);
      throw new Error(`ConvertKit API error: ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Subscribe] Error:", error);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
