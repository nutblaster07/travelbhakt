"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  isPublished: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function BlogDetailsPage() {
  const params = useParams();

  const slug = params.slug as string;

  const [blog, setBlog] =
    useState<Blog | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        /*
        ==========================================
        GET ALL BLOGS
        ==========================================
        */

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`
       );

        if (!response.ok) {
          throw new Error(
            "Failed to load blog"
          );
        }

        const blogs: Blog[] =
          await response.json();

        /*
        ==========================================
        FIND BLOG USING SLUG
        ==========================================
        */

        const selectedBlog =
          blogs.find(
            (blog) =>
              blog.slug === slug
          );

        if (!selectedBlog) {
          throw new Error(
            "Blog not found"
          );
        }

        setBlog(selectedBlog);
      } catch (error) {
        console.error(error);

        setError(
          "The blog you are looking for could not be found."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  /*
  ==========================================
  READ TIME
  ==========================================
  */

  function getReadTime(
    content: string
  ) {
    const words =
      content
        .trim()
        .split(/\s+/)
        .length;

    const minutes =
      Math.max(
        1,
        Math.ceil(words / 200)
      );

    return `${minutes} min read`;
  }

  /*
  ==========================================
  FORMAT DATE
  ==========================================
  */

  function formatDate(
    date: string
  ) {
    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3ed]">

        <Loader2
          size={32}
          className="animate-spin text-[#c85a2b]"
        />

      </div>
    );
  }

  /*
  ==========================================
  ERROR / NOT FOUND
  ==========================================
  */

  if (error || !blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3ed] px-6">

        <div className="max-w-md rounded-[32px] bg-white p-10 text-center shadow-sm">

          <FileText
            size={40}
            className="mx-auto text-[#c85a2b]"
          />

          <h1 className="mt-6 font-serif text-3xl text-[#211c17]">
            Blog Not Found
          </h1>

          <p className="mt-3 text-[#756b63]">
            {error}
          </p>

          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#211c17] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c85a2b]"
          >
            <ArrowLeft size={17} />

            Back to Blogs
          </Link>

        </div>

      </div>
    );
  }

  /*
  ==========================================
  BLOG PAGE
  ==========================================
  */

  return (
    <main className="min-h-screen bg-[#f7f3ed]">

      {/* =====================================
          HERO IMAGE
      ===================================== */}

      <section className="px-6 pt-10 lg:px-12 lg:pt-16">

        <div className="mx-auto max-w-[1100px]">

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#756b63] transition hover:text-[#c85a2b]"
          >
            <ArrowLeft size={17} />

            Back to Stories
          </Link>

          {/* Category */}

          {blog.category && (
            <p className="mt-12 text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">

              {blog.category}

            </p>
          )}

          {/* Title */}

          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl lg:text-7xl">

            {blog.title}

          </h1>

          {/* Excerpt */}

          {blog.excerpt && (
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#756b63] lg:text-xl">

              {blog.excerpt}

            </p>
          )}

          {/* Meta */}

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#756b63]">

            <div className="flex items-center gap-2">

              <Calendar size={17} />

              {formatDate(
                blog.createdAt
              )}

            </div>

            <div className="flex items-center gap-2">

              <Clock size={17} />

              {getReadTime(
                blog.content
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          COVER IMAGE
      ===================================== */}

      {blog.coverImage && (
        <section className="px-6 pt-12 lg:px-12">

          <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[32px]">

            <img
              src={
                blog.coverImage
              }
              alt={
                blog.title
              }
              className="h-[300px] w-full object-cover sm:h-[450px] lg:h-[600px]"
            />

          </div>

        </section>
      )}

      {/* =====================================
          ARTICLE
      ===================================== */}

      <article className="px-6 py-16 lg:px-12 lg:py-24">

        <div className="mx-auto max-w-3xl">

          <div className="whitespace-pre-line text-base leading-8 text-[#4f4842] sm:text-lg">

            {blog.content}

          </div>

        </div>

      </article>

      {/* =====================================
          BACK SECTION
      ===================================== */}

      <section className="border-t border-[#211c17]/10 px-6 py-16 lg:px-12">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">

            Travel Stories

          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#211c17]">

            Discover more stories

          </h2>

          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#211c17] px-7 py-4 font-semibold text-white transition hover:bg-[#c85a2b]"
          >
            View All Stories

            <ArrowLeft
              size={17}
              className="rotate-180"
            />

          </Link>

        </div>

      </section>

    </main>
  );
}