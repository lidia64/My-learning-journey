import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-[var(--color-primary)]">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops — this page doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  );
}
