# Tumans Medical — Product Catalog Website

Corporate B2B product catalog for **Tumans Medical**, Zimbabwe's medical and laboratory equipment wholesaler.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## What You'll Want to Update

### 1. Business Details (update these first)

| What | File | What to change |
|------|------|----------------|
| WhatsApp number | `lib/utils.ts` | Replace `263775000000` with the real number |
| Phone number | `components/layout/navbar.tsx` | `+263 77 500 0000` |
| Phone, email, address | `components/layout/footer.tsx` | All contact details |
| Phone, email, address | `components/contact/contact-page-content.tsx` | Contact info cards |
| Site URL | `app/layout.tsx` | `metadataBase` → `https://tumansmedical.co.zw` |
| Social links | `components/layout/footer.tsx` | Facebook, Twitter, LinkedIn `href="#"` |

---

### 2. Products & Categories

**Mock data lives here — treat it like a database table:**

| File | What it contains |
|------|-----------------|
| `data/products.ts` | All 24 products — name, slug, description, specs, features, price, images |
| `data/categories.ts` | 6 product categories — name, slug, description, icon, product count |

**To add a product**, copy an existing entry in `data/products.ts` and update the fields. The `slug` must be unique (it becomes the URL: `/products/your-slug`).

**To add a category**, add an entry to `data/categories.ts`. The `id` must match the `categoryId` used in products. Available icon names come from `lucide-react` (check `components/home/featured-categories.tsx` for the `iconMap`).

---

### 3. Connecting a Real Backend API

The entire API layer is in `lib/api/`. Swap out the mock functions for real HTTP calls — the rest of the app won't need to change.

**`lib/api/axios.ts`** — Axios instance config:
```ts
baseURL: process.env.NEXT_PUBLIC_API_URL  // set this in .env.local
```

**`lib/api/products.ts`** — Replace the mock functions:
```ts
// Current (mock):
export async function getProducts(params) {
  return products.filter(...)   // ← local data

// Replace with:
export async function getProducts(params) {
  const { data } = await apiClient.get('/products', { params })
  return data
}
```

**`lib/api/categories.ts`** — Same pattern:
```ts
// Replace with:
export async function getCategories() {
  const { data } = await apiClient.get('/categories')
  return data
}
```

Set your API base URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api.com
```

---

### 4. Environment Variables

Create a `.env.local` file in the project root:

```env
# API base URL (used by lib/api/axios.ts)
NEXT_PUBLIC_API_URL=https://your-api.com

# Site URL (used for OG images and canonical links)
NEXT_PUBLIC_SITE_URL=https://tumansmedical.co.zw
```

---

### 5. SEO & Metadata

Each page exports its own `metadata` object. Update them in:

| Page | File |
|------|------|
| Global (title template, OG) | `app/layout.tsx` |
| Home | `app/page.tsx` |
| Products | `app/products/page.tsx` |
| Product detail | `app/products/[slug]/page.tsx` (auto-generated from product data) |
| Categories | `app/categories/page.tsx` |
| About | `app/about/page.tsx` |
| Contact | `app/contact/page.tsx` |

---

### 6. Styling & Design Tokens

Colors and fonts are defined as CSS variables in `app/globals.css`.

| Token | Current value | What it controls |
|-------|--------------|-----------------|
| `--primary` | `#00288e` | Buttons, links, labels |
| `--background` | `#f7f9fb` | Page background |
| `--muted` | `#f2f4f6` | Card backgrounds, inputs |
| `--border` | `#c4c5d5` | All borders |
| `--font-outfit` | Outfit (Google Fonts) | All text |

The dark navy (`#131b2e`) used for the stats strip, footer, and CTA banner is applied inline in those components.

---

### 7. Animations

Animation variants are in `lib/animations.ts`:

- `fadeIn` — simple opacity fade
- `slideUp` — fade + move up 24px (used on most cards/sections)
- `staggerContainer` — parent variant that staggers children by 80ms
- `scaleIn` — scale from 0.96 → 1
- `cardHover` — hover lift effect on cards

Adjust `duration`, `y`, or `staggerChildren` values there to tune the feel globally.

---

### 8. Filters & State

Product filters (selected category, search query, current page) are managed in `store/filter-store.ts` via Zustand. The filters sync to URL query params (`?category=surgical&q=autoclave`) automatically via `components/products/product-filters.tsx`.

---

## Project Structure

```
/app                    Pages (Next.js App Router)
  layout.tsx            Root layout — metadata, Navbar, Footer, Toaster
  page.tsx              Home
  /about/page.tsx
  /products/page.tsx
  /products/[slug]/page.tsx
  /categories/page.tsx
  /contact/page.tsx

/components
  /layout               Navbar, Footer, Section, SectionHeader
  /home                 Hero, FeaturedCategories, FeaturedProducts,
                        StatsSection, WhyUs, CtaBanner
  /products             ProductCard, ProductGrid, ProductFilters,
                        ProductSkeleton, ProductDetailContent
  /about                AboutContent
  /categories           CategoriesContent
  /contact              ContactPageContent
  /providers            QueryProvider, ToastProvider
  /ui                   shadcn/ui components

/data
  products.ts           24 mock products
  categories.ts         6 categories

/lib
  animations.ts         Framer Motion variants
  utils.ts              cn(), getWhatsAppUrl(), truncate()
  /api
    axios.ts            Axios instance
    products.ts         Product API functions
    categories.ts       Category API functions
  /schemas
    product.ts          Zod schemas — Product, ContactForm
    category.ts         Zod schema — Category

/hooks
  use-products.ts       useProducts(), useProduct(), useProductBySlug()
  use-categories.ts     useCategories()

/store
  filter-store.ts       Zustand — filters, search, pagination
```

---

## Tech Stack

- **Next.js 16** — App Router, Server Components
- **Tailwind CSS v4** — utility styling
- **shadcn/ui** — base UI components
- **Framer Motion** (`motion/react`) — animations
- **TanStack Query v5** — data fetching & caching
- **Zustand v5** — client state (filters)
- **React Hook Form + Zod v4** — form validation
- **react-hot-toast** — notifications
- **Axios** — HTTP client (ready for real API)
