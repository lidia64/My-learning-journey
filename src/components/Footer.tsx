export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6">
        © {new Date().getFullYear()} My Learning Journey. Built with Next.js
        &amp; Tailwind CSS.
      </div>
    </footer>
  );
}
