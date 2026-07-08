import type { Metadata } from "next";
import Button from "@/components/Button";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — send a message or find me online.",
};

const channels = [
  {
    title: "Email",
    text: "lidia@example.com",
    href: "mailto:lidia@example.com",
  },
  {
    title: "GitHub",
    text: "github.com/lidia",
    href: "https://github.com",
  },
  {
    title: "LinkedIn",
    text: "in/lidia-dev",
    href: "https://linkedin.com",
  },
];

export default function Contact() {
  return (
    <div className="space-y-16">
      <Hero
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="Have a question, feedback, or just want to say hi? Send a message below."
      >
        <Button href="mailto:lidia@example.com" variant="outline">
          Email Me
        </Button>
        <Button href="/blog" variant="secondary">
          Read My Blog
        </Button>
      </Hero>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form className="space-y-4 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
              placeholder="Say something..."
            />
          </div>
          <Button type="submit">Send Message</Button>
        </form>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-lg"
            >
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                {c.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600 transition group-hover:text-[var(--color-primary)]">
                {c.text}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
