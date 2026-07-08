# My Learning Journey

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
- Reusable, responsive navigation bar (with mobile hamburger menu) and footer
- Shared root layout (nav + footer + global font + global colors) applied to
  every page automatically
- Nested blog layout (header + sidebar) applied only within `/blog/*`
- Unique SEO metadata (title + description) on every page
- Global styling via Google Font (Poppins) and CSS custom properties for
  primary/secondary colors
- Fully responsive (mobile, tablet, desktop) using Tailwind CSS
- Bonus: custom 404 page, a loading state for the blog section, and a
  reusable `Button` component used across the site

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
│   │   ├── globals.css          # Global styles + Tailwind import
│   │   ├── not-found.tsx        # Custom 404 page (bonus)
│   │   ├── about/
│   │   │   └── page.tsx         # About page (/about)
│   │   ├── contact/
│   │   │   └── page.tsx         # Contact page (/contact)
│   │   └── blog/
│   │       ├── layout.tsx       # Nested blog layout: header + sidebar
│   │       ├── page.tsx         # Blog landing page (/blog)
│   │       ├── loading.tsx      # Loading state for blog section (bonus)
│   │       ├── frontend/
│   │       │   └── page.tsx     # /blog/frontend
│   │       ├── backend/
│   │       │   └── page.tsx     # /blog/backend
│   │       └── mobile/
│   │           └── page.tsx     # /blog/mobile
│   └── components/
│       ├── Navbar.tsx           # Reusable responsive nav bar
│       ├── Footer.tsx           # Reusable footer
│       ├── BlogSidebar.tsx      # Sidebar for blog section
│       └── Button.tsx           # Reusable button component (bonus)
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
