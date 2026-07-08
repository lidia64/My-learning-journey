import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  href,
  children,
  variant = "primary",
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-block px-5 py-2.5 rounded-lg font-medium transition text-sm sm:text-base";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-primary)] text-white hover:opacity-90"
      : variant === "secondary"
        ? "bg-[var(--color-secondary)] text-white hover:opacity-90"
        : "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
