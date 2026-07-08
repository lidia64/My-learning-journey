import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Development Blog",
  description:
    "Posts about responsive design and adapting layouts for mobile devices.",
};

export default function MobileBlog() {
  return (
    <article className="max-w-none space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">
        Designing for Every Screen Size
      </h2>
      <p className="text-gray-700 leading-relaxed">
        Tailwind&apos;s responsive prefixes (
        <code className="text-sm bg-gray-100 px-1 rounded">sm:</code>,{" "}
        <code className="text-sm bg-gray-100 px-1 rounded">md:</code>,{" "}
        <code className="text-sm bg-gray-100 px-1 rounded">lg:</code>) make it
        straightforward to adjust layouts for mobile, tablet, and desktop
        without writing separate stylesheets. This whole site — the nav bar,
        the blog&apos;s sidebar layout, and the home page grid — collapses
        cleanly down to a single column on small screens.
      </p>
    </article>
  );
}
