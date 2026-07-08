import type { Metadata } from "next";
import Button from "@/components/Button";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about my background, why I started learning to code, and where I want to go next.",
};

const focusAreas = [
  {
    title: "Why I Started",
    text: "I wanted to build things other people could actually use — not just read about how they work.",
  },
  {
    title: "How I Learn",
    text: "One project at a time: HTML and CSS first, then JavaScript, then React and Next.js.",
  },
  {
    title: "Where I'm Headed",
    text: "Toward a real, production-style app I'll deploy on Vercel — a movie discovery app using TMDB.",
  },
];

export default function About() {
  return (
    <div className="space-y-16">
      <Hero
        eyebrow="About Me"
        title="My Story So Far"
        subtitle="From curious beginner to building real projects with React, TypeScript, and Next.js."
      >
        <Button href="/blog" variant="outline">
          Read My Blog
        </Button>
        <Button href="/contact" variant="secondary">
          Get In Touch
        </Button>
      </Hero>

      <section className="grid gap-6 sm:grid-cols-3">
        {focusAreas.map((area) => (
          <div
            key={area.title}
            className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
              {area.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{area.text}</p>
          </div>
        ))}
      </section>

      <section className="max-w-2xl space-y-4">
        <h2 className="text-xl font-semibold text-[var(--color-secondary)]">
          My Goals
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Get comfortable with the Next.js App Router and server components</li>
          <li>Build a full project end-to-end and deploy it on Vercel</li>
          <li>Learn how to fetch and hide API keys securely using Route Handlers</li>
          <li>Eventually build a cinematic movie discovery app using the TMDB API</li>
        </ul>
      </section>
    </div>
  );
}
