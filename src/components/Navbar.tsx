"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAccessToken, logout } from "@/lib/auth-api";
import { LogIn, LogOut, User, Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check login state dynamically
  const checkAuth = () => {
    setIsLoggedIn(!!getAccessToken());
  };

  useEffect(() => {
    checkAuth();

    // Listen to custom local login/logout events and window storage changes
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/stories", label: "Stories" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-[var(--color-primary)]"
          onClick={() => setOpen(false)}
        >
          <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
          <span>My Learning Journey</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-base sm:flex">
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

          {/* Auth Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  pathname === "/profile"
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-secondary)] hover:shadow-sm"
            >
              <LogIn className="h-4 w-4" />
              <span>Log In</span>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-md border border-gray-200 p-2 text-gray-700 hover:bg-gray-50 sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="flex flex-col gap-3 border-t border-gray-200 bg-white px-4 py-4 sm:hidden">
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

          <hr className="my-1 border-gray-100" />

          {/* Auth Button for Mobile */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/profile"
                className={`flex items-center gap-2 rounded-lg py-2 text-base font-medium transition ${
                  pathname === "/profile" ? "text-[var(--color-primary)]" : "text-gray-700"
                }`}
                onClick={() => setOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>My Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg py-2 text-left text-base font-medium text-red-600 transition"
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] py-2 text-base font-medium text-white transition hover:bg-[var(--color-secondary)]"
              onClick={() => setOpen(false)}
            >
              <LogIn className="h-5 w-5" />
              <span>Log In</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
