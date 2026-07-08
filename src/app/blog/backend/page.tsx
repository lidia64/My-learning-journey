import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backend Blog",
  description: "Posts about APIs, databases, and server-side development.",
};

export default function BackendBlog() {
  return (
    <article className="max-w-none space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">
        Hiding API Keys with Route Handlers
      </h2>
      <p className="text-gray-700 leading-relaxed">
        One thing I&apos;m excited to learn next is Next.js Route Handlers —
        files like{" "}
        <code className="text-sm bg-gray-100 px-1 rounded">
          app/api/movies/route.ts
        </code>{" "}
        that run only on the server. That means secret API keys, like the one
        for The Movie Database (TMDB), never get exposed to the browser. The
        client calls my own API route, and my API route calls TMDB using the
        secret key from an environment variable.
      </p>
    </article>
  );
}
