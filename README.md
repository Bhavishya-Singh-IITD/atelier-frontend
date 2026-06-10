# Atelier — Curated Art Marketplace

A clean, editorial art marketplace website (frontend) inspired by Dessine Art, built with SEO as a first-class concern.

## File Structure

```
atelier/
├── index.html          ← Homepage
├── shop.html           ← Product listing
├── product.html        ← Product detail
├── sell.html           ← Artist onboarding
├── about.html          ← About page
├── signin.html         ← Auth (noindex)
├── robots.txt          ← Crawler rules
├── sitemap.xml         ← For Google Search Console
├── css/
│   └── styles.css      ← All styles (shared)
└── js/
    └── script.js       ← Light interactions
```

## SEO Optimizations Already In Place

**Meta tags (every page)**
- Unique title + meta description tuned for intent keywords
- Canonical URL on every page
- Open Graph (Facebook / LinkedIn / WhatsApp previews)
- Twitter Card (twitter previews)
- robots meta (noindex on signin)

**Structured Data — JSON-LD (rich Google results)**
- Organization schema (homepage)
- WebSite + SearchAction (sitelinks search box)
- Product schema with offer + aggregateRating (product page → star ratings in Google results)
- CollectionPage + BreadcrumbList (shop page)
- AboutPage + Service schema (about + sell pages)

**Semantic HTML5**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Proper heading hierarchy (one `<h1>` per page, then `<h2>` → `<h3>`)
- `aria-label` on landmarks and icon buttons
- Descriptive `alt` text on every image

**Performance & Crawlability**
- `<link rel="preconnect">` for Google Fonts
- `loading="lazy"` on below-the-fold images
- `robots.txt` allows crawling, blocks cart/checkout/account
- `sitemap.xml` with priorities, change frequency, image sitemap entries

**On-page SEO**
- Keyword-rich H1s ("Buy & Sell Original Art Online")
- Long-tail keywords in product names + descriptions
- Internal linking between pages (footer, nav, breadcrumbs)
- Breadcrumb navigation on shop + product pages

## Before You Go Live — Replace These

Search these strings and replace with your real values:

| Placeholder | Replace with |
|---|---|
| `atelier.example.com` | Your actual domain |
| `support@atelier.example.com` | Your support email |
| `+1 (555) 123 4567` | Your WhatsApp/phone |
| `Atelier` (brand name) | Your brand name |
| Unsplash image URLs | Your real product images |
| Social media `href="#"` | Your real social URLs |

## Next Steps (for backend, when you're ready)

1. Real product database + admin panel
2. User auth (artists + buyers)
3. Payment integration (Stripe / Razorpay)
4. Cart + checkout flow
5. Order tracking
6. Artist dashboard for uploading & analytics
7. Image CDN with WebP/AVIF + responsive `srcset`
8. Server-side rendering (Next.js / Astro) for further SEO gains

## How to Preview

Just open `index.html` in any browser — no build step, no dependencies.
