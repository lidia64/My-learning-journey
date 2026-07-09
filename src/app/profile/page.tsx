"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { getCurrentProfile, logout, UserProfile } from "@/lib/auth-api";
import { User, Mail, Shield, Calendar, LogOut, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getCurrentProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile.");
        // Redirect to login if unauthenticated
        setTimeout(() => {
          startTransition(() => {
            router.push("/login");
          });
        }, 1500);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-12 max-w-md text-center animate-fade-up">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
          <h2 className="mt-3 text-lg font-semibold text-red-900">Session Error</h2>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <p className="mt-4 text-xs text-red-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto my-12 max-w-lg animate-fade-up">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-[var(--color-primary)]/80 to-[var(--color-secondary)]/90" />
        
        <div className="relative px-6 pb-6 pt-12">
          {/* Avatar Icon */}
          <div className="absolute -top-10 left-6 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gray-50 text-gray-500 shadow-md">
            <User className="h-10 w-10 text-[var(--color-primary)]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
              <p className="text-sm text-gray-500">Welcome to your dashboard area</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 sm:mt-0"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>

          <hr className="my-6 border-gray-100" />

          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</p>
                <p className="truncate text-sm font-medium text-gray-800">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <Shield className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Account Role</p>
                <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5 mt-0.5">
                  <span className="rounded-md bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs font-bold text-[var(--color-primary)]">
                    {profile?.role || "USER"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <CheckCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Verification Status</p>
                <div className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-800">
                  {profile?.isVerified ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                      ● Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600 font-semibold text-xs">
                      ● Pending Verification
                    </span>
                  )}
                </div>
              </div>
            </div>

            {profile?.createdAt && (
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Member Since</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(profile.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
