"use client";

import { useState, useEffect, Suspense, startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyEmail, resendVerification } from "@/lib/auth-api";
import { ShieldCheck, Mail, Key, Loader2, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp) {
      setError("Please fill in all fields.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await verifyEmail({ email, otp });
      setSuccessMsg(res.message || "Email verified successfully! Redirecting to login...");
      
      startTransition(() => {
        setTimeout(() => {
          router.push(`/login?email=${encodeURIComponent(email)}`);
        }, 2000);
      });
    } catch (err: any) {
      setError(err.message || "Verification failed. Please double-check the OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email address to resend the code.");
      return;
    }

    setIsResending(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await resendVerification(email);
      setSuccessMsg(res.message || "A new OTP code has been sent to your email!");
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mx-auto my-12 max-w-md animate-fade-up">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Verify Your Email</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Please enter the 6-digit OTP code sent to your inbox
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-sm text-red-600">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3.5 text-sm text-emerald-800">
            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
            <span className="font-medium">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="block w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                6-Digit Code (OTP)
              </label>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] hover:underline disabled:opacity-50"
              >
                {isResending ? (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                ) : (
                  "Resend Code"
                )}
              </button>
            </div>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Key className="h-4 w-4" />
              </span>
              <input
                id="otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                required
                className="block w-full tracking-widest text-center font-mono rounded-xl border border-gray-300 py-2.5 pr-3 text-gray-900 placeholder-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Back to{" "}
          <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
      </div>
    }>
      <VerifyEmailForm />
    </Suspense>
  );
}
