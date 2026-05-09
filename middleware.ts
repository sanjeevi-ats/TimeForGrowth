import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const res = NextResponse.next();
    
    // Auto-detect physical region for first-time visitors
    if (!req.cookies.has("t4g_region")) {
      // Standard headers provided by Cloudflare or Vercel
      const physicalCountry = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "IN";
      res.cookies.set("t4g_region", physicalCountry.toUpperCase(), { 
        path: "/", 
        maxAge: 31536000, // 1 year
        sameSite: "lax" 
      });
    }
    
    return res;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Require auth ONLY for admin routes (except the login page itself)
        if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
          return !!token;
        }
        // Allow all other visitors (storefront)
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  // Run on all paths so we can detect location for storefront visitors,
  // but explicitly ignore static files and Next.js internals to save performance
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
