"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

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

export default function BlogPage() {
  const [blogs, setBlogs] =
    useState<Blog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

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

        const publishedBlogs =
          data.filter(
            (blog) =>
              blog.isPublished === true
          );

        setBlogs(publishedBlogs);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load travel stories. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  function getReadTime(
    content: string
  ) {
    const words =
      content
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const minutes =
      Math.max(
        1,
        Math.ceil(words / 200)
      );

    return `${minutes} min read`;
  }

  function formatDate(
    date: string
  ) {
    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed]">
        <Loader2
          size={32}
          className="animate-spin text-[#c85a2b]"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ed]">

      {/* Hero */}

      <section className="px-6 pb-16 pt-20 lg:px-12 lg:pb-24 lg:pt-28">

        <div className="mx-auto max-w-[1400px]">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
            Travel Stories
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-[#211c17] sm:text-6xl lg:text-7xl">
            Stories that inspire
            <br />
            your next journey.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#756b63]">
            Travel guides, destination stories
            and useful tips to help you explore
            India in a different way.
          </p>

        </div>

      </section>

      {/* Error */}

      {error && (
        <section className="px-6 pb-20 lg:px-12">

          <div className="mx-auto max-w-[1400px] rounded-3xl bg-red-50 p-8 text-red-600">

            {error}

          </div>

        </section>
      )}

      {/* Empty State */}

      {!error &&
        blogs.length === 0 && (
          <section className="px-6 pb-24 lg:px-12">

            <div className="mx-auto max-w-[1400px] rounded-[32px] bg-white p-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c85a2b]/10 text-[#c85a2b]">

                <FileText size={30} />

              </div>

              <h2 className="mt-6 font-serif text-3xl text-[#211c17]">
                Stories coming soon
              </h2>

              <p className="mx-auto mt-4 max-w-md text-[#756b63]">
                We're preparing travel guides,
                stories and useful travel tips
                for your next adventure.
              </p>

            </div>

          </section>
        )}

      {/* Blog Grid */}

      {!error &&
        blogs.length > 0 && (
          <section className="px-6 pb-24 lg:px-12">

            <div className="mx-auto max-w-[1400px]">

              <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

                {blogs.map((blog) => (

                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group overflow-hidden rounded-[30px] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >

                    {/* Image */}

                    <div className="relative h-64 overflow-hidden bg-[#211c17]/5">

                      {blog.coverImage ? (

                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center">

                          <FileText
                            size={40}
                            className="text-[#756b63]"
                          />

                        </div>

                      )}

                      {blog.category && (

                        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#211c17] backdrop-blur">

                          {blog.category}

                        </span>

                      )}

                    </div>

                    {/* Content */}

                    <div className="p-7">

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#8a7f76]">

                        <div className="flex items-center gap-2">

                          <Calendar size={14} />

                          {formatDate(
                            blog.createdAt
                          )}

                        </div>

                        <div className="flex items-center gap-2">

                          <Clock size={14} />

                          {getReadTime(
                            blog.content
                          )}

                        </div>

                      </div>

                      <h2 className="mt-5 font-serif text-3xl leading-tight text-[#211c17]">

                        {blog.title}

                      </h2>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#756b63]">

                        {blog.excerpt ||
                          "Discover this travel story and explore something new."}

                      </p>

                      <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#c85a2b]">

                        Read Article

                        <ArrowUpRight
                          size={17}
                          className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                        />

                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </section>
        )}

    </main>
  );
}