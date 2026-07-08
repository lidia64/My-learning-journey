import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Browse posts about frontend, backend, and mobile development.",
};

const categories = [
  {
    href: "/blog/frontend",
    title: "Frontend",
    desc: "React, Next.js, CSS, and building interfaces.",
  },
  {
    href: "/blog/backend",
    title: "Backend",
    desc: "APIs, databases, and server-side logic.",
  },
  {
    href: "/blog/mobile",
    title: "Mobile",
    desc: "Responsive design and mobile development.",
  },
];

export default function BlogHome() {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Pick a category to start reading:</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {categories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block p-5 rounded-xl border border-gray-200 hover:border-[var(--color-primary)] transition"
          >
            <h2 className="font-semibold text-[var(--color-primary)]">
              {c.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
