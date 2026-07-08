import type { Metadata } from "next";
import Button from "@/components/Button";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Mobile Development Blog",
  description:
    "Posts about responsive design and adapting layouts for mobile devices.",
};

const takeaways = [
  {
    title: "Responsive prefixes",
    text: "sm:, md:, and lg: adjust layouts for phones, tablets, and desktops.",
  },
  {
    title: "One stylesheet",
    text: "No separate CSS files — Tailwind handles every breakpoint in place.",
  },
  {
    title: "Collapses cleanly",
    text: "This site drops to a single column on small screens, nav included.",
  },
];

export default function MobileBlog() {
  return (
    <div className="space-y-10">
      <Hero
        eyebrow="Mobile"
        title="Designing for Every Screen Size"
        subtitle="Making layouts adapt from a phone all the way up to a wide desktop."
      >
        <Button href="/blog" variant="outline">
          Back to Blog
        </Button>
      </Hero>

      <article className="max-w-none space-y-3 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <p className="text-gray-700 leading-relaxed">
          Tailwind&apos;s responsive prefixes (
          <code className="rounded bg-gray-100 px-1 text-sm">sm:</code>,{" "}
          <code className="rounded bg-gray-100 px-1 text-sm">md:</code>,{" "}
          <code className="rounded bg-gray-100 px-1 text-sm">lg:</code>) make it
          straightforward to adjust layouts for mobile, tablet, and desktop
          without writing separate stylesheets. This whole site — the nav bar,
          the blog&apos;s sidebar layout, and the home page grid — collapses
          cleanly down to a single column on small screens.
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
