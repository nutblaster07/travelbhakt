"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Plus,
  Loader2,
  Pencil,
  FileText,
  Calendar,
} from "lucide-react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load blogs"
          );
        }

        const data: Blog[] =
          await response.json();

        setBlogs(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load blogs. Please check if the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  function formatDate(date: string) {
    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2
          size={32}
          className="animate-spin text-[#c85a2b]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
              Content Management
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
              Blogs
            </h1>

            <p className="mt-3 text-[#756b63]">
              Create and manage travel stories, guides and articles.
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 font-semibold text-white transition hover:bg-[#a94720]"
          >
            <Plus size={18} />

            Add New Blog
          </Link>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}

        {!error && blogs.length === 0 && (
          <div className="mt-10 rounded-[32px] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c85a2b]/10 text-[#c85a2b]">
              <FileText size={30} />
            </div>

            <h2 className="mt-6 font-serif text-3xl text-[#211c17]">
              No blogs yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#756b63]">
              Start publishing travel guides, destination stories and useful travel content.
            </p>

            <Link
              href="/admin/blogs/new"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 font-semibold text-white"
            >
              <Plus size={18} />

              Create Your First Blog
            </Link>
          </div>
        )}

        {/* Blog Grid */}

        {blogs.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="overflow-hidden rounded-[28px] bg-white shadow-sm"
              >
                {/* Image */}

                <div className="relative h-52 bg-[#211c17]/5">
            {blog.coverImage ? (
                <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full items-center justify-center text-[#756b63]">
                <FileText size={35} />
                </div>
            )}

            <div className="absolute right-4 top-4">
                <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    blog.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-[#211c17]/10 text-[#756b63]"
                }`}
                >
                {blog.isPublished ? "Published" : "Draft"}
                </span>
            </div>
            </div>

                {/* Content */}

                <div className="p-6">
                  <h2 className="line-clamp-2 font-serif text-2xl text-[#211c17]">
                    {blog.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#756b63]">
                    {blog.excerpt ||
                      "No excerpt available for this blog."}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-[#756b63]">
                    <Calendar size={14} />

                    {formatDate(
                      blog.createdAt
                    )}
                  </div>

                  {/* Actions */}

                  <div className="mt-6 flex items-center justify-between border-t border-[#211c17]/10 pt-5">
                    <span className="max-w-[180px] truncate text-xs text-[#756b63]">
                      /blogs/{blog.slug}
                    </span>

                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#211c17] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#c85a2b]"
                    >
                      <Pencil size={15} />

                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}