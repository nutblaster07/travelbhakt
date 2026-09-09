"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  LogIn,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Invalid email or password"
        );
      }

      // Store JWT token
      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      // Store admin information
      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed] px-6 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c85a2b]">
            TravelBhakt
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#211c17]">
            Admin Login
          </h1>

          <p className="mt-3 text-sm text-[#756b63]">
            Sign in to manage your travel website.
          </p>
        </div>

        {/* Login Card */}

        <div className="rounded-[32px] bg-white p-7 shadow-sm sm:p-10">

          {/* Icon */}

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c85a2b]/10 text-[#c85a2b]">
            <LockKeyhole size={25} />
          </div>

          {/* Error */}

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-7"
          >

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#211c17]">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756b63]"
                />

                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@travelbhakt.com"
                  className="w-full rounded-xl border border-[#ded6cc] py-3 pl-11 pr-4 outline-none transition focus:border-[#c85a2b]"
                />
              </div>
            </div>

            {/* Password */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-[#211c17]">
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756b63]"
                />

                <input
                  required
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#ded6cc] py-3 pl-11 pr-12 outline-none transition focus:border-[#c85a2b]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756b63] transition hover:text-[#211c17]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-4 font-semibold text-white transition hover:bg-[#a94720] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />

                  Sign In
                </>
              )}
            </button>

          </form>

        </div>

        {/* Footer */}

        <p className="mt-6 text-center text-xs text-[#756b63]">
          TravelBhakt Admin Panel
        </p>

      </div>
    </main>
  );
}