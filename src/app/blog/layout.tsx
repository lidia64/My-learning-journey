import BlogSidebar from "@/components/BlogSidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr]">
      <BlogSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
