import type { Metadata } from "next";
import Button from "@/components/Button";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Frontend Blog",
  description:
    "Posts about React, Next.js, Tailwind CSS, and building user interfaces.",
};

const takeaways = [
  {
    title: "Folders are routes",
    text: "A folder under app/ becomes a URL segment; page.tsx inside it renders the view.",
  },
  {
    title: "Special files",
    text: "page.tsx and layout.tsx control what renders and what wraps it across a route group.",
  },
  {
    title: "Nested layouts",
    text: "Share UI like a sidebar or header across a whole section without repeating code.",
  },
];

export default function FrontendBlog() {
  return (
    <div className="space-y-10">
      <Hero
        eyebrow="Frontend"
        title="Learning the Next.js App Router"
        subtitle="How routing in the App Router works compared to the older Pages Router."
      >
        <Button href="/blog" variant="outline">
          Back to Blog
        </Button>
      </Hero>

      <article className="max-w-none space-y-3 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <p className="text-gray-700 leading-relaxed">
          The App Router changes how routing works compared to the old Pages
          Router — folders define routes, and special files like{" "}
          <code className="rounded bg-gray-100 px-1 text-sm">page.tsx</code> and{" "}
          <code className="rounded bg-gray-100 px-1 text-sm">layout.tsx</code>{" "}
          control what renders and what wraps it. Nested layouts, like the one
          powering this blog section, let you share UI (sidebar, header) across
          a whole group of pages without repeating code.
        </p>
      </article>

      <section className="grid gap-6 sm:grid-cols-3">
        {takeaways.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-lg"
          >
            <h2 className="text-base font-semibold text-[var(--color-primary)]">{t.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{t.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
