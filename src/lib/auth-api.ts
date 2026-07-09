export interface UserProfile {
  id: string;
  email: string;
  role: "STUDENT" | "SUPERVISOR" | "USER";
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterRequest {
  email: string;
  password?: string; // Optional if API might change, but standard is required
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  message?: string;
  accessToken: string;
  refreshToken: string;
  role?: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

const BASE_URL = "https://sms-express-app-1-production-a843.up.railway.app/api/auth";
const USERS_URL = "https://sms-express-app-1-production-a843.up.railway.app/api/users";

// Simple client-side token getters/setters
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

export function setTokens(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export async function register(data: { email: string; password?: string }): Promise<{ message: string; userId: string }> {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.details && Array.isArray(errorData.details)) {
      throw new Error(errorData.details.map((d: any) => d.message).join(", "));
    }
    throw new Error(errorData.error || "Failed to register.");
  }

  return response.json();
}

export async function verifyEmail(data: VerifyEmailRequest): Promise<{ message: string }> {
  const response = await fetch(`${BASE_URL}/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.details && Array.isArray(errorData.details)) {
      throw new Error(errorData.details.map((d: any) => d.message).join(", "));
    }
    throw new Error(errorData.error || "Invalid verification code.");
  }

  return response.json();
}

export async function resendVerification(email: string): Promise<{ message: string }> {
  const response = await fetch(`${BASE_URL}/resend-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to resend verification code.");
  }

  return response.json();
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.details && Array.isArray(errorData.details)) {
      throw new Error(errorData.details.map((d: any) => d.message).join(", "));
    }
    throw new Error(errorData.error || "Invalid email or password.");
  }

  const data: LoginResponse = await response.json();
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function getCurrentProfile(): Promise<UserProfile> {
  const token = getAccessToken();
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await fetch(`${USERS_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    // If unauthorized, try to refresh token once
    if (response.status === 401) {
      try {
        await refreshTokens();
        const newToken = getAccessToken();
        if (newToken) {
          const retryResponse = await fetch(`${USERS_URL}/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
            cache: "no-store",
          });
          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
      } catch (err) {
        clearTokens();
        throw new Error("Session expired. Please log in again.");
      }
    }
    clearTokens();
    throw new Error("Failed to load user profile.");
  }

  return response.json();
}

export async function refreshTokens(): Promise<LoginResponse> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token found.");
  }

  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    throw new Error("Session expired.");
  }

  const data: LoginResponse = await response.json();
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (e) {
      // Ignore network errors on logout
    }
  }
  clearTokens();
  
  // Trigger custom storage event to update other components/tabs
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-change"));
  }
}
