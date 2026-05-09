-- ============================================================
-- Time For Growth — Supabase Setup SQL
-- Run once in your Supabase project: SQL Editor → New Query
-- ============================================================

-- 1. Clicks table (affiliate link click tracking)
CREATE TABLE IF NOT EXISTS clicks (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  product_slug   text NOT NULL,
  country_code   char(2),
  platform       text,
  referrer_url   text,
  session_id     text,
  user_agent     text
);

-- 2. Index for fast analytics queries
CREATE INDEX IF NOT EXISTS clicks_created_at_idx ON clicks (created_at DESC);
CREATE INDEX IF NOT EXISTS clicks_product_slug_idx ON clicks (product_slug);
CREATE INDEX IF NOT EXISTS clicks_country_code_idx ON clicks (country_code);

-- 3. Row Level Security — only service role can read/write
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (inserts come from server-side API routes)
CREATE POLICY "Service role full access" ON clicks
  FOR ALL USING (auth.role() = 'service_role');

-- 4. RPC: clicks grouped by country
CREATE OR REPLACE FUNCTION clicks_by_country(start_date timestamptz, end_date timestamptz)
RETURNS TABLE (country_code text, click_count bigint) AS $$
  SELECT country_code::text, COUNT(*) AS click_count
  FROM clicks
  WHERE created_at BETWEEN start_date AND end_date
  GROUP BY country_code
  ORDER BY click_count DESC;
$$ LANGUAGE SQL STABLE;

-- 5. RPC: top products by clicks
CREATE OR REPLACE FUNCTION top_products(start_date timestamptz, end_date timestamptz, result_limit int DEFAULT 10)
RETURNS TABLE (product_slug text, click_count bigint) AS $$
  SELECT product_slug, COUNT(*) AS click_count
  FROM clicks
  WHERE created_at BETWEEN start_date AND end_date
  GROUP BY product_slug
  ORDER BY click_count DESC
  LIMIT result_limit;
$$ LANGUAGE SQL STABLE;

-- 6. RPC: daily click totals
CREATE OR REPLACE FUNCTION daily_clicks(start_date timestamptz, end_date timestamptz)
RETURNS TABLE (day date, click_count bigint) AS $$
  SELECT created_at::date AS day, COUNT(*) AS click_count
  FROM clicks
  WHERE created_at BETWEEN start_date AND end_date
  GROUP BY day
  ORDER BY day ASC;
$$ LANGUAGE SQL STABLE;
