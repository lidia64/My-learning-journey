# My Learning Journey
link : https://my-learning-journey-lemon.vercel.app/
A simple multi-page personal website built to practice the fundamentals of the
**Next.js App Router** — routing, shared and nested layouts, global styling,
and per-page SEO metadata.

## Description

This site introduces me, documents my learning journey into web development,
and shares short blog-style notes organized by topic (Frontend, Backend,
Mobile). It was built as a hands-on assignment to practice Next.js App
Router concepts before moving on to a bigger project (a movie discovery app
using the TMDB API).

## Features

- Multi-page site: Home, About, Contact, and a Blog section
- Nested blog routes: `/blog/frontend`, `/blog/backend`, `/blog/mobile`
- Reusable, responsive navigation bar (with mobile hamburger menu, active-link
  indicator, and gradient logo) and footer
- Shared root layout (nav + footer + global font + global colors) applied to
  every page automatically
- Nested blog layout (sidebar + content area) applied only within `/blog/*`
- **Advanced hero sections** — every page has its own `Hero` with a distinct
  gradient background, decorative blurred blobs, an eyebrow badge, and CTA
  buttons
- **Three-column content sections** used across pages (focus areas, blog
  categories, key takeaways, and contact channels)
- Unique SEO metadata (title + description) on every page
- Global styling via Google Font (Poppins) and CSS custom properties for
  primary/secondary colors, plus a soft radial background and fade-up animation
- Fully responsive (mobile, tablet, desktop) using Tailwind CSS
- Bonus: custom 404 page, a loading state for the blog section, and reusable
  `Button` (primary / secondary / outline) and `Hero` components

## Technologies Used

- [Next.js](https://nextjs.org/) (App Router) — React framework
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 — utility-first styling
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) — self-hosted Google Font (Poppins)
- [Vercel](https://vercel.com/) — deployment

## Setup Instructions

1. Unzip the project and open the folder in your editor:
   ```bash
   cd my-learning-journey
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Folder Structure

```
my-learning-journey/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: nav, footer, font, colors
│   │   ├── page.tsx             # Home page (/)
│   │   ├── globals.css          # Global styles + Tailwind import + animation
│   │   ├── not-found.tsx        # Custom 404 page (bonus)
│   │   ├── about/
│   │   │   └── page.tsx         # About page (/about) with hero + 3-col focus
│   │   ├── contact/
│   │   │   └── page.tsx         # Contact page (/contact) with hero + form + 3-col
│   │   └── blog/
│   │       ├── layout.tsx       # Nested blog layout: sidebar + content
│   │       ├── page.tsx         # Blog landing page (/blog) with hero + 3-col
│   │       ├── loading.tsx      # Loading state for blog section (bonus)
│   │       ├── frontend/
│   │       │   └── page.tsx     # /blog/frontend with hero + 3-col takeaways
│   │       ├── backend/
│   │       │   └── page.tsx     # /blog/backend with hero + 3-col takeaways
│   │       └── mobile/
│   │           └── page.tsx     # /blog/mobile with hero + 3-col takeaways
│   └── components/
│       ├── Navbar.tsx           # Reusable responsive nav bar (active link)
│       ├── Footer.tsx           # Reusable footer
│       ├── BlogSidebar.tsx      # Sidebar for blog section
│       └── Button.tsx           # Reusable button (primary/secondary/outline)
│   │       └── Hero.tsx             # Reusable hero section with themed backgrounds
├── public/                      # Static assets
├── next.config.ts
├── tailwind.config / postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Live Deployment

_Add your Vercel deployment link here after deploying, e.g.:_
`https://my-learning-journey.vercel.app`

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/), click **New Project**, and import
   the repository.
3. Vercel auto-detects Next.js — leave the default settings and click
   **Deploy**.
4. Once deployed, copy the live URL into this README and your submission.
