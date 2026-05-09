/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "imagedelivery.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Amazon image CDNs
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      { protocol: "https", hostname: "*.amazon.com" },
      { protocol: "https", hostname: "*.amazon.in" },
      // Flipkart
      { protocol: "https", hostname: "rukminim*.flixcart.com" },
      { protocol: "https", hostname: "*.flixcart.com" },
      // B&H Photo
      { protocol: "https", hostname: "*.bhphotovideo.com" },
      // eBay
      { protocol: "https", hostname: "*.ebayimg.com" },
      // Currys / general CDNs
      { protocol: "https", hostname: "*.curryspc.co.uk" },
      { protocol: "https", hostname: "*.ytimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
