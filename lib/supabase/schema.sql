-- ============================================================
-- Tumans Medicals — Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  slug        text NOT NULL UNIQUE,
  excerpt     text NOT NULL DEFAULT '',
  content     text NOT NULL DEFAULT '',
  author      text NOT NULL DEFAULT '',
  date        timestamptz NOT NULL DEFAULT now(),
  image       text NOT NULL DEFAULT '/Hero.jpg',
  tags        text[] NOT NULL DEFAULT '{}',
  category    text NOT NULL DEFAULT '',
  published   boolean NOT NULL DEFAULT false,
  read_time   integer NOT NULL DEFAULT 1
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"  ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth write"   ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Projects ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id           text PRIMARY KEY,
  title        text NOT NULL,
  slug         text NOT NULL UNIQUE,
  description  text NOT NULL DEFAULT '',
  client       text NOT NULL DEFAULT '',
  location     text NOT NULL DEFAULT '',
  image        text NOT NULL DEFAULT '/Hero.jpg',
  images       text[] NOT NULL DEFAULT '{}',
  status       text NOT NULL DEFAULT 'completed',
  year         text NOT NULL DEFAULT '',
  category     text NOT NULL DEFAULT '',
  technologies text[] NOT NULL DEFAULT '{}',
  featured     boolean NOT NULL DEFAULT false
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"  ON projects FOR SELECT USING (true);
CREATE POLICY "Auth write"   ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Products (admin-created) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS products_additions (
  id                text PRIMARY KEY,
  name              text NOT NULL,
  slug              text NOT NULL,
  category_id       text NOT NULL DEFAULT '',
  category_name     text NOT NULL DEFAULT '',
  description       text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  price_on_request  boolean NOT NULL DEFAULT true,
  image             text NOT NULL DEFAULT '/No_Image_Available.jpg',
  images            text[] NOT NULL DEFAULT '{}',
  specifications    jsonb NOT NULL DEFAULT '{}',
  features          text[] NOT NULL DEFAULT '{}',
  in_stock          boolean NOT NULL DEFAULT true,
  badge             text,
  sku               text NOT NULL DEFAULT '',
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products_additions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"  ON products_additions FOR SELECT USING (true);
CREATE POLICY "Auth write"   ON products_additions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Product Overrides (edits to catalog/seed products) ───────
CREATE TABLE IF NOT EXISTS products_overrides (
  product_id text PRIMARY KEY,
  data       jsonb NOT NULL DEFAULT '{}'
);

ALTER TABLE products_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"  ON products_overrides FOR SELECT USING (true);
CREATE POLICY "Auth write"   ON products_overrides FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Category Additions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories_additions (
  id            text PRIMARY KEY,
  name          text NOT NULL,
  slug          text NOT NULL UNIQUE,
  description   text NOT NULL DEFAULT '',
  icon          text NOT NULL DEFAULT 'Package',
  product_count integer NOT NULL DEFAULT 0,
  image         text NOT NULL DEFAULT '/No_Image_Available.jpg',
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE categories_additions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"  ON categories_additions FOR SELECT USING (true);
CREATE POLICY "Auth write"   ON categories_additions FOR ALL TO authenticated USING (true) WITH CHECK (true);
