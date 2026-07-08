import type { ReactNode } from "react";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function Hero({ eyebrow, title, subtitle, children }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-[var(--color-primary)]/[0.06] px-6 py-16 text-center shadow-sm ring-1 ring-[var(--color-primary)]/10 sm:py-24">
      <div
        aria-hidden
        className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[var(--color-primary)]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[var(--color-secondary)]/15 blur-3xl"
      />

      <div className="relative animate-fade-up">
        {eyebrow && (
          <span className="inline-block rounded-full bg-white/80 px-4 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-6 text-4xl font-bold text-[var(--color-primary)] sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
