// Core type definitions for Time For Growth

export interface AffiliateLink {
  countryCode: string;
  platform: string;
  url: string;
  displayPrice: string;
  active: boolean;
}

export interface ProductImage {
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  productCount?: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  category?: { _ref: string; name?: string; slug?: { current: string } };
  tags?: string[];
  shortDescription: string;
  longDescription?: any[];
  images?: ProductImage[];
  mainImageUrl?: string;
  affiliateLinks?: AffiliateLink[];
  rating?: number;
  pros?: string[];
  cons?: string[];
  verdict?: string;
  featured?: boolean;
  status: "draft" | "published" | "archived";
  _createdAt: string;
  _updatedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
  };
}

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  type: "review" | "buying-guide" | "listicle" | "tutorial";
  author: string;
  category?: Category;
  heroImage?: any;
  mainImageUrl?: string;
  heroImageAlt?: string;
  body?: any[];
  relatedProducts?: Product[];
  excerpt?: string;
  status: "draft" | "published" | "scheduled";
  publishedAt?: string;
  updatedAt?: string;
  scheduledFor?: string;
  _createdAt: string;
  _updatedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
  };
}

export interface ClickLog {
  id?: string;
  created_at?: string;
  product_slug: string;
  country_code: string;
  platform: string;
  referrer_url?: string;
  session_id?: string;
  user_agent?: string;
}

export interface Region {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  primaryPlatform: string;
  fallbackPlatforms: string[];
}

export interface SearchResult {
  type: "product" | "article";
  slug: string;
  title: string;
  excerpt?: string;
  image?: any;
  category?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "editor";
}

export interface AnalyticsStat {
  total_clicks: number;
  unique_products: number;
  top_country: string;
  top_platform: string;
}

export interface ClickByCountry {
  country_code: string;
  count: number;
}

export interface ClickByPlatform {
  platform: string;
  count: number;
}

export interface TopProduct {
  product_slug: string;
  total_clicks: number;
  top_country: string;
  top_platform: string;
}

export interface DailyClick {
  date: string;
  count: number;
}
