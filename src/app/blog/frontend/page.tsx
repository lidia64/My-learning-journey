import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frontend Blog",
  description:
    "Posts about React, Next.js, Tailwind CSS, and building user interfaces.",
};

export default function FrontendBlog() {
  return (
    <article className="max-w-none space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">
        Learning the Next.js App Router
      </h2>
      <p className="text-gray-700 leading-relaxed">
        The App Router changes how routing works compared to the old Pages
        Router — folders define routes, and special files like{" "}
        <code className="text-sm bg-gray-100 px-1 rounded">page.tsx</code> and{" "}
        <code className="text-sm bg-gray-100 px-1 rounded">layout.tsx</code>{" "}
        control what renders and what wraps it. Nested layouts, like the one
        powering this blog section, let you share UI (sidebar, header) across
        a whole group of pages without repeating code.
      </p>
    </article>
  );
}
