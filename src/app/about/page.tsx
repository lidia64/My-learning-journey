import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about my background, why I started learning to code, and where I want to go next.",
};

export default function About() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[var(--color-primary)]">
        About Me
      </h1>
      <p className="text-gray-700 leading-relaxed">
        I started learning web development because I wanted to build things
        that other people could actually use — not just read about how they
        work. I began with HTML, CSS, and JavaScript, then moved into React
        once I understood how the web actually renders content.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Right now I&apos;m deep in Next.js, learning the App Router, layouts,
        server components, and how to structure a real, production-style
        project instead of a single messy file.
      </p>
      <h2 className="text-xl font-semibold text-[var(--color-secondary)] pt-4">
        My Goals
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Get comfortable with the Next.js App Router and server components</li>
        <li>Build a full project end-to-end and deploy it on Vercel</li>
        <li>Learn how to fetch and hide API keys securely using Route Handlers</li>
        <li>Eventually build a cinematic movie discovery app using the TMDB API</li>
      </ul>
    </div>
  );
}
