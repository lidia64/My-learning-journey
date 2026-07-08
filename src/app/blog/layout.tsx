import BlogSidebar from "@/components/BlogSidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <header className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">
          Blog
        </h1>
        <p className="text-gray-600 mt-1">
          Notes from my learning journey, organized by topic.
        </p>
      </header>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <BlogSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
