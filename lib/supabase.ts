import { createClient } from "@supabase/supabase-js";
import type { ClickLog } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// SQL to create the clicks table (run once in Supabase SQL Editor):
// CREATE TABLE clicks (
//   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   created_at timestamptz DEFAULT now(),
//   product_slug text NOT NULL,
//   country_code char(2),
//   platform text,
//   referrer_url text,
//   session_id text,
//   user_agent text
// );

export async function logClick(data: ClickLog): Promise<void> {
  try {
    await supabaseAdmin.from("clicks").insert([data]);
  } catch (e) {
    // Fire-and-forget: log error but don't block redirect
    console.error("Click logging failed:", e);
  }
}

export async function getClickStats(startDate: string, endDate: string) {
  const { data } = await supabaseAdmin
    .from("clicks")
    .select("*")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  return data || [];
}

export async function getClicksByCountry(startDate: string, endDate: string) {
  const { data } = await supabaseAdmin.rpc("clicks_by_country", {
    start_date: startDate,
    end_date: endDate,
  });
  return data || [];
}

export async function getTopProducts(startDate: string, endDate: string, limit = 10) {
  const { data } = await supabaseAdmin.rpc("top_products", {
    start_date: startDate,
    end_date: endDate,
    result_limit: limit,
  });
  return data || [];
}

export async function getDailyClicks(startDate: string, endDate: string) {
  const { data } = await supabaseAdmin.rpc("daily_clicks", {
    start_date: startDate,
    end_date: endDate,
  });
  return data || [];
}

export async function getRecentClicks(limit = 10) {
  const { data } = await supabaseAdmin
    .from("clicks")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data || [];
}
