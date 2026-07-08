import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com", label: "GitHub" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "mailto:lidia@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-[var(--color-primary)]/[0.06]">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-lg font-bold text-[var(--color-primary)]">
            My Learning Journey
          </p>
          <p className="mt-3 max-w-xs text-sm text-gray-500">
            Documenting my path into full-stack web development — one project
            at a time.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Connect</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-4 text-center text-xs text-gray-500 sm:px-6">
          © {new Date().getFullYear()} My Learning Journey. Built with Next.js
          &amp; Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
