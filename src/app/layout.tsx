import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "My Learning Journey",
    template: "%s | My Learning Journey",
  },
  description:
    "A personal site tracking my journey learning web development with React, TypeScript, and Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
