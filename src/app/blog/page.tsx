import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Browse posts about frontend, backend, and mobile development.",
};

const categories = [
  {
    href: "/blog/frontend",
    title: "Frontend",
    desc: "React, Next.js, CSS, and building interfaces.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    href: "/blog/backend",
    title: "Backend",
    desc: "APIs, databases, and server-side logic.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    href: "/blog/mobile",
    title: "Mobile",
    desc: "Responsive design and mobile development.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
];

export default function BlogHome() {
  return (
    <div className="space-y-10">
      <Hero
        eyebrow="Blog"
        title="Notes From the Journey"
        subtitle="Short, friendly write-ups organized by topic. Pick a category to start reading."
      >
        <Button href="/blog/frontend" variant="outline">
          Start with Frontend
        </Button>
      </Hero>

      <div className="grid gap-6 sm:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition group-hover:bg-[var(--color-primary)] group-hover:text-white">
              {c.icon}
            </div>
            <h2 className="mt-4 font-semibold text-[var(--color-primary)]">{c.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
