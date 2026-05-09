import type { Region } from "./types";

// All supported regions and their routing configuration
export const REGIONS: Record<string, Region> = {
  IN: { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", currencySymbol: "₹", primaryPlatform: "Flipkart", fallbackPlatforms: ["Amazon.in", "Amazon.com"] },
  US: { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", currencySymbol: "$", primaryPlatform: "Amazon.com", fallbackPlatforms: ["B&H Photo", "eBay US"] },
  GB: { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", currencySymbol: "£", primaryPlatform: "Amazon.co.uk", fallbackPlatforms: ["Currys"] },
  IE: { code: "IE", name: "Ireland", flag: "🇮🇪", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.co.uk", fallbackPlatforms: ["Amazon.com"] },
  CA: { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", currencySymbol: "CA$", primaryPlatform: "Amazon.ca", fallbackPlatforms: ["Amazon.com"] },
  AU: { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", currencySymbol: "A$", primaryPlatform: "Amazon.com.au", fallbackPlatforms: ["eBay AU", "Amazon.com"] },
  DE: { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.de", fallbackPlatforms: ["Amazon.com"] },
  AT: { code: "AT", name: "Austria", flag: "🇦🇹", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.de", fallbackPlatforms: ["Amazon.com"] },
  CH: { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF", currencySymbol: "CHF", primaryPlatform: "Amazon.de", fallbackPlatforms: ["Amazon.com"] },
  FR: { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.fr", fallbackPlatforms: ["Amazon.com"] },
  ES: { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.es", fallbackPlatforms: ["Amazon.com"] },
  IT: { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.it", fallbackPlatforms: ["Amazon.com"] },
  NL: { code: "NL", name: "Netherlands", flag: "🇳🇱", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.de", fallbackPlatforms: ["Amazon.co.uk", "Amazon.com"] },
  BE: { code: "BE", name: "Belgium", flag: "🇧🇪", currency: "EUR", currencySymbol: "€", primaryPlatform: "Amazon.de", fallbackPlatforms: ["Amazon.co.uk", "Amazon.com"] },
  AE: { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED", currencySymbol: "AED", primaryPlatform: "Amazon.ae", fallbackPlatforms: ["Amazon.com"] },
  SA: { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", currencySymbol: "SAR", primaryPlatform: "Amazon.sa", fallbackPlatforms: ["Amazon.com"] },
  SG: { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD", currencySymbol: "S$", primaryPlatform: "Lazada", fallbackPlatforms: ["Amazon.com"] },
  MY: { code: "MY", name: "Malaysia", flag: "🇲🇾", currency: "MYR", currencySymbol: "RM", primaryPlatform: "Lazada", fallbackPlatforms: ["Amazon.com"] },
  PH: { code: "PH", name: "Philippines", flag: "🇵🇭", currency: "PHP", currencySymbol: "₱", primaryPlatform: "Shopee", fallbackPlatforms: ["Amazon.com"] },
  TH: { code: "TH", name: "Thailand", flag: "🇹🇭", currency: "THB", currencySymbol: "฿", primaryPlatform: "Lazada", fallbackPlatforms: ["Amazon.com"] },
};

// Regional group mappings (country -> group representative for fallback)
export const REGIONAL_GROUPS: Record<string, string> = {
  IE: "GB",
  AT: "DE",
  CH: "DE",
  NL: "DE",
  BE: "DE",
  LU: "DE",
};

export const DEFAULT_REGION = "US";
export const GLOBAL_FALLBACK_PLATFORM = "Amazon.com";

export function getRegion(countryCode: string): Region {
  // Direct match
  if (REGIONS[countryCode]) return REGIONS[countryCode];
  // Regional group fallback
  const groupCode = REGIONAL_GROUPS[countryCode];
  if (groupCode && REGIONS[groupCode]) return REGIONS[groupCode];
  // Default
  return REGIONS[DEFAULT_REGION];
}

export function resolveAffiliateLink(
  affiliateLinks: Array<{ countryCode: string; platform: string; url: string; active: boolean }>,
  countryCode: string
): { url: string; platform: string } | null {
  if (!affiliateLinks?.length) return null;

  const activeLinks = affiliateLinks.filter((l) => l.active);

  // 1. Exact country match
  const exactMatch = activeLinks.find((l) => l.countryCode.toUpperCase() === countryCode.toUpperCase());
  if (exactMatch) return { url: exactMatch.url, platform: exactMatch.platform };

  // 2. Regional group fallback
  const groupCode = REGIONAL_GROUPS[countryCode];
  if (groupCode) {
    const groupMatch = activeLinks.find((l) => l.countryCode.toUpperCase() === groupCode.toUpperCase());
    if (groupMatch) return { url: groupMatch.url, platform: groupMatch.platform };
  }

  // 3. Global/US fallback
  const globalMatch = activeLinks.find((l) => l.countryCode.toUpperCase() === "US" || l.countryCode.toUpperCase() === "GLOBAL");
  if (globalMatch) return { url: globalMatch.url, platform: globalMatch.platform };

  // 4. Any active link as last resort
  return activeLinks.length > 0 ? { url: activeLinks[0].url, platform: activeLinks[0].platform } : null;
}

export function buildAffiliateUrl(baseUrl: string, slug: string, region: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", "time4growth");
  url.searchParams.set("utm_medium", "affiliate");
  url.searchParams.set("utm_campaign", slug);
  url.searchParams.set("utm_content", region.toLowerCase());
  return url.toString();
}

export function getCountryName(code: string): string {
  return REGIONS[code]?.name || code;
}

export function getCountryFlag(code: string): string {
  return REGIONS[code]?.flag || "🌍";
}

export function getCurrencySymbol(code: string): string {
  return REGIONS[code]?.currencySymbol || "$";
}
