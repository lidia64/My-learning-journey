import type { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to my learning journey — a personal site tracking my growth as a web developer.",
};

type Track = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const tracks: Track[] = [
  {
    title: "Frontend",
    description:
      "React, Next.js, Tailwind CSS, and building interfaces that feel good to use.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Backend",
    description:
      "APIs, databases, and how to connect the pieces behind the scenes.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    title: "Mobile",
    description:
      "Exploring how the web I build translates to phones and tablets.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/5 via-white to-[var(--color-secondary)]/10 px-6 py-16 text-center shadow-sm ring-1 ring-black/5 sm:py-24">
        <div
          aria-hidden
          className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[var(--color-secondary)]/20 blur-3xl"
        />

        <div className="relative animate-fade-up">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/15">
            My Learning Journey
          </span>
          <h1 className="mt-6 text-4xl font-bold text-[var(--color-primary)] sm:text-5xl">
            Hi, I&apos;m Lidia 👋
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            I&apos;m learning full-stack web development — React, TypeScript,
            and Next.js — one project at a time. This site documents that
            journey.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/about">About Me</Button>
            <Button href="/blog" variant="secondary">
              Read My Blog
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {tracks.map((track) => (
          <div
            key={track.title}
            className="group rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition group-hover:bg-[var(--color-primary)] group-hover:text-white">
              {track.icon}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[var(--color-primary)]">
              {track.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{track.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
