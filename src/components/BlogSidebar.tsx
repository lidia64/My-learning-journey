import Link from "next/link";

const categories = [
  { href: "/blog", label: "All Posts" },
  { href: "/blog/frontend", label: "Frontend" },
  { href: "/blog/backend", label: "Backend" },
  { href: "/blog/mobile", label: "Mobile" },
];

export default function BlogSidebar() {
  return (
    <aside className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
      <h2 className="font-semibold text-gray-900 mb-3">Categories</h2>
      <nav className="flex md:flex-col gap-3 md:gap-2 flex-wrap">
        {categories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition"
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
