"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  MapPin,
  MessageSquare,
  Settings,
  FileText,
  Loader2,
  LogOut,
  Quote,
} from "lucide-react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  useEffect(() => {
    // Allow login page without authentication
    if (pathname === "/admin/login") {
      setCheckingAuth(false);
      return;
    }

    const token =
      localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setCheckingAuth(false);
  }, [pathname, router]);

  function handleLogout() {
    localStorage.removeItem("accessToken");

    localStorage.removeItem("adminUser");

    router.replace("/admin/login");
  }

  // Login page should not have sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Check authentication before showing admin
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3ed]">
        <Loader2
          size={32}
          className="animate-spin text-[#c85a2b]"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f3ed]">

      {/* Sidebar */}

      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-[#211c17]/10 bg-[#211c17] text-white">

        {/* Logo */}

        <div className="border-b border-white/10 px-8 py-7">
          <Link
            href="/admin"
            className="font-serif text-2xl font-semibold"
          >
            TravelBhakt
          </Link>

          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 px-4 py-6">

          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LayoutDashboard size={18} />

            Dashboard
          </Link>

          <Link
            href="/admin/packages"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Package size={18} />

            Packages
          </Link>

          <Link
            href="/admin/destinations"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <MapPin size={18} />

            Destinations
          </Link>

          <Link
            href="/admin/blogs"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <FileText size={18} />

            Blogs
          </Link>

          <Link
            href="/admin/testimonials"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
            <Quote size={18} />

            Testimonials
            </Link>

          <Link
            href="/admin/inquiries"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <MessageSquare size={18} />

            Inquiries
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Settings size={18} />

            Settings
          </Link>

        </nav>

        {/* Bottom Actions */}

        <div className="border-t border-white/10 p-4">

          <Link
            href="/"
            className="mb-2 block rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/20"
          >
            View Website
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-white/10 hover:text-red-200"
          >
            <LogOut size={17} />

            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}

      <main className="ml-64 min-h-screen flex-1">
        {children}
      </main>

    </div>
  );
}