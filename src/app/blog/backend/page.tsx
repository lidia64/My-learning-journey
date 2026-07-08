import type { Metadata } from "next";
import Button from "@/components/Button";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Backend Blog",
  description: "Posts about APIs, databases, and server-side development.",
};

const takeaways = [
  {
    title: "Server-only code",
    text: "Route Handlers run on the server, so secrets never reach the browser.",
  },
  {
    title: "Your own API",
    text: "The client calls your route; your route calls the third-party service securely.",
  },
  {
    title: "Env variables",
    text: "Keys live in .env and are read server-side — never committed to the repo.",
  },
];

export default function BackendBlog() {
  return (
    <div className="space-y-10">
      <Hero
        eyebrow="Backend"
        title="Hiding API Keys with Route Handlers"
        subtitle="Keeping secret keys safe while still talking to third-party APIs."
      >
        <Button href="/blog" variant="outline">
          Back to Blog
        </Button>
      </Hero>

      <article className="max-w-none space-y-3 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <p className="text-gray-700 leading-relaxed">
          One thing I&apos;m excited to learn next is Next.js Route Handlers —
          files like{" "}
          <code className="rounded bg-gray-100 px-1 text-sm">
            app/api/movies/route.ts
          </code>{" "}
          that run only on the server. That means secret API keys, like the one
          for The Movie Database (TMDB), never get exposed to the browser. The
          client calls my own API route, and my API route calls TMDB using the
          secret key from an environment variable.
        </p>
      </article>

      <section className="grid gap-6 sm:grid-cols-3">
        {takeaways.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-lg"
          >
            <h2 className="text-base font-semibold text-[var(--color-primary)]">
              {t.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{t.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
