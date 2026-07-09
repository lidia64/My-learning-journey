import type { Metadata } from "next";
import Button from "@/components/Button";
import Hero from "@/components/Hero";

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
      <Hero
        eyebrow="My Learning Journey"
        title="Hi, I'm Lidia 👋"
        subtitle="I'm learning full-stack web development — React, TypeScript, and Next.js — one project at a time. This site documents that journey."
      >
        <Button href="/stories">Explore Story Hub</Button>
        <Button href="/about" variant="secondary">
          About Me
        </Button>
        <Button href="/blog" variant="outline">
          Read My Blog
        </Button>
      </Hero>

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

      {/* Dynamic Features CTA Panel */}
      <section className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white/90 to-gray-50/50 p-8 shadow-sm backdrop-blur md:p-12">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="inline-flex rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            New Feature Built
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Interactive Story Management
          </h2>
          <p className="text-base text-gray-600">
            I built a complete full-stack Story Hub connected to a remote Express API backend. Share your own code journey, edit existing entries, and manage data dynamically using secure REST API integrations!
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button href="/stories">Open Story Hub</Button>
            <Button href="/login" variant="secondary">
              Sign In to Your Profile
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
