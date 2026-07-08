import type { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — send a message or find me online.",
};

export default function Contact() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[var(--color-primary)]">
        Get In Touch
      </h1>
      <p className="text-gray-700">
        Have a question, feedback, or just want to say hi? Send a message
        below.
      </p>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Say something..."
          />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
