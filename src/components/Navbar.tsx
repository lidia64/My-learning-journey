"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-bold text-[var(--color-primary)]"
          onClick={() => setOpen(false)}
        >
          My Learning Journey
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-8 text-base sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition hover:text-[var(--color-primary)] ${
                isActive(link.href) ? "text-[var(--color-primary)]" : "text-gray-700"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[var(--color-primary)] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-md border border-gray-200 p-2 sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="mb-1 block h-0.5 w-5 bg-gray-700" />
          <span className="mb-1 block h-0.5 w-5 bg-gray-700" />
          <span className="block h-0.5 w-5 bg-gray-700" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-[var(--color-primary)] ${
                isActive(link.href) ? "text-[var(--color-primary)]" : "text-gray-700"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
